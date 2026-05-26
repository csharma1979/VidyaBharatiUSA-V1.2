"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto px-6 lg:px-10 py-8 border-t border-gray-100 bg-white/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-black text-[#0A1128] uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            System Online
          </div>
          <p className="text-xs font-medium text-gray-400">
            © {currentYear} Vidya Bharati USA. <span className="hidden md:inline">Registered 501(c)(3) Nonprofit.</span>
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs font-bold text-gray-400 hover:text-[#0A1128] transition-colors uppercase tracking-widest">Privacy</Link>
            <Link href="/terms" className="text-xs font-bold text-gray-400 hover:text-[#0A1128] transition-colors uppercase tracking-widest">Terms</Link>
            <Link href="#" className="text-xs font-bold text-gray-400 hover:text-[#0A1128] transition-colors uppercase tracking-widest">Support</Link>
          </div>
          <div className="h-4 w-px bg-gray-200 hidden md:block" />
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg">
             <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
             <span className="text-[10px] font-black text-[#0A1128] uppercase tracking-widest">v1.2.0</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-2 pt-8 border-t border-gray-50 md:hidden">
        <Heart className="w-3 h-3 text-[#D4AF37]" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Empowering Through Education</span>
      </div>
    </footer>
  );
}
