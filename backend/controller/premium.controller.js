import User from "../models/User.js";
import { premiumActivatedTemplate } from "../Email/premiumActivated.js";
import { PREMIUM_PLANS } from "../utils/premiumPlans.js";

export const activatePremium = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;

    // ✅ Validate plan (single source of truth)
    const planConfig = PREMIUM_PLANS[plan];

    if (!planConfig) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    // ✅ Calculate dates
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(
      startDate.getDate() + planConfig.durationDays
    );

    // ✅ Update user atomically
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isPremium: true,
        premiumPlan: plan,
        premiumStartedAt: startDate,
        premiumExpiresAt: expiryDate,
        cardType: planConfig.cardType,
      },
      { new: true }
    ).select("-password");

    // ✅ Safety check
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Send confirmation email (non-blocking)
    try {
      await premiumActivatedTemplate(
        user.email,
        user.firstName,
        plan,
        expiryDate.toDateString()
      );
    } catch (emailError) {
      console.error("Premium email failed:", emailError.message);
      // ❗ Do NOT fail API if email fails
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
