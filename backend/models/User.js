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
      // select: false, // 🔐 hides password by default
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
      enum: ["user", "admin"],
      default: "user",
    },

    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],

    isVerified: { type: Boolean, default: true },

    image: String,

    cardType: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
      default: "Silver",
    },

    userUID: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

/// 🔥 AUTO-GENERATE UID (SYNC)
userSchema.pre("save", function () {
  if (!this.userUID) {
    this.userUID =
      "ENS-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }
});

export default mongoose.model("User", userSchema);
