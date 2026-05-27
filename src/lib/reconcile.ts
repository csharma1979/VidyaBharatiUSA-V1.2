import Stripe from "stripe";
import { getStripeConfig } from "@/lib/stripe-config";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { sendEmail } from "@/lib/mail";

export async function reconcileDonation(donation: any) {
  // Only try to reconcile pending donations that have a Stripe session ID
  if (donation.paymentStatus !== "pending" || !donation.stripeSessionId) {
    return donation;
  }

  try {
    const { secretKey } = await getStripeConfig();
    if (!secretKey) {
      console.warn("[Reconcile] Stripe secret key not found.");
      return donation;
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(donation.stripeSessionId);

    if (session.payment_status === "paid") {
      await connectToDB();
      
      // Fetch latest document state to avoid overwrites
      const latestDonation = await Donation.findById(donation._id);
      if (!latestDonation || latestDonation.paymentStatus !== "pending") {
        return latestDonation || donation;
      }

      latestDonation.paymentStatus = "success";
      latestDonation.paymentMethod = session.payment_method_types?.[0] || "unknown";
      if (session.payment_intent && typeof session.payment_intent === "string") {
        latestDonation.stripePaymentIntentId = session.payment_intent;
      }
      await latestDonation.save();

      console.log(`[Reconcile] Reconciled donation ${latestDonation._id} status to success.`);

      // Send confirmation email / receipt
      try {
        await sendEmail({
          to: latestDonation.email,
          subject: "Thank you for your donation - VidyaBharati USA",
          text: `Dear ${latestDonation.firstName},\n\nThank you for your generous donation of $${latestDonation.amount} to VidyaBharati USA.\n\nTransaction ID: ${latestDonation._id}\nDate: ${new Date().toLocaleDateString()}\n\n"No goods or services were provided in exchange for this contribution."\n\nVisit your dashboard to download your official receipt.`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
              <h1 style="color: #0A1128; text-align: center;">Thank You for Your Donation</h1>
              <p>Dear ${latestDonation.firstName},</p>
              <p>Thank you for your generous donation of <strong>$${latestDonation.amount}</strong> to VidyaBharati USA.</p>
              <p><strong>Transaction ID:</strong> ${latestDonation._id}<br/>
              <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><em>"No goods or services were provided in exchange for this contribution."</em></p>
              <p>Visit your dashboard to download your official receipt.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("[Reconcile] Failed to send donation receipt email:", emailErr);
      }

      return latestDonation;
    } else if (session.status === "expired") {
      await connectToDB();
      const latestDonation = await Donation.findById(donation._id);
      if (latestDonation && latestDonation.paymentStatus === "pending") {
        latestDonation.paymentStatus = "failed";
        latestDonation.failureReason = "Checkout session expired";
        await latestDonation.save();
        return latestDonation;
      }
    }
  } catch (error) {
    console.error(`[Reconcile] Reconciliation failed for donation ${donation._id}:`, error);
  }

  return donation;
}
