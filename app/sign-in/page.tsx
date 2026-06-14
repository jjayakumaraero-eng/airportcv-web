import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <Link href="/" className="text-sm font-bold text-blue-700">
            ← Back to AirportCV
          </Link>

          <p className="mt-10 text-sm font-bold uppercase tracking-wide text-blue-600">
            AirportCV Account
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-950 md:text-5xl">
            Sign in to continue your aviation career journey
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Access your dashboard, protected AI tools, CV Builder, CV Checker,
            cover letters and interview preparation.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-bold text-slate-950">Protected tools</p>
              <p className="mt-2 text-sm text-slate-600">
                Sign in before using AI career tools.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-bold text-slate-950">Usage ready</p>
              <p className="mt-2 text-sm text-slate-600">
                Monthly AI usage limits are being added.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-bold text-slate-950">Privacy first</p>
              <p className="mt-2 text-sm text-slate-600">
                We are not saving CVs to accounts yet.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <SignIn />
        </div>
      </section>
    </main>
  );
}