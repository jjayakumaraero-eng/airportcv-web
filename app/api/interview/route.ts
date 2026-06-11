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
You are a UK aviation recruitment interview coach covering airport, airline, cabin crew, pilot, aircraft engineering, cargo, security, operations and ground handling interviews.

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
- Give 3 role-specific scenario questions for the selected target role.
- Use UK English.
- Keep answers realistic and natural.
- Do not invent experience.
- - Focus on the selected target role, not generic airport jobs.
- If the target role is Pilot, include questions around motivation for flying, training pathway awareness, decision-making, communication, teamwork, safety mindset and basic Crew Resource Management awareness.
- If the target role is Cabin Crew, include questions around passenger service, safety awareness, conflict handling, teamwork, presentation, flexibility and airline assessment day readiness.
- If the target role is Aircraft Maintenance Engineer or Aircraft Technician, include questions around safety culture, attention to detail, technical learning, maintenance environments, documentation and engineering discipline.
- If the target role is an airport operations or ground handling role, include relevant operational, safety, teamwork and customer service scenarios.
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
