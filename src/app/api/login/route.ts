import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide both email and password" },
        { status: 400 }
      );
    }

    await connectToDB();

    // Find user by email and explicitly select the password field
    const user = await User.findOne({ email }).select("+password");

    if (!user || user.role !== "user") {
      // If user not found or is an admin (admins use /api/admin/login)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signToken({ 
      email: user.email, 
      role: user.role, 
      userId: user._id.toString() 
    });

    // Create response
    const response = NextResponse.json(
      { 
        message: "Login successful", 
        user: { 
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email, 
          role: user.role,
          userId: user._id 
        } 
      },
      { status: 200 }
    );

    // Set HttpOnly cookie for users
    response.cookies.set({
      name: "user_auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("User Login API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
