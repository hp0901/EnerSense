import { messaging } from "../context/firebase.js";
import { getToken, onMessage } from "firebase/messaging";
import { saveDeviceTokenApi } from "../services/operations/PushnotificationAPI";

/* =========================
   REQUEST PERMISSION + SAVE TOKEN
========================= */

export const requestNotificationPermission = async () => {
  try {
    const existingToken = localStorage.getItem("fcmToken");

    if (existingToken) {
      console.log("✅ Token already exists");
      return existingToken;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {

      const fcmToken = await getToken(messaging, {
        vapidKey: "BNsKfqJgEGE9vGtteba5wf5KdRtloF2pjffpFNQUoCVPkz7smlXul2vse-aOXtUKvnu9fJCpwhY5h9j1ZASKH1g",
      });

      if (!fcmToken) return;

      console.log("🔥 New Token:", fcmToken);

      // ✅ Save once
      await saveDeviceTokenApi(fcmToken);

      // ✅ Store locally
      localStorage.setItem("fcmToken", fcmToken);

      return fcmToken;
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