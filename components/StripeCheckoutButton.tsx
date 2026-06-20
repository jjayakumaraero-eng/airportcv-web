"use client";

import { useState } from "react";

export default function StripeCheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error || "Could not start checkout.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? "Opening checkout..." : "Start 2 months free"}
      </button>

      {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}