export default function BlogPage() {
  const featuredArticles = [
    {
      category: "Career Guide",
      title: "How to Start an Airport Career in the UK",
      desc: "A beginner-friendly guide to airport roles, skills, applications and progression routes.",
      icon: "✈️",
    },
    {
      category: "Salary Guide",
      title: "Airport Job Salaries: What Can You Earn?",
      desc: "Understand typical salary ranges, shift patterns and career growth opportunities.",
      icon: "💷",
    },
    {
      category: "Interview Advice",
      title: "Airport Interview Questions and How to Answer Them",
      desc: "Prepare stronger answers using customer service, safety and teamwork examples.",
      icon: "🎤",
    },
  ];

  const categories = [
    {
      icon: "🛫",
      title: "Airport Careers",
      desc: "Passenger service, ramp, security, dispatch and airport operations career guides.",
      topics: ["Passenger Service Agent", "Ramp Agent", "Airport Security Officer"],
    },
    {
      icon: "💷",
      title: "Salary Guides",
      desc: "Understand pay, shifts and progression across common airport and aviation roles.",
      topics: ["Passenger Service Salary", "Ramp Agent Salary", "Duty Manager Salary"],
    },
    {
      icon: "🎤",
      title: "Interview Advice",
      desc: "Prepare for airport, airline and cabin crew interviews with practical examples.",
      topics: ["Airport Interviews", "Cabin Crew Interviews", "STAR Method"],
    },
    {
      icon: "📄",
      title: "CV Advice",
      desc: "Improve your CV for airport, airline, ground handling and aviation employers.",
      topics: ["Airport CV Examples", "Cabin Crew CV Tips", "ATS-Friendly CVs"],
    },
    {
      icon: "👩‍✈️",
      title: "Airlines",
      desc: "Career guidance for airline, cabin crew and passenger-facing aviation roles.",
      topics: ["British Airways", "Emirates", "easyJet"],
    },
    {
      icon: "⚙️",
      title: "Airport Operations",
      desc: "Learn about ground handling, dispatch, load control and operational career paths.",
      topics: ["Ground Handling", "Flight Dispatch", "Load Control"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <section className="relative overflow-hidden bg-[#030814] px-6 py-24 text-white">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            AirportCV Blog
          </p>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            Airport Career Guides, Salary Advice and Interview Tips
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            Practical aviation career advice to help you get hired, prepare stronger
            applications and progress your airport career with confidence.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                Featured Guides
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-slate-950">
                Start Here
              </h2>
            </div>

            <p className="max-w-xl text-slate-600">
              These guides will become the main learning hub for airport and aviation
              job seekers as AirportCV grows.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <div
                key={article.title}
                className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] bg-blue-50 transition group-hover:bg-blue-100" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white">
                    {article.icon}
                  </div>

                  <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-600">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950">
                    {article.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {article.desc}
                  </p>

                  <div className="mt-8 inline-flex rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">
                    Coming Soon →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Explore Topics
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-slate-950">
              Build Your Aviation Career Knowledge
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Browse future guides by topic, from airport career paths to cabin crew
              interviews, salary expectations and CV advice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.title}
                className="flex min-h-[340px] flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  {category.icon}
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
                  {category.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {category.desc}
                </p>

                <div className="mt-6 mb-8">
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                    Popular Topics
                  </p>

                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {category.topics.map((topic) => (
                      <li key={topic} className="flex gap-2">
                        <span className="font-bold text-blue-600">✓</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">
                  Guides Coming Soon →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-10 text-white shadow-2xl">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <p className="text-5xl">🚀</p>

              <h2 className="mt-4 text-3xl font-extrabold">
                Want Personalised Aviation Career Guidance?
              </h2>

              <p className="mt-3 max-w-2xl text-slate-200">
                Start with a free airport career assessment and discover your best-fit
                roles, improvement areas and next career steps.
              </p>
            </div>

            <a
              href="/cv-checker"
              className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Get Your Free Career Assessment →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}