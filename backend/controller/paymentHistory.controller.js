import Payment from "../models/Payment.js";
import mongoose from "mongoose";

export const getMyPayments = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log("JWT USER ID:", req.user.id);

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
