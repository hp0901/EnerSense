import { apiConnector } from "../apiConnector";
import { chatbotEndpoints } from "../api";

/* ===============================
   SEND Chatbot Message
   =============================== */
export const sendChatbotMessage = async (message) => {
  try {
    const res = await apiConnector(
      "POST",
      chatbotEndpoints.SEND_MESSAGE_API,
      { message }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.reply; // only return reply text
  } catch (err) {
    console.log("SEND_CHATBOT_MESSAGE ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to send chatbot message"
    );
  }
};
