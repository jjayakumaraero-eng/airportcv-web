import Image from "next/image";
import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

export const metadata = {
  title:
    "How to Become an Airport Passenger Service Agent in the UK | AirportCV",
  description:
    "A practical guide to becoming an airport passenger service agent in the UK, including duties, skills, shifts, salary context and CV tips.",
  openGraph: {
    title: "How to Become an Airport Passenger Service Agent in the UK",
    description:
      "A practical AirportCV guide for passenger service agent roles, including duties, skills, salary context and CV tips.",
    url: "https://www.airportcv.co.uk/blog/passenger-service-agent-guide",
    siteName: "AirportCV",
    images: [
      {
        url: "https://www.airportcv.co.uk/blog/passenger-service-agent-guide.png",
        width: 1600,
        height: 900,
        alt: "AirportCV passenger service agent career guide",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Become an Airport Passenger Service Agent in the UK",
    description:
      "A practical AirportCV guide for passenger service agent roles, including duties, skills, salary context and CV tips.",
    images: [
      "https://www.airportcv.co.uk/blog/passenger-service-agent-guide.png",
    ],
  },
};

const articleUrl =
  "https://www.airportcv.co.uk/blog/passenger-service-agent-guide";

const articleTitle =
  "How to Become an Airport Passenger Service Agent in the UK";

const sourceLinks = [
  {
    label: "National Careers Service: Airline customer service agent",
    href: "https://nationalcareers.service.gov.uk/job-profiles/airline-customer-service-agent",
  },
  {
    label: "National Careers Service: Airport information assistant",
    href: "https://nationalcareers.service.gov.uk/job-profiles/airport-information-assistant",
  },
  {
    label: "UK Civil Aviation Authority airport data",
    href: "https://www.caa.co.uk/data-and-analysis/uk-aviation-market/airports/uk-airport-data/",
  },
];

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.03 3.66 9.2 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.56v1.9h2.77l-.44 2.91h-2.33V22C18.34 21.26 22 17.09 22 12.06Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M18.9 2.25h3.08l-6.73 7.69 7.92 11.81h-6.2l-4.85-6.34-5.56 6.34H3.48l7.2-8.23L3.08 2.25h6.36l4.39 5.8 5.07-5.8Zm-1.08 17.42h1.7L8.5 4.22H6.67l11.15 15.45Z" />
    </svg>
  );
}

