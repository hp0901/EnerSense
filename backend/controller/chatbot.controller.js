import User from "../models/User.js";
import Board from "../models/Board.js";
import Device from "../models/Device.js";
import DeviceLog from "../models/DeviceLog.js";
import EnergyData from "../models/EnergyData.js";
import EnergySummary from "../models/EnergySummary.js";
import { getChatbotReply } from "../utils/chatbot.logic.js";

export const chatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const user = req.user || null;

    if (!message || message.trim() === "") {
      return res.status(200).json({
        success: true,
        reply: "Hey 👋 Ask me about your boards, devices, or energy usage ⚡",
      });
    }

    const lowerMsg = message.toLowerCase();

    /* ---------------- GREETINGS ---------------- */
    if (["hi", "hello", "hey"].some(word => lowerMsg.includes(word))) {
      return res.status(200).json({
        success: true,
        reply: "Hi 👋 I'm your EnerSense Assistant ⚡\nWhat would you like to check?",
      });
    }

    /* ---------------- AUTH CHECK ---------------- */
    if (!user || !user.id) {
      return res.status(200).json({
        success: true,
        reply: "🔐 Please log in to access your energy data.",
      });
    }

    /* ---------------- USER INFO ---------------- */
    if (
      lowerMsg.includes("who am i") ||
      lowerMsg.includes("my name") ||
      lowerMsg.includes("my account")
    ) {
      const dbUser = await User.findById(user.id).select(
        "firstName lastName cardType role"
      );

      if (!dbUser) {
        return res.status(200).json({
          success: true,
          reply: "I couldn't find your account right now 😕",
        });
      }

      return res.status(200).json({
        success: true,
        reply: `👋 Hi ${dbUser.firstName} ${dbUser.lastName}
Plan: ${dbUser.cardType} ⭐
Role: ${dbUser.role}`,
      });
    }

    /* ---------------- BOARDS ---------------- */
    if (lowerMsg.includes("board")) {
      const boards = await Board.find({ user: user.id });

      if (!boards.length) {
        return res.status(200).json({
          success: true,
          reply: "You don’t have any boards registered yet 📟",
        });
      }

      const reply = boards
        .map(
          b =>
            `📟 ${b.boardName} (${b.state}) - ${b.status.toUpperCase()}`
        )
        .join("\n");

      return res.status(200).json({ success: true, reply });
    }

    /* ---------------- DEVICES ---------------- */
    if (lowerMsg.includes("device")) {
      const devices = await Device.find({ user: user.id });

      if (!devices.length) {
        return res.status(200).json({
          success: true,
          reply: "No devices found for your account 🔌",
        });
      }

      const reply = devices
        .map(
          d =>
            `🔌 ${d.name} | ${d.status.toUpperCase()} | ${d.location}`
        )
        .join("\n");

      return res.status(200).json({ success: true, reply });
    }

    /* ---------------- DEVICE LOGS ---------------- */
    if (lowerMsg.includes("log")) {
      const logs = await DeviceLog.find()
        .populate("device", "name")
        .sort({ createdAt: -1 })
        .limit(5);

      if (!logs.length) {
        return res.status(200).json({
          success: true,
          reply: "No recent device logs found 📄",
        });
      }

      const reply = logs
        .map(
          l =>
            `⚠️ ${l.device?.name}: ${l.message} (${l.level})`
        )
        .join("\n");

      return res.status(200).json({ success: true, reply });
    }

    /* ---------------- LIVE ENERGY DATA ---------------- */
    if (
      lowerMsg.includes("energy") ||
      lowerMsg.includes("voltage") ||
      lowerMsg.includes("power")
    ) {
      const data = await EnergyData.find()
        .populate("device", "name")
        .sort({ recordedAt: -1 })
        .limit(1);

      if (!data.length) {
        return res.status(200).json({
          success: true,
          reply: "No live energy data available ⚡",
        });
      }

      const d = data[0];

      return res.status(200).json({
        success: true,
        reply: `⚡ ${d.device.name}
Voltage: ${d.voltage}V
Current: ${d.current}A
Power: ${d.power}W`,
      });
    }

    /* ---------------- DAILY SUMMARY ---------------- */
    if (
      lowerMsg.includes("summary") ||
      lowerMsg.includes("today") ||
      lowerMsg.includes("daily")
    ) {
      const summary = await EnergySummary.find()
        .populate("device", "name")
        .sort({ date: -1 })
        .limit(1);

      if (!summary.length) {
        return res.status(200).json({
          success: true,
          reply: "No daily summary found 📊",
        });
      }

      const s = summary[0];

      return res.status(200).json({
        success: true,
        reply: `📊 Daily Summary (${s.device.name})
Energy: ${s.totalEnergy} kWh
Avg Power: ${s.avgPower} W
Max Power: ${s.maxPower} W`,
      });
    }

    /* ---------------- FALLBACK ---------------- */
    const reply =
      getChatbotReply(message) ||
      "🤔 I can help with boards, devices, logs, and energy data.\nTry asking: *my devices* or *today’s energy*";

    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chatbot Error:", error.message);
    return res.status(500).json({
      success: false,
      reply: "😕 Something went wrong. Please try again.",
    });
  }
};
