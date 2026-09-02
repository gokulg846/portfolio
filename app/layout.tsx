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
  title: "Gokul Gopalakrishnan — Product Ownership & Engineering Depth",
  description: "I solve technical problems and deliver products that work—across data, AI, engineering, and product execution.",
  icons: {
    icon: `${siteUrl}favicon.svg`,
    shortcut: `${siteUrl}favicon.svg`,
  },
  openGraph: {
    title: "Gokul Gopalakrishnan — Product Ownership & Engineering Depth",
    description: "I solve technical problems and deliver products that work.",
    url: siteUrl,
    siteName: "Gokul Gopalakrishnan",
    type: "website",
    images: [{ url: `${siteUrl}og-v2.png`, width: 1730, height: 909, alt: "Gokul Gopalakrishnan — product ownership and engineering depth across data and AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokul Gopalakrishnan — Product Ownership & Engineering Depth",
    description: "I solve technical problems and deliver products that work.",
    images: [`${siteUrl}og-v2.png`],
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
