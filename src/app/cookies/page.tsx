"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Mail, Cookie } from "lucide-react";
import Link from "next/link";

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            Cookie <span className="text-saffron italic">Policy.</span>
          </>
        }
        subtitle="How we use cookies and similar technologies to improve your experience on Vidya Bharati USA."
        backgroundImage="/images/hero.webp"
        tag="Legal"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookie Policy" },
        ]}
      />

      <section className="py-20 md:py-32">
        <div className="container px-6 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-slate-600 space-y-8">
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-start gap-6 mb-12">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Cookie className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-deep-blue m-0 mb-3">Transparency & Choice</h3>
                <p className="m-0 text-base leading-relaxed text-slate-600">
                  This Cookie Policy explains what cookies are and how we use them. We believe in being clear and open about how we collect and use data related to you.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">1. What are Cookies?</h2>
              <p className="text-lg leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">2. How We Use Cookies</h2>
              <p className="text-lg leading-relaxed">
                We use cookies for several reasons:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function correctly. They include, for example, cookies that enable you to log into secure areas of our website or make a donation.</li>
                <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works.</li>
                <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">3. Third-Party Cookies</h2>
              <p className="text-lg leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements. These include services like Google Analytics and payment processors like Stripe.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">4. Managing Your Cookies</h2>
              <p className="text-lg leading-relaxed">
                Most web browsers allow some control of most cookies through the browser settings. You can choose to block or delete cookies, but please note that if you do this, some parts of our website may not function properly.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">5. Updates to This Policy</h2>
              <p className="text-lg leading-relaxed">
                We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">6. Contact Us</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions about our use of cookies or other technologies, please email us at:
              </p>
              
              <div className="mt-10 p-10 bg-deep-blue text-white rounded-[2rem] flex flex-col items-center text-center space-y-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md relative z-10">
                  <Mail className="w-8 h-8 text-saffron" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h4 className="text-3xl font-serif font-bold">Inquiries</h4>
                  <p className="text-slate-300 text-lg">Your privacy and data preferences are important to us.</p>
                </div>
                <Link 
                  href="mailto:support@vidyabharatiusa.org"
                  className="relative z-10 mt-4 inline-flex items-center justify-center bg-saffron text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-saffron/20 text-lg"
                >
                  support@vidyabharatiusa.org
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
