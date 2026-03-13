import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | MedSpa Growth Engine",
  description: "Monitor and manage your online reviews",
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
