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
    const { role, fullName, cvText, profile, skills } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are a UK airport recruitment cover letter writer.

Target role:
${role}

Candidate name:
${fullName || "the candidate"}

CV text:
${cvText || ""}

Improved profile:
${profile || ""}

Skills:
${(skills || []).join(", ")}

Return ONLY valid JSON:
{
  "coverLetter": "complete professional cover letter"
}

Rules:
- Use UK English.
- Do not invent experience, employers, licences or qualifications.
- Keep it realistic and human.
- Make it suitable for UK airport jobs.
- Keep it under 350 words.
- Use a professional cover letter structure.
- Start with Dear Hiring Manager.
- End with Kind regards.
`;

    const result = await model.generateContent(prompt);
    const parsed = extractJson(result.response.text());

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("COVER LETTER API ERROR:", error);

    return NextResponse.json(
      { error: "Cover letter generation failed. Please try again." },
      { status: 500 }
    );
  }
}