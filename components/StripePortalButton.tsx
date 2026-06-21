"use client";

import { useState } from "react";

export default function StripePortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openPortal() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error || "Could not open billing portal.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Could not open billing portal.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={openPortal}
        disabled={loading}
        className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        {loading ? "Opening billing..." : "Manage billing"}
      </button>

      {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}