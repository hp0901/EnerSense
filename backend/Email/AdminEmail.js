import { mailSender } from "../utils/mailSender.js";

export const adminWelcomeTemplate = async (email, firstName) => {
  return await mailSender(
    email,
    "🚀 You're Now an Admin at EnerSense!",
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Admin Access Granted</title>
  </head>

  <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">

    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:24px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

      <!-- 🔰 LOGO -->
      <div style="text-align:center; margin-bottom:20px;">
        <img 
          src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png" 
          alt="EnerSense Logo" 
          style="height:60px;"
        />
      </div>

      <!-- 🎉 TITLE -->
      <h2 style="color:#16a34a; text-align:center;">
        🎉 Welcome to the Admin Team!
      </h2>

      <!-- 👋 GREETING -->
      <p>Hi <b>${firstName || "User"}</b>, 👋</p>

      <!-- 📢 MESSAGE -->
      <p>
        Congratulations! 🚀 You have been granted <b>Admin access</b> on <b>EnerSense</b>.
      </p>

      <!-- ⚙️ FEATURES -->
      <p>You can now:</p>
      <ul>
        <li>👥 Manage users</li>
        <li>📊 Monitor system insights</li>
        <li>⚡ Control platform operations</li>
      </ul>

      <!-- 🔐 IMPORTANT -->
      <div style="background:#fef3c7; padding:12px; border-radius:6px; margin-top:20px;">
        <p style="margin:0;">
          🔐 <b>Security Notice:</b> For your safety, 2-Factor Authentication (2FA) is required.
        </p>
      </div>

      <!-- 📋 STEPS -->
      <h3 style="margin-top:20px;">📌 What you need to do next:</h3>

      <ol style="padding-left:18px;">
        <li>🔑 Login to your EnerSense account</li>
        <li>📱 You will be asked to set up 2FA</li>
        <li>📷 Scan the QR code using Google Authenticator</li>
        <li>🔢 Enter the OTP generated on your device</li>
        <li>✅ Your admin access will be fully activated</li>
      </ol>

      <!-- ⚠️ WARNING -->
      <p style="margin-top:20px;">
        ⚠️ Do not share your login credentials or OTP with anyone.
      </p>

      <!-- 💬 FOOTER -->
      <p style="margin-top:25px;">
        Welcome aboard 🚀<br/>
        <b>Team EnerSense ⚡</b>
      </p>

      <p style="color:#6b7280; font-size:12px; margin-top:10px;">
        If you did not expect this change, please contact support immediately.
      </p>

    </div>

  </body>
</html>
`
  );
};