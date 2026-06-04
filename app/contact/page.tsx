export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold">Contact</h1>

        <p className="mt-6 text-slate-600">
          We'd love to hear your feedback about AirportCV.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-6">
          <p className="font-semibold">Email</p>
          <p className="mt-2 text-slate-600">
            hello@airportcv.co.uk
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-6">
          <p className="font-semibold">Purpose</p>
          <p className="mt-2 text-slate-600">
            Product feedback, bug reports, feature requests and partnership enquiries.
          </p>
        </div>
      </div>
    </main>
  );
}