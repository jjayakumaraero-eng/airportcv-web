import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type MarketingPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const navLinks = [
  { label: "CV Builder", href: "/cv-builder" },
  { label: "CV Checker", href: "/cv-checker" },
  { label: "Interview Prep", href: "/interview-prep" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

const footerTools = [
  { label: "CV Builder", href: "/cv-builder" },
  { label: "CV Checker", href: "/cv-checker" },
  { label: "Interview Prep", href: "/interview-prep" },
  { label: "Cover Letter", href: "/cover-letter" },
  { label: "Career Coach", href: "/career-coach" },
];

const footerResources = [
  { label: "Blog", href: "/blog" },
  { label: "Career Paths", href: "/success-stories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const footerLegal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function MarketingPageShell({
  eyebrow,
  title,
  description,
  children,
}: MarketingPageShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/airportcv-logo-light.png"
              alt="AirportCV"
              width={150}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-extrabold text-slate-700 transition hover:text-blue-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden rounded-2xl bg-slate-100 px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:bg-slate-200 sm:inline-flex"
            >
              Dashboard
            </Link>

            <Link
              href="/cv-builder"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-blue-700 ring-1 ring-blue-100">
            {eyebrow}
          </p>

          <h1 className="mt-7 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>
      </section>

      {children}

      <footer className="border-t border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/airportcv-logo-light.png"
              alt="AirportCV"
              width={170}
              height={48}
              className="h-11 w-auto"
            />

            <p className="mt-5 max-w-sm leading-7 text-slate-600">
              AirportCV helps aviation job seekers create simple ATS-friendly
              CVs, check role fit and prepare for airport interviews.
            </p>
          </div>

          <div>
            <h3 className="font-black text-slate-950">Tools</h3>
            <div className="mt-4 space-y-3">
              {footerTools.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-bold text-slate-600 transition hover:text-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-slate-950">Resources</h3>
            <div className="mt-4 space-y-3">
              {footerResources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-bold text-slate-600 transition hover:text-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-slate-950">Legal</h3>
            <div className="mt-4 space-y-3">
              {footerLegal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-bold text-slate-600 transition hover:text-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-slate-200 pt-6 text-sm font-semibold text-slate-500">
          © {new Date().getFullYear()} AirportCV. Practical aviation career
          tools for airport and airline job seekers.
        </div>
      </footer>
    </main>
  );
}
