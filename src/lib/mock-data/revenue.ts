import type { RevenueDataPoint } from "@/types";

const months = [
  { month: "Jul 2025", base: 45200 },
  { month: "Aug 2025", base: 47800 },
  { month: "Sep 2025", base: 51400 },
  { month: "Oct 2025", base: 53100 },
  { month: "Nov 2025", base: 55600 },
  { month: "Dec 2025", base: 58400 },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(123);

export const revenueData: RevenueDataPoint[] = months.map((m) => ({
  date: m.month,
  month: m.month.split(" ")[0],
  revenue: m.base + Math.round((rand() - 0.5) * 4000),
  treatments: Math.floor(m.base / 350 + (rand() - 0.5) * 20),
  newClients: Math.floor(8 + rand() * 12),
}));

export const weeklyRevenue = [
  { week: "Week 1", revenue: 13200, treatments: 38 },
  { week: "Week 2", revenue: 15800, treatments: 44 },
  { week: "Week 3", revenue: 14600, treatments: 41 },
  { week: "Week 4", revenue: 14800, treatments: 42 },
];

export const sparklineData = {
  revenue: [42, 45, 43, 48, 51, 53, 51, 56, 55, 58, 57, 58],
  clients: [268, 272, 275, 271, 278, 280, 276, 282, 279, 284, 281, 284],
  rebookRate: [64, 66, 65, 68, 67, 70, 69, 71, 70, 73, 72, 73],
  reviews: [4.6, 4.6, 4.7, 4.7, 4.7, 4.7, 4.8, 4.7, 4.8, 4.8, 4.8, 4.8],
};
