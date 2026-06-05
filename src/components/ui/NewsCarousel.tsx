"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, X, Clock, MapPin } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  fullText: React.ReactNode;
  details?: {
    time?: string;
    location?: string;
  };
  link?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Vidya Bharati Foundation USA Gala in Burlington to Spotlight India’s Education Future",
    date: "July 12, 2026",
    category: "Special Event",
    image: "/images/vidyabharati-events-1.png",
    summary: "Educators, technologists, entrepreneurs, and philanthropists to gather July 12 for discussions on human capital, AI, and school transformation in India. The gala will spotlight India's educational future and feature Boston-based author Satish Jha's new work.",
    details: {
      time: "5:30 PM",
      location: "Marriott Burlington"
    },
    link: "/LA-Gala",
    fullText: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          Educators, technologists, entrepreneurs, and philanthropists to gather July 12 for discussions on human capital, AI, and school transformation in India. At the center of the conversation is Vidya Bharati, one of India’s largest educational networks, which operates thousands of schools across rural and underserved communities. Supporters say the organization has focused on combining academic instruction with values, aspiration, and community-rooted education while continuing to expand access in areas often overlooked by larger policy conversations.
        </p>
        <p>
          The gala will also highlight themes explored in <strong>“The Full Plate: India’s Education Revolution and the Race for Human Capital,”</strong> a new work by Boston-based author, technologist, and former journalist Satish Jha. The work argues that India’s education challenges cannot be solved through isolated reforms alone, but instead require an integrated ecosystem that includes nutrition, teacher training, technology, localized learning, accountability, and aspiration.
        </p>
        <p>
          Organizers say the July 12 event is intended to encourage members of the Indian diaspora to think beyond traditional charitable giving and consider long-term institutional investment in education and human development.
        </p>
        <p>
          The evening is expected to draw leaders from business, technology, education, and philanthropy who increasingly view education not only as social support, but also as nation-building and economic development.
        </p>
        <p className="font-bold text-deep-blue flex items-center gap-2 mt-4 bg-slate-50 p-4 rounded-xl">
          <Clock className="w-5 h-5 text-saffron" />
          The event will begin at 5:30 p.m. on Sunday, July 12, at the Marriott Burlington.
        </p>
        <p className="italic border-l-4 border-saffron pl-4 text-slate-500">
          Organizers say the evening’s central message is simple but urgent: India’s future will ultimately be shaped classroom by classroom, teacher by teacher, and child by child.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Vidya Bharati students excel in Board Exams",
    date: "May 15, 2025",
    category: "Academic Excellence",
    image: "/images/exam-success.webp",
    summary: "Vidya Bharati students have excelled in the Board Examinations, securing top ranks in the state. Among the top 10, our students have achieved the 1st, 3rd, and 10th positions with near-perfect scores.",
    fullText: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          Vidya Bharati students have excelled in the Board Examinations, securing top ranks in the state. 
          Among the top 10, our students have achieved the 1st, 3rd, and 10th positions. 
          The 1st rank holder scored a perfect 500/500, while the 3rd rank holder secured 498/500.
        </p>
        <p>
          This incredible achievement is a testament to the hard work of our students, the dedication of our teachers, and the robust support system of the Vidya Bharati network. We are committed to fostering academic brilliance alongside value-based learning.
        </p>
      </div>
    )
  }
];

export function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  const activeNews = newsItems[currentIndex];

  return (
    <div className="relative w-full">
      {/* Carousel Card Container */}
      <div className="relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Image Section */}
            {activeNews.link ? (
              <Link href={activeNews.link} className="relative h-[300px] lg:h-[480px] overflow-hidden bg-slate-100 block group/img">
                <Image
                  src={activeNews.image}
                  alt={activeNews.title}
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-saffron text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {activeNews.category}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="relative h-[300px] lg:h-[480px] overflow-hidden bg-slate-100">
                <Image
                  src={activeNews.image}
                  alt={activeNews.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-saffron text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {activeNews.category}
                  </span>
                </div>
              </div>
            )}

            {/* Text Section */}
            <div className="p-8 md:p-14 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                  <Calendar className="w-4 h-4 text-saffron" />
                  <span>{activeNews.date}</span>
                  {activeNews.details?.location && (
                    <>
                      <span className="text-slate-300">|</span>
                      <MapPin className="w-4 h-4 text-saffron" />
                      <span>{activeNews.details.location}</span>
                    </>
                  )}
                </div>

                {activeNews.link ? (
                  <Link href={activeNews.link}>
                    <h4 className="text-2xl md:text-3xl font-serif font-black text-deep-blue leading-tight hover:text-saffron transition-colors cursor-pointer">
                      {activeNews.title}
                    </h4>
                  </Link>
                ) : (
                  <h4 
                    className="text-2xl md:text-3xl font-serif font-black text-deep-blue leading-tight hover:text-saffron transition-colors cursor-pointer" 
                    onClick={() => setSelectedNews(activeNews)}
                  >
                    {activeNews.title}
                  </h4>
                )}

                <p className="text-slate-600 leading-relaxed text-sm md:text-base line-clamp-4">
                  {activeNews.summary}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                {activeNews.link ? (
                  <Link href={activeNews.link}>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-saffron font-black tracking-widest group/link"
                    >
                      READ FULL STORY
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => setSelectedNews(activeNews)}
                    variant="link"
                    className="p-0 h-auto text-saffron font-black tracking-widest group/link"
                  >
                    READ FULL STORY
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 transition-transform" />
                  </Button>
                )}

                {/* Left/Right Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 bg-slate-50 hover:bg-saffron hover:text-white rounded-full text-deep-blue transition-colors border border-slate-100 cursor-pointer"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 bg-slate-50 hover:bg-saffron hover:text-white rounded-full text-deep-blue transition-colors border border-slate-100 cursor-pointer"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {newsItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx ? "w-8 bg-saffron" : "w-2 bg-slate-200 hover:bg-slate-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Modal Backdrop & Overlay */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-deep-blue/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-50"
            >
              {/* Header Image */}
              <div className="relative h-48 md:h-64 w-full bg-slate-100 shrink-0 overflow-hidden">
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  className="object-cover z-10"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-6 right-6 p-2 bg-deep-blue/80 hover:bg-saffron text-white rounded-xl transition-colors backdrop-blur-sm cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="bg-saffron text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {selectedNews.category}
                  </span>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 md:p-10 overflow-y-auto space-y-6">
                <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                  <Calendar className="w-4 h-4 text-saffron" />
                  <span>{selectedNews.date}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-black text-deep-blue leading-tight">
                  {selectedNews.title}
                </h3>

                <div className="border-t border-slate-100 pt-6">
                  {selectedNews.fullText}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
