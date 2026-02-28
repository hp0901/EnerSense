import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userProfile from "./routes/user.js";
import chatbotRoutes from "./routes/chatbot.js";
import updatedprofile from "./routes/profile.js";
import getUserCard from "./routes/card.js";
import premiumRoutes from "./routes/Premium.js";
import profileRoutes from "./routes/profile.js";
import { startPremiumExpiryCron } from "./cron/premiumExpiryCron.js";
import notificationSettingsRoutes from "./routes/notificationSettings.js";
import downloadInvoice from "./routes/pdf.js";
import getMyPayments from "./routes/payments.js";
import path from "path";
import upload from "./routes/upload.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import adminRoutes from "./routes/adminDeviceRoutes.js";
import twoFactorRoutes from "./routes/twoFactorRoutes.js";

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
      "https://enersense.netlify.app",
      "https://enersense.duckdns.org"
    ],
    credentials: true
  })
);

app.use(express.json());
 
// Database
connectDB();

// Health check
app.get("/", (req, res) => {
  res.send("⚡ EnerSense Backend is Live");
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "📡 EnerSense API is working perfectly"
  });
});
  
// Routes
app.use("/api/v1/auth", userProfile);
app.use("/api/v1/user-card", getUserCard );
app.use("/api/v1/chatbot", chatbotRoutes);
app.use("/api/v1/profile",updatedprofile)
app.use("/api/v1/settings", notificationSettingsRoutes);
app.use("/api/v1/profile", profileRoutes);

// Device routes
app.use("/api/v1/device", deviceRoutes);


// Premium routes
app.use("/api/v1/premium", premiumRoutes);

//Download invoice route
app.use("/api/v1/invoice", downloadInvoice);
app.use("/api/v1/payments",  getMyPayments);

//Server upload static files
app.use("/api/v1/uploads", upload);

//For Admin panel
app.use("/api/v1/admin", adminRoutes);

// 2FA routes
app.use("/api/v1/2fa", twoFactorRoutes);

 
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
