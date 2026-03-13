"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  TrendingUp,
  Calendar,
  Send,
  ShieldCheck,
  CheckCircle2,
  Check,
  Clock,
  ThumbsUp,
  Minus,
  ThumbsDown,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CHART_COLORS } from "@/lib/constants";
import { reviews, reviewStats, readyToAskClients } from "@/lib/mock-data";

const platformConfig: Record<
  string,
  { color: string; bg: string; textColor: string }
> = {
  google: {
    color: "border-blue-200 bg-blue-50 dark:bg-blue-950/30",
    bg: "bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  yelp: {
    color: "border-red-200 bg-red-50 dark:bg-red-950/30",
    bg: "bg-red-500",
    textColor: "text-red-700 dark:text-red-400",
  },
  facebook: {
    color: "border-indigo-200 bg-indigo-50 dark:bg-indigo-950/30",
    bg: "bg-indigo-500",
    textColor: "text-indigo-700 dark:text-indigo-400",
  },
};

const pieData = [
  { name: "Google", value: reviewStats.byPlatform.google, color: "#4285F4" },
  { name: "Yelp", value: reviewStats.byPlatform.yelp, color: "#FF1A1A" },
  {
    name: "Facebook",
    value: reviewStats.byPlatform.facebook,
    color: "#1877F2",
  },
];

const interceptedCases = [
  {
    clientName: "Lisa Thompson",
    issue: "Mild bruising after filler treatment",
    status: "Resolved Privately",
  },
  {
    clientName: "Karen Mitchell",
    issue: "Scheduling confusion about appointment time",
    status: "Resolved Privately",
  },
  {
    clientName: "Diana Roberts",
    issue: "Expected faster results from chemical peel",
    status: "Resolved Privately",
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${star <= rating ? "fill-amber-400 text-amber-400" : "fill-none text-gray-300 dark:text-gray-600"}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function ReviewsPage() {
  const [visibleCount, setVisibleCount] = useState(15);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});

  const handleSendRequest = useCallback((clientId: string) => {
    setSentRequests((prev) => ({ ...prev, [clientId]: true }));
    setTimeout(() => {
      setSentRequests((prev) => {
        const next = { ...prev };
        delete next[clientId];
        return next;
      });
    }, 2000);
  }, []);
  const visibleReviews = reviews.slice(0, visibleCount);

  const statsCards = [
    {
      title: "Average Rating",
      value: reviewStats.averageRating.toFixed(1),
      icon: Star,
      extra: <StarRating rating={Math.round(reviewStats.averageRating)} />,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Total Reviews",
      value: reviewStats.total.toString(),
      icon: MessageSquare,
      color: "text-teal-600",
      bg: "bg-teal-50 dark:bg-teal-950/30",
    },
    {
      title: "Response Rate",
      value: `${reviewStats.responseRate}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "This Month",
      value: `+${reviewStats.thisMonth}`,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-teal-50 dark:bg-teal-950/30",
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Review Harvest"
        subtitle="Monitor reviews and grow your online reputation"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={`${card.bg} border-0 shadow-sm`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </span>
                </div>
                <p className={`mt-2 text-2xl font-bold ${card.color}`}>
                  {card.value}
                </p>
                {card.extra && <div className="mt-1">{card.extra}</div>}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content: Feed + Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Review Feed */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent Reviews</h2>
          <div className="space-y-3">
            {visibleReviews.map((review, i) => {
              const platform = platformConfig[review.platform];
              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className={`${platform.color} capitalize font-medium`}
                          >
                            {review.platform}
                          </Badge>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <div className="flex items-center gap-2">
                          {review.responded ? (
                            <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                              <CheckCircle2 className="h-3 w-3" />
                              Responded
                            </Badge>
                          ) : (
                            <Badge className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                              <Clock className="h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                        {review.text}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">
                          {review.clientName}
                        </span>
                        <span>
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {visibleCount < reviews.length && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  setVisibleCount((prev) => Math.min(prev + 15, reviews.length))
                }
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ready to Ask */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Send className="h-4 w-4 text-primary" />
                  Ready to Ask
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {readyToAskClients.map((client) => (
                  <div
                    key={client.clientId}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {client.clientName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {client.treatment}
                        </span>
                        <StarRating
                          rating={client.satisfactionScore}
                          size={10}
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={sentRequests[client.clientId] ? "default" : "outline"}
                      className={`shrink-0 h-8 text-xs transition-all duration-200 ${
                        sentRequests[client.clientId]
                          ? "bg-green-600 hover:bg-green-600 text-white border-green-600"
                          : ""
                      }`}
                      onClick={() => handleSendRequest(client.clientId)}
                      disabled={!!sentRequests[client.clientId]}
                    >
                      {sentRequests[client.clientId] ? (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          Sent ✓
                        </>
                      ) : (
                        "Send Request"
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Platform Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Platform Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          `${value} reviews`,
                          String(name),
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-xs">
                  {pieData.map((entry) => (
                    <div
                      key={entry.name}
                      className="flex items-center gap-1.5"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-muted-foreground">
                        {entry.name} ({entry.value})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sentiment Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Sentiment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      Positive
                    </span>
                    <span className="font-medium text-green-600">
                      {reviewStats.bySentiment.positive}
                    </span>
                  </div>
                  <Progress
                    value={
                      (reviewStats.bySentiment.positive / reviewStats.total) *
                      100
                    }
                    className="h-2 [&>div]:bg-green-500"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Minus className="h-4 w-4 text-gray-400" />
                      Neutral
                    </span>
                    <span className="font-medium text-gray-500">
                      {reviewStats.bySentiment.neutral}
                    </span>
                  </div>
                  <Progress
                    value={
                      (reviewStats.bySentiment.neutral / reviewStats.total) *
                      100
                    }
                    className="h-2 [&>div]:bg-gray-400"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      Negative
                    </span>
                    <span className="font-medium text-red-500">
                      {reviewStats.bySentiment.negative}
                    </span>
                  </div>
                  <Progress
                    value={
                      (reviewStats.bySentiment.negative / reviewStats.total) *
                      100
                    }
                    className="h-2 [&>div]:bg-red-500"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Smart Review Intercept Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white dark:border-teal-800 dark:from-teal-950/20 dark:to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Smart Review Intercept
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Automatically detect potentially dissatisfied clients and route
              their feedback to a private channel before they post a public
              negative review. Resolve issues proactively to protect your online
              reputation.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {interceptedCases.map((item, i) => (
                <motion.div
                  key={item.clientName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <Card className="border-green-100 bg-white/80 dark:border-green-900 dark:bg-background/50">
                    <CardContent className="p-4">
                      <p className="font-medium">{item.clientName}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.issue}
                      </p>
                      <Separator className="my-3" />
                      <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {item.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
