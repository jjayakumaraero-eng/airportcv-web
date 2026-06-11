import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

function extractPdfText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(errData.parserError || errData);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      for (const page of pdfData.Pages) {
        for (const textItem of page.Texts) {
          for (const run of textItem.R) {
            text += decodeURIComponent(run.T) + " ";
          }
        }
        text += "\n";
      }

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

function extractJson(text: string) {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in AI response");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const role = formData.get("role") as string;
    const cvTextInput = formData.get("cvText") as string;
    const jobDescription = formData.get("jobDescription") as string;
    const file = formData.get("file") as File | null;

    let cvText = cvTextInput || "";

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (file.name.toLowerCase().endsWith(".pdf")) {
        cvText = await extractPdfText(buffer);
      }

      if (file.name.toLowerCase().endsWith(".docx")) {
        const docx = await mammoth.extractRawText({ buffer });
        cvText = docx.value;
      }
    }

    if (!role || !cvText.trim()) {
      return NextResponse.json(
        { error: "Please upload or paste your CV." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are a UK airport CV adviser.

Target role: ${role}

CV:
${cvText}

Job Description:
${jobDescription || "No job description provided."}

Return only valid JSON. No markdown.

Use exactly this structure:
{
  "freeReport": {
    "score": 70,
    "summary": "One short realistic summary.",
    "topPriorityFix": "One practical priority fix only.",
    "topRoleMatch": {
      "role": "Passenger Service Agent",
      "match": 85
    }
  },
  "premiumPreview": {
    "missingKeywordCount": 12,
    "missingSkillCount": 5,
    "atsIssueCount": 4,
    "additionalRoleCount": 6,
    "recruiterConcernCount": 4
  },
  "premiumReport": {
    "jobMatch": {
      "score": 80,
      "missingKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
      "missingSkills": ["skill 1", "skill 2", "skill 3", "skill 4"],
      "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
    },
    "bestMatches": [
      { "role": "Passenger Service Agent", "match": 90 },
      { "role": "Lounge Agent", "match": 82 },
      { "role": "Ground Operations Agent", "match": 75 }
    ],
    "atsAnalysis": {
      "score": 78,
      "summary": "Short ATS-style summary.",
      "issues": ["issue 1", "issue 2", "issue 3"]
    },
    "salaryInsight": {
      "estimatedRange": "£25,000 - £41,000",
      "summary": "Short salary insight based on the role and experience."
    },
    "careerRoadmap": [
      "Month 1 action",
      "Month 2 action",
      "Month 3 action"
    ],
    "recruiterFeedback": [
      "feedback 1",
      "feedback 2",
      "feedback 3"
    ],
    "fullCv": {
      "profile": "Professional airport CV profile under 70 words.",
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5", "skill 6"],
      "employmentHistory": [
        {
          "jobTitle": "Job title from CV",
          "company": "Company from CV",
          "dates": "Dates from CV",
          "bullets": ["Rewritten bullet 1", "Rewritten bullet 2", "Rewritten bullet 3"]
        }
      ],
      "additionalInfo": ["Right to Work - add only if supported by CV", "Shift flexibility - add only if supported by CV"]
    }
  }
}

Rules:
- The freeReport must give useful value but must not reveal the full analysis.
- freeReport must include only: score, short summary, one top priority fix, and one top role match.
- Do not include missing keywords, missing skills, all recommendations, salary insights, career roadmap or rewritten CV in freeReport.
- premiumPreview should create curiosity using counts only, not full details.
- premiumReport contains the full detailed analysis for future paid unlock.
- If no job description is provided, compare the CV against typical UK airport role expectations.
- If a job description is provided, compare the CV against that job description.
- Do not invent jobs, employers, dates, licences, security clearance or qualifications.
- Keep all real employment roles from the CV.
- Keep original job title, company and dates where possible.
- Use natural UK English.
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const parsed = extractJson(rawText);

    return NextResponse.json({
      score: parsed.freeReport.score,
      summary: parsed.freeReport.summary,
      fixes: [parsed.freeReport.topPriorityFix],
      bestMatches: [parsed.freeReport.topRoleMatch],
      premiumPreview: parsed.premiumPreview,
      premiumReport: parsed.premiumReport,
    });
  } catch (error) {
  console.error("AIRPORTCV API ERROR FULL:", error);

  const message =
    error instanceof Error ? error.message : String(error);

  if (message.includes("429") || message.includes("quota")) {
    return NextResponse.json(
      {
        error:
          "AirportCV is currently processing a high number of assessments. Please try again shortly.",
      },
      { status: 429 }
    );
  }

  return NextResponse.json(
    {
      error:
        "AirportCV AI is busy right now. Please try again in a minute.",
    },
    { status: 500 }
  );
}
}