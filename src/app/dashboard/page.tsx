"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  History, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck,
  TrendingUp,
  Loader2,
  Users,
  GraduationCap,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDashboard() {
  const [donations, setDonations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successOverrideIds, setSuccessOverrideIds] = useState<string[]>([]);

  // Donation Selector States
  const [donationStep, setDonationStep] = useState<"idle" | "amount" | "processing">("idle");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelBanner, setShowCancelBanner] = useState(false);

  async function fetchDashboardData() {
    try {
      const [donationsRes, profileRes] = await Promise.all([
        fetch("/api/donations/user"),
        fetch("/api/user/profile")
      ]);
      
      if (donationsRes.ok) {
        const donationsData = await donationsRes.json();
        setDonations(donationsData);

        // Clean up success override IDs if they have transitioned to 'success' in the database
        setSuccessOverrideIds(prev => {
          if (prev.length === 0) return prev;
          return prev.filter(id => {
            const found = donationsData.find((d: any) => d._id === id);
            return found && found.paymentStatus === "pending";
          });
        });
      }
      
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUser(profileData);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      await fetchDashboardData();
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Handle URL redirect query parameters from Stripe checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const donationId = params.get("donationId");

    if (params.get("success") === "true") {
      setShowSuccessModal(true);
      if (donationId) {
        setSuccessOverrideIds(prev => [...prev, donationId]);
      }
      window.history.replaceState({}, "", "/dashboard");
      
      // Initial refresh for donation table
      setTimeout(() => {
        fetchDashboardData();
      }, 1000);
      
      // Secondary polling in case of minor webhook processing delay
      setTimeout(() => {
        fetchDashboardData();
      }, 3500);
    } else if (params.get("canceled") === "true") {
      setShowCancelBanner(true);
      window.history.replaceState({}, "", "/dashboard");

      if (donationId) {
        // Immediately notify backend about the cancellation
        fetch("/api/user/donations/cancel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donationId })
        }).then(() => {
          fetchDashboardData();
        }).catch(err => {
          console.error("Failed to cancel donation:", err);
        });
      }
    }
  }, []);

  const handleProceedToPayment = async () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount <= 0) {
      setPaymentError("Please select or enter a valid donation amount.");
      return;
    }

    setDonationStep("processing");
    setPaymentError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          firstName: user?.firstName || "Donor",
          lastName: user?.lastName || "Account",
          email: user?.email,
          userId: user?._id || user?.userId,
          isGuest: false,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard?canceled=true`
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment session.");
      }

      if (!data.url) {
        throw new Error("No checkout URL returned from payment server.");
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err: any) {
      setPaymentError(err.message || "Something went wrong. Please try again.");
      setDonationStep("amount");
    }
  };

  const handleRetryPayment = async (failedDonation: any) => {
    setDonationStep("processing");
    setPaymentError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: failedDonation.amount,
          firstName: failedDonation.firstName || user?.firstName || "Donor",
          lastName: failedDonation.lastName || user?.lastName || "Account",
          email: failedDonation.email || user?.email,
          userId: failedDonation.userId || user?._id || user?.userId,
          isGuest: false,
          retryDonationId: failedDonation._id,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard?canceled=true`
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to recreate payment session.");
      }

      if (!data.url) {
        throw new Error("No checkout URL returned from payment server.");
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err: any) {
      // If error occurs, reset step so quick action card behaves correctly
      setDonationStep("idle");
      // Display error banner/alert
      alert(err.message || "Something went wrong during payment retry. Please try again.");
    }
  };

  // Map donations to apply overrides if needed
  const mappedDonations = donations.map((d: any) => {
    if (successOverrideIds.includes(d._id)) {
      return { ...d, paymentStatus: "success" };
    }
    return d;
  });

  const successfulDonations = mappedDonations.filter((d: any) => d.paymentStatus === "success");
  const totalDonated = successfulDonations.length > 0 ? successfulDonations.reduce((sum, d) => sum + d.amount, 0) : 0;
  const livesImpacted = Math.floor(totalDonated / 100);
  const recentDonations = mappedDonations.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 relative">
      {/* Cancellation Banner */}
      <AnimatePresence>
        {showCancelBanner && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 bg-amber-50 border border-amber-200 rounded-[20px] flex items-center justify-between text-amber-800 text-sm font-semibold"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
              <span>Donation was cancelled. You can retry whenever you are ready!</span>
            </div>
            <button 
              onClick={() => setShowCancelBanner(false)}
              className="text-amber-600 hover:text-amber-800 text-xs font-black uppercase tracking-wider bg-white px-3 py-1.5 rounded-lg border border-amber-100 shadow-sm"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Impact Card */}
        <div className="lg:col-span-2 bg-[#0A1128] rounded-[32px] p-10 md:p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[340px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-[80px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <p className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-[10px]">
                Welcome back, {user?.firstName || "Donor"} • Your Global Contribution
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-4">
              ${totalDonated.toLocaleString()}
            </h2>
            <p className="text-white/50 max-w-md text-sm leading-relaxed font-medium">
              Thank you for being a pillar of support. Your contributions are creating sustainable educational pathways for children in need.
            </p>
          </div>

          <div className="relative z-10 pt-12 flex items-center gap-12 border-t border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-2xl font-black font-serif">{successfulDonations.length}</span>
              </div>
              <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Successful Donations</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-400">
                <Users className="w-4 h-4" />
                <span className="text-2xl font-black font-serif">{livesImpacted > 0 ? livesImpacted : "---"}</span>
              </div>
              <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Lives Impacted</span>
            </div>
          </div>
        </div>

        {/* Quick Action Card - Inline Donation Form */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm grow flex flex-col justify-between relative overflow-hidden group min-h-[340px]">
            {donationStep === "idle" ? (
              <>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <GraduationCap className="w-24 h-24 text-[#0A1128]" />
                </div>
                <div>
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-black text-[#0A1128] mb-2 tracking-tight">Support a Child</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-medium">
                    Set up a new contribution to support rural education and skill development programs.
                  </p>
                </div>
                <div className="mt-8">
                  <button 
                    onClick={() => setDonationStep("amount")}
                    className="w-full bg-[#D4AF37] text-[#0A1128] font-black py-4 rounded-2xl shadow-xl shadow-amber-200/50 hover:bg-[#c2a032] hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                     Start Donation <TrendingUp className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : donationStep === "amount" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 flex flex-col justify-between h-full w-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-[#0A1128] tracking-tight">Select Amount</h3>
                    <button 
                      onClick={() => {
                        setDonationStep("idle");
                        setPaymentError(null);
                      }}
                      className="text-gray-400 hover:text-gray-600 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed font-medium mb-6">
                    Choose a predefined tier or enter a custom contribution.
                  </p>

                  {/* Predefined Amounts */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[100, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                          setPaymentError(null);
                        }}
                        className={`py-3.5 rounded-xl border-2 text-center transition-all duration-200 ${
                          selectedAmount === amount && !customAmount
                            ? "border-[#D4AF37] bg-amber-50 text-[#0A1128] font-black shadow-sm"
                            : "border-gray-100 hover:border-[#D4AF37]/30 text-gray-500 font-bold"
                        }`}
                      >
                        <span className="text-sm block">${amount}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                        setPaymentError(null);
                      }}
                      className={`w-full py-3.5 pl-8 pr-4 rounded-xl border-2 text-sm transition-all focus:outline-none focus:border-[#D4AF37] ${
                        customAmount 
                          ? "border-[#D4AF37] bg-amber-50 text-[#0A1128] font-bold" 
                          : "border-gray-100 text-gray-600 font-medium"
                      }`}
                    />
                  </div>

                  {paymentError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs font-semibold mb-4 animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{paymentError}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-[#0A1128] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#1a2b5e] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100"
                  >
                    Proceed to Payment <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDonationStep("idle");
                      setPaymentError(null);
                    }}
                    className="w-full bg-gray-50 text-gray-400 py-3 rounded-2xl font-bold text-xs hover:bg-gray-100 hover:text-gray-600 transition-all text-center"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 my-auto w-full">
                <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Preparing Payment Gateway...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-[#0A1128] font-serif">Recent History</h3>
            <p className="text-gray-400 text-xs mt-1 font-medium">Track your most recent contributions and download receipts.</p>
          </div>
          <Link href="/dashboard/history">
            <button className="px-6 py-3 bg-gray-50 text-[#0A1128] text-xs font-black rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-100 uppercase tracking-widest">
              View All Activity <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Reference</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-10 py-20 text-center">
                      <div className="max-w-xs mx-auto space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                          <History className="w-8 h-8" />
                        </div>
                        <p className="text-gray-400 font-medium text-sm">You haven't made any donations yet.</p>
                        <Link href="/donate" className="inline-block text-[#D4AF37] text-xs font-black uppercase tracking-widest border-b-2 border-[#D4AF37] pb-1 hover:text-[#0A1128] hover:border-[#0A1128] transition-all">
                          Make your first gift
                        </Link>
                      </div>
                   </td>
                </tr>
              ) : (
                recentDonations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-10 py-8 text-sm font-bold text-[#0A1128]">
                      {new Date(donation.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-10 py-8 text-xs text-gray-400 font-mono tracking-tighter">
                      TXN-{donation._id.substring(donation._id.length - 8).toUpperCase()}
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-lg font-black text-[#0A1128]">${donation.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-8">
                      {donation.paymentStatus === "failed" || donation.paymentStatus === "pending" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-black rounded-lg border border-rose-100 uppercase tracking-widest">
                            <AlertCircle className="w-3.5 h-3.5" /> Failed
                          </span>
                          <p className="text-[10px] text-gray-400 font-medium max-w-[200px] leading-tight">
                            {donation.failureReason || "Payment not completed."}
                          </p>
                        </div>
                      ) : donation.paymentStatus === "refunded" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-black rounded-lg border border-orange-100 uppercase tracking-widest">
                          <AlertCircle className="w-3.5 h-3.5" /> Refunded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">
                          <ShieldCheck className="w-3.5 h-3.5" /> Payment Successful
                        </span>
                      )}
                    </td>
                    <td className="px-10 py-8 text-right">
                      {donation.paymentStatus === "failed" || donation.paymentStatus === "pending" ? (
                        <button 
                          onClick={() => handleRetryPayment(donation)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-[#0A1128] font-black text-[10px] rounded-xl hover:bg-[#c2a032] hover:scale-105 transition-all shadow-sm uppercase tracking-wider"
                        >
                           Pay Now <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <Link 
                         href={`/receipt/${donation._id}`} 
                         className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:bg-[#0A1128] hover:text-[#D4AF37] hover:border-[#0A1128] transition-all shadow-sm"
                        >
                           <Download className="w-5 h-5" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impact Story Callout */}
      <div className="p-10 bg-[#D4AF37] rounded-[40px] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl shadow-amber-200/20">
         <div className="absolute top-0 left-0 w-full h-full bg-black/5 opacity-50" />
         <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center shrink-0 border border-white/30">
            <History className="w-10 h-10 text-white" />
         </div>
         <div className="relative z-10 space-y-2 text-[#0A1128]">
            <h4 className="text-2xl font-serif font-black tracking-tight underline decoration-white/30 decoration-thickness-2">The power of your support</h4>
            <p className="text-sm font-medium leading-relaxed max-w-2xl text-[#0A1128]/70">
              Each donation you've made helps bridge the gap in rural education. Currently, 
              your contributions are supporting the digital literacy module for secondary students 
              in the Sanskriti Bodh program.
            </p>
         </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] p-8 md:p-12 max-w-md w-full text-center space-y-6 relative overflow-hidden shadow-2xl border border-gray-100"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]" />
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-serif font-black text-[#0A1128] tracking-tight">Thank You!</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Your donation was processed successfully. 
                  Thank you for supporting rural education and creating lasting impact!
                </p>
              </div>

              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">Tax Deductible</p>
                  <p className="text-xs font-semibold text-emerald-800 leading-tight">A receipt has been sent to your email.</p>
                </div>
                <Heart className="w-5 h-5 text-emerald-500 fill-emerald-500" />
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#0A1128] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#1a2b5e] transition-all shadow-xl shadow-slate-200"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
