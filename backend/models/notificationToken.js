import mongoose from "mongoose";

const notificationTokenSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  token: {
    type: String,
    required: true
  },

  deviceType: {
    type: String,
    enum: ["android", "ios", "web"],
    default: "web"
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true }
);

export default mongoose.model("NotificationToken", notificationTokenSchema);