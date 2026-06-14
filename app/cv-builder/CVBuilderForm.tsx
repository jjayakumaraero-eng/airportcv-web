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
const [currentStep, setCurrentStep] = useState(1);
 const [previewStarted, setPreviewStarted] = useState(false);
const [generateMessage, setGenerateMessage] = useState("");
const [isGenerating, setIsGenerating] = useState(false);
const [generatedCV, setGeneratedCV] = useState<any>(null);
const [downloadMessage, setDownloadMessage] = useState("");
const [isDownloading, setIsDownloading] = useState(false);
const [profileSuggestions, setProfileSuggestions] = useState<string[]>([]);
const [isGeneratingProfileSuggestions, setIsGeneratingProfileSuggestions] =
  useState(false);
const [profileSuggestionMessage, setProfileSuggestionMessage] = useState("");
const [responsibilitySuggestionsByExperience, setResponsibilitySuggestionsByExperience] =
  useState<Record<string, string[]>>({});
const [isGeneratingResponsibilitiesFor, setIsGeneratingResponsibilitiesFor] =
  useState<string | null>(null);
const [responsibilitySuggestionMessageByExperience, setResponsibilitySuggestionMessageByExperience] =
  useState<Record<string, string>>({});

const builderSteps = [
  "CV Heading",
  "Professional Profile",
  "Key Skills",
  "Work Experience",
  "Education & Training",
  "Additional Sections",
  "Review & Generate",
];

function goToNextStep() {
  setCurrentStep((step) => Math.min(step + 1, builderSteps.length));
}

function goToPreviousStep() {
  setCurrentStep((step) => Math.max(step - 1, 1));
}  
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
async function handleGenerateProfileSuggestions() {
  setIsGeneratingProfileSuggestions(true);
  setProfileSuggestionMessage("");
  setProfileSuggestions([]);

  try {
    const response = await fetch("/api/cv-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        suggestionType: "profile",
        formData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not generate profile suggestions.");
    }

    setProfileSuggestions(data.suggestions || []);

    if (data.usage) {
      setProfileSuggestionMessage(
        `Generated 3 profile suggestions. You have ${data.usage.remaining} of ${data.usage.limit} AI uses remaining this month.`
      );
    } else {
      setProfileSuggestionMessage("Generated 3 profile suggestions.");
    }
  } catch (error) {
    setProfileSuggestionMessage(
      error instanceof Error
        ? error.message
        : "Could not generate profile suggestions right now."
    );
  } finally {
    setIsGeneratingProfileSuggestions(false);
  }
}  
async function handleGenerateResponsibilitySuggestions(
  experience: WorkExperience
) {
  setIsGeneratingResponsibilitiesFor(experience.id);
  setResponsibilitySuggestionMessageByExperience((currentMessages) => ({
    ...currentMessages,
    [experience.id]: "",
  }));
  setResponsibilitySuggestionsByExperience((currentSuggestions) => ({
    ...currentSuggestions,
    [experience.id]: [],
  }));

  try {
    const response = await fetch("/api/cv-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        suggestionType: "responsibilities",
        formData,
        context: {
          jobTitle: experience.jobTitle,
          companyName: experience.companyName,
          responsibilities: experience.responsibilities,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Could not generate responsibility suggestions."
      );
    }

    setResponsibilitySuggestionsByExperience((currentSuggestions) => ({
      ...currentSuggestions,
      [experience.id]: data.suggestions || [],
    }));

    setResponsibilitySuggestionMessageByExperience((currentMessages) => ({
      ...currentMessages,
      [experience.id]: data.usage
        ? `Generated suggestions. You have ${data.usage.remaining} of ${data.usage.limit} AI uses remaining this month.`
        : "Generated suggestions.",
    }));
  } catch (error) {
    setResponsibilitySuggestionMessageByExperience((currentMessages) => ({
      ...currentMessages,
      [experience.id]:
        error instanceof Error
          ? error.message
          : "Could not generate responsibility suggestions right now.",
    }));
  } finally {
    setIsGeneratingResponsibilitiesFor(null);
  }
}

