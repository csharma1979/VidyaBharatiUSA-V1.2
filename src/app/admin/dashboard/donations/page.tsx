"use client";

import React, { useEffect, useState } from "react";
import { 
  CreditCard, 
  Search, 
  Calendar,
  Loader2,
  AlertCircle,
  Download,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  Copy,
  Check,
  Trash2
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

interface Donation {
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
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [donationToDelete, setDonationToDelete] = useState<Donation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDeleteDonation = async () => {
    if (!donationToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/donations?id=${donationToDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete donation");
      
      setDonations(prev => prev.filter(d => d._id !== donationToDelete._id));
      
      if (selectedDonation?._id === donationToDelete._id) {
        setSelectedDonation(null);
      }
      
      setDonationToDelete(null);
      toast.success("Donation deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete donation");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/admin/donations");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch donations");
      setDonations(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDonations = donations.filter(donation => 
    `${donation.firstName} ${donation.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = donations
    .filter(d => d.paymentStatus === "success")
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-[#D4AF37]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-[#0A1128]">${totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Transactions</p>
              <h3 className="text-2xl font-bold text-[#0A1128]">{donations.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Success Rate</p>
              <h3 className="text-2xl font-bold text-[#0A1128]">
                {donations.length > 0 
                  ? Math.round((donations.filter(d => d.paymentStatus === "success").length / donations.length) * 100) 
                  : 0}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1128]">Donation</h2>
          <p className="text-gray-500 text-sm mt-1">Monitor and track every contribution made to the organization.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by donor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#D4AF37] text-sm"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
            <Filter className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0A1128] text-white rounded-xl text-sm font-bold hover:bg-[#1a2b5e] transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-[#0A1128]">{donation.firstName} {donation.lastName}</div>
                          <div className="text-xs text-gray-400">{donation.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#0A1128]">
                          ${donation.amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">{donation.currency}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          donation.paymentStatus === "success" 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : donation.paymentStatus === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}>
                          {donation.paymentStatus === "success" && <CheckCircle2 className="w-3 h-3" />}
                          {donation.paymentStatus === "pending" && <Clock className="w-3 h-3" />}
                          {donation.paymentStatus === "failed" && <XCircle className="w-3 h-3" />}
                          {donation.paymentStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {new Date(donation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          donation.isGuest 
                            ? "text-purple-600 bg-purple-50 border-purple-100" 
                            : "text-blue-600 bg-blue-50 border-blue-100"
                        }`}>
                          {donation.isGuest ? "GUEST" : "REGISTERED"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setSelectedDonation(donation)}
                            className="text-[#D4AF37] hover:underline font-bold text-xs flex items-center gap-1 hover:text-amber-600 transition-colors"
                          >
                            View details <ArrowUpRight className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => setDonationToDelete(donation)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
                            title="Delete donation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic text-sm">
                      No payments found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Donation Details Drawer */}
      <AnimatePresence>
        {selectedDonation && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDonation(null)}
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
                  <h3 className="text-lg font-bold text-[#0A1128]">Donation Details</h3>
                  <p className="text-xs text-gray-500 mt-0.5">ID: {selectedDonation.donationId || selectedDonation._id}</p>
                </div>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8 flex-grow">
                {/* Amount and Status Hero Section */}
                <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    selectedDonation.paymentStatus === "success" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : selectedDonation.paymentStatus === "pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}>
                    {selectedDonation.paymentStatus === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {selectedDonation.paymentStatus === "pending" && <Clock className="w-3.5 h-3.5" />}
                    {selectedDonation.paymentStatus === "failed" && <XCircle className="w-3.5 h-3.5" />}
                    {selectedDonation.paymentStatus.toUpperCase()}
                  </span>
                  
                  <div>
                    <div className="text-4xl font-black text-[#0A1128]">
                      ${selectedDonation.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {selectedDonation.currency}
                    </div>
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                    Donor Information
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">First Name</p>
                      <p className="font-semibold text-[#0A1128] mt-0.5">{selectedDonation.firstName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Last Name</p>
                      <p className="font-semibold text-[#0A1128] mt-0.5">{selectedDonation.lastName}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400 font-medium">Email Address</p>
                      <div className="flex items-center justify-between mt-0.5 group">
                        <p className="font-semibold text-[#0A1128]">{selectedDonation.email}</p>
                        <button
                          onClick={() => copyToClipboard(selectedDonation.email, "email")}
                          className="text-xs text-gray-400 hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          title="Copy Email"
                        >
                          {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Donor Type</p>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border mt-1.5 ${
                        selectedDonation.isGuest 
                          ? "text-purple-600 bg-purple-50 border-purple-100" 
                          : "text-blue-600 bg-blue-50 border-blue-100"
                      }`}>
                        {selectedDonation.isGuest ? "GUEST DONOR" : "REGISTERED USER"}
                      </span>
                    </div>
                    {selectedDonation.userId && (
                      <div>
                        <p className="text-xs text-gray-400 font-medium">User ID</p>
                        <p className="font-mono text-xs text-[#0A1128] mt-1 break-all bg-gray-50 p-1.5 rounded border border-gray-100">
                          {selectedDonation.userId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transaction Information */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                    Payment Details
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Payment Method</p>
                      <p className="font-semibold text-[#0A1128] mt-0.5 capitalize">
                        {selectedDonation.paymentMethod || "Stripe Card"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Transaction Date</p>
                      <p className="font-semibold text-[#0A1128] mt-0.5">
                        {new Date(selectedDonation.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    {selectedDonation.stripeSessionId && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-400 font-medium">Stripe Session ID</p>
                        <div className="flex items-center justify-between mt-1 bg-gray-50 p-2 rounded border border-gray-100 group">
                          <p className="font-mono text-xs text-[#0A1128] truncate max-w-[90%]">
                            {selectedDonation.stripeSessionId}
                          </p>
                          <button
                            onClick={() => copyToClipboard(selectedDonation.stripeSessionId!, "stripeSessionId")}
                            className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors p-1"
                            title="Copy Stripe Session ID"
                          >
                            {copiedField === "stripeSessionId" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                    {selectedDonation.donationId && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-400 font-medium">Donation ID</p>
                        <div className="flex items-center justify-between mt-1 bg-gray-50 p-2 rounded border border-gray-100 group">
                          <p className="font-mono text-xs text-[#0A1128] truncate max-w-[90%]">
                            {selectedDonation.donationId}
                          </p>
                          <button
                            onClick={() => copyToClipboard(selectedDonation.donationId!, "donationId")}
                            className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors p-1"
                            title="Copy Donation ID"
                          >
                            {copiedField === "donationId" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <button
                  onClick={() => setDonationToDelete(selectedDonation)}
                  className="px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Delete Payment
                </button>
                <div className="flex gap-2">
                  {(selectedDonation.paymentStatus === "success" || selectedDonation.paymentStatus === "refunded") && (
                    <a 
                      href={`/receipt/${selectedDonation._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-amber-200 text-[#D4AF37] rounded-xl text-sm font-bold hover:bg-amber-50 transition-all flex items-center gap-1.5"
                    >
                      View Receipt <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedDonation(null)}
                    className="px-6 py-2.5 bg-[#0A1128] text-white rounded-xl text-sm font-bold hover:bg-[#1a2b5e] transition-all shadow-sm"
                  >
                    Close details
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {donationToDelete && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setDonationToDelete(null)}
              className="fixed inset-0 bg-black z-[60] cursor-default"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-[60] space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A1128]">Delete Donation Record</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to delete this donation from the system? This will permanently remove the record for{" "}
                    <span className="font-semibold text-gray-700">
                      {donationToDelete.firstName} {donationToDelete.lastName} (${donationToDelete.amount.toLocaleString()})
                    </span>. This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setDonationToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDonation}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center gap-1.5 shadow-md shadow-red-500/10 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                    </>
                  ) : (
                    "Delete Permanently"
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
