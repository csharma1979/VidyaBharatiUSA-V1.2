"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import GalaTicketForm from "@/components/donation/GalaTicketForm";
import { Calendar, MapPin, CheckCircle, AlertTriangle, ShieldCheck, Sparkles, Loader2, Quote, BookOpen } from "lucide-react";

function GalaPageContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <main className="flex-grow pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {success === "true" && (
          <div className="mb-12 p-8 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-emerald-900 shadow-sm max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left space-y-1">
              <h2 className="text-2xl font-bold font-serif text-[#0A1128]">Gala Registration Successful!</h2>
              <p className="text-slate-600">
                Thank you! Your ticket purchase was successful. We have sent a confirmation email to your inbox. We look forward to welcoming you at the Burlington Marriott on Sunday, July 12, 2026.
              </p>
            </div>
          </div>
        )}

        {canceled === "true" && (
          <div className="mb-12 p-8 bg-amber-50 border border-amber-100 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-amber-900 shadow-sm max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left space-y-1">
              <h2 className="text-2xl font-bold font-serif text-[#0A1128]">Checkout Canceled</h2>
              <p className="text-slate-600">
                The payment process was canceled. If you still wish to join us, you can choose a ticket tier and try again below.
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Event details & Article Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-[#D4AF37] rounded-full text-sm font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Grand Annual Event
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0A1128] leading-tight font-black uppercase tracking-tight">
                Vidya Bharati Foundation USA Gala in Burlington to Spotlight <span className="text-[#D4AF37]">India’s Education Future</span>
              </h1>
              
              <p className="text-base text-gray-500 font-medium leading-relaxed">
                Educators, technologists, entrepreneurs, and philanthropists to gather July 12 for discussions on human capital, AI, and school transformation in India
              </p>
            </div>

            {/* Event Meta Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-4 items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <Calendar className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Date & Time</h4>
                  <p className="font-bold text-[#0A1128] text-sm">Sunday, July 12, 2026</p>
                  <p className="text-xs text-gray-400 font-medium">Starts at 5:30 p.m.</p>
                </div>
              </div>

              <div className="flex gap-4 items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Location</h4>
                  <p className="font-bold text-[#0A1128] text-sm">Burlington Marriott</p>
                  <p className="text-xs text-gray-400 font-medium">Burlington, MA</p>
                </div>
              </div>
            </div>

            {/* Flyer Image Container */}
            <div className="relative w-full max-w-lg mx-auto md:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-white group">
              <img
                src="/images/LosAngeles-Gala-event.jpeg"
                alt="Burlington Gala Event Flyer"
                className="w-full h-auto object-contain block group-hover:scale-[1.01] transition-transform duration-700"
              />
            </div>

            {/* Structured Article / Press Release Content */}
            <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed text-sm">
              <p className="font-semibold text-slate-800">
                <span className="text-[#0A1128] uppercase font-bold text-xs tracking-wider">Burlington, Mass. —</span> The second annual Vidya Bharati Foundation USA Gala will take place on July 12 at the Burlington Marriott in Burlington, MA, bringing together educators, entrepreneurs, technologists, and members of the Indian-American community for an evening centered on the future of education in India.
              </p>

              <p>
                Organizers describe the event as more than a traditional fundraising gala, positioning it instead as a broader conversation about India’s long-term educational transformation and the role institutions will play in shaping the country’s future workforce and human capital.
              </p>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-[#0A1128] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Addressing Deeper Challenges
                </h3>
                <p className="text-xs">
                  The gathering comes at a time when India is facing increasing debate over educational quality, employable skills, teacher effectiveness, and the ability of schools to prepare students for a rapidly changing global economy. While school enrollment and infrastructure have expanded significantly across the country in recent decades, supporters of the initiative argue that deeper challenges remain around learning outcomes, critical thinking, and long-term capability building.
                </p>
              </div>

              <p>
                At the center of the conversation is Vidya Bharati, one of India’s largest educational networks, which operates thousands of schools across rural and underserved communities. Supporters say the organization has focused on combining academic instruction with values, aspiration, and community-rooted education while continuing to expand access in areas often overlooked by larger policy conversations.
              </p>

              <div className="border-l-4 border-[#D4AF37] pl-5 italic text-slate-700 font-serif my-6">
                <Quote className="w-8 h-8 text-[#D4AF37]/25 mb-1 -ml-2" />
                "The gala will also highlight themes explored in 'The Full Plate: India’s Education Revolution and the Race for Human Capital,' a new work by Boston-based author, technologist, and former journalist Satish Jha. The work argues that India’s education challenges cannot be solved through isolated reforms alone, but instead require an integrated ecosystem that includes nutrition, teacher training, technology, localized learning, accountability, and aspiration."
              </div>

              <p>
                Organizers say the July 12 event is intended to encourage members of the Indian diaspora to think beyond traditional charitable giving and consider long-term institutional investment in education and human development.
              </p>

              <p>
                The evening is expected to draw leaders from business, technology, education, and philanthropy who increasingly view education not only as social support, but also as nation-building and economic development.
              </p>

              <p className="font-bold text-[#0A1128] border-t border-slate-100 pt-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Organizers say the evening’s central message is simple but urgent: India’s future will ultimately be shaped classroom by classroom, teacher by teacher, and child by child.
              </p>
            </div>

            <div className="flex gap-4 items-center bg-gray-50/70 p-5 rounded-2xl border border-gray-100/50 text-xs text-gray-500">
              <ShieldCheck className="w-5 h-5 text-[#0A1128] shrink-0" />
              <span>
                VidyaBharati USA is a registered 501(c)(3) tax-exempt organization. Your ticket is tax-deductible to the extent allowed by law. Official EIN: <strong>47-4676188</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Ticket Form */}
          <div className="relative lg:pt-8 lg:sticky lg:top-28">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
            
            <div className="relative z-10">
              <GalaTicketForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LAGalaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
        </div>
      }>
        <GalaPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}
