import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, default: "Smart Device" },
  relayState: { type: Boolean, default: true },
  lastSeen: { type: Date, default: Date.now },
  // Add telemetry snapshot field
  telemetry: {
    voltage: { type: Number, default: 0 },
    current: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    temperature: { type: Number, default: 0 },
    humidity: { type: Number, default: 0 },
    relayState: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
  },
});

const telemetrySchema = new mongoose.Schema({
  deviceId: { type: String, required: true, index: true },
  voltage: Number,
  current: Number,
  power: Number,
  temperature: Number,
  humidity: Number,
  relayState: Boolean,
  timestamp: { type: Date, default: Date.now },
});

export const Device = mongoose.models.Device || mongoose.model("Device", deviceSchema);
export const Telemetry = mongoose.models.Telemetry || mongoose.model("Telemetry", telemetrySchema);