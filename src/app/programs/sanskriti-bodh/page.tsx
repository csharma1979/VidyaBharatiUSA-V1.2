"use client";

import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Counter } from "@/components/ui/Counter";
import { ProblemSolution } from "@/components/programs/ProblemSolution";
import { HowItWorks } from "@/components/programs/HowItWorks";
import { ProgramDonation } from "@/components/programs/ProgramDonation";
import { ImageGallery } from "@/components/programs/ImageGallery";
import { BookOpen, Map, Users, Star, Quote } from "lucide-react";
import sanskritiBodhBg from "@/assets/sanskriti bodh.png";

const galleryImages = [
  { src: "/images/sanskritibodh/1000programs.webp", alt: "1000+ Programs" },
  { src: "/images/sanskritibodh/cultural.webp", alt: "Cultural Events" },
  { src: "/images/sanskritibodh/moral_education.webp", alt: "Moral Education" },
  { src: "/images/sanskritibodh/sanskrit.webp", alt: "Sanskrit Learning" },
  { src: "/images/sanskritibodh/students.webp", alt: "Engaged Students" },
  { src: "/images/sanskritibodh/vedic.webp", alt: "Vedic Traditions" },
];

export default function SanskritiBodhPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Program Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={sanskritiBodhBg}
          alt="Sanskriti Bodh Pariyojana"
          fill
          className="object-cover brightness-[0.5] object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent opacity-80" />
        
        <div className="container relative z-10 px-6 text-center mt-20">
          <h1 className="text-sm font-black uppercase tracking-widest text-saffron mb-4">Program Details</h1>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-6">
            Sanskriti Bodh
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
            Fostering Cultural Values and Holistic Development in Every Child.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-32">
        <div className="container px-6 max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-deep-blue mb-8">
            Why Sanskriti Bodh Matters
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            True education goes beyond textbooks; it encompasses the development of character, morals, and a profound understanding of one's heritage. The Sanskriti Bodh Pariyojana (Cultural Awareness Project) is designed to ensure that standard education is complemented by cultural immersion. By keeping our youth deeply connected to traditional values, arts, and ethics, we help build resilient, mindful, and culturally proud future leaders.
          </p>
        </div>
      </section>

      {/* Problem vs Solution */}
      <ProblemSolution 
        problem={{
          title: "The Cultural Disconnect",
          description: "In the rapid pace of modern education, deep-rooted cultural heritage and ethical foundations are frequently sidelined. This growing disconnect leaves youth feeling unmoored from their roots, leading to a loss of traditional identity and essential communal values."
        }}
        solution={{
          title: "Rooted & Holistic Growth",
          description: "We seamlessly integrate traditional arts, yoga, moral sciences, and cultural festivals into the standard academic curriculum. This holistic approach ensures students build robust character, resilience, and a profound, empowering sense of identity."
        }}
      />

      {/* Impact Counters */}
      <section className="py-20 border-y border-slate-100">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <Counter value={100} suffix="K+" label="Students Engaged" />
            <Counter value={500} suffix="+" label="Cultural Events Hosted" />
            <Counter value={50} suffix="+" label="Curriculum Modules" />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <HowItWorks 
        steps={[
          {
            title: "Curriculum Integration",
            description: "Embedding cultural literature, history, and ethics into daily studies.",
            icon: BookOpen,
          },
          {
            title: "Experiential Learning",
            description: "Implementing practical sessions in yoga, meditation, and traditional arts.",
            icon: Map,
          },
          {
            title: "Community Fests",
            description: "Organizing regional festivals and competitions to foster communal harmony.",
            icon: Users,
          },
          {
            title: "Character Evaluation",
            description: "Assessing student growth through holistic, value-based metrics.",
            icon: Star,
          },
        ]}
      />

      {/* Story / Testimonial */}
      <section className="py-24 bg-deep-blue text-white overflow-hidden relative">
        <div className="container px-6 relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <Quote className="w-16 h-16 text-saffron mx-auto opacity-50" />
          <h4 className="text-3xl md:text-4xl font-serif italic font-medium leading-relaxed">
            "Sanskriti Bodh didn't just teach my son about our history; it gave him grounding. The yoga and values classes have made him more focused, respectful, and proud of who he is."
          </h4>
          <div>
            <div className="font-bold text-lg mb-1">Meera Devi</div>
            <div className="text-saffron uppercase tracking-widest text-sm font-bold">Parent</div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <ImageGallery 
        title="Cultural Preservation in Action" 
        description="Explore moments of students deeply engaging with and celebrating their cultural heritage."
        images={galleryImages} 
      />

      {/* Donation Block */}
      <ProgramDonation 
        programName="Sanskriti Bodh"
        tiers={[
          { amount: 100, impact: "Provides comprehensive cultural literature, art supplies, and instruments for multiple students." },
          { amount: 500, impact: "Funds specialized instructors for yoga, moral sciences, and traditional arts for an entire semester." },
          { amount: 1000, impact: "Sponsors a full year of cultural workshops, community festivals, and holistic development programs for a school." },
        ]}
      />

      <Footer />
    </main>
  );
}
