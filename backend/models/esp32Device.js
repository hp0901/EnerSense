import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, default: "Smart Device" },

    // 🔑 ROOT TARGET RELAY STATE
    relayState: { type: Boolean, default: true },

    lastSeen: { type: Date, default: Date.now },

    // 📊 REPORTED TELEMETRY METRICS SNAPSHOT
    telemetry: {
      voltage: { type: Number, default: 0 },
      current: { type: Number, default: 0 },
      power: { type: Number, default: 0 },
      temperature: { type: Number, default: 0 },
      humidity: { type: Number, default: 0 },
      relayState: { type: Boolean, default: false },
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { 
    timestamps: true,
    strict: false // 👈 Safety net to prevent stripping un-schema'd fields
  }
);

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

// Force-delete model cache so Mongoose recompiles schema changes immediately
delete mongoose.models.Device;
delete mongoose.models.Telemetry;

export const Device = mongoose.model("Device", deviceSchema);
export const Telemetry = mongoose.model("Telemetry", telemetrySchema);