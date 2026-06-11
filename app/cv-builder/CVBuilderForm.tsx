"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";

type MultiSelectField =
  | "selectedSkills"
  | "selectedSystems"
  | "selectedLicences"
  | "selectedCertifications";

type FormData = {
  fullName: string;
  targetRole: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  websiteUrl: string;
  careerStage: string;
  jobDescription: string;
  profile: string;

  selectedSkills: string[];
  otherSkills: string;
  selectedSystems: string[];
  otherSystems: string;

  jobTitle: string;
  companyName: string;
  employmentLocation: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string;
  achievements: string;

  education: string;
  selectedLicences: string[];
  otherLicences: string;
  selectedCertifications: string[];
  otherCertifications: string;

  languages: string;
  rightToWork: string;
  rightToWorkUntil: string;
  drivingLicence: string;
  availability: string;
  availableFrom: string;
  additionalInfo: string;
  references: string;
};

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

const careerStages = [
  "Student / graduate",
  "Entry level",
  "Experienced aviation professional",
  "Career changer",
  "Returning to aviation",
];

const aviationSkills = [
  "Passenger handling",
  "Customer service",
  "Check-in procedures",
  "Boarding gate operations",
  "Baggage handling",
  "Ramp safety",
  "Aircraft turnaround",
  "Load control",
  "Flight dispatch",
  "Aviation security",
  "Safety compliance",
  "Airside operations",
  "Airport operations",
  "Disruption handling",
  "Conflict resolution",
  "Teamwork",
  "Communication",
  "Time management",
  "Attention to detail",
  "Problem solving",
  "Leadership",
  "Decision making",
  "Emergency procedures",
  "Cabin crew service",
  "CRM",
  "First aid awareness",
  "Aircraft maintenance",
  "Technical documentation",
  "Troubleshooting",
  "Tool control",
  "Human factors",
];

const aviationSystems = [
  "Amadeus",
  "Sabre",
  "Galileo",
  "Worldspan",
  "Altea",
  "WorldTracer",
  "AODB",
  "DCS",
  "AIMS",
  "Jeppesen",
  "Lido",
  "Microsoft Office",
  "Excel",
  "Maintenance tracking systems",
];

const aviationLicences = [
  "PPL",
  "CPL",
  "ATPL theory",
  "Frozen ATPL",
  "ATPL",
  "MCC",
  "MEIR",
  "Type rating",
  "Cabin Crew Attestation",
  "AME licence",
  "EASA Part-66 modules",
  "UK CAA modules",
  "Forklift licence",
  "Airside driving permit",
];

const aviationCertifications = [
  "Dangerous Goods Awareness",
  "Aviation Security",
  "Airside Safety",
  "Manual Handling",
  "First Aid",
  "Fire Safety",
  "CRM",
  "Human Factors",
  "Customer Service Training",
  "Ramp Safety",
  "Aircraft Marshalling",
  "Load Control Training",
  "Flight Dispatch Training",
  "Security Awareness",
  "Safeguarding",
];

const rightToWorkOptions = [
  "Full right to work in the UK",
  "Limited right to work until",
  "No current right to work in the UK",
  "Prefer not to include on CV",
];

const drivingLicenceOptions = [
  "Full UK driving licence",
  "Provisional UK driving licence",
  "International driving licence",
  "No driving licence",
  "Not relevant to this role",
];

const availabilityOptions = [
  "Immediately available",
  "1 week notice",
  "2 weeks notice",
  "4 weeks notice",
  "1 month notice",
  "More than 1 month",
  "Available from a specific date",
];

const initialFormData: FormData = {
  fullName: "",
  targetRole: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  websiteUrl: "",
  careerStage: "",
  jobDescription: "",
  profile: "",

  selectedSkills: [],
  otherSkills: "",
  selectedSystems: [],
  otherSystems: "",

  jobTitle: "",
  companyName: "",
  employmentLocation: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  responsibilities: "",
  achievements: "",

  education: "",
  selectedLicences: [],
  otherLicences: "",
  selectedCertifications: [],
  otherCertifications: "",

  languages: "",
  rightToWork: "",
  rightToWorkUntil: "",
  drivingLicence: "",
  availability: "",
  availableFrom: "",
  additionalInfo: "",
  references: "References available on request",
};

