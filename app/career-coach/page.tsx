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

export default function CareerCoachPage() {
  const [careerStatus, setCareerStatus] = useState("Starting my career");
  const [fullName, setFullName] = useState("");
const [location, setLocation] = useState("");
const [educationLevel, setEducationLevel] = useState("");
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
        fullName,
        location,
        educationLevel,
        leadershipExperience,
        careerGoal,
        currentJobTitle,
        targetRole: targetRole === "Other Airport / Airline Role" ? customRole : targetRole,
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
  Aviation Career Assessment
</p>

<h1 className="mt-3 text-4xl font-bold">
  Discover Which Aviation Career Is Right For You
</h1>

<p className="mt-4 max-w-2xl text-slate-600">
  Complete a free aviation career assessment to discover your suitability for airport,
  airline and aviation roles, identify skill gaps and receive personalised career recommendations.
</p>

<div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
  <p className="font-semibold">Privacy note</p>
  <p className="mt-2">
    Your answers may include personal career information, experience, education
    and goals. AirportCV uses this information only to generate your aviation
    career assessment result. Avoid unnecessary sensitive information such as
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
          <div className="mt-8 grid gap-6">
            <div>
  <label className="block text-sm font-semibold">
    Full Name
  </label>

  <input
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    placeholder="Enter your full name"
    className="mt-2 w-full rounded-xl border px-4 py-3"
  />
</div>

<div>
  <label className="block text-sm font-semibold">
    Country / Location
  </label>

  <input
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="Example: London, United Kingdom"
    className="mt-2 w-full rounded-xl border px-4 py-3"
  />
</div>

<div>
  <label className="block text-sm font-semibold">
    Highest Education Level
  </label>

  <select
    value={educationLevel}
    onChange={(e) => setEducationLevel(e.target.value)}
    className="mt-2 w-full rounded-xl border px-4 py-3"
  >
    <option value="">Select education level</option>
    <option>High School / Secondary School</option>
    <option>College Diploma</option>
    <option>Vocational Qualification</option>
    <option>Bachelor's Degree</option>
    <option>Master's Degree</option>
    <option>Doctorate / PhD</option>
    <option>Professional Aviation Qualification</option>
    <option>Other</option>
  </select>
</div>

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
                What Is Your Main Aviation Career Goal?
              </label>
              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option value="">Select your goal</option>

<option>Get my first aviation job</option>

<option>
  Find the best aviation role for my experience
</option>

<option>Become Cabin Crew</option>

<option>Become a Pilot</option>

<option>
  Become an Aircraft Maintenance Engineer
</option>

<option>
  Become an Airport Operations Professional
</option>

<option>
  Progress to Team Leader / Supervisor
</option>

<option>
  Progress into Management
</option>

<option>
  Change career into aviation
</option>

<option>
  Plan my long-term aviation career path
</option>

<option>
  Not sure – explore my options
</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold">
                Target Aviation Role (Optional)
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option value="">I'm not sure yet - recommend suitable aviation careers</option>
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              {targetRole === "Other Airport / Airline Role" && (
                <input
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Type your exact aviation, airport or airline role"
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
              {loading
  ? "Assessing Your Aviation Career Options..."
  : "Get My Free Aviation Career Assessment"}
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
        Aviation Career Suitability
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
  Recommended Aviation Roles
</h3>

                  <ul className="mt-3 list-disc pl-5 text-slate-700">
                    {result.rolesToApplyNow?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold">
  Future Career Pathways
</h3>

                  <ul className="mt-3 list-disc pl-5 text-slate-700">
                    {result.rolesToTargetLater?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">
  Skills & Qualifications To Develop
</h3>

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
  How To Strengthen Your Application
</h3>

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
<div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
  <h3 className="text-xl font-bold">
    Recommended AirportCV Tools
  </h3>

  <p className="mt-2 text-slate-300">
    Based on your assessment, continue with the tools below to improve your aviation applications.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-3">
    <a
      href="/cv-checker"
      className="rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
    >
      <h4 className="font-bold">
        {targetRole === "Cabin Crew"
          ? "Cabin Crew CV Optimiser"
          : targetRole === "Pilot"
          ? "Pilot CV Readiness Check"
          : targetRole === "Aircraft Maintenance Engineer"
          ? "Aircraft Engineer CV Check"
          : "Check My Aviation CV"}
      </h4>

      <p className="mt-2 text-sm text-slate-300">
        {targetRole === "Cabin Crew"
          ? "Check whether your CV is ready for cabin crew applications."
          : targetRole === "Pilot"
          ? "Review your CV against pilot pathway and cadet programme expectations."
          : targetRole === "Aircraft Maintenance Engineer"
          ? "Check how well your CV supports aircraft maintenance and engineering roles."
          : "Test your CV against your target aviation role."}
      </p>
    </a>

    <a
      href="/cover-letter"
      className="rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
    >
      <h4 className="font-bold">
        {targetRole === "Cabin Crew"
          ? "Cabin Crew Cover Letter"
          : targetRole === "Pilot"
          ? "Pilot Cover Letter"
          : targetRole === "Aircraft Maintenance Engineer"
          ? "Engineering Cover Letter"
          : "Cover Letter Generator"}
      </h4>

      <p className="mt-2 text-sm text-slate-300">
        Create a tailored application letter for your selected aviation pathway.
      </p>
    </a>

    <a
      href="/interview-prep"
      className="rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
    >
      <h4 className="font-bold">
        {targetRole === "Cabin Crew"
          ? "Cabin Crew Interview Prep"
          : targetRole === "Pilot"
          ? "Pilot Interview Preparation"
          : targetRole === "Aircraft Maintenance Engineer"
          ? "Engineering Interview Prep"
          : "Interview Preparation"}
      </h4>

      <p className="mt-2 text-sm text-slate-300">
        Practise role-specific aviation interview questions.
      </p>
    </a>
  </div>
</div>
{result && (
  <div className="mt-10 space-y-6">
    

    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
      <p className="text-sm text-blue-950">
        Ready to turn this career guidance into a professional aviation CV?
      </p>

      <Link
        href="/cv-builder"
        className="mt-3 inline-flex rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Build my aviation CV
      </Link>
    </div>
  </div>
)}

            </div>
          )}
        </div>
      </div>
    </main>
  );
}