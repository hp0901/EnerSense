// models/Device.js
import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      default: "EnerSense Device",
    },

    // 🔑 Linked to user (matches getMyDevices controller)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // allows unpaired devices in admin master pool
    },

    location: {
      type: String,
      default: "Unknown",
    },

    deviceType: {
      type: String,
      lowercase: true,
      enum: [
        "bulb",
        "fan",
        "plug",
        "ac",
        "meter",
        "heater",
        "tv",
        "fridge",
        "washer",
        "oven",
        "speaker",
        "computer",
        "router",
        "other",
      ],
      default: "bulb",
    },

    // ⚡ MULTI-RELAY STATES (Fixes switch flipping issue)
    relay1State: {
      type: Boolean,
      default: false,
    },

    relay2State: {
      type: Boolean,
      default: false,
    },

    // Backward compatibility single relay toggle
    powerStatus: {
      type: Boolean,
      default: false,
    },

    connectionStatus: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    // 📊 LIVE SENSOR TELEMETRY METRICS SNAPSHOT (Matches ESP32 Readouts)
    telemetry: {
      voltage: { type: Number, default: 0 },
      current: { type: Number, default: 0 },
      power: { type: Number, default: 0 },
      temperature: { type: Number, default: 0 },
      humidity: { type: Number, default: 0 },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { 
    timestamps: true,
    strict: false // Prevents stripping unexpected incoming telemetry fields
  }
);

// 📈 Historical Telemetry Time-Series Collection
const telemetrySchema = new mongoose.Schema({
  deviceId: { type: String, required: true, index: true },
  voltage: { type: Number, default: 0 },
  current: { type: Number, default: 0 },
  power: { type: Number, default: 0 },
  temperature: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 },
  relay1State: { type: Boolean, default: false },
  relay2State: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

// Force re-compilation on schema updates
delete mongoose.models.Device;
delete mongoose.models.Telemetry;

export const Device = mongoose.model("Device", deviceSchema);
export const Telemetry = mongoose.model("Telemetry", telemetrySchema);

// 👈 Default export ensures `import Device from "../models/Device.js"` works everywhere!
export default Device;