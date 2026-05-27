"use client";

import React, { useState, useEffect } from "react";
import { 
  History, 
  Download, 
  Search,
  Filter,
  Loader2,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  AlertCircle,
  ArrowUpRight,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function DonationHistoryPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await fetch("/api/donations/user");

        if (res.status === 401) {
          // Token expired or missing — redirect to login
          window.location.href = "/login?redirect=/dashboard/history";
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setDonations(data);
        }
      } catch (err) {
        console.error("Failed to load donations:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDonations();
  }, []);

  const handleRetryPayment = async (failedDonation: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: failedDonation.amount,
          firstName: failedDonation.firstName,
          lastName: failedDonation.lastName,
          email: failedDonation.email,
          userId: failedDonation.userId,
          isGuest: false,
          retryDonationId: failedDonation._id,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard?canceled=true`
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to recreate payment session.");
      }

      if (!data.url) {
        throw new Error("No checkout URL returned from payment server.");
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message || "Something went wrong during payment retry. Please try again.");
    }
  };


  const filteredDonations = donations.filter(d => 
    d._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.amount.toString().includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/dashboard" className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
            <ChevronLeft className="w-3 h-3" /> Back to Overview
          </Link>
          <h2 className="text-4xl font-black text-[#0A1128] font-serif">Donation History</h2>
          <p className="text-gray-500 text-sm font-medium">A complete record of your contributions and impact.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by ID or Amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all w-full md:w-64"
            />
          </div>
          <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:bg-gray-50 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full History Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction Date</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Reference Number</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Payment Type</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Donation Amount</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDonations.length === 0 ? (
                <tr>
                   <td colSpan={6} className="px-10 py-24 text-center">
                      <div className="max-w-xs mx-auto space-y-4">
                        <History className="w-12 h-12 text-gray-200 mx-auto" />
                        <p className="text-gray-400 font-medium">No transactions found match your criteria.</p>
                      </div>
                   </td>
                </tr>
              ) : (
                filteredDonations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-10 py-8">
                       <div className="text-sm font-bold text-[#0A1128]">
                         {new Date(donation.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}
                       </div>
                       <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                         {new Date(donation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </td>
                    <td className="px-10 py-8 text-xs text-gray-400 font-mono">
                      REF-{donation._id.toUpperCase()}
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[10px] font-black text-[#0A1128] uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-md">
                         {donation.paymentMethod || "Visa / Stripe"}
                       </span>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-lg font-black text-[#0A1128]">${donation.amount.toLocaleString()}</span>
                    </td>
                      <td className="px-10 py-8">
                      {donation.paymentStatus === "pending" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg border border-amber-100 uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                          <p className="text-[10px] text-gray-400 font-medium max-w-[200px] leading-tight">
                            Checking payment status...
                          </p>
                        </div>
                      ) : donation.paymentStatus === "failed" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-black rounded-lg border border-rose-100 uppercase tracking-widest">
                            <AlertCircle className="w-3.5 h-3.5" /> Failed
                          </span>
                          <p className="text-[10px] text-gray-400 font-medium max-w-[200px] leading-tight">
                            {donation.failureReason || "Payment was not successful."}
                          </p>
                        </div>
                      ) : donation.paymentStatus === "refunded" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-black rounded-lg border border-orange-100 uppercase tracking-widest">
                          <AlertCircle className="w-3.5 h-3.5" /> Refunded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">
                          <ShieldCheck className="w-3.5 h-3.5" /> Payment Successful
                        </span>
                      )}
                      </td>
                     <td className="px-10 py-8 text-right">
                      {donation.paymentStatus === "failed" || donation.paymentStatus === "pending" ? (
                        <button 
                          onClick={() => handleRetryPayment(donation)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-[#0A1128] font-black text-[10px] rounded-xl hover:bg-[#c2a032] hover:scale-105 transition-all shadow-sm uppercase tracking-wider"
                        >
                           Pay Now <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <Link 
                         href={`/receipt/${donation._id}`} 
                         className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A1128]/5 text-[#0A1128] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0A1128] hover:text-[#D4AF37] transition-all"
                        >
                           Download <Download className="w-4 h-4" />
                        </Link>
                      )}
                     </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Information Footer */}
      <div className="bg-[#0A1128] rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
        <div className="relative z-10 space-y-2">
          <h4 className="text-xl font-serif font-black tracking-tight">Need a year-end tax summary?</h4>
          <p className="text-white/50 text-sm font-medium max-w-xl">
            As a registered 501(c)(3) nonprofit, all your donations to VidyaBharati USA are tax-deductible. 
            You can download a combined annual report for the current fiscal year.
          </p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-[#D4AF37] text-[#0A1128] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#c2a032] transition-colors flex items-center gap-2">
           Generate Annual Report <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
