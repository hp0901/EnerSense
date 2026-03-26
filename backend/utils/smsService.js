import axios from "axios";

export const sendSMS = async (phone, message) => {
  try {
    const url = `https://api.msg91.com/api/sendhttp.php`;

    const response = await axios.get(url, {
      params: {
        authkey: process.env.MSG91_AUTH_KEY,
        mobiles: phone,
        message: message,
        sender: process.env.MSG91_SENDER_ID,
        route: 4,
        country: 91 
      }
    });

    console.log("SMS Sent:", response.data);

    return response.data;
  } catch (error) {
    console.error("SMS Error:", error.response?.data || error.message);
    throw error;
  }
};