import { messaging } from "../context/firebase.js";
import { getToken, onMessage } from "firebase/messaging";
import { saveDeviceTokenApi } from "../services/operations/PushnotificationAPI";

/* =========================
   REQUEST PERMISSION + SAVE TOKEN
========================= */

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {

      const fcmToken = await getToken(messaging, {
        vapidKey: "BNsKfqJgEGE9vGtteba5wf5KdRtloF2pjffpFNQUoCVPkz7smlXul2vse-aOXtUKvnu9fJCpwhY5h9j1ZASKH1g"
      });

      if (!fcmToken) {
        console.log("❌ No FCM token generated");
        return;
      }

      console.log("🔥 Device Token:", fcmToken);

      // ✅ Save using API service
      await saveDeviceTokenApi(fcmToken);

      return fcmToken;

    } else {
      console.log("❌ Notification permission denied");
    }

  } catch (error) {
    console.error("❌ Notification error:", error);
  }
};

/* =========================
   LISTEN FOR FOREGROUND MESSAGES
========================= */

export const listenForMessages = () => {

  onMessage(messaging, (payload) => {

    console.log("🚀 PUSH RECEIVED:", payload);

    const title =
      payload?.notification?.title || "EnerSense Alert ⚡";

    const body =
      payload?.notification?.body || "Energy usage alert";

    if (Notification.permission === "granted") {

      new Notification(title, {
        body,
        icon: "/logo192.png",
      });

    }

  });

};