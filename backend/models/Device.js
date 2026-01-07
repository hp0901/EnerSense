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
      required: true
    },

    location: {
      type: String,
      default: "Unknown"
    },

    status: {
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
