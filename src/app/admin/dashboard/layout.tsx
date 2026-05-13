"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  FileText,
  CreditCard,
  Globe,
  PenTool,
  User as UserIcon,
} from "lucide-react";
import { AdminFooter } from "@/components/admin/AdminFooter";


interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/admin/profile");
        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        }
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin-login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuGroups = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      ]
    },
    {
      title: "Manage Donation",
      items: [
        { name: "Payments", href: "/admin/dashboard/donations", icon: CreditCard },
        { name: "Users", href: "/admin/dashboard/users", icon: Users },
      ]
    },
    {
      title: "Manage Website",
      items: [
        { name: "Blog management", href: "/admin/dashboard/blog", icon: PenTool },
        { name: "Home page", href: "/admin/dashboard/homepage", icon: Globe },
        { name: "Enquiries", href: "/admin/dashboard/enquiry", icon: FileText },
      ]
    },
    {
      title: "Configuration",
      items: [
        { name: "Platform Settings", href: "/admin/dashboard/settings", icon: Settings },
      ]
    }
  ];

  // Generate Initials
  const getInitials = () => {
    if (!admin) return "A";
    if (admin.firstName && admin.lastName) {
      return `${admin.firstName[0]}${admin.lastName[0]}`.toUpperCase();
    }
    if (admin.firstName) return admin.firstName[0].toUpperCase();
    return admin.email[0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar sidebar bg-[#0A1128] */}
      <aside 
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1128] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex-shrink-0 flex flex-col`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
          <h2 className="text-xl font-serif text-white flex items-center gap-2">
            <span className="text-[#D4AF37]">Admin</span> Panel
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-8">
            {menuGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? "bg-[#D4AF37] text-[#0A1128] font-semibold shadow-md" 
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#0A1128]" : ""}`} />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 lg:hidden">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className="flex-1 flex flex-col min-w-0 overflow-hidden" 
        onClick={() => isProfileOpen && setIsProfileOpen(false)}
      >
        {/* Header */}
        <header className="bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] h-20 flex items-center justify-between px-6 lg:px-10 shrink-0 relative z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }}
              className="lg:hidden text-gray-500 hover:text-[#0A1128]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
              {menuGroups.flatMap(g => g.items).find((item) => item.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
          
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
              className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A1128] font-bold shadow-md">
                {getInitials()}
              </div>
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-4 border-b border-gray-50 mb-1 bg-gray-50/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                  <p className="text-sm font-bold text-[#0A1128] truncate">
                    {admin ? (admin.firstName ? `${admin.firstName} ${admin.lastName}` : admin.email) : "Loading..."}
                  </p>
                </div>
                
                <Link 
                  href="/admin/dashboard/profile" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#0A1128] transition-colors font-medium"
                >
                  <UserIcon className="w-4 h-4 text-gray-400" /> My Profile
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold mt-1"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 lg:p-10 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <AdminFooter />
        </main>
      </div>
    </div>
  );
}
