# MedSpa Growth Engine

AI-powered revenue acceleration platform for medical spas.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Framer Motion for animations
- Recharts for data visualization
- Sonner for toast notifications
- next-themes for dark mode
- date-fns for date formatting
- Lucide React for icons

## Project Structure
- `src/app/` — App Router pages and layouts
- `src/components/` — React components organized by domain:
  - `landing/` — Marketing/landing page sections (hero, pricing, testimonials, etc.)
  - `dashboard/` — Dashboard-specific components (sidebar, header, charts, AI insights)
  - `onboarding/` — Onboarding wizard
  - `shared/` — Reusable components (animated-page, page-header, theme-provider)
  - `ui/` — shadcn/ui primitives (button, card, dialog, table, tabs, etc.)
- `src/lib/` — Utilities, constants, mock data
  - `mock-data/` — Mock data modules (business, clients, pipeline, reviews, treatments, etc.)
  - `utils.ts` — Utility functions (cn helper)
  - `constants.ts` — App constants
- `src/hooks/` — Custom React hooks (use-mobile, use-onboarding)

## Key Routes
- `/` — Landing page (marketing)
- `/onboarding` — 4-step onboarding wizard
- `/dashboard` — Main dashboard with AI insights
- `/dashboard/clients` — Client list with search/filter
- `/dashboard/clients/[id]` — Client detail with health score
- `/dashboard/pathways` — Treatment pathway management
- `/dashboard/pipeline` — Revenue pipeline
- `/dashboard/reviews` — Review management
- `/dashboard/settings` — Business settings

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — ESLint

## Conventions
- All interactive components use `"use client"` directive
- Server components used for layouts with metadata exports
- Mock data in `src/lib/mock-data/` (no backend)
- Toast feedback via Sonner on user actions
- Framer Motion for page transitions and micro-interactions (AnimatePresence in dashboard layout)
- Teal (#0D9488) primary + Gold (#D97706) accent color scheme
- Mobile-first responsive design with dedicated MobileNav component
- localStorage for onboarding state persistence
- Path alias `@/*` maps to `./src/*`
- Geist and Geist Mono fonts via next/font/google
