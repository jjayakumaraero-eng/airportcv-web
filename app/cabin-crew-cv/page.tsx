"use client";

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
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-blue-600">
          ← Back to AirportCV
        </a>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Cabin Crew CV Optimiser
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Optimise Your CV for Cabin Crew Applications
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Upload or paste your CV and receive personalised cabin crew suitability feedback,
            CV improvement advice and airline recruitment recommendations.
          </p>

          <div className="mt-8 grid gap-6">
            <div>
              <label className="block text-sm font-semibold">
                Current Career Stage
              </label>

              <select
                value={careerStatus}
                onChange={(e) => setCareerStatus(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option>Fresh cabin crew applicant</option>
                <option>Experienced cabin crew</option>
                <option>Career changer applying for cabin crew</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Current Job
              </label>

              <input
                value={currentJobTitle}
                onChange={(e) => setCurrentJobTitle(e.target.value)}
                placeholder="Example: Retail Assistant, Customer Service Advisor, Cabin Crew"
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Preferred Airline (Optional)
              </label>

              <input
                value={preferredAirline}
                onChange={(e) => setPreferredAirline(e.target.value)}
                placeholder="Example: British Airways, Emirates, Qatar Airways, easyJet"
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <CvUpload onTextExtracted={setCvText} />

            <div>
              <label className="block text-sm font-semibold">
                Paste Your CV (Optional)
              </label>

              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV here if you prefer..."
                className="mt-2 h-40 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <button
              onClick={generateCabinCrewAssessment}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-500 disabled:bg-slate-400"
            >
              {loading ? "Creating Your Assessment..." : "Get My Cabin Crew Assessment"}
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-10 space-y-6">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Cabin Crew Readiness
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {result.promotionReadiness}
                </h2>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm font-semibold text-blue-700">
                  Your Cabin Crew Assessment
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {result.careerStage}
                </h2>

                <p className="mt-3 text-slate-700">{result.summary}</p>

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  Confidence Level: {result.confidenceLevel}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold">
                    Suitable Roles To Apply For
                  </h3>

                  <ul className="mt-3 list-disc pl-5 text-slate-700">
                    {result.rolesToApplyNow?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold">
                    Future Cabin Crew Progression
                  </h3>

                  <ul className="mt-3 list-disc pl-5 text-slate-700">
                    {result.rolesToTargetLater?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Skills to Build</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {result.skillsToBuild?.map((item: string) => (
                    <span
                      key={item}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">
                  Cabin Crew CV Improvement Advice
                </h3>

                <ul className="mt-3 list-disc pl-5 text-slate-700">
                  {result.cvPositioningAdvice?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Recommended Next Steps</h3>

                <ol className="mt-3 list-decimal pl-5 text-slate-700">
                  {result.nextSteps?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}