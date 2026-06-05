import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { getAdminSession } from "@/lib/auth";
import { reconcileDonation } from "@/lib/reconcile";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session || (session.role !== "admin" && session.role !== "super_admin" && session.role !== "event_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    // Fetch all donations that represent tickets (donationId starting with GALA- or has non-empty ticketType)
    const tickets = await Donation.find({
      $or: [
        { donationId: { $regex: /^GALA-/i } },
        { ticketType: { $exists: true, $ne: "" } }
      ]
    }).sort({ createdAt: -1 });

    // Reconcile pending tickets
    const reconciledTickets = await Promise.all(
      tickets.map(async (ticket) => {
        if (ticket.paymentStatus === "pending") {
          return await reconcileDonation(ticket);
        }
        return ticket;
      })
    );

    return NextResponse.json(reconciledTickets);
  } catch (error: any) {
    console.error("Admin Tickets GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session || (session.role !== "admin" && session.role !== "super_admin" && session.role !== "event_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id,
      ticketStatus,
      checkInStatus,
      seatNumber,
      tableNumber,
      zone,
      specialRequirements,
      seatingPreference
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Ticket ID is required" }, { status: 400 });
    }

    await connectToDB();

    // Check duplicate seating assignment
    if (seatNumber && tableNumber) {
      const existingSeat = await Donation.findOne({
        _id: { $ne: id },
        seatNumber: seatNumber.trim(),
        tableNumber: tableNumber.trim(),
        paymentStatus: "success",
        ticketStatus: { $ne: "Cancelled" }
      });

      if (existingSeat) {
        return NextResponse.json({ 
          error: `Seat ${seatNumber} at Table ${tableNumber} is already occupied by ${existingSeat.firstName} ${existingSeat.lastName}.` 
        }, { status: 400 });
      }
    }

    const updatedTicket = await Donation.findByIdAndUpdate(
      id,
      {
        $set: {
          ticketStatus,
          checkInStatus,
          seatNumber: seatNumber ? seatNumber.trim() : "",
          tableNumber: tableNumber ? tableNumber.trim() : "",
          zone: zone ? zone.trim() : "",
          specialRequirements: specialRequirements ? specialRequirements.trim() : "",
          seatingPreference: seatingPreference ? seatingPreference.trim() : ""
        }
      },
      { new: true }
    );

    if (!updatedTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTicket);
  } catch (error: any) {
    console.error("Admin Tickets PUT Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update ticket" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session || (session.role !== "admin" && session.role !== "super_admin" && session.role !== "event_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ticket ID is required" }, { status: 400 });
    }

    await connectToDB();
    const deletedTicket = await Donation.findByIdAndDelete(id);

    if (!deletedTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket deleted successfully" });
  } catch (error: any) {
    console.error("Admin Tickets DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
