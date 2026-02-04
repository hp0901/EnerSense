export const PREMIUM_PLANS = {
  "1-month": {
    price: 1,
    durationDays: 30,
    cardType: "Silver",
  },
  "6-month": {
    price: Math.round(99 * 6 * 0.9),
    durationDays: 180,
    cardType: "Gold",
  },
  "1-year": {
    price: Math.round(99 * 12 * 0.85),
    durationDays: 365,
    cardType: "Platinum",
  },
};
