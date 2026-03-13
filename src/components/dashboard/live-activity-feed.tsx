"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityEntry {
  id: number;
  dotColor: string;
  text: string;
  timestamp: string;
}

const activities: ActivityEntry[] = [
  {
    id: 1,
    dotColor: "bg-green-500",
    text: "Sarah Chen rebooked Botox treatment",
    timestamp: "5 min ago",
  },
  {
    id: 2,
    dotColor: "bg-amber-500",
    text: "New 5-star review from Michael Torres",
    timestamp: "12 min ago",
  },
  {
    id: 3,
    dotColor: "bg-teal-500",
    text: "AI sent rebooking reminder to 23 clients",
    timestamp: "1 hr ago",
  },
  {
    id: 4,
    dotColor: "bg-blue-500",
    text: "Jennifer Park completed Hydrafacial pathway",
    timestamp: "2 hr ago",
  },
  {
    id: 5,
    dotColor: "bg-amber-400",
    text: "Revenue milestone: $45K this month",
    timestamp: "3 hr ago",
  },
  {
    id: 6,
    dotColor: "bg-green-500",
    text: "Emily Rodriguez scheduled dermal filler consult",
    timestamp: "4 hr ago",
  },
  {
    id: 7,
    dotColor: "bg-teal-500",
    text: "AI detected 3 clients at risk of churning",
    timestamp: "5 hr ago",
  },
  {
    id: 8,
    dotColor: "bg-blue-500",
    text: "Monthly report auto-generated and emailed",
    timestamp: "6 hr ago",
  },
  {
    id: 9,
    dotColor: "bg-green-500",
    text: "Olivia Martinez left a Google review",
    timestamp: "Yesterday",
  },
  {
    id: 10,
    dotColor: "bg-amber-500",
    text: "New client signup: Amanda Liu via referral",
    timestamp: "Yesterday",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: "easeOut" as const },
  }),
};

export function LiveActivityFeed() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-0">
        <div className="max-h-[380px] overflow-y-auto pr-1 space-y-0.5 scrollbar-thin">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/50"
            >
              <div className="mt-1.5 shrink-0">
                <div className={`h-2 w-2 rounded-full ${activity.dotColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground leading-snug">
                  {activity.text}
                </p>
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
