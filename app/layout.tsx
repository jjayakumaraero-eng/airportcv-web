import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "AirportCV | AI Career Platform for Airport & Aviation Jobs",
  description:
    "AirportCV helps airport and aviation professionals improve their CV, prepare for interviews, generate cover letters and progress their careers.",
  verification: {
  google: "7W4svbnCO7Yg9DV0zeWDXuKZC_7NIjvYnPtXdTaNi6c",
},
    keywords: [
    "UK airport jobs",
    "airport CV",
    "aviation careers",
    "cabin crew CV",
    "Heathrow jobs CV",
    "Gatwick jobs CV",
    "Passenger Service Agent CV",
    "Ramp Agent CV",
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
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">

        <ClerkProvider>{children}</ClerkProvider>
              <CookieConsent />
      </body>
    </html>
  );
}