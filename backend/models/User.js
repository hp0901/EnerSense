import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

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
      countryCode: {
        type: String,
        default: "+91",
      },
      number: {
        type: String,
        required: true,
        unique: true,
      },
    },

    state: {
      type: String,
      required: true,
    },

    board: {
      type: String,
      required: true,
    },

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

    devices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
      },
    ],

    isVerified: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
    },

    cardType: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
      default: "Silver",
    },

    // ✅ Digital Identity UID
    userUID: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

/// 🔥 AUTO-GENERATE UID BEFORE SAVE
userSchema.pre("save", function (next) {
  if (!this.userUID) {
    this.userUID =
      "ENS-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }
  next();
});

export default mongoose.model("User", userSchema);
