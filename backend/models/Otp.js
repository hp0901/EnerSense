import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // ⏱ OTP expires after 5 minutes (300 seconds)
    },
  },
  { timestamps: true }
);

// Prevent model overwrite error in dev (nodemon)
const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;
