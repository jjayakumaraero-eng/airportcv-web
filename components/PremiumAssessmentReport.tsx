"use client";

type Props = {
  report: any;
  fullName: string;
  role: string;
};

export default function PremiumAssessmentReport({
  report,
  fullName,
  role,
}: Props) {
  if (!report?.premiumReport) return null;

  const scoreLabel =
    report.score >= 80
      ? "EXCELLENT"
      : report.score >= 70
      ? "GOOD"
      : "NEEDS IMPROVEMENT";

  return (
    <div
      id="premium-report-pdf"
      className="mx-auto w-[1000px] bg-white p-8 text-slate-900"
    >
      <div className="flex items-center justify-between border-b-2 border-blue-600 pb-6">
        <img
          src="/airportcv-logo-cropped.png"
          alt="AirportCV"
          className="h-14 w-auto"
        />

        <div className="text-right">
          <h1 className="text-5xl font-extrabold text-slate-950">
            AVIATION CAREER
          </h1>
          <h2 className="text-5xl font-extrabold text-blue-600">
            ASSESSMENT REPORT
          </h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {[
          ["Candidate", fullName || "Candidate"],
          ["Target Role", role],
          ["Assessment Date", new Date().toLocaleDateString("en-GB")],
          ["Report", "AirportCV"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-lg font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-[#030814] p-8 text-white">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
              Airport Readiness Score
            </p>
            <div className="mt-3 text-7xl font-extrabold">
              {report.score}
              <span className="text-4xl">/100</span>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <div className="text-4xl font-extrabold text-green-600">
                {scoreLabel}
              </div>
              <p className="mt-4 text-xl leading-8 text-slate-200">
                {report.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <ReportCard title="ATS Analysis">
          <p className="text-5xl font-extrabold text-blue-700">
            {report.premiumReport.atsAnalysis?.score || report.score}
            <span className="text-2xl text-slate-700">/100</span>
          </p>
          <p className="mt-3 text-lg leading-6 text-slate-700">
            {report.premiumReport.atsAnalysis?.summary ||
              "Your CV has been assessed against airport recruitment expectations and ATS visibility factors."}
          </p>
        </ReportCard>

        <ReportCard title="Missing Keywords">
          <div className="flex flex-wrap gap-3">
            {report.premiumReport.jobMatch?.missingKeywords
              ?.slice(0, 6)
              .map((item: string) => (
                <span
                  key={item}
                  className="rounded-full bg-blue-50 px-5 py-3 text-base font-bold text-blue-700"
                >
                  {item}
                </span>
              ))}
          </div>
        </ReportCard>

        <ReportCard title="Missing Skills">
          <div className="space-y-3">
            {report.premiumReport.jobMatch?.missingSkills
              ?.slice(0, 5)
              .map((item: string) => (
                <div key={item} className="flex items-center gap-3 text-lg">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
          </div>
        </ReportCard>

        <ReportCard title="Recruiter Review">
          <div className="space-y-3">
            {report.premiumReport.recruiterFeedback
              ?.slice(0, 3)
              .map((item: string, index: number) => (
                <div key={item} className="flex gap-3 text-base leading-5">
                  <span className="font-extrabold text-red-500">
                    {index + 1}.
                  </span>
                  <span>{item}</span>
                </div>
              ))}
          </div>
        </ReportCard>
      </div>

      <div className="mt-4 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="rounded-t-3xl bg-blue-700 px-6 py-3 text-lg font-extrabold text-white">
          Airport Career Match
        </div>

        <div className="grid grid-cols-3 gap-6 p-6">
          {report.premiumReport.bestMatches
            ?.slice(0, 3)
            .map((match: any) => (
              <div key={match.role}>
                <p className="text-xl font-extrabold">{match.role}</p>
                <p className="mt-2 text-4xl font-extrabold text-blue-700">
                  {match.match}%
                </p>
                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{ width: `${match.match}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <ReportCard title="Priority Action Plan">
          <div className="space-y-3">
            {report.premiumReport.careerRoadmap
              ?.slice(0, 4)
              .map((item: string, index: number) => (
                <div key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-700 font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-base leading-5">{item}</p>
                </div>
              ))}
          </div>
        </ReportCard>

        <ReportCard title="Recommended Next Steps">
          <div className="space-y-5">
            <div>
              <p className="text-lg font-extrabold text-emerald-600">
                Interview Preparation
              </p>
              <p className="text-slate-600">
                Practice airport interview questions.
              </p>
            </div>

            <div>
              <p className="text-lg font-extrabold text-blue-600">
                Cover Letter Generator
              </p>
              <p className="text-slate-600">
                Create tailored airport cover letters.
              </p>
            </div>

            <div>
              <p className="text-lg font-extrabold text-slate-600">
                Reassess My CV
              </p>
              <p className="text-slate-600">
                Upload your improved CV again.
              </p>
            </div>
          </div>
        </ReportCard>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-950 p-5 text-white">
        <p className="text-xs leading-5">
          Important Notice: This assessment is generated using AI-assisted
          analysis of information provided by the candidate. AirportCV does not
          guarantee interviews, employment offers, salary outcomes, security
          clearance approval or recruitment decisions. This report is intended
          for career guidance purposes only and should not be considered legal,
          immigration, employment or financial advice.
        </p>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="rounded-t-3xl bg-blue-700 px-6 py-3 text-lg font-extrabold text-white">
        {title}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}