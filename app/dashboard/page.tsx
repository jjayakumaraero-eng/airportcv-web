import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import RedeemPremiumCodeForm from "@/components/RedeemPremiumCodeForm";
import StripePortalButton from "@/components/StripePortalButton";
import { getCurrentUserPlan } from "@/lib/usage";

const quickActions = [
  {
    title: "Build aviation CV",
    description:
      "Create a structured UK-style aviation CV for airport, airline and aviation roles.",
    href: "/cv-builder",
    cta: "Build CV",
    badge: "Start here",
    featured: true,
  },
  {
    title: "Check my CV",
    description:
      "Review your CV against aviation role expectations and improve weak areas.",
    href: "/cv-checker",
    cta: "Check CV",
    badge: "Free check",
    featured: false,
  },
  {
    title: "Career assessment",
    description:
      "Discover suitable aviation roles and plan your next career move.",
    href: "/career-coach",
    cta: "Start assessment",
    badge: "Guidance",
    featured: false,
  },
  {
    title: "Cover letter",
    description:
      "Generate a tailored aviation cover letter for a target role or job advert.",
    href: "/cover-letter",
    cta: "Create letter",
    badge: "Application",
    featured: false,
  },
  {
    title: "Interview prep",
    description:
      "Practise aviation interview questions and prepare stronger role-specific answers.",
    href: "/interview-prep",
    cta: "Prepare",
    badge: "Practice",
    featured: false,
  },
  {
    title: "Premium report",
    description:
      "View your full aviation career report after completing a CV assessment.",
    href: "/premium-report",
    cta: "View report",
    badge: "Report",
    featured: false,
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Assess",
    text: "Use CV Checker or Career Coach to understand your current position.",
  },
  {
    number: "02",
    title: "Build",
    text: "Create a stronger aviation CV with the CV Builder.",
  },
  {
    number: "03",
    title: "Apply",
    text: "Generate a cover letter and prepare for interviews.",
  },
];

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center">
              <Image
                src="/airportcv-logo-light.png"
                alt="AirportCV"
                width={180}
                height={52}
                className="h-auto w-36"
                priority
              />
            </Link>

            <Link
              href="/sign-in"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Sign in
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-24">
          <div className="absolute left-1/2 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-blue-700">
              AirportCV Account
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Sign in required
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Please sign in to view your AirportCV dashboard and access your
              aviation career tools.
            </p>

            <Link
              href="/sign-in"
              className="mt-8 inline-flex rounded-2xl bg-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Sign in to dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const accountPlan = await getCurrentUserPlan();
  const email = user.emailAddresses[0]?.emailAddress || "your account";
  const displayName =
    user.firstName || user.fullName || email.split("@")[0] || "there";
  const isPremium = accountPlan.plan === "premium";

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/airportcv-logo-light.png"
              alt="AirportCV"
              width={180}
              height={52}
              className="h-auto w-36"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <Link href="/cv-builder" className="hover:text-blue-700">
              CV Builder
            </Link>
            <Link href="/cv-checker" className="hover:text-blue-700">
              CV Checker
            </Link>
            <Link href="/pricing" className="hover:text-blue-700">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-blue-700">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 sm:block">
              {isPremium ? "Premium" : "Free"} plan
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-16">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-blue-700">
                AirportCV Dashboard
              </p>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Welcome back, {displayName}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Your aviation career workspace. Build your CV, check your
                application strength, generate cover letters and practise
                interviews from one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cv-builder"
                  className="rounded-2xl bg-blue-600 px-7 py-4 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Build my CV
                </Link>

                <Link
                  href="/cv-checker"
                  className="rounded-2xl bg-white px-7 py-4 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                >
                  Check my CV
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-200">
                Account summary
              </p>

              <div className="mt-6 space-y-5">
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm text-blue-100">Signed in as</p>
                  <p className="mt-1 break-words font-bold">{email}</p>
                </div>

                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm text-blue-100">Current plan</p>
                  <p className="mt-1 text-3xl font-black">
                    {isPremium ? "Premium" : "Free"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {isPremium
                      ? "You have premium access enabled on this account."
                      : "Upgrade options and higher usage limits are being prepared."}
                  </p>
                </div>

                {isPremium ? (
                  <StripePortalButton />
                ) : (
                  <Link
                    href="/pricing"
                    className="inline-flex w-full justify-center rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-blue-50"
                  >
                    View pricing
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
              Monthly AI usage
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">Active</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              AI usage is counted for supported tools. More detailed usage
              reporting will be added later.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
              Privacy
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              No saved CVs
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              AirportCV is not saving uploaded CVs or generated CVs to your
              account by default at this stage.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
              Best workflow
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">
              Assess → Build → Apply
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Start with an assessment, build a stronger CV, then prepare your
              cover letter and interview answers.
            </p>
          </div>
        </div>

        {!isPremium ? (
          <div className="mx-auto mt-8 max-w-7xl">
            <RedeemPremiumCodeForm />
          </div>
        ) : null}
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Career tools
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Continue your aviation career journey
              </h2>
            </div>

            <Link
              href="/privacy"
              className="text-sm font-extrabold text-blue-700 hover:text-blue-800"
            >
              View privacy policy
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`group rounded-3xl border p-6 transition hover:-translate-y-0.5 hover:shadow-md ${
                  action.featured
                    ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
                    : "border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black text-slate-950">
                    {action.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                      action.featured
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-600 ring-1 ring-slate-200"
                    }`}
                  >
                    {action.badge}
                  </span>
                </div>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-600">
                  {action.description}
                </p>

                <p className="mt-5 text-sm font-black text-blue-700 group-hover:text-blue-800">
                  {action.cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-8 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Recommended workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Turn your experience into applications
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Use AirportCV like a step-by-step workspace, not just a set of
                separate tools.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {workflowSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-black text-blue-700">
                    {step.number}
                  </p>

                  <h3 className="mt-2 text-xl font-black text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <h2 className="text-xl font-black">Coming next</h2>
          <p className="mt-2 text-sm leading-6">
            We are preparing usage limits, premium subscriptions and optional
            saved workspace features. For now, your account gives you protected
            access to AirportCV tools without saving your CVs by default.
          </p>
        </div>
      </section>
    </main>
  );
}
