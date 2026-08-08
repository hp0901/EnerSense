import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For deviceController compatibility
    name: { type: String, default: "Smart Device" },

    // 🔑 TARGET RELAY STATES (Supports Single + Dual Relays)
    relayState: { type: Boolean, default: false },  // Fallback / Relay 1
    relay1State: { type: Boolean, default: false }, // Relay Channel 1
    relay2State: { type: Boolean, default: false }, // Relay Channel 2

    lastSeen: { type: Date, default: Date.now },

    // 📊 REPORTED TELEMETRY METRICS SNAPSHOT
    telemetry: {
      voltage: { type: Number, default: 0 },
      current: { type: Number, default: 0 },
      power: { type: Number, default: 0 },
      temperature: { type: Number, default: 0 },
      humidity: { type: Number, default: 0 },
      relayState: { type: Boolean, default: false },  // Fallback
      relay1State: { type: Boolean, default: false }, // Reported Relay 1
      relay2State: { type: Boolean, default: false }, // Reported Relay 2
      updatedAt: { type: Date, default: Date.now },
    },
  },
  { 
    timestamps: true,
    strict: false // Stops Mongoose from stripping extra incoming payload parameters
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
  relay1State: Boolean,
  relay2State: Boolean,
  timestamp: { type: Date, default: Date.now },
});

// Force-delete model cache so Mongoose recompiles schema changes immediately
delete mongoose.models.Device;
delete mongoose.models.Telemetry;

export const Device = mongoose.model("Device", deviceSchema);
export const Telemetry = mongoose.model("Telemetry", telemetrySchema);

// Export default so 'import Device from ...' works across all routes
export default Device;