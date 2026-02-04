import User from "../models/User.js";
import { PREMIUM_PLANS } from "../utils/premiumPlans.js";
import { premiumActivatedTemplate } from "../Email/premiumActivated.js";

/**
 * Activates or extends premium for a user
 * Payment is ALREADY saved before calling this
 */
export const activatePremiumLogic = async (userId, plan) => {
  const planConfig = PREMIUM_PLANS[plan];
  if (!planConfig) {
    throw new Error("Invalid premium plan");
  }

  const now = new Date();

  const user = await User.findById(userId);

  let startDate = now;
  if (user.isPremium && user.premiumExpiresAt > now) {
    startDate = user.premiumExpiresAt;
  }

  const expiryDate = new Date(startDate);
  expiryDate.setDate(expiryDate.getDate() + planConfig.durationDays);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isPremium: true,
      premiumPlan: plan,
      premiumStartedAt: startDate,
      premiumExpiresAt: expiryDate,
      cardType:
        plan === "1-year"
          ? "Platinum"
          : plan === "6-month"
          ? "Gold"
          : "Silver",
    },
    { new: true }
  );

  // 📧 Email (non-blocking)
  try {
    await premiumActivatedTemplate(
      updatedUser.email,
      updatedUser.firstName,
      plan,
      expiryDate.toDateString()
    );
  } catch (err) {
    console.error("Premium email failed:", err.message);
  }

  return updatedUser;
};
