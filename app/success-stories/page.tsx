export default function SuccessStoriesPage() {
  const stories = [
    {
      title: "Passenger Service Career Path",
      from: "Passenger Service Agent",
      path: ["Senior Passenger Service Agent", "Team Leader", "Duty Manager"],
      desc: "A common progression route for candidates with strong customer service, check-in, boarding and disruption-handling experience.",
    },
    {
      title: "Ramp Operations Career Path",
      from: "Ramp Agent",
      path: ["Lead Ramp Agent", "Ramp Supervisor", "Airside Operations Manager"],
      desc: "For candidates building experience in aircraft turnaround, baggage, safety procedures and team coordination.",
    },
    {
      title: "Cabin Crew Career Path",
      from: "Cabin Crew",
      path: ["Senior Cabin Crew", "Purser", "Cabin Services Manager"],
      desc: "A progression route for airline professionals with strong service, safety, leadership and passenger-care experience.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-[#030814] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Success Stories
          </p>

          <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
            Realistic Airport Career Progression Paths
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            Explore how airport and aviation professionals can move from entry-level roles
            into senior, supervisory and management positions.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.title} className="rounded-[2rem] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold">{story.title}</h2>

              <p className="mt-5 text-sm font-bold uppercase tracking-wide text-blue-600">
                Starting Role
              </p>

              <div className="mt-2 rounded-2xl bg-blue-50 p-4 font-bold text-blue-800">
                {story.from}
              </div>

              <div className="mt-6 space-y-3">
                {story.path.map((step) => (
                  <div key={step}>
                    <div className="rounded-2xl bg-slate-50 p-4 font-semibold">
                      {step}
                    </div>
                    <div className="py-2 text-center text-2xl text-blue-600">↓</div>
                  </div>
                ))}
                <div className="rounded-2xl bg-slate-950 p-4 font-bold text-white">
                  Long-Term Career Growth
                </div>
              </div>

              <p className="mt-6 leading-7 text-slate-600">{story.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-10 text-center text-white">
          <h2 className="text-3xl font-extrabold">
            Ready to Plan Your Own Airport Career Path?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Use AirportCV to assess your current position, discover best-fit roles and
            prepare stronger applications.
          </p>

          <a
            href="/career-coach"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
          >
            Start Career Coach →
          </a>
        </div>
      </section>
    </main>
  );
}