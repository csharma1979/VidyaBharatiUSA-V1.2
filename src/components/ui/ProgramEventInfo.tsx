"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Plane, Info, ExternalLink, ArrowRight, Heart } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const scheduleData = [
  { dates: "July 6 - 8", location: "Houston", activity: "Community Meetups" },
  { dates: "July 9 - 12", location: "Boston", activity: "Education Summit & Gala (July 12)" },
  { dates: "July 13 - 15", location: "Detroit", activity: "Tech & Innovation Forum" },
  { dates: "July 16 - 17", location: "Philadelphia", activity: "Advocacy Programs" },
  { dates: "July 18 - 20", location: "New Jersey", activity: "Cultural Networking" },
  { dates: "July 21 - 23", location: "Orlando", activity: "Youth Empowerment" },
  { dates: "July 24 - 28", location: "Los Angeles", activity: "Board Meeting (July 25) & Gala (July 26)" },
];

export function ProgramEventInfo() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Listen for custom event to show the detailed popup from other components (like Hero)
  useEffect(() => {
    const handleShowPopup = () => {
      setShowPopup(true);
    };

    window.addEventListener("showUSAProgramDetails", handleShowPopup);
    return () => window.removeEventListener("showUSAProgramDetails", handleShowPopup);
  }, []);

  const closeBanner = () => {
    setShowBanner(false);
    document.documentElement.classList.remove("has-announcement-banner");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showBanner) {
      document.documentElement.classList.add("has-announcement-banner");
    } else {
      document.documentElement.classList.remove("has-announcement-banner");
    }
  }, [showBanner]);

  return (
    <>
      {/* 1. Top Announcement Banner - Now visible across all pages by default */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-[70] bg-gradient-to-r from-deep-blue via-[#0a1b44] to-deep-blue text-white overflow-hidden"
          >
            <div className="container px-6 py-3 flex items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest">
                <span className="bg-saffron text-deep-blue px-2 py-0.5 rounded font-black">Upcoming</span>
                <span className="hidden sm:inline">VidyaBharati USA July 2026 Tour</span>
                <span className="sm:hidden">USA July Tour</span>
              </div>
              <div className="h-4 w-px bg-white/20 hidden md:block"></div>
              <button 
                onClick={() => setShowPopup(true)}
                className="text-xs md:text-sm font-bold text-saffron hover:text-white transition-colors flex items-center gap-1 group">
                View Event Details
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={closeBanner}
                className="absolute right-4 p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer z-[80]"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Detailed Schedule Popup Overlay */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-deep-blue/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="bg-deep-blue p-8 md:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <button 
                  onClick={closePopup}
                  className="absolute top-6 right-6 p-3 hover:bg-white/10 rounded-xl transition-colors z-[110] cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3 text-saffron font-black uppercase tracking-widest text-sm">
                    <Plane className="w-5 h-5" />
                    USA Program Tour 2026
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-black">
                    July Tour <span className="text-saffron italic underline decoration-wavy underline-offset-4">Schedule</span>
                  </h2>
                  <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                    Join RP Khaitan and Puneet Raman as we travel across major USA cities to share our mission and impact.
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="space-y-1 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  {scheduleData.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "grid grid-cols-[100px_1fr_1.5fr] items-center gap-4 p-4 text-sm transition-colors hover:bg-slate-50",
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      )}
                    >
                      <div className="font-black text-deep-blue leading-tight">
                        {item.dates}
                      </div>
                      <div className="flex items-center gap-2 font-bold text-slate-500 uppercase tracking-tighter text-xs">
                        <MapPin className="w-3.5 h-3.5 text-saffron" />
                        {item.location}
                      </div>
                      <div className="text-slate-600 font-medium border-l border-slate-200 pl-4">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-xs text-slate-400 font-medium">
                    * Details subject to minor revisions
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <Link href="/donate" className="flex-1 sm:flex-initial" onClick={closePopup}>
                      <Button className="w-full bg-saffron hover:bg-orange-500 text-deep-blue font-black rounded-xl h-12 px-8 shadow-lg shadow-saffron/20">
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                        Support Tour
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
