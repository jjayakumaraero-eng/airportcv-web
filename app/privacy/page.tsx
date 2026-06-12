import Link from "next/link";

const lastUpdated = "June 2026";

const dataCategories = [
  {
    title: "Account details",
    details:
      "AirportCV currently does not provide user accounts. If accounts are added later, account data will be covered in an updated policy.",
  },
  {
    title: "CV and career information",
    details:
      "CV text, uploaded CV content, work experience, education, licences, training, skills, career goals, target roles, job descriptions and aviation-related application information you choose to submit.",
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
    title: "Technical information",
    details:
      "Basic technical data that may be processed by hosting, security or analytics tools, such as IP address, browser type, device information, page interactions and server logs.",
  },
  {
    title: "Temporary browser session data",
    details:
      "Some premium report information may be stored temporarily in your browser session storage so the report page can load during the same browser session.",
  },
];

const purposes = [
  {
    purpose: "CV checking and improvement",
    data: "CV text, target role, optional job description and related career information.",
    lawfulBasis:
      "Steps requested by you before receiving the service, and our legitimate interests in operating the tool.",
  },
  {
    purpose: "CV building and Word document generation",
    data: "CV Builder form details, generated CV content and downloaded Word document content.",
    lawfulBasis:
      "Steps requested by you before receiving the service, and our legitimate interests in providing the requested tool.",
  },
  {
    purpose: "Career assessment",
    data: "Career stage, education, experience, goals, target role and optional CV information.",
    lawfulBasis:
      "Steps requested by you before receiving the service, and our legitimate interests in providing career guidance tools.",
  },
  {
    purpose: "Cover letter and interview preparation",
    data: "Target role, background, CV information, job advert text and user-provided context.",
    lawfulBasis:
      "Steps requested by you before receiving the service, and our legitimate interests in providing application preparation tools.",
  },
  {
    purpose: "Security, debugging and service reliability",
    data: "Technical information, server errors and operational logs.",
    lawfulBasis:
      "Legitimate interests in keeping AirportCV secure, reliable and working correctly.",
  },
  {
    purpose: "Legal compliance",
    data: "Information needed to respond to lawful requests, protect rights or comply with applicable law.",
    lawfulBasis: "Legal obligation and legitimate interests.",
  },
];

const retentionRows = [
  {
    data: "Uploaded or pasted CV content",
    retention:
      "AirportCV is designed not to intentionally store uploaded or pasted CV content on our servers after the request has been processed.",
  },
  {
    data: "CV Builder form data",
    retention:
      "Held in your browser while the page is open. If you download a Word file, that file is stored on your own device.",
  },
  {
    data: "Generated CV, cover letter, interview or assessment output",
    retention:
      "Displayed to you in the browser. We do not intentionally store generated outputs in a server database unless a future feature clearly says otherwise.",
  },
  {
    data: "Premium report session data",
    retention:
      "Stored temporarily in your browser session storage so you can view the premium report page during the same browser session.",
  },
  {
    data: "Server logs and security logs",
    retention:
      "May be retained by hosting or infrastructure providers for operational, security and debugging purposes. We aim not to include CV text or full user submissions in logs.",
  },
  {
    data: "Emails or privacy requests",
    retention:
      "Kept for as long as needed to respond to your request and maintain appropriate records.",
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
    name: "Browser storage on your device",
    purpose:
      "Temporary session storage for premium report viewing and local document downloads.",
  },
];

