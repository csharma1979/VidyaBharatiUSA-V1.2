import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { signResetToken } from "@/lib/auth";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
    }

    const resetToken = await signResetToken({ email: user.email });
    
    // Get host origin
    const url = new URL(req.url);
    const resetUrl = `${url.origin}/reset-password?token=${resetToken}`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
        <h2 style="color: #0A1128; text-align: center;">Reset Your Password</h2>
        <p>Hello ${user.firstName},</p>
        <p>We received a request to reset the password for your account at Vidya Bharati USA. Click the button below to set a new password. This link will expire in 15 minutes.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #D4AF37; color: #0A1128; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; display: inline-block;">Reset Password</a>
        </div>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; color: #666; font-size: 12px;">${resetUrl}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">If you did not request a password reset, please ignore this email.</p>
      </div>
    `;

    console.log("=== PASSWORD RESET URL (DEV DEBUGGING) ===");
    console.log(resetUrl);
    console.log("==========================================");

    await sendEmail({
      to: user.email,
      subject: "Reset Password - Vidya Bharati USA",
      text: `Hello ${user.firstName},\n\nPlease reset your password by visiting the following link (expires in 15 minutes):\n\n${resetUrl}`,
      html: emailHtml,
    });

    return NextResponse.json({ message: "Password reset link has been sent to your email." });
  } catch (error: any) {
    console.error("Forgot Password API Error:", error);
    return NextResponse.json(
      { error: "Failed to process forgot password request" },
      { status: 500 }
    );
  }
}
