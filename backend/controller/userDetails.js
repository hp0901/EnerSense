import User from "../models/User.js";
import Device from "../models/Device.js";

// ================= ADMIN =================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ================= GET USER BY ID =================
export const getUserById = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 COUNT DEVICES FROM DEVICE COLLECTION
    const deviceCount = await Device.countDocuments({ user: id });

    return res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        deviceCount,
      },
    });

  } catch (error) {
    console.error("GET USER BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};