"use client";

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
type WorkExperience = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startMonth: string;
startYear: string;
endMonth: string;
endYear: string;
  currentlyWorking: boolean;
  responsibilities: string;
  achievements: string;
};

type EducationItem = {
  id: string;
  institutionName: string;
  qualificationName: string;
  location: string;
  completionMonth: string;
  completionYear: string;
  details: string;
};

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

  workExperiences: WorkExperience[];

  educationItems: EducationItem[];
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
  const monthOptions = [
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

const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 60 }, (_, index) =>
  String(currentYear - index)
);


function createEducationItem(id: string): EducationItem {
  return {
    id,
    institutionName: "",
    qualificationName: "",
    location: "",
    completionMonth: "",
    completionYear: "",
    details: "",
  };
}
function createWorkExperience(id: string): WorkExperience {
  return {
    id,
    jobTitle: "",
    companyName: "",
    location: "",
    startMonth: "",
startYear: "",
endMonth: "",
endYear: "",
    currentlyWorking: false,
    responsibilities: "",
    achievements: "",
  };
}

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

  workExperiences: [createWorkExperience("experience-1")],

  educationItems: [createEducationItem("education-1")],
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

function getExperienceDates(experience: WorkExperience) {
  const start =
    experience.startMonth && experience.startYear
      ? `${experience.startMonth} ${experience.startYear}`
      : "Start date";

  const end =
    experience.endMonth && experience.endYear
      ? `${experience.endMonth} ${experience.endYear}`
      : "End date";

  return experience.currentlyWorking ? `${start} – Present` : `${start} – ${end}`;
}

export default function CVBuilderForm() {
 const [formData, setFormData] = useState<FormData>(initialFormData);
const [previewStarted, setPreviewStarted] = useState(false);
const [generateMessage, setGenerateMessage] = useState("");
const [isGenerating, setIsGenerating] = useState(false);
const [generatedCV, setGeneratedCV] = useState<any>(null);
const [downloadMessage, setDownloadMessage] = useState("");
const [isDownloading, setIsDownloading] = useState(false);

  function handleTextChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function updateWorkExperience(
    id: string,
    field: keyof Omit<WorkExperience, "id" | "currentlyWorking">,
    value: string
  ) {
    setFormData((currentData) => ({
      ...currentData,
      workExperiences: currentData.workExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      ),
    }));
  }

  function toggleWorkExperienceCurrentlyWorking(id: string, checked: boolean) {
    setFormData((currentData) => ({
      ...currentData,
      workExperiences: currentData.workExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              currentlyWorking: checked,
              endMonth: checked ? "" : experience.endMonth,
endYear: checked ? "" : experience.endYear,
            }
          : experience
      ),
    }));
  }

  function addWorkExperience() {
    setFormData((currentData) => ({
      ...currentData,
      workExperiences: [
        ...currentData.workExperiences,
        createWorkExperience(`experience-${Date.now()}`),
      ],
    }));
  }

  function removeWorkExperience(id: string) {
    setFormData((currentData) => ({
      ...currentData,
      workExperiences:
        currentData.workExperiences.length === 1
          ? currentData.workExperiences
          : currentData.workExperiences.filter(
              (experience) => experience.id !== id
            ),
    }));
  }
  function updateEducationItem(
  id: string,
  field: keyof Omit<EducationItem, "id">,
  value: string
) {
  setFormData((currentData) => ({
    ...currentData,
    educationItems: currentData.educationItems.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
          }
        : item
    ),
  }));
}

function addEducationItem() {
  setFormData((currentData) => ({
    ...currentData,
    educationItems: [
      ...currentData.educationItems,
      createEducationItem(`education-${Date.now()}`),
    ],
  }));
}

