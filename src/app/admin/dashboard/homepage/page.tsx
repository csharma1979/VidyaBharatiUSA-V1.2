"use client";

import React from "react";
import { 
  Globe, 
  Layout, 
  Image as ImageIcon, 
  Star, 
  RefreshCcw, 
  Settings2,
  MoveRight,
  Eye,
  CheckCircle2
} from "lucide-react";

export default function AdminHomePageManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1128]">Home Page Editor</h2>
          <p className="text-gray-500 text-sm mt-1">Manage the content, banners and sections of your main landing page.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
            <Eye className="w-4 h-4" /> Preview Site
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1128] rounded-xl font-bold hover:bg-[#c2a032] transition-all shadow-lg shadow-[#D4AF37]/10">
            Publish Changes
          </button>
        </div>
      </div>

      {/* Editor Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Hero Slider */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 text-[#D4AF37] rounded-xl flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0A1128]">Hero Section Slider</h3>
            </div>
            <button className="text-xs font-bold text-[#D4AF37] hover:underline">Manage Slides</button>
          </div>
          <div className="p-6 space-y-4">
            <div className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
              <RefreshCcw className="w-6 h-6" />
              <p className="text-xs font-medium">Click to upload new banner images</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Headline Text</label>
              <input 
                defaultValue="Empowering a Child's Future Today"
                className="w-full bg-gray-50 border border-transparent rounded-xl py-3 px-4 focus:bg-white focus:border-[#D4AF37]/30 transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Impact Stats */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0A1128]">Impact Numbers</h3>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">Edit Stats</button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Students", value: "500K+" },
                { label: "Schools", value: "15K+" },
                { label: "States", value: "20+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 p-4 rounded-2xl text-center space-y-1">
                  <div className="text-lg font-black text-[#0A1128]">{stat.value}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Testimonials */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0A1128]">Testimonials Controller</h3>
            </div>
            <button className="text-xs font-bold text-emerald-600 hover:underline">Manage All</button>
          </div>
          <div className="p-6 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 items-start">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shrink-0" />
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A1128]">Dr. Surendra Garg</span>
                    <Settings2 className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2 italic">
                    "Providing these children with an education isn't just about jobs; it's about giving them the confidence..."
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Settings */}
        <div className="bg-[#0A1128] rounded-3xl p-8 text-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-serif font-black">SEO & Metadata</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Ensure your homepage is discoverable on Google. Manage meta titles, 
              descriptions, and social shares.
            </p>
          </div>
          <button className="mt-8 flex items-center justify-between group px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <span className="font-bold">Edit SEO Settings</span>
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}
