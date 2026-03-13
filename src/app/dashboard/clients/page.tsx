"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  AlertTriangle,
  CalendarClock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clients, getClientsDueForRebooking } from "@/lib/mock-data";

type RiskFilter = "all" | "low" | "medium" | "high";

const ITEMS_PER_PAGE = 20;

function getRiskBadge(risk: "low" | "medium" | "high") {
  switch (risk) {
    case "low":
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300">
          Low Risk
        </Badge>
      );
    case "medium":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
          Medium Risk
        </Badge>
      );
    case "high":
      return (
        <Badge className="bg-red-100 text-red-700 border-red-300">
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const dueForRebooking = useMemo(() => getClientsDueForRebooking(), []);
  const atRiskCount = useMemo(
    () => clients.filter((c) => c.riskLevel === "high").length,
    []
  );
  const avgLtv = useMemo(() => {
    const total = clients.reduce((sum, c) => sum + c.lifetimeValue, 0);
    return Math.round(total / clients.length);
  }, []);

  const filteredClients = useMemo(() => {
    let result = clients;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(query));
    }

    if (riskFilter !== "all") {
      result = result.filter((c) => c.riskLevel === riskFilter);
    }

    return result;
  }, [searchQuery, riskFilter]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleRiskFilterChange = (filter: RiskFilter) => {
    setRiskFilter(filter);
    setCurrentPage(1);
  };

  const stats = [
    {
      label: "Total Clients",
      value: clients.length.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "At-Risk",
      value: atRiskCount.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Due for Rebooking",
      value: dueForRebooking.length.toString(),
      icon: CalendarClock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Avg LTV",
      value: formatCurrency(avgLtv),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  const riskFilters: { label: string; value: RiskFilter }[] = [
    { label: "All", value: "all" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <PageHeader title="Clients" />
        <Badge variant="secondary" className="mb-6">
          {clients.length} total
        </Badge>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Risk Level:</span>
          {riskFilters.map((filter) => (
            <Badge
              key={filter.value}
              variant={riskFilter === filter.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleRiskFilterChange(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Client Table */}
      {paginatedClients.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No clients found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters.
          </p>
        </motion.div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Visit
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Treatment
                  </TableHead>
                  <TableHead className="text-right hidden sm:table-cell">
                    Total Spend
                  </TableHead>
                  <TableHead className="text-right">LTV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="contents"
                >
                  {paginatedClients.map((client) => (
                    <motion.tr
                      key={client.id}
                      variants={itemVariants}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="p-0">
                        <Link
                          href={`/dashboard/clients/${client.id}`}
                          className="flex items-center gap-3 p-4"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium flex-shrink-0">
                            {client.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {client.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {client.email}
                            </p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{getRiskBadge(client.riskLevel)}</TableCell>
                      <TableCell className="text-sm hidden md:table-cell">
                        {formatDate(client.lastVisit)}
                      </TableCell>
                      <TableCell className="text-sm hidden lg:table-cell">
                        {client.preferredTreatment}
                      </TableCell>
                      <TableCell className="text-sm text-right hidden sm:table-cell">
                        {formatCurrency(client.totalSpend)}
                      </TableCell>
                      <TableCell className="text-sm text-right font-medium">
                        {formatCurrency(client.lifetimeValue)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredClients.length)} of{" "}
            {filteredClients.length} clients
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
