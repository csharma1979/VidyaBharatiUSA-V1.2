import React from "react";
import Image from "next/image";
import aboutHeader from '@/assets/about us page header.png';
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { PageHero } from "@/components/ui/PageHero";
import { 
  Heart, 
  Target, 
  Lightbulb, 
  Globe, 
  Users, 
  Award, 
  BookOpen, 
  ArrowRight,
  Zap
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | VidyaBharati USA",
  description: "Learn about VidyaBharati USA, one of the largest education movements in India providing value-based, holistic education to underprivileged children.",
  keywords: ["education charity", "sponsor child education", "donate for education", "India education NGO"],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero Section */}
      <PageHero
        tag="Who We Are"
        centered={true}
        title={
          <>
            About <span className="text-saffron italic underline decoration-wavy underline-offset-8">Vidya Bharati</span> USA
          </>
        }
        subtitle="Empowering education, preserving values, and supporting communities through impactful initiatives across generations."
        backgroundImage={aboutHeader}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" }
        ]}
        trustStatement="501(c)(3) Tax-Exempt Nonprofit Organization"
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/donate">
            <Button size="lg" className="bg-saffron hover:bg-orange-500 text-deep-blue font-black px-10 h-16 text-lg rounded-2xl shadow-xl shadow-saffron/20 group">
              Donate Now
              <Heart className="w-5 h-5 ml-3 fill-current group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Link href="/sponsor/child-education">
            <Button size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20 border h-16 text-lg px-10 rounded-2xl">
              Sponsor a Child
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* 2. Our Story Section */}
      <section className="section-padding bg-slate-50 relative">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Our Journey</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                From a single school in 1952 to a global movement.
              </h3>
            </div>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed md:leading-[1.8]">
              <p>
                The Vidya Bharati movement began in <strong className="text-deep-blue">Gorakhpur, Uttar Pradesh, in 1952</strong>. 
                Founded on the belief that education should be holistic and rooted in Indian values, 
                it started as a small initiative to provide quality learning to children often 
                overlooked by the mainstream system.
              </p>
              <p>
                Over the decades, this vision flourished into one of the largest educational 
                networks in the world. Today, Vidya Bharati manages over <strong className="text-deep-blue">15,000 schools</strong> 
                across India, serving as a beacon of hope for millions of families in rural 
                and underserved communities.
              </p>
              <p>
                In the USA, our chapter was established to connect the global Indian diaspora 
                with this mission. We act as a vital bridge, turning collective generosity 
                into tangible impact—from building state-of-the-art classrooms to providing 
                essential scholarships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="section-padding overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-deep-blue p-12 md:p-20 rounded-[3rem] text-white space-y-8 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <Target className="w-16 h-16 text-saffron" />
              <h3 className="text-3xl font-serif font-bold">Our Mission</h3>
              <p className="text-xl text-slate-300 leading-relaxed italic">
                &quot;To develop a National System of Education which would help to build a 
                generation of young men and women that is committed to Hindutva and 
                infused with patriotic fervor; fully developed physically, vitally, 
                mentally and spiritually.&quot;
              </p>
            </div>
            
            <div className="bg-slate-100 p-12 md:p-20 rounded-[3rem] text-deep-blue space-y-8 relative group overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-deep-blue/5 rounded-full -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <Lightbulb className="w-16 h-16 text-saffron" />
              <h3 className="text-3xl font-serif font-bold">Our Vision</h3>
              <p className="text-xl text-slate-600 leading-relaxed italic">
                &quot;To empower future generations with value-based holistic education that 
                blends ancient Indian wisdom with modern scientific knowledge, creating 
                leaders who serve society with compassion and excellence.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact Stats */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={500} suffix="K+" label="Students Reached" />
            <Counter value={15} suffix="K+" label="Schools Supported" />
            <Counter value={22} suffix="+" label="States Active" />
            <Counter value={100} suffix="K+" label="Dedicated Teachers" />
          </div>
        </div>
      </section>

      {/* 5. What Makes Us Different */}
      <section className="section-padding bg-slate-50">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Why We Stand Apart</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue italic">
              A model designed for real change.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Value-Based Foundation",
                description: "We go beyond academics to teach character, cultural awareness, and social responsibility."
              },
              {
                icon: Zap,
                title: "Low-Cost, High-Impact",
                description: "Every dollar donated is optimized to directly benefit student learning and infrastructure."
              },
              {
                icon: BookOpen,
                title: "Traditional & Modern",
                description: "Our curriculum blends traditional values with robotics, science, and computer literacy."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-saffron group-hover:text-white transition-colors">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-deep-blue mb-4">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Work in USA */}
      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-sm font-black uppercase tracking-widest text-saffron">VidyaBharati in the USA</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                Engaging the global community for local impact.
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Users, title: "Community Engagement", text: "Hosting seminars and events to spread awareness about rural education needs." },
                { icon: Globe, title: "Fundraising for India", text: "Directly financing projects like sanitization blocks and digital classrooms." },
                { icon: Award, title: "Advocacy Programs", text: "Working with international partners to promote value-based education standards." }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-saffron/20 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center text-left"
                >
                  <div className="shrink-0 w-16 h-16 rounded-full bg-slate-50 group-hover:bg-saffron/10 flex items-center justify-center text-deep-blue group-hover:text-saffron transition-colors duration-300">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-2xl font-bold text-deep-blue group-hover:text-saffron transition-colors duration-300">{item.title}</h4>
                    <p className="text-slate-600 text-lg">{item.text}</p>
                  </div>
                  <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 w-12 h-12 rounded-full bg-saffron/10 items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-saffron" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="relative py-32 bg-deep-blue overflow-hidden text-center justify-center flex flex-col items-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/slide_3.webp"
            alt="Impact"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-deep-blue/80"></div>
        
        <div className="container relative z-10 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight italic">
              Be a Part of the <span className="text-saffron">Transformation</span>.
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto italic">
              &quot;Every child we educate today is a leader we prepare for tomorrow. 
              Your partnership is the catalyst for this change.&quot;
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/donate">
                <Button size="lg" className="bg-saffron hover:bg-orange-600 text-deep-blue font-black px-12 h-20 text-xl rounded-2xl shadow-xl shadow-saffron/20">
                  Donate Now
                </Button>
              </Link>
              <Link href="/sponsor">
                <Button size="lg" variant="secondary" className="bg-white text-deep-blue hover:bg-slate-50 h-20 text-xl px-12 rounded-2xl font-black">
                  Start Sponsorship
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Leadership Section */}
      <section className="section-padding bg-slate-50">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-saffron">Our Leadership</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue">
              Guided by vision and integrity.
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Dr. Surendra Garg", role: "President, VidyaBharati USA" },
              { name: "Smt. Neena Gupta", role: "Board Member" },
              { name: "Shri Rajesh Verma", role: "Director of Operations" },
              { name: "Dr. Anjali Rao", role: "Education Advisor" }
            ].map((member, i) => (
              <div key={i} className="space-y-4 text-center">
                <div className="aspect-[4/5] rounded-[2rem] bg-slate-200 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-300/50">
                    <Users className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-deep-blue">{member.name}</h4>
                  <p className="text-saffron font-bold text-xs uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
