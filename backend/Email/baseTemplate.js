export const baseTemplate = (content) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>EnerSense</title>
  </head>

  <body style="margin:0; padding:0; background:#f3f6fb; font-family:Arial, Helvetica, sans-serif;">

    <div style="max-width:650px; margin:40px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#4f46e5,#6366f1); padding:35px 25px; text-align:center;">
        <img 
          src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png"
          alt="EnerSense Logo"
          style="height:60px; margin-bottom:15px;"
        />
        <h2 style="color:#ffffff; margin:0; font-size:22px; letter-spacing:1px;">
          EnerSense ⚡
        </h2>
        <p style="color:#e0e7ff; font-size:14px; margin-top:6px;">
          Smart Energy. Smarter Living.
        </p>
      </div>

      <!-- Dynamic Content -->
      <div style="padding:40px 35px; color:#374151; font-size:16px; line-height:1.7;">
        ${content}
      </div>

      <!-- CTA Section -->
      <div style="text-align:center; padding:25px;">
        <a 
          href="https://enersense.netlify.app" 
          style="display:inline-block; padding:12px 22px; background:#4f46e5; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;">
          Visit EnerSense Dashboard
        </a>
      </div>

      <!-- Divider -->
      <div style="height:1px; background:#e5e7eb;"></div>

      <!-- Footer -->
      <div style="background:#f9fafb; padding:25px; text-align:center; font-size:13px; color:#6b7280;">
        
        <p style="margin:6px 0;">
          Need help? Contact us at 
          <a href="mailto:enersense01@gmail.com" style="color:#4f46e5; text-decoration:none;">
            enersense01@gmail.com
          </a>
        </p>

        <p style="margin:6px 0;">
          <a href="https://enersense.netlify.app" style="color:#4f46e5; text-decoration:none;">
            www.enersense.netlify.app
          </a>
        </p>

        <p style="margin-top:12px;">
          © ${new Date().getFullYear()} EnerSense. All rights reserved.
        </p>

      </div>

    </div>

  </body>
  </html>
  `;
};