"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Heart, ShieldCheck, Quote } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
}

interface SponsorshipLayoutProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string | StaticImageData;
  heroImageAlt?: string;
  heroLayout?: 'split' | 'banner';
  purposeTitle: string;
  purposeDescription: string;
  benefits: Benefit[];
  impactTitle: string;
  impactDescription: string;
  impactStats?: { label: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  imageFit?: 'cover' | 'contain';
  imageBg?: string;
  imageScale?: number;
}

export function SponsorshipLayout({
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  heroLayout = 'split',
  purposeTitle,
  purposeDescription,
  benefits,
  impactTitle,
  impactDescription,
  impactStats,
  testimonial,
  imageFit = 'cover',
  imageBg,
  imageScale = 1,
}: SponsorshipLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-deep-blue text-white">
        <div className="absolute top-0 right-0 opacity-10 blur-3xl w-[600px] h-[600px] bg-saffron rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 opacity-10 blur-3xl w-[400px] h-[400px] bg-saffron rounded-full translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container px-6 relative z-10">
          {heroLayout === 'banner' ? (
            <div className="flex flex-col space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 text-center max-w-4xl mx-auto flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 text-saffron rounded-full text-sm font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-current" /> Sponsorship Opportunity
                </div>
                <h1 className="text-5xl lg:text-7xl font-serif font-black leading-tight italic">
                  {heroTitle}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  {heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/donate">
                    <Button size="lg" className="bg-saffron hover:bg-orange-600 text-deep-blue font-black px-8">
                      Sponsor Now
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 text-slate-300 px-4">
                    <ShieldCheck className="w-5 h-5 text-saffron" />
                    <span className="text-sm font-semibold">100% Tax Deductible</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`w-full relative h-[250px] md:h-[400px] rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/10 ${imageBg ? '' : ''}`}
                style={imageBg ? { backgroundColor: imageBg } : {}}
              >
                <Image
                  src={heroImage}
                  alt={heroImageAlt || heroTitle}
                  fill
                  className={`${imageFit === 'cover' ? 'object-cover' : 'object-contain'} object-center transition-transform duration-500`}
                  style={{ transform: `scale(${imageScale})` }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/40 to-transparent pointer-events-none"></div>
              </motion.div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 text-saffron rounded-full text-sm font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 fill-current" /> Sponsorship Opportunity
                </div>
                <h1 className="text-5xl lg:text-7xl font-serif font-black leading-tight italic">
                  {heroTitle}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                  {heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/donate">
                    <Button size="lg" className="bg-saffron hover:bg-orange-600 text-deep-blue font-black px-8">
                      Sponsor Now
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 text-slate-300 px-4">
                    <ShieldCheck className="w-5 h-5 text-saffron" />
                    <span className="text-sm font-semibold">100% Tax Deductible</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className={`relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 ${imageBg ? '' : ''}`}
                style={imageBg ? { backgroundColor: imageBg } : {}}
              >
                <Image
                  src={heroImage}
                  alt={heroImageAlt || heroTitle}
                  fill
                  className={`${imageFit === 'cover' ? 'object-cover' : 'object-contain'} object-center transition-transform duration-500`}
                  style={{ transform: `scale(${imageScale})` }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/40 to-transparent pointer-events-none"></div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Purpose & Details */}
      <section className="section-padding bg-slate-50">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-saffron">{purposeTitle}</h2>
              <p className="text-3xl md:text-4xl font-serif font-bold text-deep-blue leading-tight">
                {purposeDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                  <div className="w-12 h-12 bg-saffron/10 rounded-2xl mb-6 flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-deep-blue mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding overflow-hidden relative">
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-saffron">The Impact</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                {impactTitle}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {impactDescription}
              </p>
              
              {impactStats && (
                <div className="grid grid-cols-2 gap-8 pt-6">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-4xl font-serif font-black text-saffron italic">{stat.value}</div>
                      <div className="text-sm font-bold text-deep-blue uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-8">
                <Link href="/donate">
                  <Button variant="link" size="lg" className="group text-deep-blue font-black px-0 text-xl">
                    Make a Difference Today
                    <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-saffron/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-deep-blue/5 rounded-full blur-3xl"></div>
              
              <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl relative z-10 border border-slate-100">
                {testimonial ? (
                  <div className="space-y-8">
                    <Quote className="w-16 h-16 text-saffron/20" />
                    <p className="text-2xl font-serif italic text-deep-blue leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-1 bg-saffron rounded-full"></div>
                      <div>
                        <div className="font-bold text-deep-blue">{testimonial.author}</div>
                        <div className="text-sm text-slate-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-6">
                    <Heart className="w-20 h-20 text-saffron mx-auto animate-pulse" />
                    <h4 className="text-2xl font-serif font-bold text-deep-blue">Join a community of thousands making a direct impact.</h4>
                    <p className="text-slate-500">Your donation is securely processed and 100% of proceeds go towards the specified program.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container px-6 relative z-10 text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif font-black text-white max-w-4xl mx-auto leading-tight italic">
            Ready to become a <span className="text-saffron">Sponsor</span>?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your support provides more than just infrastructure or books; it provides hope and a path out of poverty for thousands of children.
          </p>
          <Link href="/donate">
            <Button size="lg" className="bg-saffron hover:bg-orange-600 text-deep-blue font-black px-12 h-16 text-lg rounded-2xl">
              Start Your Sponsorship Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
