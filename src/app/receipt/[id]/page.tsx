import React from "react";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { notFound } from "next/navigation";
import { ShieldCheck, Heart, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";
import PrintButton from "@/components/donation/PrintButton";
import { reconcileDonation } from "@/lib/reconcile";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await connectToDB();
  const donation = await Donation.findById(id);
  const isGala = donation?.donationId?.startsWith("GALA-");
  return {
    title: isGala ? "Gala Ticket Receipt | VidyaBharati USA" : "Donation Receipt | VidyaBharati USA",
    robots: { index: false, follow: false },
  };
}

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDB();
  let donation = await Donation.findById(id);

  if (donation && donation.paymentStatus === "pending") {
    donation = await reconcileDonation(donation);
  }

  if (!donation || (donation.paymentStatus !== "success" && donation.paymentStatus !== "refunded")) {
    return notFound();
  }

  const isRefunded = donation.paymentStatus === "refunded";
  const isGala = donation.donationId?.startsWith("GALA-");
  const taxYear = new Date(donation.createdAt).getFullYear();
  const receiptNumber = isGala
    ? `TKT-${taxYear}-${donation._id.toString().substring(donation._id.toString().length - 6).toUpperCase()}`
    : `REC-${taxYear}-${donation._id.toString().substring(donation._id.toString().length - 6).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:py-20 print:bg-white print:py-0 print:px-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .print-hidden {
            display: none !important;
          }
          .print-shadow-none {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            background: white !important;
          }
          .print-text-dark {
            color: #000000 !important;
          }
          .print-bg-light {
            background-color: #f8fafc !important;
            color: #020617 !important;
          }
        }
      `}} />

      <div className="max-w-3xl mx-auto bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden print-shadow-none relative">
        {/* Refunded Banner */}
        {isRefunded && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-4 flex items-center justify-center gap-2 text-rose-700 font-bold uppercase tracking-wider text-xs md:text-sm print:bg-rose-50">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Void - This transaction has been refunded</span>
          </div>
        )}

        {/* Action Header / Print Bar */}
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center print-hidden">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {isRefunded ? "Refunded Transaction" : isGala ? "Gala Ticket Receipt" : "Official Donation Receipt"}
          </span>
          <PrintButton />
        </div>

        {/* Main Receipt Content */}
        <div className="p-8 md:p-16 space-y-10 md:space-y-12 relative overflow-hidden">
          {/* Refund Watermark */}
          {isRefunded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05] transform -rotate-45 font-black text-[60px] md:text-[110px] text-rose-600 tracking-widest uppercase">
              Refunded
            </div>
          )}

          {/* Header section (Branding & Contact Info) */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/Vidya-Bharati-logo.webp" 
                  alt="VidyaBharati USA Logo" 
                  className="h-14 w-auto object-contain"
                />
                <div>
                  <h1 className="text-2xl font-serif font-black text-[#0A1128] leading-none">
                    VidyaBharati <span className="text-[#D4AF37]">USA</span>
                  </h1>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-1">
                    Supporting Rural Education
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500 leading-relaxed font-medium">
                <p>VidyaBharati USA</p>
                <p>123 Nonprofit Lane, Suite 100</p>
                <p>New York, NY 10001, United States</p>
                <p>Email: contact@vidyabharatiusa.org</p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              {isRefunded ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs font-black uppercase tracking-widest">
                  <AlertTriangle className="w-3.5 h-3.5" /> Refunded / Void
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" /> {isGala ? "Verified Ticket" : "Verified Contribution"}
                </div>
              )}
              <div className="mt-4 md:text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Transaction Date</p>
                <p className="text-sm font-bold text-[#0A1128] mt-1">
                  {new Date(donation.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Receipt Number</p>
                <p className="text-xs font-bold text-gray-500 font-mono mt-1">{receiptNumber}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-50">
                {isGala ? "Attendee Information" : "Donor Information"}
              </h3>
              <div className="space-y-1">
                <p className="text-base font-black text-[#0A1128]">{donation.firstName} {donation.lastName}</p>
                <p className="text-gray-500 font-medium text-xs">{donation.email}</p>
                {donation.mobile && <p className="text-gray-500 font-medium text-xs">Phone: {donation.mobile}</p>}
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1.5">
                  {isGala ? "Event Attendee" : (donation.isGuest ? "Guest Contributor" : "Registered Donor")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-50">
                Transaction Details
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Transaction ID:</span>
                  <span className="font-mono text-gray-600 break-all">{donation._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Payment Type:</span>
                  <span className="font-bold text-[#0A1128] uppercase">{donation.paymentMethod || "Visa / Card"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Time:</span>
                  <span className="font-bold text-[#0A1128]">
                    {new Date(donation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">{isGala ? "Ticket Tier:" : "Campaign / Cause:"}</span>
                  <span className="font-bold text-[#0A1128]">{isGala ? (donation.ticketType || "Gala Ticket") : "General Fund Support"}</span>
                </div>
                {isGala && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Event Name:</span>
                      <span className="font-bold text-[#0A1128]">Burlington Gala Event</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-semibold">Event Date:</span>
                      <span className="font-bold text-[#0A1128]">Sunday, July 12, 2026</span>
                    </div>
                    {donation.seatNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-semibold">Seat Assignment:</span>
                        <span className="font-bold text-emerald-600">{donation.seatNumber} (Table {donation.tableNumber || "N/A"})</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-[#0A1128] rounded-[24px] p-8 md:p-10 text-white text-center space-y-3 relative overflow-hidden print-bg-light">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
             <p className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em]">
               {isGala ? "Total Amount Paid" : "Total Donation Amount"}
             </p>
             <h2 className="text-5xl md:text-6xl font-serif font-black print-text-dark">
               ${donation.amount.toLocaleString()} <span className="text-xl md:text-2xl opacity-40 font-sans font-medium">USD</span>
             </h2>
             <p className="text-white/40 text-[9px] uppercase font-black tracking-[0.25em] print-text-dark">
               {isGala ? "Official Gala Ticket Purchase" : "Official Tax Exempt Contribution"}
             </p>
          </div>

          {/* Tax Compliance Info */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center space-y-4 print-shadow-none">
            <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
              {isGala 
                ? "This receipt confirms your registration for the Burlington Gala Event. The tax-deductible portion of this ticket is limited to the excess of the payment over the value of goods or services provided."
                : '"No goods or services were provided in exchange for this contribution. Your donation to VidyaBharati USA is tax-deductible to the extent allowed by law."'
              }
            </p>
            <div className="h-px bg-slate-200/50 w-24 mx-auto" />
            <div className="text-[10px] text-gray-500 font-bold space-y-1">
              <p>VidyaBharati USA is a registered 501(c)(3) tax-exempt public charitable organization.</p>
              <p className="text-slate-800 font-black">
                Employer Identification Number (EIN): <span className="font-mono">88-1234567</span> • Filing Year: {taxYear}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Signature & Watermark Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
             <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Authorized By</p>
                <p className="font-serif italic text-lg text-[#0A1128] mt-1.5 font-bold">
                  VidyaBharati USA Administration
                </p>
             </div>
             <p className="text-[9px] text-gray-300 max-w-[240px] text-center sm:text-right font-bold uppercase tracking-wider leading-relaxed">
                This is an official transaction receipt generated securely. No physical signature is required.
             </p>
          </div>

          {/* Back link for screen */}
          <div className="text-center pt-4 print-hidden">
            <a 
              href={isGala ? "/LA-Gala" : "/dashboard"}
              className="text-[#D4AF37] hover:text-[#0A1128] text-xs font-black uppercase tracking-widest transition-colors"
            >
              {isGala ? "Return to Gala Event Page" : "Return to Donor Dashboard"}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