export const metadata = {
  title: "Privacy Policy | AirportCV",
  description:
    "Privacy Policy for AirportCV, including CV processing, AI processing, browser session storage, retention and UK data protection rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          AirportCV
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">Privacy Policy</h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-blue-950">
          <h2 className="text-xl font-bold"> Summary</h2>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
            <li>
              AirportCV helps users create and improve aviation CVs, cover
              letters, career plans and interview preparation.
            </li>
            <li>
              You choose what information to submit. Please only submit
              information that is needed for the tool you are using.
            </li>
            <li>
              AirportCV is designed not to intentionally store uploaded CVs or
              generated CV content on our servers after processing.
            </li>
            <li>
              Some premium report information may be stored temporarily in your
              browser session storage so the report page can load during that
              session.
            </li>
            <li>
              We use Google Gemini to process your submitted information and
              generate AI outputs.
            </li>
            <li>
              Do not submit unnecessary sensitive information such as passport
              numbers, National Insurance numbers, full home addresses, health
              details, religion, marital status, date of birth or other details
              not needed for a CV.
            </li>
            <li>
              AirportCV does not make hiring decisions, does not guarantee
              interviews or jobs, and does not act as an employer or recruiter.
            </li>
          </ul>
        </div>

        <div className="mt-10 space-y-10 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              1. Who we are
            </h2>

            <p className="mt-3">
              AirportCV is an aviation career platform that provides tools for
              CV checking, CV building, aviation career assessment, cover letter
              generation and interview preparation.
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p>
                <span className="font-semibold text-slate-950">
                  Data controller:
                </span>{" "}
                AirportCV
              </p>

              <p className="mt-2">
                <span className="font-semibold text-slate-950">
                  Contact email:
                </span>{" "}
                privacy@airportcv.com
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Replace this with your correct legal business name, address and
                privacy contact email before publishing. If you operate as a
                sole trader or company, use the correct legal identity.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              2. Scope of this policy
            </h2>

            <p className="mt-3">
              This policy applies when you use AirportCV tools, including the
              Aviation CV Checker, Aviation CV Builder, Aviation Career
              Assessment, Cover Letter Generator, Interview Preparation and
              Premium Report pages.
            </p>

            <p className="mt-3">
              This policy does not cover websites or services operated by other
              organisations, even if AirportCV links to them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              3. Information we process
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {dataCategories.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              4. Information you should not submit
            </h2>

            <p className="mt-3">
              AirportCV is designed for aviation career support, not for
              collecting sensitive identity, health or legal records. Please do
              not submit information unless it is necessary for the specific tool
              you are using.
            </p>

            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
              <h3 className="font-bold">Avoid submitting:</h3>

              <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
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

            <p className="mt-3">
              If you include special category data or criminal offence data in a
              CV or form, AirportCV may process it only as part of generating the
              requested output. We do not intentionally ask for this information
              and encourage you to remove it unless it is necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              5. How we use your information and lawful basis
            </h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid bg-slate-100 text-sm font-bold text-slate-950 md:grid-cols-3">
                <div className="p-4">Purpose</div>
                <div className="p-4">Information used</div>
                <div className="p-4">Likely lawful basis</div>
              </div>

              {purposes.map((row) => (
                <div
                  key={row.purpose}
                  className="grid border-t border-slate-200 text-sm md:grid-cols-3"
                >
                  <div className="p-4 font-semibold text-slate-950">
                    {row.purpose}
                  </div>
                  <div className="p-4">{row.data}</div>
                  <div className="p-4">{row.lawfulBasis}</div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-sm text-slate-500">
              The exact lawful basis may depend on how you use the service and
              any future paid features, account features or analytics features.
              This section should be reviewed if AirportCV’s business model
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              6. AI processing and Google Gemini
            </h2>

            <p className="mt-3">
              AirportCV uses Google Gemini to process the information you submit
              and generate AI outputs, including CV feedback, CV drafts, cover
              letters, career guidance and interview preparation content.
            </p>

            <p className="mt-3">
              When you submit information to an AI-powered tool, the information
              may be sent to Google Gemini for processing. This can include CV
              text, career details, job descriptions and other information you
              enter.
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-950">
                Important Gemini setup note
              </h3>

              <p className="mt-2 text-sm">
                If AirportCV uses an unpaid Gemini API service, Google’s terms
                may allow human review of API inputs and outputs and warn users
                not to submit sensitive, confidential or personal information to
                unpaid services. If AirportCV uses a paid Google Cloud or Vertex
                AI setup, the applicable data handling terms may be different.
                AirportCV should use the setup that is appropriate for processing
                CV and career information and should keep this policy updated.
              </p>
            </div>

            <p className="mt-3">
              AI outputs may be inaccurate, incomplete or unsuitable. You should
              review all generated content before using it in a job application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              7. We do not make employment decisions
            </h2>

            <p className="mt-3">
              AirportCV provides career support, document preparation and
              interview preparation tools. AirportCV does not make recruitment,
              employment, hiring, promotion or rejection decisions.
            </p>

            <p className="mt-3">
              Any scores, ratings, recommendations or AI-generated comments are
              guidance only. They should not be treated as a decision by an
              employer, airline, airport or recruitment agency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              8. Storage and retention
            </h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid bg-slate-100 text-sm font-bold text-slate-950 md:grid-cols-2">
                <div className="p-4">Information</div>
                <div className="p-4">Retention approach</div>
              </div>

              {retentionRows.map((row) => (
                <div
                  key={row.data}
                  className="grid border-t border-slate-200 text-sm md:grid-cols-2"
                >
                  <div className="p-4 font-semibold text-slate-950">
                    {row.data}
                  </div>
                  <div className="p-4">{row.retention}</div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-sm text-slate-500">
              If AirportCV later adds user accounts, saved reports, payment
              history, email delivery or database storage, this policy must be
              updated before or when those features go live.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              9. Browser session storage
            </h2>

            <p className="mt-3">
              AirportCV may use browser session storage to keep premium report
              information available while you view the premium report page. This
              storage is on your device, not in an AirportCV database.
            </p>

            <p className="mt-3">
              Session storage usually clears when the browser session ends, but
              behaviour can vary by browser and device. You can also close the
              tab, clear site data or clear browser storage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              10. Who we share information with
            </h2>

            <p className="mt-3">
              We may share information with service providers who help operate
              AirportCV. They should only process information for the purposes
              described in this policy and under appropriate contractual terms.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {processors.map((processor) => (
                <div
                  key={processor.name}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="font-bold text-slate-950">
                    {processor.name}
                  </h3>
                  <p className="mt-2 text-sm">{processor.purpose}</p>
                </div>
              ))}
            </div>

            <p className="mt-3">
              We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              11. International transfers
            </h2>

            <p className="mt-3">
              Some service providers, including AI and hosting providers, may
              process information outside the United Kingdom. Where this happens,
              AirportCV should rely on appropriate safeguards such as adequacy
              regulations, standard contractual clauses, data processing terms or
              other lawful transfer mechanisms where required.
            </p>

            <p className="mt-3 text-sm text-slate-500">
              This section should be confirmed against your actual Gemini,
              hosting, analytics and business provider contracts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              12. Security
            </h2>

            <p className="mt-3">
              We use reasonable technical and organisational measures to protect
              information submitted through AirportCV. These may include HTTPS,
              server-side API keys, environment variables, restricted access to
              production systems, minimised logging and not intentionally storing
              CV text in a database by default.
            </p>

            <p className="mt-3">
              No online service can guarantee complete security. You are
              responsible for checking that the information you submit is
              appropriate and necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              13. Cookies, analytics and similar technologies
            </h2>

            <p className="mt-3">
              AirportCV may use technologies that store or access information on
              your device, such as session storage. If AirportCV uses cookies,
              analytics, advertising pixels or marketing technologies, this page
              and any cookie banner should explain what is used and why.
            </p>

            <p className="mt-3">
              Non-essential analytics, advertising or marketing cookies should
              not be used unless the correct consent mechanism is in place.
            </p>

            <p className="mt-3 text-sm text-slate-500">
              If you add Google Analytics, Meta Pixel, advertising cookies or
              similar tools, update this section before going live with them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              14. Marketing communications
            </h2>

            <p className="mt-3">
              AirportCV does not currently require marketing emails to use the
              core CV tools. If we introduce newsletters, promotions or email
              marketing, we will provide clear information and collect consent
              where required.
            </p>

            <p className="mt-3">
              You should not be forced to accept marketing as a condition of
              using a CV or career tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              15. Children and young users
            </h2>

            <p className="mt-3">
              AirportCV is intended for people preparing aviation career
              applications. It is not designed for children under 13. If you are
              under 18, use AirportCV with guidance from a parent, guardian,
              teacher or careers adviser.
            </p>

            <p className="mt-3">
              Do not submit unnecessary personal information about children or
              other people.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              16. Your UK data protection rights
            </h2>

            <p className="mt-3">
              Depending on the circumstances and the lawful basis used, you may
              have the right to:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Access personal data we hold about you.</li>
              <li>Ask us to correct inaccurate personal data.</li>
              <li>Ask us to delete personal data in certain circumstances.</li>
              <li>Ask us to restrict processing in certain circumstances.</li>
              <li>Object to processing based on legitimate interests.</li>
              <li>Receive certain data in a portable format.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>

            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-blue-950">
              <h3 className="font-bold">Right to object</h3>
              <p className="mt-2 text-sm">
                You have the right to object to processing based on legitimate
                interests in certain circumstances. You can contact us using the
                details in this policy.
              </p>
            </div>

            <p className="mt-3">
              Because AirportCV is currently designed not to store CVs in user
              accounts or a server database, we may not hold long-term records of
              your submitted CV after processing. If you contact us, please give
              enough information for us to understand and respond to your
              request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              17. Complaints
            </h2>

            <p className="mt-3">
              If you have a privacy concern, please contact us first so we can
              try to resolve it.
            </p>

            <p className="mt-3">
              You also have the right to complain to the UK Information
              Commissioner’s Office.
            </p>

            <a
              href="https://ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Visit the ICO complaints page
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              18. Changes to this policy
            </h2>

            <p className="mt-3">
              We may update this Privacy Policy when AirportCV changes, when we
              add new features, or when legal or provider requirements change.
              The latest version will be shown on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              19. Contact us
            </h2>

            <p className="mt-3">
              For privacy questions or data protection requests, contact:
            </p>

            <p className="mt-3 font-semibold text-slate-950">
              privacy@airportcv.com
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Replace this with your correct monitored email address before
              publishing. If you have a registered company address, add it here.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Back to AirportCV
          </Link>
        </div>
      </section>
    </main>
  );
}