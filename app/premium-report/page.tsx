"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PremiumAssessmentReport from "@/components/PremiumAssessmentReport";

type StoredReport = {
  report: any;
  fullName: string;
  role: string;
};

const recommendedNextSteps = [
  {
    title: "Build My CV",
    description:
      "Create a structured aviation CV using your career assessment insights.",
    href: "/cv-builder",
  },
  {
    title: "Interview Preparation",
    description: "Practice airport, airline and aviation interview questions.",
    href: "/interview-prep",
  },
  {
    title: "Cover Letter Generator",
    description: "Create tailored aviation cover letters for your target role.",
    href: "/cover-letter",
  },
  {
    title: "Reassess My CV",
    description: "Upload your improved CV again and check your progress.",
    href: "/cv-checker",
  },
];

export default function PremiumReportPage() {
  const [data, setData] = useState<StoredReport | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("airportcvPremiumReport");

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-slate-950">
          No report found
        </h1>

        <p className="mt-4 text-slate-600">
          Please complete a free CV assessment first.
        </p>

        <Link
          href="/cv-checker"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          Go to CV Checker
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <section className="mx-auto mb-8 max-w-6xl rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          Premium Aviation Career Report
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          Your Full Aviation Career Assessment
        </h1>

        <p className="mt-2 max-w-3xl text-slate-600">
          Review your personalised aviation career report below, then continue
          with the recommended tools to improve your applications and prepare
          for your next opportunity.
        </p>
      </section>

      <section className="overflow-x-auto">
        <PremiumAssessmentReport
          report={data.report}
          fullName={data.fullName}
          role={data.role}
        />
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Recommended next steps
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
            Continue your aviation career journey
          </h2>

          <p className="mt-2 text-slate-600">
            Use your report to build a stronger CV, prepare supporting
            documents and practise for aviation interviews.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recommendedNextSteps.map((step) => (
            <Link
              key={step.title}
              href={step.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <h3 className="text-lg font-bold text-slate-950">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {step.description}
              </p>

              <span className="mt-4 inline-flex text-sm font-bold text-blue-700">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}