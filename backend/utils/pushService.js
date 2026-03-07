import admin from "../config/firebase.js";

export const sendPushNotification = async (token, title, body) => {

  try {

    const message = {
      notification: {
        title: title,
        body: body
      },
      token: token
    };

    const response = await admin.messaging().send(message);

    console.log("Push sent:", response);

    return response;

  } catch (error) {

    console.error("Push error:", error);

    // Handle invalid token
    if (error.code === "messaging/registration-token-not-registered") {
      console.log("Device token expired. Remove it from database.");
    }

    throw error;

  }

};