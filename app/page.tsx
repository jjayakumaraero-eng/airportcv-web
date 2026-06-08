"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
  BorderStyle,
} from "docx";
import jsPDF from "jspdf";

const roles = [
  "Passenger Service Agent",
  "Ramp Agent",
  "Baggage Handler",
  "Airport Security Officer",
  "Flight Dispatcher",
  "Load Controller",
  "Other",
];

type Job = {
  jobTitle: string;
  company: string;
  dates: string;
  bullets: string[];
};

type CoverLetterResult = {
  coverLetter: string;
};

type InterviewPack = {
  questions: { question: string; answer: string }[];
  scenarioQuestions: { question: string; answer: string }[];
  whatToMention: string[];
  commonMistakes: string[];
};

type Report = {
  score: number;
  summary: string;
  fixes: string[];
  profile: string;
  skills: string[];
  keywords: string[];

  bestMatches?: { role: string; match: number }[];

  jobMatch?: {
    score: number;
    missingKeywords: string[];
    missingSkills: string[];
    recommendations: string[];
  };

  careerPath?: {
    currentRole: string;
    nextSteps: string[];
  };

  fullCv: {
    profile: string;
    skills: string[];
    employmentHistory?: Job[];
    experience?: string[];
    education?: string[];
    additionalInfo: string[];
  };
};

