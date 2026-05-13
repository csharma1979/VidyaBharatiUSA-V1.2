"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: React.ReactNode;
  subtitle: string;
  backgroundImage: string | StaticImageData;
  tag?: string;
  breadcrumbs?: BreadcrumbItem[];
  trustStatement?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  tag,
  breadcrumbs,
  trustStatement,
  centered = false,
  children
}: PageHeroProps) {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden pt-32 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        <div 
          className="absolute inset-0" 
          style={{ 
            background: centered 
              ? "radial-gradient(circle, rgba(10,35,66,0.7) 0%, rgba(10,35,66,0.85) 60%, rgba(10,35,66,0.95) 100%)"
              : "linear-gradient(90deg, rgba(10,35,66,0.9) 0%, rgba(10,35,66,0.7) 50%, rgba(10,35,66,0.3) 100%)" 
          }}
        />
      </div>

      <div className={`container relative z-10 px-6 mx-auto ${centered ? "flex justify-center" : ""}`}>
        <div className={`max-w-4xl space-y-8 ${centered ? "text-center flex flex-col items-center" : "flex flex-col items-start"}`}>
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Breadcrumb"
              className={`flex items-center space-x-2 text-slate-300/80 text-sm font-medium mb-4 ${centered ? "justify-center" : "justify-start"}`}
            >
              <ol className="flex items-center space-x-2 list-none p-0 m-0">
                {breadcrumbs.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.href ? (
                      <Link href={item.href} className="hover:text-saffron transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white" aria-current="page">{item.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-500 mx-2" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          {/* Tag */}
          {tag && (
            <motion.p 
              initial={{ opacity: 0, x: centered ? 0 : -20, y: centered ? -10 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-sm font-black uppercase tracking-[0.3em] text-saffron ${centered ? "text-center" : "text-left"}`}
            >
              {tag}
            </motion.p>
          )}

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-5xl md:text-7xl font-serif font-black text-white leading-[1.1] tracking-tighter ${centered ? "text-center" : "text-left"}`}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-xl md:text-2xl text-slate-200 leading-relaxed font-medium ${centered ? "text-center max-w-3xl" : "text-left max-w-2xl"}`}
          >
            {subtitle}
          </motion.p>

          {/* Trust Statement */}
          {trustStatement && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center space-x-2 py-2 px-4 bg-white/10 backdrop-blur-md rounded-full border border-white/10 w-fit"
            >
              <ShieldCheck className="w-5 h-5 text-saffron" />
              <span className="text-sm font-bold text-white/90 uppercase tracking-wider">{trustStatement}</span>
            </motion.div>
          )}

          {/* Custom Content (e.g. Buttons) */}
          {children && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`pt-4 w-full flex ${centered ? "justify-center" : "justify-start"}`}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
