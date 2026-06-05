import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "us2.smtp.mailhostbox.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "no-reply@fritado.com",
    pass: process.env.SMTP_PASS || "S^*DQJq%6",
  },
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
  cc,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  cc?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"VidyaBharati USA" <${process.env.SMTP_USER || "no-reply@fritado.com"}>`,
      to,
      subject,
      text,
      html: html || text,
      cc,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
