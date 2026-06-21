import MarketingPageShell from "@/components/MarketingPageShell";

const jobCategories = [
  {
    title: "Ground Handling & Airport Services",
    eyebrow: "Start here",
    icon: "🦺",
    description:
      "Official careers pages for ground handling, passenger services, ramp, baggage, cargo, logistics, cleaning, security and airport support roles.",
    links: [
      {
        name: "Swissport Careers",
        company: "Swissport",
        href: "https://www.swissport.com/en/careers",
        roles: "Passenger services, ramp handling, baggage, cargo, lounges and airport operations",
        tag: "Ground handling",
      },
      {
        name: "dnata UK Careers",
        company: "dnata UK",
        href: "https://www.dnata.co.uk/",
        roles: "Cargo, catering, ground operations, logistics, transport and airport services",
        tag: "Cargo & catering",
      },
      {
        name: "Menzies Aviation Careers",
        company: "Menzies Aviation",
        href: "https://menziesaviation.com/careers/",
        roles: "Ground handling, passenger services, ramp, cargo, fuelling and airport operations",
        tag: "Ground handling",
      },
      {
        name: "WFS Careers",
        company: "Worldwide Flight Services",
        href: "https://jobs.wfs.aero/",
        roles: "Cargo services, warehouse, ramp, passenger services, operations and aviation logistics",
        tag: "Cargo handling",
      },
      {
        name: "DHL Aviation Careers",
        company: "DHL",
        href: "https://careers.dhl.com/global/en/dhl-express/aviation-vacancies",
        roles: "Aviation, air freight, logistics, operations, warehouse and airport-based roles",
        tag: "Air freight",
      },
      {
        name: "ABM UK Careers",
        company: "ABM UK",
        href: "https://www.abm.co.uk/careers",
        roles: "Airport services, cleaning, passenger support, facilities and operational roles",
        tag: "Airport services",
      },
      {
        name: "ICTS Careers",
        company: "ICTS UK",
        href: "https://careers.icts.co.uk/",
        roles: "Aviation security, screening, airport security and passenger support roles",
        tag: "Security",
      },
      {
        name: "Wilson James Careers",
        company: "Wilson James",
        href: "https://www.wilsonjames.co.uk/careers",
        roles: "Aviation security, customer service, airport operations and support roles",
        tag: "Security",
      },
      {
        name: "Mitie Careers",
        company: "Mitie",
        href: "https://www.mitie.com/careers/",
        roles: "Security, facilities, cleaning, engineering and airport support services",
        tag: "Facilities",
      },
    ],
  },
  {
    title: "Airlines",
    eyebrow: "Airline careers",
    icon: "✈️",
    description:
      "Official airline career pages for cabin crew, pilots, engineering, airport services, operations, cargo and head office roles.",
    links: [
      {
        name: "British Airways Careers",
        company: "British Airways",
        href: "https://careers.ba.com/",
        roles: "Cabin crew, pilots, engineering, airport operations, commercial and head office roles",
        tag: "UK airline",
      },
      {
        name: "easyJet Careers",
        company: "easyJet",
        href: "https://careers.easyjet.com/en",
        roles: "Cabin crew, pilots, engineering, operations, digital, data and support roles",
        tag: "UK airline",
      },
      {
        name: "Virgin Atlantic Careers",
        company: "Virgin Atlantic",
        href: "https://careers.virginatlantic.com/",
        roles: "Cabin crew, pilots, engineering, airport services, cargo and head office roles",
        tag: "UK airline",
      },
      {
        name: "Ryanair Careers",
        company: "Ryanair",
        href: "https://careers.ryanair.com/",
        roles: "Cabin crew, pilots, engineering, ground operations and customer service roles",
        tag: "Low-cost airline",
      },
      {
        name: "Jet2 Careers",
        company: "Jet2",
        href: "https://www.jet2careers.com/",
        roles: "Cabin crew, pilots, engineering, ground operations, contact centre and corporate roles",
        tag: "UK airline",
      },
      {
        name: "TUI Careers",
        company: "TUI",
        href: "https://careers.tuigroup.com/en",
        roles: "Cabin crew, pilots, travel, airport, engineering, holiday and corporate roles",
        tag: "Travel & airline",
      },
      {
        name: "Wizz Air Careers",
        company: "Wizz Air",
        href: "https://careers.wizzair.com/",
        roles: "Cabin crew, pilots, office, operations and airline support roles",
        tag: "Airline",
      },
      {
        name: "Emirates Group Careers",
        company: "Emirates Group",
        href: "https://www.emiratesgroupcareers.com/",
        roles: "Cabin crew, airport services, engineering, cargo, travel and corporate roles",
        tag: "Global airline",
      },
      {
        name: "Qatar Airways Careers",
        company: "Qatar Airways",
        href: "https://careers.qatarairways.com/",
        roles: "Cabin crew, airport operations, cargo, customer service and corporate roles",
        tag: "Global airline",
      },
      {
        name: "Etihad Careers",
        company: "Etihad Airways",
        href: "https://careers.etihad.com/",
        roles: "Cabin crew, pilots, airport operations, engineering and corporate roles",
        tag: "Global airline",
      },
    ],
  },
  {
    title: "Airports",
    eyebrow: "Airport operators",
    icon: "🛫",
    description:
      "Official careers pages for major UK airports and airport groups.",
    links: [
      {
        name: "Heathrow Careers",
        company: "Heathrow Airport",
        href: "https://www.heathrow.com/company/careers",
        roles: "Airport operations, security, engineering, customer service, commercial and support roles",
        tag: "London",
      },
      {
        name: "London Gatwick Careers",
        company: "London Gatwick Airport",
        href: "https://jobs.gatwickairport.com/jobs/",
        roles: "Airport operations, engineering, construction, commercial, customer and corporate roles",
        tag: "London",
      },
      {
        name: "MAG Careers",
        company: "Manchester Airports Group",
        href: "https://mag-careers.com/",
        roles: "Manchester, London Stansted, East Midlands and group airport roles",
        tag: "Airport group",
      },
      {
        name: "London Stansted Careers",
        company: "London Stansted Airport",
        href: "https://www.stanstedairport.com/recruitment/",
        roles: "Airport partner roles, baggage, security, cabin crew, bus driving and operational roles",
        tag: "London",
      },
      {
        name: "London Luton Airport Careers",
        company: "London Luton Airport",
        href: "https://www.london-luton.co.uk/careers",
        roles: "Airport operations, partner vacancies, customer service, facilities and support roles",
        tag: "London",
      },
      {
        name: "London City Airport Careers",
        company: "London City Airport",
        href: "https://www.londoncityairport.com/corporate/careers",
        roles: "Airport operations, passenger services, customer support and corporate roles",
        tag: "London",
      },
      {
        name: "Birmingham Airport Careers",
        company: "Birmingham Airport",
        href: "https://careers.birminghamairport.co.uk/",
        roles: "Airport vacancies, partner vacancies, operational and customer-facing roles",
        tag: "Midlands",
      },
      {
        name: "Bristol Airport Careers",
        company: "Bristol Airport",
        href: "https://www.bristolairport.co.uk/corporate/careers/",
        roles: "Airport operations, customer service, corporate and partner vacancies",
        tag: "South West",
      },
      {
        name: "Edinburgh Airport Careers",
        company: "Edinburgh Airport",
        href: "https://careers.edinburghairport.com/",
        roles: "Security, airport operations, engineering, retail, HR, early careers and partner roles",
        tag: "Scotland",
      },
      {
        name: "Glasgow Airport Careers",
        company: "Glasgow Airport",
        href: "https://www.glasgowairport.com/about-us/working-with-us/",
        roles: "Airfield, engineering, customer support, commercial, finance, HR and airport operations",
        tag: "Scotland",
      },
      {
        name: "Liverpool Airport Careers",
        company: "Liverpool John Lennon Airport",
        href: "https://www.liverpoolairport.com/careers",
        roles: "Airport vacancies, operational roles and airport partner opportunities",
        tag: "North West",
      },
    ],
  },
];

