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
  <main className="min-h-screen bg-slate-50 text-slate-900">
      

      
      <section id="checker" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-slate-950 p-2 shadow-2xl">
          <div className="grid gap-2 lg:grid-cols-2">
            <div className="rounded-[1.7rem] bg-white p-6 lg:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Free CV Check
              </p>
              <h2 className="mt-2 text-3xl font-bold">Get Your Free Airport Career Assessment</h2>
              <p className="mt-3 text-slate-600">
                Upload your CV and receive a free airport readiness score, top improvement areas and best-fit role match.
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

                  <div className="mt-8 rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50 p-8">
  <div className="text-center">
    <div className="text-5xl">🔒</div>

    <h3 className="mt-4 text-2xl font-bold text-slate-950">
      Full Airport Career Report
    </h3>

    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
      Your free assessment includes your score, priority fixes and best-fit role match.
      The full report will unlock deeper career insights and professional application tools.
    </p>

    <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left text-sm text-slate-700 md:grid-cols-2">
      <p>✓ ATS CV Analysis</p>
      <p>✓ Job Description Match</p>
      <p>✓ Salary Insights</p>
      <p>✓ Career Roadmap</p>
      <p>✓ Professional CV Rewrite</p>
      <p>✓ Downloadable CV</p>
      <p>✓ Cover Letter Generator</p>
      <p>✓ Interview Preparation Pack</p>
    </div>

    <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white">
      Join the Early Access List
    </button>
  </div>
</div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
