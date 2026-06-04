export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>

        <p className="mt-6 text-slate-600">
          AirportCV provides AI-generated CV guidance for UK airport job seekers.
          The service is intended as a support tool and does not guarantee job interviews,
          employment or recruitment outcomes.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Use of Advice</h2>
        <p className="mt-3 text-slate-600">
          Users should review and edit all generated CV content before using it
          in real job applications.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Accuracy</h2>
        <p className="mt-3 text-slate-600">
          AirportCV may make mistakes. Do not include false experience,
          qualifications, licences or Right to Work information.
        </p>
      </div>
    </main>
  );
}