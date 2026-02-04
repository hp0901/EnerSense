export const premiumExpiryReminderTemplate = ({
  firstName,
  expiryDate,
}) => {
  return `
  <html>
    <body style="font-family:Arial; background:#f4f6f8; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#fff; padding:24px; border-radius:8px;">
        <h2 style="color:#dc2626;">⏰ Premium Expiring Soon</h2>

        <p>Hi <b>${firstName}</b>,</p>

        <p>
          Your <b>EnerSense Premium</b> subscription will expire on:
        </p>

        <p style="font-size:18px; font-weight:bold;">
          ${expiryDate}
        </p>

        <p>
          Renew now to continue enjoying:
        </p>

        <ul>
          <li>Unlimited alerts</li>
          <li>Fault detection</li>
          <li>Bill prediction</li>
          <li>Monthly reports</li>
        </ul>

        <p>
          <a href="https://enersense.netlify.app/pricing"
             style="display:inline-block; margin-top:16px; padding:10px 16px;
                    background:#4f46e5; color:#fff; text-decoration:none; border-radius:6px;">
            Renew Premium
          </a>
        </p>

        <p style="font-size:13px; color:#6b7280;">
          — Team EnerSense ⚡
        </p>
      </div>
    </body>
  </html>
  `;
};
