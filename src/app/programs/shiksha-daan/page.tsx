"use client";

import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Counter } from "@/components/ui/Counter";
import { ProblemSolution } from "@/components/programs/ProblemSolution";
import { HowItWorks } from "@/components/programs/HowItWorks";
import { ProgramDonation } from "@/components/programs/ProgramDonation";
import { ImageGallery } from "@/components/programs/ImageGallery";
import { Search, Hammer, Users, Activity, Quote } from "lucide-react";
import shikshaDaanBg from "@/assets/shiksha daan bg.png";

const galleryImages = [
  { src: "/images/sikshadaan/acedemic_excellence.webp", alt: "Academic Excellence" },
  { src: "/images/sikshadaan/affordable_education.webp", alt: "Affordable Education" },
  { src: "/images/sikshadaan/centers.webp", alt: "Learning Centers" },
  { src: "/images/sikshadaan/schools.webp", alt: "Schools" },
  { src: "/images/sikshadaan/students.webp", alt: "Students" },
  { src: "/images/sikshadaan/teachers.webp", alt: "Teachers" },
];

export default function ShikshaDaanPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Program Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={shikshaDaanBg}
          alt="Shiksha Daan"
          fill
          className="object-cover brightness-[0.5] object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent opacity-80" />
        
        <div className="container relative z-10 px-6 text-center mt-20">
          <h1 className="text-sm font-black uppercase tracking-widest text-saffron mb-4">Program Details</h1>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-6">
            Shiksha Daan
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
            Empowering Rural India Through Unrestricted Access to Quality Education.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-32">
        <div className="container px-6 max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-deep-blue mb-8">
            Why Shiksha Daan Exists
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Education is the most powerful catalyst for social transformation. Unfortnately, geographical and economic barriers prevent countless children from realizing their potential. The Shiksha Daan initiative is our commitment to breaking down these barriers. By bringing schools directly to remote villages, we ensure that every child—regardless of their background—has the opportunity to learn, grow, and thrive.
          </p>
        </div>
      </section>

      {/* Problem vs Solution */}
      <ProblemSolution 
        problem={{
          title: "The Educational Divide",
          description: "Millions of children in rural India lack access to basic educational infrastructure. Long distances to schools, inadequate facilities, and socio-economic pressures result in critically high dropout rates, particularly for young girls, perpetuating the cycle of poverty."
        }}
        solution={{
          title: "Community-Driven Learning",
          description: "We establish and support local schools right within these remote communities. By providing modern learning tools, rigorously trained educators, and a safe, inclusive environment, we transform these areas into hubs of holistic education."
        }}
      />

      {/* Impact Counters */}
      <section className="py-20 border-y border-slate-100">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <Counter value={250} suffix="K+" label="Students Enrolled" />
            <Counter value={1200} suffix="+" label="Schools Built" />
            <Counter value={15} suffix="+" label="Regions Covered" />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <HowItWorks 
        steps={[
          {
            title: "Assessment",
            description: "Identifying remote villages with the most critical educational deficits.",
            icon: Search,
          },
          {
            title: "Infrastructure",
            description: "Building or upgrading classrooms, sanitation facilities, and libraries.",
            icon: Hammer,
          },
          {
            title: "Training",
            description: "Equipping local teachers with modern pedagogical tools and resources.",
            icon: Users,
          },
          {
            title: "Monitoring",
            description: "Tracking student progress, attendance, and overall community impact.",
            icon: Activity,
          },
        ]}
      />

      {/* Story / Testimonial */}
      <section className="py-24 bg-deep-blue text-white overflow-hidden relative">
        <div className="container px-6 relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <Quote className="w-16 h-16 text-saffron mx-auto opacity-50" />
          <h4 className="text-3xl md:text-4xl font-serif italic font-medium leading-relaxed">
            "Before the school was built in our village, my daughters had to walk 5 kilometers every day. Now, they are the top students in their class and dream of becoming doctors."
          </h4>
          <div>
            <div className="font-bold text-lg mb-1">Ramesh Kumar</div>
            <div className="text-saffron uppercase tracking-widest text-sm font-bold">Parent & Community Leader</div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <ImageGallery 
        title="Glimpses of Impact" 
        description="See how your contributions are transforming lives and building a brighter future across rural India."
        images={galleryImages} 
      />

      {/* Donation Block */}
      <ProgramDonation 
        programName="Shiksha Daan"
        tiers={[
          { amount: 100, impact: "Provides learning materials, books, and basic healthcare for multiple rural students." },
          { amount: 500, impact: "Contributes directly to comprehensive teacher training and essential classroom infrastructure." },
          { amount: 1000, impact: "Sponsors the complete establishment and annual operation of a new rural learning center." },
        ]}
      />

      <Footer />
    </main>
  );
}
