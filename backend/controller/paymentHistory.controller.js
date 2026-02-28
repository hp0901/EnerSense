import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Device from "../models/Device.js";
import mongoose from "mongoose";

// ================= USER =================
export const getMyPayments = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: payments,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment history",
    });
  }
};

// ================= ADMIN =================
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "firstName lastName email")  // 🔥 THIS LINE IS IMPORTANT
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
    });
  }
};

// ================= DASHBOARD STATS =================
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDevices = await Device.countDocuments();
    const totalPayments = await Payment.countDocuments();

    const revenue = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDevices,
        totalPayments,
        totalRevenue: revenue[0]?.total || 0
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats"
    });
  }
};


// ================= MONTHLY REVENUE =================
export const getMonthlyRevenue = async (req, res) => {
  try {
    const monthlyRevenue = await Payment.aggregate([
      {
        $match: { status: "success" } // only successful payments
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Convert month number → month name
    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedData = monthlyRevenue.map(item => ({
      month: monthNames[item._id],
      revenue: item.totalRevenue
    }));

    return res.status(200).json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly revenue"
    });
  }
};