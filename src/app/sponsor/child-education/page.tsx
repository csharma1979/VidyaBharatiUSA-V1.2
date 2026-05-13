import { SponsorshipLayout } from "@/components/ui/SponsorshipLayout";
import supportChildEducation from '@/assets/support child education .png';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor a Child | Transform a Life | VidyaBharati USA",
  description: "Directly sponsor a child's education in India. Your support covers tuition, learning kits, and holistic development for underprivileged students.",
  keywords: ["sponsor a child", "child education sponsorship", "donate for child education", "NGO sponsorship India"],
};

export default function ChildEducationPage() {
  return (
    <SponsorshipLayout
      heroTitle="Unlock a Child's Potential"
      heroSubtitle="Your sponsorship provides quality education, books, and a brighter future for a child in need."
      heroImage={supportChildEducation}
      heroImageAlt="Young student studying in a Vidya Bharati classroom in India"
      heroLayout="banner"
      purposeTitle="Why Sponsor a Child?"
      purposeDescription="Directly support a student's journey from elementary school to graduation, ensuring financial barriers never stop their dreams."
      benefits={[
        {
          title: "Full Tuition Coverage",
          description: "Covers all school fees and academic expenses for the entire academic year."
        },
        {
          title: "Learning Kits",
          description: "Provides high-quality textbooks, notebooks, stationery, and a school uniform."
        },
        {
          title: "Nutritional Support",
          description: "Ensures the child receives healthy, balanced mid-day meals at school."
        },
        {
          title: "Personal Mentoring",
          description: "Access to emotional support, career counseling, and value-based development."
        }
      ]}
      impactTitle="Education is the ultimate equalizer."
      impactDescription="A child who completes high school through VidyaBharati is twice as likely to find stable employment and lift their entire family out of poverty. Your support creates a ripple effect of change."
      impactStats={[
        { label: "Completion Rate", value: "98%" },
        { label: "First Gen Learners", value: "65%" }
      ]}
      testimonial={{
        quote: "Because of my sponsor, I didn't have to leave school to work in the fields. Today, I am studying to be a nurse and want to serve my community.",
        author: "Meera Bai",
        role: "Scholarship Recipient, Rajasthan"
      }}
    />
  );
}
