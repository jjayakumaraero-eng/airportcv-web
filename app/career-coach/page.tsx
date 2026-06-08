"use client";

import { useState } from "react";
import CvUpload from "@/components/CvUpload";

const roles = [
  "Passenger Service Agent",
  "Ramp Agent",
  "Baggage Handler",
  "Airport Security Officer",
  "Flight Dispatcher",
  "Load Controller",
  "Other",
];

export default function CareerCoachPage() {
  const [careerStatus, setCareerStatus] = useState("Starting my career");
  const [yearsExperience, setYearsExperience] = useState("");
  const [experienceField, setExperienceField] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [leadershipExperience, setLeadershipExperience] = useState("No");
  const [careerGoal, setCareerGoal] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [cvText, setCvText] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function generateCareerGuidance() {
    setLoading(true);
    setError("");
    setResult(null);

    const response = await fetch("/api/career-coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        careerStatus,
        yearsExperience,
        experienceField,
        leadershipExperience,
        careerGoal,
        currentJobTitle,
        targetRole: targetRole === "Other" ? customRole : targetRole,
        cvText,
        experienceDescription,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Career coaching failed.");
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
            Airport Career Coach
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Discover Your Best Next Airport Career Move
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Answer a few questions and receive personalised airport career guidance,
            promotion readiness insights and recommended roles to target next.
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
                <option>Starting my career</option>
                <option>Early career (0–3 years)</option>
                <option>Experienced professional (3+ years)</option>
                <option>Supervisor / Team Leader</option>
                <option>Manager</option>
                <option>Career changer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Years of Work Experience
              </label>
              <select
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option value="">Select experience level</option>
                <option>0 years</option>
                <option>Less than 1 year</option>
                <option>1–2 years</option>
                <option>3–5 years</option>
                <option>6–10 years</option>
                <option>10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Your Main Experience Area
              </label>
              <select
                value={experienceField}
                onChange={(e) => setExperienceField(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option value="">Select your experience area</option>
                <option>Airport / Airline / Ground Handling</option>
                <option>Customer Service</option>
                <option>Retail</option>
                <option>Hospitality</option>
                <option>Logistics / Warehouse</option>
                <option>Security</option>
                <option>Transport</option>
                <option>Administration / Office</option>
                <option>Technical / Engineering</option>
                <option>No Work Experience Yet</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Current or Last Job Title
              </label>
              <input
                value={currentJobTitle}
                onChange={(e) => setCurrentJobTitle(e.target.value)}
                placeholder="Example: Customer Service Advisor"
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Do You Currently Supervise People?
              </label>
              <select
                value={leadershipExperience}
                onChange={(e) => setLeadershipExperience(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option>No</option>
                <option>Occasionally</option>
                <option>Yes – small team</option>
                <option>Yes – larger team</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                What Would You Like Help With?
              </label>
              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option value="">Select your goal</option>
                <option>Get my first airport job</option>
                <option>Find the best airport role for my experience</option>
                <option>Progress to a Team Leader or Supervisor role</option>
                <option>Progress into management</option>
                <option>Change career into the airport industry</option>
                <option>Plan my long-term airport career path</option>
                <option>Not sure – explore my options</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Specific Role You're Interested In Optional
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option value="">Leave blank if you're exploring options</option>
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              {targetRole === "Other" && (
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
              <label className="block text-sm font-semibold">
                Paste Your CV Optional
              </label>
              <textarea
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV here if you want more personalised guidance..."
                className="mt-2 h-40 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Tell Us Anything Else About Your Experience or Career Goals Optional
              </label>
              <textarea
                value={experienceDescription}
                onChange={(e) => setExperienceDescription(e.target.value)}
                placeholder="Example: I have 2 years in passenger services and want to move into supervision."
                className="mt-2 h-40 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <button
              onClick={generateCareerGuidance}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-500 disabled:bg-slate-400"
            >
              {loading ? "Creating Your Career Plan..." : "Get My Career Plan"}
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
                  Promotion Readiness
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {result.promotionReadiness}
                </h2>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm font-semibold text-blue-700">
                  Your Airport Career Assessment
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
                    Recommended Roles To Apply For Now
                  </h3>

                  <ul className="mt-3 list-disc pl-5 text-slate-700">
                    {result.rolesToApplyNow?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold">Your Next Career Step</h3>

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
                <h3 className="text-xl font-bold">CV Positioning Advice</h3>

                <ul className="mt-3 list-disc pl-5 text-slate-700">
                  {result.cvPositioningAdvice?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">90-Day Action Plan</h3>

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