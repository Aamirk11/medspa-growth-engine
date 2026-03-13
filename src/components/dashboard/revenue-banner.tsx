"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, TrendingUp } from "lucide-react";

export function RevenueBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(0);
  const targetAmount = 12400;
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAmount(Math.round(eased * targetAmount));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white shadow-lg dark:from-teal-700 dark:to-teal-800">
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-white/5" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Trophy className="h-5 w-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-teal-100">
                      Revenue Recovered This Month
                    </p>
                    <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium text-emerald-200">
                      <TrendingUp className="h-3 w-3" />
                      23% vs last month
                    </span>
                  </div>
                  <motion.p
                    className="text-2xl font-bold tracking-tight"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    ${displayAmount.toLocaleString()}
                  </motion.p>
                </div>
              </div>

              <button
                onClick={() => setDismissed(true)}
                className="shrink-0 rounded-lg p-1.5 text-teal-200 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
