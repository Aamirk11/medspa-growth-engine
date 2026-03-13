import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { WaitlistForm } from "@/components/landing/waitlist-form";

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-lg dark:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-500">
            <svg
              className="size-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-lg font-bold text-foreground">
            MedSpa Growth Engine
          </span>
        </Link>

        {/* Nav Links - hidden on mobile */}
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#waitlist"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Waitlist
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600 dark:bg-teal-500">
              <svg
                className="size-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-foreground">
              MedSpa Growth Engine
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MedSpa Growth Engine. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              HIPAA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-white/90 p-3 backdrop-blur-lg sm:hidden dark:bg-background/90">
      <Link
        href="/dashboard"
        className="flex h-12 w-full items-center justify-center rounded-lg bg-teal-600 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-700"
      >
        Start Free Trial
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <WaitlistForm />
      </main>
      <Footer />
      <MobileCTA />
      {/* Spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </div>
  );
}