function addResponsibilitySuggestionToExperience(
  experienceId: string,
  suggestion: string
) {
  setFormData((currentData) => ({
    ...currentData,
    workExperiences: currentData.workExperiences.map((experience) => {
      if (experience.id !== experienceId) {
        return experience;
      }

      const currentResponsibilities = experience.responsibilities.trim();

      return {
        ...experience,
        responsibilities: currentResponsibilities
          ? `${currentResponsibilities}\n${suggestion}`
          : suggestion,
      };
    }),
  }));
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
    <main className="min-h-screen bg-[#f4f7fb]">
      <div className="grid min-h-screen lg:grid-cols-[210px_1fr]">
        <aside className="hidden bg-blue-950 px-5 py-6 text-white lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              ✈️
            </div>
            <div>
              <p className="text-lg font-extrabold">AirportCV</p>
              <p className="text-xs font-semibold text-blue-200">
                Aviation careers
              </p>
            </div>
          </div>

          <nav className="mt-10 space-y-1">
            {builderSteps.map((step, index) => {
              const active = currentStep === index + 1;
              const complete = currentStep > index + 1;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(index + 1)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${
                    active
                      ? "bg-white text-blue-950 shadow-lg"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : complete
                          ? "border-emerald-300 bg-emerald-400 text-blue-950"
                          : "border-white/30 bg-white/5 text-white"
                    }`}
                  >
                    {complete ? "✓" : index + 1}
                  </span>
                  <span>{step}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-extrabold">AI usage</p>
              <p className="mt-2 text-xs text-blue-100">
                Usage is counted when AI creates suggestions or generates your CV.
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-1/5 rounded-full bg-emerald-400" />
              </div>
            </div>

            <Link
              href="/dashboard"
              className="block rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-blue-50 transition hover:bg-white/15"
            >
              ← Back to dashboard
            </Link>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-[1500px] flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-2xl ring-1 ring-blue-100">
                  ✈️
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-950">
                    Aviation CV Builder
                  </p>
                  <p className="text-sm text-slate-500">
                    Build a polished aviation CV step by step
                  </p>
                </div>
                <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 ring-1 ring-emerald-100 sm:inline-flex">
                  ✓ Live preview
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerateCV}
                  disabled={isGenerating}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isGenerating ? "Generating..." : "Generate CV"}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadWord}
                  disabled={!generatedCV || isDownloading}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  {isDownloading ? "Preparing..." : "Download Word"}
                </button>

                <Link
                  href="/cv-checker"
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
                >
                  Check with CV Checker →
                </Link>
              </div>
            </div>
          </header>

          <div className="mx-auto grid w-full max-w-[1500px] gap-6 px-5 py-6 xl:grid-cols-[minmax(520px,690px)_1fr]">
            <form
              onSubmit={handleSubmit}
              className="min-w-0 space-y-5"
            >
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:hidden">
                <p className="text-sm font-extrabold text-slate-950">
                  Step {currentStep} of {builderSteps.length}
                </p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {builderSteps.map((step, index) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setCurrentStep(index + 1)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold ${
                        currentStep === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {index + 1}. {step}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                {currentStep === 1 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 1
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        CV Heading
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Add your name, contact details and optional job advert keywords.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="mb-2 block text-sm font-bold text-slate-800"
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
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="mb-2 block text-sm font-bold text-slate-800"
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
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-bold text-slate-800"
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
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-bold text-slate-800"
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
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="linkedinUrl"
                          className="mb-2 block text-sm font-bold text-slate-800"
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
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="websiteUrl"
                          className="mb-2 block text-sm font-bold text-slate-800"
                        >
                          Portfolio or website
                        </label>
                        <input
                          id="websiteUrl"
                          name="websiteUrl"
                          type="url"
                          value={formData.websiteUrl}
                          onChange={handleTextChange}
                          placeholder="https://yourwebsite.com"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="careerStage"
                          className="mb-2 block text-sm font-bold text-slate-800"
                        >
                          Career stage
                        </label>
                        <select
                          id="careerStage"
                          name="careerStage"
                          value={formData.careerStage}
                          onChange={handleTextChange}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                      <div className="md:col-span-2">
                        <label
                          htmlFor="jobDescription"
                          className="mb-2 block text-sm font-bold text-slate-800"
                        >
                          Optional job advert or keywords
                        </label>
                        <textarea
                          id="jobDescription"
                          name="jobDescription"
                          rows={4}
                          value={formData.jobDescription}
                          onChange={handleTextChange}
                          placeholder="Paste job advert keywords such as passenger service, safety, compliance, dispatch, aircraft maintenance or customer service."
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                      >
                        Continue →
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 2
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        Professional Profile
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Write a strong opening summary or use AI suggestions.
                      </p>
                    </div>

                    <textarea
                      id="profile"
                      name="profile"
                      rows={7}
                      value={formData.profile}
                      onChange={handleTextChange}
                      placeholder="Write a short summary of your aviation background, strengths and career goal."
                      className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-extrabold text-blue-950">
                            ✨ AI recommended profiles
                          </p>
                          <p className="mt-1 text-sm text-blue-900">
                            Generate 3 profile options based on your CV heading and focus.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleGenerateProfileSuggestions}
                          disabled={isGeneratingProfileSuggestions}
                          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          {isGeneratingProfileSuggestions
                            ? "Generating..."
                            : "Generate suggestions"}
                        </button>
                      </div>

                      {profileSuggestionMessage && (
                        <p className="mt-3 text-sm font-medium text-blue-950">
                          {profileSuggestionMessage}
                        </p>
                      )}

                      {profileSuggestions.length > 0 && (
                        <div className="mt-4 grid gap-3">
                          {profileSuggestions.map((suggestion, index) => (
                            <div
                              key={`${suggestion}-${index}`}
                              className="rounded-xl border border-blue-100 bg-white p-4"
                            >
                              <p className="text-sm leading-6 text-slate-700">
                                {suggestion}
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  setFormData((currentData) => ({
                                    ...currentData,
                                    profile: suggestion,
                                  }))
                                }
                                className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-extrabold text-blue-700 transition hover:bg-blue-100"
                              >
                                Use this profile
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                      >
                        Continue →
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 3
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        Key Skills
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Choose aviation skills that truthfully match your background.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {aviationSkills.map((skill) => {
                        const selected = formData.selectedSkills.includes(skill);

                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSelectedValue("selectedSkills", skill)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              selected
                                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            {selected ? "✓ " : ""}
                            {skill}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      id="otherSkills"
                      name="otherSkills"
                      rows={3}
                      value={formData.otherSkills}
                      onChange={handleTextChange}
                      placeholder="Add any other skills you want included."
                      className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                      >
                        Continue →
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 4
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        Work Experience
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Add your most recent or most relevant aviation experience first.
                      </p>
                    </div>

                    <div className="mt-6 space-y-6">
                      {formData.workExperiences.map((experience, index) => (
                        <div
                          key={experience.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <div className="mb-5 flex items-center justify-between gap-4">
                            <h3 className="font-extrabold text-slate-950">
                              Experience {index + 1}
                            </h3>

                            {formData.workExperiences.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeWorkExperience(experience.id)}
                                className="text-sm font-extrabold text-red-600 hover:text-red-700"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid gap-5 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
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
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
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

                            <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
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

                          <div className="mt-5">
                            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <label className="block text-sm font-bold text-slate-800">
                                Main responsibilities
                              </label>

                              <button
                                type="button"
                                onClick={() =>
                                  handleGenerateResponsibilitySuggestions(experience)
                                }
                                disabled={
                                  isGeneratingResponsibilitiesFor === experience.id ||
                                  !experience.jobTitle.trim()
                                }
                                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                              >
                                {isGeneratingResponsibilitiesFor === experience.id
                                  ? "Suggesting..."
                                  : "Suggest responsibilities"}
                              </button>
                            </div>

                            {!experience.jobTitle.trim() && (
                              <p className="mb-2 text-xs text-slate-500">
                                Add a job title first to get better AI suggestions.
                              </p>
                            )}

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
                              placeholder="Add your main duties, one per line."
                              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            {responsibilitySuggestionMessageByExperience[
                              experience.id
                            ] && (
                              <p className="mt-3 text-sm font-medium text-blue-950">
                                {
                                  responsibilitySuggestionMessageByExperience[
                                    experience.id
                                  ]
                                }
                              </p>
                            )}

                            {(responsibilitySuggestionsByExperience[
                              experience.id
                            ] || []).length > 0 && (
                              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                                <p className="text-sm font-extrabold text-blue-950">
                                  ✨ Recommended phrases
                                </p>

                                <div className="mt-3 grid gap-2">
                                  {responsibilitySuggestionsByExperience[
                                    experience.id
                                  ].map((suggestion, suggestionIndex) => (
                                    <button
                                      key={`${suggestion}-${suggestionIndex}`}
                                      type="button"
                                      onClick={() =>
                                        addResponsibilitySuggestionToExperience(
                                          experience.id,
                                          suggestion
                                        )
                                      }
                                      className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-left text-sm leading-6 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                                    >
                                      + {suggestion}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="mt-5">
                            <label className="mb-2 block text-sm font-bold text-slate-800">
                              Key achievements
                            </label>
                            <textarea
                              rows={4}
                              value={experience.achievements}
                              onChange={(event) =>
                                updateWorkExperience(
                                  experience.id,
                                  "achievements",
                                  event.target.value
                                )
                              }
                              placeholder="Add one achievement per line, if useful."
                              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={addWorkExperience}
                      className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-extrabold text-blue-700 hover:bg-blue-100"
                    >
                      + Add another experience
                    </button>

                    <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                      >
                        Continue →
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 5 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 5
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        Education & Training
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Add education, licences, certificates and aviation systems.
                      </p>
                    </div>

                    <div className="mt-6 space-y-6">
                      {formData.educationItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                        >
                          <div className="mb-5 flex items-center justify-between gap-4">
                            <h3 className="font-extrabold text-slate-950">
                              Education {index + 1}
                            </h3>

                            {formData.educationItems.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeEducationItem(item.id)}
                                className="text-sm font-extrabold text-red-600 hover:text-red-700"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid gap-5 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
                                Location
                              </label>
                              <input
                                type="text"
                                value={item.location}
                                onChange={(event) =>
                                  updateEducationItem(
                                    item.id,
                                    "location",
                                    event.target.value
                                  )
                                }
                                placeholder="e.g. London, UK"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-bold text-slate-800">
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
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                          <textarea
                            rows={4}
                            value={item.details}
                            onChange={(event) =>
                              updateEducationItem(
                                item.id,
                                "details",
                                event.target.value
                              )
                            }
                            placeholder="Add relevant modules, aviation projects, grades or achievements if useful."
                            className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={addEducationItem}
                      className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-extrabold text-blue-700 hover:bg-blue-100"
                    >
                      + Add another education
                    </button>

                    <div className="mt-8 space-y-6 border-t border-slate-200 pt-6">
                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-800">
                          Suggested aviation licences
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {aviationLicences.map((licence) => {
                            const selected =
                              formData.selectedLicences.includes(licence);

                            return (
                              <button
                                key={licence}
                                type="button"
                                onClick={() =>
                                  toggleSelectedValue("selectedLicences", licence)
                                }
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                  selected
                                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                }`}
                              >
                                {selected ? "✓ " : ""}
                                {licence}
                              </button>
                            );
                          })}
                        </div>

                        <textarea
                          id="otherLicences"
                          name="otherLicences"
                          rows={2}
                          value={formData.otherLicences}
                          onChange={handleTextChange}
                          placeholder="Add any other licences."
                          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-800">
                          Certificates and training
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {aviationCertifications.map((certificate) => {
                            const selected =
                              formData.selectedCertifications.includes(certificate);

                            return (
                              <button
                                key={certificate}
                                type="button"
                                onClick={() =>
                                  toggleSelectedValue(
                                    "selectedCertifications",
                                    certificate
                                  )
                                }
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                  selected
                                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                }`}
                              >
                                {selected ? "✓ " : ""}
                                {certificate}
                              </button>
                            );
                          })}
                        </div>

                        <textarea
                          id="otherCertifications"
                          name="otherCertifications"
                          rows={2}
                          value={formData.otherCertifications}
                          onChange={handleTextChange}
                          placeholder="Add any other certificates or training."
                          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-800">
                          Aviation systems and tools
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {aviationSystems.map((system) => {
                            const selected =
                              formData.selectedSystems.includes(system);

                            return (
                              <button
                                key={system}
                                type="button"
                                onClick={() =>
                                  toggleSelectedValue("selectedSystems", system)
                                }
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                  selected
                                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                }`}
                              >
                                {selected ? "✓ " : ""}
                                {system}
                              </button>
                            );
                          })}
                        </div>

                        <textarea
                          id="otherSystems"
                          name="otherSystems"
                          rows={2}
                          value={formData.otherSystems}
                          onChange={handleTextChange}
                          placeholder="Add any other systems, tools or software."
                          className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                      >
                        Continue →
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 6 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 6
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        Additional Sections
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Add optional details only if they strengthen your CV.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="rightToWork"
                          className="mb-2 block text-sm font-bold text-slate-800"
                        >
                          Right to work
                        </label>
                        <select
                          id="rightToWork"
                          name="rightToWork"
                          value={formData.rightToWork}
                          onChange={handleTextChange}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                            className="mb-2 block text-sm font-bold text-slate-800"
                          >
                            Right to work valid until
                          </label>
                          <input
                            id="rightToWorkUntil"
                            name="rightToWorkUntil"
                            type="date"
                            value={formData.rightToWorkUntil}
                            onChange={handleTextChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="drivingLicence"
                          className="mb-2 block text-sm font-bold text-slate-800"
                        >
                          Driving licence
                        </label>
                        <select
                          id="drivingLicence"
                          name="drivingLicence"
                          value={formData.drivingLicence}
                          onChange={handleTextChange}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                          className="mb-2 block text-sm font-bold text-slate-800"
                        >
                          Availability / notice period
                        </label>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={handleTextChange}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="">Choose an option</option>
                          {availabilityOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formData.availability ===
                        "Available from a specific date" && (
                        <div>
                          <label
                            htmlFor="availableFrom"
                            className="mb-2 block text-sm font-bold text-slate-800"
                          >
                            Available from
                          </label>
                          <input
                            id="availableFrom"
                            name="availableFrom"
                            type="date"
                            value={formData.availableFrom}
                            onChange={handleTextChange}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-6 space-y-5">
                      <textarea
                        id="languages"
                        name="languages"
                        rows={3}
                        value={formData.languages}
                        onChange={handleTextChange}
                        placeholder="Languages, e.g. English fluent, Hindi fluent."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={handleTextChange}
                        placeholder="Additional professional information such as airside experience, shift flexibility, relocation flexibility or airport ID experience."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <input
                        id="references"
                        name="references"
                        type="text"
                        value={formData.references}
                        onChange={handleTextChange}
                        placeholder="References available on request"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="rounded-2xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                      >
                        Review CV →
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 7 && (
                  <>
                    <div>
                      <p className="text-sm font-extrabold text-blue-700">
                        Step 7
                      </p>
                      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                        Review & Generate
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">
                        Review the live preview, generate your AI CV draft and download it as Word.
                      </p>
                    </div>

                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                      <p className="text-sm font-extrabold text-blue-950">
                        Ready to generate your aviation CV?
                      </p>
                      <p className="mt-2 text-sm leading-6 text-blue-900">
                        AirportCV will use the details you entered to create a professional UK-style aviation CV draft. Review it before applying.
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={goToPreviousStep}
                          className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                        >
                          ← Back
                        </button>

                        <button
                          type="button"
                          onClick={handleGenerateCV}
                          disabled={isGenerating}
                          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          {isGenerating ? "Generating CV..." : "Generate my aviation CV"}
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadWord}
                          disabled={!generatedCV || isDownloading}
                          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                          {isDownloading ? "Preparing..." : "Download Word"}
                        </button>
                      </div>
                    </div>

                    {generateMessage && (
                      <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                        {generateMessage}
                      </div>
                    )}

                    {generatedCV && (
                      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                        <h2 className="text-lg font-extrabold text-emerald-950">
                          Your aviation CV draft is ready
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-emerald-900">
                          Download your Word CV, edit it if needed, then check the final version with the Aviation CV Checker.
                        </p>

                        {downloadMessage && (
                          <p className="mt-3 text-sm font-semibold text-green-800">
                            {downloadMessage}
                          </p>
                        )}

                        <Link
                          href="/cv-checker"
                          className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-blue-700"
                        >
                          Check this CV with Aviation CV Checker
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </form>

            <aside className="min-w-0 xl:sticky xl:top-[92px] xl:self-start">
  <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-950">
          Live CV Preview
        </h2>

        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Updates as you type
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-1 text-sm font-bold text-slate-600">
        <span className="inline-flex rounded-xl bg-white px-4 py-2 text-blue-700 shadow-sm">
          Preview
        </span>
        <span className="inline-flex px-4 py-2 text-slate-500">
          ATS Score
        </span>
      </div>
    </div>

    <div className="mt-5 rounded-3xl bg-slate-100 p-4">
      <div className="mx-auto aspect-[210/297] w-full max-w-[430px] overflow-hidden bg-white px-6 py-7 shadow-2xl shadow-slate-300/70 ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-xl font-extrabold uppercase tracking-wide text-slate-950">
              {formData.fullName || "YOUR NAME"}
            </h3>

            <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-blue-700">
              Aviation Professional
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xl">
            ✈️
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-b border-slate-200 pb-3 text-[9px] font-medium text-slate-600">
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

        <section className="mt-4">
          <h4 className="border-b-2 border-blue-600 pb-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-950">
            Professional Summary
          </h4>

          <p className="mt-2 text-[10px] leading-4 text-slate-700">
            {formData.profile ||
              "Your professional profile will appear here. Add a short summary of your aviation background, strengths and career goal."}
          </p>
        </section>

        <section className="mt-4">
          <h4 className="border-b-2 border-blue-600 pb-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-950">
            Key Skills
          </h4>

          {skillsPreview ? (
            <div className="mt-2 grid gap-x-5 gap-y-1 sm:grid-cols-2">
              {skillsPreview
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
                .slice(0, 10)
                .map((skill) => (
                  <p key={skill} className="flex gap-1.5 text-[10px] text-slate-700">
                    <span className="font-extrabold text-blue-600">✓</span>
                    <span>{skill}</span>
                  </p>
                ))}
            </div>
          ) : (
            <p className="mt-2 text-[10px] leading-4 text-slate-600">
              Selected aviation skills will appear here.
            </p>
          )}
        </section>

        <section className="mt-4">
          <h4 className="border-b-2 border-blue-600 pb-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-950">
            Professional Experience
          </h4>

          <div className="mt-2.5 space-y-3">
            {formData.workExperiences.slice(0, 3).map((experience) => (
              <div key={experience.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[10px] font-extrabold text-slate-950">
                    {experience.jobTitle || "Job title"}
                    {experience.companyName
                      ? ` | ${experience.companyName}`
                      : ""}
                  </p>

                  <p className="shrink-0 text-[9px] font-bold text-slate-600">
                    {getExperienceDates(experience)}
                  </p>
                </div>

                <p className="mt-0.5 text-[9px] font-semibold text-slate-500">
                  {experience.location || "Location"}
                </p>

                {experience.responsibilities ? (
                  <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-[9.5px] leading-4 text-slate-700">
                    {experience.responsibilities
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .slice(0, 5)
                      .map((item) => (
                        <li key={item}>{item.replace(/^[•\-+]\s*/, "")}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="mt-1.5 text-[9.5px] leading-4 text-slate-700">
                    Main responsibilities will appear here.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <h4 className="border-b-2 border-blue-600 pb-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-950">
            Education & Training
          </h4>

          <div className="mt-2.5 space-y-2">
            {formData.educationItems.slice(0, 2).map((item) => (
              <div key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[10px] font-extrabold text-slate-950">
                    {item.qualificationName || "Qualification"}
                    {item.institutionName
                      ? ` | ${item.institutionName}`
                      : ""}
                  </p>

                  <p className="shrink-0 text-[9px] font-bold text-slate-600">
                    {item.completionMonth && item.completionYear
                      ? `${item.completionMonth} ${item.completionYear}`
                      : ""}
                  </p>
                </div>

                <p className="mt-0.5 text-[9px] font-semibold text-slate-500">
                  {item.location || "Location"}
                </p>
              </div>
            ))}
          </div>

          {(licencesPreview || certificationsPreview || systemsPreview) && (
            <div className="mt-2 space-y-0.5 text-[9.5px] leading-4 text-slate-700">
              {licencesPreview && <p>{licencesPreview}</p>}
              {certificationsPreview && <p>{certificationsPreview}</p>}
              {systemsPreview && <p>{systemsPreview}</p>}
            </div>
          )}
        </section>

        {(formData.languages ||
          formData.rightToWork ||
          formData.drivingLicence ||
          formData.availability ||
          formData.additionalInfo ||
          formData.references) && (
          <section className="mt-4">
            <h4 className="border-b-2 border-blue-600 pb-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-950">
              Additional Information
            </h4>

            <div className="mt-2 space-y-0.5 text-[9.5px] leading-4 text-slate-700">
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
                  {formData.availableFrom ? ` ${formData.availableFrom}` : ""}
                </p>
              )}
              {formData.additionalInfo && <p>{formData.additionalInfo}</p>}
              {formData.references && <p>{formData.references}</p>}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
</aside>
          </div>

          <div className="mx-auto mb-6 w-full max-w-[1500px] px-5">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
              <p className="font-extrabold">Privacy note</p>
              <p className="mt-1">
                Only include details that are useful for your CV. Avoid
                unnecessary sensitive information such as passport numbers,
                National Insurance numbers, full home address, date of birth,
                health information or financial details. Read our{" "}
                <Link href="/privacy" className="font-bold underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
