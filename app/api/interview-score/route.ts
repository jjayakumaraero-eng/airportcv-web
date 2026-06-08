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
    const { role, question, answer } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are an airport recruitment interview coach.

Role:
${role}

Interview question:
${question}

Candidate answer:
${answer}

Score this answer like a realistic UK airport recruiter.

Return ONLY valid JSON:
{
  "score": 7,
  "summary": "short overall feedback",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "betterAnswer": "A stronger model answer in natural UK English."
}

Rules:
- Score out of 10.
- Be honest but encouraging.
- Focus on airport customer service, safety, teamwork, communication, reliability and role suitability.
- If the answer lacks examples, mention using STAR method.
- Do not be overly harsh.
- Use natural UK English.
`;

    const result = await model.generateContent(prompt);
    const parsed = extractJson(result.response.text());

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("INTERVIEW SCORE API ERROR:", error);

    return NextResponse.json(
      { error: "Interview answer scoring failed. Please try again." },
      { status: 500 }
    );
  }
}