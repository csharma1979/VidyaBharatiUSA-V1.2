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
  title: "VidyaBharati USA | Empowering Dreams Through Education",
  description: "VidyaBharati USA is a nonprofit organization dedicated to providing quality education and holistic development to underprivileged children in India. Join us in making a difference.",
  keywords: ["Nonprofit", "Education", "India", "Charity", "VidyaBharati", "USA"],
  openGraph: {
    title: "VidyaBharati USA | Empowering Dreams Through Education",
    description: "Quality education for underprivileged children in India.",
    url: "https://vidyabharatiusa.org",
    siteName: "VidyaBharati USA",
    locale: "en_US",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
