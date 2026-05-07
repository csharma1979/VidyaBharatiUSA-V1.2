import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET() {
  try {
    await connectToDB();

    // Fetch all donations, sorted by creation date descending
    const donations = await Donation.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(donations);
  } catch (error: any) {
    console.error("Admin Donations API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
