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
    const { role, cvText, profile, skills } = await request.json();

    if (!role) {
      return NextResponse.json(
        { error: "Role is required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are a UK airport recruitment interview coach.

Target role:
${role}

Candidate CV text:
${cvText || ""}

Improved profile:
${profile || ""}

Skills:
${(skills || []).join(", ")}

Return ONLY valid JSON:
{
  "questions": [
    {
      "question": "interview question",
      "answer": "short realistic model answer using the candidate's experience where possible"
    }
  ],
  "scenarioQuestions": [
    {
      "question": "airport scenario question",
      "answer": "short practical answer"
    }
  ],
  "whatToMention": ["point 1", "point 2", "point 3"],
  "commonMistakes": ["mistake 1", "mistake 2", "mistake 3"]
}

Rules:
- Give 6 normal interview questions.
- Give 3 airport scenario questions.
- Use UK English.
- Keep answers realistic and natural.
- Do not invent experience.
- Focus only on UK airport jobs.
`;

    const result = await model.generateContent(prompt);
    const parsed = extractJson(result.response.text());

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("INTERVIEW API ERROR:", error);
    return NextResponse.json(
      { error: "Interview AI is busy right now. Please try again in a minute." },
      { status: 500 }
    );
  }
}
