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

export default function CareerCoachPage() {
  const [careerStatus, setCareerStatus] = useState("Starting my career");
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

  const selectedTargetRole =
    targetRole === "Other Airport / Airline Role" ? customRole || targetRole : targetRole;

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
        location,
        educationLevel,
        leadershipExperience,
        careerGoal,
        currentJobTitle,
        targetRole: selectedTargetRole,
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
            Aviation Career Coach
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Discover which aviation career is right for you
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Complete a free aviation career assessment to discover suitable
            airport, airline and aviation roles, identify skill gaps and receive
            personalised career recommendations.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Career assessment
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Tell us about your background
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Add your experience, education and goals. The career coach will
              suggest aviation pathways and practical next steps.
            </p>

            <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-950">
              <p className="font-extrabold">Privacy note</p>

              <p className="mt-2 leading-6">
                Your answers may include personal career information, experience,
                education and goals. AirportCV uses this information only to
                generate your aviation career assessment result.
              </p>

              <p className="mt-2 leading-6">
                Avoid unnecessary sensitive information such as passport numbers,
                National Insurance numbers, full home address, date of birth,
                health information or financial details.
              </p>

              <p className="mt-2">
                Read our{" "}
                <Link href="/privacy" className="font-extrabold underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 grid gap-6">
              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Country / location (optional)
                </label>

                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Example: London, United Kingdom"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Highest education level
                </label>

                <select
                  value={educationLevel}
                  onChange={(event) => setEducationLevel(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                <label className="block text-sm font-extrabold text-slate-800">
                  Current career stage
                </label>

                <select
                  value={careerStatus}
                  onChange={(event) => setCareerStatus(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                <label className="block text-sm font-extrabold text-slate-800">
                  Years of work experience
                </label>

                <select
                  value={yearsExperience}
                  onChange={(event) => setYearsExperience(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                <label className="block text-sm font-extrabold text-slate-800">
                  Main experience area
                </label>

                <select
                  value={experienceField}
                  onChange={(event) => setExperienceField(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                <label className="block text-sm font-extrabold text-slate-800">
                  Current or last job title
                </label>

                <input
                  value={currentJobTitle}
                  onChange={(event) => setCurrentJobTitle(event.target.value)}
                  placeholder="Example: Customer Service Advisor"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Do you currently supervise people?
                </label>

                <select
                  value={leadershipExperience}
                  onChange={(event) =>
                    setLeadershipExperience(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>No</option>
                  <option>Occasionally</option>
                  <option>Yes – small team</option>
                  <option>Yes – larger team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Main aviation career goal
                </label>

                <select
                  value={careerGoal}
                  onChange={(event) => setCareerGoal(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select your goal</option>
                  <option>Get my first aviation job</option>
                  <option>Find the best aviation role for my experience</option>
                  <option>Become Cabin Crew</option>
                  <option>Become a Pilot</option>
                  <option>Become an Aircraft Maintenance Engineer</option>
                  <option>Become an Airport Operations Professional</option>
                  <option>Progress to Team Leader / Supervisor</option>
                  <option>Progress into Management</option>
                  <option>Change career into aviation</option>
                  <option>Plan my long-term aviation career path</option>
                  <option>Not sure – explore my options</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Target aviation role optional
                </label>

                <select
                  value={targetRole}
                  onChange={(event) => setTargetRole(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    I&apos;m not sure yet - recommend suitable aviation careers
                  </option>
                  {roles.map((roleOption) => (
                    <option key={roleOption}>{roleOption}</option>
                  ))}
                </select>

                {targetRole === "Other Airport / Airline Role" && (
                  <input
                    value={customRole}
                    onChange={(event) => setCustomRole(event.target.value)}
                    placeholder="Type your exact aviation, airport or airline role"
                    className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                )}
              </div>

              <CvUpload onTextExtracted={setCvText} />

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Paste your CV optional
                </label>

                <textarea
                  value={cvText}
                  onChange={(event) => setCvText(event.target.value)}
                  placeholder="Paste your CV here if you want more personalised guidance..."
                  className="mt-2 h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Tell us anything else about your experience or career goals
                  optional
                </label>

                <textarea
                  value={experienceDescription}
                  onChange={(event) =>
                    setExperienceDescription(event.target.value)
                  }
                  placeholder="Example: I have 2 years in passenger services and want to move into supervision."
                  className="mt-2 h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                onClick={generateCareerGuidance}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading
                  ? "Assessing your aviation career options..."
                  : "Get my free aviation career assessment"}
              </button>

              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Career guidance
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Your aviation career assessment
            </h2>

            {!result && (
              <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <p className="font-extrabold text-blue-950">
                  Your assessment will appear here.
                </p>

                <p className="mt-2 leading-7 text-blue-900">
                  Complete the form to see career suitability, recommended
                  roles, skills to build and a practical 90-day action plan.
                </p>
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6">
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
                    Aviation career suitability
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    {result.promotionReadiness}
                  </h3>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-extrabold text-blue-700">
                    Your airport career assessment
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-slate-950">
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
                      Recommended aviation roles
                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                      {result.rolesToApplyNow?.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      Future career pathways
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
                    Skills and qualifications to develop
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
                    How to strengthen your application
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                    {result.cvPositioningAdvice?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">
                    90-day action plan
                  </h3>

                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
                    {result.nextSteps?.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-sm">
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-200">
                    Recommended AirportCV tools
                  </p>

                  <h3 className="mt-3 text-2xl font-black">
                    Continue your aviation application journey
                  </h3>

                  <p className="mt-3 leading-7 text-slate-200">
                    Based on your assessment, continue with the tools below to
                    improve your aviation applications.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Link
                      href="/cv-checker"
                      className="rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                    >
                      <h4 className="font-black">
                        {selectedTargetRole === "Cabin Crew"
                          ? "Cabin Crew CV Optimiser"
                          : selectedTargetRole === "Pilot"
                          ? "Pilot CV Readiness Check"
                          : selectedTargetRole ===
                            "Aircraft Maintenance Engineer"
                          ? "Aircraft Engineer CV Check"
                          : "Check My Aviation CV"}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Test your CV against your target aviation role.
                      </p>
                    </Link>

                    <Link
                      href="/cover-letter"
                      className="rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                    >
                      <h4 className="font-black">
                        {selectedTargetRole === "Cabin Crew"
                          ? "Cabin Crew Cover Letter"
                          : selectedTargetRole === "Pilot"
                          ? "Pilot Cover Letter"
                          : selectedTargetRole ===
                            "Aircraft Maintenance Engineer"
                          ? "Engineering Cover Letter"
                          : "Cover Letter Generator"}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Create a tailored application letter for your selected
                        aviation pathway.
                      </p>
                    </Link>

                    <Link
                      href="/interview-prep"
                      className="rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                    >
                      <h4 className="font-black">
                        {selectedTargetRole === "Cabin Crew"
                          ? "Cabin Crew Interview Prep"
                          : selectedTargetRole === "Pilot"
                          ? "Pilot Interview Preparation"
                          : selectedTargetRole ===
                            "Aircraft Maintenance Engineer"
                          ? "Engineering Interview Prep"
                          : "Interview Preparation"}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Practise role-specific aviation interview questions.
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">
                    Ready to turn this guidance into a professional aviation CV?
                  </h3>

                  <p className="mt-3 leading-7 text-slate-700">
                    Use your career assessment to create a structured,
                    role-focused aviation CV in the AirportCV Builder.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/cv-builder"
                      className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                      Build my aviation CV
                    </Link>

                    <Link
                      href="/cv-checker"
                      className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                    >
                      Check my current CV
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
