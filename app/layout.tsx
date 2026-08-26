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
  title: "AIPath Africa",
  description:
    "Connecting African talent with global AI opportunities, learning resources, and career growth.",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "Remote Jobs",
    "Data Annotation",
    "Africa",
    "Machine Learning",
    "AI Careers",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#09090B] text-white">
        {children}
      </body>
    </html>
  );
}