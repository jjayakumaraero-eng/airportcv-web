import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

const careerPaths = [
  {
    title: "Passenger Service Career Path",
    from: "Passenger Service Agent",
    path: ["Senior Passenger Service Agent", "Team Leader", "Duty Manager"],
    desc: "A realistic progression route for candidates building experience in check-in, boarding, disruption handling, customer service and passenger support.",
  },
  {
    title: "Ramp Operations Career Path",
    from: "Ramp Agent",
    path: ["Lead Ramp Agent", "Ramp Supervisor", "Airside Operations Manager"],
    desc: "A route for candidates developing experience in aircraft turnaround, baggage, safety procedures, communication and team coordination.",
  },
  {
    title: "Cabin Crew Career Path",
    from: "Cabin Crew",
    path: ["Senior Cabin Crew", "Purser", "Cabin Services Manager"],
    desc: "A possible pathway for airline professionals with strong safety awareness, service delivery, leadership and passenger-care experience.",
  },
  {
    title: "Airport Security Career Path",
    from: "Airport Security Officer",
    path: ["Senior Security Officer", "Security Supervisor", "Security Manager"],
    desc: "A pathway for candidates building experience in screening, procedures, compliance, passenger communication and operational awareness.",
  },
  {
    title: "Airport Operations Career Path",
    from: "Operations Assistant",
    path: ["Operations Officer", "Duty Operations Officer", "Airport Duty Manager"],
    desc: "A route for candidates interested in airport coordination, safety, incident response, reporting and day-to-day terminal or airside operations.",
  },
  {
    title: "Aircraft Maintenance Career Path",
    from: "Aircraft Technician",
    path: [
      "Licensed Aircraft Engineer",
      "Certifying Engineer",
      "Maintenance Supervisor",
    ],
    desc: "A technical pathway where progression depends on qualifications, approvals, experience, employer structure and regulatory requirements.",
  },
];

export const metadata = {
  title: "Aviation Career Paths | AirportCV",
  description:
    "Explore realistic aviation and airport career progression paths, from entry-level roles to supervisory and management opportunities.",
};

export default function SuccessStoriesPage() {
  return (
    <MarketingPageShell
      eyebrow="Aviation Career Paths"
      title="Realistic airport career progression paths"
      description="Explore how aviation professionals can move from entry-level airport and airline roles into senior, supervisory and management positions."
    >
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6 text-blue-950">
            <p className="font-extrabold">Important note</p>
            <p className="mt-2 leading-7">
              These are example career pathways, not guaranteed outcomes.
              Progression depends on experience, qualifications, employer
              structure, vacancies, performance, training and regulatory
              requirements.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {careerPaths.map((path) => (
              <div
                key={path.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  {path.title}
                </h2>

                <p className="mt-5 text-sm font-extrabold uppercase tracking-wide text-blue-700">
                  Starting role
                </p>

                <div className="mt-2 rounded-2xl bg-blue-50 p-4 font-extrabold text-blue-800 ring-1 ring-blue-100">
                  {path.from}
                </div>

                <div className="mt-6 space-y-3">
                  {path.path.map((step, index) => (
                    <div key={step}>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold text-slate-800">
                        {step}
                      </div>

                      {index < path.path.length - 1 && (
                        <div className="py-2 text-center text-2xl font-black text-blue-600">
                          ↓
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-6 leading-7 text-slate-600">{path.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-10 text-center shadow-sm">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-700">
            Plan your route
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Ready to plan your own airport career path?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Use AirportCV to assess your current position, discover best-fit
            aviation roles and prepare stronger applications.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/career-coach"
              className="rounded-2xl bg-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Start Career Coach
            </Link>

            <Link
              href="/cv-builder"
              className="rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
            >
              Build your CV
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
