import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://gokulg846.github.io/portfolio/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gokul Gopalakrishnan — Data, AI & Engineering Product Portfolio",
  description: "Evidence-backed product decisions across data systems, AI evaluation, edge engineering, and technical program delivery.",
  icons: {
    icon: `${siteUrl}favicon.svg`,
    shortcut: `${siteUrl}favicon.svg`,
  },
  openGraph: {
    title: "Gokul Gopalakrishnan — Data, AI & Engineering Product Portfolio",
    description: "Evidence-backed product decisions across data systems, AI evaluation, telemetry, inspection, robotics, and edge engineering.",
    url: siteUrl,
    siteName: "Gokul Gopalakrishnan",
    type: "website",
    images: [{ url: `${siteUrl}og.png`, width: 1731, height: 909, alt: "Gokul Gopalakrishnan — AI systems meet physical reality" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokul Gopalakrishnan — Data, AI & Engineering Product Portfolio",
    description: "Product judgment backed by data, ML, and systems engineering evidence.",
    images: [`${siteUrl}og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
