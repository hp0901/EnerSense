import axios from "axios";

const TOKEN = process.env.Token;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

export const sendWhatsAppMessage = async (phone, message) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending WhatsApp:", error.response?.data);
  }
};