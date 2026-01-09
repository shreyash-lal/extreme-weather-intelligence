import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendAlertEmail = async (to, alert) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ALERT_EMAIL,
      pass: process.env.ALERT_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Weather Alert System" <${process.env.ALERT_EMAIL}>`,
    to,
    subject: `⚠️ ${alert.type} Alert (${alert.riskLevel})`,
    html: `
      <h3>${alert.type} Alert</h3>
      <p><b>Risk Level:</b> ${alert.riskLevel}</p>
      <p><b>Location:</b> ${alert.location.name}</p>
      <p>${alert.message}</p>
      <p><i>Stay safe.</i></p>
    `,
  });
};
