import admin from "firebase-admin";
import NotificationToken from "../models/notificationToken.js";

export const sendPushNotification = async (userId, title, body) => {

  try {

    const tokens = await NotificationToken.find({ user: userId });

    const tokenList = tokens.map(t => t.token);

    if(tokenList.length === 0) return;

    const message = {
      notification:{
        title,
        body
      },
      tokens: tokenList
    };

    const response = await admin.messaging().sendEachForMulticast(message);

    return response;

  } catch(error){

    console.error("PUSH_NOTIFICATION_ERROR",error);

  }

};