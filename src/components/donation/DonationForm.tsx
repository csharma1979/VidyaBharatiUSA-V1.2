"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  CreditCard, 
  User, 
  LogIn, 
  ChevronRight, 
  AlertCircle, 
  Heart, 
  UserPlus, 
  Building2, 
  X,
  Copy,
  CheckCircle2,
  Mail,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const donationOptions = [
  { value: 5000, label: "Sponsor 10 Children" },
  { value: 2500, label: "Sponsor 5 Children" },
  { value: 500, label: "Sponsor 1 Child" },
];

export default function DonationForm() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const amountSectionRef = useRef<HTMLDivElement>(null);
  
  const [step, setStep] = useState(0); // 0: Selection, 1: Amount, 2: Info/Auth, 3: Offline Info
  const [isGuest, setIsGuest] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showHighlight, setShowHighlight] = useState(false);

  // Fetch user profile to pre-fill data and check login status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true);
          setIsGuest(false);
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            mobile: data.mobile || "",
          });
          
          // If we're coming from dashboard or have the hash, skip initial choice
          if (window.location.hash === "#select-amount") {
            setStep(1);
          }
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
      }
    }
    checkAuth();
  }, []);

  // Handle hash-based scrolling and visual cues
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#select-amount") {
        setStep(1);
        
        // Wait for step transition to complete before scrolling
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          setShowHighlight(true);
          setTimeout(() => setShowHighlight(false), 2000);
        }, 100);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleNext = () => {
    if (!finalAmount || finalAmount <= 0) {
      setError("Please select or enter a valid donation amount.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          isGuest,
        }),
      });

      const data = await response.json();

      if (response.status === 503) {
        throw new Error("Online payments are temporarily unavailable. Please use the Bank Transfer / Check option or contact us for assistance.");
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
    <div ref={formRef} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto scroll-mt-32">
      {/* Header Tabs - Only show when past step 0 and not in offline view */}
      {step > 0 && step < 3 && (
        <div className="flex border-b">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-6 text-sm font-bold uppercase tracking-wider transition-all ${
              step === 1 ? "text-[#0A1128] border-b-2 border-[#D4AF37]" : "text-gray-400 bg-gray-50/50"
            }`}
          >
            1. Select Amount
          </button>
          <button
            disabled={!finalAmount}
            onClick={() => setStep(2)}
            className={`flex-1 py-6 text-sm font-bold uppercase tracking-wider transition-all ${
              step === 2 ? "text-[#0A1128] border-b-2 border-[#D4AF37]" : "text-gray-400 bg-gray-50/50"
            }`}
          >
            2. Your Information
          </button>
        </div>
      )}

      <div className="p-8 md:p-12">
        {error && step < 3 && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {step === 0 ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="text-center">
              <h2 className="text-3xl font-serif text-[#0A1128] mb-4 uppercase tracking-tighter font-black">Join Our Cause</h2>
              <p className="text-gray-500">Choose your preferred way to support our mission.</p>
            </div>

            <div className="grid gap-4">
              {/* Guest Option */}
              <button
                onClick={() => {
                  setIsGuest(true);
                  setStep(1);
                }}
                className="flex items-center gap-6 p-6 rounded-[28px] border-2 border-gray-100 hover:border-[#D4AF37] hover:bg-amber-50/50 transition-all group text-left shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 bg-[#0A1128] text-[#D4AF37] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#0A1128] mb-0.5">Donate as Guest</h3>
                  <p className="text-xs text-gray-500">Quick one-time donation without an account.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Registered Option */}
              <button
                onClick={() => {
                  router.push("/login?redirect=/donate#select-amount");
                }}
                className="flex items-center gap-6 p-6 rounded-[28px] border-2 border-gray-100 hover:border-[#D4AF37] hover:bg-amber-50/50 transition-all group text-left shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 bg-amber-50 text-[#D4AF37] rounded-2xl flex items-center justify-center shrink-0 border border-amber-100">
                  <LogIn className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#0A1128] mb-0.5">Registered Donor</h3>
                  <p className="text-xs text-gray-500">Access history, receipts and faster checkout.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Bank/Offline Option */}
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-6 p-6 rounded-[28px] border-2 border-dashed border-gray-200 hover:border-[#D4AF37] hover:bg-[#0A1128]/5 transition-all group text-left"
              >
                <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0A1128] group-hover:text-[#D4AF37] transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-[#0A1128] mb-0.5">Bank Transfer / Check</h3>
                  <p className="text-xs text-gray-500">Support our mission by donating offline.</p>
                </div>
                <div className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors">
                  Offline
                </div>
              </button>
            </div>

            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4">
              Powered by secure international payment infrastructure
            </p>
          </motion.div>
        ) : step === 1 ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="text-center">
              <h2 className="text-3xl font-serif text-[#0A1128] mb-4">Choose an Amount (USD)</h2>
              <p className="text-gray-500">Every contribution helps us reach more students in need.</p>
            </div>

            <div className="relative">
              <AnimatePresence>
                {showHighlight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="absolute -inset-4 bg-[#D4AF37]/10 rounded-[32px] border-2 border-[#D4AF37] z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              <div ref={amountSectionRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {donationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedAmount(option.value);
                      setCustomAmount("");
                    }}
                    className={`py-5 px-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                      selectedAmount === option.value && !customAmount
                        ? "border-[#D4AF37] bg-amber-50 text-[#0A1128] shadow-md"
                        : "border-gray-100 hover:border-[#D4AF37]/30 text-gray-600"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider block opacity-70 mb-1">{option.label}</span>
                    <span className="text-2xl font-bold font-serif">${option.value.toLocaleString()}</span>
                  </button>
                ))}
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xl font-bold font-serif text-gray-400">$</span>
                  <input
                    type="number"
                    placeholder="Any Amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className={`w-full pt-6 pb-2 pl-9 pr-4 rounded-2xl border-2 text-left transition-all font-bold font-serif text-lg focus:outline-none ${
                      customAmount 
                        ? "border-[#D4AF37] bg-amber-50 text-[#0A1128]" 
                        : "border-gray-100 text-gray-600 focus:border-[#D4AF37]/50"
                    }`}
                  />
                  <span className="absolute left-9 top-1.5 text-[9px] font-black uppercase tracking-widest text-gray-400 pointer-events-none">
                    Custom Donation
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {!isLoggedIn && (
                <button
                  onClick={() => setStep(0)}
                  className="flex-shrink-0 w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center font-bold"
                >
                   <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={handleNext}
                className="w-full bg-[#0A1128] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#1a2b5e] transition-all flex items-center justify-center gap-3 group"
              >
                Continue to Details
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            {/* Show choice switch only if guest and not logged in */}
            {isGuest && !isLoggedIn && (
              <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                <div className="flex-1 py-3 rounded-xl text-sm font-bold bg-white text-[#0A1128] shadow-sm flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> Guest Mode
                </div>
                <button
                  onClick={() => router.push("/login?redirect=/donate#select-amount")}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-[#0A1128] transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              </div>
            )}

            {isLoggedIn && (
              <div className="bg-[#0A1128] text-[#D4AF37] px-6 py-4 rounded-2xl flex items-center gap-4 border border-white/10 shadow-lg">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Donor</p>
                  <p className="text-sm font-bold text-white">Signed in as {formData.firstName} {formData.lastName}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleDonate} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  readOnly={isLoggedIn}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37] ${isLoggedIn ? "opacity-70 cursor-not-allowed" : ""}`}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Mobile Number</label>
                <input
                  required
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 focus:outline-none focus:border-[#D4AF37]"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center mb-6 py-4 border-y border-gray-50">
                  <span className="text-gray-500 font-medium">Total Donation</span>
                  <span className="text-3xl font-serif font-bold text-[#0A1128]">${finalAmount}</span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-shrink-0 w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center font-bold"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#D4AF37] text-[#0A1128] py-5 rounded-2xl font-bold text-lg hover:bg-[#c2a032] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Donate Now
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                   Secure SSL Encryption • International Payments Supported
                </p>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
              <button 
                onClick={() => setStep(0)}
                className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0A1128] hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-serif font-black text-[#0A1128] leading-tight">Bank Transfer / Check</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Offline Donation Instructions</p>
              </div>
            </div>

            <div className="space-y-8">
               {/* Check Details */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                     <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                     <h3 className="text-sm font-black text-[#0A1128] uppercase tracking-wider">Mailing Details</h3>
                  </div>
                  
                  <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 space-y-6">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Make Check Payable To</p>
                           <p className="text-lg font-bold text-[#0A1128]">Vidya Bharati Foundation of USA</p>
                        </div>
                        <button 
                          onClick={() => handleCopy("Vidya Bharati Foundation of USA", "name")}
                          className="p-3 bg-white rounded-xl shadow-sm text-gray-400 hover:text-[#D4AF37] transition-all"
                        >
                           {copied === "name" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                     </div>

                     <div className="flex justify-between items-start pt-6 border-t border-gray-200/50">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mailing Address</p>
                           <p className="text-[#0A1128] font-bold font-serif italic text-lg leading-relaxed">
                              Vidya Bharati USA<br />
                              29 Olde Hamlet Dr.<br />
                              Jericho, NY 11237
                           </p>
                        </div>
                        <button 
                          onClick={() => handleCopy("Vidya Bharati USA 29 Olde Hamlet Dr. Jericho, NY 11237", "address")}
                          className="p-3 bg-white rounded-xl shadow-sm text-gray-400 hover:text-[#D4AF37] transition-all"
                        >
                           {copied === "address" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>
               </div>

               {/* Tax Info Section */}
               <div className="bg-amber-50 rounded-[32px] p-8 border border-amber-100 space-y-4">
                  <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
                     <Heart className="w-6 h-6 fill-current" />
                     <span className="text-sm font-black uppercase tracking-widest">Tax Information</span>
                  </div>
                  <p className="text-sm text-amber-900 leading-relaxed font-medium">
                     Vidya Bharati is a 501(c)(3) tax-exempt organization. Your donation is tax-deductible to the extent allowed by law.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200/30">
                     <span className="text-xs font-black text-amber-900/60 uppercase tracking-widest">Official EIN</span>
                     <span className="text-xl font-black text-[#0A1128]">47-4676188</span>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => setStep(0)}
                    className="flex-1 py-5 bg-[#0A1128] text-white rounded-2xl font-bold hover:bg-[#1a2b5e] transition-all shadow-xl shadow-[#0A1128]/10 text-center"
                  >
                     I'll send a check
                  </button>
                  <Link 
                    href="mailto:support@vidyabharatiusa.org"
                    className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-center"
                  >
                     <Mail className="w-5 h-5" /> Need Assistance?
                  </Link>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
