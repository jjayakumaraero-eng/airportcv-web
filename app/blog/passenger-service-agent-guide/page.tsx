import Image from "next/image";

export const metadata = {
  title:
    "How to Become an Airport Passenger Service Agent in the UK (2026 Guide) | AirportCV",
  description:
    "A practical guide to becoming an Airport Passenger Service Agent in the UK, including flexible working, skills, progression and CV tips.",
};

export default function PassengerServiceAgentGuide() {
  return (
    <main className="bg-white text-slate-900">
      <section>
        <Image
          src="/blog/passenger-service-agent-guide.jpeg"
          alt="How to Become an Airport Passenger Service Agent in the UK"
          width={1600}
          height={900}
          className="w-full"
          priority
        />
      </section>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
          Airport Careers • 5 min read
        </p>

        <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
          How to Become an Airport Passenger Service Agent in the UK
        </h1>

        <p className="mt-6 text-xl leading-8 text-slate-600">
          Thinking about working at an airport? Passenger Service Agent is one
          of the most popular entry routes into aviation — especially if you
          already have customer service, retail, hospitality, care or call centre
          experience.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ["💷", "Salary", "£22k–£34k+"],
            ["🕒", "Hours", "Full-time / part-time"],
            ["🎓", "Experience", "Customer service helpful"],
            ["📈", "Growth", "Strong progression"],
          ].map(([icon, label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-5">
              <p className="text-2xl">{icon}</p>
              <p className="mt-3 text-sm font-bold text-slate-500">{label}</p>
              <p className="mt-1 font-extrabold">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 space-y-6">
          <h2 className="text-3xl font-extrabold">
            What Does a Passenger Service Agent Do?
          </h2>

          <p className="leading-8 text-slate-700">
            Passenger Service Agents help travellers through key parts of the
            airport journey, including check-in, boarding gates, passenger
            enquiries and disruption support.
          </p>

          <p className="leading-8 text-slate-700">
            No two shifts are the same. One minute you may be helping a family
            check in for a holiday, and the next you may be assisting a passenger
            during a delay or missed connection.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold">
            Who Is This Role Good For?
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["🎓 Students", "Part-time shifts can work well around studies."],
              ["👩‍👧 Parents & Carers", "Flexible hours may suit people balancing home responsibilities."],
              ["💼 Career Changers", "Retail, hospitality and care experience can transfer well."],
              ["✈️ Aviation Beginners", "A strong entry point into airport and airline careers."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-6">
          <h2 className="text-3xl font-extrabold">
            Skills Recruiters Actually Notice
          </h2>

          <div className="space-y-4">
            {[
              ["Customer Service", "★★★★★"],
              ["Communication", "★★★★★"],
              ["Teamwork", "★★★★★"],
              ["Problem Solving", "★★★★☆"],
              ["Attention to Detail", "★★★★☆"],
            ].map(([skill, rating]) => (
              <div
                key={skill}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-5"
              >
                <span className="font-bold">{skill}</span>
                <span className="text-blue-600">{rating}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold">
            Common Mistakes Applicants Make
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Generic CV", "Airport recruiters spot generic applications quickly."],
              ["No Examples", "Listing skills is weaker than proving them with experience."],
              ["Poor Interview Prep", "Scenario questions are common in airport recruitment."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-red-50 p-6">
                <h3 className="font-bold text-red-700">❌ {title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold">
            Career Progression
          </h2>

          <div className="mt-6 space-y-3">
            {[
              "Passenger Service Agent",
              "Senior Passenger Service Agent",
              "Team Leader",
              "Duty Manager",
              "Airport Operations Manager",
            ].map((step, index) => (
              <div key={step}>
                <div className="rounded-2xl bg-slate-950 p-5 text-center font-bold text-white">
                  {step}
                </div>
                {index < 4 && (
                  <div className="py-2 text-center text-2xl text-blue-600">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-8 text-white">
          <h2 className="text-3xl font-extrabold">
            Before You Apply, Check Your Airport CV
          </h2>

          <p className="mt-4 leading-8 text-slate-200">
            Most candidates already have useful experience. The challenge is
            proving it in a way airport recruiters understand.
          </p>

          <ul className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            <li>✓ Airport role match</li>
            <li>✓ Missing skills</li>
            <li>✓ CV improvement areas</li>
            <li>✓ Interview readiness insights</li>
          </ul>

          <a
            href="/cv-checker"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500"
          >
            Check My Airport CV →
          </a>
        </section>
      </article>
    </main>
  );
}