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
    <div className="mx-auto max-w-4xl text-center">
      <p className="mx-auto inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
        ✦ AIRPORTCV TOOLS
      </p>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
        One platform for your{" "}
        <span className="text-blue-600">aviation</span> application journey
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Build your CV, check your application, create cover letters and prepare
        for interviews with tools designed around airport, airline and aviation
        roles.
      </p>
    </div>

    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {[
        {
          label: "CV BUILDER",
          badge: "Most Popular",
          icon: "📄",
          title: "Create a Professional Aviation CV",
          description:
            "Build a UK-style aviation CV in minutes with role-specific examples and expert guidance.",
          href: "/cv-builder",
          cta: "Build My CV",
          iconClass: "bg-blue-600",
          ctaClass: "text-blue-700",
          featured: true,
        },
        {
          label: "CV CHECKER",
          icon: "✅",
          title: "Check Your CV Strength",
          description:
            "Get an ATS score, personalised feedback and tips to improve your application.",
          href: "/cv-checker",
          cta: "Check My CV",
          iconClass: "bg-emerald-600",
          ctaClass: "text-emerald-700",
          featured: false,
        },
        {
          label: "COVER LETTER",
          icon: "✍️",
          title: "Generate Cover Letters",
          description:
            "Create tailored cover letters for airline, airport and aviation roles.",
          href: "/cover-letter",
          cta: "Create Cover Letter",
          iconClass: "bg-purple-600",
          ctaClass: "text-purple-700",
          featured: false,
        },
        {
          label: "INTERVIEW PREP",
          icon: "🎙️",
          title: "Prepare for Interviews",
          description:
            "Access role-specific Q&A, scenario questions and expert interview tips.",
          href: "/interview-prep",
          cta: "Start Practicing",
          iconClass: "bg-blue-600",
          ctaClass: "text-blue-700",
          featured: false,
        },
        {
          label: "RESOURCES",
          icon: "📋",
          title: "Templates & Examples",
          description:
            "Download CV examples, templates and aviation career resources.",
          href: "/blog",
          cta: "Browse Resources",
          iconClass: "bg-cyan-600",
          ctaClass: "text-cyan-700",
          featured: false,
        },
      ].map((item) => (
        <a
          key={item.title}
          href={item.href}
          className={`group flex min-h-[330px] flex-col rounded-[1.75rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
            item.featured
              ? "border-blue-300 bg-blue-50"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconClass} text-2xl text-white shadow-lg`}
            >
              {item.icon}
            </div>

            {item.badge ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-blue-700 shadow-sm ring-1 ring-blue-100">
                ✦ {item.badge}
              </span>
            ) : null}
          </div>

          <p
            className={`mt-6 text-xs font-extrabold uppercase tracking-wide ${
              item.ctaClass
            }`}
          >
            {item.label}
          </p>

          <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate-950">
            {item.title}
          </h3>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            {item.description}
          </p>

          <p
            className={`mt-auto pt-8 text-base font-extrabold ${item.ctaClass} group-hover:underline`}
          >
            {item.cta} →
          </p>
        </a>
      ))}
    </div>

    <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
      <div className="grid gap-6 text-sm md:grid-cols-3">
        <div className="flex items-center justify-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            ✓
          </span>
          <div>
            <p className="font-extrabold text-slate-950">UK-style CV guidance</p>
            <p className="text-slate-500">Built for aviation applicants</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            ✓
          </span>
          <div>
            <p className="font-extrabold text-slate-950">ATS-friendly structure</p>
            <p className="text-slate-500">Increase your interview chances</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            ✓
          </span>
          <div>
            <p className="font-extrabold text-slate-950">Aviation-specific wording</p>
            <p className="text-slate-500">Stand out from other applicants</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="bg-slate-50 px-6 py-20">
  <div className="mx-auto max-w-7xl">
    <div className="mx-auto max-w-4xl text-center">
      <p className="mx-auto inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
        ✦ HOW AIRPORTCV WORKS
      </p>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
        Go from unsure to{" "}
        <span className="text-blue-600">application-ready</span>
      </h2>

      <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-600">
        AirportCV gives you a simple aviation career workflow. Start with the
        tool that matches your situation, then move step by step towards a
        stronger CV, better application and more confident interview.
      </p>
    </div>

    <div className="relative mt-14">
      <div className="hidden xl:block">
        <div className="absolute left-[30%] top-[44%] h-px w-[10%] border-t-2 border-dotted border-blue-500" />
        <div className="absolute left-[40%] top-[calc(44%-5px)] h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-blue-500" />

        <div className="absolute left-[63%] top-[44%] h-px w-[10%] border-t-2 border-dotted border-blue-500" />
        <div className="absolute left-[73%] top-[calc(44%-5px)] h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-blue-500" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {[
          {
            number: "01",
            icon: "🧭",
            title: "Choose your aviation goal",
            text: "Pick a target role such as cabin crew, passenger service, ramp, operations, security, engineering or ground handling.",
            href: "/career-coach",
            cta: "Find my path",
          },
          {
            number: "02",
            icon: "📄",
            title: "Build or improve your CV",
            text: "Create a new UK-style aviation CV or check your existing CV for structure, keywords and role fit.",
            href: "/cv-builder",
            cta: "Build my CV",
          },
          {
            number: "03",
            icon: "✍️",
            title: "Prepare the full application",
            text: "Generate a tailored cover letter and practise role-specific interview questions before you apply.",
            href: "/cover-letter",
            cta: "Create cover letter",
          },
        ].map((step) => (
          <a
            key={step.number}
            href={step.href}
            className="group relative flex min-h-[300px] flex-col items-center rounded-[1.75rem] border border-slate-200 bg-white px-8 pb-8 pt-12 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-extrabold text-white shadow-lg shadow-blue-600/25">
              {step.number}
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl ring-1 ring-blue-100">
              {step.icon}
            </div>

            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-950">
              {step.title}
            </h3>

            <p className="mt-4 text-base leading-7 text-slate-600">
              {step.text}
            </p>

            <p className="mt-auto pt-6 text-base font-extrabold text-blue-700 group-hover:underline">
              {step.cta} →
            </p>
          </a>
        ))}
      </div>
    </div>

    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <a
        href="/cv-builder"
        className="inline-flex min-w-[260px] justify-center rounded-2xl bg-blue-600 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
      >
        Build My Aviation CV →
      </a>

      <a
        href="/career-coach"
        className="inline-flex min-w-[260px] justify-center rounded-2xl border-2 border-blue-600 bg-white px-8 py-4 text-base font-extrabold text-slate-950 transition hover:bg-blue-50"
      >
        Take Career Assessment
      </a>
    </div>
  </div>
