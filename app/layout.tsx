import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drop City — AR Location Drops",
  description: "Leave AR messages pinned to real-world coordinates. Digital graffiti for the real world.",
  keywords: ["AR", "augmented reality", "location", "social", "graffiti", "drops", "iOS"],
  authors: [{ name: "Drop City" }],
  openGraph: {
    title: "Drop City — AR Location Drops",
    description: "Leave AR messages pinned to real-world coordinates. Digital graffiti for the real world.",
    url: "https://dropcity.io",
    siteName: "Drop City",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drop City — AR Location Drops",
    description: "Leave AR messages pinned to real-world coordinates. Digital graffiti for the real world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-paper text-gray-700 dark:bg-gray-900 dark:text-gray-100`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
