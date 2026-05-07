import Link from "next/link";
import Image from "next/image";
import { MessageCircle as Facebook, Send as Twitter, Globe as Instagram, Video as Youtube, Heart } from "lucide-react";
import { Button } from "./Button";

const footerLinks = [
  {
    title: "Organization",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Global Impact", href: "/#impact" },
      { name: "Gallery", href: "/gallery" },
      { name: "Events", href: "/events" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "Shiksha Daan", href: "/programs/shiksha-daan" },
      { name: "Sanskriti Bodh", href: "/programs/sanskriti-bodh" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Support a Child's Education", href: "/sponsor/child-education" },
      { name: "Support Vidya Bharati", href: "/sponsor/vidya-bharati" },
      { name: "Sponsor Classroom Construction", href: "/sponsor/classroom-construction" },
      { name: "Sponsor Toilet Block Construction", href: "/sponsor/toilet-block" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-deep-blue text-white pt-20 pb-10">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/Vidya-Bharati-logo.webp"
                  alt="VidyaBharati Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight">VidyaBharati <span className="text-saffron">USA</span></span>
            </Link>
            <p className="text-slate-300 max-w-sm leading-relaxed">
              Empowering underprivileged children in India through quality education, 
              holistic development, and sustainable community growth.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-saffron transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-saffron transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-saffron transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-saffron transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-lg font-bold text-saffron">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} VidyaBharati USA. All rights reserved. Registered 501(c)(3) Nonprofit.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
