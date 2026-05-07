"use client";

import React from "react";
import SettingsForm from "@/components/dashboard/SettingsForm";
import PasswordSettings from "@/components/dashboard/PasswordSettings";
import { Settings, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0A1128] text-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-black text-[#0A1128] uppercase tracking-tighter">Account Settings</h1>
            <p className="text-gray-500 font-medium">Manage your personal profile and security preferences.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-12">
        {/* Personal Profile Section */}
        <section>
          <SettingsForm />
        </section>

        {/* Security Section */}
        <section className="space-y-6">
          <div className="px-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-2xl font-serif font-bold text-[#0A1128]">Security & Access</h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">Keep your account secure with regular password updates.</p>
          </div>
          <PasswordSettings />
        </section>
      </div>

      {/* Helper Footer */}
      <div className="bg-amber-50 rounded-[32px] p-10 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-lg font-bold text-[#0A1128]">Need help with your account?</h4>
          <p className="text-sm text-amber-900/60 leading-relaxed font-medium">
            If you need to change your registered email or experiencing technical issues, please contact our support team.
          </p>
        </div>
        <button className="whitespace-nowrap px-8 py-4 bg-[#0A1128] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0A1128] transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
}
