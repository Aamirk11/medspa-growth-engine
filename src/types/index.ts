export interface BusinessProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  totalClients: number;
  avgMonthlyRevenue: number;
  googleRating: number;
  reviewCount: number;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  clientCount: number;
  revenue: number;
  avatar: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: "Injectables" | "Skin" | "Body" | "Wellness";
  avgPrice: number;
  optimalInterval: string;
  optimalDays: number;
  activeClients: number;
  rebookingRate: number;
  revenueImpact: number;
}

export interface TreatmentRecord {
  id: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  provider: string;
  price: number;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  totalSpend: number;
  totalVisits: number;
  lastVisit: string;
  nextOptimalDate: string;
  riskLevel: "low" | "medium" | "high";
  preferredProvider: string;
  preferredTreatment: string;
  treatments: TreatmentRecord[];
  memberSince: string;
  lifetimeValue: number;
}

export interface Review {
  id: string;
  clientId: string;
  clientName: string;
  platform: "google" | "yelp" | "facebook";
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  responded: boolean;
  sentiment: "positive" | "neutral" | "negative";
}

export interface RevenueDataPoint {
  date: string;
  month: string;
  revenue: number;
  treatments: number;
  newClients: number;
}

export interface PipelineItem {
  category: string;
  period: "30d" | "60d" | "90d";
  confirmed: number;
  projected: number;
  atRisk: number;
}

export interface AtRiskClient {
  clientId: string;
  clientName: string;
  treatment: string;
  lastVisit: string;
  daysOverdue: number;
  estimatedValue: number;
}

export interface ReadyToAskClient {
  clientId: string;
  clientName: string;
  treatment: string;
  date: string;
  satisfactionScore: number;
}

export type NavItem = {
  title: string;
  href: string;
  icon: string;
};
