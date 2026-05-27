import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
  try {
    const email = req.headers.get("x-user-email");
    const userId = req.headers.get("x-user-id");

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { donationId } = await req.json();

    if (!donationId) {
      return NextResponse.json({ error: "Missing donationId" }, { status: 400 });
    }

    await connectToDB();

    // Find the donation and verify ownership
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return NextResponse.json({ error: "Donation record not found" }, { status: 404 });
    }

    // Verify user ownership
    if (donation.email !== email && (!userId || donation.userId?.toString() !== userId.toString())) {
      return NextResponse.json({ error: "Forbidden: You do not own this donation" }, { status: 403 });
    }

    // Only transition if it's still pending
    if (donation.paymentStatus === "pending") {
      donation.paymentStatus = "failed";
      donation.failureReason = "Payment cancelled by donor.";
      await donation.save();
    }

    return NextResponse.json({ success: true, paymentStatus: donation.paymentStatus });
  } catch (error: any) {
    console.error("Cancel Donation Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