function removeEducationItem(id: string) {
  setFormData((currentData) => ({
    ...currentData,
    educationItems:
      currentData.educationItems.length === 1
        ? currentData.educationItems
        : currentData.educationItems.filter((item) => item.id !== id),
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
  async function handleDownloadWord() {
  if (!generatedCV) return;

  setIsDownloading(true);
  setDownloadMessage("");

  try {
    const children: Paragraph[] = [
  new Paragraph({
    children: [
      new TextRun({
        text: generatedCV.cvTitle || "Aviation CV",
        bold: true,
        size: 32,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),
];

if (generatedCV.professionalProfile) {
  children.push(
    new Paragraph({
      text: "PROFESSIONAL PROFILE",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      text: generatedCV.professionalProfile,
      spacing: { after: 200 },
    })
  );
}

if (generatedCV.keySkills?.length) {
  children.push(
    new Paragraph({
      text: "KEY SKILLS",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 },
    }),
    ...generatedCV.keySkills.map(
      (skill: string) =>
        new Paragraph({
          text: skill,
          bullet: { level: 0 },
        })
    )
  );
}

if (generatedCV.workExperience?.length) {
  children.push(
    new Paragraph({
      text: "WORK EXPERIENCE",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    }),
    ...generatedCV.workExperience.flatMap(
      (experience: {
        jobTitle: string;
        companyName: string;
        location: string;
        dates: string;
        bullets: string[];
      }) => [
        new Paragraph({
          children: [
            new TextRun({
              text: `${experience.jobTitle || ""}${
                experience.companyName ? ` | ${experience.companyName}` : ""
              }`,
              bold: true,
            }),
          ],
          spacing: { before: 150 },
        }),
        ...(experience.location || experience.dates
          ? [
              new Paragraph({
                text: `${experience.location || ""}${
                  experience.dates ? ` | ${experience.dates}` : ""
                }`,
                spacing: { after: 80 },
              }),
            ]
          : []),
        ...(experience.bullets || []).map(
          (bullet: string) =>
            new Paragraph({
              text: bullet,
              bullet: { level: 0 },
            })
        ),
      ]
    )
  );
}

if (generatedCV.education?.length) {
  children.push(
    new Paragraph({
      text: "EDUCATION",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    }),
    ...generatedCV.education.flatMap(
      (item: {
        qualification: string;
        institution: string;
        location: string;
        date: string;
        details: string;
      }) => [
        new Paragraph({
          children: [
            new TextRun({
              text: `${item.qualification || ""}${
                item.institution ? ` | ${item.institution}` : ""
              }`,
              bold: true,
            }),
          ],
          spacing: { before: 150 },
        }),
        ...(item.location || item.date
          ? [
              new Paragraph({
                text: `${item.location || ""}${item.date ? ` | ${item.date}` : ""}`,
              }),
            ]
          : []),
        ...(item.details
          ? [
              new Paragraph({
                text: item.details,
                spacing: { after: 100 },
              }),
            ]
          : []),
      ]
    )
  );
}

if (generatedCV.licencesAndTraining?.length) {
  children.push(
    new Paragraph({
      text: "LICENCES AND TRAINING",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    }),
    ...generatedCV.licencesAndTraining.map(
      (item: string) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
        })
    )
  );
}

if (generatedCV.systemsAndTools?.length) {
  children.push(
    new Paragraph({
      text: "SYSTEMS AND TOOLS",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    }),
    ...generatedCV.systemsAndTools.map(
      (item: string) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
        })
    )
  );
}

if (generatedCV.additionalInformation?.length) {
  children.push(
    new Paragraph({
      text: "ADDITIONAL INFORMATION",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    }),
    ...generatedCV.additionalInformation.map(
      (item: string) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
        })
    )
  );
}

if (generatedCV.references) {
  children.push(
    new Paragraph({
      text: "REFERENCES",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    }),
    new Paragraph({
      text: generatedCV.references,
    })
  );
}

   const wordDocument = new Document({
  sections: [
    {
      properties: {},
      children,
    },
  ],
});

const blob = await Packer.toBlob(wordDocument);
const url = URL.createObjectURL(blob);

const link = window.document.createElement("a");
    link.href = url;
    link.download = `${formData.fullName || "aviation-cv"}-airportcv.docx`;
    link.click();

    URL.revokeObjectURL(url);
    setDownloadMessage("Word document downloaded.");
  } catch (error) {
    console.error("Word download error:", error);
    setDownloadMessage("Could not download the Word document. Please try again.");
  } finally {
    setIsDownloading(false);
  }
}
  async function handleGenerateCV() {
  setPreviewStarted(true);
  setGenerateMessage("");
  setGeneratedCV(null);
  setIsGenerating(true);

  try {
    const response = await fetch("/api/cv-builder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "CV generation failed");
    }

    setGeneratedCV(data.cv);

if (data.usage) {
  setGenerateMessage(
    `CV generated successfully. You have ${data.usage.remaining} of ${data.usage.limit} free AI uses remaining this month.`
  );
} else {
  setGenerateMessage("CV generated successfully.");
}
  } catch (error) {
    console.error("Generate CV error:", error);

    setGenerateMessage(
      error instanceof Error
        ? error.message
        : "We could not generate your CV right now. Please check your details and try again shortly."
    );
  } finally {
    setIsGenerating(false);
  }
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
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
  <section className="mx-auto max-w-7xl">
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
          ✦ CV Builder
        </p>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          Build Your Aviation CV
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Create a professional, ATS-friendly CV designed for airport, airline
          and aviation roles. Add your details once, then generate a clear
          UK-style CV draft.
        </p>

        <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200">
            <span className="text-blue-600">✓</span>
            Aviation-focused wording
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200">
            <span className="text-blue-600">✓</span>
            ATS-friendly structure
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200">
            <span className="text-blue-600">✓</span>
            Word download
          </span>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              AI usage
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-950">
              Free plan
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
            5 uses/month
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/5 rounded-full bg-blue-600" />
        </div>

        <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Usage is counted when you generate a CV.</p>

          <Link
            href="/pricing"
            className="font-extrabold text-blue-700 hover:underline"
          >
            View Premium →
          </Link>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
      <p className="font-extrabold">Privacy note</p>

      <p className="mt-1">
        Only include details that are useful for your CV. Avoid unnecessary
        sensitive information such as passport numbers, National Insurance
        numbers, full home address, date of birth, health information or
        financial details. Read our{" "}
        <Link href="/privacy" className="font-bold underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>

   <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.95fr]">
         <form
  onSubmit={handleSubmit}
  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
>
  <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-sm font-extrabold text-slate-950">
      Complete your CV step by step
    </p>

    <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {[
        "Contact",
        "Profile",
        "Skills",
        "Experience",
        "Education",
        "Final details",
      ].map((step, index) => (
        <div
          key={step}
          className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700">
            {index + 1}
          </span>
          {step}
        </div>
      ))}
    </div>
  </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
  CV focus
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
                  placeholder="e.g. John Smith"
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
                CV focus
              </h2>
             <p className="mt-2 text-sm text-slate-600">
  Add your career stage and, if you have one, paste a job advert or keywords so
your CV can be tailored around the right language.
</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                

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
    Add your most recent or most relevant role first. Use month and year dates
    for a professional CV format.
  </p>

  <div className="mt-6 space-y-6">
    {formData.workExperiences.map((experience, index) => (
      <div
        key={experience.id}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="font-semibold text-slate-900">
            Experience {index + 1}
          </h3>

          {formData.workExperiences.length > 1 && (
            <button
              type="button"
              onClick={() => removeWorkExperience(experience.id)}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Job title
            </label>
            <input
              type="text"
              value={experience.jobTitle}
              onChange={(event) =>
                updateWorkExperience(
                  experience.id,
                  "jobTitle",
                  event.target.value
                )
              }
              placeholder="e.g. Passenger Service Agent"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Company name
            </label>
            <input
              type="text"
              value={experience.companyName}
              onChange={(event) =>
                updateWorkExperience(
                  experience.id,
                  "companyName",
                  event.target.value
                )
              }
              placeholder="e.g. ABC Ground Handling"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Location
            </label>
            <input
              type="text"
              value={experience.location}
              onChange={(event) =>
                updateWorkExperience(
                  experience.id,
                  "location",
                  event.target.value
                )
              }
              placeholder="e.g. Heathrow Airport, London"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
  <label className="mb-2 block text-sm font-medium text-slate-800">
    Start date
  </label>
  <div className="grid grid-cols-2 gap-3">
    <select
      value={experience.startMonth}
      onChange={(event) =>
        updateWorkExperience(
          experience.id,
          "startMonth",
          event.target.value
        )
      }
      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">Month</option>
      {monthOptions.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>

    <select
      value={experience.startYear}
      onChange={(event) =>
        updateWorkExperience(
          experience.id,
          "startYear",
          event.target.value
        )
      }
      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">Year</option>
      {yearOptions.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-slate-800">
    End date
  </label>
  <div className="grid grid-cols-2 gap-3">
    <select
      value={experience.endMonth}
      onChange={(event) =>
        updateWorkExperience(
          experience.id,
          "endMonth",
          event.target.value
        )
      }
      disabled={experience.currentlyWorking}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
    >
      <option value="">Month</option>
      {monthOptions.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>

    <select
      value={experience.endYear}
      onChange={(event) =>
        updateWorkExperience(
          experience.id,
          "endYear",
          event.target.value
        )
      }
      disabled={experience.currentlyWorking}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
    >
      <option value="">Year</option>
      {yearOptions.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>

          <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={experience.currentlyWorking}
              onChange={(event) =>
                toggleWorkExperienceCurrentlyWorking(
                  experience.id,
                  event.target.checked
                )
              }
              className="h-4 w-4"
            />
            I currently work here
          </label>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Main responsibilities
            </label>
            <textarea
              rows={5}
              value={experience.responsibilities}
              onChange={(event) =>
                updateWorkExperience(
                  experience.id,
                  "responsibilities",
                  event.target.value
                )
              }
              placeholder="Add your main duties, such as passenger support, safety checks, documentation, operations, dispatch, customer service or technical tasks."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Key achievements
            </label>
            <textarea
              rows={5}
              value={experience.achievements}
              onChange={(event) =>
                updateWorkExperience(
                  experience.id,
                  "achievements",
                  event.target.value
                )
              }
              placeholder="Add one achievement per line. Example: Handled 150+ passengers per shift while maintaining service standards."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>
    ))}
  </div>

  <button
    type="button"
    onClick={addWorkExperience}
    className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-100"
  >
    + Add another experience
  </button>
</div>
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Education, licences and training
              </h2>

             <div className="mt-6">
  <h3 className="text-lg font-semibold text-slate-900">Education</h3>
  <p className="mt-2 text-sm text-slate-600">
    Add school, college, university or aviation training. Add your highest or
    most relevant qualification first.
  </p>

  <div className="mt-5 space-y-6">
    {formData.educationItems.map((item, index) => (
      <div
        key={item.id}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h4 className="font-semibold text-slate-900">
            Education {index + 1}
          </h4>

          {formData.educationItems.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducationItem(item.id)}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              School, college or university
            </label>
            <input
              type="text"
              value={item.institutionName}
              onChange={(event) =>
                updateEducationItem(
                  item.id,
                  "institutionName",
                  event.target.value
                )
              }
              placeholder="e.g. University of West London"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Award, degree or qualification
            </label>
            <input
              type="text"
              value={item.qualificationName}
              onChange={(event) =>
                updateEducationItem(
                  item.id,
                  "qualificationName",
                  event.target.value
                )
              }
              placeholder="e.g. BSc Aviation Management"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Location
            </label>
            <input
              type="text"
              value={item.location}
              onChange={(event) =>
                updateEducationItem(item.id, "location", event.target.value)
              }
              placeholder="e.g. London, UK"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Completion date
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={item.completionMonth}
                onChange={(event) =>
                  updateEducationItem(
                    item.id,
                    "completionMonth",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Month</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={item.completionYear}
                onChange={(event) =>
                  updateEducationItem(
                    item.id,
                    "completionYear",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Details or relevant modules
          </label>
          <textarea
            rows={4}
            value={item.details}
            onChange={(event) =>
              updateEducationItem(item.id, "details", event.target.value)
            }
            placeholder="Add relevant modules, aviation projects, grades or achievements if useful."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    ))}
  </div>

  <button
    type="button"
    onClick={addEducationItem}
    className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-100"
  >
    + Add another education
  </button>
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

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
  <button
    type="submit"
    className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-100"
  >
    Preview my CV details
  </button>

  <button
    type="button"
    onClick={handleGenerateCV}
    disabled={isGenerating}
    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
  >
    {isGenerating ? "Generating CV..." : "Generate my aviation CV"}
  </button>
</div>

{generateMessage && (
  <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
    {generateMessage}
  </div>
)}
{generatedCV && (
  <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <h2 className="text-2xl font-semibold text-slate-900">
    Generated aviation CV draft
  </h2>

  <button
    type="button"
    onClick={handleDownloadWord}
    disabled={isDownloading}
    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
  >
    {isDownloading ? "Preparing Word file..." : "Download Word"}
  </button>
</div>

   <p className="mt-2 text-sm text-slate-600">
  Review this draft carefully before using it. Download it as a Word document,
  edit it if needed, then check the final version with the Aviation CV Checker.
</p>

{downloadMessage && (
  <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">
    {downloadMessage}
  </div>
)}
<div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
  <p className="text-sm text-blue-950">
    Next step: once you have reviewed or edited your Word CV, check it against
    your target aviation role.
  </p>

  <Link
    href="/cv-checker"
    className="mt-3 inline-flex rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
  >
    Check this CV with Aviation CV Checker
  </Link>
</div>

    <div className="mt-6 space-y-6 text-sm text-slate-800">
      <section>
        <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">
          {generatedCV.cvTitle}
        </h3>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Professional Profile
        </h3>
        <p className="mt-2 whitespace-pre-line">
          {generatedCV.professionalProfile}
        </p>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Key Skills
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {generatedCV.keySkills?.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Work Experience
        </h3>
        <div className="mt-2 space-y-5">
          {generatedCV.workExperience?.map(
            (
              experience: {
                jobTitle: string;
                companyName: string;
                location: string;
                dates: string;
                bullets: string[];
              },
              index: number
            ) => (
              <div key={`${experience.jobTitle}-${index}`}>
                <p className="font-semibold text-slate-900">
                  {experience.jobTitle}
                  {experience.companyName ? ` | ${experience.companyName}` : ""}
                </p>
                <p>
                  {experience.location} | {experience.dates}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {experience.bullets?.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Education
        </h3>
        <div className="mt-2 space-y-4">
          {generatedCV.education?.map(
            (
              item: {
                qualification: string;
                institution: string;
                location: string;
                date: string;
                details: string;
              },
              index: number
            ) => (
              <div key={`${item.qualification}-${index}`}>
                <p className="font-semibold text-slate-900">
                  {item.qualification}
                  {item.institution ? ` | ${item.institution}` : ""}
                </p>
                <p>
                  {item.location} | {item.date}
                </p>
                {item.details && <p className="mt-1">{item.details}</p>}
              </div>
            )
          )}
        </div>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Licences and Training
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {generatedCV.licencesAndTraining?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Systems and Tools
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {generatedCV.systemsAndTools?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          Additional Information
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {generatedCV.additionalInformation?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-bold uppercase tracking-wide text-slate-900">
          References
        </h3>
        <p className="mt-2">{generatedCV.references}</p>
      </section>
    </div>
  </div>
)}

            
          </form>

         <aside className="xl:sticky xl:top-6 xl:self-start">
  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-950">
          Live Preview
        </h2>

        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Your CV updates as you type
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-1 text-sm font-bold text-slate-600">
        <span className="inline-flex rounded-xl bg-white px-4 py-2 text-blue-700 shadow-sm">
          Preview
        </span>
      </div>
    </div>

    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between gap-6 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-3xl font-extrabold tracking-wide text-slate-950">
            {formData.fullName || "YOUR NAME"}
          </h3>

         <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
  Aviation CV Builder
</p>
        </div>

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-3xl">
          ✈️
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
        {formData.email && <span>✉ {formData.email}</span>}
        {formData.phone && <span>☎ {formData.phone}</span>}
        {formData.location && <span>📍 {formData.location}</span>}
        {formData.linkedinUrl && <span>in {formData.linkedinUrl}</span>}
        {!formData.email &&
          !formData.phone &&
          !formData.location &&
          !formData.linkedinUrl && (
            <span>Contact details will appear here</span>
          )}
      </div>

      <section className="mt-6">
        <h4 className="border-b-2 border-blue-600 pb-2 text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Professional Summary
        </h4>

        <p className="mt-4 text-sm leading-7 text-slate-700">
          {formData.profile ||
            "Your professional profile will appear here. Add a short summary of your aviation background, strengths and career goal."}
        </p>
      </section>

      <section className="mt-7">
        <h4 className="border-b-2 border-blue-600 pb-2 text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Key Skills
        </h4>

        {skillsPreview ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {skillsPreview
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .slice(0, 10)
              .map((skill) => (
                <p key={skill} className="flex gap-2 text-sm text-slate-700">
                  <span className="font-extrabold text-blue-600">✓</span>
                  <span>{skill}</span>
                </p>
              ))}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Selected aviation skills will appear here.
          </p>
        )}
      </section>

      <section className="mt-7">
        <h4 className="border-b-2 border-blue-600 pb-2 text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Work Experience
        </h4>

        <div className="mt-4 space-y-4">
          {formData.workExperiences.slice(0, 2).map((experience) => (
            <div key={experience.id}>
              <p className="text-sm font-extrabold text-slate-950">
                {experience.jobTitle || "Job title"}
                {experience.companyName ? ` | ${experience.companyName}` : ""}
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                {(experience.location || "Location") +
                  " | " +
                  getExperienceDates(experience)}
              </p>

              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700">
                {experience.responsibilities ||
                  "Main responsibilities will appear here."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h4 className="border-b-2 border-blue-600 pb-2 text-sm font-extrabold uppercase tracking-wide text-slate-950">
          Education & Training
        </h4>

        <div className="mt-4 space-y-3">
          {formData.educationItems.slice(0, 2).map((item) => (
            <div key={item.id}>
              <p className="text-sm font-extrabold text-slate-950">
                {item.qualificationName || "Qualification"}
                {item.institutionName ? ` | ${item.institutionName}` : ""}
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                {item.location || "Location"}
                {item.completionMonth && item.completionYear
                  ? ` | ${item.completionMonth} ${item.completionYear}`
                  : ""}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>

    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
      <p className="font-extrabold">ATS-friendly reminder</p>
      <p className="mt-1">
        Keep your CV clear and focused. Use aviation keywords from the job
        advert, but only include details that are true and relevant.
      </p>
    </div>
  </div>
</aside>
        </div>
      </section>
    </main>
  );
}