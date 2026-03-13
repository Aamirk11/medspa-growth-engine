"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Revenue up 34% in 3 months. The rebooking engine alone pays for itself.",
    name: "Dr. Amanda Foster",
    title: "Owner",
    spa: "Radiance MedSpa, Austin TX",
    initials: "AF",
    stars: 5,
  },
  {
    quote:
      "We recovered $18K in the first month from lapsed clients we'd completely forgotten about.",
    name: "Jennifer Walsh",
    title: "Practice Manager",
    spa: "Pure Glow Aesthetics, Miami FL",
    initials: "JW",
    stars: 5,
  },
  {
    quote:
      "My front desk team saves 2 hours per day. The AI handles all the follow-up.",
    name: "Dr. Michael Torres",
    title: "Medical Director",
    spa: "Elite Skin & Laser, Denver CO",
    initials: "MT",
    stars: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

export function TestimonialsSection() {
  return (
    <section className="bg-white py-24 dark:bg-background">
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
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by MedSpa Owners
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how practices like yours are growing with MedSpa Growth Engine.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="h-full border-border/50 bg-card">
                <CardContent className="flex h-full flex-col gap-6 pt-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-5 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.title} &middot; {testimonial.spa}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
