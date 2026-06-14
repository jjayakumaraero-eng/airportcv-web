import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
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
            Create your aviation career account
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Start using AirportCV’s protected aviation career tools and prepare
            for a subscription-ready workspace.
          </p>

          <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 text-blue-950">
            <h2 className="text-xl font-extrabold">What you get now</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
              <li>Access to protected CV and career tools.</li>
              <li>A simple dashboard for your aviation career journey.</li>
              <li>Monthly usage tracking starting with CV Builder.</li>
              <li>No saved CV storage by default at this stage.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <SignUp />
        </div>
      </section>
    </main>
  );
}