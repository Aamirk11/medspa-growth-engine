"use client";

import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: ReactNode;
  sparklineData: number[];
}

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon,
  sparklineData,
}: StatsCardProps) {
  const chartData = sparklineData.map((v, i) => ({ index: i, value: v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden hover:scale-[1.02] hover:shadow-md transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              {icon}
              <span className="text-sm font-medium">{title}</span>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-medium",
                changeType === "positive"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {change}
            </Badge>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold tracking-tight">{value}</span>

            <div className="h-12 w-24 opacity-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      changeType === "positive"
                        ? CHART_COLORS.primary
                        : "#ef4444"
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
