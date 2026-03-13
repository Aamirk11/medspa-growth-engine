"use client";

import { motion } from "framer-motion";
import { Users, ArrowDown, AlertTriangle, Star, CalendarX, Frown } from "lucide-react";

const funnelSteps = [
  {
    label: "1,000 Monthly Clients",
    icon: Users,
    type: "source" as const,
    width: "100%",
    color: "teal",
  },
  {
    label: "First Visit Completed",
    icon: Users,
    type: "step" as const,
    width: "85%",
    color: "teal",
  },
  {
    label: "No Follow-up System",
    icon: CalendarX,
    type: "leak" as const,
    width: "65%",
    color: "red",
    leak: "450 clients lost",
    leakAmount: "$157,500/yr",
  },
  {
    label: "No Review Requests",
    icon: Star,
    type: "leak" as const,
    width: "45%",
    color: "red",
    leak: "Missing 200+ reviews",
    leakAmount: "$60,000/yr in lost new clients",
  },
  {
    label: "No Rebooking Reminders",
    icon: AlertTriangle,
    type: "leak" as const,
    width: "30%",
    color: "red",
    leak: "Missed rebookings",
    leakAmount: "$94,500/yr",
  },
  {
    label: "Only 35% Return",
    icon: Frown,
    type: "result" as const,
    width: "20%",
    color: "gray",
  },
];

export function RevenuLeakDiagram() {
  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(239,68,68,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600 dark:bg-red-950 dark:text-red-400">
            Revenue Analysis
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Where Your{" "}
            <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              Revenue Leaks
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every month, hundreds of thousands of dollars slip through the cracks. Here&apos;s exactly where it happens.
          </p>
        </motion.div>

        {/* Funnel Diagram */}
        <div className="flex flex-col items-center gap-0">
          {funnelSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex w-full flex-col items-center"
            >
              {/* Arrow between steps */}
              {index > 0 && (
                <div className="my-1 flex flex-col items-center">
                  <ArrowDown className="size-5 text-muted-foreground/40" />
                </div>
              )}

              {/* Funnel bar */}
              <div
                className="relative mx-auto"
                style={{ width: step.width, maxWidth: "100%" }}
              >
                {step.type === "source" && (
                  <div className="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-5 text-center shadow-lg shadow-teal-500/20">
                    <div className="flex items-center justify-center gap-2">
                      <step.icon className="size-6 text-white" />
                      <span className="text-lg font-bold text-white sm:text-xl">
                        {step.label}
                      </span>
                    </div>
                  </div>
                )}

                {step.type === "step" && (
                  <div className="rounded-xl border border-teal-200 bg-teal-50/50 px-6 py-4 text-center dark:border-teal-800 dark:bg-teal-950/30">
                    <div className="flex items-center justify-center gap-2">
                      <step.icon className="size-5 text-teal-600 dark:text-teal-400" />
                      <span className="font-semibold text-teal-700 dark:text-teal-300">
                        {step.label}
                      </span>
                    </div>
                  </div>
                )}

                {step.type === "leak" && (
                  <div className="relative">
                    <div className="rounded-xl border border-red-200/80 bg-red-50/80 px-6 py-4 dark:border-red-900/40 dark:bg-red-950/20">
                      <div className="flex items-center justify-center gap-2">
                        <step.icon className="size-5 text-red-500" />
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {step.label}
                        </span>
                      </div>
                    </div>
                    {/* Leak indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full"
                    >
                      <div className="hidden items-center gap-2 sm:flex">
                        <div className="h-px w-6 bg-red-300 dark:bg-red-700" />
                        <div className="whitespace-nowrap rounded-lg border border-red-200 bg-white px-3 py-2 shadow-sm dark:border-red-900 dark:bg-background">
                          <motion.div
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs font-medium text-red-500"
                          >
                            {step.leak}
                          </motion.div>
                          <div className="text-sm font-bold text-red-600 dark:text-red-400">
                            {step.leakAmount}
                          </div>
                        </div>
                      </div>
                      {/* Mobile leak info - below the bar */}
                    </motion.div>
                    {/* Mobile-only leak info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                      className="mt-2 text-center sm:hidden"
                    >
                      <span className="text-xs text-red-500">{step.leak}</span>
                      <span className="mx-1 text-xs text-muted-foreground">&middot;</span>
                      <span className="text-xs font-bold text-red-600">{step.leakAmount}</span>
                    </motion.div>
                  </div>
                )}

                {step.type === "result" && (
                  <div className="rounded-xl border border-muted bg-muted/50 px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <step.icon className="size-5 text-muted-foreground" />
                      <span className="font-semibold text-muted-foreground">
                        {step.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-100/50 p-6 text-center shadow-md dark:border-red-900/50 dark:from-red-950/30 dark:to-red-950/10"
        >
          <div className="text-sm font-medium uppercase tracking-wider text-red-500">
            Total Annual Revenue Leak
          </div>
          <div className="mt-2 text-4xl font-bold text-red-600 sm:text-5xl dark:text-red-400">
            $312,000
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            That&apos;s money walking out your door every year — recoverable with the right system.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
