import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type MarketingPageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function MarketingPageShell({
  eyebrow,
  title,
  description,
  children,
}: MarketingPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/airportcv-logo-light.png"
              alt="AirportCV"
              width={180}
              height={52}
              className="h-auto w-36"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <Link href="/cv-builder" className="hover:text-blue-700">
              CV Builder
            </Link>
            <Link href="/cv-checker" className="hover:text-blue-700">
              CV Checker
            </Link>
            <Link href="/pricing" className="hover:text-blue-700">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-blue-700">
              Blog
            </Link>
          </nav>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Open tools
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-20">
        <div className="absolute left-1/2 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          {eyebrow && (
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-blue-700">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>
      </section>

      <div>{children}</div>

      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Image
            src="/airportcv-logo-light.png"
            alt="AirportCV"
            width={180}
            height={52}
            className="h-auto w-36"
          />

          <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-500">
            <Link href="/about" className="hover:text-blue-700">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-700">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-blue-700">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-700">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
