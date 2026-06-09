export const metadata = {
  title: "Premium Airport Career Report | AirportCV",
  description:
    "Preview the full AirportCV Premium Career Report including ATS analysis, salary potential, recruiter feedback, CV rewrite and interview preparation.",
};

export default function PremiumReportPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <section className="bg-[#030814] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Premium Airport Career Report
          </p>

          <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
            A Complete Career Report Built for Airport Job Seekers
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            Go beyond a basic CV score. Unlock recruiter-style feedback, ATS analysis,
            salary potential, career roadmap and professional application tools.
          </p>

          <a
            href="/cv-checker"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
          >
            Start Free Assessment →
          </a>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "🔍",
              title: "ATS CV Analysis",
              desc: "See how well your CV is likely to perform against airport recruitment systems and keyword filters.",
              points: ["ATS score", "Missing keywords", "Formatting issues"],
            },
            {
              icon: "✈️",
              title: "Airport Role Match",
              desc: "Discover which airport roles your experience is strongest for and where your CV needs improvement.",
              points: ["Top role matches", "Match percentages", "Role suitability"],
            },
            {
              icon: "💷",
              title: "Salary Potential",
              desc: "Understand possible earning pathways based on airport role type, progression and experience level.",
              points: ["Entry-level range", "Progression range", "Supervisor potential"],
            },
            {
              icon: "🧠",
              title: "Recruiter Feedback",
              desc: "Get practical recruiter-style comments on what may reduce interview invitations.",
              points: ["Recruiter concerns", "Strengths", "Weak areas"],
            },
            {
              icon: "🗺️",
              title: "90-Day Career Roadmap",
              desc: "Receive a simple action plan to improve your CV, applications and interview readiness.",
              points: ["Month 1 actions", "Month 2 actions", "Month 3 actions"],
            },
            {
              icon: "📄",
              title: "Professional CV Rewrite",
              desc: "Turn your experience into stronger airport-focused CV language.",
              points: ["Profile rewrite", "Skills section", "Experience bullets"],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                {item.icon}
              </div>

              <h2 className="mt-6 text-2xl font-extrabold">{item.title}</h2>

              <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>

              <ul className="mt-5 space-y-2 text-sm font-semibold text-slate-700">
                {item.points.map((point) => (
                  <li key={point}>✓ {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Example Report Flow
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            What the Full Report Will Include
          </h2>

          <div className="mt-10 space-y-5">
            {[
              ["1", "Airport Readiness Score", "Understand your current employability score."],
              ["2", "Recruiter Review", "See what airport recruiters may notice first."],
              ["3", "ATS Analysis", "Find missing keywords and formatting issues."],
              ["4", "Career Match", "Compare your fit across multiple airport roles."],
              ["5", "Career Roadmap", "Follow a practical improvement plan."],
              ["6", "Application Pack", "Prepare your CV, cover letter and interview answers."],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                className="flex gap-5 rounded-2xl bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                  {num}
                </div>

                <div>
                  <h3 className="font-extrabold">{title}</h3>
                  <p className="mt-1 text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-extrabold">
            Premium Reports Are Launching Soon
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Start with a free AirportCV assessment today. When premium reports launch,
            early users will be first to unlock the full career report.
          </p>

          <a
            href="/cv-checker"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
          >
            Get Free Career Assessment →
          </a>
        </div>
      </section>
    </main>
  );
}