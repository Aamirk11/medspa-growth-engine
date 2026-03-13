"use client";

import Link from "next/link";
import { Send, TrendingUp, MessageSquare, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const actions: QuickAction[] = [
  {
    title: "Send Rebooking Reminders",
    description: "Reach out to overdue clients",
    href: "/dashboard/clients",
    icon: Send,
  },
  {
    title: "View Revenue Pipeline",
    description: "Forecast upcoming revenue",
    href: "/dashboard/pipeline",
    icon: TrendingUp,
  },
  {
    title: "Respond to Reviews",
    description: "3 reviews need attention",
    href: "/dashboard/reviews",
    icon: MessageSquare,
  },
  {
    title: "View Settings",
    description: "Manage your preferences",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.href} href={action.href}>
            <Card className="group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]">
              <CardContent className="flex flex-col items-start gap-3 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-tight">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
