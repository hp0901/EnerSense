import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true
    },

    type: {
      type: String,
      enum: ["HIGH_POWER", "HIGH_TEMP", "DEVICE_OFFLINE"],
      required: true
    },

    message: {
      type: String,
      required: true
    },

    value: {
      type: Number
    },

    threshold: {
      type: Number
    },

    isResolved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
