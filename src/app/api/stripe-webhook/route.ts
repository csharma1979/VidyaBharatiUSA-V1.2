import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeConfig } from "@/lib/stripe-config";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { sendEmail } from "@/lib/mail";

// Stripe requires the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  try {
    const { secretKey } = await getStripeConfig();
    const stripe = new Stripe(secretKey!);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      await connectToDB();
      
      const donation = await Donation.findOne({ stripeSessionId: session.id });
      
      if (donation) {
        donation.paymentStatus = "success";
        donation.paymentMethod = session.payment_method_types?.[0] || "unknown";
        await donation.save();

        // Send confirmation email / receipt
        try {
          await sendEmail({
            to: donation.email,
            subject: "Thank you for your donation - VidyaBharati USA",
            text: `Dear ${donation.firstName},\n\nThank you for your generous donation of $${donation.amount} to VidyaBharati USA.\n\nTransaction ID: ${donation._id}\nDate: ${new Date().toLocaleDateString()}\n\n"No goods or services were provided in exchange for this contribution."\n\nVisit your dashboard to download your official receipt.`,
            html: `
              <h1>Thank you for your donation</h1>
              <p>Dear ${donation.firstName},</p>
              <p>Thank you for your generous donation of <strong>$${donation.amount}</strong> to VidyaBharati USA.</p>
              <p><strong>Transaction ID:</strong> ${donation._id}<br/>
              <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><em>"No goods or services were provided in exchange for this contribution."</em></p>
              <p>Visit your dashboard to download your official receipt.</p>
            `,
          });
        } catch (emailErr) {
          console.error("Failed to send donation receipt email:", emailErr);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook Handler Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
