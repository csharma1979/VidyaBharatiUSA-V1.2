"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  History, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck,
  TrendingUp,
  Loader2,
  Users,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const [donations, setDonations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [donationsRes, profileRes] = await Promise.all([
          fetch("/api/donations/user"),
          fetch("/api/user/profile")
        ]);
        
        if (donationsRes.ok) {
          const donationsData = await donationsRes.ok ? await donationsRes.json() : [];
          setDonations(donationsData);
        }
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUser(profileData);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalDonated = donations.length > 0 ? donations.reduce((sum, d) => sum + d.amount, 0) : 0;
  const livesImpacted = Math.floor(totalDonated / 100);
  const recentDonations = donations.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Impact Card */}
        <div className="lg:col-span-2 bg-[#0A1128] rounded-[32px] p-10 md:p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[340px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-[80px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <p className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-[10px]">
                Welcome back, {user?.firstName || "Donor"} • Your Global Contribution
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-4">
              ${totalDonated.toLocaleString()}
            </h2>
            <p className="text-white/50 max-w-md text-sm leading-relaxed font-medium">
              Thank you for being a pillar of support. Your contributions are creating sustainable educational pathways for children in need.
            </p>
          </div>

          <div className="relative z-10 pt-12 flex items-center gap-12 border-t border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-2xl font-black font-serif">{donations.length}</span>
              </div>
              <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Successful Donations</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-400">
                <Users className="w-4 h-4" />
                <span className="text-2xl font-black font-serif">{livesImpacted > 0 ? livesImpacted : "---"}</span>
              </div>
              <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Lives Impacted</span>
            </div>
          </div>
        </div>

        {/* Quick Action Card */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm grow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <GraduationCap className="w-24 h-24 text-[#0A1128]" />
            </div>
            <div>
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-black text-[#0A1128] mb-2 tracking-tight">Support a Child</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                Set up a new contribution to support rural education and skill development programs.
              </p>
            </div>
            <Link href="/donate" className="mt-8">
              <button className="w-full bg-[#D4AF37] text-[#0A1128] font-black py-4 rounded-2xl shadow-xl shadow-amber-200/50 hover:bg-[#c2a032] hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                 Start Donation <TrendingUp className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-[#0A1128] font-serif">Recent History</h3>
            <p className="text-gray-400 text-xs mt-1 font-medium">Track your most recent contributions and download receipts.</p>
          </div>
          <Link href="/dashboard/history">
            <button className="px-6 py-3 bg-gray-50 text-[#0A1128] text-xs font-black rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-100 uppercase tracking-widest">
              View All Activity <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Reference</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-10 py-20 text-center">
                      <div className="max-w-xs mx-auto space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                          <History className="w-8 h-8" />
                        </div>
                        <p className="text-gray-400 font-medium text-sm">You haven't made any donations yet.</p>
                        <Link href="/donate" className="inline-block text-[#D4AF37] text-xs font-black uppercase tracking-widest border-b-2 border-[#D4AF37] pb-1 hover:text-[#0A1128] hover:border-[#0A1128] transition-all">
                          Make your first gift
                        </Link>
                      </div>
                   </td>
                </tr>
              ) : (
                recentDonations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-10 py-8 text-sm font-bold text-[#0A1128]">
                      {new Date(donation.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-10 py-8 text-xs text-gray-400 font-mono tracking-tighter">
                      TXN-{donation._id.substring(donation._id.length - 8).toUpperCase()}
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-lg font-black text-[#0A1128]">${donation.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-8">
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">
                         <ShieldCheck className="w-3.5 h-3.5" /> Success
                       </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <Link 
                        href={`/receipt/${donation._id}`} 
                        className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:bg-[#0A1128] hover:text-[#D4AF37] hover:border-[#0A1128] transition-all shadow-sm"
                       >
                          <Download className="w-5 h-5" />
                       </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact Story Callout */}
      <div className="p-10 bg-[#D4AF37] rounded-[40px] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl shadow-amber-200/20">
         <div className="absolute top-0 left-0 w-full h-full bg-black/5 opacity-50" />
         <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center shrink-0 border border-white/30">
            <History className="w-10 h-10 text-white" />
         </div>
         <div className="relative z-10 space-y-2 text-[#0A1128]">
            <h4 className="text-2xl font-serif font-black tracking-tight underline decoration-white/30 decoration-thickness-2">The power of your support</h4>
            <p className="text-sm font-medium leading-relaxed max-w-2xl text-[#0A1128]/70">
              Each donation you've made helps bridge the gap in rural education. Currently, 
              your contributions are supporting the digital literacy module for secondary students 
              in the Sanskriti Bodh program.
            </p>
         </div>
      </div>
    </div>
  );
}
