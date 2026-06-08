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
        <a
  href="/success-stories"
  className="transition hover:text-blue-400"
>
  Success Stories
</a>
      </div>

      <a
        href="/cv-checker"
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
