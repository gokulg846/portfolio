import type { Metadata } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Gokul Gopalakrishnan — AI PM / TPM / Product Engineer",
    description: "Product decisions, technical requirements, and system tradeoffs at the seam between data/ML and physical systems.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Gokul Gopalakrishnan — AI systems meet physical reality",
      description: "AI PM, TPM, and product engineering case studies across evaluation, telemetry, inspection, robotics, and edge AI.",
      url: origin,
      siteName: "Gokul Gopalakrishnan",
      type: "website",
      images: [{ url: "/og.png", width: 1731, height: 909, alt: "Gokul Gopalakrishnan — AI systems meet physical reality" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gokul Gopalakrishnan — AI systems meet physical reality",
      description: "Product and technical program decisions for data/ML systems that meet physical hardware.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
