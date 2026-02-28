import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import User from "../models/User.js";
import OTP from "../models/Otp.js"
import dotenv from "dotenv";
import { sendOtpEmail } from "../Email/sendOtpEmail.js";
import { sendWelcomeEmail } from "../Email/welcome.js";
import Board from "../models/Board.js";
import { generateUserUID, generateBoardUID } from "../utils/uid.js";
import {forgotOtpTemplate} from "../Email/forgotOtpTemplate.js";
import { passwordResetSuccessTemplate } from "../Email/passwordResetSuccessTemplate.js";
import { isStrongPassword } from "../utils/passwordValidator.js";
import speakeasy from "speakeasy";

dotenv.config();

 console.log("Here in Signup")
// ===============================
// SIGNUP CONTROLLER
// ===============================
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      state,
      board,
      gender,
      otp,
    } = req.body;

    // 1️⃣ Validate fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !state ||
      !board ||
      !gender ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Verify OTP
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp || recentOtp.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ❌ REMOVE manual hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user (password stays plain here)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // ✅ will be hashed in pre-save
      phone: phone,
      state,
      board,
      gender,
      userUID: generateUserUID(),
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // 5️⃣ Auto-create board
    const existingBoard = await Board.findOne({ user: user._id });
    if (!existingBoard) {
      await Board.create({
        boardUID: generateBoardUID(state),
        user: user._id,
        boardName: board,
        state,
        location: "Home",
        status: "active",
      });
    }

    // 6️⃣ Delete OTP
    await OTP.deleteMany({ email });

    // 7️⃣ Welcome email
    await sendWelcomeEmail(email, firstName);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};



// ===============================
// LOGIN CONTROLLER
// ===============================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 🔐 ADMIN CHECK MUST COME BEFORE TOKEN GENERATION
    if (user.role === "admin") {

      if (!user.twoFactorEnabled) {
        return res.status(403).json({
          success: false,
          message: "Admin must enable 2FA",
        });
      }

      return res.status(200).json({
        success: true,
        require2FA: true,
        userId: user._id,
      });
    }

    // ✅ NORMAL USER TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// const otpGenerator = require("otp-generator");

// ===============================
// SEND OTP
// ===============================
export const sendotp = async (req, res) => {
  try {
    const { email, firstName } = req.body;
    console.log("SEND OTP BODY:", req.body);
    console.log("FIRST NAME:", firstName);


    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, otp });

    // ✅ FIXED CALL
    await sendOtpEmail(email, firstName, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "OTP sending failed",
    });
  }
};

// ===============================
// FORGOT PASSWORD - SEND OTP
// ===============================
export const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // ✅ User MUST exist for forgot password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔐 Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // 🧹 Remove old OTPs
    await OTP.deleteMany({ email });

    // 💾 Save new OTP (TTL auto-expires)
    await OTP.create({ email, otp });

    // 📧 Send OTP email (reuse your existing email util)
    await forgotOtpTemplate( email,  user.firstName, otp );

    return res.status(200).json({
      success: true,
      message: "OTP sent for password reset",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// ===============================
// FORGOT PASSWORD - VERIFY OTP
// ===============================
export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // 🔍 Get latest OTP for email
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    if (recentOtp.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 🧹 OTP used → delete
    await OTP.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    console.error("VERIFY FORGOT OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

// ===============================
// RESET PASSWORD
// ===============================
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔐 PASSWORD STRENGTH CHECK
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🚫 CHECK: new password must not be same as old
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password",
      });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Update password
    user.password = hashedPassword;
    await user.save();

    // 📧 Send confirmation email (non-blocking)
    try {
      await passwordResetSuccessTemplate(user.email, user.firstName);
    } catch (mailError) {
      console.error("PASSWORD RESET EMAIL ERROR:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};


// ===============================
// VERIFY LOGIN 2FA OTP
// ===============================
// controllers/auth.js

export const verifyLogin2FA = async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({
        success: false,
        message: "UserId and OTP required",
      });
    }

    const user = await User.findById(userId);

    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: "2FA not enabled",
      });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 🔐 NOW ISSUE TOKEN
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token: jwtToken,
      user,
      message: "Admin login successful",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "2FA verification failed",
    });
  }
};

