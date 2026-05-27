import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeConfig } from "@/lib/stripe-config";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET() {
  return NextResponse.json({ status: "API is live", timestamp: new Date().toISOString() });
}

export async function POST(req: Request) {
  try {
    const { amount, firstName, lastName, email, userId, isGuest, successUrl, cancelUrl, retryDonationId } = await req.json();

    // 1. Validate required fields
    if (!amount || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields: amount, email, firstName, lastName are required." },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount. Must be a positive number." },
        { status: 400 }
      );
    }

    // 2. Load Stripe configuration from DB (falls back to env vars)
    await connectToDB();
    const { secretKey } = await getStripeConfig();

    if (!secretKey) {
      console.error("[Stripe] Secret key is missing from DB and environment.");
      return NextResponse.json(
        { error: "Payment gateway is not configured. Please contact the administrator." },
        { status: 503 }
      );
    }

    // 3. Detect placeholder/dummy keys that haven't been replaced yet
    const PLACEHOLDER_PATTERNS = ["51ABCxyz", "placeholder", "your_stripe", "sk_test_example"];
    const isPlaceholder = PLACEHOLDER_PATTERNS.some((p) => secretKey.includes(p));
    if (isPlaceholder) {
      console.error("[Stripe] Placeholder Stripe key detected. Real keys must be configured.");
      return NextResponse.json(
        { error: "Payment gateway is not fully configured. Please add real Stripe API keys via the admin panel." },
        { status: 503 }
      );
    }

    // 4. Initialize Stripe with real key
    const stripe = new Stripe(secretKey);

    // 5. Create or retrieve/update a donation record in "pending" status
    let donation;
    if (retryDonationId) {
      donation = await Donation.findById(retryDonationId);
      if (!donation) {
        return NextResponse.json(
          { error: "Donation record to retry not found." },
          { status: 404 }
        );
      }
      // Update details for the retry attempt
      donation.amount = amount;
      donation.paymentStatus = "pending";
      donation.failureReason = null;
      await donation.save();
    } else {
      const donationId = `VB-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      donation = await Donation.create({
        donationId,
        userId: userId || null,
        email,
        firstName,
        lastName,
        amount,
        isGuest: !!isGuest,
        paymentStatus: "pending",
      });
    }

    // 6. Create Stripe Checkout Session
    const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

    const appendParam = (url: string, key: string, value: string) => {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}${key}=${value}`;
    };

    const finalSuccessUrl = appendParam(
      successUrl || `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      "donationId",
      donation._id.toString()
    );

    const finalCancelUrl = appendParam(
      cancelUrl || `${origin}/donate?canceled=true`,
      "donationId",
      donation._id.toString()
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to VidyaBharati USA",
              description: `Supporting rural education in India | Donor: ${firstName} ${lastName}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      customer_email: email,
      metadata: {
        donationId: donation._id.toString(),
        customDonationId: donation.donationId,
        userId: userId || "",
        isGuest: isGuest ? "true" : "false",
      },
    });

    // 7. Update donation record with session ID and payment intent ID
    donation.stripeSessionId = session.id;
    if (session.payment_intent && typeof session.payment_intent === "string") {
      donation.stripePaymentIntentId = session.payment_intent;
    }
    await donation.save();

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[Checkout Session] Critical Error:", {
      message: error.message,
      type: error.type,
      code: error.code,
    });

    // Stripe-specific error handling
    if (error.type === "StripeAuthenticationError") {
      return NextResponse.json(
        { error: "Invalid Stripe API key. Please update your Stripe configuration in the admin panel." },
        { status: 503 }
      );
    }

    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        { error: `Invalid payment request: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
