import Link from "next/link";

const lastUpdated = "June 2026";

export const metadata = {
  title: "Terms of Use | AirportCV",
  description:
    "Terms of Use for AirportCV, including AI-generated CV, career, cover letter and interview guidance.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          AirportCV
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">Terms of Use</h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <h2 className="text-xl font-bold">Important summary</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
            <li>AirportCV provides aviation career support tools.</li>
            <li>AirportCV is not an employer, recruiter or hiring platform.</li>
            <li>AI-generated outputs may be inaccurate or incomplete.</li>
            <li>You must review and edit all outputs before using them.</li>
            <li>AirportCV does not guarantee jobs, interviews or offers.</li>
            <li>
              Do not submit unnecessary sensitive, confidential or third-party
              information.
            </li>
          </ul>
        </div>

        <div className="mt-10 space-y-10 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              1. About these terms
            </h2>
            <p className="mt-3">
              These Terms of Use apply when you access or use AirportCV,
              including the CV Checker, CV Builder, Career Assessment, Cover
              Letter Generator, Interview Preparation and Premium Report tools.
            </p>
            <p className="mt-3">
              By using AirportCV, you agree to use the service responsibly and in
              line with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              2. What AirportCV does
            </h2>
            <p className="mt-3">
              AirportCV provides AI-supported aviation career tools that help
              users review CVs, build CV drafts, create cover letters, prepare
              for interviews and explore aviation career options.
            </p>
            <p className="mt-3">
              AirportCV provides career support and document preparation only. It
              does not make employment, recruitment, hiring, promotion or
              rejection decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              3. AI-generated content
            </h2>
            <p className="mt-3">
              AirportCV uses AI to generate feedback, CV drafts, career
              suggestions, cover letters, interview questions and related
              outputs.
            </p>
            <p className="mt-3">
              AI-generated content may be inaccurate, incomplete, outdated,
              unsuitable or not specific to your circumstances. You are
              responsible for reviewing, editing and checking all content before
              using it in a job application or professional setting.
            </p>
            <p className="mt-3">
              You should not rely on AirportCV as your only source of career,
              recruitment, legal, immigration, financial or professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              4. No job or interview guarantee
            </h2>
            <p className="mt-3">
              AirportCV does not guarantee that you will receive an interview,
              job offer, promotion, visa, licence, security clearance or any
              other career outcome.
            </p>
            <p className="mt-3">
              Hiring outcomes depend on employers, recruiters, market
              conditions, your qualifications, your experience, your application,
              and other factors outside AirportCV’s control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              5. Your responsibilities
            </h2>
            <p className="mt-3">You agree that you will:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Provide accurate information where possible.</li>
              <li>Review and edit generated content before using it.</li>
              <li>Not submit information you do not have permission to use.</li>
              <li>
                Not submit confidential employer information, third-party
                personal data or unlawful content.
              </li>
              <li>
                Not submit unnecessary sensitive information such as passport
                numbers, National Insurance numbers, financial details, full home
                address, health information or criminal offence information.
              </li>
              <li>
                Not use AirportCV to misrepresent your experience,
                qualifications, licences, right to work or employment history.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              6. CVs, cover letters and applications
            </h2>
            <p className="mt-3">
              Any CV, cover letter or application content generated by AirportCV
              is a draft for your review. You are responsible for ensuring that
              the final content is truthful, accurate and appropriate for the
              role you are applying for.
            </p>
            <p className="mt-3">
              AirportCV may improve wording, structure and presentation, but you
              should never use generated content that adds false experience,
              qualifications, licences, employment dates, achievements or
              responsibilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              7. Privacy and personal data
            </h2>
            <p className="mt-3">
              Your use of AirportCV is also covered by our Privacy Policy, which
              explains how CV, career and technical information may be processed.
            </p>
            <p className="mt-3">
              Please read our{" "}
              <Link href="/privacy" className="font-semibold text-blue-700 underline">
                Privacy Policy
              </Link>{" "}
              before submitting CVs or personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              8. Service availability
            </h2>
            <p className="mt-3">
              AirportCV may be changed, paused, updated or discontinued at any
              time. We do not guarantee that the service will always be
              available, error-free or uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              9. Third-party services
            </h2>
            <p className="mt-3">
              AirportCV may rely on third-party providers for hosting, AI
              processing, infrastructure, analytics or other services. These
              providers may have their own terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              10. Intellectual property
            </h2>
            <p className="mt-3">
              AirportCV’s branding, design, layout, code, content and platform
              materials belong to AirportCV or its licensors.
            </p>
            <p className="mt-3">
              You may use the CVs, cover letters and other outputs generated for
              you for your own personal career and job application purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              11. Limitation of liability
            </h2>
            <p className="mt-3">
              To the extent permitted by law, AirportCV is not responsible for
              loss or damage arising from your use of AI-generated outputs,
              inaccurate information you submit, employer decisions, recruitment
              outcomes, missed opportunities or service interruptions.
            </p>
            <p className="mt-3">
              Nothing in these terms excludes liability where it would be
              unlawful to do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              12. Changes to these terms
            </h2>
            <p className="mt-3">
              We may update these Terms of Use when AirportCV changes or when
              legal, technical or provider requirements change. The latest
              version will be shown on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-950">
              13. Contact
            </h2>
            <p className="mt-3">
              For questions about these terms, contact:
            </p>
            <p className="mt-3 font-semibold text-slate-950">
              support@airportcv.com
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Replace this with your correct monitored support email before
              publishing.
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