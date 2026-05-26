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

export async function DELETE(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Donation ID is required" },
        { status: 400 }
      );
    }

    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Donation deleted successfully" });
  } catch (error: any) {
    console.error("Admin Donations DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete donation" },
      { status: 500 }
    );
  }
}
