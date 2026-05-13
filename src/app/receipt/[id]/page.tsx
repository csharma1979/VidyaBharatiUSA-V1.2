import React from "react";
import { connectToDB } from "@/lib/db";
import Donation from "@/models/Donation";
import { notFound } from "next/navigation";
import { Printer, ShieldCheck, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation Receipt | VidyaBharati USA",
  robots: { index: false, follow: false },
};

export default async function ReceiptPage({ params }: { params: { id: string } }) {
  await connectToDB();
  const donation = await Donation.findById(params.id);

  if (!donation || donation.paymentStatus !== "success") {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden print:shadow-none print:rounded-none">
        
        {/* Print Button */}
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center print:hidden">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Official Receipt</span>
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 px-5 py-2 bg-[#0A1128] text-white rounded-xl text-sm font-bold hover:bg-[#1a2b5e] transition-all"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>

        <div className="p-12 md:p-16 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold text-[#0A1128]">VidyaBharati <span className="text-[#D4AF37]">USA</span></h1>
              <div className="text-sm text-gray-500 leading-relaxed font-medium">
                <p>123 Nonprofit Lane, Suite 100</p>
                <p>New York, NY 10001, United States</p>
                <p>Email: contact@vidyabharatiusa.org</p>
                <p className="mt-2 text-[#D4AF37] font-bold">EIN: 88-1234567</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" /> Verified Contribution
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Receipt Date</p>
              <p className="text-lg font-bold text-[#0A1128]">{new Date(donation.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Donor Info */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-medium">Donor Information</p>
              <h3 className="text-xl font-bold text-[#0A1128]">{donation.firstName} {donation.lastName}</h3>
              <p className="text-gray-500 font-medium">{donation.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-medium">Transaction ID</p>
              <p className="text-sm font-mono text-gray-500">{donation._id}</p>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-[#0A1128] rounded-[32px] p-10 text-white text-center space-y-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
             <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest">Total Donation Amount</p>
             <h2 className="text-6xl font-serif font-bold">${donation.amount.toLocaleString()} <span className="text-2xl opacity-40 font-sans">USD</span></h2>
             <p className="text-white/40 text-xs uppercase font-bold tracking-[0.2em]">{donation.paymentMethod} Payment Connected</p>
          </div>

          {/* Mandatory Tax Statement */}
          <div className="space-y-6 text-center">
            <p className="text-lg text-gray-700 leading-relaxed italic px-8">
              "No goods or services were provided in exchange for this contribution. Your donation is tax-deductible to the extent allowed by law."
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-400">
               <Heart className="w-4 h-4 text-[#D4AF37]" />
               <span className="text-xs font-bold uppercase tracking-widest">Thank you for your generosity</span>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
             <div className="flex flex-col">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed By</p>
                <p className="font-serif italic text-lg text-[#0A1128] mt-2">VidyaBharati USA Administration</p>
             </div>
             <p className="text-[10px] text-gray-300 max-w-[200px] text-right font-medium">
                This is a computer-generated receipt and does not require a physical signature.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}
