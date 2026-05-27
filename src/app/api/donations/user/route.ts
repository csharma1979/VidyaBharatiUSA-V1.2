import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET(req: Request) {
  try {
    const email = req.headers.get("x-user-email");
    const userId = req.headers.get("x-user-id");

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    // Fetch successful, failed, pending, and refunded donations for this user (including guest donations linked to this email)
    const donations = await Donation.find({
      $or: [
        { email },
        { userId: userId || undefined }
      ],
      paymentStatus: { $in: ["success", "failed", "pending", "refunded"] }
    }).sort({ createdAt: -1 });

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Fetch User Donations Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
