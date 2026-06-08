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
You are a UK airport career coach.

Candidate situation:
Career stage: ${careerStatus}
Years of experience: ${yearsExperience}
Main experience area: ${experienceField}
Leadership experience: ${leadershipExperience}
Career goal: ${careerGoal}
Current or last job title: ${currentJobTitle}
Specific role of interest: ${targetRole || "Not specified"}
CV text:
${cvText || "No CV pasted."}

Candidate's own experience description:
${experienceDescription || "No description provided."}

Return ONLY valid JSON:
{
  "careerStage": "short label describing their current stage",
  "summary": "short personalised career guidance summary",
  "promotionReadiness": "Ready now / Nearly ready / Build experience first",
  "rolesToApplyNow": ["role 1", "role 2", "role 3"],
  "rolesToTargetLater": ["role 1", "role 2", "role 3"],
  "skillsToBuild": ["skill 1", "skill 2", "skill 3", "skill 4"],
  "cvPositioningAdvice": ["advice 1", "advice 2", "advice 3"],
  "nextSteps": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "confidenceLevel": "Low / Medium / High"
}

Rules:
- Use UK English.
- Focus on airport, airline, ground handling and airport operations careers.
- Be honest but encouraging.
- Do not invent qualifications, licences, security clearance or experience.
- If the user has 1-3 years of entry-level experience, suggest realistic next-step roles such as senior agent, team leader, supervisor trainee or coordinator where appropriate.
- If the user has no airport experience, suggest realistic entry-level airport roles.
- If the user has aviation or airport experience, advise how to move up.
- Assess promotion readiness honestly.
- Ready now means the candidate already demonstrates experience and leadership expected for the next level.
- Nearly ready means the candidate is close but should strengthen leadership, responsibility or specialist skills.
- Build experience first means the candidate should gain more experience before targeting promotion roles.
- Keep it practical and career-focused.
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