import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type AirportCVPrivateMetadata = {
  stripeCustomerId?: string;
};

export async function POST() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured." },
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

    const metadata = (user.privateMetadata || {}) as AirportCVPrivateMetadata;
    const stripeCustomerId = metadata.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer found for this account." },
        { status: 400 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("STRIPE PORTAL ERROR:", error);

    return NextResponse.json(
      { error: "Could not open billing portal." },
      { status: 500 }
    );
  }
}