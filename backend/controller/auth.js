import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import User from "../models/User.js";
import OTP from "../models/Otp.js"
import dotenv from "dotenv";
import { sendOtpEmail } from "../Email/sendOtpEmail.js";
import { sendWelcomeEmail } from "../Email/welcome.js";


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

    console.log("Signup request body:", req.body);

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

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      state,
      board,
      gender,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // 6️⃣ Delete OTP after use
    await OTP.deleteMany({ email });

    // 7️⃣ Send welcome email
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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "Login successful",
    });

  } catch (error) {
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



