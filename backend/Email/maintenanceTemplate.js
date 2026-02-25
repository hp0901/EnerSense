import { mailSender } from "../utils/mailSender.js";

export const maintenanceEmail = async (
  email,
  firstName = "User",
  date,
  time
) => {
  return await mailSender(
    email,
    "EnerSense Scheduled Maintenance ⚡",
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>EnerSense Maintenance Notice</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7fb;
      font-family: Arial, Helvetica, sans-serif;
    }

    .wrapper {
      padding: 60px 0;
    }

    .container {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      padding: 60px 50px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    }

    .logo {
      width: 180px;
      margin-bottom: 30px;
    }

    h1 {
      color: #dc2626;
      font-size: 32px;
      margin-bottom: 18px;
    }

    .text {
      font-size: 18px;
      color: #444;
      line-height: 1.7;
    }

    .highlight-box {
      display: inline-block;
      padding: 18px 35px;
      background: #fef2f2;
      border: 2px dashed #ef4444;
      border-radius: 16px;
      font-size: 20px;
      font-weight: bold;
      color: #dc2626;
      margin: 25px 0 30px;
    }

    .note {
      font-size: 15px;
      color: #666;
      line-height: 1.6;
    }

    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 40px 0;
    }

    .footer {
      font-size: 15px;
      color: #666;
      line-height: 1.6;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <img
        src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png"
        alt="EnerSense Logo"
        class="logo"
      />

      <h1>Scheduled Maintenance Notice ⚡</h1>

      <p class="text">
        Hello <b>${firstName}</b>,<br /><br />
        We will be performing scheduled system maintenance to improve performance and reliability.
      </p>

      <div class="highlight-box">
        ${date} <br/>
        ${time}
      </div>

      <p class="note">
        During this period, some services may be temporarily unavailable.
        We are working to ensure minimal disruption.
      </p>

      <p class="note" style="margin-top:15px;">
        Thank you for your patience and for being a valued EnerSense user.
      </p>

      <div class="divider"></div>

      <p class="footer">
        ⚡ <b>Team EnerSense</b><br />
        Smart Energy. Smarter Living.
      </p>

    </div>
  </div>
</body>
</html>
`
  );
};