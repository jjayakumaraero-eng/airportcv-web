import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

const publishedArticles = [
  {
    category: "Career Guide",
    title: "Passenger Service Agent Guide",
    description:
      "A practical guide for people interested in passenger service agent roles, including duties, skills and career tips.",
    href: "/blog/passenger-service-agent-guide",
  },
];

const upcomingTopics = [
  "Airport CV tips",
  "Cabin crew applications",
  "Airport interview preparation",
  "Ramp and ground handling careers",
  "Flight dispatch careers",
  "Aviation salary guides",
];

export default function BlogPage() {
  return (
    <MarketingPageShell
      eyebrow="AirportCV Blog"
      title="Aviation career guides and practical advice"
      description="Helpful guides for airport, airline and aviation job seekers. We only publish guides when they are ready, so this page will grow over time."
    >
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                Published guides
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Start here
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-slate-600">
              We’re building AirportCV’s aviation career library carefully, with
              practical content for real airport and airline career paths.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedArticles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
                  {article.category}
                </span>

                <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                  {article.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {article.description}
                </p>

                <span className="mt-7 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition group-hover:bg-blue-700">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Coming next
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              More aviation career topics are being prepared
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              These are planned content areas, not fake published articles. As
              guides are written and reviewed, they’ll be added here.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingTopics.map((topic) => (
              <div
                key={topic}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="font-extrabold text-slate-950">{topic}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Planned guide
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-slate-100 p-8 text-center shadow-sm md:p-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            Want help with your aviation CV now?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Use AirportCV’s tools to build, check and improve your aviation CV
            while the blog library grows.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cv-builder"
              className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Build your CV
            </Link>

            <Link
              href="/cv-checker"
              className="rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
            >
              Check your CV
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
