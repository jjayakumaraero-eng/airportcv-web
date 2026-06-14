import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const quickActions = [
  {
    title: "Build aviation CV",
    description:
      "Create a structured UK-style aviation CV for airport, airline and aviation roles.",
    href: "/cv-builder",
    cta: "Build CV",
    featured: true,
  },
  {
    title: "Check my CV",
    description:
      "Review your CV against aviation role expectations and improve weak areas.",
    href: "/cv-checker",
    cta: "Check CV",
    featured: false,
  },
  {
    title: "Career assessment",
    description:
      "Get role direction across airport, airline, cabin crew, operations and engineering pathways.",
    href: "/career-coach",
    cta: "Start assessment",
    featured: false,
  },
  {
    title: "Cover letter",
    description:
      "Generate a tailored aviation cover letter for a target role or job advert.",
    href: "/cover-letter",
    cta: "Create letter",
    featured: false,
  },
  {
    title: "Interview prep",
    description:
      "Practise aviation interview questions and prepare stronger role-specific answers.",
    href: "/interview-prep",
    cta: "Prepare",
    featured: false,
  },
];

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            AirportCV Account
          </p>

          <h1 className="mt-3 text-3xl font-extrabold">Sign in required</h1>

          <p className="mt-3 text-slate-600">
            Please sign in to view your AirportCV dashboard and access your
            aviation career tools.
          </p>

          <Link
            href="/sign-in"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  const email = user.emailAddresses[0]?.emailAddress || "your account";
  const displayName =
    user.firstName || user.fullName || email.split("@")[0] || "there";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
                AirportCV Dashboard
              </p>

              <h1 className="mt-3 text-4xl font-extrabold">
                Welcome back, {displayName}
              </h1>

              <p className="mt-4 max-w-2xl text-blue-100">
                Your aviation career workspace. Build your CV, check your
                application strength, prepare cover letters and practise
                interviews from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100">Signed in as</p>
              <p className="mt-1 font-semibold">{email}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Current plan</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
              Free
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Premium plans will unlock higher usage limits and saved workspace
              features later.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Monthly AI usage
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
              Active
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              CV Builder usage is now counted. More tools will be added to the
              monthly limit soon.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Privacy</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
              No saved CVs yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              AirportCV is not saving uploaded CVs or generated CVs to your
              account at this stage.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Career tools
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
                Continue your aviation career journey
              </h2>
            </div>

            <Link
              href="/privacy"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View privacy policy
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`group rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${
                  action.featured
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-950">
                    {action.title}
                  </h3>

                  {action.featured ? (
                    <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white">
                      Start here
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {action.description}
                </p>

                <p className="mt-5 text-sm font-bold text-blue-700 group-hover:text-blue-800">
                  {action.cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <h2 className="text-xl font-extrabold">Coming next</h2>
          <p className="mt-2 text-sm">
            We are preparing usage limits, premium subscriptions and optional
            saved workspace features. For now, your account gives you protected
            access to AirportCV tools without saving your CVs by default.
          </p>
        </div>
      </section>
    </main>
  );
}