import User from "../models/User.js";
import Board from "../models/Board.js";
import Device from "../models/Device.js";
import DeviceLog from "../models/DeviceLog.js";
import EnergyData from "../models/EnergyData.js";
import EnergySummary from "../models/EnergySummary.js";

import { detectIntent } from "../utils/intentDetector.js";
import { getAIReply } from "../services/groq.service.js";

export const chatbotMessage = async (req, res) => {
  try { 
    const { message } = req.body;
    const user = req.user || null;

    console.log("Incoming:", message);
 
    if (!message || message.trim() === "") {
      return res.json({
        success: true,
        reply: "👋 Ask about energy, devices or boards ⚡",
      });
    }

    const intent = detectIntent(message);
    console.log("Intent:", intent);

    let reply = "";

    /* ---------- GREETING ---------- */
    if (intent === "greeting") {
      reply = "Hi 👋 I'm your EnerSense Assistant ⚡";
    }

    /* ---------- AUTH ---------- */
    else if (!user || !user.id) {
      reply = "🔐 Please login first.";
    }

    /* ---------- USER ---------- */
    else if (intent === "user") {
      const dbUser = await User.findById(user.id);

      reply = dbUser
        ? `👋 ${dbUser.firstName} ${dbUser.lastName}`
        : "User not found";
    }

    /* ---------- BOARDS ---------- */
    else if (intent === "boards") {
      const boards = await Board.find({ user: user.id });

      reply = boards.length
        ? boards.map(b => `📟 ${b.boardName}`).join("\n")
        : "No boards found";
    }

    /* ---------- DEVICES ---------- */
    else if (intent === "devices") {
      const devices = await Device.find({ user: user.id });

      reply = devices.length
        ? devices.map(d => `🔌 ${d.name}`).join("\n")
        : "No devices found";
    }

    /* ---------- LOGS ---------- */
    else if (intent === "logs") {
      const logs = await DeviceLog.find().limit(5);

      reply = logs.length
        ? logs.map(l => `⚠️ ${l.message}`).join("\n")
        : "No logs";
    }

    /* ---------- ENERGY ---------- */
    else if (intent === "energy") {
      const d = await EnergyData.findOne().sort({ recordedAt: -1 });

      reply = d
        ? `⚡ Power: ${d.power}W`
        : "No energy data";
    }

    /* ---------- SUMMARY ---------- */
    else if (intent === "summary") {
      const s = await EnergySummary.findOne().sort({ date: -1 });

      reply = s
        ? `📊 Energy: ${s.totalEnergy} kWh`
        : "No summary";
    }

    /* ---------- AI FALLBACK ---------- */
    else {
      console.log("AI INPUT:", message);

      const aiReply = await getAIReply(message);

      if (aiReply && aiReply.trim() !== "") {
        reply = aiReply;
      } else {
        reply = "😕 I couldn't understand. Try asking differently.";
      }
    }

    return res.json({
      success: true,
      reply,
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    return res.status(500).json({
      success: false,
      reply: "⚠️ Server error: " + err.message,
    });
  }
};