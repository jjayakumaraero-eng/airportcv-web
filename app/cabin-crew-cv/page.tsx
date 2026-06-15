"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CvUpload from "@/components/CvUpload";

export default function CabinCrewCvPage() {
  const [careerStatus, setCareerStatus] = useState("Fresh cabin crew applicant");
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [preferredAirline, setPreferredAirline] = useState("");
  const [cvText, setCvText] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function generateCabinCrewAssessment() {
    setLoading(true);
    setError("");
    setResult(null);

    const response = await fetch("/api/cabin-crew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        careerStatus,
        yearsExperience: "",
        experienceField: "",
        leadershipExperience: "",
        careerGoal: "Cabin crew CV assessment",
        currentJobTitle,
        targetRole: preferredAirline || "Any airline",
        cvText,
        experienceDescription: "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Cabin crew assessment failed.");
      setLoading(false);
      return;
    }

    setResult(data);
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
            Cabin Crew CV Optimiser
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Optimise your CV for cabin crew applications
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Upload or paste your CV and receive cabin crew suitability feedback,
            CV improvement advice and airline application recommendations.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Your details
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Cabin crew assessment
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Add your current background and CV. The tool will review your
              suitability and suggest practical next steps.
            </p>

            <div className="mt-8 grid gap-6">
              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Current career stage
                </label>

                <select
                  value={careerStatus}
                  onChange={(event) => setCareerStatus(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>Fresh cabin crew applicant</option>
                  <option>Experienced cabin crew</option>
                  <option>Career changer applying for cabin crew</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Current job
                </label>

                <input
                  value={currentJobTitle}
                  onChange={(event) => setCurrentJobTitle(event.target.value)}
                  placeholder="Example: Retail Assistant, Customer Service Advisor, Cabin Crew"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Preferred airline optional
                </label>

                <input
                  value={preferredAirline}
                  onChange={(event) => setPreferredAirline(event.target.value)}
                  placeholder="Example: British Airways, Emirates, Qatar Airways, easyJet"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <CvUpload onTextExtracted={setCvText} />

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Paste your CV optional
                </label>

                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  placeholder="Paste your CV here if you prefer..."
                  className="mt-2 h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                onClick={generateCabinCrewAssessment}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading
                  ? "Creating your assessment..."
                  : "Get my cabin crew assessment"}
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
              Results
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Your cabin crew feedback
            </h2>

            {!result && (
              <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <p className="font-extrabold text-blue-950">
                  Your assessment will appear here.
                </p>
                <p className="mt-2 leading-7 text-blue-900">
                  Complete the form and generate your cabin crew CV assessment
                  to see suitability feedback, role suggestions and CV
                  improvement advice.
                </p>
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6">
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
                    Cabin crew readiness
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    {result.promotionReadiness}
                  </h3>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-extrabold text-blue-700">
                    Your cabin crew assessment
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    {result.careerStage}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-700">
                    {result.summary}
                  </p>

                  <p className="mt-3 text-sm font-extrabold text-slate-600">
                    Confidence Level: {result.confidenceLevel}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Suitable roles to apply for
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                      {result.rolesToApplyNow?.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Future cabin crew progression
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                      {result.rolesToTargetLater?.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">
                    Skills to build
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.skillsToBuild?.map((item: string) => (
                      <span
                        key={item}
                        className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">
                    Cabin crew CV improvement advice
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                    {result.cvPositioningAdvice?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">
                    Recommended next steps
                  </h3>

                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
                    {result.nextSteps?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
