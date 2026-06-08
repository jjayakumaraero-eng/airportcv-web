"use client";

type Props = {
  onTextExtracted: (text: string) => void;
};

export default function CvUpload({ onTextExtracted }: Props) {
  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const text = await file.text();

    onTextExtracted(text);
  }

  return (
    <div>
      <label className="block text-sm font-semibold">
        Upload CV Optional
      </label>

      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mt-2 block w-full rounded-xl border p-3"
      />

      <p className="mt-2 text-xs text-slate-500">
        For now, plain text CV files work best. PDF and Word extraction can be improved next.
      </p>
    </div>
  );
}