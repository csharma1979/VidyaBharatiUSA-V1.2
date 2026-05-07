"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  ChevronRight,
  Loader2,
  Lock,
  UserCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminOverview() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Analytics fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  const stats = [
    { name: "Total Revenue", value: `$${data?.totalDonated?.toLocaleString() || "0"}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Total Users", value: data?.totalUsers || "0", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Guest Donations", value: data?.guestDonations || "0", icon: Lock, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Reg. Donations", value: data?.registeredDonations || "0", icon: UserCheck, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-serif font-bold text-[#0A1128] mb-2">Enterprise Analytics</h2>
        <p className="text-gray-500 font-medium">Monitoring growth and contributions across the platform.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold text-[#0A1128] font-serif">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0A1128] font-serif flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#D4AF37]" />
              Recent Global Activity
            </h3>
            <button className="text-sm font-bold text-[#0A1128]/40 hover:text-[#D4AF37] transition-colors">View All</button>
          </div>
          <div className="divide-y divide-gray-50 overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Donor</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {data?.recentActivity?.length === 0 ? (
                    <tr>
                       <td colSpan={4} className="px-8 py-10 text-center text-gray-400">No recent activity detected.</td>
                    </tr>
                  ) : (
                    data?.recentActivity?.map((item: any) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#0A1128]">{item.firstName} {item.lastName}</span>
                              <span className="text-xs text-gray-400">{item.email}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-[#0A1128]">${item.amount}</td>
                        <td className="px-8 py-6 uppercase">
                           <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.isGuest ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                              {item.isGuest ? 'Guest' : 'Registered'}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-400">
                           {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#0A1128] rounded-[40px] p-10 text-white relative overflow-hidden h-full flex flex-col justify-between group">
              <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-[#D4AF37]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div>
                <TrendingUp className="w-10 h-10 text-[#D4AF37] mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4 leading-tight">Growth Insight</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                   Donations have increased by 24% compared to the previous month. Guest conversions are at an all-time high of 15%.
                </p>
              </div>
              <button className="relative z-10 p-5 mt-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                 <span className="text-sm font-bold uppercase tracking-wider">Download Report</span>
                 <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
