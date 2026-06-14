import { auth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

function getCurrentMonthKey() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getSecondsUntilNextMonth() {
  const now = new Date();
  const nextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0)
  );

  return Math.ceil((nextMonth.getTime() - now.getTime()) / 1000);
}

export type UsageCheckResult = {
  allowed: boolean;
  status: number;
  limit: number;
  used: number;
  remaining: number;
  resetPeriod: string;
  message?: string;
};

export async function checkAndIncrementUsage(
  toolName: string
): Promise<UsageCheckResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      allowed: false,
      status: 401,
      limit: 0,
      used: 0,
      remaining: 0,
      resetPeriod: getCurrentMonthKey(),
      message: "Please sign in to use this tool.",
    };
  }

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    throw new Error("Usage tracking is not configured.");
  }

  const limit = Number(process.env.FREE_MONTHLY_AI_LIMIT || 10);
  const monthKey = getCurrentMonthKey();
  const expiresIn = getSecondsUntilNextMonth();

  const totalKey = `usage:${userId}:${monthKey}:total`;
  const toolKey = `usage:${userId}:${monthKey}:${toolName}`;

  const used = await redis.incr(totalKey);
  const toolUsed = await redis.incr(toolKey);

  if (used === 1) {
    await redis.expire(totalKey, expiresIn);
  }

  if (toolUsed === 1) {
    await redis.expire(toolKey, expiresIn);
  }

  const remaining = Math.max(limit - used, 0);

  if (used > limit) {
    return {
      allowed: false,
      status: 429,
      limit,
      used,
      remaining: 0,
      resetPeriod: monthKey,
      message:
        "You have reached your free monthly AI usage limit. Premium plans will be available soon.",
    };
  }

  return {
    allowed: true,
    status: 200,
    limit,
    used,
    remaining,
    resetPeriod: monthKey,
  };
}