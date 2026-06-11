"use client";

import Link from "next/link";
import { useState } from "react";

const aviationRoles = [
  "Passenger Service Agent",
  "Check-in Agent",
  "Boarding Gate Agent",
  "Lounge Agent",
  "Ramp Agent",
  "Baggage Handler",
  "Airport Security Officer",
  "Flight Dispatcher",
  "Load Controller",
  "Cabin Crew",
  "Pilot",
  "Aircraft Maintenance Engineer",
  "Aircraft Technician",
  "Cargo Agent",
  "Airport Operations Officer",
  "Airport Duty Manager",
  "Other Airport / Airline Role",
];

const initialFormData = {
  fullName: "",
  targetRole: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  websiteUrl: "",
  rightToWork: "",
  drivingLicence: "",
  availability: "",
  careerStage: "",
  jobDescription: "",
  profile: "",
  keySkills: "",
  technicalSkills: "",
  languages: "",
  experience: "",
  achievements: "",
  education: "",
  licences: "",
  certifications: "",
  systems: "",
  additionalInfo: "",
  references: "",
};

export default function CVBuilderForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [previewStarted, setPreviewStarted] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewStarted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
            AirportCV Tool
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Aviation CV Builder
          </h1>

          <p className="max-w-3xl text-lg text-slate-700">
            Create a structured aviation CV for your target airport, airline,
            pilot, cabin crew, engineering or operations role. Start with your
            core details and build the CV step by step.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Basic details
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                These details will form the top section of your aviation CV.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jay Kumar"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="targetRole"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Target aviation role
                </label>
                <select
                  id="targetRole"
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {aviationRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 7000 000000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. London, UK"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
<div>
  <label
    htmlFor="linkedinUrl"
    className="mb-2 block text-sm font-medium text-slate-800"
  >
    LinkedIn URL
  </label>
  <input
    id="linkedinUrl"
    name="linkedinUrl"
    type="url"
    value={formData.linkedinUrl}
    onChange={handleChange}
    placeholder="https://www.linkedin.com/in/your-name"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
</div>

<div>
  <label
    htmlFor="websiteUrl"
    className="mb-2 block text-sm font-medium text-slate-800"
  >
    Portfolio or personal website
  </label>
  <input
    id="websiteUrl"
    name="websiteUrl"
    type="url"
    value={formData.websiteUrl}
    onChange={handleChange}
    placeholder="https://yourwebsite.com"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
</div>

<div>
  <label
    htmlFor="rightToWork"
    className="mb-2 block text-sm font-medium text-slate-800"
  >
    Right to work
  </label>
  <input
    id="rightToWork"
    name="rightToWork"
    type="text"
    value={formData.rightToWork}
    onChange={handleChange}
    placeholder="e.g. Right to work in the UK"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
</div>

<div>
  <label
    htmlFor="drivingLicence"
    className="mb-2 block text-sm font-medium text-slate-800"
  >
    Driving licence
  </label>
  <input
    id="drivingLicence"
    name="drivingLicence"
    type="text"
    value={formData.drivingLicence}
    onChange={handleChange}
    placeholder="e.g. Full UK driving licence"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
</div>

<div>
  <label
    htmlFor="availability"
    className="mb-2 block text-sm font-medium text-slate-800"
  >
    Availability / notice period
  </label>
  <input
    id="availability"
    name="availability"
    type="text"
    value={formData.availability}
    onChange={handleChange}
    placeholder="e.g. Immediately available / 4 weeks notice"
    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
</div>

              <div>
                <label
                  htmlFor="careerStage"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Career stage
                </label>
                <select
                  id="careerStage"
                  name="careerStage"
                  value={formData.careerStage}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="" disabled>
                    Select career stage
                  </option>
                  <option value="Student / graduate">Student / graduate</option>
                  <option value="Entry level">Entry level</option>
                  <option value="Experienced aviation professional">
                    Experienced aviation professional
                  </option>
                  <option value="Career changer">Career changer</option>
                  <option value="Returning to aviation">
                    Returning to aviation
                  </option>
                </select>
              </div>
            </div>

<div className="mt-8 border-t border-slate-200 pt-8">
  <h2 className="text-2xl font-semibold text-slate-900">
    Targeting and ATS keywords
  </h2>
  <p className="mt-2 text-sm text-slate-600">
    Add the job advert or keywords so your CV can be tailored to the target aviation role.
  </p>

  <div className="mt-6">
    <label
      htmlFor="jobDescription"
      className="mb-2 block text-sm font-medium text-slate-800"
    >
      Target job description or advert keywords
    </label>
    <textarea
      id="jobDescription"
      name="jobDescription"
      rows={6}
      value={formData.jobDescription}
      onChange={handleChange}
      placeholder="Paste the job description or key requirements here, such as passenger service, safety, compliance, dispatch, aircraft maintenance, customer service, teamwork or operational control."
      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
</div>

            <div className="mt-8">
              <label
                htmlFor="profile"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                Professional profile
              </label>
              <textarea
                id="profile"
                name="profile"
                rows={5}
                value={formData.profile}
                onChange={handleChange}
                placeholder="Write a short summary of your aviation background, strengths and career goal."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

<div className="mt-8 border-t border-slate-200 pt-8">
  <h2 className="text-2xl font-semibold text-slate-900">
    Skills
  </h2>
  <p className="mt-2 text-sm text-slate-600">
    Add role-specific aviation, technical and language skills.
  </p>

  <div className="mt-6 space-y-6">
    <div>
      <label
        htmlFor="keySkills"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Key aviation skills
      </label>
      <textarea
        id="keySkills"
        name="keySkills"
        rows={4}
        value={formData.keySkills}
        onChange={handleChange}
        placeholder="e.g. Passenger handling, safety awareness, customer service, teamwork, communication, problem solving, attention to detail."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="technicalSkills"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Technical / operational skills
      </label>
      <textarea
        id="technicalSkills"
        name="technicalSkills"
        rows={4}
        value={formData.technicalSkills}
        onChange={handleChange}
        placeholder="e.g. Load control, flight planning, aircraft systems, GDS, departure control systems, maintenance documentation, turnaround coordination."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="languages"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Languages
      </label>
      <textarea
        id="languages"
        name="languages"
        rows={3}
        value={formData.languages}
        onChange={handleChange}
        placeholder="e.g. English fluent, Hindi fluent, Arabic conversational."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  </div>
</div>

<div className="mt-8 border-t border-slate-200 pt-8">
  <h2 className="text-2xl font-semibold text-slate-900">
    Experience and achievements
  </h2>
  <p className="mt-2 text-sm text-slate-600">
    Add your work history and measurable achievements. Include aviation experience or transferable experience.
  </p>

  <div className="mt-6 space-y-6">
    <div>
      <label
        htmlFor="experience"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Work experience
      </label>
      <textarea
        id="experience"
        name="experience"
        rows={7}
        value={formData.experience}
        onChange={handleChange}
        placeholder="Add role title, company, location, dates and responsibilities. Example: Passenger Service Agent, ABC Handling, Heathrow Airport, 2022–Present."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="achievements"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Key achievements
      </label>
      <textarea
        id="achievements"
        name="achievements"
        rows={5}
        value={formData.achievements}
        onChange={handleChange}
        placeholder="Add measurable achievements where possible. Example: Supported 150+ passengers per shift, improved boarding efficiency, maintained safety compliance."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  </div>
</div>

<div className="mt-8 border-t border-slate-200 pt-8">
  <h2 className="text-2xl font-semibold text-slate-900">
    Education, licences and training
  </h2>
  <p className="mt-2 text-sm text-slate-600">
    Add your education, aviation licences, certificates, safety training and systems knowledge.
  </p>

  <div className="mt-6 space-y-6">
    <div>
      <label
        htmlFor="education"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Education
      </label>
      <textarea
        id="education"
        name="education"
        rows={4}
        value={formData.education}
        onChange={handleChange}
        placeholder="Add school, college, university, degree, diploma or relevant modules."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="licences"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Aviation licences
      </label>
      <textarea
        id="licences"
        name="licences"
        rows={4}
        value={formData.licences}
        onChange={handleChange}
        placeholder="e.g. PPL, CPL, ATPL theory, EASA/UK CAA modules, AME licence details, aircraft type ratings."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="certifications"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Certificates and training
      </label>
      <textarea
        id="certifications"
        name="certifications"
        rows={4}
        value={formData.certifications}
        onChange={handleChange}
        placeholder="e.g. Dangerous goods awareness, first aid, aviation security, manual handling, airside safety, cabin crew attestation, CRM."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="systems"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Aviation systems and tools
      </label>
      <textarea
        id="systems"
        name="systems"
        rows={4}
        value={formData.systems}
        onChange={handleChange}
        placeholder="e.g. Amadeus, Sabre, Galileo, Altea, WorldTracer, AIMS, Jeppesen, maintenance tracking systems, Microsoft Office."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  </div>
</div>

<div className="mt-8 border-t border-slate-200 pt-8">
  <h2 className="text-2xl font-semibold text-slate-900">
    Additional information
  </h2>

  <div className="mt-6 space-y-6">
    <div>
      <label
        htmlFor="additionalInfo"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        Additional information
      </label>
      <textarea
        id="additionalInfo"
        name="additionalInfo"
        rows={4}
        value={formData.additionalInfo}
        onChange={handleChange}
        placeholder="Add optional professional information such as relocation flexibility, shift work availability, airport ID experience or airside experience."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label
        htmlFor="references"
        className="mb-2 block text-sm font-medium text-slate-800"
      >
        References
      </label>
      <input
        id="references"
        name="references"
        type="text"
        value={formData.references}
        onChange={handleChange}
        placeholder="e.g. References available on request"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  </div>
</div>

            <button
              type="submit"
              className="mt-8 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Preview my CV details
            </button>

            <p className="mt-4 text-sm text-slate-500">
              This preview is local only. AI CV generation will be added later.
            </p>
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Recommended journey</h2>

              <ol className="mt-5 space-y-4 text-sm text-slate-200">
                <li>1. Complete Career Assessment</li>
                <li className="font-semibold text-white">2. Build your CV</li>
                <li>3. Check your CV</li>
                <li>4. Generate Cover Letter</li>
                <li>5. Practise Interview Questions</li>
              </ol>

              <div className="mt-8 space-y-3">
                <Link
                  href="/career-coach"
                  className="block rounded-xl bg-white px-4 py-3 text-center font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Career Assessment
                </Link>

                <Link
                  href="/cv-checker"
                  className="block rounded-xl border border-slate-600 px-4 py-3 text-center font-semibold text-white hover:bg-slate-800"
                >
                  CV Checker
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">
                CV details preview
              </h2>

              {!previewStarted ? (
                <p className="mt-4 text-sm text-slate-600">
                  Complete the form and click preview to see your basic CV
                  details here.
                </p>
              ) : (
                <div className="mt-5 space-y-4 text-sm text-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {formData.fullName || "Your name"}
                    </p>
                    <p>{formData.targetRole || "Target aviation role"}</p>
                    <p>{formData.location || "Location"}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p>{formData.email || "Email not added"}</p>
                    <p>{formData.phone || "Phone not added"}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">
                      Career stage
                    </p>
                    <p>{formData.careerStage || "Not selected"}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">
                      Professional profile
                    </p>
                    <p>
                      {formData.profile ||
                        "Your professional profile will appear here."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}