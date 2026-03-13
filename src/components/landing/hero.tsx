"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
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

const floatingVariant = (duration: number, y: number) => ({
  y: [0, y, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-teal-50/50 to-white pb-14 pt-28 dark:from-teal-900/20 dark:via-background dark:to-background">
      {/* Dot grid background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-800/10" />
        <div className="absolute -left-20 top-1/2 h-[400px] w-[400px] rounded-full bg-gold-100/40 blur-3xl dark:bg-gold-500/5" />
        <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />

        {/* Floating geometric shapes */}
        <motion.div
          animate={floatingVariant(6, -20)}
          className="absolute right-[15%] top-[20%] h-16 w-16 rounded-2xl border border-teal-200/40 bg-teal-100/20 backdrop-blur-sm dark:border-teal-700/30 dark:bg-teal-800/10"
        />
        <motion.div
          animate={floatingVariant(8, 15)}
          className="absolute left-[10%] top-[35%] h-10 w-10 rounded-full border border-gold-200/40 bg-gold-100/20 backdrop-blur-sm dark:border-gold-600/20 dark:bg-gold-500/10"
        />
        <motion.div
          animate={floatingVariant(7, -12)}
          className="absolute right-[8%] bottom-[30%] h-12 w-12 rotate-45 rounded-lg border border-teal-300/30 bg-teal-50/30 backdrop-blur-sm dark:border-teal-700/20 dark:bg-teal-800/10"
        />
        <motion.div
          animate={floatingVariant(5, 18)}
          className="absolute left-[20%] bottom-[20%] h-8 w-8 rounded-full border border-teal-200/50 bg-teal-100/30 dark:border-teal-700/30 dark:bg-teal-800/15"
        />
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
            <span className="text-gradient">Stop Losing</span>{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">
                $300K/Year
              </span>
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500" />
            </span>{" "}
            <span className="text-gradient">to Missed Rebookings</span>
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
            className="mt-8 flex flex-col items-center gap-2"
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
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
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

        {/* Mini Dashboard Preview */}
        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-white/80 shadow-2xl shadow-teal-600/10 backdrop-blur-sm dark:bg-card/80">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
              </div>
              <div className="mx-auto h-5 w-48 rounded-md bg-muted/60" />
            </div>
            {/* Dashboard mockup content */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: TrendingUp, label: "Recovery Rate", value: "89%" },
                  { icon: Users, label: "Active Clients", value: "1,247" },
                  { icon: DollarSign, label: "Revenue", value: "$47K" },
                  { icon: BarChart3, label: "Rebookings", value: "342" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/40 bg-muted/20 p-3 text-center"
                  >
                    <stat.icon className="mx-auto mb-1 h-4 w-4 text-teal-500" />
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                    <div className="text-sm font-bold text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>
              {/* Fake chart area */}
              <div className="mt-4 flex items-end gap-1.5 rounded-lg bg-muted/20 p-4">
                {[40, 55, 35, 70, 50, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-teal-500 to-teal-300 dark:from-teal-600 dark:to-teal-400"
                    style={{ height: `${h * 0.6}px`, opacity: 0.5 + (h / 200) }}
                  />
                ))}
              </div>
            </div>
            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-background/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
