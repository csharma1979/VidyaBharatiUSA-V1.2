"use client";

import React from "react";
import { 
  PenTool, 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  Eye, 
  Clock,
  ChevronRight,
  FileText,
  BarChart3
} from "lucide-react";

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1128]">Blog Management</h2>
          <p className="text-gray-500 text-sm mt-1">Create, edit and manage articles for the organization's blog.</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0A1128] text-white rounded-xl font-bold hover:bg-[#1a2b5e] transition-all shadow-lg shadow-[#0A1128]/10">
          <Plus className="w-5 h-5" /> New Article
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Posts", value: "24", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Views", value: "1.2K", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Comments", value: "48", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Drafts", value: "3", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-xl font-black text-[#0A1128]">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Placeholder */}
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
          <PenTool className="w-10 h-10" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-xl font-bold text-[#0A1128]">Start writing your first story</h3>
          <p className="text-gray-500">
            Share updates, success stories, and news about VidyaBharati's 
            impact with your community of supporters.
          </p>
        </div>
        <button className="text-[#D4AF37] font-bold flex items-center gap-2 mx-auto hover:underline">
          Learn how to write effective blog posts <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Drafts Section Placeholder */}
      <div className="bg-[#0A1128] rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="bg-[#D4AF37] text-[#0A1128] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Optimization Tip
            </span>
            <h3 className="text-2xl font-serif font-black">Boost your blog engagement</h3>
            <p className="text-white/60 text-sm max-w-lg leading-relaxed">
              Posts with at least two high-quality images and a clear call-to-action (CTA) 
              receive 40% more donations compared to text-only articles.
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-[#0A1128] rounded-xl font-bold hover:bg-gray-100 transition-all shrink-0">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
