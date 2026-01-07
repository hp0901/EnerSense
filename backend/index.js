import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userProfile  from "./routes/user.js";
// Load env variables

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware 
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
}));
app.use(express.json()); 
 
// Connect Database 
connectDB();
  
// Routes
app.get("/", (req, res) => {
  res.send("⚡ EnerSense Backend is Live");
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "📡 EnerSense API is working perfectly"
  });
});

//user Profile routes
console.log("first stage of backend index.js")
app.use("/api/v1/auth", userProfile);
// app.use("/api/v1/auth/signup", userProfile);
// app.use("/api/v1/auth/sendotp", userProfile);
// app.use("/api/v1/auth/reset-password-token", userProfile);
// app.use("/api/v1/auth/reset-password", userProfile);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
