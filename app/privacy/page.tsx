export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="mt-6 text-slate-600">
          AirportCV helps users review and improve CVs for UK airport jobs.
          Users may upload or paste CV content to receive AI-generated feedback.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Information We Process</h2>
        <p className="mt-3 text-slate-600">
          We process the CV text, selected target role and optional contact
          details entered by the user for the purpose of generating CV feedback.
        </p>

        <h2 className="mt-8 text-2xl font-bold">CV Data</h2>
        <p className="mt-3 text-slate-600">
          Do not upload sensitive personal information unless necessary. AirportCV
          is currently a prototype and should be used for testing purposes.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Contact</h2>
        <p className="mt-3 text-slate-600">
          For questions about privacy, please contact the AirportCV owner.
        </p>
      </div>
    </main>
  );
}