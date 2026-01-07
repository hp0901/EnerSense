import mongoose from "mongoose";

const energySummarySchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    totalEnergy: {
      type: Number, // kWh
      required: true
    },

    avgPower: {
      type: Number
    },

    maxPower: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("EnergySummary", energySummarySchema);
