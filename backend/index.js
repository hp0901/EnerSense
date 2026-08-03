import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

// Routes
import userProfile from "./routes/user.js";
import chatbotRoutes from "./routes/chatbot.js";
import updatedprofile from "./routes/profile.js";
import getUserCard from "./routes/card.js";
import premiumRoutes from "./routes/Premium.js";
import profileRoutes from "./routes/profile.js";
import notificationSettingsRoutes from "./routes/notificationSettings.js";
import downloadInvoice from "./routes/pdf.js";
import getMyPayments from "./routes/payments.js";
import upload from "./routes/upload.js"; 
import esp32DeviceRoutes from "./routes/esp32DeviceRoutes.js"; // Standardized name
import adminRoutes from "./routes/adminDeviceRoutes.js";
import twoFactorRoutes from "./routes/twoFactorRoutes.js";
import whatsappRoutes from "./routes/whatsapp.js";
import smsRoutes from "./routes/smsRoutes.js";
import pushRoutes from "./routes/pushRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js"; // Import the device routes

import { startPremiumExpiryCron } from "./cron/premiumExpiryCron.js";

dotenv.config();

// Start the premium expiry cron job
startPremiumExpiryCron();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware 
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.33.101:3000",
      "https://enersense.in",
      "https://www.enersense.in"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Database Connection
connectDB();

// Health Check Endpoints
app.get("/", (req, res) => {
  res.send("⚡ EnerSense Backend is Live");
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "📡 EnerSense API is working perfectly"
  });
});

// App Routes
app.use("/api/v1/auth", userProfile);
app.use("/api/v1/user-card", getUserCard);
app.use("/api/v1/chatbot", chatbotRoutes);
app.use("/api/v1/profile", updatedprofile);
app.use("/api/v1/settings", notificationSettingsRoutes);
app.use("/api/v1/profile", profileRoutes);

// ESP32 Telemetry & Control Route
app.use("/api/v1/esp32device", esp32DeviceRoutes);

// Auxiliary Routes
app.use("/api/v1/premium", premiumRoutes);
app.use("/api/v1/invoice", downloadInvoice);
app.use("/api/v1/payments", getMyPayments);
app.use("/api/v1/uploads", upload);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/2fa", twoFactorRoutes);
app.use("/api/v1/whatsapp", whatsappRoutes);
app.use("/api/v1/sms", smsRoutes);
app.use("/api/v1/push", pushRoutes);

// Device Route 
app.use("/api/v1/device",deviceRoutes);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running locally on http://192.168.33.101:${PORT}`);
  console.log(`📡 Listening for ESP32 requests on http://192.168.33.101:${PORT}/api/v1/esp32device/telemetry`);
});