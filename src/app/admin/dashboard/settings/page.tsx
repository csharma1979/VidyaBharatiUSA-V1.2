"use client";

import React, { useState, useEffect } from "react";
import { Save, ShieldCheck, Loader2, AlertCircle, Info } from "lucide-react";

export default function AdminSettings() {
  const [config, setConfig] = useState({
    stripePublicKey: "",
    stripeSecretKey: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/admin/stripe-config");
        const data = await res.json();
        if (data.stripePublicKey) {
          setConfig({
            stripePublicKey: data.stripePublicKey,
            stripeSecretKey: data.stripeSecretKey,
          });
        }
      } catch (err) {
        console.error("Failed to load config:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConfig();
  }, []);

  const PLACEHOLDER_PATTERNS = ["51ABCxyz", "placeholder", "your_stripe", "sk_test_example", "pk_test_example"];
  const hasPlaceholderKeys = PLACEHOLDER_PATTERNS.some(
    (p) => config.stripePublicKey.includes(p) || config.stripeSecretKey.includes(p)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/stripe-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Failed to update configuration");

      setMessage({ type: "success", text: "Stripe configuration saved successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
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
    <div className="max-w-4xl space-y-10">
      <div>
        <h2 className="text-3xl font-serif font-bold text-[#0A1128] mb-2">Platform Settings</h2>
        <p className="text-gray-500">Configure global parameters and integration keys.</p>
      </div>

      {hasPlaceholderKeys && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-[24px] flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-700 mb-1">⚠️ Stripe Keys Not Configured</p>
            <p className="text-sm text-red-600">
              Your Stripe keys are currently set to placeholder values. <strong>Online donations will not work</strong> until you replace them with your real Stripe API keys from your{" "}
              <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                Stripe Dashboard
              </a>.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center gap-4">
           <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
           </div>
           <div>
              <h3 className="text-xl font-bold text-[#0A1128]">Stripe Integration</h3>
              <p className="text-sm text-gray-400 font-medium">Manage payment processing keys.</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {message && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 font-medium ${
              message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
            }`}>
              {message.type === "success" ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {message.text}
            </div>
          )}

          <div className="grid gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Stripe Public Key
                <span className="text-amber-500">*</span>
              </label>
              <input
                required
                type="text"
                value={config.stripePublicKey}
                onChange={(e) => setConfig({...config, stripePublicKey: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#D4AF37] font-mono text-sm"
                placeholder="pk_test_..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Stripe Secret Key
                <span className="text-amber-500">*</span>
              </label>
              <input
                required
                type="password"
                value={config.stripeSecretKey}
                onChange={(e) => setConfig({...config, stripeSecretKey: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 focus:outline-none focus:border-[#D4AF37] font-mono text-sm"
                placeholder="sk_test_..."
              />
            </div>
          </div>

          <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-50 flex gap-4">
             <Info className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-xs text-blue-700 leading-relaxed">
                Updating these keys will immediately change the payment gateway for all new donations. Please ensure you use <strong>Test Keys</strong> for development and switch to <strong>Live Keys</strong> only for production deployment.
             </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#0A1128] text-white py-4 px-10 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#1a2b5e] transition-all disabled:opacity-50 shadow-xl shadow-blue-100"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
