"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Edit3, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  Clock,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    isVerified: false,
    updatedAt: "",
  });
  const [originalData, setOriginalData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          const mappedData = {
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            mobile: data.mobile || "",
            isVerified: data.isVerified || false,
            updatedAt: data.updatedAt || "",
          };
          setFormData(mappedData);
          setOriginalData(mappedData);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setMessage(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: formData.mobile,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const updated = { ...formData, updatedAt: new Date().toISOString() };
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setFormData(updated);
        setOriginalData(updated);
        setTimeout(() => {
          setIsEditing(false);
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "A network error occurred. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleUpdate} className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-10 space-y-10 overflow-hidden relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A1128]">Personal Information</h3>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Profile Details</p>
                {formData.updatedAt && (
                   <span className="flex items-center gap-1.5 text-[9px] text-gray-300 font-bold uppercase tracking-wider">
                     <Clock className="w-3 h-3" /> Updated: {new Date(formData.updatedAt).toLocaleDateString()}
                   </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-50 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-50 hover:text-red-500 transition-all flex items-center gap-2"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Cancel
                </button>
                <button 
                  disabled={isSaving}
                  type="submit"
                  className="px-8 py-3.5 bg-[#0A1128] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0A1128] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-gray-200"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-8 py-3.5 bg-gray-50 text-[#0A1128] border border-gray-100 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#0A1128] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* First Name */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">First Name</label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit-fn"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="relative"
                >
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-5 text-sm font-bold text-[#0A1128] focus:bg-white focus:border-[#D4AF37]/30 transition-all outline-none shadow-sm"
                    required
                    autoFocus
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="view-fn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 py-4 bg-gray-50/50 rounded-2xl border border-transparent"
                >
                  <p className="text-sm font-bold text-[#0A1128]">{formData.firstName || "—"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Last Name */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Last Name</label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit-ln"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="relative"
                >
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-5 text-sm font-bold text-[#0A1128] focus:bg-white focus:border-[#D4AF37]/30 transition-all outline-none shadow-sm"
                    required
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="view-ln"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 py-4 bg-gray-50/50 rounded-2xl border border-transparent"
                >
                  <p className="text-sm font-bold text-[#0A1128]">{formData.lastName || "—"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email - Always View Mode with Badge */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
            <div className="px-5 py-4 bg-gray-50/50 rounded-2xl border border-transparent flex justify-between items-center group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-300" />
                <p className="text-sm font-bold text-gray-400">{formData.email || "—"}</p>
              </div>
               <div className="flex items-center gap-2">
                 {formData.isVerified ? (
                   <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider rounded-lg border border-emerald-100">
                      <BadgeCheck className="w-3.5 h-3.5 fill-current opacity-80" /> Verified
                   </span>
                 ) : (
                   <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-wider rounded-lg border border-amber-100">
                      Unverified
                   </span>
                 )}
              </div>
            </div>
          </div>

          {/* Mobile Contact */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Mobile Contact</label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit-mob"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="relative"
                >
                  <input 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-5 text-sm font-bold text-[#0A1128] focus:bg-white focus:border-[#D4AF37]/30 transition-all outline-none shadow-sm"
                    required
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="view-mob"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 py-4 bg-gray-50/50 rounded-2xl border border-transparent flex items-center gap-3"
                >
                  <Phone className="w-4 h-4 text-gray-300" />
                  <p className="text-sm font-bold text-[#0A1128]">{formData.mobile || "—"}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message Banner */}
        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pt-4"
            >
              <div className={`p-5 rounded-2xl flex items-center gap-4 text-xs font-bold ${
                message.type === "success" 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                : "bg-red-50 text-red-700 border border-red-100"
              }`}>
                {message.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                {message.text}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
