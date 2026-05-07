import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectToDB();
    const config = await Setting.findOne().sort({ createdAt: -1 });
    return NextResponse.json(config || {});
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { stripePublicKey, stripeSecretKey } = await req.json();

    if (!stripePublicKey || !stripeSecretKey) {
      return NextResponse.json({ error: "Missing keys" }, { status: 400 });
    }

    await connectToDB();
    
    // We update or create the setting
    const config = await Setting.findOneAndUpdate(
      {}, 
      { stripePublicKey, stripeSecretKey }, 
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Stripe configuration updated", config });
  } catch (error: any) {
    console.error("Stripe Config Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