function formatMonth(value: string) {
  if (!value) return "";

  const [year, month] = value.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[Number(month) - 1]} ${year}`;
}

function joinItems(items: string[], otherValue = "") {
  const allItems = [...items];
  const trimmedOtherValue = otherValue.trim();

  if (trimmedOtherValue) {
    allItems.push(trimmedOtherValue);
  }

  return allItems.length ? allItems.join(", ") : "";
}

export default function CVBuilderForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewStarted, setPreviewStarted] = useState(false);

  function handleTextChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleCurrentlyWorkingChange(event: ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;

    setFormData((currentData) => ({
      ...currentData,
      currentlyWorking: checked,
      endDate: checked ? "" : currentData.endDate,
    }));
  }

  function toggleSelectedValue(field: MultiSelectField, value: string) {
    setFormData((currentData) => {
      const currentValues = currentData[field];

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...currentData,
        [field]: nextValues,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewStarted(true);
  }

  const skillsPreview = joinItems(formData.selectedSkills, formData.otherSkills);
  const systemsPreview = joinItems(
    formData.selectedSystems,
    formData.otherSystems
  );
  const licencesPreview = joinItems(
    formData.selectedLicences,
    formData.otherLicences
  );
  const certificationsPreview = joinItems(
    formData.selectedCertifications,
    formData.otherCertifications
  );

  const experienceDates = formData.currentlyWorking
    ? `${formatMonth(formData.startDate) || "Start date"} – Present`
    : `${formatMonth(formData.startDate) || "Start date"} – ${
        formatMonth(formData.endDate) || "End date"
      }`;

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
            Build a professional UK-style aviation CV using guided sections,
            aviation keywords and ATS-friendly structure.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                CV heading
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Add the contact details you want shown at the top of your CV.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                  onChange={handleTextChange}
                  placeholder="e.g. Jay Kumar"
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
                  onChange={handleTextChange}
                  placeholder="e.g. London, UK"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
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
                  onChange={handleTextChange}
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
                  onChange={handleTextChange}
                  placeholder="+44 7000 000000"
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
                  onChange={handleTextChange}
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
                  onChange={handleTextChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Target role
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                These details help shape the CV around the aviation role the
                user wants.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                    onChange={handleTextChange}
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
                    htmlFor="careerStage"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Career stage
                  </label>
                  <select
                    id="careerStage"
                    name="careerStage"
                    value={formData.careerStage}
                    onChange={handleTextChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Select career stage
                    </option>
                    {careerStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="jobDescription"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Optional job advert or keywords
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows={5}
                  value={formData.jobDescription}
                  onChange={handleTextChange}
                  placeholder="Paste key requirements from the job advert, such as passenger service, safety, compliance, dispatch, aircraft maintenance or customer service."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Professional profile
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                A short opening summary for the top of the CV.
              </p>

              <textarea
                id="profile"
                name="profile"
                rows={5}
                value={formData.profile}
                onChange={handleTextChange}
                placeholder="Write a short summary of your aviation background, strengths and career goal."
                className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Suggested aviation skills
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose any that match your background, or add your own. This is
                for CV wording, not a job application checklist.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {aviationSkills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedSkills.includes(skill)}
                      onChange={() =>
                        toggleSelectedValue("selectedSkills", skill)
                      }
                      className="h-4 w-4"
                    />
                    {skill}
                  </label>
                ))}
              </div>

              <textarea
                id="otherSkills"
                name="otherSkills"
                rows={3}
                value={formData.otherSkills}
                onChange={handleTextChange}
                placeholder="Add any other skills you want included."
                className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Work experience
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Add your most recent or most relevant role first. Use month and
                year dates for a professional CV format.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Job title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle}
                    onChange={handleTextChange}
                    placeholder="e.g. Passenger Service Agent"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Company name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleTextChange}
                    placeholder="e.g. ABC Ground Handling"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="employmentLocation"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Location
                  </label>
                  <input
                    id="employmentLocation"
                    name="employmentLocation"
                    type="text"
                    value={formData.employmentLocation}
                    onChange={handleTextChange}
                    placeholder="e.g. Heathrow Airport, London"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Start date
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={handleTextChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    End date
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={handleTextChange}
                    disabled={formData.currentlyWorking}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                  />
                </div>

                <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.currentlyWorking}
                    onChange={handleCurrentlyWorkingChange}
                    className="h-4 w-4"
                  />
                  I currently work here
                </label>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="responsibilities"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Main responsibilities
                  </label>
                  <textarea
                    id="responsibilities"
                    name="responsibilities"
                    rows={5}
                    value={formData.responsibilities}
                    onChange={handleTextChange}
                    placeholder="Add your main duties, such as passenger support, safety checks, documentation, operations, dispatch, customer service or technical tasks."
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
                    onChange={handleTextChange}
                    placeholder="Add one achievement per line. Example: Handled 150+ passengers per shift while maintaining service standards."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Education, licences and training
              </h2>

              <div className="mt-6">
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
                  onChange={handleTextChange}
                  placeholder="Add school, college, university, degree, diploma or relevant aviation modules."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-800">
                  Suggested aviation licences
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {aviationLicences.map((licence) => (
                    <label
                      key={licence}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedLicences.includes(licence)}
                        onChange={() =>
                          toggleSelectedValue("selectedLicences", licence)
                        }
                        className="h-4 w-4"
                      />
                      {licence}
                    </label>
                  ))}
                </div>

                <textarea
                  id="otherLicences"
                  name="otherLicences"
                  rows={3}
                  value={formData.otherLicences}
                  onChange={handleTextChange}
                  placeholder="Add any other licences."
                  className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-800">
                  Suggested certificates and training
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {aviationCertifications.map((certificate) => (
                    <label
                      key={certificate}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedCertifications.includes(
                          certificate
                        )}
                        onChange={() =>
                          toggleSelectedValue(
                            "selectedCertifications",
                            certificate
                          )
                        }
                        className="h-4 w-4"
                      />
                      {certificate}
                    </label>
                  ))}
                </div>

                <textarea
                  id="otherCertifications"
                  name="otherCertifications"
                  rows={3}
                  value={formData.otherCertifications}
                  onChange={handleTextChange}
                  placeholder="Add any other certificates or training."
                  className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-800">
                  Aviation systems and tools
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {aviationSystems.map((system) => (
                    <label
                      key={system}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedSystems.includes(system)}
                        onChange={() =>
                          toggleSelectedValue("selectedSystems", system)
                        }
                        className="h-4 w-4"
                      />
                      {system}
                    </label>
                  ))}
                </div>

                <textarea
                  id="otherSystems"
                  name="otherSystems"
                  rows={3}
                  value={formData.otherSystems}
                  onChange={handleTextChange}
                  placeholder="Add any other systems, tools or software."
                  className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Useful aviation CV details
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Only include these if they strengthen the CV for the target
                role.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="rightToWork"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Right to work
                  </label>
                  <select
                    id="rightToWork"
                    name="rightToWork"
                    value={formData.rightToWork}
                    onChange={handleTextChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Choose an option</option>
                    {rightToWorkOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.rightToWork === "Limited right to work until" && (
                  <div>
                    <label
                      htmlFor="rightToWorkUntil"
                      className="mb-2 block text-sm font-medium text-slate-800"
                    >
                      Right to work valid until
                    </label>
                    <input
                      id="rightToWorkUntil"
                      name="rightToWorkUntil"
                      type="date"
                      value={formData.rightToWorkUntil}
                      onChange={handleTextChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="drivingLicence"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Driving licence
                  </label>
                  <select
                    id="drivingLicence"
                    name="drivingLicence"
                    value={formData.drivingLicence}
                    onChange={handleTextChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Choose an option</option>
                    {drivingLicenceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="availability"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Availability / notice period
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleTextChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Choose an option</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.availability === "Available from a specific date" && (
                  <div>
                    <label
                      htmlFor="availableFrom"
                      className="mb-2 block text-sm font-medium text-slate-800"
                    >
                      Available from
                    </label>
                    <input
                      id="availableFrom"
                      name="availableFrom"
                      type="date"
                      value={formData.availableFrom}
                      onChange={handleTextChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-5">
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
                    onChange={handleTextChange}
                    placeholder="e.g. English fluent, Hindi fluent, Arabic conversational."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="additionalInfo"
                    className="mb-2 block text-sm font-medium text-slate-800"
                  >
                    Additional professional information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleTextChange}
                    placeholder="Add optional professional information such as airside experience, shift flexibility, relocation flexibility or airport ID experience."
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
                    onChange={handleTextChange}
                    placeholder="References available on request"
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
                ATS-friendly CV preview
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Clear UK-style headings, simple text and aviation keywords.
              </p>

              {!previewStarted ? (
                <p className="mt-4 text-sm text-slate-600">
                  Complete the form and click preview to see your CV structure.
                </p>
              ) : (
                <div className="mt-6 space-y-6 text-sm text-slate-700">
                  <section>
                    <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">
                      {formData.fullName || "Your Name"}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p>{formData.location || "Location"}</p>
                      <p>{formData.email || "Email"}</p>
                      <p>{formData.phone || "Phone"}</p>
                      {formData.linkedinUrl && <p>{formData.linkedinUrl}</p>}
                      {formData.websiteUrl && <p>{formData.websiteUrl}</p>}
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      Professional Profile
                    </h3>
                    <p className="mt-2 whitespace-pre-line">
                      {formData.profile ||
                        "Professional summary will appear here."}
                    </p>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      Key Skills
                    </h3>
                    <p className="mt-2 whitespace-pre-line">
                      {skillsPreview || "Selected aviation skills will appear here."}
                    </p>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      Work Experience
                    </h3>

                    <div className="mt-2">
                      <p className="font-semibold text-slate-900">
                        {formData.jobTitle || "Job Title"}
                        {formData.companyName
                          ? ` | ${formData.companyName}`
                          : ""}
                      </p>
                      <p>
                        {formData.employmentLocation ||
                          "Employment location"}{" "}
                        | {experienceDates}
                      </p>
                      <p className="mt-2 whitespace-pre-line">
                        {formData.responsibilities ||
                          "Main responsibilities will appear here."}
                      </p>
                      <p className="mt-2 whitespace-pre-line">
                        {formData.achievements ||
                          "Key achievements will appear here."}
                      </p>
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      Education
                    </h3>
                    <p className="mt-2 whitespace-pre-line">
                      {formData.education || "Education will appear here."}
                    </p>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      Licences, Certificates and Training
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p>{licencesPreview || "Licences will appear here."}</p>
                      <p>
                        {certificationsPreview ||
                          "Certificates and training will appear here."}
                      </p>
                      <p>
                        {systemsPreview ||
                          "Aviation systems and tools will appear here."}
                      </p>
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      Additional Information
                    </h3>
                    <div className="mt-2 space-y-2">
                      {formData.languages && <p>{formData.languages}</p>}
                      {formData.rightToWork && (
                        <p>
                          Right to work: {formData.rightToWork}
                          {formData.rightToWorkUntil
                            ? ` ${formData.rightToWorkUntil}`
                            : ""}
                        </p>
                      )}
                      {formData.drivingLicence && (
                        <p>Driving licence: {formData.drivingLicence}</p>
                      )}
                      {formData.availability && (
                        <p>
                          Availability: {formData.availability}
                          {formData.availableFrom
                            ? ` ${formData.availableFrom}`
                            : ""}
                        </p>
                      )}
                      {formData.additionalInfo && (
                        <p className="whitespace-pre-line">
                          {formData.additionalInfo}
                        </p>
                      )}
                    </div>
                  </section>

                  <section className="border-t border-slate-200 pt-4">
                    <h3 className="font-bold uppercase tracking-wide text-slate-900">
                      References
                    </h3>
                    <p className="mt-2">
                      {formData.references || "References available on request"}
                    </p>
                  </section>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}