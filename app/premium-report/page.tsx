"use client";

import Image from "next/image";
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

            <Link
              href="/cv-checker"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Go to CV Checker
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-24">
          <div className="absolute left-1/2 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-blue-700">
              Premium Aviation Career Report
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              No report found
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Please complete a free CV assessment first. Your full aviation
              career report is created from your CV checker result.
            </p>

            <Link
              href="/cv-checker"
              className="mt-8 inline-flex rounded-2xl bg-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Start CV Checker
            </Link>
          </div>
        </section>
      </main>
    );
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
            <Link href="/cv-checker" className="hover:text-blue-700">
              CV Checker
            </Link>
            <Link href="/cv-builder" className="hover:text-blue-700">
              CV Builder
            </Link>
            <Link href="/interview-prep" className="hover:text-blue-700">
              Interview Prep
            </Link>
            <Link href="/cover-letter" className="hover:text-blue-700">
              Cover Letter
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
            Premium Aviation Career Report
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Your full aviation career assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Review your personalised aviation career report, then continue with
            recommended AirportCV tools to improve your applications and prepare
            for your next opportunity.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-blue-50 p-5 ring-1 ring-blue-100">
              <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                Candidate
              </p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {data.fullName || "Candidate"}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">
                Target role
              </p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {data.role}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-xs font-extrabold uppercase tracking-wide text-blue-200">
                Airport readiness
              </p>
              <p className="mt-2 text-lg font-black">
                {data.report?.score ? `${data.report.score}/100` : "Generated"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-x-auto px-6">
        <div className="mx-auto max-w-6xl">
          <PremiumAssessmentReport
            report={data.report}
            fullName={data.fullName}
            role={data.role}
          />
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Recommended next steps
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Continue your aviation career journey
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Use your report to build a stronger CV, prepare supporting
              documents and practise for aviation interviews.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recommendedNextSteps.map((step) => (
              <Link
                key={step.title}
                href={step.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>

                <span className="mt-4 inline-flex text-sm font-extrabold text-blue-700">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
