"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { AnimatedCounter } from "@/components/shared/animated-counter";

export function RoiCalculator() {
  const [clients, setClients] = useState(500);
  const [avgValue, setAvgValue] = useState(350);
  const [rebookingRate, setRebookingRate] = useState(45);

  const currentRate = rebookingRate / 100;
  const targetRate = 0.8;
  const revenueLost = Math.round(clients * avgValue * (targetRate - currentRate) * 12);
  const revenueWithEngine = Math.round(clients * avgValue * targetRate * 12);
  const currentRevenue = Math.round(clients * avgValue * currentRate * 12);
  const annualIncrease = revenueWithEngine - currentRevenue;

  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-background">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(13,148,136,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-600 dark:bg-teal-950 dark:text-teal-400">
            <Calculator className="size-4" />
            ROI Calculator
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Calculate Your{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">
              Revenue Recovery
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See exactly how much revenue your MedSpa is leaving on the table — and how much you could recover.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Sliders Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm"
          >
            <h3 className="mb-8 text-lg font-bold text-foreground">
              Your MedSpa Numbers
            </h3>

            {/* Monthly Clients */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Monthly clients
                </label>
                <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  {clients.toLocaleString()}
                </span>
              </div>
              <Slider
                min={100}
                max={2000}
                step={50}
                value={clients}
                onChange={setClients}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>100</span>
                <span>2,000</span>
              </div>
            </div>

            {/* Average Treatment Value */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Average treatment value
                </label>
                <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  ${avgValue}
                </span>
              </div>
              <Slider
                min={100}
                max={1000}
                step={25}
                value={avgValue}
                onChange={setAvgValue}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>$100</span>
                <span>$1,000</span>
              </div>
            </div>

            {/* Rebooking Rate */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Current rebooking rate
                </label>
                <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  {rebookingRate}%
                </span>
              </div>
              <Slider
                min={20}
                max={80}
                step={1}
                value={rebookingRate}
                onChange={setRebookingRate}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>20%</span>
                <span>80%</span>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-8 text-white shadow-xl shadow-teal-900/20 dark:from-teal-700 dark:via-teal-800 dark:to-teal-900"
          >
            <h3 className="mb-8 text-lg font-semibold text-teal-100">
              Your Revenue Potential
            </h3>

            {/* Revenue lost */}
            <div className="mb-6 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-red-200">
                <DollarSign className="size-4" />
                Revenue you&apos;re leaving on the table
              </div>
              <div className="text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter
                  key={`lost-${revenueLost}`}
                  value={revenueLost}
                  prefix="$"
                  className="text-3xl font-bold text-white sm:text-4xl"
                />
                <span className="ml-1 text-base font-normal text-teal-200">/year</span>
              </div>
            </div>

            {/* Revenue with engine */}
            <div className="mb-6 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-teal-200">
                <TrendingUp className="size-4" />
                With MedSpa Growth Engine (80% rebooking)
              </div>
              <div className="text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter
                  key={`with-${revenueWithEngine}`}
                  value={revenueWithEngine}
                  prefix="$"
                  className="text-3xl font-bold text-white sm:text-4xl"
                />
                <span className="ml-1 text-base font-normal text-teal-200">/year</span>
              </div>
            </div>

            {/* Annual increase - highlighted */}
            <div className="rounded-xl border-2 border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-amber-600/20 p-5">
              <div className="mb-1 text-sm font-medium text-amber-200">
                Annual revenue increase
              </div>
              <div className="text-4xl font-bold sm:text-5xl">
                <AnimatedCounter
                  key={`increase-${annualIncrease}`}
                  value={annualIncrease}
                  prefix="+$"
                  className="text-4xl font-bold text-amber-300 sm:text-5xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
