import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/Lib/usage";

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

    const usage = await checkAndIncrementUsage("cv-builder");

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: usage.message,
          usage,
        },
        { status: usage.status }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are an expert UK aviation CV writer.

Create a professional, ATS-friendly UK-style aviation CV draft by rewriting and structuring ONLY the candidate information below.
The CV must be suitable for aviation, airport, airline, cabin crew, pilot, aircraft engineering, ground handling, cargo, security or flight operations roles.

Important rules:
- Use UK CV style.
- Use ONLY the candidate information provided.
- Do NOT invent employers, job titles, dates, locations, licences, certificates, education, systems, tools, achievements, responsibilities or personal details.
- The "cvTitle" must be the candidate's full name only. Do not add the target role, "CV", "resume", or extra title wording.
- Do NOT add experience that the candidate did not provide.
- Do NOT add qualifications, aviation licences or training unless they appear in the candidate information.
- Do NOT create fake measurable achievements. Only use numbers or achievements if the candidate provided them.
- If information is missing, return an empty string or an empty array for that section.
- Do not use placeholders such as "Not provided", "N/A", "Your details here" or made-up examples.
- You may improve wording, grammar, structure and professionalism, but you must not add new facts.
- Use aviation keywords only when they are supported by the candidate's selected role, selected skills, selected licences, selected systems, job advert or written experience.
- Do not include photo, date of birth, gender, marital status, religion, passport number, National Insurance number or full home address.
- Use clear ATS-friendly headings.
- Avoid tables, columns, graphics, icons and complex formatting.
- Keep the tone professional, confident and realistic.
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

    return NextResponse.json({ cv, usage });
    } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown CV builder error";

    console.error("CV builder error:", message);

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}