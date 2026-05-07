"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Mail, Scale } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={
          <>
            Terms of <span className="text-saffron italic">Service.</span>
          </>
        }
        subtitle="The rules, guidelines, and legal agreements for using the Vidya Bharati USA platform."
        backgroundImage="/images/hero.webp"
        tag="Legal"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      <section className="py-20 md:py-32">
        <div className="container px-6 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-slate-600 space-y-8">
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-start gap-6 mb-12">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Scale className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-deep-blue m-0 mb-3">User Agreement</h3>
                <p className="m-0 text-base leading-relaxed text-slate-600">
                  By accessing or using the Vidya Bharati USA website, you agree to be bound by these terms and conditions. These terms apply to all visitors, donors, and others who access or use the service.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">1. Acceptance of Terms</h2>
              <p className="text-lg leading-relaxed">
                By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use this website.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">2. Use of Site</h2>
              <p className="text-lg leading-relaxed">
                Vidya Bharati USA grants you a limited, non-exclusive, non-transferable license to access and make personal use of this site. You are prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li>Modifying or copying any materials on the site.</li>
                <li>Using the site for any commercial purpose or public display.</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website.</li>
                <li>Removing any copyright or other proprietary notations from the materials.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">3. Donation Policy</h2>
              <p className="text-lg leading-relaxed">
                All donations made through the Vidya Bharati USA platform are voluntary and generally non-refundable. We use secure third-party payment processors to handle all financial transactions.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li><strong>Tax Receipts:</strong> We provide tax receipts for all eligible donations as required by 501(c)(3) regulations.</li>
                <li><strong>Fund Allocation:</strong> While we respect donor intent, Vidya Bharati USA retains final discretion over the allocation of funds to support our core mission and programs.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">4. Intellectual Property</h2>
              <p className="text-lg leading-relaxed">
                The content on this website, including text, graphics, logos, and images, is the property of Vidya Bharati USA and is protected by international copyright laws. Unauthorized use of any materials on this site is strictly prohibited.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">5. Limitation of Liability</h2>
              <p className="text-lg leading-relaxed">
                In no event shall Vidya Bharati USA be liable for any damages arising out of the use or inability to use the materials on our website, even if we have been notified of the possibility of such damage.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">6. Governing Law</h2>
              <p className="text-lg leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the State of New York, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-deep-blue pt-8 border-t border-slate-100">7. Contact Information</h2>
              <p className="text-lg leading-relaxed">
                For any questions regarding these Terms of Service, please reach out to our legal and support team:
              </p>
              
              <div className="mt-10 p-10 bg-deep-blue text-white rounded-[2rem] flex flex-col items-center text-center space-y-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md relative z-10">
                  <Mail className="w-8 h-8 text-saffron" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h4 className="text-3xl font-serif font-bold">Legal Inquiries</h4>
                  <p className="text-slate-300 text-lg">We are committed to transparency and helping you understand your rights.</p>
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
