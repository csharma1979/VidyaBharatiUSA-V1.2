"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import eventsHero from "@/assets/empowering generation through education.png";

const sampleEvents = [
  {
    id: 1,
    title: "SMF Master Trainer's Workshop",
    date: "NOV 02",
    time: "2 Nov 2024 - 27 Dec 2025",
    location: "India",
    type: "Workshop",
    description: "To develop a National System of Education that fosters a younger generation committed to Hindutva and infused with patriotic fervor—one that is physically, mentally, spiritually, and emotionally well-rounded; capable of successfully facing life's challenges; and dedicated to serving our brothers and sisters who dwell in villages,",
    image: "/images/events/workshop.webp" 
  },
  {
    id: 2,
    title: "Webinar: Unlocking Creativity and Innovation",
    date: "OCT 21",
    time: "21 Oct 2024, 07:00 PM",
    location: "Virtual Event",
    type: "Webinar",
    description: "Join the PAN VBFA Alumni Forum for an Insightful Webinar on Creativity and Innovation! Are you curious about the difference between creativity and innovation? Do you want to discover the key ingredients for fostering creativity and the framework for effective innovation? Featured Speaker: Mr. Bharat Iyer Art of Living Corporate Faculty",
    image: "/images/events/webinar.webp"
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <PageHero
        tag="Community"
        centered={true}
        title={
          <>
            Upcoming <span className="text-saffron italic underline decoration-wavy underline-offset-8">Events</span>
          </>
        }
        subtitle="Join our community gatherings, fundraisers, and educational summits. Together, we can make a lasting impact."
        backgroundImage={eventsHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events" }
        ]}
      />

      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {sampleEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl flex flex-col items-center justify-center shadow-lg">
                    <span className="text-saffron font-black text-sm uppercase tracking-wider">{event.date.split(' ')[0]}</span>
                    <span className="text-deep-blue font-black text-2xl leading-none">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-deep-blue/90 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                    {event.type}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-black text-deep-blue mb-4 group-hover:text-saffron transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-500 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-3 text-saffron" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-3 text-saffron" />
                      {event.location}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link href="/donate" className="w-full">
                      <Button className="w-full bg-slate-50 hover:bg-saffron text-deep-blue hover:text-white border border-slate-200 hover:border-saffron transition-all group-hover:shadow-lg rounded-xl h-14 font-bold">
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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
