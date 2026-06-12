import Stripe from "stripe";
import { getStripeConfig } from "@/lib/stripe-config";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { sendDonationConfirmation } from "@/lib/notifications/emailService";

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
        await sendDonationConfirmation(latestDonation._id.toString());
      } catch (emailErr) {
        console.error("[Reconcile] Failed to send receipt email:", emailErr);
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
