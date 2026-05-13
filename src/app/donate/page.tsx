import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import DonationForm from "@/components/donation/DonationForm";
import { Heart, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Donate Now | Support Education in India | VidyaBharati USA",
  description: "Make a tax-deductible donation to VidyaBharati USA. Your support helps provide quality education, school infrastructure, and holistic development to children in rural India.",
  keywords: ["donate for education", "nonprofit donation", "tax-deductible charity", "support children education", "Indian education NGO", "501(c)(3) donation"],
};

const donationSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  "name": "Donate to VidyaBharati USA",
  "description": "Support quality education for underprivileged children in India.",
  "recipient": {
    "@type": "NGO",
    "name": "VidyaBharati USA",
    "url": "https://vidyabharatiusa.org"
  }
};

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <JsonLd data={donationSchema} />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-[#D4AF37] rounded-full text-sm font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4" /> Support Our Mission
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif text-[#0A1128] leading-tight">
                Empower a Child's <span className="text-[#D4AF37]">Future</span> Today
              </h1>
              
              <p className="text-xl text-gray-500 leading-relaxed max-w-xl">
                Your contribution directly supports quality education and holistic development for underprivileged children in India. Join us in creating a lasting impact.
              </p>

              <div className="space-y-6 pt-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#0A1128]/5 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#0A1128]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1128]">100% Tax Deductible (USA)</h3>
                    <p className="text-gray-500">VidyaBharati USA is a registered 501(c)(3) nonprofit organization.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#0A1128]/5 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-[#0A1128]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1128]">International Support</h3>
                    <p className="text-gray-500">We accept major credit cards and regional payment methods globally.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-600">
                "Education is the most powerful weapon which you can use to change the world. Your support makes this possible."
              </div>
            </div>

            {/* Right: Donation Form */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
              
              <DonationForm />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
