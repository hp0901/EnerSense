import NotificationSettings from "../models/NotificationSettings.js";

export const getNotificationSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    let settings = await NotificationSettings.findOne({ user: userId });

    if (!settings) {
      settings = await NotificationSettings.create({ user: userId });
    }

    res.status(200).json({
      success: true,
      data: {
        emailAlerts: settings.emailAlerts,
        smsAlerts: settings.smsAlerts,
        weeklyReports: settings.weeklyReports,
      },
    });
  } catch (error) {
    console.error("GET_NOTIFICATION_SETTINGS:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification settings",
    });
  }
};

export const updateNotificationSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { emailAlerts, smsAlerts, weeklyReports } = req.body;

    const settings = await NotificationSettings.findOneAndUpdate(
      { user: userId },
      { emailAlerts, smsAlerts, weeklyReports },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: {
        emailAlerts: settings.emailAlerts,
        smsAlerts: settings.smsAlerts,
        weeklyReports: settings.weeklyReports,
      },
    });
  } catch (error) {
    console.error("UPDATE_NOTIFICATION_SETTINGS:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification settings",
    });
  }
};
