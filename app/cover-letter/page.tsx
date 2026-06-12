"use client";

import { useState } from "react";
import CvUpload from "@/components/CvUpload";
import Link from "next/link";
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

export default function CoverLetterPage() {
  const [role, setRole] = useState(roles[0]);
  const [customRole, setCustomRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [error, setError] = useState("");

  async function generateCoverLetter() {
    setLoading(true);
    setError("");
    setCoverLetter(null);

    const response = await fetch("/api/cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role === "Other" ? customRole : role,
        fullName,
        cvText,
        profile: jobDescription,
        skills: [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Cover letter generation failed.");
      setLoading(false);
      return;
    }

    setCoverLetter(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-blue-600">
          ← Back to AirportCV
        </a>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Cover Letter Generator
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Generate a Professional Airport Cover Letter
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Create a tailored airport cover letter based on your CV, target role
            and job description.
          </p>

          <div className="mt-8 grid gap-6">
            <div>
              <label className="block text-sm font-semibold">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">Target Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              {role === "Other Airport / Airline Role" && (
                <input
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Type your target airport role"
                  className="mt-3 w-full rounded-xl border px-4 py-3"
                />
              )}
            </div>
<CvUpload onTextExtracted={setCvText} />
            <div>
              <label className="block text-sm font-semibold">Paste Your CV</label>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV text here..."
                className="mt-2 h-48 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="mt-2 h-40 w-full rounded-xl border px-4 py-3"
              />
            </div>
<div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
  <p className="font-semibold">Privacy note</p>
  <p className="mt-2">
    The details you provide may contain personal information from your CV,
    job history or target role. AirportCV uses this information only to generate
    your aviation cover letter. Avoid unnecessary sensitive information such as
    passport numbers, National Insurance numbers, full home address, date of
    birth, health information or financial details.
  </p>
  <p className="mt-2">
    Read our{" "}
    <Link href="/privacy" className="font-semibold underline">
      Privacy Policy
    </Link>
    .
  </p>
</div>
            <button
              onClick={generateCoverLetter}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-500 disabled:bg-slate-400"
            >
              {loading ? "Generating..." : "Generate Cover Letter"}
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {coverLetter && (
            <div className="mt-10 rounded-3xl bg-slate-50 p-8">
              <h2 className="text-2xl font-bold">Your Cover Letter</h2>

              <p className="mt-5 whitespace-pre-line leading-relaxed text-slate-700">
                {coverLetter.coverLetter}
              </p>
            </div>
          )}
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
  <p className="text-sm text-blue-950">
    Ready for the next stage? Practise aviation interview questions for the same
    target role.
  </p>

  <Link
    href="/interview-prep"
    className="mt-3 inline-flex rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
  >
    Prepare for interview questions
  </Link>
</div>
        </div>
      </div>
    </main>
  );
}