"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import empoweringImage from '@/assets/empowering generation through education.png';
import joinMovementImage from '@/assets/Join a global movement for change.png';
import ruralClassroomsImage from '@/assets/bringing hope to rural classrooms.png';

const slides = [
  {
    id: 1,
    image: empoweringImage,
    title: "Empowering Generations Through Education",
    subtitle: "Fostering holistic growth and enduring values for underprivileged children across India.",
    ctaText: "Donate to Educate",
    ctaIcon: Heart,
  },
  {
    id: 2,
    image: ruralClassroomsImage,
    title: "Bringing Hope to Rural Classrooms",
    subtitle: "Transforming underserved communities by building safe, engaging, and modern learning environments.",
    ctaText: "Sponsor a School",
    ctaIcon: Heart,
  },
  {
    id: 3,
    image: joinMovementImage,
    title: "Join a Global Movement for Change",
    subtitle: "Your partnership helps bridge the educational divide and shape the leaders of tomorrow.",
    ctaText: "Get Involved Today",
    ctaIcon: Heart,
  },
];

export function HeroSlider() {
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [direction, setDirection] = React.useState(0);

  const nextSlide = React.useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = React.useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -10000) {
      nextSlide();
    } else if (swipe > 10000) {
      prevSlide();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section 
      className="group relative h-screen w-full overflow-hidden flex bg-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, ease: "linear" }}
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover"
              priority={current === 0}
              loading={current === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={85}
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </motion.div>

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 container mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-4xl space-y-8 flex flex-col items-center pt-20"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.2] drop-shadow-xl max-w-3xl mx-auto">
                {slides[current].title.split(" ").map((word, index) => (
                  <span 
                    key={index} 
                    className={index === slides[current].title.split(" ").length - 1 ? "text-saffron" : ""}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                {slides[current].subtitle}
              </p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pt-6"
              >
                <Link href="/donate">
                  <Button variant="primary" size="lg" className="group/btn text-lg border border-saffron/50">
                    {React.createElement(slides[current].ctaIcon, {
                      className: "w-5 h-5 mr-3 group-hover/btn:fill-current transition-colors"
                    })}
                    {slides[current].ctaText}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 hidden md:flex items-center pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-saffron transition-colors border border-white/10 hover:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 hidden md:flex items-center pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={nextSlide}
          className="p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-saffron transition-colors border border-white/10 hover:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron ${
              current === index 
                ? "bg-saffron w-10 h-3" 
                : "bg-white/50 hover:bg-white/90 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
