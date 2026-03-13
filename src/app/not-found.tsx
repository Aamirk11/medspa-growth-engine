"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <h1 className="bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-8xl font-extrabold tracking-tighter text-transparent sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page not found
        </h2>

        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
