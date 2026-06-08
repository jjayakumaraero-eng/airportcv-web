import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}

      <section className="bg-[#030814] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            About AirportCV
          </p>

          <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
            Helping Aviation Professionals Build Better Careers
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            AirportCV was created to help airport, airline and aviation
            professionals improve their careers through practical guidance,
            professional applications and AI-powered career tools.
          </p>
        </div>
      </section>

      {/* Mission */}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="font-bold uppercase tracking-wider text-blue-600">
                Our Mission
              </p>

              <h2 className="mt-4 text-4xl font-extrabold">
                Making Career Support Accessible to Everyone in Aviation
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Many airport and aviation professionals have limited access to
                professional career coaching, CV support and interview guidance.
                AirportCV aims to change that by providing accessible tools that
                help people present themselves confidently and progress in their careers.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold">✈ Airport Careers</h3>
                  <p className="mt-2 text-slate-600">
                    Passenger services, ramp operations, security,
                    dispatch and airport management.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">👩‍✈️ Airline Careers</h3>
                  <p className="mt-2 text-slate-600">
                    Cabin crew, customer service and airline operations.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">🚀 Career Growth</h3>
                  <p className="mt-2 text-slate-600">
                    Helping professionals move into leadership,
                    supervisory and management roles.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why AirportCV */}

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">

          <p className="font-bold uppercase tracking-wider text-blue-600">
            Why AirportCV Exists
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            Built Specifically for Airport & Aviation Professionals
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Generic career advice often overlooks the unique requirements of
            airport and aviation roles. AirportCV focuses specifically on
            aviation careers, helping users understand what employers are
            looking for and how to stand out.
          </p>

        </div>
      </section>

      {/* Vision */}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <p className="font-bold uppercase tracking-wider text-blue-600">
            Our Vision
          </p>

          <h2 className="mt-4 text-4xl font-extrabold">
            Becoming the Career Platform for Aviation Professionals
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We believe career development should be accessible, practical and
            tailored to the aviation industry. Our long-term goal is to become
            the leading platform helping aviation professionals get hired,
            get promoted and build rewarding careers.
          </p>

        </div>
      </section>

      {/* CTA */}

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-10 text-center text-white">

          <h2 className="text-3xl font-extrabold">
            Ready to Progress Your Aviation Career?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Start with a free airport career assessment and discover how
            AirportCV can help you achieve your career goals.
          </p>

          <a
            href="/cv-checker"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500"
          >
            Get Your Free Career Assessment →
          </a>

        </div>
      </section>
    </main>
  );
}