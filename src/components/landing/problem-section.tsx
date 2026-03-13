"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const withoutItems = [
  "68% of clients never rebook after their first visit",
  "$300K+ in annual revenue walks out the door",
  "Staff spends 15+ hours/week on manual follow-ups",
  "Negative reviews go undetected until it's too late",
  "No visibility into revenue pipeline",
];

const withItems = [
  "AI identifies every client due for rebooking",
  "Recover up to $300K in lost annual revenue",
  "Automated follow-ups save 15+ hours/week",
  "Intercept negative reviews before they go public",
  "30/60/90 day revenue forecasting",
];

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 dark:bg-muted/10">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-950/10" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-50/50 to-transparent dark:from-emerald-950/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            The Problem
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Your MedSpa Is{" "}
            <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              Leaking Revenue
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Most MedSpas lose thousands every month without even knowing it.
            Here&apos;s what changes with Growth Engine.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* WITHOUT column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-red-200/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-red-900/30 dark:bg-background/80"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
                Without MedSpa Growth Engine
              </h3>
            </div>
            <ul className="space-y-4">
              {withoutItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                    <X className="h-3.5 w-3.5 text-red-500" />
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* WITH column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-emerald-200/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-emerald-900/30 dark:bg-background/80"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
                <Check className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                With MedSpa Growth Engine
              </h3>
            </div>
            <ul className="space-y-4">
              {withItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </span>
                  <span className="text-foreground leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
