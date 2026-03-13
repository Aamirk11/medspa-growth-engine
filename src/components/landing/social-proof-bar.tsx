"use client";

import { motion } from "framer-motion";
import { Building2, DollarSign, Users, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "MedSpas",
    icon: Building2,
  },
  {
    value: 47,
    prefix: "$",
    suffix: "M",
    label: "Revenue Recovered",
    icon: DollarSign,
  },
  {
    value: 89,
    suffix: "%",
    label: "Client Retention",
    icon: Users,
  },
  {
    value: 4.9,
    decimals: 1,
    suffix: "\u2605",
    label: "Average Rating",
    icon: Star,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function SocialProofBar() {
  return (
    <section className="relative border-y border-border/40 bg-gradient-to-r from-teal-50/80 via-white to-teal-50/80 py-8 dark:from-teal-950/20 dark:via-background dark:to-teal-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100/80 dark:bg-teal-900/40">
                <stat.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              />
              <span className="mt-1 text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
