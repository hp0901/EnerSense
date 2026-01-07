import { mailSender } from "../utils/mailSender.js"
export const sendOtpEmail = async (email, otp) => {
  return await mailSender(
    email,
    "EnerSense Verification Code ⚡",
    `
      <div style="font-family: Arial, sans-serif;">
        <h2>EnerSense Email Verification</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color:#22c55e;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
        <br/>
        <p>⚡ Team EnerSense</p>
      </div>
    `
  );
};
