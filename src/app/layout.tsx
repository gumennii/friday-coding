import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare Advocates Directory | Find Your Perfect Healthcare Professional",
  description: "Connect with qualified healthcare advocates specializing in mental health, trauma, pediatrics, and more. Search our comprehensive directory of medical professionals.",
  keywords: "healthcare advocates, medical professionals, mental health, therapy, counseling, healthcare directory"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
