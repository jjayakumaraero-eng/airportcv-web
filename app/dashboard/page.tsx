import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold">Sign in required</h1>
          <p className="mt-3 text-slate-600">
            Please sign in to view your AirportCV dashboard.
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

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          AirportCV Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">
          Welcome{user.firstName ? `, ${user.firstName}` : ""}
        </h1>

        <p className="mt-3 text-slate-600">
          Your account is ready. This dashboard will later show your usage,
          subscription status and saved career tools.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-950">Account</h2>
            <p className="mt-2 text-sm text-slate-600">
              Signed in as{" "}
              {user.emailAddresses[0]?.emailAddress || "your account"}.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-950">Plan</h2>
            <p className="mt-2 text-sm text-slate-600">
              Free plan. Premium subscriptions can be added later.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-bold text-slate-950">Privacy</h2>
            <p className="mt-2 text-sm text-slate-600">
              We are not saving CVs to your account yet.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/cv-builder"
            className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Build my CV
          </Link>

          <Link
            href="/cv-checker"
            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Check my CV
          </Link>

          <Link
            href="/career-coach"
            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Career assessment
          </Link>
        </div>
      </section>
    </main>
  );
}