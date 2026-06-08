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
    const {
  careerStatus,
  yearsExperience,
  experienceField,
  leadershipExperience,
  careerGoal,
  currentJobTitle,
  targetRole,
  cvText,
  experienceDescription,
} = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `
You are a professional airline cabin crew recruitment specialist.

Candidate information:

Career stage: ${careerStatus}
Years of experience: ${yearsExperience}
Main experience area: ${experienceField}
Leadership experience: ${leadershipExperience}
Current or last job title: ${currentJobTitle}
Preferred airline: ${targetRole || "Not specified"}

CV text:
${cvText || "No CV provided."}

Additional information:
${experienceDescription || "No additional information provided."}

Return ONLY valid JSON:

{
  "careerStage": "Cabin Crew Ready / Nearly Ready / Needs Development",
  "summary": "short personalised assessment",
  "promotionReadiness": "Strong Candidate / Competitive Candidate / Needs Improvement",
  "rolesToApplyNow": ["role 1", "role 2", "role 3"],
  "rolesToTargetLater": ["role 1", "role 2", "role 3"],
  "skillsToBuild": ["skill 1", "skill 2", "skill 3", "skill 4"],
  "cvPositioningAdvice": ["advice 1", "advice 2", "advice 3"],
  "nextSteps": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "confidenceLevel": "Low / Medium / High"
}

Rules:
- Use UK English.
- Assess suitability for cabin crew positions.
- Focus on customer service, communication, teamwork, safety awareness, professionalism, adaptability and cultural awareness.
- Hospitality, retail, customer service, tourism and airport experience are valuable.
- Do not invent qualifications or experience.
- Be honest but encouraging.
- Suggest realistic improvements for airline recruitment.
- Tailor advice towards airlines such as British Airways, Emirates, Qatar Airways, Virgin Atlantic, easyJet and Ryanair where appropriate.
- Keep recommendations practical and recruitment-focused.
`;

    const result = await model.generateContent(prompt);
    const parsed = extractJson(result.response.text());

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("CAREER COACH API ERROR:", error);

    return NextResponse.json(
      { error: "Career coaching failed. Please try again." },
      { status: 500 }
    );
  }
}