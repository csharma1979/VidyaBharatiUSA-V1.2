import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload the primary body font
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vidyabharatiusa.org"),
  title: {
    default: "VidyaBharati USA | Empowering Dreams Through Education",
    template: "%s | VidyaBharati USA",
  },
  description: "VidyaBharati USA is a 501(c)(3) nonprofit organization dedicated to providing quality education, holistic development, and Hindu values to underprivileged children in India.",
  keywords: [
    "VidyaBharati USA",
    "Indian education nonprofit",
    "Donate for education India",
    "Support rural education",
    "Hindu values education",
    "Educational charity organization",
    "Holistic child development",
    "NGO for children India"
  ],
  authors: [{ name: "VidyaBharati USA" }],
  creator: "VidyaBharati USA",
  publisher: "VidyaBharati USA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VidyaBharati USA | Empowering Dreams Through Education",
    description: "Quality education and holistic development for underprivileged children in India. Join our mission.",
    url: "https://vidyabharatiusa.org",
    siteName: "VidyaBharati USA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "VidyaBharati USA | Empowering Dreams Through Education",
    description: "Supporting rural education and holistic growth for children in India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://vidyabharatiusa.org",
  },
};

import { ProgramEventInfo } from "@/components/ui/ProgramEventInfo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "react-hot-toast";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "VidyaBharati USA",
  "url": "https://vidyabharatiusa.org",
  "logo": "https://vidyabharatiusa.org/Vidya-Bharati-logo.webp",
  "description": "VidyaBharati USA is a nonprofit organization dedicated to providing quality education and holistic development to underprivileged children in India.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "USA"
  },
  "sameAs": [
    "https://facebook.com/vidyabharatiusa",
    "https://twitter.com/vidyabharatiusa",
    "https://linkedin.com/company/vidyabharatiusa"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "info@vidyabharatiusa.org"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body 
        className="font-sans antialiased text-slate-900 selection:bg-orange-100 selection:text-orange-900"
        suppressHydrationWarning
      >
        <Toaster position="bottom-right" />
        <JsonLd data={organizationSchema} />
        <ProgramEventInfo />
        {children}
      </body>
    </html>
  );
}
