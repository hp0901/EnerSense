import User from "../models/User.js";
import { premiumActivatedTemplate } from "../Email/premiumActivated.js";
import { PREMIUM_PLANS } from "../utils/premiumPlans.js";

export const activatePremium = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan, autoRenew = false } = req.body;

    // ✅ Validate plan
    const planConfig = PREMIUM_PLANS[plan];

    if (!planConfig) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    // ✅ Get current user first (IMPORTANT for extension logic)
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Decide start date (extend if already active)
    const now = new Date();

    const startDate =
      existingUser.isPremium &&
      existingUser.premiumExpiresAt &&
      existingUser.premiumExpiresAt > now
        ? existingUser.premiumExpiresAt
        : now;

    // ✅ Calculate expiry
    const expiryDate = new Date(startDate);
    expiryDate.setDate(
      expiryDate.getDate() + planConfig.durationDays
    );

    // ✅ Update user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isPremium: true,
        premiumPlan: plan,
        premiumStartedAt: startDate,
        premiumExpiresAt: expiryDate,
        cardType: planConfig.cardType,
        autoRenew: autoRenew, // 🔥 NEW (optional control)
      },
      { new: true }
    ).select("-password");

    // ✅ Send email (non-blocking)
    try {
      await premiumActivatedTemplate(
        user.email,
        user.firstName,
        plan,
        expiryDate.toDateString()
      );
    } catch (emailError) {
      console.error("Premium email failed:", emailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Premium activated successfully",
      data: user,
    });

  } catch (error) {
    console.error("Activate premium error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to activate premium",
    });
  }
};