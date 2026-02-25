import { baseTemplate } from "./baseTemplate.js";

export const premiumExpiryTemplate = ({
  firstName,
  expiryDate,
}) => {
  const content = `
    <h3 style="color:#111827;">Hi ${firstName},</h3>

    <p>
      Your <b>EnerSense Premium</b> subscription will expire on:
    </p>

    <p style="font-size:18px; font-weight:bold; color:#dc2626;">
      ${expiryDate}
    </p>

    <ul>
      <li>Unlimited alerts</li>
      <li>Fault detection</li>
      <li>Bill prediction</li>
      <li>Monthly reports</li>
    </ul>

    <a href="https://enersense.netlify.app/pricing"
       style="display:inline-block; margin-top:20px; padding:10px 18px;
              background:#4f46e5; color:#fff; text-decoration:none; border-radius:6px;">
      Renew Premium
    </a>

    <p style="margin-top:20px;">
      — Team EnerSense ⚡
    </p>
  `;

  return baseTemplate(content);
};