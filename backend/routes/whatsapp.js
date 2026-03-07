import express from "express";
import { sendWhatsAppMessage } from "../utils/whatsappService.js";

const router = express.Router();

router.get("/test-whatsapp", async (req, res) => {
  await sendWhatsAppMessage(
    "91XXXXXXXXXX",
    "⚡ EnerSense Alert\nYour energy usage crossed today's limit."
  );

  res.send("WhatsApp message sent!");
});

export default router;