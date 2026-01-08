import { mailSender } from "../utils/mailSender.js";

export const sendWelcomeEmail = async (email, firstName) => {
  return await mailSender(
    email,
    "Welcome to EnerSense ⚡",
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
          font-size:36px;
          margin-bottom:18px;
          line-height:1.3;
        ">
          Welcome to EnerSense ⚡
        </h1>

        <!-- SUBTEXT -->
        <p style="
          font-size:18px;
          color:#444;
          line-height:1.7;
          margin-bottom:35px;
        ">
          Hello <b style="color:#111;">${firstName}</b>,<br /><br />
          Your account has been successfully created on
          <b style="color:#16a34a;">EnerSense</b> — a smart energy monitoring
          platform designed to help you track, analyze, and optimize your
          electricity usage effortlessly.
        </p>

        <!-- BIG CTA BUTTON -->
        <a 
          href="https://enersense.netlify.app/dashboard"
          style="
            display:inline-block;
            padding:20px 48px;
            background:linear-gradient(135deg, #22c55e, #16a34a);
            color:#ffffff;
            font-size:18px;
            font-weight:bold;
            text-decoration:none;
            border-radius:14px;
            margin:30px 0;
            box-shadow:0 10px 25px rgba(34,197,94,0.35);
          "
        >
          Go to Dashboard →
        </a>

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
          If you have any questions or need help getting started,
          feel free to reach out to our support team anytime.
          <br /><br />
          ⚡ <b style="color:#111;">Team EnerSense</b>
        </p>

      </div>
    </div>
    `
  );
};
