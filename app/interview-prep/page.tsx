"use client";

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
  const [role, setRole] = useState(roles[0]);
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
async function generateInterviewPack() {
  setLoading(true);
  setError("");
  setPack(null);

  const response = await fetch("/api/interview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: role === "Other" ? customRole : role,
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
      role: role === "Other" ? customRole : role,
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
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-blue-600">
          ← Back to AirportCV
        </a>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Interview Preparation
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Prepare for Your Airport Interview
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Generate role-specific interview questions, airport scenario questions
            and suggested answers based on your CV and the job description.
          </p>

          <div className="mt-8 grid gap-6">
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

            <button
              onClick={generateInterviewPack}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-500 disabled:bg-slate-400"
            >
              {loading ? "Generating..." : "Generate Interview Pack"}
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {pack && (
            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-2xl font-bold">
                  Likely Interview Questions
                </h2>

                <div className="mt-4 space-y-4">
                  {pack.questions?.map((item: any) => (
                    <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                     <p className="font-bold">{item.question}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">
                  Airport Scenario Questions
                </h2>

                <div className="mt-4 space-y-4">
                  {pack.scenarioQuestions?.map((item: any) => (
                    <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                      <p className="font-bold">{item.question}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold">What to Mention</h2>
                <ul className="mt-3 list-disc pl-5 text-slate-700">
                  {pack.whatToMention?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>
                <ul className="mt-3 list-disc pl-5 text-slate-700">
                  {pack.commonMistakes?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <div className="mt-10 rounded-3xl bg-slate-50 p-6">
  <h2 className="text-2xl font-bold">Practise Your Answer</h2>

  <p className="mt-2 text-slate-600">
    Choose one interview question, type your answer and get feedback from an airport interview coach.
  </p>

  <div className="mt-5 grid gap-5">
    <div>
      <label className="block text-sm font-semibold">
        Select Question
      </label>

      <select
        value={selectedQuestion}
        onChange={(e) => setSelectedQuestion(e.target.value)}
        className="mt-2 w-full rounded-xl border px-4 py-3"
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
      <label className="block text-sm font-semibold">
        Your Answer
      </label>

      <textarea
        value={candidateAnswer}
        onChange={(e) => setCandidateAnswer(e.target.value)}
        placeholder="Type your interview answer here..."
        className="mt-2 h-40 w-full rounded-xl border px-4 py-3"
      />
    </div>

    <button
      onClick={scoreAnswer}
      disabled={scoreLoading || !selectedQuestion || !candidateAnswer}
      className="rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white hover:bg-slate-800 disabled:bg-slate-400"
    >
      {scoreLoading ? "Scoring Answer..." : "Score My Answer"}
    </button>
  </div>

  {scoreError && (
    <div className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
      {scoreError}
    </div>
  )}

  {scoreResult && (
    <div className="mt-6 space-y-5">
      <div className="rounded-2xl bg-white p-5">
        <p className="text-sm font-semibold text-slate-500">
          Interview Score
        </p>

        <p className="mt-1 text-4xl font-bold text-blue-700">
          {scoreResult.score}/10
        </p>

        <p className="mt-3 text-slate-700">
          {scoreResult.summary}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5">
          <h3 className="font-bold">Strengths</h3>
          <ul className="mt-3 list-disc pl-5 text-slate-700">
            {scoreResult.strengths?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-5">
          <h3 className="font-bold">Improvements</h3>
          <ul className="mt-3 list-disc pl-5 text-slate-700">
            {scoreResult.improvements?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5">
        <h3 className="font-bold">Stronger Example Answer</h3>

        <p className="mt-3 whitespace-pre-line text-slate-700">
          {scoreResult.betterAnswer}
        </p>
      </div>
    </div>
  )}
</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}