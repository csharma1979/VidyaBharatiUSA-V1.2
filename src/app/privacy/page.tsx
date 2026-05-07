"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Mail, Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            Privacy <span className="text-saffron italic">Policy.</span>
          </>
        }
        subtitle="How we collect, use, and protect your information at Vidya Bharati USA."
        backgroundImage="/images/hero.webp"
        tag="Legal"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="py-20 md:py-32">
        <div className="container px-6 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-slate-600 space-y-8">
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-start gap-6 mb-12">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Shield className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-deep-blue m-0 mb-3">Our Commitment to Privacy</h3>
                <p className="m-0 text-base leading-relaxed text-slate-600">
                  Vidya Bharati Foundation of USA ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. We ensure that any information you provide is handled with the utmost care and security.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">1. Information We Collect</h2>
              <p className="text-lg leading-relaxed">
                We collect several types of information from and about users of our Website, including:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li><strong>Personal Information:</strong> Name, postal address, e-mail address, telephone number, and payment information when you make a donation or register for an account.</li>
                <li><strong>Technical Data:</strong> Your internet connection details, IP address, the equipment you use to access our Website, and usage details through cookies and other tracking technologies.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">2. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed">
                We use information that we collect about you or that you provide to us, including any personal information:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li>To present our Website and its contents to you.</li>
                <li>To process your donations and issue tax receipts.</li>
                <li>To provide you with information, newsletters, or updates about our programs that you request from us.</li>
                <li>To manage your registered account and provide customer support.</li>
                <li>To notify you about changes to our Website or any products or services we offer.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">3. Data Security</h2>
              <p className="text-lg leading-relaxed">
                We have implemented robust measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are processed through secure, encrypted gateways (such as Stripe) and we do not store your full credit card details on our servers.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">4. Sharing Your Information</h2>
              <p className="text-lg leading-relaxed">
                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our trusted affiliates and partners for the purposes outlined above.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">5. Your Choices</h2>
              <p className="text-lg leading-relaxed">
                You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions included in those emails.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">6. Contact Information</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions, concerns, or comments about this privacy policy and our privacy practices, please contact us at:
              </p>
              
              <div className="mt-10 p-10 bg-deep-blue text-white rounded-[2rem] flex flex-col items-center text-center space-y-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md relative z-10">
                  <Mail className="w-8 h-8 text-saffron" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h4 className="text-3xl font-serif font-bold">Get in Touch</h4>
                  <p className="text-slate-300 text-lg">We are here to help with any privacy-related inquiries.</p>
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
