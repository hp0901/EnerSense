import speakeasy from "speakeasy";
import QRCode from "qrcode";
import User from "../models/User.js";

export const generate2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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