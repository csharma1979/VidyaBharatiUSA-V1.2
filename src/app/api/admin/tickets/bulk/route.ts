import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session || (session.role !== "admin" && session.role !== "super_admin" && session.role !== "event_admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      ids,
      tableNumber,
      zone,
      startSeatNumber,
      checkInStatus,
      ticketStatus
    } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "A list of Ticket IDs is required" }, { status: 400 });
    }

    await connectToDB();

    // 1. Gather all updates to apply
    const updates: any[] = [];
    let currentSeatInt = startSeatNumber ? parseInt(startSeatNumber) : NaN;

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const ticket = await Donation.findById(id);
      if (!ticket) {
        return NextResponse.json({ error: `Ticket with ID ${id} not found` }, { status: 404 });
      }

      const updateFields: any = {};
      if (tableNumber !== undefined) updateFields.tableNumber = tableNumber.trim();
      if (zone !== undefined) updateFields.zone = zone.trim();
      if (checkInStatus !== undefined) updateFields.checkInStatus = checkInStatus;
      if (ticketStatus !== undefined) updateFields.ticketStatus = ticketStatus;

      if (!isNaN(currentSeatInt)) {
        const targetSeat = currentSeatInt.toString();
        const targetTable = tableNumber ? tableNumber.trim() : (ticket.tableNumber || "");

        if (targetSeat && targetTable) {
          // Check for duplicate seat in database
          const existingSeat = await Donation.findOne({
            _id: { $ne: id },
            seatNumber: targetSeat,
            tableNumber: targetTable,
            paymentStatus: "success",
            ticketStatus: { $ne: "Cancelled" }
          });

          if (existingSeat) {
            return NextResponse.json({
              error: `Seat ${targetSeat} at Table ${targetTable} is already occupied by ${existingSeat.firstName} ${existingSeat.lastName}. Bulk allocation aborted.`
            }, { status: 400 });
          }

          // Check for duplicate seat within this current batch
          const duplicateInBatch = updates.find(
            (u: any) => u.seatNumber === targetSeat && u.tableNumber === targetTable
          );
          if (duplicateInBatch) {
            return NextResponse.json({
              error: `Duplicate seat assignment detected: Seat ${targetSeat} at Table ${targetTable} is allocated twice in the batch. Bulk allocation aborted.`
            }, { status: 400 });
          }
        }

        updateFields.seatNumber = targetSeat;
        currentSeatInt++; // Increment seat number for next ticket in batch
      }

      updates.push({ id, updateFields, seatNumber: updateFields.seatNumber, tableNumber: updateFields.tableNumber });
    }

    // 2. Perform bulk updates
    for (const update of updates) {
      await Donation.findByIdAndUpdate(update.id, { $set: update.updateFields });
    }

    return NextResponse.json({ message: `Successfully updated ${updates.length} tickets.` });
  } catch (error: any) {
    console.error("Admin Tickets Bulk POST Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update tickets in bulk" }, { status: 500 });
  }
}
