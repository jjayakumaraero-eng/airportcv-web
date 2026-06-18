import { NextResponse } from "next/server";
import mammoth from "mammoth";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";

    if (fileName.endsWith(".pdf")) {
      const result = await pdfParse(buffer);
      text = result.text || "";
    } else if (fileName.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value || "";
    } else if (fileName.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Please upload a PDF, DOCX or TXT file." },
        { status: 400 }
      );
    }

    const cleanedText = text
      .replace(/\u0000/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{4,}/g, "\n\n\n")
      .trim();

    if (!cleanedText) {
      return NextResponse.json(
        {
          error:
            "We could not read text from this CV. If it is a scanned PDF, please upload a text-based PDF, DOCX or TXT version.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ text: cleanedText });
  } catch (error) {
    console.error("CV EXTRACTION ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Unknown extraction error";

    return NextResponse.json(
      { error: `Could not extract text from this CV. ${message}` },
      { status: 500 }
    );
  }
}