const quickStats = [
  { label: "Ground handling & services", value: "9+" },
  { label: "Major airlines", value: "10+" },
  { label: "UK airports", value: "11+" },
];

export const metadata = {
  title: "Airport & Aviation Jobs | AirportCV",
  description:
    "Find official airport, airline, ground handling and aviation company careers pages in one place.",
};

export default function JobsPage() {
  return (
    <MarketingPageShell
      eyebrow="Aviation Jobs Hub"
      title="Official airport and aviation careers directory"
      description="Explore official careers pages for ground handling companies, airlines and major UK airports in one place."
    >
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm">
              <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
                ✦ Official careers links
              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Start your aviation job search from trusted employer pages
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                AirportCV brings together official careers pages from aviation
                employers so candidates can quickly discover where to apply for
                ground handling, airline, airport operations, cargo, security,
                engineering and passenger service roles.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#ground-handling-airport-services"
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Ground Handling
                </a>
                <a
                  href="#airlines"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                >
                  Airlines
                </a>
                <a
                  href="#airports"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                >
                  Airports
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-wide text-blue-200">
                Quick directory
              </p>

              <div className="mt-6 grid gap-4">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10"
                  >
                    <p className="text-4xl font-black tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-bold text-blue-100">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-300">
                AirportCV does not guarantee job availability. Always check the
                official employer page and apply directly through the employer.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
            <p className="font-black">Important note</p>
            <p className="mt-1">
              This page links to official employer careers pages only. Job
              openings change frequently, and AirportCV is not affiliated with
              these employers unless stated otherwise.
            </p>
          </div>

          <div className="mt-12 space-y-14">
            {jobCategories.map((category) => (
              <section
                key={category.title}
                id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                className="scroll-mt-28"
              >
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
                      {category.icon} {category.eyebrow}
                    </p>

                    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
                      {category.title}
                    </h2>

                    <p className="mt-3 max-w-3xl leading-8 text-slate-600">
                      {category.description}
                    </p>
                  </div>

                  <p className="text-sm font-extrabold text-slate-500">
                    {category.links.length} official links
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[245px] flex-col rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                            {link.company}
                          </p>

                          <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950 group-hover:text-blue-700">
                            {link.name}
                          </h3>
                        </div>

                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">
                          {link.tag}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {link.roles}
                      </p>

                      <div className="mt-auto pt-6">
                        <span className="inline-flex rounded-2xl bg-blue-50 px-4 py-2 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition group-hover:bg-blue-600 group-hover:text-white">
                          Open careers page →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              More aviation career links coming soon
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              AirportCV will continue expanding this directory with more
              official careers pages for cargo, engineering, aviation security,
              airport retail, travel services and airport-based employers.
            </p>

            <a
              href="mailto:hello@airportcv.co.uk?subject=Suggest%20an%20aviation%20careers%20link"
              className="mt-6 inline-flex rounded-2xl bg-slate-950 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
            >
              Suggest a careers link
            </a>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
