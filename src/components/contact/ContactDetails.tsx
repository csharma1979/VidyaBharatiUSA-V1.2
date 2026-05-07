"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Building, ShieldCheck, Heart, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const contactOptions = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (281) 845-1752",
    href: "tel:+12818451752",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "support@vidyabharatiusa.org",
    href: "mailto:support@vidyabharatiusa.org",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: MapPin,
    label: "Visit Our Office",
    value: "29 Olde Hamlet Dr., Jericho, NY 11237",
    href: "https://maps.google.com/?q=29+Olde+Hamlet+Dr,+Jericho,+NY+11237",
    color: "bg-orange-50 text-orange-600",
  },
];

export function ContactDetails() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Quick Contact Grid */}
      <div className="grid grid-cols-1 gap-6">
        {contactOptions.map((opt, idx) => (
          <motion.a
            key={opt.label}
            href={opt.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
          >
            <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <opt.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{opt.label}</p>
              <p className="text-lg font-bold text-deep-blue group-hover:text-saffron transition-colors">{opt.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* NGO Credentials Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative bg-deep-blue text-white rounded-[2.5rem] p-10 overflow-hidden shadow-2xl shadow-slate-200"
      >
        {/* Aesthetic Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-saffron/20 border border-saffron/30 rounded-2xl flex items-center justify-center">
              <Building className="w-6 h-6 text-saffron" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-black tracking-tight">NGO Credentials</h3>
              <p className="text-xs uppercase font-black tracking-[0.2em] text-saffron">Donation by Check</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Payable To</p>
                <p className="text-lg font-bold">Vidya Bharati Foundation of USA</p>
              </div>
              <button 
                onClick={() => handleCopy("Vidya Bharati Foundation of USA", "name")}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                title="Copy Name"
              >
                {copied === "name" ? <CheckCircle2 className="w-5 h-5 text-saffron" /> : <Copy className="w-5 h-5 text-white/40" />}
              </button>
            </div>

            <div className="flex justify-between items-start pt-6 border-t border-white/10">
              <div>
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Mailing Address</p>
                <p className="text-lg font-bold font-serif italic text-saffron leading-relaxed">
                  29 Olde Hamlet Dr.<br />
                  Jericho, NY 11237
                </p>
              </div>
              <button 
                onClick={() => handleCopy("29 Olde Hamlet Dr., Jericho, NY 11237", "address")}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                title="Copy Address"
              >
                {copied === "address" ? <CheckCircle2 className="w-5 h-5 text-saffron" /> : <Copy className="w-5 h-5 text-white/40" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
               <ShieldCheck className="w-6 h-6 text-saffron" />
               <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.1em]">Tax Status</p>
                  <p className="text-sm font-bold">501(c)(3) Exempt</p>
               </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
               <Heart className="w-6 h-6 text-red-400" />
               <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.1em]">Official EIN</p>
                  <p className="text-sm font-bold">47-4676188</p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
