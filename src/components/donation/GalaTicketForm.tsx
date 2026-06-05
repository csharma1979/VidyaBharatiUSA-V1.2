"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  CreditCard, 
  User, 
  ChevronRight, 
  AlertCircle, 
  Ticket,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

const ticketOptions = [
  { 
    id: "gold", 
    name: "Gala Gold Ticket", 
    price: 500, 
    description: "Premium seating, VIP reception, and special recognition in the program.",
    color: "border-yellow-400 bg-amber-50/30 text-amber-900" 
  },
  { 
    id: "silver", 
    name: "Gala Silver Ticket", 
    price: 200, 
    description: "Preferred seating and entry to the networking reception.",
    color: "border-slate-300 bg-slate-50/50 text-slate-800" 
  },
  { 
    id: "bronze", 
    name: "Gala Bronze Ticket", 
    price: 100, 
    description: "General admission seating for the Gala event.",
    color: "border-amber-600/30 bg-orange-50/10 text-orange-900" 
  }
];

export default function GalaTicketForm() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [step, setStep] = useState(1); // 1: Ticket Selection, 2: Guest Details
  const [selectedTicket, setSelectedTicket] = useState(ticketOptions[1]); // Default to Silver Ticket
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check user profile to pre-fill data if logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            mobile: data.mobile || "",
          });
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
      }
    }
    checkAuth();
  }, []);

  const handleNext = () => {
    if (!selectedTicket) {
      setError("Please select a ticket tier to continue.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const origin = window.location.origin;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedTicket.price,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          isGuest: true,
          isGala: true,
          ticketType: selectedTicket.name,
          successUrl: `${origin}/LA-Gala?success=true&session_id={CHECKOUT_SESSION_ID}&ticket=${selectedTicket.id}`,
          cancelUrl: `${origin}/LA-Gala?canceled=true`,
        }),
      });

      const data = await response.json();

      if (response.status === 503) {
        throw new Error("Online payments are temporarily unavailable. Please contact us for assistance.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      if (!data.url) {
        throw new Error("No payment URL returned. Please try again.");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div ref={formRef} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-xl mx-auto scroll-mt-32">
      {/* Header Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setStep(1)}
          className={`flex-1 py-6 text-xs font-black uppercase tracking-widest transition-all ${
            step === 1 ? "text-[#0A1128] border-b-2 border-[#D4AF37]" : "text-gray-400 bg-gray-50/50"
          }`}
        >
          1. Select Ticket
        </button>
        <button
          disabled={!selectedTicket}
          onClick={() => setStep(2)}
          className={`flex-1 py-6 text-xs font-black uppercase tracking-widest transition-all ${
            step === 2 ? "text-[#0A1128] border-b-2 border-[#D4AF37]" : "text-gray-400 bg-gray-50/50"
          }`}
        >
          2. Register details
        </button>
      </div>

      <div className="p-8 md:p-10">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-black text-[#0A1128] uppercase tracking-tight">Select Ticket Tier</h2>
                <p className="text-sm text-gray-500">Choose your ticket package for the Gala Dinner.</p>
              </div>

              <div className="space-y-4">
                {ticketOptions.map((option) => {
                  const isSelected = selectedTicket.id === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedTicket(option)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                        isSelected 
                          ? "border-[#D4AF37] bg-amber-50/40 shadow-md" 
                          : "border-gray-100 hover:border-[#D4AF37]/30 bg-white"
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                          isSelected ? "bg-[#D4AF37]/15 text-[#0A1128] border-[#D4AF37]" : "bg-slate-50 text-slate-400 border-gray-100"
                        }`}>
                          <Ticket className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#0A1128]">{option.name}</h3>
                          <p className="text-xs text-gray-500 leading-normal mt-0.5 max-w-[280px]">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-gray-400 block uppercase tracking-wider">USD</span>
                        <span className="text-xl font-bold font-serif text-[#0A1128]">${option.price}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-[#0A1128] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#1a2b5e] transition-all flex items-center justify-center gap-3 group"
              >
                Continue to Registration
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-black text-[#0A1128] uppercase tracking-tight">Attendee Information</h2>
                <p className="text-sm text-gray-500">Provide your information for the guest list.</p>
              </div>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">First Name</label>
                    <input
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37] text-sm"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Name</label>
                    <input
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37] text-sm"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37] text-sm"
                    placeholder="jane.smith@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37] text-sm"
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-6 py-4 border-y border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{selectedTicket.name}</span>
                      <span className="text-slate-500 text-[11px] mt-0.5">Burlington Gala Admission</span>
                    </div>
                    <span className="text-3xl font-serif font-bold text-[#0A1128]">${selectedTicket.price}</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-shrink-0 w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center font-bold"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#D4AF37] text-[#0A1128] py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#c2a032] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Purchase Ticket
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
