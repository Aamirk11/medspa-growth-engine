import type { Provider } from "@/types";

export const providers: Provider[] = [
  {
    id: "prov-1",
    name: "Dr. Sarah Chen",
    title: "Medical Director, MD",
    specialties: ["Botox", "Dermal Fillers", "PRP"],
    clientCount: 187,
    revenue: 28400,
    avatar: "SC",
  },
  {
    id: "prov-2",
    name: "Jessica Martinez",
    title: "Nurse Practitioner, NP",
    specialties: ["Laser Hair Removal", "Chemical Peels", "Microneedling"],
    clientCount: 156,
    revenue: 18200,
    avatar: "JM",
  },
  {
    id: "prov-3",
    name: "Rachel Kim",
    title: "Licensed Aesthetician",
    specialties: ["HydraFacial", "Chemical Peels", "LED Therapy"],
    clientCount: 110,
    revenue: 11800,
    avatar: "RK",
  },
];
