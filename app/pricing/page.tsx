import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "/month",
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
    price: "£6.99",
    period: "/month",
    description:
      "For aviation job seekers who want higher usage and full application support.",
    features: [
      "100 AI uses per month",
      "All aviation career tools",
      "Premium report access",
      "CV Builder with Word download",
      "CV Checker",
      "Cover Letter Generator",
      "Interview Preparation",
      "Career Assessment",
      "No saved CV storage by default",
    ],
    cta: "Premium coming soon",
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
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            AirportCV Pricing
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-950 md:text-5xl">
            Simple pricing for your aviation career tools
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Start free, then upgrade when you need more AI uses, premium reports
            and full application support.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 shadow-sm ${
                plan.featured
                  ? "border-blue-200 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.featured ? (
                <span className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Best for active job seekers
                </span>
              ) : null}

              <h2 className="mt-5 text-3xl font-extrabold text-slate-950">
                {plan.name}
              </h2>

              <p className="mt-3 text-slate-600">{plan.description}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-extrabold text-slate-950">
                  {plan.price}
                </span>
                <span className="pb-2 text-slate-500">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-0.5 text-blue-700">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 inline-flex w-full justify-center rounded-xl px-5 py-3 font-semibold ${
                  plan.featured
                    ? "bg-blue-700 text-white hover:bg-blue-800"
                    : "bg-slate-950 text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-950">
            Privacy-first by default
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
            AirportCV does not save uploaded CVs or generated CVs to your
            account by default. Premium is planned to increase access and usage,
            not automatically store your personal CV data.
          </p>

          <div className="mt-5 flex justify-center gap-4 text-sm font-semibold">
            <Link href="/privacy" className="text-blue-700 hover:text-blue-800">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-700 hover:text-blue-800">
              Terms of Use
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}