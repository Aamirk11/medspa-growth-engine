"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING_TIERS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/30 py-16 dark:bg-muted/10">
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
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 grid gap-8 lg:grid-cols-3"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div key={tier.name} variants={itemVariants}>
              <Card
                className={`relative flex h-full flex-col ${
                  tier.highlighted
                    ? "border-2 border-gold-400 shadow-xl shadow-gold-100/50 dark:border-gold-500 dark:shadow-gold-900/20"
                    : "border-border/50"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gold-500 px-3 py-1 text-xs font-semibold text-white hover:bg-gold-500">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {tier.name}
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      ${tier.price}
                    </span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-3 pt-4">
                  {/* Included features */}
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}

                  {/* Not included */}
                  {tier.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                      <span className="text-sm text-muted-foreground/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>

                <CardContent className="pt-2 pb-2">
                  <Button
                    className={`w-full ${
                      tier.highlighted
                        ? "h-11 bg-teal-600 text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
                        : "h-11"
                    }`}
                    variant={tier.highlighted ? "default" : "outline"}
                    render={<Link href={tier.name === "Enterprise" ? "#waitlist" : "/onboarding"} />}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
