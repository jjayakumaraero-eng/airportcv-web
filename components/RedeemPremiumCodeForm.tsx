"use client";

import { type FormEvent, useState } from "react";

export default function RedeemPremiumCodeForm() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);

  async function handleRedeem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsRedeeming(true);
    setMessage("");

    try {
      const response = await fetch("/api/redeem-premium-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not redeem premium code.");
      }

      setMessage("Premium access activated. Refreshing your dashboard...");

      window.setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not redeem premium code."
      );
    } finally {
      setIsRedeeming(false);
    }
  }

  return (
    <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-blue-950">
      <h2 className="text-xl font-extrabold">Have a Premium access code?</h2>

      <p className="mt-2 text-sm">
        Enter your founder or early-access code to unlock temporary Premium
        access if you have been given an early-access or support code.
      </p>

      <form onSubmit={handleRedeem} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter access code"
          className="min-h-11 flex-1 rounded-xl border border-blue-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={isRedeeming}
          className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRedeeming ? "Checking..." : "Redeem"}
        </button>
      </form>

      {message ? <p className="mt-3 text-sm font-semibold">{message}</p> : null}
    </div>
  );
}