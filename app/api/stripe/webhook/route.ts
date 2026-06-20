import { NextResponse } from "next/server";
import Stripe from "stripe";
import { setUserFreePlan, setUserPremiumPlan } from "@/lib/clerk-plan";

export const runtime = "nodejs";

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const value = (subscription as unknown as { current_period_end?: number })
    .current_period_end;

  return typeof value === "number" ? value : null;
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("STRIPE WEBHOOK SIGNATURE ERROR:", error);
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const clerkUserId = session.metadata?.clerkUserId;
      const stripeCustomerId =
        typeof session.customer === "string" ? session.customer : null;
      const stripeSubscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      if (clerkUserId) {
        await setUserPremiumPlan({
          clerkUserId,
          premiumUntil: null,
          stripeCustomerId,
          stripeSubscriptionId,
        });
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.created"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const clerkUserId = subscription.metadata?.clerkUserId;

      if (clerkUserId) {
        if (
          subscription.status === "active" ||
          subscription.status === "trialing"
        ) {
          await setUserPremiumPlan({
            clerkUserId,
            premiumUntil: getSubscriptionPeriodEnd(subscription)
              ? new Date(getSubscriptionPeriodEnd(subscription)! * 1000).toISOString()
              : null,
            stripeCustomerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : null,
            stripeSubscriptionId: subscription.id,
          });
        } else {
          await setUserFreePlan(clerkUserId);
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const clerkUserId = subscription.metadata?.clerkUserId;

      if (clerkUserId) {
        await setUserFreePlan(clerkUserId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("STRIPE WEBHOOK HANDLER ERROR:", error);

    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 }
    );
  }
}