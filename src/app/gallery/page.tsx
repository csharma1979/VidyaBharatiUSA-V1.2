"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ImageGallery } from "@/components/programs/ImageGallery";
import galleryHero from "@/assets/empowering generation through education.png";

const allImages = [
  // Shiksha Daan
  { src: "/images/sikshadaan/acedemic_excellence.webp", alt: "Academic Excellence", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/affordable_education.webp", alt: "Affordable Education", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/centers.webp", alt: "Learning Centers", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/schools.webp", alt: "Schools", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/students.webp", alt: "Students", category: "Shiksha Daan" },
  { src: "/images/sikshadaan/teachers.webp", alt: "Teachers", category: "Shiksha Daan" },
  
  // Sanskriti Bodh
  { src: "/images/sanskritibodh/1000programs.webp", alt: "1000+ Programs", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/cultural.webp", alt: "Cultural Events", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/moral_education.webp", alt: "Moral Education", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/sanskrit.webp", alt: "Sanskrit Learning", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/students.webp", alt: "Engaged Students", category: "Sanskriti Bodh" },
  { src: "/images/sanskritibodh/vedic.webp", alt: "Vedic Traditions", category: "Sanskriti Bodh" },

  // Events
  { src: "/images/events/webinar.webp", alt: "Webinar", category: "Events" },
  { src: "/images/events/workshop.webp", alt: "Workshop", category: "Events" }
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
