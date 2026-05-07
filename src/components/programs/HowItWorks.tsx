"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface HowItWorksProps {
  steps: Step[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black uppercase tracking-widest text-saffron mb-4">Implementation</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue">
            How It Works
          </h3>
        </div>

        <div className="relative">
          {/* Connector Line hidden on mobile */}
          <div className="hidden md:block absolute top-[4rem] left-[10%] right-[10%] h-0.5 bg-slate-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-slate-50 shadow-xl relative z-10 text-deep-blue group transition-colors duration-300 hover:border-saffron hover:text-saffron">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                  {React.createElement(step.icon, { className: "w-8 h-8 transition-colors" })}
                </div>
                
                <h4 className="text-xl font-bold text-deep-blue">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
