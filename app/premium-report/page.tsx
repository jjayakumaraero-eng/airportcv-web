"use client";

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import PremiumAssessmentReport from "@/components/PremiumAssessmentReport";

type StoredReport = {
  report: any;
  fullName: string;
  role: string;
};

export default function PremiumReportPage() {
  const [data, setData] = useState<StoredReport | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("airportcvPremiumReport");

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  async function downloadAssessmentReportPdf() {
    try {
      const element = document.getElementById("premium-report-pdf");

      if (!element) {
        alert("Report is not ready yet.");
        return;
      }

      const imgData = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("airportcv-assessment-report.pdf");
    } catch (error) {
      console.error("PDF DOWNLOAD ERROR:", error);
      alert(
        `PDF ERROR: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-slate-950">
          No report found
        </h1>

        <p className="mt-4 text-slate-600">
          Please complete a free CV assessment first.
        </p>

        <a
          href="/cv-checker"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
        >
          Go to CV Checker
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Premium Airport Career Report
          </p>

          <h1 className="mt-2 text-3xl font-extrabold">
            Your Full Aviation Career Assessment
          </h1>

          <p className="mt-2 text-slate-600">
            Review your full report below and download your professional PDF copy.
          </p>
        </div>

        <button
          onClick={downloadAssessmentReportPdf}
          className="rounded-xl bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
        >
          Download PDF Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <PremiumAssessmentReport
          report={data.report}
          fullName={data.fullName}
          role={data.role}
        />
      </div>
    </main>
  );
}