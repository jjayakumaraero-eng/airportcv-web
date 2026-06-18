"use client";

import { useState } from "react";

type Props = {
  onTextExtracted: (text: string) => void;
};

export default function CvUpload({ onTextExtracted }: Props) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);
    setError("");
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/extract-cv", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Could not extract CV text.");
      setLoading(false);
      return;
    }

    onTextExtracted(data.text || "");
    setLoading(false);
  }

  return (
    <div>
      <label className="block text-sm font-semibold">
        Upload CV (Optional)
      </label>

      <input
        type="file"
        accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        className="mt-2 block w-full rounded-xl border p-3"
      />

      {fileName && (
        <p className="mt-2 text-xs text-slate-500">
          Selected: {fileName}
        </p>
      )}

      {loading && (
        <p className="mt-2 text-xs font-semibold text-blue-600">
          Extracting CV text...
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}