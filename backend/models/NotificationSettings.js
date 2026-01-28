import mongoose from "mongoose";

const notificationSettingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    emailAlerts: {
      type: Boolean,
      default: true,
    },

    smsAlerts: {
      type: Boolean,
      default: true,
    },

    weeklyReports: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const NotificationSettings = mongoose.model(
  "NotificationSettings",
  notificationSettingsSchema
);

export default NotificationSettings;
