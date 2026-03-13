"use client";

import { motion } from "framer-motion";
import {
  X,
  Check,
  CalendarX,
  PhoneOff,
  UserX,
  ClipboardX,
  Star,
  CalendarCheck,
  Bot,
  ShieldCheck,
  Sparkles,
  StarIcon,
} from "lucide-react";

const withoutItems = [
  { text: "45% rebooking rate", icon: CalendarX },
  { text: "Manual follow-ups eating staff hours", icon: PhoneOff },
  { text: "Lost revenue from no-shows", icon: UserX },
  { text: "Reactive client management", icon: ClipboardX },
  { text: "3.2\u2605 average reviews", icon: Star },
];

const withItems = [
  { text: "78% rebooking rate", icon: CalendarCheck },
  { text: "AI-powered automated outreach", icon: Bot },
  { text: "Smart no-show prevention", icon: ShieldCheck },
  { text: "Proactive retention engine", icon: Sparkles },
  { text: "4.8\u2605 average reviews", icon: StarIcon },
];

export function BeforeAfter() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 dark:bg-muted/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-red-50/30 to-transparent dark:from-red-950/5" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-teal-50/30 to-transparent dark:from-teal-950/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-600 dark:bg-teal-950 dark:text-teal-400">
            Before & After
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The Difference Is{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-teal-300">
              Clear
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See what happens when you stop guessing and start using AI-powered client retention.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr,auto,1fr]">
          {/* WITHOUT Column */}
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
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/50">
                    <item.icon className="h-4 w-4 text-red-400" />
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            {/* Summary stat */}
            <div className="mt-8 rounded-xl bg-red-50/50 p-4 text-center dark:bg-red-950/20">
              <div className="text-2xl font-bold text-red-500">-$312K</div>
              <div className="text-sm text-red-400">Revenue lost annually</div>
            </div>
          </motion.div>

          {/* Center Divider */}
          <div className="hidden items-center lg:flex">
            <div className="relative flex h-full flex-col items-center justify-center">
              <div className="h-full w-px bg-gradient-to-b from-red-300 via-muted to-teal-300 dark:from-red-800 dark:via-muted dark:to-teal-800" />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="absolute top-1/2 -translate-y-1/2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-lg font-black text-white shadow-lg shadow-amber-500/30">
                  VS
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile VS badge */}
          <div className="flex items-center justify-center lg:hidden">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-sm font-black text-white shadow-lg shadow-amber-500/30"
            >
              VS
            </motion.div>
          </div>

          {/* WITH Column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-teal-200/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-teal-900/30 dark:bg-background/80"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950">
                <Check className="h-5 w-5 text-teal-500" />
              </div>
              <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400">
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
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950/50">
                    <item.icon className="h-4 w-4 text-teal-500" />
                  </span>
                  <span className="text-foreground leading-relaxed">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            {/* Summary stat */}
            <div className="mt-8 rounded-xl bg-teal-50/50 p-4 text-center dark:bg-teal-950/20">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">+$312K</div>
              <div className="text-sm text-teal-500">Revenue recovered annually</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
