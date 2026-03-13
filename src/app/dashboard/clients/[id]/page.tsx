"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  ArrowLeft,
  Sparkles,
  CalendarDays,
  Users,
  DollarSign,
  Heart,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getClientById } from "@/lib/mock-data";

const CURRENT_DATE = "2025-12-20";

function getRiskBadge(risk: "low" | "medium" | "high") {
  switch (risk) {
    case "low":
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700">
          Low Risk
        </Badge>
      );
    case "medium":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700">
          Medium Risk
        </Badge>
      );
    case "high":
      return (
        <Badge className="bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700">
          High Risk
        </Badge>
      );
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const treatmentColors: Record<string, string> = {
  Botox: "bg-teal-500",
  "Dermal Fillers": "bg-purple-500",
  "Laser Hair Removal": "bg-blue-500",
  "Chemical Peels": "bg-amber-500",
  Microneedling: "bg-rose-500",
  HydraFacial: "bg-cyan-500",
};

function getTreatmentDotColor(name: string): string {
  return treatmentColors[name] || "bg-primary";
}

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const client = getClientById(id);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">Client not found</h2>
        <p className="text-muted-foreground">
          The client you are looking for does not exist.
        </p>
        <Link href="/dashboard/pathways">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pathways
          </Button>
        </Link>
      </div>
    );
  }

  // Rebooking calculations
  const now = new Date(CURRENT_DATE);
  const nextDate = new Date(client.nextOptimalDate);
  const daysUntil = Math.floor(
    (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysUntil < 0;
  const isDueSoon = daysUntil >= 0 && daysUntil <= 14;

  // Treatment records sorted most recent first
  const sortedTreatments = [...client.treatments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalTreatmentSpend = client.treatments.reduce(
    (sum, t) => sum + t.price,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pathways">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <PageHeader title={client.name} subtitle="Client Profile" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Client Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    {client.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{client.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {client.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {client.phone}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {getRiskBadge(client.riskLevel)}
                    <Badge variant="outline">{client.preferredProvider}</Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(client.memberSince).getFullYear()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total Visits
                    </p>
                    <p className="text-sm font-medium">{client.totalVisits}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Lifetime Value
                    </p>
                    <p className="text-sm font-medium">
                      {formatCurrency(client.lifetimeValue)}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    onClick={() => toast.success(`SMS sent to ${client.name}`)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Send SMS
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    onClick={() => toast.success(`Email sent to ${client.name}`)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rebooking Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Rebooking Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`rounded-lg p-4 mb-4 ${
                    isOverdue
                      ? "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
                      : isDueSoon
                        ? "bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                        : "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isOverdue ? (
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    ) : isDueSoon ? (
                      <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    )}
                    <div>
                      <p
                        className={`font-semibold text-sm ${
                          isOverdue
                            ? "text-red-700 dark:text-red-400"
                            : isDueSoon
                              ? "text-amber-700 dark:text-amber-400"
                              : "text-green-700 dark:text-green-400"
                        }`}
                      >
                        {isOverdue
                          ? `${Math.abs(daysUntil)} days overdue`
                          : isDueSoon
                            ? `Due in ${daysUntil} days`
                            : `On track - next visit in ${daysUntil} days`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Next optimal date: {formatDate(client.nextOptimalDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Preferred Treatment
                    </span>
                    <span className="font-medium">
                      {client.preferredTreatment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Visit</span>
                    <span className="font-medium">
                      {formatDate(client.lastVisit)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Client Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  Client Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const score = client.riskLevel === "low" ? 92 : client.riskLevel === "medium" ? 68 : 35;
                  const color = score >= 80 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600";
                  const ringColor = score >= 80 ? "stroke-green-500" : score >= 50 ? "stroke-amber-500" : "stroke-red-500";
                  const label = score >= 80 ? "Excellent" : score >= 50 ? "Needs Attention" : "At Risk";
                  return (
                    <div className="flex items-center gap-6">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50" cy="50" r="42"
                            fill="none"
                            strokeWidth="8"
                            className="stroke-muted"
                          />
                          <circle
                            cx="50" cy="50" r="42"
                            fill="none"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${score * 2.64} ${264 - score * 2.64}`}
                            className={ringColor}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xl font-bold ${color}`}>{score}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className={`font-semibold ${color}`}>{label}</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p className="flex items-center gap-1.5">
                            <TrendingUp className="h-3 w-3" />
                            {client.totalVisits} visits completed
                          </p>
                          <p className="flex items-center gap-1.5">
                            <DollarSign className="h-3 w-3" />
                            {formatCurrency(client.lifetimeValue)} lifetime value
                          </p>
                          <p className="flex items-center gap-1.5">
                            <CalendarDays className="h-3 w-3" />
                            {isOverdue ? `${Math.abs(daysUntil)}d overdue` : `Next in ${daysUntil}d`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Message Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Suggested Rebooking Message
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Generated
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="sms">
                  <TabsList className="w-full">
                    <TabsTrigger value="sms" className="flex-1">
                      SMS
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex-1">
                      Email
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="sms" className="mt-3">
                    <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                      Hi {client.name.split(" ")[0]}, it&apos;s time for your
                      next {client.preferredTreatment} at Glow Aesthetics! Book
                      now to keep your results looking amazing: [link]
                    </div>
                  </TabsContent>
                  <TabsContent value="email" className="mt-3">
                    <div className="rounded-lg border bg-muted/30 p-3 text-sm space-y-2">
                      <p>Dear {client.name.split(" ")[0]},</p>
                      <p>
                        We hope you&apos;re loving the results from your last{" "}
                        {client.preferredTreatment} treatment! Based on your
                        personalized care plan, now is the perfect time to
                        schedule your next session to maintain optimal results.
                      </p>
                      <p>
                        As a valued client since{" "}
                        {new Date(client.memberSince).getFullYear()}, we want to
                        ensure you continue to look and feel your best. Click
                        below to book your next appointment with{" "}
                        {client.preferredProvider}.
                      </p>
                      <p>
                        <span className="text-primary font-medium">
                          [Book Now]
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        Warm regards,
                        <br />
                        Glow Aesthetics Team
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-4">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => toast.success(`Message sent to ${client.name}`)}
                  >
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast("Opening editor...")}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Treatment Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Treatment Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-0">
                  {sortedTreatments.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {/* Timeline line */}
                      {index < sortedTreatments.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                      )}

                      {/* Timeline dot */}
                      <div
                        className={`relative z-10 mt-1 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${getTreatmentDotColor(record.treatmentName)}`}
                      >
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">
                              {record.treatmentName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {record.provider}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-medium">
                              {formatCurrency(record.price)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(record.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Treatment History Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Treatment History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTreatments.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-sm">
                          {formatDate(record.date)}
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {record.treatmentName}
                        </TableCell>
                        <TableCell className="text-sm">
                          {record.provider}
                        </TableCell>
                        <TableCell className="text-sm text-right">
                          {formatCurrency(record.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3} className="font-semibold">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(totalTreatmentSpend)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
          {/* Recommended Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white dark:border-teal-800 dark:from-teal-950/20 dark:to-background">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-teal-600" />
                  Recommended Next Treatment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border border-teal-200 bg-white/80 dark:border-teal-800 dark:bg-background/50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-teal-700 dark:text-teal-400">
                      {client.preferredTreatment}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on treatment history and optimal scheduling
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Optimal date: {formatDate(client.nextOptimalDate)}
                    </p>
                  </div>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white shrink-0 ml-4"
                    onClick={() => toast.success(`Booking ${client.preferredTreatment} for ${client.name}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
