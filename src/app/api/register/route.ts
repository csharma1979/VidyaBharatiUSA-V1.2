import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, mobile, password } = await req.json();

    if (!firstName || !lastName || !email || !mobile || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists. Please login or reset password." },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password, // Will be hashed by pre-save hook
    });

    // Send auto email with login credentials (as per requirement)
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to VidyaBharati USA",
        text: `Hello ${firstName},\n\nWelcome to VidyaBharati USA! Your account has been created successfully.\n\nLogin Email: ${email}\n\nYou can now log in to the dashboard to view your donation history.\n\nThank you for your support!`,
        html: `
          <h1>Welcome to VidyaBharati USA</h1>
          <p>Hello ${firstName},</p>
          <p>Welcome to VidyaBharati USA! Your account has been created successfully.</p>
          <p><strong>Login Email:</strong> ${email}</p>
          <p>You can now log in to the dashboard to view your donation history.</p>
          <br/>
          <p>Thank you for your support!</p>
        `,
      });
    } catch (emailError) {
      console.error("Email notification failed during registration:", emailError);
      // We don't fail the registration if only the email fails, 
      // but in a production app we might want to retry.
    }

    return NextResponse.json(
      { message: "Registration successful", userId: user._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
