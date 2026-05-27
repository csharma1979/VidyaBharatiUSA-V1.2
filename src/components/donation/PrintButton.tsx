"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="flex items-center gap-2 px-5 py-2 bg-[#0A1128] text-white rounded-xl text-sm font-bold hover:bg-[#1a2b5e] hover:scale-105 transition-all shadow-sm print:hidden cursor-pointer"
    >
      <Printer className="w-4 h-4" /> Print / Save as PDF
    </button>
  );
}
