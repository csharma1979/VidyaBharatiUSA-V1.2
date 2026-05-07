import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Heart, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import contactHero from "@/assets/Join a global movement for change.png";

export const metadata = {
  title: "Contact Us | VidyaBharati USA",
  description: "Get in touch with VidyaBharati USA for support, enquiries, or partnerships to support value-based education in India.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navbar />

      {/* Hero Section */}
      <PageHero
        tag="Connect With Us"
        centered={true}
        title={
          <>
            Let's build the <span className="text-saffron italic underline decoration-wavy underline-offset-8">future</span> together.
          </>
        }
        subtitle="Whether you have a question about our programs, partnership opportunities, or want to support our mission, our team is here to help."
        backgroundImage={contactHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" }
        ]}
        trustStatement="501(c)(3) Tax-Exempt Nonprofit Organization"
      />

      {/* Main Content Sections */}
      <section className="py-20">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Column: Form */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-black text-deep-blue">Send an Enquiry</h3>
                <p className="text-slate-500">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Right Column: Details & Credentials */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-2xl font-serif font-black text-deep-blue">Contact Information</h3>
                <ContactDetails />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container px-6 mx-auto">
          <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center max-w-5xl mx-auto shadow-sm">
             <div className="absolute top-0 left-0 w-64 h-64 bg-deep-blue/5 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4" />
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-saffron/10 rounded-full blur-2xl translate-x-1/4 translate-y-1/4" />

             <div className="relative z-10 space-y-10">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm text-saffron mb-4">
                   <Globe className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-5">
                   <h2 className="text-4xl md:text-5xl font-serif font-black text-deep-blue">Support Our Mission</h2>
                   <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                      Your contribution provides more than just books; it builds the character 
                      and values of India's future leaders.
                   </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                   <Link href="/donate">
                      <Button variant="primary" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/20 group">
                         <Heart className="w-5 h-5 mr-3 fill-current" />
                         Donate Now
                      </Button>
                   </Link>
                   <Link href="/sponsor">
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-slate-300 text-slate-700 hover:bg-white group">
                         Sponsor a Child
                         <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
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
