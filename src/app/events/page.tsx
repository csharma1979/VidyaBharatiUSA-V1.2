"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import eventsHero from "@/assets/empowering generation through education.png";
import { JsonLd } from "@/components/seo/JsonLd";

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  image?: string;
  startDate: string;
}

const sampleEvents: EventItem[] = [
  {
    id: 1,
    title: "Community Meetups",
    date: "JUL 06-08",
    time: "July 6 - 8, 2026",
    location: "Houston",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 as RP Khaitan and Puneet Raman travel to Houston for interactive community meetups to share our educational mission, progress, and upcoming plans.",
    startDate: "2026-07-06"
  },
  {
    id: 2,
    title: "Education Summit & Gala",
    date: "JUL 09-12",
    time: "July 9 - 12, 2026 (Gala on July 12)",
    location: "Boston",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 in Boston. Highlighted by our signature Education Summit & Gala on July 12, this event celebrates student achievements and strengthens our sponsor network.",
    startDate: "2026-07-09"
  },
  {
    id: 3,
    title: "Tech & Innovation Forum",
    date: "JUL 13-15",
    time: "July 13 - 15, 2026",
    location: "Detroit",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 in Detroit. The Tech & Innovation Forum explores next-generation educational technologies and modern teaching paradigms for our schools.",
    startDate: "2026-07-13"
  },
  {
    id: 4,
    title: "Advocacy Programs",
    date: "JUL 16-17",
    time: "July 16 - 17, 2026",
    location: "Philadelphia",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 in Philadelphia to engage in advocacy programs, workshops, and panel discussions on national education systems.",
    startDate: "2026-07-16"
  },
  {
    id: 5,
    title: "Cultural Networking",
    date: "JUL 18-20",
    time: "July 18 - 20, 2026",
    location: "New Jersey",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 in New Jersey for an evening of cultural networking and dialogues aimed at reviving rich cultural values through education.",
    startDate: "2026-07-18"
  },
  {
    id: 6,
    title: "Youth Empowerment Summit",
    date: "JUL 21-23",
    time: "July 21 - 23, 2026",
    location: "Orlando",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 in Orlando, featuring interactive workshops dedicated to youth leadership, emotional intelligence, and spiritual well-being.",
    startDate: "2026-07-21"
  },
  {
    id: 7,
    title: "Board Meeting & Tour Gala",
    date: "JUL 24-28",
    time: "July 24 - 28, 2026 (Board Meeting: July 25 | Gala: July 26)",
    location: "Los Angeles",
    type: "USA Tour",
    description: "Join the USA Program Tour 2026 finale in Los Angeles. Includes our annual Board Meeting on July 25 and the grand closing Tour Gala on July 26.",
    startDate: "2026-07-24"
  }
];

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": sampleEvents.map((event, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "startDate": event.startDate,
      "location": {
        "@type": "Place",
        "name": event.location
      }
    }
  }))
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filters = ["All", "Houston", "Boston", "Detroit", "Philadelphia", "New Jersey", "Orlando", "Los Angeles"];

  const filteredEvents = activeFilter === "All"
    ? sampleEvents
    : sampleEvents.filter(event => event.location === activeFilter);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <JsonLd data={eventSchema} />

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
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Button 
            variant="outline" 
            size="lg" 
            className="text-white border-white/30 hover:bg-white/10 text-lg w-full sm:w-auto h-14 px-8 rounded-xl font-bold"
            onClick={() => window.dispatchEvent(new CustomEvent("showUSAProgramDetails"))}
          >
            View USA Tour Schedule
          </Button>
          <Link href="/LA-Gala" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 text-lg w-full h-14 px-8 rounded-xl font-bold"
            >
              LA- Gala
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
          {/* Filter Bar */}
          {sampleEvents.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-300",
                    activeFilter === filter
                      ? "bg-saffron text-white shadow-xl shadow-saffron/20 scale-105"
                      : "bg-white text-slate-400 hover:text-deep-blue border border-slate-100 hover:border-slate-200"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.map((event) => {
              if (!event.image) {
                return (
                  <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border-t-8 border-saffron hover:-translate-y-2 transition-all duration-300 group flex flex-col p-8 min-h-[350px]">
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-saffron/10 text-saffron px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                        {event.type}
                      </span>
                      <div className="bg-deep-blue text-white px-4 py-2 rounded-xl flex flex-col items-center justify-center min-w-[80px]">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{event.date.split(' ')[0]}</span>
                        <span className="text-base font-black leading-none mt-1">{event.date.split(' ')[1]}</span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-serif font-black text-deep-blue mb-4 group-hover:text-saffron transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                          <Clock className="w-4 h-4 mr-3 text-saffron shrink-0" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                          <MapPin className="w-4 h-4 mr-3 text-saffron shrink-0" />
                          {event.location}
                        </div>
                      </div>

                      <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3 text-sm">
                        {event.description}
                      </p>

                      <div className="mt-auto">
                        <Link href="/donate" className="w-full">
                          <Button className="w-full bg-slate-50 hover:bg-saffron text-deep-blue hover:text-white border border-slate-200 hover:border-saffron transition-all group-hover:shadow-lg rounded-xl h-14 font-bold">
                            Support Tour
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
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

                    <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3">
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
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No upcoming events scheduled. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
