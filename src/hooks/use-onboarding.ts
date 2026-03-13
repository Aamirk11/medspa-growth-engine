"use client";

import { useState, useEffect, useCallback } from "react";

const ONBOARDING_COMPLETE_KEY = "medspa-onboarding-complete";
const ONBOARDING_DATA_KEY = "medspa-onboarding-data";

export interface OnboardingData {
  spaName?: string;
  location?: string;
  phone?: string;
  providers?: string[];
  treatments?: string[];
  goals?: string[];
}

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [data, setData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const complete = localStorage.getItem(ONBOARDING_COMPLETE_KEY) === "true";
    setIsComplete(complete);
    const stored = localStorage.getItem(ONBOARDING_DATA_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(null);
      }
    }
  }, []);

  const completeOnboarding = useCallback((onboardingData: OnboardingData) => {
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
    localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(onboardingData));
    setIsComplete(true);
    setData(onboardingData);
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
    localStorage.removeItem(ONBOARDING_DATA_KEY);
    setIsComplete(false);
    setData(null);
  }, []);

  return { isComplete, data, completeOnboarding, resetOnboarding };
}
