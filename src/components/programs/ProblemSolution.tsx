"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface ProblemSolutionProps {
  problem: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
  };
}

export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Problem Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-red-500 mb-4">The Challenge</h3>
            <h4 className="text-3xl font-serif font-bold text-slate-900 mb-6">{problem.title}</h4>
            <p className="text-slate-600 leading-relaxed text-lg">{problem.description}</p>
          </motion.div>

          {/* Solution Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-deep-blue text-white p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 opacity-10 blur-2xl w-[300px] h-[300px] bg-saffron rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-saffron/20 text-saffron rounded-2xl flex items-center justify-center mb-8 border border-saffron/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-saffron mb-4">Our Solution</h3>
              <h4 className="text-3xl font-serif font-bold mb-6">{solution.title}</h4>
              <p className="text-slate-300 leading-relaxed text-lg">{solution.description}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
