"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/hooks/use-onboarding";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export default function OnboardingPage() {
  const router = useRouter();
  const { isComplete } = useOnboarding();

  useEffect(() => {
    if (isComplete === true) {
      router.push("/dashboard");
    }
  }, [isComplete, router]);

  // Loading state
  if (isComplete === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Already complete, waiting for redirect
  if (isComplete === true) {
    return null;
  }

  return <OnboardingWizard />;
}
