import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function addDays(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Please sign in to redeem a premium access code." },
        { status: 401 }
      );
    }

    const { code } = await request.json();

    const submittedCode = String(code || "").trim().toUpperCase();
    const expectedCode = String(process.env.PREMIUM_ACCESS_CODE || "")
      .trim()
      .toUpperCase();

    if (!expectedCode) {
      return NextResponse.json(
        { error: "Premium access code is not configured." },
        { status: 500 }
      );
    }

    if (!submittedCode || submittedCode !== expectedCode) {
      return NextResponse.json(
        { error: "Invalid premium access code." },
        { status: 400 }
      );
    }

    const days = Number(process.env.PREMIUM_ACCESS_DAYS || 30);
    const premiumUntil = addDays(days).toISOString();

    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        plan: "premium",
        premiumSource: "access_code",
        premiumUntil,
        premiumRedeemedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      plan: "premium",
      premiumUntil,
    });
  } catch (error) {
    console.error(
      "Redeem premium code error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Could not redeem premium code right now." },
      { status: 500 }
    );
  }
}