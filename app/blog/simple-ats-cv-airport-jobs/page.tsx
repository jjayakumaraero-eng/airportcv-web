import Image from "next/image";
import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

export const metadata = {
  title: "Why a Simple ATS-Friendly CV Is Enough for Airport Jobs | AirportCV",
  description:
    "A practical AirportCV guide explaining why a simple, honest, ATS-friendly aviation CV is usually enough — and why interview preparation matters more than over-perfecting your CV.",
  openGraph: {
    title: "Why a Simple ATS-Friendly CV Is Enough for Airport Jobs",
    description:
      "A practical AirportCV guide on simple CVs, ATS-friendly formatting, AI-generated wording and why interview preparation matters.",
    url: "https://www.airportcv.co.uk/blog/simple-ats-cv-airport-jobs",
    siteName: "AirportCV",
    images: [
      {
        url: "https://www.airportcv.co.uk/blog/simple-ats-cv-airport-jobs.png",
        width: 1600,
        height: 900,
        alt: "Simple CV. Strong Interview. AirportCV guide",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Why a Simple ATS-Friendly CV Is Enough for Airport Jobs",
    description:
      "A practical AirportCV guide on simple CVs, ATS-friendly formatting and why interview preparation matters.",
    images: ["https://www.airportcv.co.uk/blog/simple-ats-cv-airport-jobs.png"],
  },
};

const articleUrl = "https://www.airportcv.co.uk/blog/simple-ats-cv-airport-jobs";
const articleTitle = "Why a Simple ATS-Friendly CV Is Enough for Airport Jobs";

const sourceLinks = [
  {
    label: "National Careers Service: How to write a CV",
    href: "https://nationalcareers.service.gov.uk/careers-advice/cv-sections",
  },
  {
    label: "Indeed Career Guide: How to write an ATS resume",
    href: "https://www.indeed.com/career-advice/resumes-cover-letters/ats-resume-template",
  },
  {
    label: "CIPD: Selection methods",
    href: "https://www.cipd.org/en/knowledge/factsheets/selection-factsheet/",
  },
  {
    label: "Civil Service Careers: How to write your CV",
    href: "https://www.civil-service-careers.gov.uk/how-to-write-your-cv/",
  },
  {
    label: "Business Insider: AI resume mistakes to avoid",
    href: "https://www.businessinsider.com/mistakes-job-seekers-avoid-using-ai-resumes-cover-letters-networking-2026-4",
  },
];

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.03 3.66 9.2 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.56v1.9h2.77l-.44 2.91h-2.33V22C18.34 21.26 22 17.09 22 12.06Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.9 2.25h3.08l-6.73 7.69 7.92 11.81h-6.2l-4.85-6.34-5.56 6.34H3.48l7.2-8.23L3.08 2.25h6.36l4.39 5.8 5.07-5.8Zm-1.08 17.42h1.7L8.5 4.22H6.67l11.15 15.45Z" />
    </svg>
  );
}

