import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TY2MBRC7F6');
          `}
        </Script>
        <Script id="microsoft-clarity">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x4btwtfqfb");
  `}
</Script>

        {children}
      </body>
    </html>
  );
}