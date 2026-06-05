"use client";

import React, { useEffect, useState } from "react";
import {
  Ticket,
  Search,
  Calendar,
  Loader2,
  AlertCircle,
  Download,
  Filter,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  XCircle,
  X,
  Copy,
  Check,
  UserCheck,
  Printer,
  ChevronDown,
  Layers,
  MapPin,
  ClipboardList,
  Edit2
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

interface TicketBooking {
  _id: string;
  donationId?: string;
  userId?: string | null;
  email: string;
  firstName: string;
  lastName: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod?: string;
  stripeSessionId?: string;
  isGuest: boolean;
  createdAt: string;
  mobile: string;
  ticketType: string;
  ticketStatus: "Active" | "Cancelled" | "Refunded" | "Checked-In";
  checkInStatus: "Pending" | "Checked-In";
  seatNumber: string;
  tableNumber: string;
  zone: string;
  specialRequirements: string;
  seatingPreference: string;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selection / Search / Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicketType, setSelectedTicketType] = useState("All");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("All");
  const [selectedCheckInStatus, setSelectedCheckInStatus] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState<TicketBooking | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Seating Edit State
  const [seatingData, setSeatingData] = useState({
    tableNumber: "",
    seatNumber: "",
    zone: "",
    specialRequirements: "",
    seatingPreference: "",
    checkInStatus: "Pending",
    ticketStatus: "Active"
  });
  const [isUpdatingSeating, setIsUpdatingSeating] = useState(false);

  // Bulk Seating State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkData, setBulkData] = useState({
    tableNumber: "",
    zone: "",
    startSeatNumber: "",
    checkInStatus: "",
    ticketStatus: ""
  });
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/admin/tickets");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch tickets");
      setTickets(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDrawer = (ticket: TicketBooking) => {
    setSelectedTicket(ticket);
    setSeatingData({
      tableNumber: ticket.tableNumber || "",
      seatNumber: ticket.seatNumber || "",
      zone: ticket.zone || "",
      specialRequirements: ticket.specialRequirements || "",
      seatingPreference: ticket.seatingPreference || "",
      checkInStatus: ticket.checkInStatus || "Pending",
      ticketStatus: ticket.ticketStatus || "Active"
    });
  };

  const handleUpdateSeating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;
    setIsUpdatingSeating(true);

    try {
      const res = await fetch("/api/admin/tickets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedTicket._id,
          tableNumber: seatingData.tableNumber,
          seatNumber: seatingData.seatNumber,
          zone: seatingData.zone,
          specialRequirements: seatingData.specialRequirements,
          seatingPreference: seatingData.seatingPreference,
          checkInStatus: seatingData.checkInStatus,
          ticketStatus: seatingData.ticketStatus
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update seating");

      toast.success("Ticket details updated successfully");
      
      // Update local state
      setTickets(prev => prev.map(t => t._id === selectedTicket._id ? { ...t, ...data } : t));
      setSelectedTicket(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to update seating");
    } finally {
      setIsUpdatingSeating(false);
    }
  };

  const handleBulkUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRows.length === 0) return;
    setIsBulkUpdating(true);

    try {
      const payload: any = {
        ids: selectedRows,
        tableNumber: bulkData.tableNumber || undefined,
        zone: bulkData.zone || undefined,
        startSeatNumber: bulkData.startSeatNumber || undefined,
        checkInStatus: bulkData.checkInStatus || undefined,
        ticketStatus: bulkData.ticketStatus || undefined
      };

      const res = await fetch("/api/admin/tickets/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bulk update failed");

      toast.success(data.message || "Bulk update successful");
      setShowBulkModal(false);
      setSelectedRows([]);
      setBulkData({
        tableNumber: "",
        zone: "",
        startSeatNumber: "",
        checkInStatus: "",
        ticketStatus: ""
      });
      fetchTickets(); // Refresh all tickets
    } catch (err: any) {
      toast.error(err.message || "Failed bulk update");
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredTickets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTickets.map(t => t._id));
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Ticket ID", "Purchaser Name", "Email", "Mobile", "Ticket Type", "Amount", 
      "Payment Status", "Ticket Status", "Check-in Status", "Table Number", 
      "Seat Number", "Zone", "Special Requirements", "Seating Preference", "Booking Date"
    ];
    
    const rows = filteredTickets.map(ticket => [
      ticket.donationId || ticket._id,
      `${ticket.firstName} ${ticket.lastName}`,
      ticket.email,
      ticket.mobile || "",
      ticket.ticketType || "Gala Ticket",
      ticket.amount,
      ticket.paymentStatus,
      ticket.ticketStatus || "Active",
      ticket.checkInStatus || "Pending",
      ticket.tableNumber || "",
      ticket.seatNumber || "",
      ticket.zone || "",
      ticket.specialRequirements || "",
      ticket.seatingPreference || "",
      new Date(ticket.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Gala_Attendees_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (type: "attendees" | "seating") => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const title = type === "attendees" ? "Gala Attendees List" : "Gala Seating Allocation Sheet";
    
    let tableRows = "";
    if (type === "attendees") {
      tableRows = filteredTickets.map(t => `
        <tr>
          <td>${t.donationId || t._id}</td>
          <td>${t.firstName} ${t.lastName}</td>
          <td>${t.email}</td>
          <td>${t.mobile || ""}</td>
          <td>${t.ticketType || "Gala Ticket"}</td>
          <td>$${t.amount}</td>
          <td>${t.ticketStatus || "Active"}</td>
          <td>${t.checkInStatus || "Pending"}</td>
        </tr>
      `).join("");
    } else {
      tableRows = filteredTickets.map(t => `
        <tr>
          <td>${t.tableNumber || "Unassigned"}</td>
          <td>${t.seatNumber || "Unassigned"}</td>
          <td>${t.zone || "Unassigned"}</td>
          <td>${t.firstName} ${t.lastName}</td>
          <td>${t.ticketType || "Gala Ticket"}</td>
          <td>${t.specialRequirements || "None"}</td>
        </tr>
      `).join("");
    }

    const htmlContent = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { text-align: center; margin-bottom: 20px; font-size: 24px; color: #0A1128; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 12px; }
            th { background-color: #f5f5f5; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .meta { text-align: right; font-size: 10px; color: #666; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="meta">Printed on ${new Date().toLocaleString()} | Total: ${filteredTickets.length} records</div>
          <table>
            <thead>
              ${type === "attendees" ? `
                <tr>
                  <th>Ticket ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Ticket Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Check-In</th>
                </tr>
              ` : `
                <tr>
                  <th>Table</th>
                  <th>Seat</th>
                  <th>Zone</th>
                  <th>Attendee</th>
                  <th>Ticket Type</th>
                  <th>Notes</th>
                </tr>
              `}
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Filter Logic
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      `${ticket.firstName} ${ticket.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.donationId && ticket.donationId.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = selectedTicketType === "All" || ticket.ticketType === selectedTicketType;
    const matchesPayment = selectedPaymentStatus === "All" || ticket.paymentStatus === selectedPaymentStatus;
    const matchesCheckIn = selectedCheckInStatus === "All" || ticket.checkInStatus === selectedCheckInStatus;

    return matchesSearch && matchesType && matchesPayment && matchesCheckIn;
  });

  // Calculations
  const successfulTickets = tickets.filter(t => t.paymentStatus === "success");
  const totalRevenue = successfulTickets.reduce((acc, curr) => acc + curr.amount, 0);
  const checkedInAttendees = successfulTickets.filter(t => t.checkInStatus === "Checked-In").length;
  const pendingCheckIns = successfulTickets.filter(t => t.checkInStatus !== "Checked-In").length;
  const occupiedSeats = successfulTickets.filter(t => t.seatNumber !== "").length;
  const totalCapacity = 200; // Assume 20 tables of 10 seats
  const availableSeats = Math.max(0, totalCapacity - occupiedSeats);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-sm">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-[#D4AF37]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Revenue</p>
            <h3 className="text-xl font-bold text-[#0A1128]">${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tickets Sold</p>
            <h3 className="text-xl font-bold text-[#0A1128]">{successfulTickets.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Checked In</p>
            <h3 className="text-xl font-bold text-[#0A1128]">{checkedInAttendees} <span className="text-xs font-normal text-gray-400">/ {successfulTickets.length}</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Seating Status</p>
            <h3 className="text-xl font-bold text-[#0A1128]">{occupiedSeats} <span className="text-xs font-normal text-gray-400">occupied ({availableSeats} left)</span></h3>
          </div>
        </div>
      </div>

      {/* Header and Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1128]">Gala Event Tickets</h2>
          <p className="text-gray-500 text-xs mt-1">Manage ticket bookings, attendee lists, check-ins, and seating assignments.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by attendee or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#D4AF37] text-xs"
            />
          </div>

          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-600"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>

          <button 
            onClick={() => handlePrint("attendees")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-600"
          >
            <Printer className="w-4 h-4" /> Print Attendees
          </button>

          <button 
            onClick={() => handlePrint("seating")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-600"
          >
            <MapPin className="w-4 h-4" /> Print Seating
          </button>

          {selectedRows.length > 0 && (
            <button 
              onClick={() => setShowBulkModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#0A1128] rounded-xl font-bold hover:bg-[#bfa032] transition-all shadow-md"
            >
              <Edit2 className="w-4 h-4" /> Bulk Allocate ({selectedRows.length})
            </button>
          )}
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">
          <Filter className="w-4 h-4" /> Filters:
        </div>

        <div className="flex flex-wrap gap-3 flex-grow">
          {/* Ticket Type filter */}
          <select
            value={selectedTicketType}
            onChange={(e) => setSelectedTicketType(e.target.value)}
            className="bg-gray-50 border border-gray-150 rounded-lg px-3 py-1.5 focus:outline-none text-xs text-gray-700"
          >
            <option value="All">All Ticket Categories</option>
            <option value="Gala Gold Ticket">Gala Gold</option>
            <option value="Gala Silver Ticket">Gala Silver</option>
            <option value="Gala Bronze Ticket">Gala Bronze</option>
          </select>

          {/* Payment Status filter */}
          <select
            value={selectedPaymentStatus}
            onChange={(e) => setSelectedPaymentStatus(e.target.value)}
            className="bg-gray-50 border border-gray-150 rounded-lg px-3 py-1.5 focus:outline-none text-xs text-gray-700"
          >
            <option value="All">All Payment Statuses</option>
            <option value="success">Successful Only</option>
            <option value="pending">Pending Only</option>
            <option value="failed">Failed Only</option>
          </select>

          {/* Check in filter */}
          <select
            value={selectedCheckInStatus}
            onChange={(e) => setSelectedCheckInStatus(e.target.value)}
            className="bg-gray-50 border border-gray-150 rounded-lg px-3 py-1.5 focus:outline-none text-xs text-gray-700"
          >
            <option value="All">All Check-In Statuses</option>
            <option value="Checked-In">Checked In</option>
            <option value="Pending">Pending Check-In</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {error ? (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={filteredTickets.length > 0 && selectedRows.length === filteredTickets.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4">Attendee</th>
                  <th className="px-6 py-4">Ticket details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Seating</th>
                  <th className="px-6 py-4">Check-In</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(ticket._id)}
                          onChange={() => handleToggleRow(ticket._id)}
                          className="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-[#0A1128]">{ticket.firstName} {ticket.lastName}</div>
                          <div className="text-xs text-gray-400">{ticket.email}</div>
                          {ticket.mobile && <div className="text-xs text-gray-400">{ticket.mobile}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-[#0A1128]">{ticket.ticketType || "Gala Admission"}</div>
                          <div className="text-xs text-[#D4AF37] font-bold">${ticket.amount}</div>
                          <div className="text-[10px] text-gray-400">ID: {ticket.donationId || ticket._id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            ticket.paymentStatus === "success" 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                              : "bg-red-50 text-red-700 border border-red-100"
                          }`}>
                            {ticket.paymentStatus}
                          </span>
                          {ticket.paymentStatus === "success" && (
                            <span className={`block text-[9px] font-bold text-gray-400`}>
                              TICKET: {ticket.ticketStatus || "Active"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {ticket.tableNumber || ticket.seatNumber ? (
                          <div className="space-y-0.5">
                            {ticket.tableNumber && (
                              <div className="font-bold text-[#0A1128]">Table {ticket.tableNumber}</div>
                            )}
                            {ticket.seatNumber && (
                              <div className="text-xs text-slate-500 font-medium">Seat {ticket.seatNumber}</div>
                            )}
                            {ticket.zone && (
                              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{ticket.zone}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          ticket.checkInStatus === "Checked-In" 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {ticket.checkInStatus === "Checked-In" ? "Checked In" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleOpenDrawer(ticket)}
                          className="text-[#D4AF37] hover:underline font-bold text-xs flex items-center gap-1 hover:text-amber-600 transition-colors"
                        >
                          View / Assign Seat <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic text-sm">
                      No ticket bookings found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ticket Details & Seating Drawer */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto flex flex-col border-l border-gray-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h3 className="text-lg font-bold text-[#0A1128]">Attendee Details</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Booking Ref: {selectedTicket.donationId || selectedTicket._id}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8 flex-grow">
                {/* Guest Profile Hero */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">Guest Name</span>
                    <span className="font-bold text-[#0A1128] text-base">{selectedTicket.firstName} {selectedTicket.lastName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">Ticket Category</span>
                    <span className="font-bold text-[#D4AF37] text-base">{selectedTicket.ticketType || "Gala Ticket"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">Email</span>
                    <span className="font-semibold text-gray-600">{selectedTicket.email}</span>
                  </div>
                  {selectedTicket.mobile && (
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">Mobile</span>
                      <span className="font-semibold text-gray-600">{selectedTicket.mobile}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-0.5">Booking Date</span>
                    <span className="font-semibold text-gray-600">{new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Seating Arrangement Form */}
                <form onSubmit={handleUpdateSeating} className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                    Seating & Admission Layout
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Table Number</label>
                      <input
                        type="text"
                        value={seatingData.tableNumber}
                        onChange={(e) => setSeatingData({...seatingData, tableNumber: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                        placeholder="e.g. 5"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Seat Number</label>
                      <input
                        type="text"
                        value={seatingData.seatNumber}
                        onChange={(e) => setSeatingData({...seatingData, seatNumber: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                        placeholder="e.g. A2"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Zone / Section / Section</label>
                      <input
                        type="text"
                        value={seatingData.zone}
                        onChange={(e) => setSeatingData({...seatingData, zone: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                        placeholder="e.g. VIP Front row"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Special Requirements / Notes</label>
                      <textarea
                        value={seatingData.specialRequirements}
                        onChange={(e) => setSeatingData({...seatingData, specialRequirements: e.target.value})}
                        rows={2}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                        placeholder="e.g. Wheelchair access, vegetarian meal"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Seating Preference</label>
                      <input
                        type="text"
                        value={seatingData.seatingPreference}
                        onChange={(e) => setSeatingData({...seatingData, seatingPreference: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                        placeholder="e.g. Sit near corporate sponsors"
                      />
                    </div>
                  </div>

                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 pt-4">
                    Admission Control
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Check-in Status</label>
                      <select
                        value={seatingData.checkInStatus}
                        onChange={(e) => setSeatingData({...seatingData, checkInStatus: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none text-xs text-gray-700"
                      >
                        <option value="Pending">Pending Check-in</option>
                        <option value="Checked-In">Checked-In</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Ticket Status</label>
                      <select
                        value={seatingData.ticketStatus}
                        onChange={(e) => setSeatingData({...seatingData, ticketStatus: e.target.value as any})}
                        className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none text-xs text-gray-700"
                      >
                        <option value="Active">Active</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingSeating}
                    className="w-full bg-[#0A1128] text-white py-4 rounded-xl font-bold hover:bg-[#1a2b5e] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                  >
                    {isUpdatingSeating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                      </>
                    ) : (
                      "Save Allocation Changes"
                    )}
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all"
                >
                  Close details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bulk Allocation Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => !isBulkUpdating && setShowBulkModal(false)}
              className="fixed inset-0 bg-black z-50 cursor-default"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 text-[#D4AF37] rounded-xl flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A1128]">Bulk Seat Allocation</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Apply updates to all <strong>{selectedRows.length}</strong> selected attendee records simultaneously.
                  </p>
                </div>
              </div>

              <form onSubmit={handleBulkUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Table Number</label>
                    <input
                      type="text"
                      placeholder="Assign same table (e.g. 12)"
                      value={bulkData.tableNumber}
                      onChange={(e) => setBulkData({...bulkData, tableNumber: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Start Seat (Sequential)</label>
                    <input
                      type="number"
                      placeholder="Start number (e.g. 1)"
                      value={bulkData.startSeatNumber}
                      onChange={(e) => setBulkData({...bulkData, startSeatNumber: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Zone / Section</label>
                    <input
                      type="text"
                      placeholder="Assign Zone (e.g. VIP)"
                      value={bulkData.zone}
                      onChange={(e) => setBulkData({...bulkData, zone: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none focus:border-[#D4AF37] text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Check-in Status</label>
                    <select
                      value={bulkData.checkInStatus}
                      onChange={(e) => setBulkData({...bulkData, checkInStatus: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none text-xs text-gray-700"
                    >
                      <option value="">No Change</option>
                      <option value="Pending">Pending</option>
                      <option value="Checked-In">Checked-In</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Ticket Status</label>
                    <select
                      value={bulkData.ticketStatus}
                      onChange={(e) => setBulkData({...bulkData, ticketStatus: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-150 rounded-xl py-3 px-4 focus:outline-none text-xs text-gray-700"
                    >
                      <option value="">No Change</option>
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowBulkModal(false)}
                    disabled={isBulkUpdating}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isBulkUpdating}
                    className="px-4 py-2 bg-[#0A1128] text-white rounded-xl font-bold hover:bg-[#1a2b5e] transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50 text-xs"
                  >
                    {isBulkUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Apply Changes"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
