"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ImageGallery } from "@/components/programs/ImageGallery";
import galleryHero from "@/assets/empowering generation through education.png";

const allImages = [
  // Shiksha Daan
  { src: "/images/sikshadaan/acedemic_excellence.webp", alt: "Vidya Bharati students showcasing academic excellence", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/affordable_education.webp", alt: "Affordable quality education for rural children in India", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/centers.webp", alt: "Saraswati Shishu Mandir learning centers in remote villages", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/schools.webp", alt: "Vidya Bharati supported school infrastructure in India", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/students.webp", alt: "Underprivileged students learning in a safe environment", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/teachers.webp", alt: "Dedicated teachers at Vidya Bharati schools", category: "Shiksha Daan" },
  
  // Sanskriti Bodh
  { src: "/images/sanskritibodh/1000programs.webp", alt: "Cultural preservation programs across India", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/cultural.webp", alt: "Traditional cultural performance by students", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/moral_education.webp", alt: "Value-based moral education classes", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/sanskrit.webp", alt: "Students learning Sanskrit language and traditions", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/students.webp", alt: "Holistic development through cultural activities", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/vedic.webp", alt: "Preserving Vedic traditions in modern education", category: "Sanskriti Bodh" },

  // Events
  { src: "/images/events/webinar.webp", alt: "Alumni network webinar on innovation and creativity", category: "Events" },
  { src: "/images/events/workshop.webp", alt: "Master trainer's workshop for educational excellence", category: "Events" }
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <PageHero
        tag="Media"
        centered={true}
        title={
          <>
            Our <span className="text-saffron italic underline decoration-wavy underline-offset-8">Gallery</span>
          </>
        }
        subtitle="Explore moments of impact, learning, and cultural preservation across all our initiatives."
        backgroundImage={galleryHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" }
        ]}
      />

      <ImageGallery 
        images={allImages} 
      />

      <Footer />
    </main>
  );
}
