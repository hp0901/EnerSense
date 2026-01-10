// routes/chatbot.js
import express from "express";
const router = express.Router();

router.post("/message", (req, res) => {
  const { message } = req.body;

  let reply = "Sorry, I didn’t understand that.";

  if (message.toLowerCase().includes("hello")) {
    reply = "Hi 👋 How can I help you?";
  } else if (message.includes("energy")) {
    reply = "EnerSense helps you monitor and optimize energy usage ⚡";
  }

  res.json({ reply });
});

export default router;
