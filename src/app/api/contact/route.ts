import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    console.log("Contact Form Saved:", enquiry._id);

    return NextResponse.json(
      { message: "Enquiry sent successfully!", id: enquiry._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