export default function SimpleAtsCvAirportJobsPage() {
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
      eyebrow="CV Advice"
      title="Why a simple ATS-friendly CV is enough for airport jobs"
      description="A practical guide on why candidates should stop over-perfecting their CVs and spend more time preparing for interviews."
    >
      <article className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <Image
              src="/blog/simple-ats-cv-airport-jobs.png"
              alt="Simple CV. Strong Interview. AirportCV guide"
              width={1600}
              height={900}
              className="w-full"
              priority
            />

            <div className="p-8 md:p-10">
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                    CV advice for aviation jobs
                  </p>

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    Airport Careers • 6 min read
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
                A good CV matters. It helps you make a first impression, show
                your experience clearly and get through the first stage of an
                application process.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                But a CV alone does not get you the job. For airport and airline
                roles, the better strategy is simple: create a clear CV, make it
                relevant to the role, then spend serious time preparing for the
                interview.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  [
                    "Simple structure",
                    "National Careers Service guidance focuses on clear sections such as contact details, introduction, education, work history and references.",
                  ],
                  [
                    "ATS-friendly",
                    "Indeed advises clear section labels and simple formatting because complex layouts can cause parsing problems.",
                  ],
                  [
                    "Interview matters",
                    "CIPD explains that selection can include interviews, tests, assessment centres and references, not just CV screening.",
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

              <section className="mt-12 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                  The short version
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  Your CV should get you noticed. Your interview gets you hired.
                </h2>

                <p className="mt-4 leading-8 text-slate-700">
                  That is the thinking behind AirportCV. We do not encourage
                  candidates to spend weeks chasing a perfect design. We help
                  you create a clean aviation CV, check it against the role and
                  move quickly into interview preparation.
                </p>
              </section>

              <section className="mt-12 space-y-5">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  The problem with over-perfecting your CV
                </h2>

                <p className="leading-8 text-slate-700">
                  Many candidates spend too much time changing colours, layouts,
                  fonts and designs. Some also use AI to rewrite every sentence
                  until the CV sounds polished, but no longer sounds like them.
                </p>

                <p className="leading-8 text-slate-700">
                  That can create a weak application. Recruiters want to
                  understand what you have actually done, what skills you can
                  prove and whether your experience fits the role. A fancy CV
                  cannot replace real examples.
                </p>

                <p className="leading-8 text-slate-700">
                  AI can help improve wording, but it should not remove your
                  personal experience. Career experts have warned that asking AI
                  to write a resume from a job description without your own
                  detail can produce a generic result that does not go far.
                </p>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  What a good aviation CV actually needs
                </h2>

                <p className="mt-5 leading-8 text-slate-700">
                  For most airport and airline applications, your CV should be
                  simple, clear and easy to scan. National Careers Service
                  guidance keeps the core CV structure straightforward: contact
                  details, introduction, education history, work history and
                  references.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {[
                    "Clear contact details",
                    "Short professional profile",
                    "Relevant aviation or customer service skills",
                    "Work experience with useful examples",
                    "Training, education and certificates",
                    "Shift-readiness or availability where relevant",
                    "Simple headings",
                    "Readable Word or PDF format",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-bold text-slate-800"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Why simple is often better for ATS systems
                </h2>

                <p className="mt-5 leading-8 text-slate-700">
                  Applicant tracking systems need to read your CV properly.
                  Indeed’s ATS guidance recommends clear section labels and warns
                  against complex formatting such as tables, graphics, headers
                  and images because important information can be missed or
                  scattered.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                    <h3 className="text-xl font-black text-emerald-800">
                      Better
                    </h3>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                      <li>Simple headings</li>
                      <li>Clear bullet points</li>
                      <li>Readable fonts</li>
                      <li>Role-matched keywords</li>
                      <li>Real examples from your work</li>
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6">
                    <h3 className="text-xl font-black text-rose-700">
                      Avoid overdoing
                    </h3>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                      <li>Heavy graphics</li>
                      <li>Complicated tables</li>
                      <li>Too many columns</li>
                      <li>Generic AI buzzwords</li>
                      <li>Design choices that hide useful content</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  The interview is where you prove yourself
                </h2>

                <p className="mt-5 leading-8 text-slate-700">
                  Once your CV gets you noticed, the interview is where you need
                  to prove your suitability. This is especially important in
                  airport roles where employers want to hear about safety,
                  teamwork, customer service, pressure, communication and
                  reliability.
                </p>

                <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white">
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-200">
                    Interview examples matter
                  </p>

                  <h3 className="mt-3 text-2xl font-black">
                    Be ready to explain what you did, not just what your CV says.
                  </h3>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {[
                      "How you handled a difficult customer",
                      "How you stayed calm under pressure",
                      "How you followed procedures",
                      "How you supported a team",
                      "How you managed a busy shift",
                      "Why you want this airport or airline role",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-slate-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  The AirportCV approach
                </h2>

                <p className="mt-5 leading-8 text-slate-700">
                  AirportCV is built around a practical idea. Create a simple
                  aviation CV, check whether it matches the role, then prepare
                  properly for the interview.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    [
                      "1. Clear CV",
                      "Use a simple, ATS-friendly aviation CV structure.",
                    ],
                    [
                      "2. Role match",
                      "Check whether your skills and experience match the job.",
                    ],
                    [
                      "3. Interview prep",
                      "Practise explaining your real experience confidently.",
                    ],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="text-xl font-black text-slate-950">
                        {title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  Build a simple aviation CV, then practise the interview
                </h2>

                <p className="mt-4 leading-8 text-slate-700">
                  AirportCV gives you basic Word and PDF CV templates because
                  that is usually enough. The goal is not to over-design your CV.
                  The goal is to create a clear application and then prepare for
                  the questions that decide whether you get hired.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/cv-builder"
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Build your CV
                  </Link>

                  <Link
                    href="/interview-prep"
                    className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                  >
                    Practise interview questions
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
