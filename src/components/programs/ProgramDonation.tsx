"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import Link from "next/link";

interface DonationTier {
  amount: number;
  impact: string;
}

interface ProgramDonationProps {
  programName: string;
  tiers: DonationTier[];
}

export function ProgramDonation({ programName, tiers }: ProgramDonationProps) {
  return (
    <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero.webp')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="container px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-black uppercase tracking-widest text-saffron mb-4">Make an Impact</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-black mb-6">
            Support {programName}
          </h3>
          <p className="text-slate-300 text-lg">
            Your generous contribution directly funds the resources, infrastructure, and personnel required to sustain and expand this vital initiative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.amount}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center flex flex-col items-center hover:bg-white/15 transition-colors"
            >
              <div className="text-4xl font-black text-saffron mb-4">${tier.amount}</div>
              <p className="text-slate-200 mb-8">{tier.impact}</p>
              <div className="w-full mt-auto">
                <Link href="/donate">
                  <Button variant="primary" className="w-full">
                    Donate ${tier.amount}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 mb-6 uppercase tracking-wider text-sm font-bold">Or enter a custom amount</p>
          <Link href="/donate">
            <Button variant="secondary" size="lg" className="border border-white/20 hover:border-saffron">
              <Heart className="w-5 h-5 mr-3" />
              Custom Donation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