</section>

      <section className="relative overflow-hidden bg-white px-6 py-20">
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-50/70 to-transparent" />

  <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
    <div>
      <p className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
        Aviation Roles
      </p>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
        Built for real aviation career paths
      </h2>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        AirportCV helps professionals across airport, airline and aviation jobs
        present their experience clearly and apply with more confidence.
      </p>

      <div className="mt-8 space-y-5">
        {[
          {
            icon: "📋",
            title: "Role-specific CV guidance",
            text: "Tailored examples and layouts for your aviation role.",
          },
          {
            icon: "🔎",
            title: "Aviation keywords recruiters expect",
            text: "Optimised wording that helps your application stand out.",
          },
          {
            icon: "👥",
            title: "Support across airport, airline and engineering roles",
            text: "From passenger services to operations, ground handling and technical careers.",
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl ring-1 ring-blue-100">
              {item.icon}
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-950">
                {item.title}
              </h3>

              <p className="mt-1 text-base leading-7 text-slate-600">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <a
          href="/cv-builder"
          className="inline-flex justify-center rounded-2xl bg-blue-600 px-7 py-4 font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
        >
          Build My Aviation CV
        </a>

        <a
          href="/career-coach"
          className="inline-flex justify-center rounded-2xl border-2 border-blue-600 bg-white px-7 py-4 font-extrabold text-blue-700 transition hover:bg-blue-50"
        >
          Explore Roles
        </a>
      </div>
    </div>

    <div className="relative">
      <Image
        src="/aviation-roles-grid.png"
        alt="AirportCV aviation career roles including cabin crew, passenger service, ramp, baggage, security, dispatch, load control, engineering, cargo, airport operations, pilot and ground handling"
        width={980}
        height={650}
        className="h-auto w-full"
      />
    </div>
  </div>
</section>
     <section className="bg-white px-6 py-20">
  <div className="mx-auto max-w-7xl">
    <div className="mx-auto max-w-4xl text-center">
      <p className="mx-auto inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
        ✦ WHY AIRPORTCV
      </p>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
        Built for <span className="text-blue-600">aviation</span> careers.
        <br />
        Not just another CV builder.
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        We understand aviation roles, employers and what it takes to get
        noticed. That’s why AirportCV gives you more than just a template.
      </p>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          number: "1.",
          icon: "✈️",
          title: "Aviation-specific wording",
          text: "Use the language aviation employers expect: safety, service, compliance, operations and teamwork.",
          highlight: "Speak the employer's language",
        },
        {
          number: "2.",
          icon: "📄",
          title: "ATS-friendly CV structure",
          text: "Clear sections, relevant keywords and easy-to-scan layouts for online applications.",
          highlight: "Better visibility to recruiters",
        },
        {
          number: "3.",
          icon: "🎧",
          title: "Full application support",
          text: "Move from CV builder to CV checker, cover letter and interview preparation in one journey.",
          highlight: "End-to-end application help",
        },
        {
          number: "4.",
          icon: "🔒",
          title: "Privacy-first by default",
          text: "Your CV is not saved to your account by default. You stay in control.",
          highlight: "Your data, your control",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="flex min-h-[360px] flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-4xl ring-1 ring-slate-100">
            {item.icon}
          </div>

          <h3 className="mt-6 text-2xl font-extrabold leading-tight text-slate-950">
            {item.number} {item.title}
          </h3>

          <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-blue-600" />

          <p className="mt-5 text-base leading-8 text-slate-600">
            {item.text}
          </p>

          <div className="mt-auto pt-6">
            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
              ✓ {item.highlight}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[1fr_auto_1fr]">
        <div className="bg-red-50 px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl">
              ❌
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-red-600">
                Generic CV builder:
              </h3>
              <p className="mt-2 text-lg leading-8 text-slate-700">
                General templates, broad advice, no aviation role focus.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-4 py-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-2xl font-extrabold text-slate-950 ring-1 ring-slate-200">
            VS
          </div>
        </div>

        <div className="bg-emerald-50 px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl">
              ✅
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-emerald-700">
                AirportCV:
              </h3>
              <p className="mt-2 text-lg leading-8 text-slate-700">
                Aviation roles, airport keywords, CV + cover letter + interview
                workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-10 flex flex-col items-center justify-center">
      <a
        href="/cv-builder"
        className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
      >
        ✈ Build My Aviation CV →
      </a>

      <p className="mt-5 text-sm font-medium text-slate-500">
        Designed for aviation job seekers
      </p>
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