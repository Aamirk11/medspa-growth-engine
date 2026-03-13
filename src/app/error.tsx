"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
        Something went wrong
      </h1>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
