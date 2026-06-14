import Image from "next/image";
import AuthButtons from "@/components/AuthButtons";

export const metadata = {
  title: "AirportCV | Aviation CV Builder, CV Checker & Career Tools",
  description:
    "Build a stronger aviation CV, check your application, generate cover letters and prepare for airport, airline, cabin crew, engineering and ground handling roles.",
};

const tools = [
  {
    eyebrow: "Start here",
    icon: "📄",
    title: "Aviation CV Builder",
    description:
      "Create a structured UK-style aviation CV for airport, airline, cabin crew, engineering, operations and ground handling roles.",
    href: "/cv-builder",
    cta: "Build my CV",
    featured: true,
    accent: "bg-blue-600",
    ring: "border-blue-200 bg-blue-50",
  },
  {
    eyebrow: "Improve",
    icon: "✅",
    title: "Aviation CV Checker",
    description:
      "Check your CV against aviation role expectations, missing keywords, structure, skills and application strength.",
    href: "/cv-checker",
    cta: "Check my CV",
    featured: false,
    accent: "bg-sky-600",
    ring: "border-slate-200 bg-white",
  },
  {
    eyebrow: "Direction",
    icon: "🧭",
    title: "Career Assessment",
    description:
      "Find suitable aviation career paths based on your background, experience, education and goals.",
    href: "/career-coach",
    cta: "Start assessment",
    featured: false,
    accent: "bg-purple-600",
    ring: "border-slate-200 bg-white",
  },
  {
    eyebrow: "Apply",
    icon: "✍️",
    title: "Cover Letter Generator",
    description:
      "Create tailored aviation cover letters for airport, airline and aviation job applications.",
    href: "/cover-letter",
    cta: "Create cover letter",
    featured: false,
    accent: "bg-emerald-600",
    ring: "border-slate-200 bg-white",
  },
  {
    eyebrow: "Prepare",
    icon: "🎤",
    title: "Interview Preparation",
    description:
      "Practise role-specific aviation interview questions and prepare stronger, clearer answers.",
    href: "/interview-prep",
    cta: "Prepare for interview",
    featured: false,
    accent: "bg-orange-600",
    ring: "border-slate-200 bg-white",
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Choose your aviation goal",
    text: "Start with a target role or use the career assessment to identify suitable aviation paths.",
  },
  {
    number: "02",
    title: "Build or improve your CV",
    text: "Create a new aviation CV or check your existing CV for structure, keywords and role fit.",
  },
  {
    number: "03",
    title: "Prepare your application",
    text: "Generate a tailored cover letter and practise interview answers before you apply.",
  },
];

const roleGroups = [
  "Cabin Crew",
  "Passenger Service Agent",
  "Ramp Agent",
  "Baggage Handler",
  "Airport Security",
  "Flight Dispatcher",
  "Load Controller",
  "Aircraft Engineering",
  "Ground Handling",
  "Cargo & Logistics",
  "Airport Operations",
  "Pilot & Flight Operations",
];

const trustPoints = [
  {
    title: "UK-style CV structure",
    text: "Clear, professional CV wording built around UK aviation applications.",
    icon: "🇬🇧",
  },
  {
    title: "ATS-friendly guidance",
    text: "Role keywords, readable sections and practical structure for online applications.",
    icon: "🔎",
  },
  {
    title: "Aviation specific",
    text: "Designed for airport, airline, ground operations, cabin crew and engineering careers.",
    icon: "✈️",
  },
  {
    title: "Privacy-first",
    text: "AirportCV does not save uploaded CVs to accounts by default at this stage.",
    icon: "🔒",
  },
];

const pricingFeatures = [
  "5 AI uses per month",
  "Protected access to core tools",
  "CV Builder and CV Checker",
  "No saved CV storage by default",
];

const premiumFeatures = [
  "100 AI uses per month",
  "All aviation career tools",
  "Premium report access",
  "Word CV download support",
  "Cover letters and interview prep",
];

