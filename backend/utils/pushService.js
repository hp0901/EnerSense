import admin from "../config/firebase.js";

export const sendPushNotification = async (tokens, title, body, link) => {
  try {
    if (!tokens || tokens.length === 0) return;

    const message = {
      notification: {
        title,
        body,
      },
      data: {
        link: link || "",
      },
      tokens, // 🔥 multiple tokens
    };

    const response = await admin
      .messaging()
      .sendEachForMulticast(message);

    console.log("✅ Push sent:", response.successCount);

    return response;

  } catch (error) {
    console.error("Push error:", error);

    throw error;
  }
};