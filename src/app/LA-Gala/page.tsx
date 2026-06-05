"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import GalaTicketForm from "@/components/donation/GalaTicketForm";
import DonationForm from "@/components/donation/DonationForm";
import {
  CheckCircle,
  AlertTriangle,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

/* ─── Lotus ornament icon ─────────────────────────────────────────────────── */
function LotusIcon({ className = "w-6 h-6 text-[#D4AF37]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 21c-1.2-3.5-1.8-6.5-1.8-8.5 0-3 1.8-5.5 1.8-5.5s1.8 2.5 1.8 5.5c0 2-.6 5-1.8 8.5z" fill="currentColor" fillOpacity="0.15" />
      <path d="M12 21c-4.5-1-6.5-2.5-7-4.5-.4-1.8.4-3.2.4-3.2s2 0 3.2 2c1 1.6 1.8 3.2 3.4 5.7z" />
      <path d="M12 16.5c-3-2-4-4.5-4-4.5" />
      <path d="M12 21c4.5-1 6.5-2.5 7-4.5.4-1.8-.4-3.2-.4-3.2s-2 0-3.2 2c-1 1.6-1.8 3.2-3.4 5.7z" />
      <path d="M12 16.5c3-2 4-4.5 4-4.5" />
      <path d="M7 21h10M9 22.5h6" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Gold divider ─────────────────────────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]/20" />
      <LotusIcon className="w-5 h-5 text-[#D4AF37] shrink-0" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]/20" />
    </div>
  );
}

