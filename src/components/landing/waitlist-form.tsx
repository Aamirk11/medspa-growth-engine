"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [spaName, setSpaName] = useState("");
  const [providers, setProviders] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !spaName || !providers) return;

    setIsSubmitting(true);

    // Simulate async + save to localStorage
    setTimeout(() => {
      const entry = {
        email,
        spaName,
        providers,
        timestamp: new Date().toISOString(),
      };

      const existing = JSON.parse(
        localStorage.getItem("waitlist") || "[]"
      );
      existing.push(entry);
      localStorage.setItem("waitlist", JSON.stringify(existing));

      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-b from-white via-teal-50/30 to-teal-50 py-24 dark:from-background dark:via-teal-900/10 dark:to-teal-900/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Get Early Access
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Join the Waitlist
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Be the first to know when we launch. Early access members get 30%
              off their first 3 months.
            </p>
          </motion.div>

          {/* Form / Success State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 rounded-2xl border border-border/50 bg-card p-6 shadow-lg sm:p-8"
                >
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@yourmedspa.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {/* MedSpa Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="spa-name"
                      className="text-sm font-medium text-foreground"
                    >
                      MedSpa Name
                    </label>
                    <Input
                      id="spa-name"
                      type="text"
                      placeholder="e.g. Radiance MedSpa"
                      required
                      value={spaName}
                      onChange={(e) => setSpaName(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {/* Providers */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Number of Providers
                    </label>
                    <Select
                      value={providers}
                      onValueChange={(v) => setProviders(v ?? "")}
                    >
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select provider count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2-5">2-5</SelectItem>
                        <SelectItem value="6-10">6-10</SelectItem>
                        <SelectItem value="10+">10+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 h-12 w-full gap-2 bg-teal-600 text-base font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="size-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Join the Waitlist
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-800 dark:bg-teal-900/20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.2,
                    }}
                  >
                    <CheckCircle2 className="size-16 text-teal-600 dark:text-teal-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">
                    You&apos;re on the list!
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    Thanks for joining! We&apos;ll send you an exclusive early access
                    invite with your 30% discount when we launch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
