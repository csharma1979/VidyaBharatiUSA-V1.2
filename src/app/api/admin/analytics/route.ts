import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDB();

    const totalDonations = await Donation.aggregate([
      { $match: { paymentStatus: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const guestDonations = await Donation.countDocuments({ isGuest: true, paymentStatus: "success" });
    const registeredDonations = await Donation.countDocuments({ isGuest: false, paymentStatus: "success" });
    
    const totalUsers = await User.countDocuments({ role: "user" });

    // Recent donations for the dashboard
    const recentActivity = await Donation.find({ paymentStatus: "success" })
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      totalDonated: totalDonations[0]?.total || 0,
      totalUsers,
      guestDonations,
      registeredDonations,
      recentActivity
    });
  } catch (error) {
    console.error("Admin Analytics Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
