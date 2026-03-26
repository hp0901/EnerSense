import { mailSender } from "../utils/mailSender.js";

export const premiumActivatedTemplate = async (
  email,
  firstName,
  plan,
  expiryDate
) => {
  return await mailSender(
    email,
    "🎉 Premium Activated – EnerSense",
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Premium Activated</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:24px;">
      
      <h2 style="color:#4f46e5;">🎉 Premium Activated!</h2>

      <p>Hi <b>${firstName}</b>,</p>

      <p>
        Great news! Your <b>EnerSense Premium</b> subscription has been
        successfully activated.
      </p>

      <table style="margin:16px 0; width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:8px; background:#f9fafb;">Plan</td>
          <td style="padding:8px;"><b>${plan}</b></td>
        </tr>
        <tr>
          <td style="padding:8px; background:#f9fafb;">Valid Until</td>
          <td style="padding:8px;"><b>${expiryDate}</b></td>
        </tr>
      </table>

      <p>You now have access to:</p>
      <ul>
        <li>Unlimited alerts</li>
        <li>Fault detection</li>
        <li>CO₂ & Green score</li>
        <li>Bill prediction</li>
        <li>Monthly energy reports</li>
      </ul>

      <p style="margin-top:20px;">
        Thank you for choosing <b>EnerSense</b>.
      </p>

      <p style="color:#6b7280; font-size:13px;">
        — Team EnerSense ⚡
      </p>
    </div>
  </body>
</html>
`
  );
};
