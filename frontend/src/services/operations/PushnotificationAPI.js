import { apiConnector } from "../apiConnector";
import { notificationEndpoints } from "../api";

export const saveDeviceTokenApi = async (fcmToken) => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "POST",
      notificationEndpoints.SAVE_DEVICE_TOKEN,
      { token: fcmToken },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    console.log("✅ Token saved in DB");

    return res.data.message;

  } catch (err) {
    console.log("SAVE DEVICE TOKEN ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to save device token"
    );
  }
};