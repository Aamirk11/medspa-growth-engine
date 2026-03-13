"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Phone,
  Building2,
  User,
  Stethoscope,
  Target,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useOnboarding, type OnboardingData } from "@/hooks/use-onboarding";
import { business, providers, treatments } from "@/lib/mock-data";

const STEPS = [
  { title: "Welcome", icon: Building2 },
  { title: "Providers", icon: User },
  { title: "Treatments", icon: Stethoscope },
  { title: "Goals", icon: Target },
];

const GOALS = [
  {
    id: "rebookings",
    label: "Increase rebookings",
    description: "Re-engage lapsed clients automatically",
    icon: "📅",
  },
  {
    id: "reviews",
    label: "Grow reviews",
    description: "Build social proof on autopilot",
    icon: "⭐",
  },
  {
    id: "revenue",
    label: "Boost revenue",
    description: "Maximize lifetime client value",
    icon: "💰",
  },
  {
    id: "noshows",
    label: "Reduce no-shows",
    description: "Smart reminders that work",
    icon: "🔔",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function OnboardingWizard() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Step 1: Spa info
  const [spaName, setSpaName] = useState(business.name);
  const [location, setLocation] = useState(
    `${business.address}, ${business.city}, ${business.state} ${business.zip}`
  );
  const [phone, setPhone] = useState(business.phone);

  // Step 2: Providers
  const [selectedProviders, setSelectedProviders] = useState<string[]>(
    providers.map((p) => p.id)
  );

  // Step 3: Treatments
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(
    treatments.map((t) => t.id)
  );

  // Step 4: Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleTreatment = (id: string) => {
    setSelectedTreatments((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleComplete = () => {
    const data: OnboardingData = {
      spaName,
      location,
      phone,
      providers: selectedProviders,
      treatments: selectedTreatments,
      goals: selectedGoals,
    };
    completeOnboarding(data);
    toast.success("Welcome to MedSpa Growth Engine!");
    router.push("/dashboard");
  };

  const isLastStep = step === STEPS.length - 1;

  const categories = Array.from(new Set(treatments.map((t) => t.category)));

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-4 pb-8 pt-6 dark:from-teal-800 dark:to-teal-900">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="size-5" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                MedSpa Growth Engine
              </span>
            </div>
            <span className="text-sm text-teal-200">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress
              value={progress}
              className="h-2 bg-teal-500/30 [&>div]:bg-white"
            />
          </div>

          {/* Step dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                  i === step
                    ? "bg-white text-teal-700 shadow-lg"
                    : i < step
                      ? "bg-teal-400 text-white"
                      : "bg-teal-500/30 text-teal-200"
                }`}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step 1: Welcome + Spa Info */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Welcome! Let&apos;s set up your spa
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      We&apos;ve pre-filled your info. Confirm or update the
                      details below.
                    </p>
                  </div>
                  <Card className="space-y-4 p-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Building2 className="size-4 text-teal-600" />
                        Spa Name
                      </label>
                      <Input
                        value={spaName}
                        onChange={(e) => setSpaName(e.target.value)}
                        placeholder="Your MedSpa name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="size-4 text-teal-600" />
                        Location
                      </label>
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Full address"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Phone className="size-4 text-teal-600" />
                        Phone
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </Card>
                </div>
              )}

              {/* Step 2: Providers */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Your Providers
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Select the providers to include in your growth engine.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {providers.map((provider) => {
                      const isSelected = selectedProviders.includes(
                        provider.id
                      );
                      return (
                        <Card
                          key={provider.id}
                          className={`cursor-pointer p-4 transition-all ${
                            isSelected
                              ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 dark:bg-teal-950/20"
                              : "hover:border-muted-foreground/30"
                          }`}
                          onClick={() => toggleProvider(provider.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                isSelected
                                  ? "bg-teal-600 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {provider.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{provider.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {provider.title}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {provider.specialties.map((s) => (
                                  <Badge
                                    key={s}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                                isSelected
                                  ? "border-teal-500 bg-teal-500 text-white"
                                  : "border-muted-foreground/30"
                              }`}
                            >
                              {isSelected && <Check className="size-4" />}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Treatment Menu */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Treatment Menu
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Toggle the treatments your spa offers.
                    </p>
                  </div>
                  {categories.map((category) => (
                    <div key={category} className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {category}
                      </h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {treatments
                          .filter((t) => t.category === category)
                          .map((treatment) => {
                            const isSelected = selectedTreatments.includes(
                              treatment.id
                            );
                            return (
                              <Card
                                key={treatment.id}
                                className={`cursor-pointer p-4 transition-all ${
                                  isSelected
                                    ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 dark:bg-teal-950/20"
                                    : "hover:border-muted-foreground/30"
                                }`}
                                onClick={() => toggleTreatment(treatment.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold">
                                      {treatment.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      ${treatment.avgPrice} avg &middot;{" "}
                                      {treatment.optimalInterval}
                                    </p>
                                  </div>
                                  <div
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                                      isSelected
                                        ? "border-teal-500 bg-teal-500 text-white"
                                        : "border-muted-foreground/30"
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="size-4" />
                                    )}
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Goals */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                      What are your goals?
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Select one or more goals to personalize your dashboard.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GOALS.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.id);
                      return (
                        <Card
                          key={goal.id}
                          className={`cursor-pointer p-5 transition-all ${
                            isSelected
                              ? "border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 dark:bg-teal-950/20"
                              : "hover:border-muted-foreground/30"
                          }`}
                          onClick={() => toggleGoal(goal.id)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{goal.icon}</span>
                            <div className="flex-1">
                              <p className="font-semibold">{goal.label}</p>
                              <p className="mt-0.5 text-sm text-muted-foreground">
                                {goal.description}
                              </p>
                            </div>
                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                                isSelected
                                  ? "border-teal-500 bg-teal-500 text-white"
                                  : "border-muted-foreground/30"
                              }`}
                            >
                              {isSelected && <Check className="size-4" />}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-background px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={step === 0}
            className="gap-1"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleComplete}
              className="gap-2 bg-teal-600 px-6 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              <Sparkles className="size-4" />
              Get Started
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="gap-1 bg-teal-600 px-6 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              Continue
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
