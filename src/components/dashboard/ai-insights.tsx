"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

interface Insight {
  id: number;
  emoji: string;
  priority: "high" | "medium" | "low";
  priorityLabel: string;
  description: string;
  metric: string;
  actionLabel: string;
  actionHref?: string;
  onAction?: () => void;
}

const insights: Insight[] = [
  {
    id: 1,
    emoji: "\u{1F525}",
    priority: "high",
    priorityLabel: "High Priority",
    description: "12 clients overdue for Botox touch-ups.",
    metric: "Potential revenue: $4,200",
    actionLabel: "Send Reminders",
    onAction: () => {
      toast.success("Reminders sent to 12 clients", {
        description: "AI-personalized rebooking messages queued for delivery.",
      });
    },
  },
  {
    id: 2,
    emoji: "\u{1F4C8}",
    priority: "medium",
    priorityLabel: "Trending",
    description: "Hydrafacial bookings up 23% this month.",
    metric: "Consider adding availability",
    actionLabel: "View Trends",
    onAction: () => {
      toast.info("Trend Report", {
        description: "Hydrafacial demand increased across all age groups. Peak days: Tuesday & Thursday.",
      });
    },
  },
  {
    id: 3,
    emoji: "\u26A0\uFE0F",
    priority: "high",
    priorityLabel: "Alert",
    description: "8 high-value clients ($2,000+ LTV) haven\u2019t visited in 60+ days.",
    metric: "At-risk revenue: $16,000",
    actionLabel: "View Clients",
    actionHref: "/dashboard/clients",
  },
  {
    id: 4,
    emoji: "\u2B50",
    priority: "low",
    priorityLabel: "Opportunity",
    description: "15 recent 5-star visits haven\u2019t left reviews yet.",
    metric: "Boost your online presence",
    actionLabel: "Request Reviews",
    actionHref: "/dashboard/reviews",
  },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function AIInsights() {
  return (
    <Card className="overflow-hidden">
      {/* Teal gradient header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-700 dark:to-teal-600 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Insights</h3>
            <p className="text-xs text-teal-100">Powered by your client data</p>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              variants={itemVariants}
              className="group relative rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {insight.priority === "high" && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                      </span>
                    )}
                    <Badge
                      variant="secondary"
                      className={`text-[10px] font-semibold uppercase tracking-wide ${priorityColors[insight.priority]}`}
                    >
                      {insight.priorityLabel}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground">
                    <span className="mr-1">{insight.emoji}</span>
                    {insight.description}
                  </p>
                  <p className="mt-1 text-xs font-medium text-teal-600 dark:text-teal-400">
                    {insight.metric}
                  </p>
                </div>
                <div className="shrink-0">
                  {insight.actionHref ? (
                    <Link href={insight.actionHref}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/30"
                      >
                        {insight.actionLabel}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/30"
                      onClick={insight.onAction}
                    >
                      {insight.actionLabel}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
