"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-16">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Stop Leaving
            <br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              Money on the Table?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-teal-100/90">
            Join 500+ MedSpas already using Growth Engine to recover lost revenue
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-amber-300" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">34%</p>
              <p className="text-sm text-teal-200/80">Avg. revenue increase</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <Clock className="h-5 w-5 text-amber-300" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">30 days</p>
              <p className="text-sm text-teal-200/80">ROI positive</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10"
        >
          <Link
            href="/onboarding"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-teal-700 shadow-xl shadow-black/15 transition-all duration-200 hover:bg-amber-50 hover:shadow-2xl hover:shadow-black/20"
          >
            Start Your Free 14-Day Trial
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-sm text-teal-200/70">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
