import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AirportCV | CV Checker for UK Airport Jobs",
  description:
    "AirportCV helps UK airport job seekers improve their CV, find best-fit airport roles, generate ATS-friendly CV drafts and prepare for interviews.",
  keywords: [
    "UK airport jobs",
    "airport CV",
    "Heathrow jobs CV",
    "Gatwick jobs CV",
    "Passenger Service Agent CV",
    "Ramp Agent CV",
    "Baggage Handler CV",
    "Airport Security CV",
    "Flight Dispatcher CV",
    "Load Controller CV",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
