import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      default: "EnerSense Device"
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null   // ❗ allow unpaired device
    },

    location: {
      type: String,
      default: "Unknown"
    },

    deviceType: {
      type: String,
      lowercase: true, // 👈 Converts "AC" -> "ac", "Bulb" -> "bulb" before validation
      enum: [
        "bulb",
        "fan",
        "plug",
        "ac",
        "meter",   // 👈 Added "meter" to match frontend option
        "heater",
        "tv",
        "fridge",
        "washer",
        "oven",
        "speaker",
        "computer",
        "router",
        "other"
      ],
      default: "bulb"
    },

    powerStatus: {
      type: Boolean,
      default: false
    },

    voltage: {
      type: Number,
      default: 0
    },

    usage: {
      type: Number,
      default: 0
    },

    connectionStatus: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    },

    lastSeen: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Device", deviceSchema);