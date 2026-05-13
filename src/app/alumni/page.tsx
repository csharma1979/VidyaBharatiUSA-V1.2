import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { 
  Users, 
  GraduationCap, 
  School, 
  Globe, 
  Briefcase, 
  Stethoscope, 
  Hammer, 
  Building2, 
  Laptop, 
  Landmark, 
  Gavel, 
  ShieldCheck, 
  BadgeCheck, 
  Calculator,
  TrendingUp,
  Train,
  Sprout,
  Beaker,
  UserCheck,
  ExternalLink,
  ArrowRight,
  Heart
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network | VidyaBharati USA",
  description: "Connect with the VidyaBharati USA global alumni network. Join thousands of professionals supporting education and community growth across India and the USA.",
  keywords: ["alumni network", "Vidya Bharati alumni", "professional network", "nonprofit alumni community", "Purv Chatra Network"],
};

const stats = [
  { label: "Registered Schools", value: "6,670+", icon: School, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Registered Alumni", value: "75,000+", icon: GraduationCap, color: "text-saffron", bg: "bg-saffron/10" },
  { label: "Student Members", value: "80,000+", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const professionals = [
  { label: "Teachers", count: "1,581", icon: GraduationCap },
  { label: "Doctors", count: "1,164", icon: Stethoscope },
  { label: "Engineers", count: "679", icon: Hammer },
  { label: "Govt Employees", count: "227", icon: ShieldCheck },
  { label: "IT Professionals", count: "148", icon: Laptop },
  { label: "Bankers", count: "145", icon: Landmark },
  { label: "Businesspersons", count: "101", icon: Building2 },
  { label: "Defense Professionals", count: "93", icon: BadgeCheck },
  { label: "Lawyers & Judges", count: "84", icon: Gavel },
  { label: "Police Professionals", count: "85", icon: ShieldCheck },
  { label: "Chartered Accountants", count: "79", icon: Calculator },
  { label: "Directors/CEOs/MDs", count: "37", icon: TrendingUp },
  { label: "Railway Professionals", count: "30", icon: Train },
  { label: "Farmers", count: "169", icon: Sprout },
  { label: "Scientists", count: "20", icon: Beaker },
  { label: "Civil Service", count: "10", icon: UserCheck },
];

const globalPresence = [
  { country: "United States", count: 161, code: "US" },
  { country: "Canada", count: 25, code: "CA" },
  { country: "United Kingdom", count: 19, code: "GB" },
  { country: "Australia", count: 18, code: "AU" },
];

const recentAlumni = [
  { name: "Minupala Venkateshwara", role: "Alumni Member" },
  { name: "Prem Vaishnav", role: "Alumni Member" },
  { name: "Falak Verma", role: "Alumni Member" },
  { name: "Abhishek Srivastava", role: "Alumni Member" },
];

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero Section */}
      <PageHero
        tag="Alumni Community"
        centered={true}
        title={
          <>
            Connecting Our <span className="text-saffron italic underline decoration-wavy underline-offset-8">Global</span> Network
          </>
        }
        subtitle="The Vidya Bharti Purv Chatra Network brings together millions of alumni to support education, mentorship, and community growth."
        backgroundImage="/images/alumni-hero.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni" }
        ]}
      />

      {/* 2. Stats Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-8 h-8", stat.color)} />
                </div>
                <div>
                  <div className="text-4xl font-serif font-black text-deep-blue mb-1">{stat.value}</div>
                  <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About the Portal Section */}
      <section className="section-padding overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-saffron">The Network</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                  Vidya Bharti Purv Chatra Network
                </h3>
              </div>
              
              <div className="text-slate-600 text-lg leading-relaxed space-y-6">
                <p>
                  Launched to serve as a digital bridge, this platform connects millions of alumni with their heritage. 
                  It is more than just a directory; it is a thriving ecosystem where batch mates reunite, teachers 
                  provide guidance, and current students find inspiration.
                </p>
                <p>
                  Upon registration, alumni gain access to a wealth of resources including regional news, cultural 
                  activities, and global events. The portal facilitates meaningful mentorship, allowing our 
                  experienced professionals to guide the next generation of leaders.
                </p>
              </div>

              <div className="pt-4">
                <Link href="https://www.vidyabharatialumni.org" target="_blank">
                  <Button size="lg" className="bg-deep-blue hover:bg-[#0a1b44] text-white px-8 rounded-xl h-14 font-bold shadow-xl shadow-blue-900/10">
                    Visit Alumni Portal
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-saffron/5 rounded-[3rem] -rotate-3 scale-105"></div>
              <div className="relative bg-white border border-slate-100 p-8 rounded-[3rem] shadow-2xl space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-deep-blue flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-saffron" />
                    Impactful Participation
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Alumni are encouraged to share photos, initiate discussions, and support schools both 
                    financially and non-financially.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-2">
                    <div className="text-2xl font-black text-deep-blue">28,181</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Student Community</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-2">
                    <div className="text-2xl font-black text-deep-blue">6,949</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Working Professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Professional Distribution Section */}
      <section className="section-padding bg-deep-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-saffron">Professional Distribution</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black">
              A diverse community of <span className="text-saffron italic">excellence</span>.
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {professionals.map((prof, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center space-y-4">
                <prof.icon className="w-6 h-6 mx-auto text-saffron opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <div className="space-y-1">
                  <div className="text-xl font-black">{prof.count}</div>
                  <div className="text-[8px] uppercase font-bold text-white/40 tracking-wider leading-tight">{prof.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Global Presence Section */}
      <section className="section-padding bg-slate-50">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-saffron">Global Presence</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                  Vidya Bharati Alumni <span className="text-saffron italic">Abroad</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Currently, 312 NRI alumni have registered on the portal, representing excellence in over a dozen countries.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {globalPresence.map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-lg font-black text-slate-400">
                      {item.code}
                    </div>
                    <div>
                      <div className="text-xl font-black text-deep-blue">{item.count}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.country}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-slate-400 text-sm italic">
                Represented in Dubai, Germany, Italy, Malaysia, New Zealand, South Korea, South Africa, Singapore, UAE, and Denmark.
              </p>
            </div>

            <div className="bg-deep-blue p-10 md:p-16 rounded-[3rem] text-white space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-saffron rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-deep-blue" />
                </div>
                <h4 className="text-3xl font-serif font-black">VBFA Alumni Mission</h4>
                <p className="text-slate-300 leading-relaxed">
                  VBFA aims to bring alumni with bold ideas together so that we can all contribute to the success 
                  of all alumni with the ability to leverage the strength of our network and thus have global impact.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-6">
                    VBFA is now one of our nation&apos;s pride with world-class leading education and leads the way in 
                    transdisciplinary education and research.
                  </p>
                  <Link href="https://www.vidyabharatialumni.org/user/register.dz" target="_blank">
                    <Button className="bg-saffron hover:bg-orange-500 text-deep-blue font-black rounded-xl h-12 px-8">
                      Register in USA
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recent Alumni Section */}
      <section className="section-padding bg-white">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-saffron">Recent Members</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue">
              New to our <span className="text-saffron italic">family</span>.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentAlumni.map((alumnus, i) => (
              <div key={i} className="group bg-slate-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center border border-transparent hover:border-slate-100">
                <div className="w-20 h-20 bg-deep-blue/5 text-deep-blue rounded-3xl flex items-center justify-center text-2xl font-black mx-auto group-hover:bg-saffron group-hover:text-white transition-all duration-500 mb-6">
                  {alumnus.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-deep-blue group-hover:text-saffron transition-colors">{alumnus.name}</h4>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{alumnus.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-20">
        <div className="container px-6 mx-auto">
          <div className="bg-gradient-to-r from-deep-blue to-[#0a1b44] rounded-[3rem] p-10 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                Ready to reconnect with your <span className="text-saffron">roots</span>?
              </h2>
              <p className="text-slate-300 text-lg">
                Join thousands of alumni across the globe. Share your story, mentor current students, and 
                contribute to a legacy of excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="https://www.vidyabharatialumni.org/user/register.dz" target="_blank">
                  <Button size="lg" className="bg-saffron hover:bg-orange-600 text-deep-blue font-black px-12 h-16 text-lg rounded-xl w-full sm:w-auto">
                    Register Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 h-16 text-lg px-12 rounded-xl w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
