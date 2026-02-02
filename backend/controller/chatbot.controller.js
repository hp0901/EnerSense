export const chatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const user = req.user || null;

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "Please type a message so I can help 😊",
      });
    }

    const lowerMsg = message.toLowerCase();

    // 🔐 User-specific questions
    const asksPersonal =
      lowerMsg.includes("my name") ||
      lowerMsg.includes("my usage") ||
      lowerMsg.includes("my power") ||
      lowerMsg.includes("my details");

    if (asksPersonal) {
      if (!user || !user.id) {
        return res.status(200).json({
          success: true,
          reply:
            "To protect your privacy 🔐, please log in first. Once logged in, I can show your personal energy details 😊",
        });
      }

      const dbUser = await User.findById(user.id).select("name email");

      if (!dbUser) {
        return res.status(200).json({
          success: true,
          reply: "I couldn’t find your account details right now 😕",
        });
      }

      return res.status(200).json({
        success: true,
        reply: `Hi ${dbUser.name} 👋  
Your account is active, and your energy data is being monitored ⚡  
You can view detailed usage insights on your dashboard 📊`,
      });
    }

    // 🤖 Normal chatbot reply (SAFE)
    const reply = getChatbotReply(message) || "I'm here to help ⚡";

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("Chatbot Error:", error.message);

    return res.status(500).json({
      success: false,
      reply:
        "Oops 😕 something went wrong on my side. Please try again in a moment.",
    });
  }
};
