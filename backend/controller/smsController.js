import { sendSMS } from "../utils/smsService.js";

export const testSMS = async (req, res) => {
  try {

    const phone = "9687788992"; // your number
    const message = "EnerSense Alert ⚡ Energy usage exceeded today.";

    const result = await sendSMS(phone, message);

    res.status(200).json({
      success: true,
      message: "SMS sent successfully",
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to send SMS",
      error: error.message
    });

  }
};