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
  },
  { timestamps: true }
);

// ✅ TTL index on createdAt
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Prevent model overwrite error in dev
const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;
