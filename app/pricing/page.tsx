import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "For trying AirportCV and using the core aviation tools.",
    features: [
      "5 AI uses per month",
      "Access to protected career tools",
      "CV Builder access",
      "CV Checker access",
      "Career Assessment access",
      "No saved CV storage by default",
    ],
    cta: "Start free",
    href: "/sign-up",
    featured: false,
  },
  {
    name: "Premium",
    price: "Free for 2 months",
    period: "then £4.99/month",
    description:
      "For aviation job seekers who want higher usage and full application support.",
    features: [
      "100 AI uses per month",
      "All aviation career tools",
      "Premium report access",
      "CV Builder with Word and PDF download",
      "CV Checker",
      "Cover Letter Generator",
      "Interview Preparation",
      "Career Assessment",
      "No saved CV storage by default",
    ],
    cta: "Launch offer",
    href: "/dashboard",
    featured: true,
  },
];

export const metadata = {
  title: "Pricing | AirportCV",
  description:
    "Simple AirportCV pricing for aviation CV, cover letter, career assessment and interview preparation tools.",
};

export default function PricingPage() {
  return (
    <MarketingPageShell
      eyebrow="AirportCV Pricing"
      title="Simple pricing for your aviation career tools"
      description="Start free, then upgrade when you need more AI uses, premium reports and full application support."
    >
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[2rem] border p-8 shadow-sm ${
                  plan.featured
                    ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="inline-flex rounded-full bg-blue-600 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
                    Best for active job seekers
                  </span>
                )}

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
                  {plan.name}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-5xl font-black tracking-tight text-slate-950">
                    {plan.price}
                  </span>
                  <span className="pb-2 text-slate-500">{plan.period}</span>
                </div>

                <ul className="mt-7 space-y-3 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-0.5 font-extrabold text-blue-700">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {plan.featured ? (
                    <StripeCheckoutButton />
                  ) : (
                    <Link
                      href={plan.href}
                      className="inline-flex w-full justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-slate-800"
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Privacy-first by default
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              AirportCV does not save uploaded CVs or generated CVs to your
              account by default. Premium launches with 2 months free, then £4.99/month, and is planned to increase access and
              usage, not automatically store your personal CV data.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-extrabold">
              <Link
                href="/privacy"
                className="rounded-2xl bg-blue-50 px-5 py-3 text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-100"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="rounded-2xl bg-slate-50 px-5 py-3 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
