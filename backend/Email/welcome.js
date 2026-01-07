import { mailSender } from "../utils/mailSender.js"

export const sendWelcomeEmail = async (email, firstName) => {
  return await mailSender(
    email,
    "Welcome to EnerSense ⚡",
    `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hello ${firstName},</h2>
        <p>Welcome to <b>EnerSense</b> – Smart Energy Monitoring Platform.</p>
        <p>Your account has been successfully created.</p>
        <br/>
        <p>⚡ Team EnerSense</p>
      </div>
    `
  );
};
