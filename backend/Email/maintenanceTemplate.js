import { sendEmail } from "../utils/brevoSender.js";

export const maintenanceEmail = async (
  email,
  firstName = "User",
  subject,
  content
) => {

  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
  </head>

  <body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:20px 10px;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0"
            style="max-width:600px;background:#111827;border-radius:16px;padding:30px;">

            <!-- Logo -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <img
                  src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png"
                  width="140"
                  style="display:block;"
                />
              </td>
            </tr>

            <!-- Subject -->
            <tr>
              <td align="center"
                style="color:#ffffff;font-size:22px;font-weight:bold;padding-bottom:20px;">
                ${subject}
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td
                style="color:#d1d5db;font-size:16px;line-height:1.6;text-align:left;">
                Hello <b>${firstName}</b>,<br/><br/>
                ${content.replace(/\n/g, "<br/>")}
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:25px 0;">
                <hr style="border:none;height:1px;background:#374151;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="color:#9ca3af;font-size:14px;text-align:center;">
                ⚡ <b>Team EnerSense</b><br/>
                Smart Energy. Smarter Living.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;

  return await sendEmail({
    to: email,
    subject,
    htmlContent: htmlTemplate,
  });
};