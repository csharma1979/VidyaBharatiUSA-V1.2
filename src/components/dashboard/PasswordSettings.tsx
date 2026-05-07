"use client";

import React, { useState } from "react";
import { 
  Lock, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";

export default function PasswordSettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const toggleVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    setIsSaving(true);
    setMessage(null);
    
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Password updated successfully!" });
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "A network error occurred. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0A1128]">Account Security</h3>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Manage your access</p>
          </div>
        </div>
      </div>

      <form onSubmit={handlePasswordUpdate} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 col-span-full">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Current Password</label>
            <div className="relative">
              <input 
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-12 text-sm font-bold text-[#0A1128] focus:bg-white focus:border-[#D4AF37]/30 transition-all outline-none"
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
              <button 
                type="button"
                onClick={() => toggleVisibility("current")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D4AF37]"
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">New Password</label>
            <div className="relative">
              <input 
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-12 text-sm font-bold text-[#0A1128] focus:bg-white focus:border-[#D4AF37]/30 transition-all outline-none"
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
              <button 
                type="button"
                onClick={() => toggleVisibility("new")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D4AF37]"
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-12 text-sm font-bold text-[#0A1128] focus:bg-white focus:border-[#D4AF37]/30 transition-all outline-none"
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
              <button 
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D4AF37]"
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
           <div className="flex-1">
             {message && (
                <div className={`flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-left-2 duration-300 ${
                  message.type === "success" ? "text-emerald-600" : "text-red-600"
                }`}>
                  {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {message.text}
                </div>
              )}
           </div>
           
           <button 
            disabled={isSaving}
            type="submit"
            className="w-full md:w-auto px-10 py-5 bg-[#0A1128] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0A1128] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-[#0A1128]/10"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating Security...
              </>
            ) : (
              <>Update Password</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
