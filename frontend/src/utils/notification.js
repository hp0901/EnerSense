import { messaging } from "../context/firebase.js";
import { getToken, onMessage } from "firebase/messaging";

/* =========================
   REQUEST PERMISSION
========================= */

export const requestNotificationPermission = async () => {
  try {

    const permission = await Notification.requestPermission();

    if (permission === "granted") {

      const token = await getToken(messaging, {
        vapidKey: "BNsKfqJgEGE9vGtteba5wf5KdRtloF2pjffpFNQUoCVPkz7smlXul2vse-aOXtUKvnu9fJCpwhY5h9j1ZASKH1g"
      });

      console.log("Device Token:", token);

      // Send token to backend
      await fetch("http://localhost:4000/api/v1/push/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      return token;

    } else {

      console.log("Notification permission denied");

    }

  } catch (error) {

    console.error("Notification error:", error);

  }
};

/* =========================
   LISTEN FOR FOREGROUND MESSAGES
========================= */

export const listenForMessages = () => {

  onMessage(messaging, (payload) => {

    console.log("Foreground message received:", payload);

    const title = payload?.notification?.title || "EnerSense Alert ⚡";
    const body = payload?.notification?.body || "Energy usage alert";

    if (Notification.permission === "granted") {

      new Notification(title, {
        body: body,
        icon: "/logo192.png"
      });
      
    }

  });
  onMessage(messaging, (payload) => {
      console.log("🚀 PUSH RECEIVED:", payload);
      });
      onMessage(messaging, (payload) => {

  console.log("🚀 PUSH RECEIVED:", payload);

  const title = payload?.notification?.title;
  const body = payload?.notification?.body;

  console.log("📢 Notification title:", title);
  console.log("📢 Notification body:", body);

  if (Notification.permission === "granted") {

    console.log("✅ Showing notification");

    new Notification(title, {
      body: body,
      icon: "/logo192.png"
    });

  } else {
    console.log("❌ Notification permission not granted");
  }

});
};