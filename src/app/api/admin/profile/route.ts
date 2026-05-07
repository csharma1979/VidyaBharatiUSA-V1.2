import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

// Helper to authenticate admin
async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth_token")?.value;

  if (!token) return null;

  const decoded: any = await verifyToken(token);
  if (!decoded || decoded.role !== "admin") return null;

  return decoded;
}

export async function GET() {
  try {
    const adminData = await getAuthenticatedAdmin();
    if (!adminData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const admin = await Admin.findOne({ email: adminData.email }).select("-password");

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (error: any) {
    console.error("Admin Profile GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const adminData = await getAuthenticatedAdmin();
    if (!adminData) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, mobile } = await req.json();

    await connectToDB();
    const admin = await Admin.findOneAndUpdate(
      { email: adminData.email },
      { $set: { firstName, lastName, mobile } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      admin
    });
  } catch (error: any) {
    console.error("Admin Profile PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}

