import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

function extractPdfText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));

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

Return only valid JSON. No markdown.

Use exactly this structure:
{
  "score": 80,
  "summary": "One short realistic summary.",
  "fixes": ["Fix 1", "Fix 2", "Fix 3"],
  "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5", "keyword 6"],
  "bestMatches": [
    { "role": "Passenger Service Agent", "match": 90 },
    { "role": "Lounge Agent", "match": 82 },
    { "role": "Ground Operations Agent", "match": 75 }
  ],
  "fullCv": {
    "profile": "Professional airport CV profile under 70 words.",
    "skills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5", "skill 6", "skill 7", "skill 8"],
    "employmentHistory": [
      {
        "jobTitle": "Job title from CV",
        "company": "Company from CV",
        "dates": "Dates from CV",
        "bullets": ["Rewritten bullet 1", "Rewritten bullet 2", "Rewritten bullet 3"]
      }
    ],
    "additionalInfo": ["Right to Work - add if true", "Shift flexibility - add if true", "References available on request"]
  }
}

Rules:
- Keep all real employment roles from the CV.
- Keep original job title, company and dates where possible.
- Rewrite bullet points to suit the selected airport role.
- Do not invent jobs, employers, dates, licences or qualifications.
- Use natural UK English.
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const parsed = extractJson(rawText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AIRPORTCV API ERROR FULL:", error);
    console.error("AIRPORTCV API ERROR MESSAGE:", error instanceof Error ? error.message : String(error));

    return NextResponse.json(
      { error: "AirportCV AI is busy right now. Please try again in a minute." },
      { status: 500 }
    );
  }
}
