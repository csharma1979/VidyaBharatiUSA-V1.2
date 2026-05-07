"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export function ProgramCard({ title, description, image, href }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-slate-100"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-col flex-grow p-8 bg-white z-10 transition-transform duration-300 transform group-hover:-translate-y-2">
        <h3 className="text-2xl font-serif font-bold text-deep-blue mb-3 group-hover:text-saffron transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <Link href={href} className="text-sm font-bold uppercase tracking-wider text-saffron hover:text-orange-600 flex items-center transition-colors">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Button variant="secondary" size="icon" className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-saffron group-hover:text-white border-none shadow-none group-hover:shadow-md">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
