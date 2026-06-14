import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";

type SuggestionType =
  | "profile"
  | "skills"
  | "responsibilities"
  | "achievements"
  | "training"
  | "finalDetails";

type RequestBody = {
  suggestionType: SuggestionType;
  formData?: any;
  context?: {
    jobTitle?: string;
    companyName?: string;
    responsibilities?: string;
    achievements?: string;
  };
};

function buildPrompt(body: RequestBody) {
  const { suggestionType, formData, context } = body;

  const commonRules = `
You are an aviation CV writing assistant for AirportCV.

Rules:
- Do not invent employers, dates, licences, qualifications, metrics, job titles, or personal details.
- Only suggest wording the user can review, edit, and choose.
- Keep the wording professional, UK-style, ATS-friendly, and aviation-focused.
- Avoid placeholders unless absolutely necessary.
- Return JSON only.
- JSON format must be: { "suggestions": ["...", "...", "..."] }
`;

  const candidateContext = `
Candidate context:
Career stage: ${formData?.careerStage || "Not provided"}
Job advert or keywords: ${formData?.jobDescription || "Not provided"}
Existing profile notes: ${formData?.profile || "Not provided"}
Selected skills: ${(formData?.selectedSkills || []).join(", ") || "Not provided"}
Other skills: ${formData?.otherSkills || "Not provided"}
`;

  if (suggestionType === "profile") {
    return `
${commonRules}

Task:
Create 3 different professional profile summary options for an aviation CV.

Each suggestion should:
- Be 3 to 4 sentences.
- Sound professional and natural.
- Be suitable for airport, airline, or aviation roles.
- Use only the provided candidate context.
- Avoid claiming years of experience unless the user provided it.

${candidateContext}
`;
  }

  if (suggestionType === "responsibilities") {
    return `
${commonRules}

Task:
Create 8 CV responsibility bullet suggestions for this work experience.

Work experience context:
Job title: ${context?.jobTitle || "Not provided"}
Company name: ${context?.companyName || "Not provided"}
Existing responsibilities: ${context?.responsibilities || "Not provided"}

Each suggestion should:
- Be one concise CV bullet.
- Be realistic for the job title.
- Avoid fake numbers or achievements.
- Focus on duties, safety, customer service, operations, teamwork, documentation, compliance, or aviation procedures where relevant.

${candidateContext}
`;
  }

  if (suggestionType === "achievements") {
    return `
${commonRules}

Task:
Create 6 achievement-style CV bullet suggestions for this work experience.

Work experience context:
Job title: ${context?.jobTitle || "Not provided"}
Company name: ${context?.companyName || "Not provided"}
Existing achievements: ${context?.achievements || "Not provided"}

Each suggestion should:
- Be one concise CV bullet.
- Avoid fake numbers, awards, or outcomes.
- Suggest truthful achievement-style wording the user can adapt.
- Focus on service quality, reliability, teamwork, problem solving, safety, accuracy, or operational support.

${candidateContext}
`;
  }

  if (suggestionType === "skills") {
    return `
${commonRules}

Task:
Suggest 12 relevant aviation CV skills based on the candidate context.

Each suggestion should:
- Be a short skill phrase.
- Be relevant to the career stage and job advert/keywords.
- Avoid licences or qualifications unless the user already provided them.

${candidateContext}
`;
  }

  if (suggestionType === "training") {
    return `
${commonRules}

Task:
Suggest 8 ways the user can phrase their training, licences, systems, or certifications on a CV.

Only use details already provided by the user.

Candidate training context:
Licences: ${(formData?.selectedLicences || []).join(", ") || "Not provided"}
Other licences: ${formData?.otherLicences || "Not provided"}
Certifications: ${(formData?.selectedCertifications || []).join(", ") || "Not provided"}
Other certifications: ${formData?.otherCertifications || "Not provided"}
Systems: ${(formData?.selectedSystems || []).join(", ") || "Not provided"}
Other systems: ${formData?.otherSystems || "Not provided"}

${candidateContext}
`;
  }

  return `
${commonRules}

Task:
Suggest 6 useful final CV detail ideas the user may choose to include.

Only suggest items based on information already provided by the user.

Candidate final details:
Languages: ${formData?.languages || "Not provided"}
Right to work: ${formData?.rightToWork || "Not provided"}
Driving licence: ${formData?.drivingLicence || "Not provided"}
Availability: ${formData?.availability || "Not provided"}
Additional information: ${formData?.additionalInfo || "Not provided"}
References: ${formData?.references || "Not provided"}

${candidateContext}
`;
}

export async function POST(request: Request) {
  try {
    const usage = await checkAndIncrementUsage("cv-suggestions");

    if (!usage.allowed) {
      return NextResponse.json(
        { error: usage.message || "Usage limit reached.", usage },
        { status: usage.status }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as RequestBody;

    if (!body.suggestionType) {
      return NextResponse.json(
        { error: "Missing suggestion type." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = buildPrompt(body);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    if (!Array.isArray(parsed.suggestions)) {
      throw new Error("Invalid suggestions response.");
    }

    return NextResponse.json({
      suggestions: parsed.suggestions,
      usage,
    });
  } catch (error) {
  console.error("CV suggestions error:", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "We could not generate suggestions right now. Please try again shortly.",
    },
    { status: 500 }
  );
}
}