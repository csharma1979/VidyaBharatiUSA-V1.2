"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard,
  Heart,
  User as UserIcon,
  ChevronDown
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Donation History", href: "/dashboard/history", icon: History },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const getInitials = () => {
    if (!user) return "D";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Header */}
      <header className="bg-[#0A1128] sticky top-0 z-50 h-24 flex items-center shadow-2xl">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 relative group-hover:scale-110 transition-transform">
              <Image 
                src="/Vidya-Bharati-logo.webp" 
                alt="VidyaBharati Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-serif text-white uppercase tracking-wider hidden sm:inline-block">
              <span className="text-[#D4AF37]">Donor</span> Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${isActive
                      ? "bg-[#D4AF37] text-[#0A1128] shadow-lg shadow-amber-900/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/donate"
              className="ml-4 px-6 py-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0A1128] transition-all"
            >
              Donate Now
            </Link>
          </nav>

          {/* User Profile & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
                className="flex items-center gap-4 p-1.5 rounded-2xl hover:bg-white/10 transition-all border border-transparent"
              >
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-bold text-white leading-none mb-1">
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : "Legacy Donor"}
                  </span>
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Partner</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A1128] text-lg font-black shadow-lg border-2 border-white/10">
                  {getInitials()}
                </div>
                <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 py-2 overflow-hidden animate-in fade-in zoom-in duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-[#0A1128] truncate">{user?.email || "Donor Account"}</p>
                  </div>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-6 py-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0A1128] transition-colors font-medium border-b border-gray-50"
                  >
                    <UserIcon className="w-4 h-4 text-gray-400" /> Account Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-6 py-5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all shadow-inner"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-[#0A1128] border-t border-white/10 p-6 animate-in slide-in-from-top duration-300 shadow-2xl">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${isActive
                        ? "bg-[#D4AF37] text-[#0A1128]"
                        : "text-white/60 hover:bg-white/5"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-[#D4AF37] text-[#0A1128] rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-amber-900/20"
              >
                <Heart className="w-5 h-5 fill-current" /> Donate Now
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main
        className="flex-1 overflow-x-hidden overflow-y-auto"
        onClick={() => {
          isProfileOpen && setIsProfileOpen(false);
          isMobileMenuOpen && setIsMobileMenuOpen(false);
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 py-10 lg:py-16">
          {children}
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-medium">© 2026 VidyaBharati USA. Empowering Rural Education.</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#D4AF37]">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#D4AF37]">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