/* ─── Main page content ────────────────────────────────────────────────────── */
function GalaPageContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <main className="flex-grow bg-[#06091a] bg-[radial-gradient(ellipse_at_top,#1a2252_0%,#06091a_60%)] pt-28 pb-20 px-4 md:px-8">

      {/* ── Outer page label ── */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/70">
          <Sparkles className="w-3 h-3" /> Vidya Bharati Foundation of America <Sparkles className="w-3 h-3" />
        </span>
      </div>

      {/* ════════════════════════════════════════════
          SINGLE LARGE FLYER CARD
      ════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-[#D4AF37]/20">

        {/* ── CARD HEADER — deep navy with radial gold glow ── */}
        <div className="relative bg-[#0A1128] px-8 md:px-16 pt-14 pb-12 text-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.12)_0%,transparent_65%)] pointer-events-none" />
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-2xl" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/30 rounded-tr-2xl" />

          {/* Logo */}
          <div className="relative z-10 flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10 p-1">
              <img
                src="/Vidya-Bharati-logo.webp"
                alt="Vidya Bharati Foundation Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Org name */}
          <div className="relative z-10 space-y-0.5 mb-4">
            <p className="text-xs font-black tracking-[0.3em] text-white/80 uppercase">Vidya Bharati</p>
            <p className="text-[10px] font-semibold tracking-[0.4em] text-[#D4AF37] uppercase">Foundation of America</p>
          </div>

          {/* Ornament */}
          <div className="relative z-10 flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <LotusIcon className="w-5 h-5 text-[#D4AF37]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          {/* Main title */}
          <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#D4AF37] uppercase tracking-wide leading-tight">
            Los Angeles Gala
          </h1>
          <p className="relative z-10 text-lg md:text-xl font-serif text-white/70 mt-1 tracking-widest uppercase">
            &amp; Education Support
          </p>

          {/* Subtitle */}
          <p className="relative z-10 mt-5 text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join us for an elegant evening dedicated to sharing our educational mission, celebrating student achievements, and building a stronger sponsor community.
          </p>

          {/* Event meta pills */}
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: Calendar, label: "Sunday, July 26, 2026" },
              { icon: Clock, label: "Starts at 5:30 p.m." },
              { icon: MapPin, label: "Sheraton Cerritos Hotel, Cerritos, CA" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 rounded-full text-xs text-white/90 font-medium">
                <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                {label}
              </div>
            ))}
          </div>

          {/* Bottom border fade */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </div>

        {/* ── CARD BODY — warm white ── */}
        <div className="bg-gradient-to-b from-[#fdfcf7] to-[#f8f6ef] px-6 md:px-12 lg:px-16 py-14">

          {/* ── Success / Canceled Notifications ── */}
          {success === "true" && (
            <div className="mb-10 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col md:flex-row items-center gap-5 shadow-sm">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold font-serif text-[#0A1128]">Gala Registration Successful!</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Thank you! Your ticket purchase was successful. We look forward to welcoming you at the Sheraton Cerritos Hotel on Sunday, July 26, 2026.
                </p>
              </div>
            </div>
          )}

          {canceled === "true" && (
            <div className="mb-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col md:flex-row items-center gap-5 shadow-sm">
              <div className="w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold font-serif text-[#0A1128]">Checkout Canceled</h2>
                <p className="text-slate-500 text-sm mt-1">
                  The payment process was canceled. If you still wish to join us, choose a ticket tier and try again below.
                </p>
              </div>
            </div>
          )}

          {/* ── Section label ── */}
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] border border-[#D4AF37]/30 rounded-full px-5 py-1.5 bg-[#D4AF37]/5">
              Reserve Your Place
            </span>
          </div>

          {/* ── Forms — equal width & height side by side ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* ── Join Our Cause (left) ── */}
            <div className="flex flex-col">
              {/* Shared label above card */}
              <div className="mb-5 text-center">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-1">Support Our Mission</span>
                <h2 className="text-2xl font-serif font-black text-[#0A1128] uppercase tracking-tight">Join Our Cause</h2>
                <p className="text-sm text-gray-500 mt-1">Choose your preferred way to support our mission.</p>
              </div>
              {/* Card shell */}
              <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <DonationForm isGalaMode={true} />
              </div>
            </div>

            {/* ── Purchase Gala Ticket (right) ── */}
            <div className="flex flex-col">
              {/* Shared label above card */}
              <div className="mb-5 text-center">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-[#D4AF37] mb-1">Gala 2026</span>
                <h2 className="text-2xl font-serif font-black text-[#0A1128] uppercase tracking-tight">Purchase Gala Ticket</h2>
                <p className="text-sm text-gray-500 mt-1">Choose your ticket package for the Gala Dinner.</p>
              </div>
              {/* Card shell */}
              <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <GalaTicketForm />
              </div>
            </div>

          </div>

          <GoldDivider />

          {/* ── Event Detail Cards ── */}
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] border border-[#D4AF37]/30 rounded-full px-5 py-1.5 bg-[#D4AF37]/5">
              Event Information
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Calendar, label: "Date", value: "Sunday, July 26, 2026" },
              { icon: Clock, label: "Time", value: "Starts at 5:30 p.m." },
              { icon: MapPin, label: "Venue", value: "Sheraton Cerritos Hotel, Cerritos, CA" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="group bg-[#0A1128] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-lg hover:shadow-[#D4AF37]/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-[#D4AF37] px-5 py-2.5 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#0A1128]" />
                  <span className="text-[#0A1128] font-black text-[10px] uppercase tracking-widest">{label}</span>
                </div>
                <div className="px-5 py-7 flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="text-white font-semibold text-base leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <GoldDivider />

          {/* ── Thank You message ── */}
          <div className="text-center py-4">
            <LotusIcon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
            <p className="text-[#0A1128] font-serif text-lg md:text-xl font-semibold leading-relaxed max-w-xl mx-auto">
              Thank you for supporting education, culture, and value based learning.
            </p>
            <p className="text-slate-400 text-xs font-medium tracking-widest uppercase mt-3">
              Vidya Bharati Foundation of America
            </p>
          </div>

        </div>

        {/* ── CARD FOOTER strip ── */}
        <div className="bg-[#0A1128] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#D4AF37]/20">
          <p className="text-white/40 text-[11px] font-medium tracking-wider uppercase">© 2026 Vidya Bharati Foundation of America</p>
          <div className="flex items-center gap-2 text-[#D4AF37]/60">
            <LotusIcon className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Empowering Generations Through Education</span>
          </div>
        </div>
      </div>

    </main>
  );
}

/* ─── Page shell ───────────────────────────────────────────────────────────── */
export default function LAGalaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06091a]">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-grow flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
          </div>
        }
      >
        <GalaPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
