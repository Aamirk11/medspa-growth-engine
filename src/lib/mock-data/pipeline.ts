import type { PipelineItem, AtRiskClient } from "@/types";

export const pipelineData: PipelineItem[] = [
  { category: "Botox", period: "30d", confirmed: 18200, projected: 12400, atRisk: 5800 },
  { category: "Dermal Fillers", period: "30d", confirmed: 8200, projected: 6100, atRisk: 3200 },
  { category: "Laser Hair Removal", period: "30d", confirmed: 6800, projected: 4200, atRisk: 2100 },
  { category: "HydraFacial", period: "30d", confirmed: 5400, projected: 3800, atRisk: 1600 },
  { category: "Chemical Peels", period: "30d", confirmed: 3200, projected: 2100, atRisk: 900 },
  { category: "Microneedling", period: "30d", confirmed: 4100, projected: 2800, atRisk: 1200 },

  { category: "Botox", period: "60d", confirmed: 24600, projected: 18200, atRisk: 8400 },
  { category: "Dermal Fillers", period: "60d", confirmed: 12400, projected: 9800, atRisk: 5100 },
  { category: "Laser Hair Removal", period: "60d", confirmed: 10200, projected: 7400, atRisk: 3600 },
  { category: "HydraFacial", period: "60d", confirmed: 8800, projected: 6200, atRisk: 2800 },
  { category: "Chemical Peels", period: "60d", confirmed: 5100, projected: 3600, atRisk: 1400 },
  { category: "Microneedling", period: "60d", confirmed: 6400, projected: 4200, atRisk: 2000 },

  { category: "Botox", period: "90d", confirmed: 32400, projected: 24800, atRisk: 11200 },
  { category: "Dermal Fillers", period: "90d", confirmed: 18600, projected: 14200, atRisk: 7400 },
  { category: "Laser Hair Removal", period: "90d", confirmed: 14800, projected: 10600, atRisk: 5200 },
  { category: "HydraFacial", period: "90d", confirmed: 12400, projected: 9200, atRisk: 4100 },
  { category: "Chemical Peels", period: "90d", confirmed: 7800, projected: 5400, atRisk: 2200 },
  { category: "Microneedling", period: "90d", confirmed: 9200, projected: 6800, atRisk: 3000 },
];

export const pipelineSummary = {
  "30d": { total: 84000, confirmed: 45900, projected: 31400, atRisk: 14800 },
  "60d": { total: 136200, confirmed: 67500, projected: 49400, atRisk: 23300 },
  "90d": { total: 199200, confirmed: 95200, projected: 71000, atRisk: 33100 },
};

export const atRiskClients: AtRiskClient[] = [
  { clientId: "client-12", clientName: "Sophia Garcia", treatment: "Botox", lastVisit: "2025-08-15", daysOverdue: 42, estimatedValue: 425 },
  { clientId: "client-28", clientName: "Olivia Martinez", treatment: "Dermal Fillers", lastVisit: "2025-05-20", daysOverdue: 28, estimatedValue: 750 },
  { clientId: "client-45", clientName: "Emma Thompson", treatment: "HydraFacial", lastVisit: "2025-10-08", daysOverdue: 43, estimatedValue: 199 },
  { clientId: "client-67", clientName: "Isabella Wilson", treatment: "Laser Hair Removal", lastVisit: "2025-10-25", daysOverdue: 21, estimatedValue: 295 },
  { clientId: "client-89", clientName: "Ava Rodriguez", treatment: "Botox", lastVisit: "2025-09-01", daysOverdue: 35, estimatedValue: 425 },
  { clientId: "client-103", clientName: "Charlotte Davis", treatment: "Microneedling", lastVisit: "2025-10-10", daysOverdue: 36, estimatedValue: 350 },
  { clientId: "client-156", clientName: "Mia Anderson", treatment: "Chemical Peels", lastVisit: "2025-10-20", daysOverdue: 26, estimatedValue: 185 },
  { clientId: "client-201", clientName: "Harper Brown", treatment: "HydraFacial", lastVisit: "2025-10-01", daysOverdue: 50, estimatedValue: 199 },
  { clientId: "client-234", clientName: "Amelia Taylor", treatment: "Botox", lastVisit: "2025-08-28", daysOverdue: 38, estimatedValue: 425 },
  { clientId: "client-278", clientName: "Evelyn Moore", treatment: "Dermal Fillers", lastVisit: "2025-04-15", daysOverdue: 65, estimatedValue: 750 },
];

export function getPipelineByPeriod(period: "30d" | "60d" | "90d"): PipelineItem[] {
  return pipelineData.filter((item) => item.period === period);
}
