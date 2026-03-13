"use client";

import { Brain, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const insights = [
  "12 clients are due for rebooking this week",
  "3 reviews are pending your response",
  "$14,200 in revenue is at risk in the next 30 days",
  "Jessica\u2019s schedule is 92% full today",
];

export function MorningBriefing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                Good morning, Dr. Chen
              </h3>
              <p className="text-sm text-muted-foreground">
                Here&apos;s your daily briefing
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-2.5 text-sm"
              >
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{insight}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
