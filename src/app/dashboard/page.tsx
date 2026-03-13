"use client";

import { DollarSign, Users, RefreshCw, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { MorningBriefing } from "@/components/dashboard/morning-briefing";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RevenueBanner } from "@/components/dashboard/revenue-banner";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { LiveActivityFeed } from "@/components/dashboard/live-activity-feed";
import { PathwayDiagram } from "@/components/dashboard/pathway-diagram";
import { sparklineData } from "@/lib/mock-data";

const stats = [
  {
    title: "Active Clients",
    value: "847",
    change: "+12.4%",
    changeType: "positive" as const,
    icon: <Users className="h-4 w-4" />,
    data: sparklineData.clients,
    trendIcon: <TrendingUp className="h-3 w-3" />,
  },
  {
    title: "Revenue This Month",
    value: "$47.2K",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: <DollarSign className="h-4 w-4" />,
    data: sparklineData.revenue,
    trendIcon: <TrendingUp className="h-3 w-3" />,
  },
  {
    title: "Rebooking Rate",
    value: "72%",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: <RefreshCw className="h-4 w-4" />,
    data: sparklineData.rebookRate,
    trendIcon: <TrendingUp className="h-3 w-3" />,
  },
  {
    title: "At-Risk Clients",
    value: "23",
    change: "-3",
    changeType: "positive" as const,
    icon: <AlertTriangle className="h-4 w-4" />,
    data: sparklineData.reviews,
    trendIcon: <TrendingDown className="h-3 w-3" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4">
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

      {/* AI Insights Panel */}
      <AIInsights />

      {/* Revenue Chart + Live Activity Feed (2-column) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RevenueChart />
        </div>
        <div className="lg:col-span-2">
          <LiveActivityFeed />
        </div>
      </div>

      {/* Morning Briefing + Quick Actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-base font-semibold">Quick Actions</h2>
          <QuickActions />
        </div>
        <div>
          <MorningBriefing />
        </div>
      </div>

      {/* Treatment Pathway Diagram */}
      <details className="group">
        <summary className="mb-3 cursor-pointer text-base font-semibold list-none flex items-center gap-2">
          <span className="transition-transform group-open:rotate-90">&#9654;</span>
          Sample Treatment Pathway
        </summary>
        <PathwayDiagram />
      </details>
    </div>
  );
}
