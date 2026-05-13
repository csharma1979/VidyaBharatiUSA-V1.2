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

      {/* 2.5 Message from President */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-12 translate-x-20 -z-0"></div>
        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-sm font-black uppercase tracking-widest text-saffron">A Personal Note</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-black text-deep-blue leading-tight">
                Message from <span className="italic text-saffron">President</span>
              </h3>
              <div className="h-1.5 w-24 bg-saffron rounded-full mx-auto"></div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h4 className="text-3xl font-bold text-deep-blue">Dr. Surendra Garg</h4>
                <p className="text-saffron font-bold uppercase tracking-widest text-sm">President, VidyaBharati USA</p>
              </div>

              <div className="text-slate-600 space-y-6 text-lg leading-relaxed">
                <p>
                  Vidya Bharati was established in 1952 in Gorakhpur, Uttar Pradesh. Today it is one of the largest educational NGOs in the world.
                </p>
                <p>
                  It imparts education to 3 million students via 11,956 formal schools and 6,084 informal schools.
                </p>
                <p>
                  Vidya Bharati operates in remote, border, coastal, and tribal areas where few venture. It provides CBSE/state board curriculum with an emphasis on character building, arts, and health.
                </p>
                
                <div className="bg-slate-50 p-10 rounded-[2.5rem] border-l-8 border-saffron space-y-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-saffron rounded-xl flex items-center justify-center text-white">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <h5 className="text-2xl font-bold text-deep-blue">
                      Educational Philosophy
                    </h5>
                  </div>
                  
                  <div className="space-y-4 text-slate-700">
                    <p>
                      Vidya Bharati provides the platform for all different subjects up to High Schools. The curriculum and the syllabus are approved by the Central Board of Secondary Education (CBSE) and state boards, as per affiliations of different schools.
                    </p>
                    <p>
                      In addition, we provide education to develop good citizens with national character and deep-rooted values (sanskars).
                    </p>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="font-black text-deep-blue flex items-center gap-3">
                        <span className="w-2 h-2 bg-saffron rounded-full"></span>
                        Focus Areas: Academics, Health, Sports, Arts & Music, Ethics, and Character Building.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              { name: "Dr. Yashpal Arya", role: "Board Member", initials: "YA" },
              { name: "Mr. Ashok Danda", role: "Board Member", initials: "AD" },
              { name: "Mr. Satish Jha", role: "Board Member", initials: "SJ" },
              { name: "Mr. Anil Parekh", role: "Board Member", initials: "AP" },
              { name: "Mu Suresh Gupta", role: "Board Member", initials: "SG" },
              { name: "Mr. Ajay Sheth", role: "Board Member", initials: "AS" },
              { name: "Dr. Chandresh Saraiya", role: "Board Member", initials: "CS" },
              { name: "Mr. Rajendra Khaitan", role: "Board Member", initials: "RK" }
            ].map((member, i) => (
              <div key={i} className="group relative bg-white border border-slate-100 p-8 rounded-[2rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 group-hover:bg-saffron/10 transition-colors"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-deep-blue/5 text-deep-blue rounded-2xl flex items-center justify-center text-xl font-black mx-auto group-hover:bg-saffron group-hover:text-white transition-all duration-300">
                    {member.initials}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-deep-blue group-hover:text-saffron transition-colors">{member.name}</h4>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">{member.role}</p>
                  </div>
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
