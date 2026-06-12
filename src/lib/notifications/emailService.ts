import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import EmailLog from "@/models/EmailLog";
import { sendEmail } from "@/lib/mail";
import { generateDonationEmail } from "./emailTemplates";

export async function sendDonationConfirmation(donationId: string, isManual = false) {
  await connectToDB();

  // 1. Fetch donation record
  const donation = await Donation.findById(donationId);
  if (!donation) {
    throw new Error("Donation record not found");
  }

  // 2. Confirm payment is success
  if (donation.paymentStatus !== "success") {
    throw new Error(`Cannot send confirmation email. Payment status is '${donation.paymentStatus}' (must be 'success').`);
  }

  // 3. Prevent duplicate automatic sends
  if (!isManual) {
    const updatedDonation = await Donation.findOneAndUpdate(
      { _id: donationId, emailSent: { $ne: true } },
      { $set: { emailSent: true } },
      { new: true }
    );
    if (!updatedDonation) {
      console.log(`[EmailService] Automatic donation confirmation email already sent or currently sending for donation ID: ${donationId}`);
      return;
    }
  }

  const emailType = donation.donationId?.startsWith("GALA-") ? "gala_ticket_confirmation" : "donation_confirmation";
  const donorName = `${donation.firstName} ${donation.lastName}`;

  // 4. Create initial pending log
  const log = await EmailLog.create({
    donationId: donation._id,
    email: donation.email,
    subject: emailType === "gala_ticket_confirmation" 
      ? "Los Angeles Gala Event Ticket Confirmation - VidyaBharati USA" 
      : "Thank You for Supporting Vidya Bharati USA",
    status: "pending",
    isManual,
    recipientDetails: donorName,
    type: emailType,
  });

  try {
    // 5. Generate template content
    const { subject, html, text } = generateDonationEmail(donation, emailType);
    log.subject = subject;

    // 6. Send the email with BCC
    await sendEmail({
      to: donation.email,
      subject,
      text,
      html,
      bcc: ["anilparekh2000@gmail.com", "csharma@fritado.com"],
    });

    // 7. Update status to sent
    log.status = "sent";
    log.sentAt = new Date();
    await log.save();
    console.log(`[EmailService] Confirmation email sent successfully to ${donation.email} for donation ${donationId}.`);
  } catch (error: any) {
    console.error(`[EmailService] Failed to send confirmation email for donation ${donationId}:`, error);
    log.status = "failed";
    log.error = error.message || String(error);
    await log.save();
    throw error;
  }
}
