"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { treatments, clients } from "@/lib/mock-data";
import type { Treatment } from "@/types";

type Category = "All" | "Injectables" | "Skin" | "Body";

function formatRevenue(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

function getRebookingColor(rate: number): string {
  if (rate > 0.7) return "bg-green-500";
  if (rate > 0.5) return "bg-amber-500";
  return "bg-red-500";
}

function getRebookingTextColor(rate: number): string {
  if (rate > 0.7) return "text-green-600";
  if (rate > 0.5) return "text-amber-600";
  return "text-red-600";
}

function getCategoryVariant(category: string): "default" | "secondary" | "outline" | "destructive" {
  switch (category) {
    case "Injectables":
      return "default";
    case "Skin":
      return "secondary";
    case "Body":
      return "outline";
    default:
      return "secondary";
  }
}

export default function PathwaysPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredTreatments =
    activeCategory === "All"
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

  const getClientsForTreatment = (treatment: Treatment) => {
    return clients
      .filter((c) => c.preferredTreatment === treatment.name)
      .slice(0, 5);
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Treatment Pathways"
        subtitle="Monitor rebooking rates and optimize treatment schedules"
      />

      <Tabs
        value={activeCategory}
        onValueChange={(v) => {
          setActiveCategory(v as Category);
          setExpandedRow(null);
        }}
      >
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Injectables">Injectables</TabsTrigger>
          <TabsTrigger value="Skin">Skin</TabsTrigger>
          <TabsTrigger value="Body">Body</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Treatment Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Optimal Interval</TableHead>
                <TableHead className="text-right">Active Clients</TableHead>
                <TableHead>Rebooking Rate</TableHead>
                <TableHead className="text-right">Revenue Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTreatments.map((treatment) => {
                const isExpanded = expandedRow === treatment.id;
                const matchingClients = getClientsForTreatment(treatment);

                return (
                  <AnimatePresence key={treatment.id}>
                    <TableRow
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleRow(treatment.id)}
                    >
                      <TableCell>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {treatment.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getCategoryVariant(treatment.category)}>
                          {treatment.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{treatment.optimalInterval}</TableCell>
                      <TableCell className="text-right">
                        {treatment.activeClients}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={treatment.rebookingRate * 100}
                            className={`h-2 w-24 [&>div]:${getRebookingColor(treatment.rebookingRate)}`}
                          />
                          <span
                            className={`text-sm font-medium ${getRebookingTextColor(treatment.rebookingRate)}`}
                          >
                            {Math.round(treatment.rebookingRate * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatRevenue(treatment.revenueImpact)}
                      </TableCell>
                    </TableRow>

                    {isExpanded && (
                      <TableRow key={`${treatment.id}-expanded`}>
                        <TableCell colSpan={7} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="bg-muted/30 px-8 py-4 border-t">
                              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                                Top Clients for {treatment.name}
                              </h4>
                              {matchingClients.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                  No clients found for this treatment.
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  {matchingClients.map((client) => {
                                    const now = new Date("2025-12-20");
                                    const nextDate = new Date(
                                      client.nextOptimalDate
                                    );
                                    const daysUntil = Math.floor(
                                      (nextDate.getTime() - now.getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    );
                                    const isOverdue = daysUntil < 0;
                                    const isDueSoon =
                                      daysUntil >= 0 && daysUntil <= 14;

                                    return (
                                      <motion.div
                                        key={client.id}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Link
                                          href={`/dashboard/clients/${client.id}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toast("Viewing client details for " + client.name);
                                          }}
                                          className="flex items-center justify-between rounded-lg border bg-background px-4 py-3 hover:bg-muted/50 transition-colors"
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                              {client.avatar}
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium">
                                                {client.name}
                                              </p>
                                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Last visit: {client.lastVisit}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <Badge
                                              variant={
                                                isOverdue
                                                  ? "destructive"
                                                  : isDueSoon
                                                    ? "secondary"
                                                    : "outline"
                                              }
                                              className={
                                                isDueSoon && !isOverdue
                                                  ? "bg-amber-100 text-amber-700 border-amber-300"
                                                  : ""
                                              }
                                            >
                                              {isOverdue
                                                ? `${Math.abs(daysUntil)} days overdue`
                                                : isDueSoon
                                                  ? `Due in ${daysUntil} days`
                                                  : `Next in ${daysUntil} days`}
                                            </Badge>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                          </div>
                                        </Link>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
