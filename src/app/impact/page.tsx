"use client";

import Image from "next/image";
import impactImage from '@/assets/impact.png';
import beyondImage from "@/assets/beyond the numbers section top image..png";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";
import { 
  Heart, 
  Target, 
  MapPin, 
  TrendingUp, 
  Award, 
  Users, 
  Quote, 
  ShieldCheck,
  Globe,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";

const impactSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  "name": "VidyaBharati USA Impact Report",
  "author": {
    "@type": "NGO",
    "name": "VidyaBharati USA"
  },
  "description": "Evidence of change and educational impact achieved by VidyaBharati USA across rural India.",
  "publisher": {
    "@type": "Organization",
    "name": "VidyaBharati USA"
  }
};

export default function ImpactPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <JsonLd data={impactSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden py-[80px] md:py-[120px]">
        <Image
          src={impactImage}
          alt="Impact at VidyaBharati"
          fill
          className="object-cover object-center block rounded-none w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/50 to-transparent"></div>
        
        <div className="container max-w-[1200px] mx-auto relative z-10 px-6 md:px-[80px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[700px] mx-auto text-center space-y-[20px] pt-24 md:pt-0 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 bg-saffron/20 border border-saffron/30 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-white">Transparency & Results</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight">
              Evidence of <br />
              <span className="text-saffron italic">Change.</span>
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed max-w-xl">
              At VidyaBharati USA, we don&apos;t just measure schools built; we measure dreams fulfilled. 
              See how your support is reshaping the educational landscape across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Impact Metrics */}
      <section className="relative -mt-[60px] z-20 mb-[100px]">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-[80px]">
          <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-[24px] grid grid-cols-1 md:grid-cols-4 gap-[20px] md:gap-[40px] p-[30px] md:py-[40px] md:px-[60px]">
            <Counter value={500} suffix="K+" label="Students Empowered" />
            <Counter value={15} suffix="K+" label="Village Schools" />
            <Counter value={22} suffix="" label="States Reached" />
            <Counter value={100} suffix="K+" label="Teachers Trained" />
          </div>
        </div>
      </section>

      {/* Impact Narrative Section (Beyond the Numbers) */}
      <section className="py-[100px] bg-white overflow-hidden mb-[100px]">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
            {/* Left Column: Image + Stacked Cards */}
            <div className="flex flex-col gap-[20px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <div className="relative w-full h-[220px] md:h-[320px] rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02]">
                  <Image 
                    src={beyondImage} 
                    alt="Beyond the Numbers" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-saffron p-8 rounded-[2rem] text-white shadow-lg"
                >
                  <TrendingUp className="w-10 h-10 mb-4" />
                  <h4 className="text-xl font-bold mb-2">35% Increase</h4>
                  <p className="text-sm opacity-90 leading-relaxed">Average improvement in literacy rates across our supported rural school districts.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-deep-blue p-8 rounded-[2rem] text-white shadow-lg"
                >
                  <Award className="w-10 h-10 mb-4 text-saffron" />
                  <h4 className="text-xl font-bold mb-2">National Recognition</h4>
                  <p className="text-sm opacity-90 leading-relaxed">Awarded for innovation in value-based primary education in underserved communities.</p>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Heading + Content Points */}
            <div className="space-y-[30px]">
              <div className="space-y-[20px]">
                <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Beyond the Numbers</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight mb-[10px]">
                  Holistic impact that creates lasting legacy.
                </h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Physical Excellence",
                    description: "Incorporating Yoga and traditional sports into the daily curriculum to build healthy, resilient bodies.",
                    icon: Target
                  },
                  {
                    title: "Cultural Identity",
                    description: "Instilling a sense of pride and understanding of India's rich cultural heritage and moral values.",
                    icon: ShieldCheck
                  },
                  {
                    title: "Digital Literacy",
                    description: "Equipping rural schools with modern computing facilities to bridge the digital divide.",
                    icon: Globe
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0 text-saffron">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-deep-blue mb-1">{item.title}</h4>
                      <p className="text-slate-600 leading-[1.8]">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPSC Toppers Section */}
      <section className="py-[100px] bg-slate-50/50 mb-[100px]">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-[80px]">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Academic Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
              Our UPSC Toppers
            </h3>
            <p className="text-lg text-slate-600 leading-[1.8] max-w-[700px] mx-auto">
              We take immense pride in our students who have achieved remarkable ranks in the UPSC examination, proving that quality education can transform any life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Vibhor Saraswat",
                rank: "19",
                school: "SSVMIC, Shikarpur, Bulandshahr",
                region: "Meerut",
                image: "/images/default-avatar-man.png"
              },
              {
                name: "Saket Singh",
                rank: "65",
                school: "Jwala Devi Saraswati Vidya Mandir, Civil Lines, Prayagraj",
                region: "Kashi",
                image: "/images/default-avatar-man.png"
              },
              {
                name: "Ashutosh Mishra",
                rank: "198",
                school: "Saraswati Shishu Mandir, Chattarpur",
                region: "Mahakoshal",
                image: "/images/default-avatar-man.png"
              }
            ].map((topper, idx) => (
              <motion.div
                key={topper.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={topper.image} 
                    alt={topper.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6">
                    <div className="bg-saffron text-white h-16 w-16 rounded-full flex flex-col items-center justify-center shadow-xl border-2 border-white/50 backdrop-blur-sm">
                      <span className="text-[10px] font-black uppercase tracking-tight leading-none">Rank</span>
                      <span className="text-2xl font-black">{topper.rank}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-saffron">{topper.region}</div>
                    <h4 className="text-2xl font-black text-deep-blue">{topper.name}</h4>
                  </div>
                  <div className="flex gap-3">
                    <Award className="w-5 h-5 text-saffron shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {topper.school}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PDF Download Button */}
          <div className="mt-16 text-center">
            <a 
              href="/upsc-selection-2024.pdf" 
              download 
              className="inline-block"
            >
              <Button 
                variant="outline" 
                className="border-saffron text-saffron hover:bg-saffron hover:text-white rounded-full px-10 py-7 h-auto text-lg font-black gap-3 transition-all duration-300 shadow-lg hover:shadow-saffron/20"
              >
                <FileText className="w-6 h-6" />
                Download Full UPSC 2024 Selection List
              </Button>
            </a>
          </div>
        </div>
      </section>


      {/* Transparency Section */}
      <section className="mb-[100px]">
        <div className="container max-w-[1200px] mx-auto px-6 md:px-[80px] text-center space-y-[60px]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Financial Stewardship</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
              Where your donation <span className="text-saffron italic">lives.</span>
            </h3>
            <p className="text-slate-600 text-lg leading-[1.8] max-w-[700px] mx-auto mb-[20px]">
              We pride ourselves on overhead efficiency. Over 90% of every dollar donated goes directly into 
              school operations and student support programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Direct Student Support", value: "65%", icon: Heart, color: "bg-red-50 text-red-600" },
              { label: "Infrastructure Growth", value: "25%", icon: MapPin, color: "bg-blue-50 text-blue-600" },
              { label: "Operations & Training", value: "10%", icon: Users, color: "bg-green-50 text-green-600" }
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all"
              >
                <div className={cn("w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl font-black text-deep-blue mb-2">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[100px] relative overflow-hidden bg-deep-blue">
        <div className="absolute top-0 right-0 opacity-10 blur-3xl w-[500px] h-[500px] bg-saffron rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container max-w-[1200px] mx-auto px-6 md:px-[80px] relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight">
              Be a part of the <span className="text-saffron italic">momentum.</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your partnership allows us to expand into more remote villages and provide 
              even higher quality education to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Button variant="secondary" size="lg" className="bg-white text-deep-blue hover:bg-slate-100">Partner With Us</Button>
              <Link href="/donate">
                <Button variant="primary" size="lg" className="bg-saffron hover:bg-orange-600">Give Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
