import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { userProfile } from "../api";

/* ===============================
   GET Notification Settings
   =============================== */
export const getNotificationSettings = async () => {
  try {
    const res = await apiConnector(
      "GET",
      userProfile.GET_NOTIFICATION_SETTINGS_API
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.data; // { emailAlerts, smsAlerts, weeklyReports }
  } catch (err) {
    console.log("GET_NOTIFICATION_SETTINGS ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch notification settings"
    );
  }
};

/* ===============================
   UPDATE Notification Settings
   =============================== */
export const updateNotificationSettings = async (payload) => {
  const toastId = toast.loading("Updating settings...");
  try {
    const res = await apiConnector(
      "PATCH",
      userProfile.UPDATE_NOTIFICATION_SETTINGS_API,
      payload
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    // toast.success("Settings updated");
    return res.data.data;
  } catch (err) {
    console.log("UPDATE_NOTIFICATION_SETTINGS ERROR", err);
    toast.error("Failed to update settings");
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to update notification settings"
    );
  } finally {
    toast.dismiss(toastId);
  }
};
