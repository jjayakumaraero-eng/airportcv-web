import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

export default function ContactPage() {
  return (
    <MarketingPageShell
      eyebrow="Contact AirportCV"
      title="Get in touch"
      description="Have a question, partnership idea or feedback about AirportCV? We’d love to hear from aviation professionals, employers, training providers and recruitment partners."
    >
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Contact details
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              We’re here to help
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              For support, feedback or partnership enquiries, contact the
              AirportCV team using the details below.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-blue-700">
                  General enquiries
                </p>
                <p className="mt-2 text-lg font-extrabold text-slate-950">
                  hello@airportcv.co.uk
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-extrabold text-slate-950">Partnerships</p>
                <p className="mt-2 leading-7 text-slate-600">
                  For aviation employers, training providers, recruitment
                  partners and industry collaborations.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-extrabold text-slate-950">Feedback</p>
                <p className="mt-2 leading-7 text-slate-600">
                  Share suggestions to help us improve AirportCV for aviation
                  professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Send a message
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Message form coming soon
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We’re preparing a contact form. For now, please email us directly
              and include your name, enquiry type and any useful details.
            </p>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
              <p className="font-extrabold text-slate-950">
                What to include in your email
              </p>

              <ul className="mt-4 space-y-3 text-slate-600">
                <li>• Your name and contact email</li>
                <li>• Whether your enquiry is support, feedback or partnership</li>
                <li>• A short description of how we can help</li>
              </ul>

              <a
                href="mailto:hello@airportcv.co.uk"
                className="mt-6 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Email AirportCV
              </a>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-extrabold text-slate-950">
                Need help with your CV?
              </p>
              <p className="mt-2 leading-7 text-slate-600">
                You can also use our CV Builder or CV Checker for instant
                aviation-focused support.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cv-builder"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-slate-800"
                >
                  Build CV
                </Link>

                <Link
                  href="/cv-checker"
                  className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                >
                  Check CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
