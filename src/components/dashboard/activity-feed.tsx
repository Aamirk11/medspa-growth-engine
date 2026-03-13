"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Star,
  Scissors,
  Bell,
  MessageSquare,
  Trophy,
  Stethoscope,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  description: string;
  timestamp: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    icon: CalendarCheck,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100 dark:bg-teal-900/40",
    description: "Sophia Garcia rebooked Botox — $425",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    icon: Star,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    description: "New 5★ review from Olivia Martinez on Google",
    timestamp: "15 min ago",
  },
  {
    id: 3,
    icon: Scissors,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
    description:
      "Jessica Martinez completed Laser Hair Removal for Emma Thompson",
    timestamp: "1 hr ago",
  },
  {
    id: 4,
    icon: Bell,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    description: "Rebooking reminder sent to 12 clients",
    timestamp: "2 hrs ago",
  },
  {
    id: 5,
    icon: MessageSquare,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 dark:bg-green-900/40",
    description: "Isabella Wilson responded to review request",
    timestamp: "3 hrs ago",
  },
  {
    id: 6,
    icon: Trophy,
    iconColor: "text-gold-500 text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-900/40",
    description: "Revenue milestone: $55K reached this month",
    timestamp: "5 hrs ago",
  },
  {
    id: 7,
    icon: Stethoscope,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-100 dark:bg-teal-900/40",
    description: "Dr. Chen completed consultation with new client",
    timestamp: "Yesterday",
  },
  {
    id: 8,
    icon: FileText,
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100 dark:bg-gray-800/40",
    description: "Monthly report generated and emailed",
    timestamp: "Yesterday",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" as const },
  }),
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/50"
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.iconBg}`}
              >
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{activity.description}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
