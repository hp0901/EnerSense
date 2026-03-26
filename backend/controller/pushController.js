import { sendPushNotification } from "../utils/pushService.js";

export const testPush = async (req, res) => {
  try {

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Device token is required"
      });
    }

    const response = await sendPushNotification(
      token,
      "EnerSense Alert ⚡",
      "Energy usage exceeded today's limit."
    );

    res.json({
      success: true,
      message: "Push notification sent",
      firebaseResponse: response
    });

  } catch (error) {

    console.error("Push notification error:", error);

    if (error.code === "messaging/registration-token-not-registered") {
      return res.status(400).json({
        success: false,
        message: "Device token expired. Please refresh the app."
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to send push notification"
    });

  }
};

export const saveDeviceToken = async (req, res) => {    
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Device token is required"
            });
        }
        
        // Here you would typically save the token to your database
        console.log("Received device token:", token);
        res.json({
            success: true,
            message: "Device token saved successfully"
        });
    } catch (error) {
        console.error("Error saving device token:", error);
        res.status(500).json({     
         success: false,
            message: "Failed to save device token"
        });
    }   
};
