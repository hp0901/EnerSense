import { mailSender } from "../utils/mailSender.js";

export const passwordResetSuccessTemplate = async (
  email,
  firstName = "User"
) => {
  return await mailSender(
    email,
    "Password Reset Successful – EnerSense",
    `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset Successful</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;
              padding:40px;border-radius:16px;text-align:center;
              box-shadow:0 15px 40px rgba(0,0,0,0.12);">

    <h2 style="color:#16a34a;margin-bottom:12px;">
      ✅ Password Reset Successful
    </h2>

    <p style="font-size:16px;color:#444;line-height:1.6;">
      Hello <b>${firstName}</b>,<br /><br />
      This is a confirmation that your
      <b style="color:#16a34a;">EnerSense</b> account password
      has been successfully reset.
    </p>

    <p style="font-size:15px;color:#666;line-height:1.6;margin-top:20px;">
      If you did not perform this action, please contact our support team
      immediately to secure your account.
    </p>

    <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

    <p style="font-size:14px;color:#777;">
      ⚡ Team EnerSense<br />
      Smart Energy. Smarter Living.
    </p>
  </div>
</body>
</html>
`
  );
};
