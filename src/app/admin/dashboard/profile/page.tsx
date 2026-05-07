"use client";

import React, { useEffect, useState } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Edit3,
  Loader2,
  AlertCircle,
  Key,
  Save,
  X
} from "lucide-react";
import { Toast, ToastType } from "@/components/ui/Toast";

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        mobile: data.mobile || "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data if canceling
      setFormData({
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        mobile: profile?.mobile || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to update profile");
      
      setProfile(data.admin);
      setIsEditing(false);
      showToast("Profile updated successfully", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-600">
        <AlertCircle className="w-6 h-6 shrink-0" />
        <p className="font-medium">{error || "Could not load profile data."}</p>
      </div>
    );
  }

  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}` || profile.email[0].toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Profile Header Card */}
      <div className="bg-[#0A1128] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-32 h-32 rounded-full bg-[#D4AF37] flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white/10">
            {initials}
          </div>
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-serif font-black tracking-tight">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                {profile.role}
              </span>
            </div>
            <p className="text-white/60 font-medium">Organization Administrator</p>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Essential Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#0A1128] flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-[#D4AF37]" /> Personal Information
              </h3>
              <button 
                onClick={handleEditToggle}
                className={`p-2 rounded-xl transition-all group ${isEditing ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-[#D4AF37]'}`}
              >
                {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5 group-hover:scale-110" />}
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">First Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-[#0A1128] focus:outline-none focus:border-[#D4AF37]"
                  />
                ) : (
                  <p className="text-[#0A1128] font-bold">{profile.firstName || "Not set"}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-[#0A1128] focus:outline-none focus:border-[#D4AF37]"
                  />
                ) : (
                  <p className="text-[#0A1128] font-bold">{profile.lastName || "Not set"}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                <div className="flex items-center gap-2 text-[#0A1128] font-bold opacity-60">
                  <Mail className="w-4 h-4 text-gray-300" />
                  {profile.email}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-[#0A1128] focus:outline-none focus:border-[#D4AF37]"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-[#0A1128] font-bold">
                    <Phone className="w-4 h-4 text-gray-300" />
                    {profile.mobile || "Not set"}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="px-8 pb-8 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-8 py-3 bg-[#0A1128] text-white rounded-2xl text-sm font-bold hover:bg-[#1a2b5e] transition-all disabled:opacity-50 shadow-lg shadow-[#0A1128]/20"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2rem] p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#0A1128]">Account Password</h4>
                <p className="text-xs text-gray-500">Last updated 3 months ago</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-[#0A1128] text-white rounded-xl text-xs font-bold hover:bg-[#1a2b5e] transition-all">
              Change Password
            </button>
          </div>
        </div>

        {/* Right Column: Status & Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
            <h3 className="text-lg font-bold text-[#0A1128]">System Access</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A1128]">Admin Role</p>
                  <p className="text-[10px] text-gray-400">Full system access enabled</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0A1128]">Member Since</p>
                  <p className="text-[10px] text-gray-400">{new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-400">Account Status</span>
                <span className="text-emerald-600">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}

