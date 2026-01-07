import mongoose from "mongoose";

const deviceLogSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true
    },

    message: {
      type: String,
      required: true
    },

    level: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info"
    }
  },
  { timestamps: true }
);

export default mongoose.model("DeviceLog", deviceLogSchema);
