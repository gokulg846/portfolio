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
  title: "Gokul Gopalakrishnan — AI PM / TPM / Product Engineer",
  description: "Product decisions, technical requirements, and system tradeoffs at the seam between data/ML and physical systems.",
  icons: {
    icon: `${siteUrl}favicon.svg`,
    shortcut: `${siteUrl}favicon.svg`,
  },
  openGraph: {
    title: "Gokul Gopalakrishnan — AI systems meet physical reality",
    description: "AI PM, TPM, and product engineering case studies across evaluation, telemetry, inspection, robotics, and edge AI.",
    url: siteUrl,
    siteName: "Gokul Gopalakrishnan",
    type: "website",
    images: [{ url: `${siteUrl}og.png`, width: 1731, height: 909, alt: "Gokul Gopalakrishnan — AI systems meet physical reality" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokul Gopalakrishnan — AI systems meet physical reality",
    description: "Product and technical program decisions for data/ML systems that meet physical hardware.",
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
