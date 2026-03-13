"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Calendar, Brain, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: TrendingUp,
    title: "Smart Rebooking Engine",
    description:
      "AI identifies clients who are overdue or at risk of lapsing, then automatically triggers personalized outreach to bring them back.",
  },
  {
    icon: Users,
    title: "Client Intelligence",
    description:
      "Deep profiles with treatment history, spending patterns, and predictive lifetime value scoring to prioritize your highest-value clients.",
  },
  {
    icon: Star,
    title: "Review Harvest",
    description:
      "Automatically request reviews from happy clients at the perfect moment. Boost your Google rating and attract new patients organically.",
  },
  {
    icon: Calendar,
    title: "Revenue Pipeline",
    description:
      "Visualize your confirmed, projected, and at-risk revenue in real time. Never be surprised by a slow month again.",
  },
  {
    icon: Brain,
    title: "AI Morning Briefings",
    description:
      "Start every day with an AI-generated summary of who to call, what to prepare, and where your biggest opportunities are.",
  },
  {
    icon: Shield,
    title: "HIPAA Ready",
    description:
      "Enterprise-grade security with full HIPAA compliance, encrypted data at rest and in transit, and audit logging built in.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-16 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Grow Your MedSpa
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One platform to manage rebookings, track revenue, harvest reviews, and delight clients with AI-powered intelligence.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="group relative h-full shadow-sm border-border/80 bg-card transition-all duration-300 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/50 dark:hover:border-teal-800 dark:hover:shadow-teal-900/20">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 transition-colors group-hover:bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400 dark:ring-teal-800 dark:group-hover:bg-teal-900/50">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
