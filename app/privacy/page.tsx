import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

const lastUpdated = "June 2026";

export const metadata = {
  title: "Privacy Policy | AirportCV",
  description:
    "Privacy Policy for AirportCV, including CV processing, AI processing, browser session storage, analytics, retention and UK data protection rights.",
};

const dataCategories = [
  {
    title: "CV and career information",
    details:
      "CV text, uploaded CV content, work experience, education, licences, training, skills, career goals, target roles, job descriptions and application information you choose to submit.",
  },
  {
    title: "Contact details",
    details:
      "Name, email address, phone number, general location, LinkedIn URL or website URL if you choose to include them in a CV Builder form or CV document.",
  },
  {
    title: "Generated outputs",
    details:
      "AI-generated CV feedback, CV drafts, career assessment results, cover letters, interview questions, interview feedback and premium report content shown to you.",
  },
  {
    title: "Account and usage information",
    details:
      "If you sign in, account details may be handled by our authentication provider. We may also process usage counters to manage free and premium AI limits.",
  },
  {
    title: "Technical and analytics information",
    details:
      "Basic technical data such as IP address, browser type, device information, pages visited, interactions, server logs and analytics events.",
  },
  {
    title: "Temporary browser session data",
    details:
      "Some premium report information may be stored temporarily in your browser session storage so the report page can load during the same browser session.",
  },
];