export default function Home() {
  const [role, setRole] = useState(roles[0]);
  const [customRole, setCustomRole] = useState("");
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interviewPack, setInterviewPack] = useState<InterviewPack | null>(null);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviewError, setInterviewError] = useState("");

  const [coverLetter, setCoverLetter] = useState<CoverLetterResult | null>(null);
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);
  const [coverLetterError, setCoverLetterError] = useState("");

  async function generateCoverLetter() {
    if (!report) return;

    setCoverLetterLoading(true);
    setCoverLetterError("");
    setCoverLetter(null);

    const response = await fetch("/api/cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        fullName,
        cvText,
        profile: report.fullCv?.profile || report.profile,
        skills: report.fullCv?.skills || report.skills,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setCoverLetterError(data.error || "Cover letter generation failed.");
      setCoverLetterLoading(false);
      return;
    }

    setCoverLetter(data);
    setCoverLetterLoading(false);
  }

  async function generateInterviewPack() {
    if (!report) return;

    setInterviewLoading(true);
    setInterviewError("");
    setInterviewPack(null);

    const response = await fetch("/api/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        cvText,
        profile: report.fullCv?.profile || report.profile,
        skills: report.fullCv?.skills || report.skills,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setInterviewError(data.error || "Interview preparation failed.");
      setInterviewLoading(false);
      return;
    }

    setInterviewPack(data);
    setInterviewLoading(false);
  }

  async function checkCv() {
    setLoading(true);
    setReport(null);
    setError("");

    const formData = new FormData();
    formData.append("role", role === "Other" ? customRole : role);
    formData.append("cvText", cvText);
    formData.append("jobDescription", jobDescription);
    if (file) formData.append("file", file);

    const response = await fetch("/api/analyse", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    setReport(data);
    setLoading(false);
  }

  function getContactLine() {
    return [email, phone, location].filter(Boolean).join(" | ");
  }
  const roleInsights: Record<
  string,
  {
    salary: string;
    shiftPattern: string;
    keySkills: string[];
    notes: string;
  }
> = {
  "Passenger Service Agent": {
    salary: "£24k - £35k",
    shiftPattern: "Early, late, weekend and rotating shifts",
    keySkills: ["Customer service", "Communication", "Check-in", "Boarding", "Problem solving"],
    notes: "Best suited to candidates with customer-facing experience in airports, retail, hospitality or travel.",
  },
  "Ramp Agent": {
    salary: "£25k - £38k",
    shiftPattern: "Shift work including nights, weekends and outdoor work",
    keySkills: ["Safety awareness", "Manual handling", "Teamwork", "Time management", "Aircraft turnaround"],
    notes: "Best suited to candidates comfortable with physical work, safety procedures and time-critical operations.",
  },
  "Baggage Handler": {
    salary: "£24k - £34k",
    shiftPattern: "Early, late, night and weekend shifts",
    keySkills: ["Manual handling", "Loading", "Unloading", "Teamwork", "Reliability"],
    notes: "Best suited to candidates with warehouse, logistics, delivery or physical work experience.",
  },
  "Airport Security Officer": {
    salary: "£28k - £45k",
    shiftPattern: "Rotating shifts including weekends and bank holidays",
    keySkills: ["Observation", "Procedure following", "Communication", "Conflict handling", "Safety awareness"],
    notes: "Best suited to candidates who are calm, professional, observant and comfortable following strict procedures.",
  },
  "Flight Dispatcher": {
    salary: "£35k - £60k+",
    shiftPattern: "Operational shifts, often including weekends and unsociable hours",
    keySkills: ["Flight coordination", "Decision making", "Communication", "Time management", "Operational control"],
    notes: "Best suited to candidates with aviation operations, ground handling or flight turnaround experience.",
  },
  "Load Controller": {
    salary: "£32k - £55k+",
    shiftPattern: "Operational shift work linked to flight schedules",
    keySkills: ["Weight and balance", "Accuracy", "Aircraft loading", "Communication", "Safety compliance"],
    notes: "Best suited to candidates with ramp, dispatch, load planning or aircraft turnaround experience.",
  },
};
const careerPaths: Record<string, string[]> = {
  "Passenger Service Agent": [
    "Senior Passenger Service Agent",
    "Passenger Service Supervisor",
    "Duty Manager",
    "Airport Operations Manager",
  ],

  "Ramp Agent": [
    "Lead Ramp Agent",
    "Load Controller",
    "Operations Controller",
    "Duty Manager",
  ],

  "Baggage Handler": [
    "Lead Baggage Agent",
    "Ramp Supervisor",
    "Operations Controller",
    "Duty Manager",
  ],

  "Airport Security Officer": [
    "Senior Security Officer",
    "Security Supervisor",
    "Security Manager",
    "Airport Security Manager",
  ],

  "Flight Dispatcher": [
    "Senior Flight Dispatcher",
    "Operations Controller",
    "Operations Manager",
    "Airport Operations Manager",
  ],

  "Load Controller": [
    "Senior Load Controller",
    "Operations Controller",
    "Duty Manager",
    "Airport Operations Manager",
  ],
};
  function getEmploymentItems() {
    if (!report) return [];
    return report.fullCv?.employmentHistory || [];
  }

  async function downloadWordCv() {
    if (!report) return;

    const employmentItems = getEmploymentItems();

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: fullName || "FULL NAME",
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: getContactLine() || "Email | Phone | Location",
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              border: {
                bottom: {
                  color: "999999",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
            }),

            new Paragraph({
              text: "PROFESSIONAL PROFILE",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph(report.fullCv?.profile || report.profile || ""),

            new Paragraph({
              text: "KEY SKILLS",
              heading: HeadingLevel.HEADING_1,
            }),
            ...(report.fullCv?.skills || report.skills || []).map(
              (skill) => new Paragraph({ text: skill, bullet: { level: 0 } })
            ),

            new Paragraph({
              text: "EMPLOYMENT HISTORY",
              heading: HeadingLevel.HEADING_1,
            }),
            ...employmentItems.flatMap((job) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: job.jobTitle || "Job Title",
                    bold: true,
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${job.company || "Company"} | ${job.dates || "Dates"}`,
                    italics: true,
                    size: 20,
                  }),
                ],
              }),
              ...(job.bullets || []).map(
                (bullet) => new Paragraph({ text: bullet, bullet: { level: 0 } })
              ),
              new Paragraph({ text: "" }),
            ]),

            new Paragraph({
              text: "ADDITIONAL INFORMATION",
              heading: HeadingLevel.HEADING_1,
            }),
            ...(report.fullCv?.additionalInfo || []).map(
              (item) => new Paragraph({ text: item, bullet: { level: 0 } })
            ),

            new Paragraph({
              text: "REFERENCES",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph("Available on request."),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "airportcv-professional-cv.docx";
    link.click();

    URL.revokeObjectURL(url);
  }

  function downloadPdfCv() {
    if (!report) return;

    const employmentItems = getEmploymentItems();
    const pdf = new jsPDF();
    let y = 18;

    function checkPageSpace(extra = 20) {
      if (y + extra > 280) {
        pdf.addPage();
        y = 18;
      }
    }

    function addHeading(text: string) {
      checkPageSpace(15);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text(text, 15, y);
      y += 8;
    }

    function addText(text: string) {
      checkPageSpace(20);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(text, 180);
      pdf.text(lines, 15, y);
      y += lines.length * 6 + 4;
    }

    function addBullet(text: string) {
      addText(`• ${text}`);
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(fullName || "FULL NAME", 15, y);
    y += 9;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(getContactLine() || "Email | Phone | Location", 15, y);
    y += 12;

    addHeading("PROFESSIONAL PROFILE");
    addText(report.fullCv?.profile || report.profile || "");

    addHeading("KEY SKILLS");
    (report.fullCv?.skills || report.skills || []).forEach(addBullet);

    addHeading("EMPLOYMENT HISTORY");
    employmentItems.forEach((job) => {
      checkPageSpace(30);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text(job.jobTitle || "Job Title", 15, y);
      y += 6;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`${job.company || "Company"} | ${job.dates || "Dates"}`, 15, y);
      y += 6;

      (job.bullets || []).forEach(addBullet);
      y += 3;
    });

    addHeading("ADDITIONAL INFORMATION");
    (report.fullCv?.additionalInfo || []).forEach(addBullet);

    addHeading("REFERENCES");
    addText("Available on request.");

    pdf.save("airportcv-professional-cv.pdf");
  }

  return (

<main className="min-h-screen bg-[#f5f7fb] text-slate-900">
  <nav className="sticky top-0 z-50 bg-[#030814]">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="/" className="flex items-center">
        <Image
          src="/airportcv-logo.png"
          alt="AirportCV"
          width={220}
          height={30}
          priority
        />
      </a>

      <div className="hidden items-center gap-8 text-sm font-bold text-slate-200 md:flex">
        <a href="#tools" className="transition hover:text-blue-400">
          Tools
        </a>
        <a href="#how-it-works" className="transition hover:text-blue-400">
          How It Works
        </a>
        <a href="#airports" className="transition hover:text-blue-400">
          Airports
        </a>
        <a href="#success-stories" className="transition hover:text-blue-400">
          Success Stories
        </a>
      </div>

      <a
        href="#checker"
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
      >
        Start Free
      </a>
    </div>
  </nav>
      <section className="relative overflow-hidden bg-[#030814]">
  <div
    className="absolute inset-0 opacity-45"
    style={{
      backgroundImage:
        "url('/hero-cabin-crew.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "95% bottom",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-r from-[#030814] via-[#030814]/90 to-[#030814]/25" />

  <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-16">
    <div className="max-w-2xl">
      <p className="mb-5 inline-flex rounded-full bg-blue-500/15 px-4 py-2 text-sm font-bold uppercase tracking-wide text-blue-100 ring-1 ring-blue-300/20">
        AI-Powered Career Tools
      </p>

      <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
        Advance Your Airport{" "}
        <span className="text-blue-500">
          & Aviation Career
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
        Professional AI tools to help you create the perfect CV, prepare for
        interviews, write cover letters and take the next step in your aviation career.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href="#tools"
          className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
        >
          Explore Tools →
        </a>

        <a
          href="#how-it-works"
          className="rounded-xl border border-white/30 px-7 py-4 text-center font-bold text-white hover:bg-white/10"
        >
          Learn More
        </a>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <div className="text-yellow-400 text-xl">★★★★★</div>
        <p className="text-sm text-slate-300">
          Trusted by aviation professionals worldwide
        </p>
      </div>
    </div>
  </div>
</section>
<section id="tools" className="bg-slate-50 px-6 py-16">
  <div className="mx-auto max-w-7xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
        Powerful Tools
      </p>

      <h2 className="mt-4 text-4xl font-extrabold text-slate-950 md:text-5xl">
        Everything You Need to Succeed
      </h2>

      <p className="mt-5 text-lg text-slate-600">
        AI-powered tools designed specifically for airport and aviation professionals.
      </p>
    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          icon: "🎤",
          title: "Interview Preparation",
          desc: "Prepare with confidence using airport-specific interview questions and answer coaching.",
          benefits: ["Role-specific questions", "Instant feedback & tips"],
          href: "/interview-prep",
          iconBg: "bg-blue-600",
          button: "bg-blue-600 hover:bg-blue-500",
          tick: "text-blue-600",
        },
        {
          icon: "✍️",
          title: "Cover Letter Generator",
          desc: "Create job-winning cover letters tailored for airport and aviation careers.",
          benefits: ["Customised for your role", "Professional templates"],
          href: "/cover-letter",
          iconBg: "bg-emerald-500",
          button: "bg-emerald-500 hover:bg-emerald-400",
          tick: "text-emerald-600",
        },
        {
          icon: "🧭",
          title: "Airport Career Coach",
          desc: "Get personalised career guidance and discover your best next career move.",
          benefits: ["Personalised insights", "Career recommendations"],
          href: "/career-coach",
          iconBg: "bg-purple-500",
          button: "bg-purple-500 hover:bg-purple-400",
          tick: "text-purple-600",
        },
        {
          icon: "👩‍✈️",
          title: "Cabin Crew CV Optimiser",
          desc: "Optimise your CV for cabin crew roles and airline recruitment success.",
          benefits: ["Cabin crew CV tips", "Airline-focused advice"],
          href: "/cabin-crew-cv",
          iconBg: "bg-orange-500",
          button: "bg-orange-500 hover:bg-orange-400",
          tick: "text-orange-600",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="flex min-h-[320px] flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} text-xl text-white shadow-lg`}
          >
            {item.icon}
          </div>

          <h3 className="mt-6 text-xl font-extrabold leading-tight text-slate-950">
            {item.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {item.desc}
          </p>

          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {item.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className={`font-extrabold ${item.tick}`}>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <a
      
  href={item.href}
  className={`mt-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition ${item.button}`}
  style={{ marginTop: "24px" }}
>
            Open Tool →
          </a>
        </div>
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
        Built Specifically for Airport Careers
      </h2>

      <p className="mt-4 text-lg text-slate-600">
        Everything is designed around airport, airline, ground operations and aviation careers.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
          ✈️
        </div>

        <h3 className="mt-5 text-xl font-bold">
          Aviation Focused
        </h3>

        <p className="mt-3 text-slate-600">
          Built specifically for airport, airline, ground handling and aviation professionals.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
          🤖
        </div>

        <h3 className="mt-5 text-xl font-bold">
          AI-Powered
        </h3>

        <p className="mt-3 text-slate-600">
          Receive personalised career guidance, interview preparation and CV advice instantly.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
          ⚡
        </div>

        <h3 className="mt-5 text-xl font-bold">
          Fast & Practical
        </h3>

        <p className="mt-3 text-slate-600">
          Get useful recommendations in minutes instead of spending hours researching.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
          🔒
        </div>

        <h3 className="mt-5 text-xl font-bold">
          Secure & Private
        </h3>

        <p className="mt-3 text-slate-600">
          Your information stays private and is only used to generate your results.
        </p>
      </div>

    </div>
  </div>
</section>
<section className="bg-white px-6 pb-24">
  <div className="mx-auto max-w-7xl">
    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#030814] via-[#071d45] to-[#0b3b91] p-10 text-white shadow-2xl">

      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

        <div>
          <p className="text-5xl">✈️</p>

          <h2 className="mt-4 text-3xl font-extrabold">
            Ready to Take Your Career to New Heights?
          </h2>

          <p className="mt-3 max-w-2xl text-slate-200">
            Join aviation professionals using AirportCV to improve their CV,
            prepare for interviews and discover new career opportunities.
          </p>
        </div>

        <div>
          <a
            href="/career-coach"
            className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
          >
            Get Started Now →
          </a>
        </div>

      </div>
    </div>
  </div>
</section>
<section className="mx-auto max-w-7xl px-6 pb-20">
  <div className="mb-10 text-center">
    <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
      Success Stories
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      Helping People Build Successful Airport Careers.
    </h2>

    <p className="mt-4 text-slate-600">
      Examples of the type of feedback and support AirportCV is designed to provide.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    {[
      {
        quote:
          "AirportCV helped me tailor my CV for a Passenger Service role and highlighted skills I didn't realise were relevant.",
        role: "Passenger Service Candidate",
      },
      {
        quote:
          "The role matching feature showed me I was a stronger fit for Ground Operations than Security roles.",
        role: "Ground Operations Applicant",
      },
      {
        quote:
          "The ATS-friendly CV suggestions made my experience look much more professional and structured.",
        role: "Airport Operations Candidate",
      },
    ].map((item) => (
      <div
        key={item.role}
        className="rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="mb-4 text-2xl">⭐</div>

        <p className="italic text-slate-700">
          "{item.quote}"
        </p>

        <p className="mt-5 font-semibold text-blue-600">
          {item.role}
        </p>
      </div>
    ))}
  </div>
</section>
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-bold">How AirportCV Helps You Succeed</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["1", "📄 Analyse Your CV", "Receive an airport-specific assessment, role matches and practical recommendations."],
            ["2", "✍️ Build Your Application", "Create stronger CVs, tailored cover letters and more competitive applications."],
            ["3", "🚀 Advance Your Career", "Prepare for interviews, explore career pathways and receive personalised career coaching."],
            ["4", "💼 Land Your Next Role", "Use personalised guidance and professional tools to maximise your chances of success."],
          ].map(([step, title, text]) => (
            <div key={step} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 font-bold text-blue-700">
                {step}
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className="mx-auto max-w-7xl px-6 py-20">
  <div className="mb-12 text-center">
    <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
      Airport Careers We Support
    </p>
    <h2 className="mt-3 text-4xl font-bold">
      Built for Airport, Airline and Ground Operations Careers
    </h2>
    <p className="mt-4 text-slate-600">
      Tailored CV guidance for airport operations, passenger services and
      aviation support roles.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[
      {
        role: "Passenger Service Agent",
        salary: "£24k - £35k",
        desc: "Check-in, boarding, arrivals and customer service."
      },
      {
        role: "Ramp Agent",
        salary: "£25k - £38k",
        desc: "Aircraft turnaround, loading, unloading and safety."
      },
      {
        role: "Baggage Handler",
        salary: "£24k - £34k",
        desc: "Baggage operations and airport logistics."
      },
      {
        role: "Airport Security Officer",
        salary: "£28k - £45k",
        desc: "Screening, compliance and passenger security."
      },
      {
        role: "Flight Dispatcher",
        salary: "£35k - £60k+",
        desc: "Flight planning, operations control and coordination."
      },
      {
        role: "Load Controller",
        salary: "£32k - £55k+",
        desc: "Aircraft weight & balance and turnaround planning."
      }
    ].map((item) => (
      <div
        key={item.role}
        className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      >
        <h3 className="text-xl font-bold">{item.role}</h3>

        <p className="mt-2 text-blue-600 font-semibold">
          {item.salary}
        </p>

        <p className="mt-3 text-slate-600">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>
<section id="airports" className="mx-auto max-w-7xl px-6 pb-20">
  <div className="rounded-[2rem] bg-white p-8 shadow-sm">
    <div className="mb-8">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
        UK Airports We Support
      </p>
      <h2 className="mt-3 text-4xl font-bold">
        Tailored for airport jobs across the UK
      </h2>
      <p className="mt-4 max-w-2xl text-slate-600">
        AirportCV is designed for candidates applying to roles at major UK airports,
        ground handling companies, airlines and airport service providers.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        "London Heathrow",
        "London Gatwick",
        "London Stansted",
        "London Luton",
        "Manchester Airport",
        "Birmingham Airport",
        "Edinburgh Airport",
        "Glasgow Airport",
      ].map((airport) => (
        <div
          key={airport}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 font-semibold transition hover:border-blue-300 hover:bg-blue-50"
        >
          ✈️ {airport}
        </div>
      ))}
    </div>
  </div>
</section>

<section className="mx-auto max-w-7xl px-6 pb-20">
  <div className="mb-10 text-center">
    <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
      Airport Employers & Airlines
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      Roles Commonly Available Across UK Airports
    </h2>

    <p className="mt-4 max-w-3xl mx-auto text-slate-600">
      AirportCV is designed to help candidates prepare for opportunities with
      airport operators, ground handling companies, airlines and aviation
      service providers across the UK.
    </p>
  </div>

  <div className="grid gap-8 lg:grid-cols-2">
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-bold">Ground Handling Companies</h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          "dnata",
          "Swissport",
          "Menzies Aviation",
          "Worldwide Flight Services (WFS)",
          "Aviator Airport Alliance",
          "ASC",
          "AGS Airports Services",
          "Airport Services UK",
        ].map((company) => (
          <div
            key={company}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium"
          >
            {company}
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-600">
        Typical roles: Passenger Service Agent, Ramp Agent, Baggage Handler,
        Flight Dispatcher, Load Controller and Operations Controller.
      </p>
    </div>

    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-bold">Airlines Recruiting in the UK</h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          "British Airways",
          "easyJet",
          "Virgin Atlantic",
          "Jet2",
          "TUI Airways",
          "Ryanair",
          "Emirates",
          "Qatar Airways",
          "Etihad Airways",
          "Lufthansa",
          "KLM",
          "Air France",
        ].map((airline) => (
          <div
            key={airline}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium"
          >
            {airline}
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-600">
        Common opportunities include customer service, airport operations,
        dispatch, load control, security support and airline ground operations.
      </p>
    </div>
  </div>
</section>
      <section id="checker" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-slate-950 p-2 shadow-2xl">
          <div className="grid gap-2 lg:grid-cols-2">
            <div className="rounded-[1.7rem] bg-white p-6 lg:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Free CV Check
              </p>
              <h2 className="mt-2 text-3xl font-bold">Check Your Airport CV</h2>
              <p className="mt-3 text-slate-600">
                Add your details, upload your CV and choose the airport role you want.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input className="rounded-xl border px-4 py-3" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input className="rounded-xl border px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="rounded-xl border px-4 py-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className="rounded-xl border px-4 py-3" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <label className="mt-6 block text-sm font-semibold">Target role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3">
                {roles.map((r) => <option key={r}>{r}</option>)}
              </select>
              {role === "Other" && (
  <input
    value={customRole}
    onChange={(e) => setCustomRole(e.target.value)}
    placeholder="Type your target airport role"
    className="mt-3 w-full rounded-xl border px-4 py-3"
  />
)}

              <label className="mt-6 block text-sm font-semibold">Upload CV</label>
              <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-2 w-full rounded-xl border border-dashed bg-slate-50 px-4 py-4" />

              <label className="mt-6 block text-sm font-semibold">Or paste your CV</label>
              <textarea value={cvText} onChange={(e) => setCvText(e.target.value)} placeholder="Paste your CV text here..." className="mt-2 h-52 w-full rounded-xl border px-4 py-3" />

<label className="mt-6 block text-sm font-semibold">
  Job Description (Optional)
</label>

<textarea
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
  placeholder="Paste the airport job description here..."
  className="mt-2 h-40 w-full rounded-xl border px-4 py-3"
/>

              <button onClick={checkCv} disabled={loading} className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-500 disabled:bg-slate-400">
                {loading ? "Checking your CV..." : "Check My Airport CV"}
              </button>
            </div>

            <div className="rounded-[1.7rem] bg-white p-6 lg:p-8">
              <h2 className="text-2xl font-bold">AirportCV Report</h2>

              {error ? (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
              ) : !report ? (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-lg font-semibold">Your Report Will Appear Here</p>
                  <p className="mt-2 text-slate-600">
                    You’ll see your score, best role matches and improved CV draft.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-6">
                  <div className="rounded-3xl bg-blue-50 p-6">
                    <p className="text-sm font-semibold text-blue-700">Airport Readiness Score</p>
                    <p className="mt-2 text-5xl font-bold">{report.score}/100</p>
                    <p className="mt-3 text-slate-700">{report.summary}</p>
                  </div>

                  <div>
                    <h3 className="font-bold">Priority fixes</h3>
                    <ul className="mt-6 mb-8 space-y-3 text-sm text-slate-700">
                      {(report.fixes || []).map((fix) => <li key={fix}>{fix}</li>)}
                    </ul>
                  </div>

                  {report.jobMatch && (
  <div className="mb-6 rounded-2xl border bg-white p-5">
    <h3 className="font-bold">Job Description Match</h3>

    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Match Score</span>
        <span className="font-bold text-green-700">
          {report.jobMatch.score}%
        </span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-green-600"
          style={{ width: `${report.jobMatch.score}%` }}
        />
      </div>
    </div>

    <div className="mt-5">
      <h4 className="font-semibold">Missing Keywords</h4>
      <ul className="mt-2 list-disc pl-5 text-slate-700">
        {report.jobMatch.missingKeywords?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="mt-5">
      <h4 className="font-semibold">Missing Skills</h4>
      <ul className="mt-2 list-disc pl-5 text-slate-700">
        {report.jobMatch.missingSkills?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="mt-5">
      <h4 className="font-semibold">Recommended Improvements</h4>
      <ul className="mt-2 list-disc pl-5 text-slate-700">
        {report.jobMatch.recommendations?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
)}

{report.bestMatches && (
  <div>
    <h3 className="font-bold">Best Airport Role Matches</h3>

    <div className="mt-3 space-y-3">
                        {report.bestMatches.map((match) => (
                          <div key={match.role} className="rounded-xl bg-slate-50 p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">{match.role}</span>
                              <span className="font-bold text-blue-700">{match.match}%</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-slate-200">
                              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${match.match}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                                    )}

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
    📊 Role Insights Based on Best Match
  </h3>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Typical Salary
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {(roleInsights[report?.bestMatches?.[0]?.role || role] || roleInsights[role])?.salary}
      </p>
    </div>

    <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Shift Pattern
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-900">
        {(roleInsights[report?.bestMatches?.[0]?.role || role] || roleInsights[role])?.shiftPattern}
      </p>
    </div>
  </div>

  <div className="mt-6">
    <h4 className="text-lg font-bold text-slate-900">
      Key Skills
    </h4>

    <div className="mt-3 flex flex-wrap gap-2">
      {(roleInsights[report?.bestMatches?.[0]?.role || role] || roleInsights[role])?.keySkills.map((skill) => (
        <span
          key={skill}
          className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
    <h4 className="font-bold text-slate-900">
      Recruiter Insight
    </h4>

    <p className="mt-2 leading-relaxed text-slate-700">
      {(roleInsights[report?.bestMatches?.[0]?.role || role] || roleInsights[role])?.notes}
    </p>
  </div>
</div>


<div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
    🛫 Career Progression Path Based on Best Match
  </h3>

  <p className="mt-2 text-slate-600">
    Typical progression route for a {report?.bestMatches?.[0]?.role || role}.
  </p>

  <div className="mt-5 flex flex-col gap-3">
    {[
  report?.bestMatches?.[0]?.role || role,
  ...(careerPaths[report?.bestMatches?.[0]?.role || role] || careerPaths[role] || []),
].map((step, index) => (
      <div key={step}>
        <div className="rounded-xl bg-slate-50 p-4 font-semibold">
          {step}
        </div>

        {index <
  (careerPaths[report?.bestMatches?.[0]?.role || role] || careerPaths[role] || []).length && (
          <div className="py-2 text-center text-2xl text-blue-600">
            ↓
          </div>
        )}
      </div>
    ))}
  </div>
</div>
                  <div className="rounded-2xl border bg-slate-50 p-5">
                    <h3 className="text-lg font-bold">Generated Professional Airport CV</h3>

                    <h4 className="mt-4 font-semibold">Professional Profile</h4>
                    <p className="mt-2 text-slate-700">{report.fullCv?.profile || report.profile}</p>

                    <h4 className="mt-4 font-semibold">Key Skills</h4>
                    <ul className="mt-2 list-disc pl-5 text-slate-700">
                      {(report.fullCv?.skills || report.skills || []).map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>

                    <h4 className="mt-4 font-semibold">Employment History</h4>
                    <ul className="mt-2 list-disc pl-5 text-slate-700">
                      {getEmploymentItems().map((job) => (
                        <li key={`${job.jobTitle}-${job.company}-${job.dates}`} className="mb-4 list-none">
                          <p className="font-semibold">{job.jobTitle}</p>
                          <p className="text-sm text-slate-600">{job.company} | {job.dates}</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5">
                            {(job.bullets || []).map((bullet) => <li key={bullet}>{bullet}</li>)}
                          </ul>
                        </li>
                      ))}
                    </ul>

                    <h4 className="mt-4 font-semibold">Additional Information</h4>
                    <ul className="mt-2 list-disc pl-5 text-slate-700">
                      {(report.fullCv?.additionalInfo || []).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <button onClick={downloadWordCv} className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-slate-800">
                      Download Word CV
                    </button>
                    <button onClick={downloadPdfCv} className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-500">
                      Download PDF CV
                    </button>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                    <h3 className="text-lg font-bold">Cover Letter Generator</h3>
                    <p className="mt-2 text-slate-700">
                      Generate a realistic cover letter tailored to this airport role.
                    </p>

                    <button
                      onClick={generateCoverLetter}
                      disabled={coverLetterLoading}
                      className="mt-4 w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500 disabled:bg-slate-400"
                    >
                      {coverLetterLoading ? "Generating cover letter..." : "Generate Cover Letter"}
                    </button>

                    {coverLetterError && (
                      <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">
                        {coverLetterError}
                      </div>
                    )}

                    {coverLetter && (
                      <div className="mt-5 rounded-xl bg-white p-4">
                        <h4 className="font-bold">Your Cover Letter</h4>
                        <p className="mt-3 whitespace-pre-line text-slate-700">
                          {coverLetter.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <h3 className="text-lg font-bold">Interview Preparation Pack</h3>
                    <p className="mt-2 text-slate-700">
                      Generate role-specific interview questions and suggested answers based on this CV.
                    </p>

                    <button
                      onClick={generateInterviewPack}
                      disabled={interviewLoading}
                      className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 disabled:bg-slate-400"
                    >
                      {interviewLoading ? "Generating interview pack..." : "Generate Interview Questions"}
                    </button>

                    {interviewError && (
                      <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">
                        {interviewError}
                      </div>
                    )}

                    {interviewPack && (
                      <div className="mt-6 space-y-6">
                        <div>
                          <h4 className="font-bold">Likely Interview Questions</h4>
                          <div className="mt-3 space-y-4">
                            {interviewPack.questions.map((item) => (
                              <div key={item.question} className="rounded-xl bg-white p-4">
                                <p className="font-semibold">{item.question}</p>
                                <p className="mt-2 text-slate-700">{item.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold">Airport Scenario Questions</h4>
                          <div className="mt-3 space-y-4">
                            {interviewPack.scenarioQuestions.map((item) => (
                              <div key={item.question} className="rounded-xl bg-white p-4">
                                <p className="font-semibold">{item.question}</p>
                                <p className="mt-2 text-slate-700">{item.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold">What to Mention</h4>
                          <ul className="mt-2 list-disc pl-5 text-slate-700">
                            {interviewPack.whatToMention.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold">Common Mistakes to Avoid</h4>
                          <ul className="mt-2 list-disc pl-5 text-slate-700">
                            {interviewPack.commonMistakes.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-slate-950 text-white">
  <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">

    <div>
      <h3 className="text-xl font-bold">✈️ AirportCV</h3>
      <p className="mt-3 text-sm text-slate-400">
        Helping People Build Successful Airport Careers.
      </p>
    </div>

    <div>
      <h4 className="font-semibold">Product</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-400">
        <li>CV Checker</li>
        <li>Role Matching</li>
        <li>Interview Preparation</li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold">Airport Roles</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-400">
        <li>Passenger Service Agent</li>
        <li>Ramp Agent</li>
        <li>Flight Dispatcher</li>
        <li>Load Controller</li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold">Legal</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-400">
        <li>
  <a href="/privacy" className="hover:text-white">
    Privacy Policy
  </a>
</li>

<li>
  <a href="/terms" className="hover:text-white">
    Terms & Conditions
  </a>
</li>

<li>
  <a href="/contact" className="hover:text-white">
    Contact
  </a>
</li>
      </ul>
    </div>

  </div>

  <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
    © 2026 AirportCV. All rights reserved.
  </div>
</footer>
    </main>
  );
}
