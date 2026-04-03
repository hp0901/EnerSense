import User from "../models/User.js";
import { sendPushNotification } from "../utils/pushService.js";

/* 🔔 TEST PUSH (Single User) */
export const testPush = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Device token is required",
      });
    }

    const response = await sendPushNotification(
      [token], // ✅ array
      "EnerSense Alert ⚡",
      "Energy usage exceeded today's limit.",
      "https://enersense.in/dashboard"
    );

    res.json({
      success: true,
      message: "Push notification sent",
      firebaseResponse: response,
    });

  } catch (error) {
    console.error("Push notification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send push notification",
    });
  }
};

/* 🔔 SAVE DEVICE TOKEN */
export const saveDeviceToken = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id; // 🔥 IMPORTANT

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Device token is required",
      });
    }

    // ✅ SAVE TOKEN IN DATABASE
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { deviceToken: token },
      { new: true }
    );

    console.log("✅ Token saved for user:", updatedUser._id);

    res.json({
      success: true,
      message: "Device token saved successfully",
    });

  } catch (error) {
    console.error("Error saving device token:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save device token",
    });
  }
};

/* 🔥 ADMIN: SEND NOTIFICATION TO USERS */
export const sendNotificationToUsers = async (req, res) => {
  try {
    const { title, message, audience, link } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    let users = [];

    // 🎯 Audience filter
    switch (audience) {
      case "premium":
        users = await User.find({ isPremium: true });
        break;

      case "non-premium":
        users = await User.find({ isPremium: false });
        break;

      case "new":
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        users = await User.find({
          createdAt: { $gte: last7Days },
        });
        break;

      default:
        users = await User.find();
    }

    const tokens = users
      .map((user) => user.deviceToken)
      .filter(Boolean);

    if (tokens.length === 0) {
      return res.json({
        success: true,
        message: "No users with valid device tokens",
      });
    }

    const response = await sendPushNotification(
      tokens,
      title,
      message,
      link
    );

    console.log("SUCCESS:", response.successCount);
    console.log("FAIL:", response.failureCount);
    console.log("RESPONSES:", response.responses);

    return res.json({
      success: true,
      message: `Notification sent to ${tokens.length} users 🚀`,
      firebase: response,
    });

  } catch (error) {
    console.error("SEND NOTIFICATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send notifications",
    });
  }
};