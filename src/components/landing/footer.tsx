"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const legalDialogs = [
  {
    label: "Privacy",
    title: "Privacy Policy",
    content:
      "MedSpa Growth Engine is committed to protecting your privacy. We collect only the information necessary to provide our services, including practice data, client records, and usage analytics. Your data is encrypted at rest and in transit. We never sell your personal information to third parties. For questions about our privacy practices, contact privacy@medspagrowth.com.",
  },
  {
    label: "Terms",
    title: "Terms of Service",
    content:
      "By using MedSpa Growth Engine, you agree to these terms. Our platform is provided as-is for medical spa practice management. You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to modify or discontinue the service at any time. Subscription fees are billed monthly and are non-refundable. For the full terms, contact legal@medspagrowth.com.",
  },
  {
    label: "HIPAA",
    title: "HIPAA Compliance",
    content:
      "MedSpa Growth Engine maintains full HIPAA compliance for all protected health information (PHI). We implement administrative, physical, and technical safeguards including AES-256 encryption, role-based access controls, audit logging, and regular security assessments. We sign Business Associate Agreements (BAAs) with all customers. Our infrastructure is hosted on HIPAA-eligible cloud services with SOC 2 Type II certification.",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600 dark:bg-teal-500">
              <svg
                className="size-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">
              MedSpa Growth Engine
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MedSpa Growth Engine. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {legalDialogs.map((item) => (
              <Dialog key={item.label}>
                <DialogTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                  {item.label}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
