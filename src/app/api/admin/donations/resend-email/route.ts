import { NextResponse } from "next/server";
import { sendDonationConfirmation } from "@/lib/notifications/emailService";

export async function POST(req: Request) {
  try {
    const { donationId } = await req.json();

    if (!donationId) {
      return NextResponse.json(
        { error: "Donation ID is required" },
        { status: 400 }
      );
    }

    await sendDonationConfirmation(donationId, true);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("[Admin Resend Email API] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to resend confirmation email" },
      { status: 500 }
    );
  }
}