const processors = [
  {
    name: "Google Gemini",
    purpose:
      "AI processing to generate CV feedback, CV drafts, cover letters, career guidance and interview preparation outputs.",
  },
  {
    name: "Vercel or hosting provider",
    purpose:
      "Hosting, deployment, security, serverless functions and operational logs.",
  },
  {
    name: "Clerk",
    purpose:
      "Authentication and account access where sign-in features are used.",
  },
  {
    name: "Upstash Redis",
    purpose:
      "Usage counters and limits for AI-powered tools.",
  },
  {
    name: "Google Analytics",
    purpose:
      "Website analytics, usage measurement and understanding how visitors use AirportCV.",
  },
  {
    name: "Microsoft Clarity",
    purpose:
      "Session analytics, page interaction insights and website improvement.",
  },
  {
    name: "Browser storage on your device",
    purpose:
      "Temporary session storage for premium report viewing and local document downloads.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <MarketingPageShell
      eyebrow="AirportCV"
      title="Privacy Policy"
      description="This policy explains how AirportCV processes CV, career, technical, analytics and account-related information when you use our aviation career tools."
    >
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold text-slate-500">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 text-blue-950">
              <h2 className="text-xl font-extrabold">Summary</h2>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-6">
                <li>
                  AirportCV helps users create and improve aviation CVs, cover
                  letters, career plans and interview preparation.
                </li>
                <li>
                  You choose what information to submit. Please only submit
                  information that is needed for the tool you are using.
                </li>
                <li>
                  AirportCV is designed not to intentionally store uploaded CVs
                  or generated CV content in a long-term CV database after
                  processing.
                </li>
                <li>
                  Some premium report information may be stored temporarily in
                  your browser session storage during the same browser session.
                </li>
                <li>
                  We use AI, hosting, authentication, usage-limit, analytics and
                  website-improvement providers to operate AirportCV.
                </li>
                <li>
                  Do not submit unnecessary sensitive information such as
                  passport numbers, National Insurance numbers, full home
                  addresses, health details, religion, marital status, date of
                  birth or other details not needed for a CV.
                </li>
              </ul>
            </div>

            <div className="mt-10 space-y-10 text-slate-700">
              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  1. Who we are
                </h2>

                <p className="mt-3 leading-8">
                  AirportCV is an aviation career platform that provides tools
                  for CV checking, CV building, aviation career assessment,
                  cover letter generation, interview preparation and related
                  career support.
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p>
                    <span className="font-extrabold text-slate-950">
                      Data controller:
                    </span>{" "}
                    AirportCV
                  </p>

                  <p className="mt-2">
                    <span className="font-extrabold text-slate-950">
                      Contact email:
                    </span>{" "}
                    hello@airportcv.co.uk
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  2. Scope of this policy
                </h2>

                <p className="mt-3 leading-8">
                  This policy applies when you use AirportCV tools, including
                  the Aviation CV Checker, Aviation CV Builder, Aviation Career
                  Assessment, Cover Letter Generator, Interview Preparation and
                  Premium Report pages.
                </p>

                <p className="mt-3 leading-8">
                  This policy does not cover websites or services operated by
                  other organisations, even if AirportCV links to them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  3. Information we process
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {dataCategories.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <h3 className="font-extrabold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6">{item.details}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  4. Information you should not submit
                </h2>

                <p className="mt-3 leading-8">
                  AirportCV is designed for aviation career support, not for
                  collecting sensitive identity, health or legal records. Please
                  do not submit information unless it is necessary for the
                  specific tool you are using.
                </p>

                <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
                  <h3 className="font-extrabold">Avoid submitting:</h3>

                  <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-6">
                    <li>Passport numbers or National Insurance numbers.</li>
                    <li>Full home address.</li>
                    <li>Date of birth, age, gender or marital status.</li>
                    <li>Religion, ethnicity or political opinions.</li>
                    <li>Health information or disability information.</li>
                    <li>Criminal offence information.</li>
                    <li>Financial information or bank details.</li>
                    <li>Any confidential employer or third-party information.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  5. Why we process information
                </h2>

                <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
                  <div className="grid bg-slate-100 p-4 text-sm font-extrabold text-slate-950 md:grid-cols-3">
                    <p>Purpose</p>
                    <p>Data used</p>
                    <p>Reason</p>
                  </div>

                  {[
                    [
                      "CV checking and improvement",
                      "CV text, target role, optional job description and related career information.",
                      "To provide the service requested by you.",
                    ],
                    [
                      "CV building and document generation",
                      "CV Builder form details, generated CV content and downloaded document content.",
                      "To provide the requested CV Builder tool.",
                    ],
                    [
                      "Career tools and interview preparation",
                      "Career stage, education, experience, goals, target role and user-provided context.",
                      "To provide aviation career guidance tools.",
                    ],
                    [
                      "Security and reliability",
                      "Technical information, server errors and operational logs.",
                      "To keep AirportCV secure and working correctly.",
                    ],
                    [
                      "Analytics and website improvement",
                      "Usage, page interaction and technical analytics information.",
                      "To understand and improve the website and user experience.",
                    ],
                  ].map(([purpose, data, reason]) => (
                    <div
                      key={purpose}
                      className="grid gap-3 border-t border-slate-200 p-4 text-sm leading-6 md:grid-cols-3"
                    >
                      <p className="font-bold text-slate-950">{purpose}</p>
                      <p>{data}</p>
                      <p>{reason}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  6. AI processing
                </h2>

                <p className="mt-3 leading-8">
                  AirportCV uses AI services, including Google Gemini, to
                  process information you submit and generate CV feedback, CV
                  drafts, career suggestions, cover letters and interview
                  preparation outputs.
                </p>

                <p className="mt-3 leading-8">
                  AI-generated outputs may be inaccurate, incomplete or
                  unsuitable. You are responsible for reviewing and editing any
                  output before using it in an application or professional
                  setting.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  7. Analytics and website improvement
                </h2>

                <p className="mt-3 leading-8">
                  AirportCV may use analytics and website-improvement tools,
                  including Google Analytics and Microsoft Clarity, to understand
                  how visitors use the site, measure performance, improve page
                  design and identify technical issues.
                </p>

                <p className="mt-3 leading-8">
                  These tools may process technical information such as page
                  visits, browser information, device information, interactions,
                  approximate location derived from IP address and similar usage
                  data. Analytics data should not be used to intentionally store
                  full CV text or full user submissions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  8. Processors and service providers
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {processors.map((processor) => (
                    <div
                      key={processor.name}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <h3 className="font-extrabold text-slate-950">
                        {processor.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6">
                        {processor.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  9. Retention
                </h2>

                <p className="mt-3 leading-8">
                  AirportCV is designed not to intentionally store uploaded or
                  pasted CV content on our servers after the request has been
                  processed. CV Builder form data is held in your browser while
                  the page is open, and downloaded Word or PDF files are stored
                  on your own device.
                </p>

                <p className="mt-3 leading-8">
                  Technical logs, usage counters, analytics information, emails
                  and privacy requests may be retained for operational, security,
                  legal or support purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  10. Your rights
                </h2>

                <p className="mt-3 leading-8">
                  Depending on your location and applicable law, you may have
                  rights to access, correct, delete, restrict or object to the
                  processing of your personal data. You may also have the right
                  to complain to a data protection authority.
                </p>

                <p className="mt-3 leading-8">
                  To make a privacy request, contact hello@airportcv.co.uk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  11. Changes to this policy
                </h2>

                <p className="mt-3 leading-8">
                  We may update this Privacy Policy when AirportCV changes, when
                  providers change or when legal requirements change. The latest
                  version will be shown on this page.
                </p>
              </section>

              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Questions?
                </h2>

                <p className="mt-3 leading-8">
                  For questions about this Privacy Policy or your data, contact
                  AirportCV.
                </p>

                <a
                  href="mailto:hello@airportcv.co.uk"
                  className="mt-4 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Email AirportCV
                </a>
              </section>

              <div className="border-t border-slate-200 pt-6">
                <Link
                  href="/terms"
                  className="inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
                >
                  Read Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
