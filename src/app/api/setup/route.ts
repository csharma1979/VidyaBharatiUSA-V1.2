import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectToDB();
    
    // We update or create the setting with placeholder keys if they are missing
    const existing = await Setting.findOne();
    
    if (!existing) {
      await Setting.create({
        stripePublicKey: "pk_test_placeholder",
        stripeSecretKey: "sk_test_placeholder",
      });
      return NextResponse.json({ message: "Created placeholder settings" });
    }
    
    return NextResponse.json({ message: "Settings already exist", config: existing });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
