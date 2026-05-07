"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Programs", 
    href: "/programs",
    dropdown: [
      { name: "Shiksha Daan", href: "/programs/shiksha-daan" },
      { name: "Sanskriti Bodh", href: "/programs/sanskriti-bodh" }
    ]
  },
  { 
    name: "Get Involved", 
    href: "#", 
    dropdown: [
      { name: "Support a Child's Education", href: "/sponsor/child-education" },
      { name: "Support Vidya Bharati", href: "/sponsor/vidya-bharati" },
      { name: "Sponsor Classroom Construction", href: "/sponsor/classroom-construction" },
      { name: "Sponsor Toilet Block Construction", href: "/sponsor/toilet-block" },
    ]
  },
  { name: "Impact", href: "/impact" },
  { name: "Contact", href: "/contact" },
];

function DesktopNavItem({ link, isScrolled, pathname }: { link: any; isScrolled: boolean; pathname: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const isActive = pathname === link.href || (link.dropdown && link.dropdown.some((sub: any) => pathname === sub.href));

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const isGetInvolved = link.name === "Get Involved";

  const baseClasses = cn(
    "text-sm font-bold uppercase tracking-wider transition-all duration-300 relative py-2 group",
    isScrolled ? "text-slate-600 hover:text-saffron" : "text-white/90 hover:text-white",
    isActive && "text-saffron",
    isGetInvolved && !isActive && (isScrolled ? "text-deep-blue/80" : "text-white")
  );

  const activeIndicator = (
    <motion.div 
      layoutId="nav-underline"
      className={cn(
        "absolute bottom-0 left-0 right-0 h-0.5 bg-saffron",
        !isActive && "scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
      )}
    />
  );

  if (!link.dropdown) {
    return (
      <Link href={link.href} className={baseClasses}>
        {link.name}
        {isActive && activeIndicator}
      </Link>
    );
  }

  return (
    <div 
      className="relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button className={cn(baseClasses, "flex items-center gap-1 cursor-default")}>
        {link.name}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-180")} />
        {isActive && activeIndicator}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden py-3 z-50 flex flex-col"
          >
            {/* Invisible bridge to prevent mouse leave gap */}
            <div className="absolute -top-4 w-full h-4 bg-transparent" />
            
            <div className="px-5 py-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{link.name} Explore</span>
            </div>

            {link.dropdown.map((sub: any) => {
              const isSubActive = pathname === sub.href;
              return (
                <Link 
                  key={sub.name} 
                  href={sub.href} 
                  className={cn(
                    "px-6 py-3 text-sm transition-all duration-200 font-bold flex items-center justify-between group/item",
                    isSubActive ? "bg-slate-50 text-saffron" : "text-slate-600 hover:bg-slate-50 hover:text-saffron"
                  )}
                >
                  {sub.name}
                  <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ link, setIsOpen, pathname }: { link: any; setIsOpen: any; pathname: string }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isActive = pathname === link.href || (link.dropdown && link.dropdown.some((sub: any) => pathname === sub.href));

  if (!link.dropdown) {
    return (
      <Link
        href={link.href}
        className={cn(
          "text-xl font-black uppercase tracking-widest py-3 border-b border-slate-50 transition-colors",
          isActive ? "text-saffron" : "text-slate-800"
        )}
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className={cn(
          "flex items-center justify-between text-xl font-black uppercase tracking-widest py-3 border-b border-slate-50 transition-colors",
          isActive ? "text-saffron" : "text-slate-800"
        )}
      >
        {link.name}
        <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isExpanded && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col pl-4 bg-slate-50/50 space-y-4 overflow-hidden"
          >
            {link.dropdown.map((sub: any) => (
              <Link
                key={sub.name}
                href={sub.href}
                className={cn(
                  "py-3 text-sm font-bold transition-colors",
                  pathname === sub.href ? "text-saffron" : "text-slate-600"
                )}
                onClick={() => setIsOpen(false)}
              >
                {sub.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20); // Lower threshold for mobile
  });

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    async function checkAuth() {
      try {
        const res = await fetch("/api/user/profile");
        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
  );
  
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  const shadow = useTransform(
    scrollY,
    [0, 100],
    ["none", "0 10px 30px -10px rgba(0,0,0,0.1)"]
  );

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter, boxShadow: shadow }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center pt-[safe-area-inset-top]",
        isScrolled ? "h-20" : "h-[88px]"
      )}
    >
      {/* Background layer for mobile contrast at the top */}
      <div className={cn(
        "absolute inset-0 z-[-1] transition-opacity duration-300 lg:hidden",
        !isScrolled ? "bg-black/20 backdrop-blur-[2px]" : "opacity-0"
      )} />
      <div className="w-full max-w-[1536px] mx-auto px-4 md:px-8 lg:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 transform group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/Vidya-Bharati-logo.webp"
              alt="VidyaBharati Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-serif font-black tracking-tight transition-colors duration-300",
              isScrolled ? "text-deep-blue" : "text-white"
            )}>
              VidyaBharati
            </span>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-saffron">USA</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <DesktopNavItem key={link.name} link={link} isScrolled={isScrolled} pathname={pathname} />
            ))}
          </nav>
          
          <div className="flex items-center gap-4 border-l border-slate-200/20 pl-8">
            <Link href="https://www.vidyabharatialumni.org/user/login.dz" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="secondary" 
                size="md" 
                className={cn(
                  "border font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-none bg-transparent h-11 px-8 rounded-xl",
                  isScrolled 
                    ? "border-deep-blue text-deep-blue hover:bg-slate-50" 
                    : "border-white/30 text-white hover:bg-white/10 hover:border-white"
                )}
              >
                Alumni Login
              </Button>
            </Link>
            
            <Link href="/donate">
              <Button 
                variant="primary" 
                size="md" 
                className={cn(
                  "h-11 px-8 rounded-xl font-black uppercase tracking-[0.1em] text-[10px] transition-all duration-300 shadow-xl",
                  "bg-red-600 text-white hover:bg-red-700 hover:shadow-red-500/20"
                )}
              >
                <Heart className="w-3.5 h-3.5 mr-2 fill-current" />
                Donate Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-3 rounded-xl transition-all duration-300",
            isScrolled ? "bg-slate-100 text-slate-900 shadow-sm" : "bg-white/20 text-white backdrop-blur-md"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal to avoid clipping */}
      {mounted && createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              />
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-[101] p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="text-sm font-black uppercase tracking-widest text-slate-400">Navigation</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <X className="w-6 h-6 text-slate-900" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2 flex-grow overflow-y-auto pr-4">
                  {navLinks.map((link) => (
                    <MobileNavItem key={link.name} link={link} setIsOpen={setIsOpen} pathname={pathname} />
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
                  <Link href="https://www.vidyabharatialumni.org/home.dz" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="lg" className="w-full h-14 font-black uppercase tracking-widest text-xs border-slate-200">
                      Alumni Login
                    </Button>
                  </Link>
                  <Link href="/donate">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full h-14 font-black uppercase tracking-widest text-xs bg-red-600 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.nav>
  );
}