const faqs = [
  {
    question: "Is AirportCV only for airport jobs?",
    answer:
      "No. AirportCV covers airport, airline and wider aviation roles, including cabin crew, ground handling, engineering, cargo, operations, security and flight operations.",
  },
  {
    question: "Do I need to sign in?",
    answer:
      "Yes. The AI tools are protected behind sign-in so usage can be managed fairly and the platform can support future premium plans.",
  },
  {
    question: "Does AirportCV save my CV?",
    answer:
      "Not by default. AirportCV is currently designed to process your information for the tool you use without saving uploaded CVs to your account.",
  },
  {
    question: "Is Premium active now?",
    answer:
      "Premium is coming soon. For now, selected users can use a temporary Premium access code while Stripe payments are being prepared.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
     <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
    <a href="/" className="flex shrink-0 items-center">
      <Image
        src="/airportcv-logo-light.png"
        alt="AirportCV"
        width={260}
        height={90}
        priority
        className="h-auto w-[190px] sm:w-[230px]"
      />
    </a>

    <div className="hidden items-center gap-8 text-sm font-bold text-slate-700 lg:flex">
      <a href="/" className="text-blue-700 transition hover:text-blue-800">
        Home
      </a>

      <div className="group relative">
        <button className="flex items-center gap-1 transition hover:text-blue-700">
          Tools <span className="text-xs">▾</span>
        </button>

        <div className="invisible absolute left-0 top-full z-50 mt-4 w-80 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="block rounded-xl px-4 py-3 hover:bg-blue-50"
            >
              <span className="block font-bold">{tool.title}</span>
              <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">
                {tool.description}
              </span>
            </a>
          ))}
        </div>
      </div>

      <a href="/pricing" className="transition hover:text-blue-700">
        Pricing
      </a>

      <a href="/about" className="transition hover:text-blue-700">
        About
      </a>

      <a href="/success-stories" className="transition hover:text-blue-700">
        Success Stories
      </a>

      <a href="/blog" className="transition hover:text-blue-700">
        Blog
      </a>
    </div>

    <div className="flex items-center gap-3">
      <a
        href="/cv-builder"
        className="hidden rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 xl:inline-flex"
      >
        Build My CV
      </a>

      <AuthButtons />
    </div>
  </div>
</nav>

<section className="relative overflow-hidden bg-white">
  <div className="absolute inset-0">
    <Image
      src="/airportcv-hero-bg.png"
      alt=""
      fill
      priority
      className="object-cover object-center opacity-80"
    />
  </div>

  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20" />

  <div className="relative mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-12">
    <div className="max-w-2xl">
      <p className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
        ✦ AI-powered aviation CV maker
      </p>

      <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 md:text-5xl xl:text-[56px]">
        Build a job-ready{" "}
        <span className="text-blue-600">aviation CV</span> in minutes
      </h1>

     <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
  Create a UK-style aviation CV, check your application strength,
  generate cover letters and prepare for interviews across airport,
  airline, cabin crew, ground handling, operations and engineering roles.
</p>

<div className="mt-5 flex flex-col gap-4 sm:flex-row">
  <a
    href="/cv-builder"
    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
  >
    Build My Aviation CV →
  </a>

  <a
    href="/cv-checker"
    className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-900 bg-white px-8 py-4 text-lg font-extrabold text-slate-950 transition hover:bg-slate-950 hover:text-white"
  >
    Check My CV
  </a>
</div>

<div className="mt-5 flex items-center gap-4 text-sm font-semibold text-slate-600">
  {[
    "ATS-friendly structure",
    "Aviation-specific wording",
  ].map((item) => (
    <div key={item} className="flex shrink-0 items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
        ✓
      </span>
      {item}
    </div>
  ))}
</div>
</div>

<div className="relative mt-8 lg:mt-0">
  <Image
    src="/airportcv-hero-visual.png"
    alt="AirportCV aviation CV builder preview"
    width={760}
    height={570}
    priority
    className="mx-auto h-auto w-full max-w-[520px] lg:ml-auto lg:max-w-[700px]"
  />
