import Link from "next/link";
import MarketingPageShell from "@/components/MarketingPageShell";

export default function AboutPage() {
  return (
    <MarketingPageShell
      eyebrow="About AirportCV"
      title="Helping aviation professionals build better careers"
      description="AirportCV helps airport, airline and aviation professionals create stronger applications, improve their CVs and prepare for career progression with practical, aviation-focused tools."
    >
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Our mission
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Making career support accessible to everyone in aviation
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Many airport and aviation professionals have limited access to
              practical CV support, interview guidance and career coaching.
              AirportCV aims to change that by giving people simple tools that
              help them present their experience clearly and confidently.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Airport careers",
                text: "Passenger services, ramp operations, security, dispatch and airport management.",
              },
              {
                title: "Airline careers",
                text: "Cabin crew, customer service, operations and support roles.",
              },
              {
                title: "Career growth",
                text: "Helping aviation professionals move into senior, supervisory and leadership roles.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-extrabold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
            Why AirportCV exists
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Built specifically for airport and aviation professionals
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Generic career advice often misses the language, expectations and
            compliance-focused nature of aviation roles. AirportCV focuses on
            the aviation sector so users can build applications that feel
            relevant, credible and recruiter-friendly.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-slate-100 p-8 text-center shadow-sm md:p-12">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
            Our vision
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Becoming the career platform for aviation professionals
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Our long-term goal is to help aviation professionals get hired, get
            promoted and build rewarding careers through practical guidance,
            intelligent tools and aviation-specific career support.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cv-builder"
              className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Build your aviation CV
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
