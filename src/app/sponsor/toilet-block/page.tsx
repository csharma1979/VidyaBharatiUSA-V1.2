import { SponsorshipLayout } from "@/components/ui/SponsorshipLayout";
import toiletBlock from "@/assets/toilet block.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Sanitation | Support Girl Child Education | VidyaBharati USA",
  description: "Support health and hygiene by sponsoring toilet block construction in rural schools. Helping girls stay in school through better sanitation.",
  keywords: ["sponsor school toilets", "sanitation charity India", "support girl child education", "water and hygiene NGO"],
};

export default function ToiletBlockPage() {
  return (
    <SponsorshipLayout
      heroTitle="Dignity in Sanitation"
      heroSubtitle="Supporting health, hygiene, and girl-child education through modern sanitation blocks."
      heroImage={toiletBlock}
      heroLayout="banner"
      purposeTitle="Why Sponsor a Toilet Block?"
      purposeDescription="Lack of sanitation is the #1 reason girls drop out of school. Your sponsorship changes this reality."
      benefits={[
        {
          title: "Safe Spaces for Girls",
          description: "Private, secure facilities that ensure girls feel safe and attended to."
        },
        {
          title: "Clean Water Access",
          description: "Integrated handwashing stations and stable water supply for hygiene."
        },
        {
          title: "Health Education",
          description: "Providing a platform for teaching sanitation and personal healthcare."
        },
        {
          title: "Disease Prevention",
          description: "Massively reducing school absence due to water-borne illnesses."
        }
      ]}
      impactTitle="Hygiene is a Human Right."
      impactDescription="Installing a single toilet block has been proven to increase female student enrollment by up to 30% and reduce childhood illness by 45% in the local community."
      impactStats={[
        { label: "Attendance Increase", value: "30%" },
        { label: "Health Benefit", value: "45%" }
      ]}
      testimonial={{
        quote: "Since the new sanitation block was built, many of my friends have returned to school. We feel respected and safe now.",
        author: "Anjali K.",
        role: "High School Student, Madhya Pradesh"
      }}
    />
  );
}
