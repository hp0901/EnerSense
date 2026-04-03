import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    state: { type: String, required: true },
    board: { type: String, required: true },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin","MainAdmin"],
      default: "user",
    },

    isSuperAdmin: {
      type: Boolean,
      default: false,
    },

    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],

    isVerified: { type: Boolean, default: true },

    profileImage: {
      type: String,
      default: "",
    },

    profileImageId: {
      type: String,
      default: "",
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    cardType: {
      type: String,
      enum: ["Silver", "Gold", "Platinum", "Bronze"],
      default: "Bronze",
    },

    // 🔐 PREMIUM SUBSCRIPTION FIELDS
    isPremium: {
      type: Boolean,
      default: false,
    },

    premiumPlan: {
      type: String,
      enum: ["1-month", "6-month", "1-year"],
      default: null,
    },

    premiumStartedAt: {
      type: Date,
      default: null,
    },

    premiumExpiresAt: {
      type: Date,
      default: null,
    },

    premiumExpiryReminderSent: {
      type: Boolean,
      default: false,
    },

    // 🔑 Unique EnerSense ID
    userUID: {
      type: String,
      unique: true,
      index: true,
    },

    // 🔐 DEVICE TOKEN FOR PUSH NOTIFICATIONS
    deviceToken: {
      type: String,
      default: null,
    },

    // 🔐 GOOGLE AUTHENTICATOR (2FA) FIELDS
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    twoFactorSecret: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

/// 🔥 AUTO-GENERATE UID
userSchema.pre("save", function () {
  if (!this.userUID) {
    this.userUID =
      "ENS-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }
});

export default mongoose.model("User", userSchema);