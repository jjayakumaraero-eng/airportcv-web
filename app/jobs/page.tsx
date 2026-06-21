import MarketingPageShell from "@/components/MarketingPageShell";

const jobCategories = [
  {
    title: "UK Airports",
    description: "Official careers pages for major UK airport operators.",
    links: [
      {
        name: "Heathrow Careers",
        company: "Heathrow Airport",
        href: "https://www.heathrow.com/company/careers",
        roles: "Airport operations, security, engineering, customer service and support roles",
      },
      {
        name: "London Gatwick Careers",
        company: "London Gatwick Airport",
        href: "https://jobs.gatwickairport.com/jobs/",
        roles: "Airport operations, construction, commercial, engineering and corporate roles",
      },
      {
        name: "Manchester Airports Group Careers",
        company: "MAG",
        href: "https://mag-careers.com/",
        roles: "Manchester, London Stansted, East Midlands and group roles",
      },
      {
        name: "London City Airport Careers",
        company: "London City Airport",
        href: "https://www.londoncityairport.com/corporate/careers",
        roles: "Airport, passenger, operational and support opportunities",
      },
    ],
  },
  {
    title: "Airlines",
    description: "Official airline career pages for aviation job seekers.",
    links: [
      {
        name: "British Airways Careers",
        company: "British Airways",
        href: "https://careers.ba.com/",
        roles: "Cabin crew, pilots, engineering, airport, commercial and head office roles",
      },
      {
        name: "easyJet Careers",
        company: "easyJet",
        href: "https://careers.easyjet.com/en",
        roles: "Cabin crew, pilots, engineering, operations, data and support roles",
      },
      {
        name: "Virgin Atlantic Careers",
        company: "Virgin Atlantic",
        href: "https://careers.virginatlantic.com/",
        roles: "Airport services, cabin crew, pilots, engineering, cargo and head office roles",
      },
    ],
  },
  {
    title: "Ground Handling & Airport Services",
    description: "Official careers pages for ground handling and airport service companies.",
    links: [
      {
        name: "Swissport Careers",
        company: "Swissport",
        href: "https://careers.swissport.com/",
        roles: "Passenger services, ramp, baggage, cargo, lounge and operational roles",
      },
      {
        name: "dnata UK Careers",
        company: "dnata UK",
        href: "https://www.dnata.co.uk/",
        roles: "Cargo, ground handling, catering, logistics, operations and airport service roles",
      },
      {
        name: "Menzies Aviation Careers",
        company: "Menzies Aviation",
        href: "https://menziesaviation.com/careers/",
        roles: "Ground handling, passenger services, ramp, cargo, fuelling and airport operations roles",
      },
    ],
  },
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
      title="Airport and aviation job opportunities"
      description="Find official airport, airline, ground handling and aviation company careers pages in one place."
    >
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6 text-sm leading-7 text-slate-700">
            <p className="font-extrabold text-slate-950">
              Apply through official employer websites.
            </p>
            <p className="mt-2">
              AirportCV provides these links for convenience only. Job
              availability changes often, so always check the official employer
              careers page before applying.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {jobCategories.map((category) => (
              <section key={category.title}>
                <div className="mb-5">
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    {category.title}
                  </h2>
                  <p className="mt-2 leading-7 text-slate-600">
                    {category.description}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                        {link.company}
                      </p>

                      <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950 group-hover:text-blue-700">
                        {link.name}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {link.roles}
                      </p>

                      <p className="mt-5 text-sm font-extrabold text-blue-700">
                        Open official careers page →
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              More aviation job links coming soon
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              AirportCV will continue adding official airport, airline, ground
              handling, cargo, engineering and aviation service career pages to
              help candidates discover opportunities faster.
            </p>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
