import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured." },
        { status: 500 }
      );
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price ID is not configured." },
        { status: 500 }
      );
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.emailAddresses[0]?.emailAddress,
      client_reference_id: user.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 60,
        metadata: {
          clerkUserId: user.id,
        },
      },
      metadata: {
        clerkUserId: user.id,
      },
      success_url: `${appUrl}/dashboard?stripe=success`,
      cancel_url: `${appUrl}/pricing?stripe=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    return NextResponse.json(
      { error: "Could not start checkout." },
      { status: 500 }
    );
  }
}