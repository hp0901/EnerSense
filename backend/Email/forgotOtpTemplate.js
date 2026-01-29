export const forgotOtpTemplate = ({ firstName = "User", otp }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>EnerSense – Password Reset OTP</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7fb;
      font-family: Arial, Helvetica, sans-serif;
    }

    .wrapper {
      padding: 60px 0;
      background-color: #f4f7fb;
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
      color: #16a34a;
      font-size: 34px;
      margin-bottom: 18px;
    }

    .text {
      font-size: 18px;
      color: #444;
      line-height: 1.7;
    }

    .otp-box {
      display: inline-block;
      padding: 20px 40px;
      background: #f0fdf4;
      border: 2px dashed #22c55e;
      border-radius: 16px;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #16a34a;
      margin: 25px 0 30px;
    }

    .note {
      font-size: 15px;
      color: #666;
    }

    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 40px 0;
    }

    .footer {
      font-size: 15px;
      color: #666;
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

      <h1>Password Reset OTP ⚡</h1>

      <p class="text">
        Hello <b>${firstName}</b>,<br /><br />
        We received a request to reset your
        <b style="color:#16a34a;">EnerSense</b> account password.
        Use the OTP below to continue.
      </p>

      <div class="otp-box">${otp}</div>

      <p class="note">
        ⏱ This OTP is valid for <b>5 minutes</b>.<br />
        Please do not share this code with anyone.
      </p>

      <div class="divider"></div>

      <p class="footer">
        ⚡ <b>Team EnerSense</b>
      </p>

    </div>
  </div>
</body>
</html>
`;
};
