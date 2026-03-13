import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | MedSpa Growth Engine",
  description: "Configure your business settings",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
