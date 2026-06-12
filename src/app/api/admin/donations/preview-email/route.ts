import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { generateDonationEmail } from "@/lib/notifications/emailTemplates";

export async function GET(request: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get("donationId");
    const logId = searchParams.get("logId");

    if (!donationId) {
      return NextResponse.json(
        { error: "Donation ID is required" },
        { status: 400 }
      );
    }

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    let emailType = donation.donationId?.startsWith("GALA-") ? "gala_ticket_confirmation" : "donation_confirmation";

    if (logId) {
      // Dynamically load model to avoid Next HMR issues
      const EmailLog = (await import("@/models/EmailLog")).default;
      const log = await EmailLog.findById(logId);
      if (log) {
        emailType = log.type;
      }
    }

    const emailData = generateDonationEmail(donation, emailType);

    return NextResponse.json(emailData);
  } catch (error: any) {
    console.error("[Admin Preview Email API] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate email preview" },
      { status: 500 }
    );
  }
}
