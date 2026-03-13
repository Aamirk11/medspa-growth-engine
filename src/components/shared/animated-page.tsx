"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedPage({ children, className, delay = 0 }: AnimatedPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
