"use client";

import { motion } from "framer-motion";
import { Shield, Lock, ShieldCheck, Zap } from "lucide-react";

const badges = [
  { label: "HIPAA Compliant", icon: Shield },
  { label: "256-bit Encryption", icon: Lock },
  { label: "SOC 2 Certified", icon: ShieldCheck },
  { label: "99.9% Uptime", icon: Zap },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

export function TrustBadges() {
  return (
    <section className="border-t border-border/40 bg-muted/20 py-10 dark:bg-muted/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={badgeVariants}
              className="flex items-center gap-2.5 rounded-full border border-border/50 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-sm dark:bg-background/70"
            >
              <badge.icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-muted-foreground">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
