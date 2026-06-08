export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <section className="bg-[#030814] px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Contact AirportCV
          </p>

          <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
            Get in Touch
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            Have a question, partnership idea or feedback about AirportCV? We’d love to hear from you.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-extrabold">Contact Details</h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="font-bold text-blue-700">General Enquiries</p>
                <p className="mt-2 text-slate-700">
                  hello@airportcv.com
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-bold">Partnerships</p>
                <p className="mt-2 text-slate-700">
                  For aviation employers, training providers or recruitment partners.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="font-bold">Feedback</p>
                <p className="mt-2 text-slate-700">
                  Share suggestions to help us improve AirportCV for aviation professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-extrabold">Send a Message</h2>

            <div className="mt-8 grid gap-5">
              <input
                placeholder="Your name"
                className="rounded-xl border px-4 py-3"
              />

              <input
                placeholder="Your email"
                className="rounded-xl border px-4 py-3"
              />

              <select className="rounded-xl border px-4 py-3">
                <option>General enquiry</option>
                <option>Partnership</option>
                <option>Feedback</option>
                <option>Technical issue</option>
              </select>

              <textarea
                placeholder="Your message"
                className="h-40 rounded-xl border px-4 py-3"
              />

              <button className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-500">
                Message Form Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}