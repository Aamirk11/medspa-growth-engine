"use client";

import { DollarSign, Users, RefreshCw, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { MorningBriefing } from "@/components/dashboard/morning-briefing";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RevenueBanner } from "@/components/dashboard/revenue-banner";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { sparklineData } from "@/lib/mock-data";

const stats = [
  {
    title: "Monthly Revenue",
    value: "$58,400",
    change: "+12.3%",
    changeType: "positive" as const,
    icon: <DollarSign className="h-4 w-4" />,
    data: sparklineData.revenue,
  },
  {
    title: "Active Clients",
    value: "284",
    change: "+8",
    changeType: "positive" as const,
    icon: <Users className="h-4 w-4" />,
    data: sparklineData.clients,
  },
  {
    title: "Rebooking Rate",
    value: "73%",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: <RefreshCw className="h-4 w-4" />,
    data: sparklineData.rebookRate,
  },
  {
    title: "Avg Review",
    value: "4.8\u2605",
    change: "127 total",
    changeType: "positive" as const,
    icon: <Star className="h-4 w-4" />,
    data: sparklineData.reviews,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <RevenueBanner />

      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Dr. Chen"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            sparklineData={stat.data}
          />
        ))}
      </div>

      {/* Charts and Briefing */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <MorningBriefing />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-base font-semibold">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
