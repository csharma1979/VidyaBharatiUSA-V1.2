"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import Link from "next/link";

export function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    const hasSeenPopup = sessionStorage.getItem("hasSeenLAPopup_2026");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // 1-second delay for smooth entry transition
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenLAPopup_2026", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-deep-blue/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden z-50 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 bg-deep-blue/80 hover:bg-saffron text-white rounded-full transition-all hover:scale-105 cursor-pointer z-50 shadow-md backdrop-blur-sm"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Flyer Image Section */}
            <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden">
              <Image
                src="/images/LosAngeles-Gala-event.jpeg"
                alt="Burlington Gala Event Flyer"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>

            {/* Action Bar */}
            <div className="bg-deep-blue px-6 py-4 flex gap-4 justify-between items-center text-white shrink-0">
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wide">Burlington Gala Event</span>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">July 12, 2026</span>
              </div>
              <Link href="/LA-Gala" onClick={handleClose}>
                <Button className="bg-saffron hover:bg-orange-500 text-white font-black rounded-xl h-10 px-5 text-xs uppercase tracking-widest shadow-md">
                  Register Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
