import type { Review, ReadyToAskClient } from "@/types";

const reviewTexts = {
  positive: [
    "Dr. Chen is absolutely amazing! My Botox results look so natural. I've been coming here for over a year and will never go anywhere else.",
    "Best HydraFacial I've ever had! Rachel really knows her stuff. My skin was glowing for days afterward.",
    "Jessica did my laser hair removal and I'm SO happy with the results. Virtually painless and super effective.",
    "Love this place! The staff is so friendly and professional. My fillers look incredible - exactly what I wanted.",
    "I've tried many medspas in Scottsdale and Glow Aesthetics is by far the best. Worth every penny.",
    "Had my first chemical peel here and wow, what a difference! My skin hasn't looked this good in years.",
    "The whole experience from booking to aftercare is seamless. Dr. Chen took the time to explain everything.",
    "Rachel's HydraFacials are addictive! I come every month and my skin has never looked better.",
    "Got Botox for the first time and was so nervous, but Dr. Chen made me feel completely at ease. Results are perfect!",
    "Jessica is a miracle worker with laser treatments. After 4 sessions I'm basically hair-free!",
    "The microneedling results exceeded my expectations. My acne scars are practically invisible now.",
    "Absolutely love the atmosphere here. It's clean, modern, and relaxing. The results speak for themselves.",
    "I drive 45 minutes to come here because no one else compares. Dr. Chen is the best in the valley.",
    "My lip fillers look so natural! Everyone asks what I'm doing differently but no one can tell it's filler.",
    "Had a package deal on HydraFacials and it was the best investment I've made for my skin.",
    "The team here genuinely cares about their clients. They follow up after every treatment to make sure I'm happy.",
    "Botox results were exactly what I wanted - I can still move my face but the lines are gone!",
    "Just had my 6th visit and I'm a client for life. Consistent, excellent results every single time.",
    "Rachel recommended a treatment plan for my skin concerns and it's been transformative. So grateful!",
    "The online booking system is so convenient and they always run on time. Rare for a medspa!",
    "My friend recommended Glow Aesthetics and now I recommend them to everyone I know.",
    "Dr. Chen's approach is so thoughtful - she won't over-inject and always prioritizes natural results.",
    "The pricing is fair for the quality you get. I've paid more at other places for inferior results.",
    "Just did the PRP facial and my skin looks 10 years younger. Not even exaggerating!",
    "Everything about this place screams quality - from the products they use to the expertise of the staff.",
    "Had a bad experience at another medspa and Glow Aesthetics restored my confidence. Thank you!",
    "Jessica's chemical peels are gentle but effective. No downtime and amazing results.",
    "I was hesitant about fillers but after my consultation with Dr. Chen I felt completely confident.",
    "The results from my laser treatment are mind-blowing. Should have done this years ago!",
    "Obsessed with this place! Monthly HydraFacials have become my self-care non-negotiable.",
  ],
  neutral: [
    "Good experience overall. Results were as expected. Would come back.",
    "Nice facility and friendly staff. Treatment was fine, nothing extraordinary.",
    "Decent results from my Botox treatment. Pricing is on the higher side for the area.",
    "Professional service. The wait time was a bit long but the treatment itself was good.",
    "First visit was fine. Need to see long-term results before giving 5 stars.",
    "Clean facility, nice staff. My HydraFacial was relaxing but I expected more dramatic results.",
    "Good medspa but parking can be difficult. Treatment quality is solid though.",
    "Average experience. The consultation felt a bit rushed but the actual procedure went well.",
  ],
  negative: [
    "Had to wait 30 minutes past my appointment time. The treatment was fine but the wait was frustrating.",
    "Results weren't what I expected. The consultation should have been more thorough about realistic outcomes.",
    "Pricing seems high compared to similar medspas in the area. Quality is good but not exceptional for the price.",
  ],
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(789);

function generateReviews(): Review[] {
  const reviews: Review[] = [];
  const platforms: Array<"google" | "yelp" | "facebook"> = ["google", "google", "google", "yelp", "yelp", "facebook"];

  // 116 positive (5 or 4 stars)
  for (let i = 0; i < 116; i++) {
    const text = reviewTexts.positive[i % reviewTexts.positive.length];
    reviews.push({
      id: `rev-${i + 1}`,
      clientId: `client-${Math.floor(rand() * 453) + 1}`,
      clientName: `Client ${i + 1}`,
      platform: platforms[Math.floor(rand() * platforms.length)],
      rating: rand() > 0.35 ? 5 : 4,
      text,
      date: `2025-${String(Math.floor(rand() * 12) + 1).padStart(2, "0")}-${String(Math.floor(rand() * 28) + 1).padStart(2, "0")}`,
      responded: rand() > 0.15,
      sentiment: "positive",
    });
  }

  // 8 neutral (3 stars)
  for (let i = 0; i < 8; i++) {
    const text = reviewTexts.neutral[i % reviewTexts.neutral.length];
    reviews.push({
      id: `rev-${117 + i}`,
      clientId: `client-${Math.floor(rand() * 453) + 1}`,
      clientName: `Client ${117 + i}`,
      platform: platforms[Math.floor(rand() * platforms.length)],
      rating: 3,
      text,
      date: `2025-${String(Math.floor(rand() * 12) + 1).padStart(2, "0")}-${String(Math.floor(rand() * 28) + 1).padStart(2, "0")}`,
      responded: rand() > 0.3,
      sentiment: "neutral",
    });
  }

  // 3 negative (2 or 1 stars)
  for (let i = 0; i < 3; i++) {
    const text = reviewTexts.negative[i % reviewTexts.negative.length];
    reviews.push({
      id: `rev-${125 + i}`,
      clientId: `client-${Math.floor(rand() * 453) + 1}`,
      clientName: `Client ${125 + i}`,
      platform: platforms[Math.floor(rand() * platforms.length)],
      rating: 2,
      text,
      date: `2025-${String(Math.floor(rand() * 6) + 7).padStart(2, "0")}-${String(Math.floor(rand() * 28) + 1).padStart(2, "0")}`,
      responded: true,
      sentiment: "negative",
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const reviews: Review[] = generateReviews();

export const reviewStats = {
  total: 127,
  averageRating: 4.7,
  thisMonth: 14,
  responseRate: 89,
  byPlatform: {
    google: 72,
    yelp: 35,
    facebook: 20,
  },
  bySentiment: {
    positive: 116,
    neutral: 8,
    negative: 3,
  },
  byRating: {
    5: 82,
    4: 34,
    3: 8,
    2: 3,
    1: 0,
  },
};

export const readyToAskClients: ReadyToAskClient[] = [
  { clientId: "client-15", clientName: "Scarlett Johnson", treatment: "Botox", date: "2025-12-10", satisfactionScore: 5 },
  { clientId: "client-33", clientName: "Victoria Lee", treatment: "HydraFacial", date: "2025-12-12", satisfactionScore: 5 },
  { clientId: "client-58", clientName: "Aria Clark", treatment: "Dermal Fillers", date: "2025-12-08", satisfactionScore: 4 },
  { clientId: "client-91", clientName: "Grace Nguyen", treatment: "Laser Hair Removal", date: "2025-12-14", satisfactionScore: 5 },
  { clientId: "client-124", clientName: "Chloe Walker", treatment: "Chemical Peels", date: "2025-12-11", satisfactionScore: 4 },
  { clientId: "client-167", clientName: "Camila Scott", treatment: "Microneedling", date: "2025-12-09", satisfactionScore: 5 },
  { clientId: "client-210", clientName: "Penelope Hill", treatment: "HydraFacial", date: "2025-12-13", satisfactionScore: 5 },
  { clientId: "client-289", clientName: "Riley Adams", treatment: "Botox", date: "2025-12-07", satisfactionScore: 4 },
];
