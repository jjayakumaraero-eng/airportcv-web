"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

type CookieChoice = "accepted" | "rejected";

const STORAGE_KEY = "airportcv_cookie_consent_v1";

export default function CookieConsent() {
  const [choice, setChoice] = useState<CookieChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(STORAGE_KEY);

    if (savedChoice === "accepted" || savedChoice === "rejected") {
      setChoice(savedChoice);
    }

    setReady(true);
  }, []);

  function saveChoice(nextChoice: CookieChoice) {
    window.localStorage.setItem(STORAGE_KEY, nextChoice);
    setChoice(nextChoice);
  }

  if (!ready) {
    return null;
  }

  return (
    <>
      {choice === "accepted" && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TY2MBRC7F6"
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TY2MBRC7F6');
            `}
          </Script>

          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x4btwtfqfb");
            `}
          </Script>
        </>
      )}

      {choice === null && (
        <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-slate-200 bg-white/95 px-5 py-4 shadow-2xl backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold text-slate-950">
                AirportCV uses optional analytics cookies
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                We use Google Analytics and Microsoft Clarity to understand how
                visitors use AirportCV and improve the website. You can accept
                or reject analytics. The site will still work if you reject.
                Read our{" "}
                <Link href="/privacy" className="font-bold text-blue-700 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => saveChoice("rejected")}
                className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-extrabold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200"
              >
                Reject analytics
              </button>

              <button
                type="button"
                onClick={() => saveChoice("accepted")}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
