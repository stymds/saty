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
  title: "Saty",
  description: "Personal portfolio of Satyam Das.",
  keywords: [
    "portfolio",
    "software developer",
    "web developer",
    "full stack developer",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "shadcn",
    "frontend developer",
    "Satyam Das",
  ],
  authors: [{ name: "Satyam Das", url: "https://satyamdas.site" }],
  openGraph: {
    title: "Saty",
    description: "Personal portfolio of Satyam Das.",
    url: "https://satyamdas.site",
    siteName: "Satyam Das",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saty",
    description: "Personal portfolio of Satyam Das.",
    creator: "@stymds",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://satyamdas.site"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
