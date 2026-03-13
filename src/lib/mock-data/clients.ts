import type { Client, TreatmentRecord } from "@/types";

const firstNames = [
  "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
  "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Sofia", "Ella", "Madison",
  "Scarlett", "Victoria", "Aria", "Grace", "Chloe", "Camila", "Penelope", "Riley",
  "Layla", "Lillian", "Nora", "Zoey", "Mila", "Aubrey", "Hannah", "Lily",
  "Addison", "Eleanor", "Natalie", "Luna", "Savannah", "Brooklyn", "Leah", "Zoe",
  "Stella", "Hazel", "Ellie", "Paisley", "Audrey", "Skylar", "Violet", "Claire",
  "Bella", "Aurora", "Lucy", "Anna", "Samantha", "Caroline", "Genesis", "Aaliyah",
  "Kennedy", "Kinsley", "Allison", "Maya", "Sarah", "Madelyn", "Adeline", "Alexa",
  "Ariana", "Elena", "Gabriella", "Naomi", "Alice", "Sadie", "Hailey", "Eva",
  "Emilia", "Autumn", "Quinn", "Nevaeh", "Piper", "Ruby", "Serenity", "Willow",
  "Everly", "Cora", "Kaylee", "Lydia", "Aubree", "Arianna", "Eliana", "Peyton",
  "Melanie", "Gianna", "Isabelle", "Julia", "Valentina", "Nova", "Clara", "Vivian",
  "Reagan", "Mackenzie", "Madeline", "Brielle", "Delilah", "Isla", "Rylee", "Katherine",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker",
  "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy",
  "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey",
  "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
];

const treatmentTypes = [
  { id: "tx-1", name: "Botox", price: 425 },
  { id: "tx-2", name: "Dermal Fillers", price: 750 },
  { id: "tx-3", name: "Laser Hair Removal", price: 295 },
  { id: "tx-4", name: "Chemical Peels", price: 185 },
  { id: "tx-5", name: "Microneedling", price: 350 },
  { id: "tx-6", name: "HydraFacial", price: 199 },
];

const providerNames = ["Dr. Sarah Chen", "Jessica Martinez", "Rachel Kim"];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function randomDate(start: string, end: string): string {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const d = new Date(s + rand() * (e - s));
  return d.toISOString().split("T")[0];
}

function generateTreatmentHistory(joinDate: string): TreatmentRecord[] {
  const records: TreatmentRecord[] = [];
  const numRecords = Math.floor(rand() * 12) + 2;
  const preferred = treatmentTypes[Math.floor(rand() * treatmentTypes.length)];

  for (let i = 0; i < numRecords; i++) {
    const tx = rand() > 0.4 ? preferred : treatmentTypes[Math.floor(rand() * treatmentTypes.length)];
    const variance = (rand() - 0.5) * tx.price * 0.2;
    records.push({
      id: `rec-${Math.floor(rand() * 100000)}`,
      treatmentId: tx.id,
      treatmentName: tx.name,
      date: randomDate(joinDate, "2025-12-15"),
      provider: providerNames[Math.floor(rand() * providerNames.length)],
      price: Math.round(tx.price + variance),
    });
  }

  return records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function generateClients(): Client[] {
  const clients: Client[] = [];

  for (let i = 0; i < 453; i++) {
    const first = firstNames[Math.floor(rand() * firstNames.length)];
    const last = lastNames[Math.floor(rand() * lastNames.length)];
    const name = `${first} ${last}`;
    const joinDate = randomDate("2022-01-01", "2025-06-01");
    const treatments = generateTreatmentHistory(joinDate);
    const totalSpend = treatments.reduce((sum, t) => sum + t.price, 0);
    const lastVisit = treatments.length > 0 ? treatments[treatments.length - 1].date : joinDate;
    const preferredTx = treatmentTypes[Math.floor(rand() * treatmentTypes.length)];

    const daysSinceLastVisit = Math.floor(
      (new Date("2025-12-20").getTime() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24)
    );

    const riskLevel: "low" | "medium" | "high" =
      daysSinceLastVisit < 30 ? "low" : daysSinceLastVisit < 90 ? "medium" : "high";

    const nextOptimalDays = preferredTx.price > 500 ? 180 : 35;
    const nextDate = new Date(lastVisit);
    nextDate.setDate(nextDate.getDate() + nextOptimalDays);

    clients.push({
      id: `client-${i + 1}`,
      name,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@email.com`,
      phone: `(480) 555-${String(1000 + i).slice(-4)}`,
      avatar: `${first[0]}${last[0]}`,
      joinDate,
      totalSpend,
      totalVisits: treatments.length,
      lastVisit,
      nextOptimalDate: nextDate.toISOString().split("T")[0],
      riskLevel,
      preferredProvider: providerNames[Math.floor(rand() * providerNames.length)],
      preferredTreatment: preferredTx.name,
      treatments,
      memberSince: joinDate,
      lifetimeValue: Math.round(totalSpend * (1 + rand() * 0.3)),
    });
  }

  return clients;
}

export const clients: Client[] = generateClients();

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

export function getClientsDueForRebooking(): Client[] {
  return clients.filter((c) => {
    const now = new Date("2025-12-20");
    const nextDate = new Date(c.nextOptimalDate);
    const diff = (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 14 && diff >= -60;
  });
}

export function getAtRiskClients(): Client[] {
  return clients.filter((c) => c.riskLevel === "high").slice(0, 20);
}
