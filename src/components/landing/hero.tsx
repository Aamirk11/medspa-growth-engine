"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-teal-50/50 to-white pb-14 pt-28 dark:from-teal-900/20 dark:via-background dark:to-background">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-800/10" />
        <div className="absolute -left-20 top-1/2 h-[400px] w-[400px] rounded-full bg-gold-100/40 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-teal-700 shadow-sm backdrop-blur-sm dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              AI-Powered MedSpa Intelligence
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Stop Losing{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">
                $300K/Year
              </span>
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500" />
            </span>{" "}
            to Missed Rebookings
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            The AI-powered rebooking intelligence platform that identifies at-risk clients,
            automates follow-ups, and turns your MedSpa into a revenue machine.
          </motion.p>

          {/* Animated Counter */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Average annual revenue recovered
            </p>
            <AnimatedCounter
              value={300000}
              prefix="$"
              className="text-5xl font-bold text-teal-600 sm:text-6xl dark:text-teal-400"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="h-12 gap-2 rounded-full bg-teal-600 px-8 text-base font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
              render={<Link href="/onboarding" />}
            >
              Start Free Trial
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 gap-2 rounded-full px-8 text-base font-semibold"
              render={<a href="#features" />}
            >
              <Play className="size-4" />
              See How It Works
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 text-sm text-muted-foreground"
          >
            Trusted by <span className="font-semibold text-foreground">500+</span> MedSpas across the US
          </motion.p>
        </div>
      </div>
    </section>
  );
}
