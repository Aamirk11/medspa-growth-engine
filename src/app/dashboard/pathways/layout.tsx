import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatment Pathways | MedSpa Growth Engine",
  description: "AI-powered treatment pathway optimization",
};

export default function PathwaysLayout({ children }: { children: React.ReactNode }) {
  return children;
}
