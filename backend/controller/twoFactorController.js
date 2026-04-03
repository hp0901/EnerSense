import speakeasy from "speakeasy";
import QRCode from "qrcode";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../Email/sendOtpEmail.js";


export const generate2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(req.body);
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `EnerSense (${user.email})`,
    });

    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCodeImage = await QRCode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      success: true,
      qrCode: qrCodeImage,
      manualCode: secret.base32, // backup if QR fails
    });

  } catch (error) {
    console.error("2FA Generate Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2FA VERIFICATION ENDPOINT
export const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findById(req.user.id);
    console.log(req.body);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "2FA Enabled Successfully",
    });

  } catch (error) {
    console.error("2FA Verify Error:", error);
    res.status(500).json({ success: false });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // ❌ Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 🔍 Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🚫 Allow only admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // 🔐 Generate OTP (always string)
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // 💾 Save OTP + expiry
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await user.save();

    // 📩 Send email
    await sendOtpEmail(
      user.email,
      user.firstName || "User",
      otp
    );

    console.log(`🔐 OTP for ${email}: ${otp}`);

    // ✅ Response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      role: user.role,
    });

  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ❌ Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    // ❌ No user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Stored OTP:", user.otp, typeof user.otp);
    console.log("Entered OTP:", otp, typeof otp);
    // ❌ OTP mismatch
    if (user.otp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ❌ OTP expired
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // 🔐 Generate JWT token (LOGIN SUCCESS)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🧹 Clean OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const setup2FA = async (req, res) => {
  try {
    console.log("USER FROM TOKEN:", req.user); // 👈 ADD THIS
    console.log("REQ.USER:", req.user); // 👈 DEBUG
    const userId = req.user.id; // or from req.body

    const user = await User.findById(userId);

    // 🔐 Generate secret
    const secret = speakeasy.generateSecret({
      name: "EnerSense",
    });

    // ✅ SAVE THIS (MOST IMPORTANT LINE)
    user.twoFactorSecret = secret.base32;

    await user.save();

    console.log("SAVED SECRET:", secret.base32);

    // 📱 Generate QR
    const QRCode = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(200).json({
      success: true,
      QRCode,                 // show this in frontend
      secret: secret.base32,  // optional (for manual entry)
    });

  } catch (error) {
    console.error("2FA Setup Error:", error);
    res.status(500).json({ success: false });
  }
};