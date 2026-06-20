import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

const lastUpdated = "June 2026";

export const metadata = {
  title: "Terms of Use | AirportCV",
  description:
    "Terms of Use for AirportCV, including AI-generated CV, career, cover letter and interview guidance.",
};

export default function TermsPage() {
  return (
    <MarketingPageShell
      eyebrow="AirportCV"
      title="Terms of Use"
      description="These terms explain how you may use AirportCV’s aviation career tools, including AI-supported CV, cover letter, interview and career guidance features."
    >
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold text-slate-500">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
              <h2 className="text-xl font-extrabold">Important summary</h2>

              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-6">
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
              {[
                {
                  title: "1. About these terms",
                  body: [
                    "These Terms of Use apply when you access or use AirportCV, including the CV Checker, CV Builder, Career Assessment, Cover Letter Generator, Interview Preparation and Premium Report tools.",
                    "By using AirportCV, you agree to use the service responsibly and in line with these terms.",
                  ],
                },
                {
                  title: "2. What AirportCV does",
                  body: [
                    "AirportCV provides AI-supported aviation career tools that help users review CVs, build CV drafts, create cover letters, prepare for interviews and explore aviation career options.",
                    "AirportCV provides career support and document preparation only. It does not make employment, recruitment, hiring, promotion or rejection decisions.",
                  ],
                },
                {
                  title: "3. AI-generated content",
                  body: [
                    "AirportCV uses AI to generate feedback, CV drafts, career suggestions, cover letters, interview questions and related outputs.",
                    "AI-generated content may be inaccurate, incomplete, outdated, unsuitable or not specific to your circumstances. You are responsible for reviewing, editing and checking all content before using it in a job application or professional setting.",
                    "You should not rely on AirportCV as your only source of career, recruitment, legal, immigration, financial or professional advice.",
                  ],
                },
                {
                  title: "4. No job or interview guarantee",
                  body: [
                    "AirportCV does not guarantee that you will receive an interview, job offer, promotion, visa, licence, security clearance or any other career outcome.",
                    "Hiring outcomes depend on employers, recruiters, market conditions, your qualifications, your experience, your application and other factors outside AirportCV’s control.",
                  ],
                },
                {
                  title: "5. Your responsibilities",
                  body: [
                    "You agree to provide accurate information where possible, review and edit generated content before using it, and avoid submitting information you do not have permission to use.",
                    "You must not submit confidential employer information, third-party personal data, unlawful content or unnecessary sensitive information such as passport numbers, National Insurance numbers, financial details, full home address, health information or criminal offence information.",
                    "You must not use AirportCV to misrepresent your experience, qualifications, licences, right to work or employment history.",
                  ],
                },
                {
                  title: "6. CVs, cover letters and applications",
                  body: [
                    "Any CV, cover letter or application content generated by AirportCV is a draft for your review. You are responsible for ensuring that the final content is truthful, accurate and appropriate for the role you are applying for.",
                    "AirportCV may improve wording, structure and presentation, but you should never use generated content that adds false experience, qualifications, licences, employment dates, achievements or responsibilities.",
                  ],
                },
                {
                  title: "7. Privacy and personal data",
                  body: [
                    "Your use of AirportCV is also covered by our Privacy Policy, which explains how CV, career and technical information may be processed.",
                  ],
                },
                {
                  title: "8. Payments, subscriptions, cancellations and refunds",
                  body: [
                    "AirportCV Premium may be offered with a free introductory period. Unless you cancel before the free period ends, your subscription will renew at £4.99 per month.",
                    "You can cancel your Premium subscription at any time. If you cancel, your Premium access will normally continue until the end of your current billing or trial period.",
                    "Payments are processed securely by Stripe. AirportCV does not store your full card details.",
                    "If you believe you were charged in error, contact hello@airportcv.co.uk within 14 days of the first paid charge. Refund requests are reviewed case by case, taking into account account usage, the reason for the request and applicable law.",
                    "Refunds are not usually provided for periods where Premium tools have already been used extensively, except where required by law. Nothing in these terms affects your statutory rights.",
                  ],
                },
                {
                  title: "9. Service availability",
                  body: [
                    "AirportCV may be changed, paused, updated or discontinued at any time. We do not guarantee that the service will always be available, error-free or uninterrupted.",
                  ],
                },
                {
                  title: "10. Third-party services",
                  body: [
                    "AirportCV may rely on third-party providers for hosting, AI processing, infrastructure, analytics or other services. These providers may have their own terms and policies.",
                  ],
                },
                {
                  title: "11. Intellectual property",
                  body: [
                    "AirportCV’s branding, design, layout, code, content and platform materials belong to AirportCV or its licensors.",
                    "You may use the CVs, cover letters and other outputs generated for you for your own personal career and job application purposes.",
                  ],
                },
                {
                  title: "12. Limitation of liability",
                  body: [
                    "To the extent permitted by law, AirportCV is not responsible for loss or damage arising from your use of AI-generated outputs, inaccurate information you submit, employer decisions, recruitment outcomes, missed opportunities or service interruptions.",
                    "Nothing in these terms excludes liability where it would be unlawful to do so.",
                  ],
                },
                {
                  title: "13. Changes to these terms",
                  body: [
                    "We may update these Terms of Use when AirportCV changes or when legal, technical or provider requirements change. The latest version will be shown on this page.",
                  ],
                },
              ].map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    {section.title}
                  </h2>

                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mt-3 leading-8">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  14. Contact
                </h2>

                <p className="mt-3 leading-8">
                  For questions about these terms, contact:
                </p>

                <p className="mt-3 font-extrabold text-slate-950">
                  hello@airportcv.co.uk
                </p>
              </section>

              <section className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Privacy Policy
                </h2>

                <p className="mt-3 leading-8">
                  Please read our Privacy Policy before submitting CVs, career
                  information or personal details.
                </p>

                <Link
                  href="/privacy"
                  className="mt-4 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Read Privacy Policy
                </Link>
              </section>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
