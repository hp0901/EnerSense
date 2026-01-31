import nodemailer from "nodemailer";

export const mailSender = async (email, title, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,       
      pass: process.env.GMAIL_APP_PASS,  
    },
  });

  const info = await transporter.sendMail({
    from: `"EnerSense" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: title,
    html: body,
  });

  return info;
};