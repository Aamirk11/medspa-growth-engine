import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Pathways", href: "/dashboard/pathways", icon: "GitBranch" },
  { title: "Pipeline", href: "/dashboard/pipeline", icon: "DollarSign" },
  { title: "Reviews", href: "/dashboard/reviews", icon: "Star" },
  { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

export const COLORS = {
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0D9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  gold: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#D97706",
    600: "#b45309",
  },
  slate: {
    700: "#334155",
  },
} as const;

export const CHART_COLORS = {
  primary: "#0D9488",
  primaryLight: "#99f6e4",
  accent: "#D97706",
  accentLight: "#fde68a",
  confirmed: "#0D9488",
  projected: "#5eead4",
  atRisk: "#D97706",
} as const;

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: 299,
    description: "For solo providers getting started",
    features: [
      "Up to 200 active clients",
      "Basic rebooking reminders",
      "Review monitoring",
      "Email support",
      "1 provider",
    ],
    notIncluded: [
      "AI treatment pathways",
      "Revenue pipeline",
      "SMS outreach",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: 599,
    description: "For growing medspas ready to scale",
    features: [
      "Up to 1,000 active clients",
      "AI treatment pathway engine",
      "Revenue pipeline & forecasting",
      "SMS + email outreach",
      "Review harvest automation",
      "Up to 5 providers",
      "Priority support",
    ],
    notIncluded: ["Custom integrations", "Dedicated success manager"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 999,
    description: "For multi-location practices",
    features: [
      "Unlimited clients",
      "Everything in Growth",
      "Custom PMS integrations",
      "Multi-location support",
      "Dedicated success manager",
      "Custom reporting",
      "API access",
      "HIPAA BAA included",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;
