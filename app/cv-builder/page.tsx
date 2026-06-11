import Link from "next/link";

export const metadata = {
  title: "Aviation CV Builder | AirportCV",
  description:
    "Build a role-focused aviation CV for airport, airline, pilot, cabin crew, engineering and operations roles.",
};

const aviationRoles = [
  "Passenger Service Agent",
  "Check-in Agent",
  "Boarding Gate Agent",
  "Lounge Agent",
  "Ramp Agent",
  "Baggage Handler",
  "Airport Security Officer",
  "Flight Dispatcher",
  "Load Controller",
  "Cabin Crew",
  "Pilot",
  "Aircraft Maintenance Engineer",
  "Aircraft Technician",
  "Cargo Agent",
  "Airport Operations Officer",
  "Airport Duty Manager",
  "Other Airport / Airline Role",
];

export default function CVBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
            AirportCV Tool
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Aviation CV Builder
          </h1>

          <p className="max-w-3xl text-lg text-slate-700">
            Create a structured aviation CV for your target airport, airline,
            pilot, cabin crew, engineering or operations role. Start with your
            core details and build the CV step by step.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <form className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Basic details
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                These details will form the top section of your aviation CV.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Jay Kumar"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="targetRole"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Target aviation role
                </label>
                <select
                  id="targetRole"
                  name="targetRole"
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {aviationRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+44 7000 000000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. London, UK"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="careerStage"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Career stage
                </label>
                <select
                  id="careerStage"
                  name="careerStage"
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select career stage
                  </option>
                  <option value="Student / graduate">Student / graduate</option>
                  <option value="Entry level">Entry level</option>
                  <option value="Experienced aviation professional">
                    Experienced aviation professional
                  </option>
                  <option value="Career changer">Career changer</option>
                  <option value="Returning to aviation">
                    Returning to aviation
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="profile"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Professional profile
              </label>
              <textarea
                id="profile"
                name="profile"
                rows={5}
                placeholder="Write a short summary of your aviation background, strengths and career goal."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              Submit and AI generation will be added in the next steps.
            </div>
          </form>

          <aside className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <h2 className="text-xl font-semibold">Recommended journey</h2>

            <ol className="mt-5 space-y-4 text-sm text-slate-200">
              <li>1. Complete Career Assessment</li>
              <li className="font-semibold text-white">2. Build your CV</li>
              <li>3. Check your CV</li>
              <li>4. Generate Cover Letter</li>
              <li>5. Practise Interview Questions</li>
            </ol>

            <div className="mt-8 space-y-3">
              <Link
                href="/career-coach"
                className="block rounded-xl bg-white px-4 py-3 text-center font-semibold text-slate-900 hover:bg-slate-100"
              >
                Career Assessment
              </Link>

              <Link
                href="/cv-checker"
                className="block rounded-xl border border-slate-600 px-4 py-3 text-center font-semibold text-white hover:bg-slate-800"
              >
                CV Checker
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}