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
        const isGala = latestDonation.donationId?.startsWith("GALA-");
        await sendEmail({
          to: latestDonation.email,
          subject: isGala ? "Burlington Gala Event Ticket Confirmation - VidyaBharati USA" : "Thank you for your donation - VidyaBharati USA",
          text: isGala 
            ? `Dear ${latestDonation.firstName},\n\nThank you for purchasing a ticket to the Burlington Gala Event. We have received your payment of $${latestDonation.amount}.\n\nTicket Details: Burlington Gala Event Ticket\nTransaction ID: ${latestDonation._id}\nDate: ${new Date().toLocaleDateString()}\n\nLocation: Burlington Marriott, Burlington, Massachusetts\nDate & Time: Sunday, July 12, 2026\n\nThank you for supporting education, culture, and values-based learning.\n\nVisit your dashboard to view your transaction history.`
            : `Dear ${latestDonation.firstName},\n\nThank you for your generous donation of $${latestDonation.amount} to VidyaBharati USA.\n\nTransaction ID: ${latestDonation._id}\nDate: ${new Date().toLocaleDateString()}\n\n"No goods or services were provided in exchange for this contribution."\n\nVisit your dashboard to download your official receipt.`,
          html: isGala 
            ? `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
                <h1 style="color: #0A1128; text-align: center;">Burlington Gala Ticket Confirmation</h1>
                <p>Dear ${latestDonation.firstName},</p>
                <p>Thank you for purchasing a ticket to the <strong>Burlington Gala Event</strong>. We have received your payment of <strong>$${latestDonation.amount}</strong>.</p>
                <p><strong>Event:</strong> Burlington Gala Event<br/>
                <strong>Date & Time:</strong> Sunday, July 12, 2026<br/>
                <strong>Venue:</strong> Burlington Marriott, Burlington, Massachusetts<br/>
                <strong>Transaction ID:</strong> ${latestDonation._id}<br/>
                <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p>Thank you for supporting education, culture, and values-based learning.</p>
                <p>Visit your dashboard to view your transaction history.</p>
              </div>
            `
            : `
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
          cc: isGala ? "anilparekh2000@gmail.com" : undefined,
        });
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
