import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import EmailLog from "@/models/EmailLog";
import { reconcileDonation } from "@/lib/reconcile";

export async function GET() {
  try {
    await connectToDB();

    // Fetch all donations (excluding Gala tickets), sorted by creation date descending
    const donations = await Donation.find({
      donationId: { $not: /^GALA-/i }
    }).sort({ createdAt: -1 });

    const reconciledDonations = await Promise.all(
      donations.map(async (donation) => {
        if (donation.paymentStatus === "pending") {
          return await reconcileDonation(donation);
        }
        return donation;
      })
    );

    // Fetch email logs for these donations
    const donationIds = reconciledDonations.map(d => d._id);
    const emailLogs = await EmailLog.find({ donationId: { $in: donationIds } }).sort({ sentAt: -1 });

    // Map email logs to their corresponding donation records
    const donationsWithLogs = reconciledDonations.map(donation => {
      const logs = emailLogs.filter(log => log.donationId.toString() === donation._id.toString());
      const latestLog = logs[0] || null;
      return {
        ...donation.toObject(),
        emailLogs: logs,
        latestEmailStatus: latestLog ? latestLog.status : null,
        latestEmailSentAt: latestLog ? latestLog.sentAt : null,
      };
    });

    return NextResponse.json(donationsWithLogs);
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
