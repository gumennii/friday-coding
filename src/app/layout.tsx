import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solace Health | Find Your Perfect Healthcare Advocate",
  description:
    "Don't navigate your health alone. Connect with qualified healthcare advocates who will guide you through your medical journey and ensure you get the support you deserve.",
  keywords:
    "healthcare advocates, patient advocacy, medical guidance, healthcare navigation, health support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
