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
  XCircle
} from "lucide-react";

interface Donation {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod?: string;
  isGuest: boolean;
  createdAt: string;
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
          <h2 className="text-2xl font-bold text-[#0A1128]">Donation Payments</h2>
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
                        <button className="text-[#D4AF37] hover:underline font-bold text-xs flex items-center gap-1">
                          View details <ArrowUpRight className="w-3 h-3" />
                        </button>
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
    </div>
  );
}
