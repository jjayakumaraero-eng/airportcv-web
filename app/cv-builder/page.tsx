import Link from "next/link";

export const metadata = {
  title: "Aviation CV Builder | AirportCV",
  description:
    "Build a role-focused aviation CV for airport, airline, pilot, cabin crew, engineering and operations roles.",
};

const steps = [
  "Choose your target aviation role",
  "Add your aviation profile and experience",
  "Build a structured aviation CV",
  "Check and improve it with the Aviation CV Checker",
];

export default function CVBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
          AirportCV Tool
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Aviation CV Builder
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-slate-700">
          Build a clear, role-focused aviation CV before checking it with the
          AirportCV Aviation CV Checker.
        </p>

        <div className="mb-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            How it will work
          </h2>

          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-slate-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/career-coach"
            className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white hover:bg-blue-800"
          >
            Start with Career Assessment
          </Link>

          <Link
            href="/cv-checker"
            className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-800 hover:bg-white"
          >
            Go to CV Checker
          </Link>
        </div>
      </section>
    </main>
  );
}