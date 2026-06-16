"use client";

import Image from "next/image";
import { useState } from "react";

const guides = [
  {
    badge: "New guide",
    category: "CV Advice",
    title: "Why a Simple ATS-Friendly CV Is Enough for Airport Jobs",
    description:
      "A practical guide on why a clear, honest aviation CV matters — but why interview preparation matters more than over-perfecting your CV design.",
    href: "/blog/simple-ats-cv-airport-jobs",
    image: "/blog/simple-ats-cv-airport-jobs.png",
    alt: "Simple ATS-friendly CV and interview preparation guide",
    tags: ["ATS-friendly CV", "Interview prep", "Airport jobs"],
    cta: "Read CV guide →",
  },
  {
    badge: "Career guide",
    category: "Airport Careers",
    title: "How to Become an Airport Passenger Service Agent in the UK",
    description:
      "Discover what passenger service agents do, useful skills, shift patterns, career progression and how to make your CV stronger.",
    href: "/blog/passenger-service-agent-guide",
    image: "/blog/passenger-service-agent-guide.png",
    alt: "Airport passenger service agent career guide",
    tags: ["Passenger service", "Airport careers", "CV tips"],
    cta: "Read guide →",
  },
];

export default function HomeBlogSlider() {
  const [active, setActive] = useState(0);
  const guide = guides[active];

  function previousGuide() {
    setActive((current) => (current === 0 ? guides.length - 1 : current - 1));
  }

  function nextGuide() {
    setActive((current) => (current === guides.length - 1 ? 0 : current + 1));
  }

  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="flex items-center justify-center bg-slate-950 p-4 lg:min-h-[430px]">
          <Image
            key={guide.image}
            src={guide.image}
            alt={guide.alt}
            width={1600}
            height={900}
            className="h-auto w-full rounded-[1.5rem] object-contain transition duration-300"
            priority={active === 0}
          />
        </div>

        <div className="flex flex-col justify-between p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">
                {guide.badge}
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
                {guide.category}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">
              {guide.title}
            </h3>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {guide.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-600">
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-4 py-2 ring-1 ring-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={guide.href}
              className="mt-8 inline-flex rounded-2xl bg-blue-600 px-6 py-3 font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              {guide.cta}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <div className="flex gap-2">
              {guides.map((item, index) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${item.title}`}
                  className={`h-3 rounded-full transition ${
                    active === index
                      ? "w-8 bg-blue-600"
                      : "w-3 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={previousGuide}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={nextGuide}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