</div>
</div>
</section>
      <section id="tools" className="bg-white px-6 py-20">
  <div className="mx-auto max-w-7xl">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
        AirportCV Tools
      </p>

      <h2 className="mt-4 text-4xl font-extrabold text-slate-950 md:text-5xl">
        One platform for your aviation application journey
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-600">
        Build your CV, check your application, create cover letters and prepare
        for interviews with tools designed around airport, airline and aviation
        roles.
      </p>
    </div>

    <div className="mt-14 grid gap-5 lg:grid-cols-5">
      {tools.map((tool) => (
        <a
          key={tool.title}
          href={tool.href}
          className={`group rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
            tool.featured
              ? "border-blue-200 bg-blue-50 lg:col-span-2"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tool.accent} text-xl text-white shadow-lg`}
          >
            {tool.icon}
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-blue-600">
            {tool.eyebrow}
          </p>

          <h3 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950">
            {tool.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {tool.description}
          </p>

          <p className="mt-6 text-sm font-extrabold text-blue-700 group-hover:text-blue-900">
            {tool.cta} →
          </p>
        </a>
      ))}
    </div>
  </div>
</section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                How it works
              </p>

              <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
                From unsure to application-ready
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                AirportCV guides you through the same practical steps you would
                take when applying for aviation roles: decide the path, prepare
                the CV, then strengthen the full application.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/cv-builder"
                  className="rounded-xl bg-blue-700 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
                >
                  Start with CV Builder
                </a>

                <a
                  href="/career-coach"
                  className="rounded-xl border border-slate-200 px-6 py-3 text-center font-bold text-slate-700 hover:bg-slate-50"
                >
                  Take assessment first
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {journeySteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 font-extrabold text-white">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Aviation roles
            </p>

            <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
              Built for real aviation career paths
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Whether you are applying for your first airport job or moving into
              a more specialised aviation role, AirportCV helps you present your
              experience clearly.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {roleGroups.map((role) => (
              <a
                key={role}
                href="/cv-builder"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
              >
                {role}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Why AirportCV
            </p>

            <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
              Focused on aviation, not generic job applications
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
              Generic CV tools can miss aviation-specific language, shift-work
              context, safety responsibilities, operational accuracy and
              customer-facing airport experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                Pricing
              </p>

              <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
                Start free. Upgrade when you need more.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                AirportCV is designed to stay simple: free users can try the
                tools, and Premium will unlock higher monthly usage and extra
                application support.
              </p>

              <a
                href="/pricing"
                className="mt-8 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
              >
                View full pricing
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Free
                </p>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-slate-950">
                    £0
                  </span>
                  <span className="pb-2 text-slate-500">/month</span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {pricingFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="font-bold text-blue-700">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/sign-up"
                  className="mt-8 inline-flex w-full justify-center rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800"
                >
                  Start free
                </a>
              </div>

              <div className="rounded-3xl border border-blue-200 bg-blue-50 p-7 shadow-sm">
                <span className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Coming soon
                </span>

                <p className="mt-5 text-sm font-bold uppercase tracking-wide text-blue-700">
                  Premium
                </p>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-slate-950">
                    £6.99
                  </span>
                  <span className="pb-2 text-slate-500">/month</span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {premiumFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="font-bold text-blue-700">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/dashboard"
                  className="mt-8 inline-flex w-full justify-center rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
                >
                  Go to dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-8 text-white shadow-2xl md:p-10">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-5xl">✈️</p>

                <h2 className="mt-4 text-3xl font-extrabold">
                  Ready to build your aviation CV?
                </h2>

                <p className="mt-3 max-w-2xl text-slate-200">
                  Start with the CV Builder, then check your CV, create a cover
                  letter and prepare for interview from one account.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/cv-builder"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                >
                  Build My Aviation CV →
                </a>

                <a
                  href="/career-coach"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  Take Career Assessment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
                Career advice
              </p>

              <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
                Latest aviation career guide
              </h2>
            </div>

            <a
              href="/blog"
              className="font-bold text-blue-700 hover:text-blue-800"
            >
              View all guides →
            </a>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[280px]">
              <Image
                src="/blog/passenger-service-agent-guide.jpeg"
                alt="Airport passenger service agent career guide"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Passenger service agent guide
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-slate-950">
                How to Become an Airport Passenger Service Agent in the UK
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Discover salary expectations, shift patterns, useful skills,
                career progression and how to stand out when applying for
                airport passenger service roles.
              </p>

              <a
                href="/blog/passenger-service-agent-guide"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
              >
                Read Guide →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-extrabold text-slate-950">
              Questions before you start?
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-lg font-extrabold text-slate-950">
                  {item.question}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#030814] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <a href="/" className="inline-block">
                <Image
                  src="/airportcv-logo-cropped.png"
                  alt="AirportCV"
                  width={220}
                  height={60}
                  className="h-auto w-[170px] sm:w-[220px]"
                />
              </a>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                Helping people build successful airport, airline and aviation
                careers through AI-powered career tools.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">Tools</h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a href="/cv-builder" className="hover:text-white">
                    CV Builder
                  </a>
                </li>
                <li>
                  <a href="/cv-checker" className="hover:text-white">
                    CV Checker
                  </a>
                </li>
                <li>
                  <a href="/career-coach" className="hover:text-white">
                    Career Assessment
                  </a>
                </li>
                <li>
                  <a href="/cover-letter" className="hover:text-white">
                    Cover Letter Generator
                  </a>
                </li>
                <li>
                  <a href="/interview-prep" className="hover:text-white">
                    Interview Preparation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white">Company</h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a href="/pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/success-stories" className="hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white">Legal</h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms of Use
                  </a>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-slate-400">
                AirportCV does not save uploaded CVs to accounts by default.
                Review all AI-generated content before using it in job
                applications.
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © 2026 AirportCV. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}