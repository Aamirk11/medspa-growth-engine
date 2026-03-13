"use client";

import { motion } from "framer-motion";
import { Plug, Brain, TrendingUp } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Connect Your PMS",
    description:
      "Sync your appointment data from Boulevard, Vagaro, or Mindbody in one click",
    icon: Plug,
  },
  {
    number: 2,
    title: "AI Analyzes Patterns",
    description:
      "Our AI maps treatment pathways, identifies at-risk clients, and predicts revenue",
    icon: Brain,
  },
  {
    number: 3,
    title: "Watch Revenue Grow",
    description:
      "Automated rebooking, smart review requests, and revenue pipeline tracking",
    icon: TrendingUp,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-background">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(13,148,136,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-600 dark:bg-teal-950 dark:text-teal-400">
            Simple Setup
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Get started in minutes, see results in days
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8"
        >
          {/* Connecting line (desktop only) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[72px] z-0 hidden md:block">
            <div className="mx-auto h-[2px] w-[60%]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="h-full w-full origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, #0D9488 0%, #D97706 50%, #0D9488 100%)",
                  opacity: 0.3,
                }}
              />
            </div>
          </div>

          {/* Connecting line (mobile only) */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 w-[2px] -translate-x-1/2 md:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full w-full origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #0D9488 0%, #D97706 50%, #0D9488 100%)",
                opacity: 0.2,
              }}
            />
          </div>

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Number circle */}
              <div className="relative mb-6">
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-teal-100 ring-4 ring-white dark:from-teal-950 dark:to-teal-900 dark:ring-background">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25">
                    <step.icon className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                </div>
                {/* Step number badge */}
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white shadow-md">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto max-w-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
