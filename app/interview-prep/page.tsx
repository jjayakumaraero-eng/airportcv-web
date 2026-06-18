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

export default function InterviewPrepPage() {
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [pack, setPack] = useState<any>(null);
  const [error, setError] = useState("");

  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [scoreError, setScoreError] = useState("");

  const selectedRole =
    role === "Other Airport / Airline Role" ? customRole || role : role;

  async function generateInterviewPack() {
    setLoading(true);
    setError("");
    setPack(null);
    setScoreResult(null);
    setSelectedQuestion("");
    setCandidateAnswer("");

    const response = await fetch("/api/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: selectedRole,
        cvText,
        profile: jobDescription,
        skills: [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Interview preparation failed.");
      setLoading(false);
      return;
    }

    setPack(data);
    setLoading(false);
  }

  async function scoreAnswer() {
    setScoreLoading(true);
    setScoreError("");
    setScoreResult(null);

    const response = await fetch("/api/interview-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: selectedRole,
        question: selectedQuestion,
        answer: candidateAnswer,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setScoreError(data.error || "Scoring failed.");
      setScoreLoading(false);
      return;
    }

    setScoreResult(data);
    setScoreLoading(false);
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
            <Link href="/cover-letter" className="hover:text-blue-700">
              Cover Letter
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
            Aviation Interview Preparation
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Prepare for your airport interview
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Practise role-specific interview questions, airport scenario
            questions and suggested answer guidance based on your CV and job
            description.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Interview details
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Build your interview pack
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Choose your target role, add your CV or job description, and AirportCV will
              create likely questions, scenario questions and preparation points.
            </p>

            <div className="mt-8 grid gap-6">
              <div>
                <label className="block text-sm font-extrabold text-slate-800">
                  Choose target role
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
                    placeholder="Type your target aviation role"
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
                  Your interview preparation details may include personal career
                  information, experience, education, target roles and job
                  application context. AirportCV uses this information only to
                  generate your aviation interview preparation result.
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
                onClick={generateInterviewPack}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Generating..." : "Generate interview pack"}
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
              Practice pack
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Your airport interview preparation
            </h2>

            {!pack && (
              <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <p className="font-extrabold text-blue-950">
                  Your interview pack will appear here.
                </p>

                <p className="mt-2 leading-7 text-blue-900">
                  Generate your pack to see likely questions, scenario questions,
                  key points to mention and common mistakes to avoid.
                </p>
              </div>
            )}

            {pack && (
              <div className="mt-8 space-y-8">
                <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">
                    Role-specific interview questions
                  </h3>

                  <div className="mt-5 space-y-3">
                    {pack.questions?.map((item: any, index: number) => (
                      <div
                        key={item.question}
                        className="rounded-2xl border border-slate-200 bg-white p-5"
                      >
                        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                          Question {index + 1}
                        </p>
                        <p className="mt-2 font-bold text-slate-950">
                          {item.question}
                        </p>

                        {item.answer && (
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">
                    Airport scenario questions
                  </h3>

                  <div className="mt-5 space-y-3">
                    {pack.scenarioQuestions?.map((item: any, index: number) => (
                      <div
                        key={item.question}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                          Scenario {index + 1}
                        </p>
                        <p className="mt-2 font-bold text-slate-950">
                          {item.question}
                        </p>

                        {item.answer && (
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                      What to mention
                    </h3>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                      {pack.whatToMention?.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-3xl border border-rose-100 bg-rose-50 p-6">
                    <h3 className="text-xl font-black text-slate-950">
                      Common mistakes to avoid
                    </h3>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                      {pack.commonMistakes?.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <section className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
                    Answer practice
                  </p>

                  <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                    Practise your answer
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    Choose one interview question, type your answer and get
                    feedback from an airport interview coach.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <div>
                      <label className="block text-sm font-extrabold text-slate-800">
                        Select question
                      </label>

                      <select
                        value={selectedQuestion}
                        onChange={(event) =>
                          setSelectedQuestion(event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">Choose a question</option>

                        {pack.questions?.map((item: any) => (
                          <option key={item.question} value={item.question}>
                            {item.question}
                          </option>
                        ))}

                        {pack.scenarioQuestions?.map((item: any) => (
                          <option key={item.question} value={item.question}>
                            {item.question}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-extrabold text-slate-800">
                        Your answer
                      </label>

                      <textarea
                        value={candidateAnswer}
                        onChange={(event) =>
                          setCandidateAnswer(event.target.value)
                        }
                        placeholder="Type your interview answer here..."
                        className="mt-2 h-40 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={scoreAnswer}
                      disabled={
                        scoreLoading || !selectedQuestion || !candidateAnswer
                      }
                      className="rounded-2xl bg-slate-950 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {scoreLoading ? "Scoring answer..." : "Score my answer"}
                    </button>
                  </div>

                  {scoreError && (
                    <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                      {scoreError}
                    </div>
                  )}

                  {scoreResult && (
                    <div className="mt-6 space-y-5">
                      <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                        <p className="text-sm font-extrabold uppercase tracking-wide text-blue-700">
                          Interview score
                        </p>

                        <p className="mt-2 text-5xl font-black text-slate-950">
                          {scoreResult.score}
                          <span className="text-2xl text-slate-500">/10</span>
                        </p>

                        <p className="mt-4 leading-7 text-slate-700">
                          {scoreResult.summary}
                        </p>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <h4 className="text-xl font-black text-slate-950">
                            Strengths
                          </h4>

                          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                            {scoreResult.strengths?.map((item: string) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <h4 className="text-xl font-black text-slate-950">
                            Improvements
                          </h4>

                          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
                            {scoreResult.improvements?.map((item: string) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h4 className="text-xl font-black text-slate-950">
                          Stronger example answer
                        </h4>

                        <p className="mt-4 whitespace-pre-line leading-8 text-slate-700">
                          {scoreResult.betterAnswer}
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                <section className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">
                    Need a stronger CV before interview?
                  </h3>

                  <p className="mt-3 leading-7 text-slate-700">
                    Check your aviation CV and prepare a stronger role-focused
                    version before your next application or interview.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/cv-checker"
                      className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                      Check my CV
                    </Link>

                    <Link
                      href="/cover-letter"
                      className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-extrabold text-blue-700 ring-1 ring-blue-100 transition hover:bg-blue-50"
                    >
                      Generate cover letter
                    </Link>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
