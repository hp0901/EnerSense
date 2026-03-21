import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 PREMIUM EXPIRY FIX (IMPORTANT)
    if (
      user.isPremium &&
      user.premiumExpiresAt &&
      user.premiumExpiresAt < new Date()
    ) {
      user.isPremium = false;
      user.premiumPlan = null; // optional cleanup
      user.cardType = null;    // optional cleanup
      await user.save();
    }

    // ✅ Attach updated user info
    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      isPremium: user.isPremium,
      premiumExpiresAt: user.premiumExpiresAt,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};