import { connectToDB } from "@/lib/db";
import Setting from "@/models/Setting";

export async function getStripeConfig() {
  await connectToDB();
  const config = await Setting.findOne().sort({ createdAt: -1 });
  
  return {
    secretKey: config?.stripeSecretKey || process.env.STRIPE_SECRET_KEY || null,
    publicKey: config?.stripePublicKey || process.env.STRIPE_PUBLIC_KEY || null,
  };
}
