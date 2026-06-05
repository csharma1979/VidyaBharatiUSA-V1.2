import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeConfig } from "@/lib/stripe-config";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { sendEmail } from "@/lib/mail";



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
        if (session.payment_intent && typeof session.payment_intent === "string") {
          donation.stripePaymentIntentId = session.payment_intent;
        }
        await donation.save();

        // Send confirmation email / receipt
        try {
          const isGala = donation.donationId?.startsWith("GALA-");
          await sendEmail({
            to: donation.email,
            subject: isGala ? "Los Angeles Gala Event Ticket Confirmation - VidyaBharati USA" : "Thank you for your donation - VidyaBharati USA",
            text: isGala 
              ? `Dear ${donation.firstName},\n\nThank you for purchasing a ticket to the Los Angeles Gala Event. We have received your payment of $${donation.amount}.\n\nTicket Details: Los Angeles Gala Event Ticket\nTransaction ID: ${donation._id}\nDate: ${new Date().toLocaleDateString()}\n\nLocation: Sheraton Cerritos Hotel, Cerritos, California\nDate & Time: Sunday, July 26, 2026\n\nThank you for supporting education, culture, and values-based learning.\n\nVisit your dashboard to view your transaction history.`
              : `Dear ${donation.firstName},\n\nThank you for your generous donation of $${donation.amount} to VidyaBharati USA.\n\nTransaction ID: ${donation._id}\nDate: ${new Date().toLocaleDateString()}\n\n"No goods or services were provided in exchange for this contribution."\n\nVisit your dashboard to download your official receipt.`,
            html: isGala 
              ? `
                <h1>Los Angeles Gala Ticket Confirmation</h1>
                <p>Dear ${donation.firstName},</p>
                <p>Thank you for purchasing a ticket to the <strong>Los Angeles Gala Event</strong>. We have received your payment of <strong>$${donation.amount}</strong>.</p>
                <p><strong>Event:</strong> Los Angeles Gala Event<br/>
                <strong>Date & Time:</strong> Sunday, July 26, 2026<br/>
                <strong>Venue:</strong> Sheraton Cerritos Hotel, Cerritos, California<br/>
                <strong>Transaction ID:</strong> ${donation._id}<br/>
                <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p>Thank you for supporting education, culture, and values-based learning.</p>
                <p>Visit your dashboard to view your transaction history.</p>
              `
              : `
                <h1>Thank you for your donation</h1>
                <p>Dear ${donation.firstName},</p>
                <p>Thank you for your generous donation of <strong>$${donation.amount}</strong> to VidyaBharati USA.</p>
                <p><strong>Transaction ID:</strong> ${donation._id}<br/>
                <strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><em>"No goods or services were provided in exchange for this contribution."</em></p>
                <p>Visit your dashboard to download your official receipt.</p>
              `,
            cc: isGala ? "anilparekh2000@gmail.com" : undefined,
          });
        } catch (emailErr) {
          console.error("Failed to send receipt email:", emailErr);
        }
      }
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      await connectToDB();
      const donation = await Donation.findOne({ stripeSessionId: session.id });
      if (donation && donation.paymentStatus === "pending") {
        donation.paymentStatus = "failed";
        donation.failureReason = "Checkout session expired";
        await donation.save();
      }
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await connectToDB();
      const donation = await Donation.findOne({
        $or: [
          { stripePaymentIntentId: paymentIntent.id },
          { stripeSessionId: paymentIntent.metadata?.stripeSessionId }
        ]
      });
      if (donation && donation.paymentStatus === "pending") {
        donation.paymentStatus = "failed";
        donation.failureReason = paymentIntent.last_payment_error?.message || "Payment attempt failed";
        await donation.save();
      }
    } else if (event.type === "charge.failed") {
      const charge = event.data.object as Stripe.Charge;
      await connectToDB();
      const donation = await Donation.findOne({
        $or: [
          { stripePaymentIntentId: charge.payment_intent as string },
          { stripeSessionId: charge.metadata?.stripeSessionId }
        ]
      });
      if (donation && donation.paymentStatus === "pending") {
        donation.paymentStatus = "failed";
        donation.failureReason = charge.failure_message || "Charge failed";
        await donation.save();
      }
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      await connectToDB();
      const donation = await Donation.findOne({
        $or: [
          { stripePaymentIntentId: charge.payment_intent as string },
          { stripeSessionId: charge.metadata?.stripeSessionId }
        ]
      });
      if (donation) {
        donation.paymentStatus = "refunded";
        await donation.save();
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook Handler Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
