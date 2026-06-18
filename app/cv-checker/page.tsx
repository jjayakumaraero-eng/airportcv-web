"use client";

import Image from "next/image";
import Link from "next/link";
import PremiumAssessmentReport from "@/components/PremiumAssessmentReport";
import { toPng } from "html-to-image";
import { useState } from "react";

import jsPDF from "jspdf";

const roles = [
  "Passenger Service Agent",
  "Check-in Agent",
  "Boarding Gate Agent",
  "Lounge Agent",
  "Ramp Agent",
  "Baggage Handler",
  "Airport Security Officer",
  "Flight Dispatcher",
  "Load Controller",
  "Cabin Crew",
  "Pilot",
  "Aircraft Maintenance Engineer",
  "Aircraft Technician",
  "Cargo Agent",
  "Airport Operations Officer",
  "Airport Duty Manager",
  "Other Airport / Airline Role",
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
  premiumPreview?: {
    missingKeywordCount: number;
    missingSkillCount: number;
    atsIssueCount: number;
    additionalRoleCount: number;
    recruiterConcernCount: number;
  };
  premiumReport?: any;

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
    keySkills: [
      "Customer service",
      "Communication",
      "Check-in",
      "Boarding",
      "Problem solving",
    ],
    notes:
      "Best suited to candidates with customer-facing experience in airports, retail, hospitality or travel.",
  },
  "Ramp Agent": {
    salary: "£25k - £38k",
    shiftPattern: "Shift work including nights, weekends and outdoor work",
    keySkills: [
      "Safety awareness",
      "Manual handling",
      "Teamwork",
      "Time management",
      "Aircraft turnaround",
    ],
    notes:
      "Best suited to candidates comfortable with physical work, safety procedures and time-critical operations.",
  },
  "Baggage Handler": {
    salary: "£24k - £34k",
    shiftPattern: "Early, late, night and weekend shifts",
    keySkills: [
      "Manual handling",
      "Loading",
      "Unloading",
      "Teamwork",
      "Reliability",
    ],
    notes:
      "Best suited to candidates with warehouse, logistics, delivery or physical work experience.",
  },
  "Airport Security Officer": {
    salary: "£28k - £45k",
    shiftPattern: "Rotating shifts including weekends and bank holidays",
    keySkills: [
      "Observation",
      "Procedure following",
      "Communication",
      "Conflict handling",
      "Safety awareness",
    ],
    notes:
      "Best suited to candidates who are calm, professional, observant and comfortable following strict procedures.",
  },
  "Flight Dispatcher": {
    salary: "£35k - £60k+",
    shiftPattern: "Operational shifts, often including weekends and unsociable hours",
    keySkills: [
      "Flight coordination",
      "Decision making",
      "Communication",
      "Time management",
      "Operational control",
    ],
    notes:
      "Best suited to candidates with aviation operations, ground handling or flight turnaround experience.",
  },
  "Load Controller": {
    salary: "£32k - £55k+",
    shiftPattern: "Operational shift work linked to flight schedules",
    keySkills: [
      "Weight and balance",
      "Accuracy",
      "Aircraft loading",
      "Communication",
      "Safety compliance",
    ],
    notes:
      "Best suited to candidates with ramp, dispatch, load planning or aircraft turnaround experience.",
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

export default function CvCheckerPage() {
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showPremiumReport, setShowPremiumReport] = useState(false);

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

  const selectedRole =
    role === "Other Airport / Airline Role" ? customRole || role : role;

  const selectedRoleInsight = roleInsights[selectedRole];
  const selectedCareerPath = careerPaths[selectedRole];

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
        role: selectedRole,
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
        role: selectedRole,
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
    if (!role.trim()) {
      setError("Please choose the target role before checking your CV.");
      return;
    }

    setLoading(true);
    setReport(null);
    setError("");
    setShowPremiumReport(false);

    const formData = new FormData();
    formData.append("role", selectedRole);
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


  

  async function downloadAssessmentReportPdf() {
    try {
      const element = document.getElementById("premium-report-pdf");

      if (!element) {
        alert("Report is not ready yet.");
        return;
      }

      const imgData = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("airportcv-assessment-report.pdf");
    } catch (error) {
      console.error("PDF DOWNLOAD ERROR:", error);
      alert(
        `PDF ERROR: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }


  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/airportcv-logo-light.png"
              alt="AirportCV"
              width={180}
              height={52}
              className="h-auto w-36"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <Link href="/cv-builder" className="hover:text-blue-700">
              CV Builder
            </Link>
            <Link href="/cover-letter" className="hover:text-blue-700">
              Cover Letter
            </Link>
            <Link href="/interview-prep" className="hover:text-blue-700">
              Interview Prep
            </Link>
            <Link href="/pricing" className="hover:text-blue-700">
              Pricing
            </Link>
          </nav>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Open tools
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-20">
        <div className="absolute left-1/2 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-blue-700">
            Free Aviation CV Checker
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Check your CV for airport and airline roles
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Upload or paste your CV to get an airport readiness score, priority
            fixes, role matches and a stronger aviation CV draft.
          </p>
        </div>
      </section>

      <section id="checker" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              CV details
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Get your free airport career assessment
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Add your CV and target role. You can also paste a job description
              to check how closely your CV matches a specific vacancy.
            </p>

            <div className="mt-8 grid gap-6">
              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Target role
                </label>

                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Choose role</option>
                  {roles.map((roleOption) => (
                    <option key={roleOption}>{roleOption}</option>
                  ))}
                </select>

                {role === "Other Airport / Airline Role" && (
                  <input
                    value={customRole}
                    onChange={(event) => setCustomRole(event.target.value)}
                    placeholder="Type your target airport role"
                    className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-extrabold text-slate-800">
                    Full name (optional)
                  </label>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Full name"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-800">
                    Email (optional)
                  </label>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-800">
                    Phone (optional)
                  </label>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-800">
                    Location (optional)
                  </label>
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Location"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Upload CV
                </label>

                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                  className="mt-2 w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Or paste your CV
                </label>

                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  placeholder="Paste your CV text here..."
                  className="mt-2 h-52 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Job description (optional)
                </label>

                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the airport job description here..."
                  className="mt-2 h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-950">
                <p className="font-extrabold">Privacy note</p>

                <p className="mt-2 leading-6">
                  Your CV may contain personal information. AirportCV uses the
                  CV content you provide only to generate your result. Do not
                  include unnecessary sensitive information such as passport
                  numbers, National Insurance numbers, full home address, date
                  of birth, health information or financial details.
                </p>

                <p className="mt-2">
                  Read our{" "}
                  <Link href="/privacy" className="font-extrabold underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={checkCv}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Checking your CV..." : "Check my airport CV"}
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              AirportCV Report
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Your aviation CV feedback
            </h2>

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : !report ? (
              <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <p className="font-extrabold text-blue-950">
                  Your CV check report will appear here.
                </p>

                <p className="mt-2 leading-7 text-blue-900">
                  You’ll see your score, role-fit feedback, missing keywords,
                  priority fixes and recommended next steps.
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-8">
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
                    Airport readiness score
                  </p>

                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-6xl font-black text-slate-950">
                        {report.score}
                        <span className="text-2xl text-slate-500">/100</span>
                      </p>

                      <p className="mt-3 leading-7 text-slate-700">
                        {report.summary}
                      </p>
                    </div>

                    {report.bestMatches?.[0] && (
                      <div className="rounded-2xl bg-white p-4 ring-1 ring-blue-100">
                        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                          Top match
                        </p>
                        <p className="mt-1 text-lg font-black text-slate-950">
                          {report.bestMatches[0].role}
                        </p>
                        <p className="text-sm font-bold text-slate-600">
                          {report.bestMatches[0].match}% match
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-xl font-black text-slate-950">
                    Priority fixes
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                    {(report.fixes || []).map((fix) => (
                      <li key={fix}>{fix}</li>
                    ))}
                  </ul>
                </div>

                {report.jobMatch && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Job description match
                    </h3>

                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">
                          Match score
                        </span>
                        <span className="font-black text-green-700">
                          {report.jobMatch.score}%
                        </span>
                      </div>

                      <div className="mt-2 h-3 rounded-full bg-slate-200">
                        <div
                          className="h-3 rounded-full bg-green-600"
                          style={{ width: `${report.jobMatch.score}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                      <div>
                        <h4 className="font-black text-slate-950">
                          Missing keywords
                        </h4>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          {report.jobMatch.missingKeywords?.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-black text-slate-950">
                          Missing skills
                        </h4>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          {report.jobMatch.missingSkills?.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-black text-slate-950">
                          Recommended improvements
                        </h4>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          {report.jobMatch.recommendations?.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {report.bestMatches && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Best-fit aviation roles
                    </h3>

                    <div className="mt-5 space-y-3">
                      {report.bestMatches.slice(0, 5).map((match) => (
                        <div key={match.role}>
                          <div className="flex items-center justify-between text-sm font-bold">
                            <span>{match.role}</span>
                            <span className="text-blue-700">
                              {match.match}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 rounded-full bg-slate-200">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{ width: `${match.match}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRoleInsight && (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-xl font-black text-slate-950">
                      Role context: {selectedRole}
                    </h3>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                          Salary guide
                        </p>
                        <p className="mt-2 text-lg font-black text-slate-950">
                          {selectedRoleInsight.salary}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                          Shift pattern
                        </p>
                        <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                          {selectedRoleInsight.shiftPattern}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {selectedRoleInsight.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 leading-7 text-slate-700">
                      {selectedRoleInsight.notes}
                    </p>
                  </div>
                )}

                {selectedCareerPath && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Possible career path
                    </h3>

                    <div className="mt-5 grid gap-3 md:grid-cols-4">
                      {selectedCareerPath.map((step, index) => (
                        <div
                          key={step}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                        >
                          <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                            Step {index + 1}
                          </p>
                          <p className="mt-2 text-sm font-black text-slate-950">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

               <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
    Next step
  </p>

  <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
    Ready to build a stronger aviation CV?
  </h3>

  <p className="mt-3 leading-7 text-slate-700">
    Use your assessment results to create a cleaner, role-focused CV in the
    AirportCV Builder. The builder is where users should create and download
    their final Word or PDF CV.
  </p>

  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    <Link
      href="/cv-builder"
      className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
    >
      Open CV Builder
    </Link>

    <Link
      href="/cover-letter"
      className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
    >
      Generate cover letter
    </Link>
  </div>
</div>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                  <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 text-white">
                    <p className="inline-flex rounded-full bg-blue-500/20 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-blue-100">
                      Premium analysis available
                    </p>

                    <h3 className="mt-4 text-3xl font-black">
                      Unlock your full airport career report
                    </h3>

                    <p className="mt-3 max-w-2xl leading-7 text-slate-200">
                      Your free assessment gives your score, top match and
                      priority fixes. The full report reveals a deeper
                      recruiter-style analysis behind your result.
                    </p>
                  </div>

                  <div className="grid gap-4 p-6 md:grid-cols-2">
                    {[
                      {
                        title: `${
                          report.premiumPreview?.missingKeywordCount || 12
                        } Missing Keywords`,
                        desc:
                          "Airport-specific keywords found missing or weak in your CV.",
                      },
                      {
                        title: `${
                          report.premiumPreview?.missingSkillCount || 5
                        } Missing Skills`,
                        desc:
                          "Skills recruiters may expect but your CV does not clearly prove.",
                      },
                      {
                        title: `${
                          report.premiumPreview?.atsIssueCount || 4
                        } ATS Issues`,
                        desc:
                          "Formatting and keyword issues that may reduce visibility.",
                      },
                      {
                        title: `${
                          report.premiumPreview?.additionalRoleCount || 6
                        } Additional Career Matches`,
                        desc:
                          "Other airport roles your CV may be suitable for.",
                      },
                      {
                        title: "Salary Potential",
                        desc:
                          "Estimated earning range based on role match and progression.",
                      },
                      {
                        title: "Recruiter Feedback",
                        desc:
                          "Recruiter-style comments on what may reduce interview invitations.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-xl font-black text-slate-950">
                              {item.title}
                            </h4>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {item.desc}
                            </p>
                          </div>

                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                            Locked
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 bg-blue-50 p-8 text-center">
                    <h3 className="text-2xl font-black text-slate-950">
                      Full report coming soon
                    </h3>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
                      We are preparing the full Airport Career Report feature.
                      Early users will get first access when premium reports
                      launch.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          sessionStorage.setItem(
                            "airportcvPremiumReport",
                            JSON.stringify({
                              report,
                              fullName,
                              role: selectedRole,
                            })
                          );

                          window.location.href = "/premium-report";
                        }}
                        className="rounded-2xl bg-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                      >
                        View full airport career report
                      </button>

                      {report.premiumReport && (
                        <button
                          type="button"
                          onClick={() => setShowPremiumReport(true)}
                          className="rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                        >
                          Preview report on page
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Generate a cover letter
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      Create a tailored aviation cover letter based on this CV
                      assessment and role.
                    </p>

                    <button
                      type="button"
                      onClick={generateCoverLetter}
                      disabled={coverLetterLoading}
                      className="mt-5 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {coverLetterLoading
                        ? "Generating..."
                        : "Generate cover letter"}
                    </button>

                    {coverLetterError && (
                      <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                        {coverLetterError}
                      </div>
                    )}

                    {coverLetter && (
                      <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                        <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                          {coverLetter.coverLetter}
                        </p>
                      </div>
                    )}

                    <Link
                      href="/cover-letter"
                      className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                    >
                      Open cover letter tool
                    </Link>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Prepare for interview
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      Generate role-specific interview questions and suggested
                      answer points for your target aviation role.
                    </p>

                    <button
                      type="button"
                      onClick={generateInterviewPack}
                      disabled={interviewLoading}
                      className="mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {interviewLoading
                        ? "Preparing..."
                        : "Generate interview pack"}
                    </button>

                    {interviewError && (
                      <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                        {interviewError}
                      </div>
                    )}

                    {interviewPack && (
                      <div className="mt-5 space-y-5 rounded-2xl bg-slate-50 p-5">
                        <div>
                          <h4 className="font-black text-slate-950">
                            Example questions
                          </h4>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                            {interviewPack.questions
                              ?.slice(0, 3)
                              .map((item) => (
                                <li key={item.question}>{item.question}</li>
                              ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-black text-slate-950">
                            What to mention
                          </h4>
                          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                            {interviewPack.whatToMention
                              ?.slice(0, 4)
                              .map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <Link
                      href="/interview-prep"
                      className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                    >
                      Open interview prep tool
                    </Link>
                  </div>
                </div>

                {showPremiumReport && report.premiumReport && (
                  <div className="mt-12">
                    <PremiumAssessmentReport
                      report={report}
                      fullName={fullName}
                      role={selectedRole}
                    />

                    <button
                      type="button"
                      onClick={downloadAssessmentReportPdf}
                      className="mt-6 w-full rounded-2xl bg-slate-950 px-8 py-4 text-sm font-extrabold text-white transition hover:bg-slate-800"
                    >
                      Download PDF report
                    </button>
                  </div>
                )}

                <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs leading-5 text-slate-500">
                  Important notice: This assessment is generated using
                  AI-assisted analysis of information provided by the candidate.
                  AirportCV does not guarantee interviews, employment offers,
                  salary outcomes, security clearance approval or recruitment
                  decisions. This report is intended for career guidance only.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
