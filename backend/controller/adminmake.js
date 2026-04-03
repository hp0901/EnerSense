import User from "../models/User.js";
import { adminWelcomeTemplate } from "../Email/AdminEmail.js";
import speakeasy from "speakeasy";

/* ================= TOGGLE ADMIN ================= */
export const toggleAdminRole = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ Prevent self role change
    if (req.user.id === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    console.log("USER BEFORE:", user.role);

    const newRole = user.role === "admin" ? "user" : "admin";
    user.role = newRole;

    /* ================= 🔐 AUTO 2FA FOR ADMIN ================= */
    if (newRole === "admin") {
      // Generate secret
      const secret = speakeasy.generateSecret({
        name: `EnerSense (${user.email})`,
      });

      // Store secret but DO NOT enable yet
      user.twoFactorSecret = secret.base32;
      user.twoFactorEnabled = false;

      // Force user to setup 2FA on next login
      user.mustSetup2FA = true;
    } else {
      // Optional: remove 2FA if admin removed
      user.twoFactorEnabled = false;
      user.twoFactorSecret = null;
      user.mustSetup2FA = false;
    }

    await user.save();

    console.log("USER AFTER:", user.role);

    /* ================= EMAIL ================= */
    if (newRole === "admin") {
      try {
        const name = user.firstName || "User";
        await adminWelcomeTemplate(user.email, name);
      } catch (err) {
        console.log("Admin email failed:", err);
      }
    }

    return res.status(200).json({
      success: true,
      message:
        newRole === "admin"
          ? "🎉 User promoted to admin (2FA setup required)"
          : "Admin role removed",
      data: user,
    });

  } catch (error) {
    console.error("TOGGLE ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};


/* ================= REMOVE ADMIN ================= */
export const removeAdminRole = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ Prevent self-demotion
    if (req.user.id === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot remove your own admin role",
      });
    }

    // ❌ Prevent removing super admin (MAIN ADMIN)
    if (user.MainAdmin) {
      return res.status(400).json({
        success: false,
        message: "This admin cannot be removed",
      });
    }

    // ❌ Check if user is actually admin
    if (user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "User is not an admin",
      });
    }

    // 🔥 Remove admin + cleanup 2FA
    user.role = "user";
    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    user.mustSetup2FA = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Admin role removed successfully",
      data: user,
    });

  } catch (error) {
    console.error("REMOVE ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove admin role",
    });
  }
};