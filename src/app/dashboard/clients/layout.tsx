import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clients | MedSpa Growth Engine",
  description: "Manage your client relationships and track retention",
};

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