export default function PassengerServiceAgentGuide() {
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    articleUrl
  )}`;

  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    articleUrl
  )}&text=${encodeURIComponent(articleTitle)}`;

  return (
    <MarketingPageShell
      eyebrow="Airport Careers"
      title="How to become an airport passenger service agent in the UK"
      description="A practical guide for people interested in passenger service and airline customer service roles, with source-backed salary and working-hours context."
    >
      <article className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <Image
              src="/blog/passenger-service-agent-guide.png"
              alt="Airport passenger service agent career guide"
              width={1600}
              height={900}
              className="w-full"
              priority
            />

            <div className="p-8 md:p-10">
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                    Passenger service agent guide
                  </p>

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    Airport Careers • 5 min read
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    Share this guide
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={linkedInShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share this guide on LinkedIn"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A66C2] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <LinkedInIcon />
                    </a>

                    <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share this guide on Facebook"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1877F2] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <FacebookIcon />
                    </a>

                    <a
                      href={xShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share this guide on X"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <XIcon />
                    </a>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-lg leading-8 text-slate-600">
                Passenger service roles can be a strong entry route into airport
                and airline work, especially for people with customer service,
                retail, hospitality, call centre, travel, care or front-of-house
                experience.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  [
                    "Salary context",
                    "NCS lists airline customer service agent pay from £25,000 starter to £30,000 experienced.",
                  ],
                  [
                    "Typical hours",
                    "NCS lists typical hours as 37 to 40 per week, with shift work possible.",
                  ],
                  [
                    "Sector data",
                    "CAA publishes official UK airport statistics and airport traffic data.",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <section className="mt-12 space-y-5">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  What does a passenger service agent do?
                </h2>

                <p className="leading-8 text-slate-700">
                  Passenger service agents, also described by the National
                  Careers Service as airline customer service agents or airline
                  passenger service agents, help passengers and their luggage get
                  checked in correctly and support boarding at the right time.
                </p>

                <p className="leading-8 text-slate-700">
                  In practice, this can include check-in support, boarding gate
                  duties, passenger enquiries, disruption support and helping
                  travellers understand what they need to do next.
                </p>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Salary and working hours
                </h2>

                <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <p className="leading-8 text-blue-950">
                    The National Careers Service lists airline customer service
                    agent pay as approximately <strong>£25,000 starter</strong>{" "}
                    to <strong>£30,000 experienced</strong>. It also lists
                    typical hours as <strong>37 to 40 hours per week</strong>,
                    with evenings, weekends and bank holidays possible on
                    shifts.
                  </p>
                </div>

                <p className="mt-5 leading-8 text-slate-700">
                  Real pay can vary depending on airport, employer, contract
                  type, location, shift pattern, overtime, allowances and level
                  of responsibility. Treat salary figures as guidance, not a
                  guarantee.
                </p>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Who this role can suit
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    [
                      "Aviation beginners",
                      "A practical entry point for people who want airport or airline experience.",
                    ],
                    [
                      "Customer service workers",
                      "Retail, hospitality, call centre and front-desk skills can transfer well.",
                    ],
                    [
                      "Students and part-time workers",
                      "Some airport employers offer shift patterns, but availability requirements vary.",
                    ],
                    [
                      "Career changers",
                      "A useful route for people moving from public-facing roles into aviation.",
                    ],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="text-xl font-extrabold text-slate-950">
                        {title}
                      </h3>
                      <p className="mt-3 leading-7 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Skills recruiters usually look for
                </h2>

                <p className="mt-5 leading-8 text-slate-700">
                  Employers usually want evidence that you can work with people,
                  follow procedures, stay calm under pressure and communicate
                  clearly. For this type of role, your CV should show examples,
                  not just a list of soft skills.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {[
                    "Customer service",
                    "Clear communication",
                    "Teamwork",
                    "Attention to detail",
                    "Problem solving",
                    "Working under pressure",
                    "Following procedures",
                    "Professional passenger handling",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold text-slate-800"
                    >
                      ✓ {skill}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Common CV mistakes
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    [
                      "Too generic",
                      "A CV that could apply to any job usually feels weaker than one focused on airport service.",
                    ],
                    [
                      "No examples",
                      "Saying “good communication” is less effective than showing where you handled customers or solved problems.",
                    ],
                    [
                      "Missing shift readiness",
                      "Airport roles often involve early starts, late finishes, weekends or bank holidays.",
                    ],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-3xl border border-rose-100 bg-rose-50 p-6"
                    >
                      <h3 className="font-extrabold text-rose-700">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Possible progression routes
                </h2>

                <p className="mt-5 leading-8 text-slate-700">
                  Progression depends on employer structure, performance,
                  training, airport size and available vacancies. A realistic
                  pathway may move from passenger service work into senior agent,
                  team leader, supervisor, duty management or wider airport
                  operations roles.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Passenger Service Agent",
                    "Senior Passenger Service Agent",
                    "Team Leader or Supervisor",
                    "Duty Manager",
                    "Airport or Airline Operations roles",
                  ].map((step) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center font-extrabold text-slate-950"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Before you apply, check your aviation CV
                </h2>

                <p className="mt-4 leading-8 text-slate-700">
                  Many candidates already have useful experience. The challenge
                  is presenting it in a way that matches passenger service,
                  safety, teamwork and customer-care expectations.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/cv-builder"
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Build your CV
                  </Link>

                  <Link
                    href="/cv-checker"
                    className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                  >
                    Check your CV
                  </Link>
                </div>
              </section>

              <section className="mt-12 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  Sources and further reading
                </h2>

                <ul className="mt-5 space-y-3">
                  {sourceLinks.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-blue-700 underline"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </article>
    </MarketingPageShell>
  );
}
