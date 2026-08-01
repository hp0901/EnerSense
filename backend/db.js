import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("🟢 MongoDB connected successfully");
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error.message);

    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;