import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Pipeline | MedSpa Growth Engine",
  description: "Track and forecast your revenue pipeline",
};

export default function PipelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
