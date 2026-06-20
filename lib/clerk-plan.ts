import { clerkClient } from "@clerk/nextjs/server";

export async function setUserPremiumPlan({
  clerkUserId,
  premiumUntil,
  stripeCustomerId,
  stripeSubscriptionId,
}: {
  clerkUserId: string;
  premiumUntil?: string | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}) {
  const client = await clerkClient();

  await client.users.updateUserMetadata(clerkUserId, {
    privateMetadata: {
      plan: "premium",
      premiumUntil: premiumUntil || null,
      stripeCustomerId: stripeCustomerId || null,
      stripeSubscriptionId: stripeSubscriptionId || null,
    },
  });
}

export async function setUserFreePlan(clerkUserId: string) {
  const client = await clerkClient();

  await client.users.updateUserMetadata(clerkUserId, {
    privateMetadata: {
      plan: "free",
      premiumUntil: null,
    },
  });
}