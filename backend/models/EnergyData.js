import mongoose from "mongoose";

const energyDataSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true
    },

    voltage: {
      type: Number,
      required: true
    },

    current: {
      type: Number,
      required: true
    },

    power: {
      type: Number,
      required: true
    },

    energy: {
      type: Number // kWh
    },

    frequency: {
      type: Number
    },

    temperature: {
      type: Number
    },

    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("EnergyData", energyDataSchema);
