import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "sonner";
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
  title: {
    default: "MedSpa Growth Engine | AI-Powered Revenue Acceleration",
    template: "%s | MedSpa Growth Engine",
  },
  description:
    "Stop losing revenue to missed rebookings. AI-powered treatment pathway intelligence for medical spas.",
  keywords: ["medspa", "medical spa", "revenue", "rebooking", "AI", "client retention"],
  authors: [{ name: "MedSpa Growth Engine" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MedSpa Growth Engine",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
