import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

function extractJson(text: string) {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON found");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are an expert UK aviation CV writer.

Create a professional, ATS-friendly UK-style aviation CV draft using the candidate information below.

The CV must be suitable for aviation, airport, airline, cabin crew, pilot, aircraft engineering, ground handling, cargo, security or flight operations roles.

Important rules:
- Use UK CV style.
- Do not include photo, date of birth, gender, marital status, religion, passport number, National Insurance number or full home address.
- Use clear ATS-friendly headings.
- Avoid tables, columns, graphics, icons and complex formatting.
- Use aviation keywords naturally.
- Tailor the CV to the target role.
- Keep the tone professional, confident and realistic.
- Do not invent licences, employers, degrees or certifications.
- If information is missing, write a sensible placeholder or omit that detail.
- Make work experience bullet points achievement-focused where possible.
- Use British English spelling.

Return ONLY valid JSON in this exact structure:
{
  "cvTitle": "string",
  "professionalProfile": "string",
  "keySkills": ["string"],
  "workExperience": [
    {
      "jobTitle": "string",
      "companyName": "string",
      "location": "string",
      "dates": "string",
      "bullets": ["string"]
    }
  ],
  "education": [
    {
      "qualification": "string",
      "institution": "string",
      "location": "string",
      "date": "string",
      "details": "string"
    }
  ],
  "licencesAndTraining": ["string"],
  "systemsAndTools": ["string"],
  "additionalInformation": ["string"],
  "references": "string"
}

Candidate information:
${JSON.stringify(formData, null, 2)}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cv = extractJson(text);

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("CV builder error:", error);

    return NextResponse.json(
      {
        error:
          "We could not generate your CV right now. Please check your details and try again shortly.",
      },
      { status: 500 }
    );
  }
}