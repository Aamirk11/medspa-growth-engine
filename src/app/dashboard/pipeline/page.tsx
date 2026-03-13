"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CHART_COLORS } from "@/lib/constants";
import {
  getPipelineByPeriod,
  pipelineSummary,
  atRiskClients,
} from "@/lib/mock-data";

type Period = "30d" | "60d" | "90d";

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value}`;
}

function formatFullCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function PipelinePage() {
  const [period, setPeriod] = useState<Period>("30d");
  const summary = pipelineSummary[period];
  const chartData = getPipelineByPeriod(period);

  const summaryCards = [
    {
      title: "Confirmed Revenue",
      value: summary.confirmed,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      iconBg: "bg-green-100 dark:bg-green-900/50",
    },
    {
      title: "Projected Revenue",
      value: summary.projected,
      icon: TrendingUp,
      color: "text-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
      iconBg: "bg-teal-100 dark:bg-teal-900/50",
    },
    {
      title: "At-Risk Revenue",
      value: summary.atRisk,
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Pipeline"
        subtitle="Track projected revenue and at-risk bookings"
      />

      {/* Period Tabs */}
      <Tabs
        value={period}
        onValueChange={(v) => setPeriod(v as Period)}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="30d">30 Days</TabsTrigger>
          <TabsTrigger value="60d">60 Days</TabsTrigger>
          <TabsTrigger value="90d">90 Days</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Summary Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={period}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {summaryCards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className={`${card.bgColor} border-0 shadow-sm`}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`rounded-xl p-3 ${card.iconBg}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </p>
                    <p className={`text-2xl font-bold ${card.color}`}>
                      {formatFullCurrency(card.value)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Stacked Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Revenue by Treatment Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    tickFormatter={(v) => formatCurrency(v)}
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatFullCurrency(Number(value)),
                      String(name).charAt(0).toUpperCase() + String(name).slice(1),
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="confirmed"
                    stackId="revenue"
                    fill={CHART_COLORS.confirmed}
                    name="Confirmed"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="projected"
                    stackId="revenue"
                    fill={CHART_COLORS.projected}
                    name="Projected"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="atRisk"
                    stackId="revenue"
                    fill={CHART_COLORS.atRisk}
                    name="At-Risk"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* At-Risk Clients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-semibold">At-Risk Clients</h2>
            <Badge variant="secondary" className="ml-2">
              {atRiskClients.length} clients
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {atRiskClients.map((client, i) => (
              <motion.div
                key={client.clientId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{client.clientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {client.treatment}
                        </p>
                      </div>
                      <Badge
                        variant="destructive"
                        className="shrink-0 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                      >
                        {client.daysOverdue}d overdue
                      </Badge>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(client.lastVisit).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {client.daysOverdue} days ago
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatFullCurrency(client.estimatedValue)}
                      </span>
                      <Button size="sm" className="gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        Reach Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
