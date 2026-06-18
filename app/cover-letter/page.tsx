"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CvUpload from "@/components/CvUpload";

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
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [error, setError] = useState("");

  async function generateCoverLetter() {
    if (!role.trim()) {
      setError("Please choose the target role before generating your cover letter.");
      return;
    }

    setLoading(true);
    setError("");
    setCoverLetter(null);

    const response = await fetch("/api/cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role === "Other Airport / Airline Role" ? customRole : role,
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
            <Link href="/cv-checker" className="hover:text-blue-700">
              CV Checker
            </Link>
            <Link href="/pricing" className="hover:text-blue-700">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-blue-700">
              Blog
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
            Aviation Cover Letter Generator
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Generate a professional airport cover letter
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Create a tailored aviation cover letter based on your CV, target
            role and job description.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Cover letter details
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Tell us about the role
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Add your target role, CV and job description. The tool will draft
              a role-focused cover letter you can review and edit.
            </p>

            <div className="mt-8 grid gap-6">
              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Full name
                </label>

                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

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

              <CvUpload onTextExtracted={setCvText} />

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Paste your CV
                </label>

                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  placeholder="Paste your CV text here..."
                  className="mt-2 h-48 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Job description
                </label>

                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the job description here..."
                  className="mt-2 h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-950">
                <p className="font-extrabold">Privacy note</p>

                <p className="mt-2 leading-6">
                  The details you provide may contain personal information from
                  your CV, job history or target role. AirportCV uses this
                  information only to generate your aviation cover letter.
                </p>

                <p className="mt-2 leading-6">
                  Avoid unnecessary sensitive information such as passport
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
                onClick={generateCoverLetter}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Generating..." : "Generate cover letter"}
              </button>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Draft
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Your aviation cover letter
            </h2>

            {!coverLetter && (
              <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <p className="font-extrabold text-blue-950">
                  Your generated letter will appear here.
                </p>

                <p className="mt-2 leading-7 text-blue-900">
                  Add your details and generate a tailored cover letter for your
                  selected aviation role.
                </p>
              </div>
            )}

            {coverLetter && (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="whitespace-pre-line leading-8 text-slate-700">
                  {coverLetter.coverLetter}
                </p>
              </div>
            )}

            <div className="mt-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
              <p className="font-extrabold text-slate-950">
                Ready for the next stage?
              </p>

              <p className="mt-2 leading-7 text-slate-700">
                Practise aviation interview questions for the same target role.
              </p>

              <Link
                href="/interview-prep"
                className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Prepare for interview questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
