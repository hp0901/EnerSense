import { mailSender } from "../utils/mailSender.js";

export const sendOtpEmail = async (email, firstName, otp) => {
  return await mailSender(
    email,
    "Your EnerSense OTP Code ⚡",
    `
    <div style="
      background-color:#f4f7fb;
      padding:60px 0;
      font-family: Arial, Helvetica, sans-serif;
    ">
      <div style="
        max-width:650px;
        margin:0 auto;
        background:#ffffff;
        border-radius:20px;
        padding:60px 50px;
        text-align:center;
        box-shadow:0 20px 50px rgba(0,0,0,0.12);
      ">

        <!-- LOGO -->
        <img 
          src="https://drive.google.com/file/d/1caDpiwe3TUwkdLRGOVPyt5YYYtKZ5Lkz/view?usp=sharing"
          alt="EnerSense Logo"
          style="
            width:180px;
            margin-bottom:30px;
          "
        />

        <!-- HEADING -->
        <h1 style="
          color:#16a34a;
          font-size:34px;
          margin-bottom:18px;
          line-height:1.3;
        ">
          Verify Your Email ⚡
        </h1>

        <!-- MESSAGE -->
        <p style="
          font-size:18px;
          color:#444;
          line-height:1.7;
          margin-bottom:30px;
        ">
          Hello <b style="color:#111;">${firstName}</b>,<br /><br />
          Use the OTP below to complete your verification on
          <b style="color:#16a34a;">EnerSense</b>.
        </p>

        <!-- OTP BOX -->
        <div style="
          display:inline-block;
          padding:20px 40px;
          background:#f0fdf4;
          border:2px dashed #22c55e;
          border-radius:16px;
          font-size:36px;
          font-weight:bold;
          letter-spacing:6px;
          color:#16a34a;
          margin:20px 0 30px;
        ">
          ${otp}
        </div>

        <!-- INFO -->
        <p style="
          font-size:15px;
          color:#666;
          line-height:1.6;
        ">
          ⏱ This OTP is valid for <b>5 minutes</b>.<br/>
          Please do not share this code with anyone.
        </p>

        <!-- DIVIDER -->
        <div style="
          height:1px;
          background:#e5e7eb;
          margin:40px 0;
        "></div>

        <!-- FOOTER -->
        <p style="
          font-size:15px;
          color:#666;
          line-height:1.6;
        ">
          If you didn’t request this OTP, you can safely ignore this email.
          <br /><br />
          ⚡ <b style="color:#111;">Team EnerSense</b>
        </p>

      </div>
    </div>
    `
  );
};
