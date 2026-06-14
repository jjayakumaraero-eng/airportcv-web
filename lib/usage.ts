import { auth, currentUser } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

type AirportCVPlan = "free" | "premium";

type AirportCVPrivateMetadata = {
  plan?: string;
  premiumUntil?: string;
};

export type UsageCheckResult = {
  allowed: boolean;
  status: number;
  limit: number;
  used: number;
  remaining: number;
  resetPeriod: string;
  plan?: AirportCVPlan;
  message?: string;
};

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

export async function getCurrentUserPlan(): Promise<{
  plan: AirportCVPlan;
  premiumUntil: string | null;
}> {
  const user = await currentUser();

  if (!user) {
    return {
      plan: "free",
      premiumUntil: null,
    };
  }

  const metadata = (user.privateMetadata || {}) as AirportCVPrivateMetadata;

  const premiumUntil =
    typeof metadata.premiumUntil === "string" ? metadata.premiumUntil : null;

  const premiumIsActive =
    metadata.plan === "premium" &&
    (!premiumUntil || new Date(premiumUntil).getTime() > Date.now());

  return {
    plan: premiumIsActive ? "premium" : "free",
    premiumUntil,
  };
}

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

  const accountPlan = await getCurrentUserPlan();

  const limit =
    accountPlan.plan === "premium"
      ? Number(process.env.PREMIUM_MONTHLY_AI_LIMIT || 100)
      : Number(process.env.FREE_MONTHLY_AI_LIMIT || 5);

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
      plan: accountPlan.plan,
      message:
        accountPlan.plan === "premium"
          ? "You have reached your premium monthly AI usage limit."
          : "You have reached your free monthly AI usage limit. Enter a Premium access code or upgrade when Premium becomes available.",
    };
  }

  return {
    allowed: true,
    status: 200,
    limit,
    used,
    remaining,
    resetPeriod: monthKey,
    plan: accountPlan.plan,
  };
}

export async function getCurrentUserUsageSummary() {
  const { userId } = await auth();
  const accountPlan = await getCurrentUserPlan();

  const limit =
    accountPlan.plan === "premium"
      ? Number(process.env.PREMIUM_MONTHLY_AI_LIMIT || 100)
      : Number(process.env.FREE_MONTHLY_AI_LIMIT || 5);

  const monthKey = getCurrentMonthKey();

  if (!userId || !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return {
      limit,
      used: 0,
      remaining: limit,
      resetPeriod: monthKey,
      plan: accountPlan.plan,
    };
  }

  const totalKey = `usage:${userId}:${monthKey}:total`;
  const used = Number((await redis.get(totalKey)) || 0);
  const remaining = Math.max(limit - used, 0);

  return {
    limit,
    used,
    remaining,
    resetPeriod: monthKey,
    plan: accountPlan.plan,
  };
}