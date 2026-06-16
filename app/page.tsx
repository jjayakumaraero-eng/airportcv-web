import Image from "next/image";
import HomeBlogSlider from "@/components/HomeBlogSlider";
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
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
          ✦ Career Advice
        </p>

        <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
          Aviation career guides to help you apply smarter
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Learn about aviation roles, CV tips, application preparation and how
          to stand out when applying for airport and airline jobs.
        </p>
      </div>

      <a
        href="/blog"
        className="inline-flex rounded-2xl border-2 border-blue-600 bg-white px-6 py-3 font-extrabold text-blue-700 transition hover:bg-blue-50"
      >
        View all guides →
      </a>
    </div>

    <HomeBlogSlider />
  </div>
</section>
      <section className="bg-slate-50 px-6 py-14">
  <div className="mx-auto max-w-4xl">
    <div className="mb-6">
      <p className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
        ✦ FAQ
      </p>

      <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
        Questions before you start?
      </h2>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {[
        {
          question: "Is AirportCV only for airport jobs?",
          answer:
            "No. AirportCV supports airport, airline and wider aviation roles including cabin crew, ground handling, engineering, cargo, operations, security and flight operations.",
        },
        {
          question: "Do I need to sign in?",
          answer:
            "Yes. Sign-in protects the AI tools, manages fair monthly usage and prepares the platform for Premium access.",
        },
        {
          question: "Does AirportCV save my CV?",
          answer:
            "No, not by default. AirportCV is currently designed to process your information for the tool you use without saving uploaded CVs to your account.",
        },
        {
          question: "Is Premium active now?",
          answer:
            "Premium payments are not active yet. Selected users can use a temporary Premium access code while Stripe payments are being prepared.",
        },
        {
          question:
            "Can I use AirportCV for cabin crew, engineering or ground handling?",
          answer:
            "Yes. AirportCV is designed for many aviation career paths, including cabin crew, aircraft engineering, ramp, baggage, passenger service, operations and security roles.",
        },
      ].map((item) => (
        <details
          key={item.question}
          className="group border-b border-slate-200 last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-900 marker:content-none">
            <span>{item.question}</span>
            <span className="shrink-0 text-base text-blue-600 transition group-open:rotate-180">
              ▾
            </span>
          </summary>

          <div className="px-5 pb-4">
            <p className="text-sm leading-6 text-slate-600">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <div className="flex items-center gap-3">
         <Image
  src="/airportcv-logo-light.png"
  alt="AirportCV logo"
  width={200}
  height={80}
  className="h-auto w-36"
/>

          <div>
          
          </div>
        </div>

        <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
          Build aviation CVs, check applications, create cover letters and
          prepare for airport and airline interviews.
        </p>

        <p className="mt-4 text-xs text-slate-500">
          Designed for aviation job seekers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Tools
        </h3>

        <div className="mt-4 space-y-3 text-sm">
          <a href="/cv-builder" className="block text-slate-600 hover:text-blue-700">
            CV Builder
          </a>
          <a href="/cv-checker" className="block text-slate-600 hover:text-blue-700">
            CV Checker
          </a>
          <a href="/cover-letter" className="block text-slate-600 hover:text-blue-700">
            Cover Letter
          </a>
          <a href="/interview-prep" className="block text-slate-600 hover:text-blue-700">
            Interview Prep
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Company
        </h3>

        <div className="mt-4 space-y-3 text-sm">
          <a href="/pricing" className="block text-slate-600 hover:text-blue-700">
            Pricing
          </a>
          <a href="/blog" className="block text-slate-600 hover:text-blue-700">
            Career Advice
          </a>
          <a href="/dashboard" className="block text-slate-600 hover:text-blue-700">
            Dashboard
          </a>
          <a href="/career-coach" className="block text-slate-600 hover:text-blue-700">
            Career Assessment
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Legal
        </h3>

        <div className="mt-4 space-y-3 text-sm">
          <a href="/privacy" className="block text-slate-600 hover:text-blue-700">
            Privacy Policy
          </a>
          <a href="/terms" className="block text-slate-600 hover:text-blue-700">
            Terms of Use
          </a>
          <a href="/cookies" className="block text-slate-600 hover:text-blue-700">
            Cookie Notice
          </a>
        </div>
      </div>
    </div>

    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} AirportCV. All rights reserved.</p>

      <p>
        AirportCV is an independent aviation career tool and is not affiliated
        with any airline or airport.
      </p>
    </div>
  </div>
</footer>
    </main>
  );
}