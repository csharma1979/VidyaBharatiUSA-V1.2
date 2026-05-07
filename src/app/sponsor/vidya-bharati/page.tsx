import { SponsorshipLayout } from "@/components/ui/SponsorshipLayout";
import supportVidhya from "@/assets/support vidhya.png";

export default function SupportVidyaBharatiPage() {
  return (
    <SponsorshipLayout
      heroTitle="Fuel a National Movement"
      heroSubtitle="Support the overarching mission of VidyaBharati USA to bring value-based education to every corner of India."
      heroImage={supportVidhya}
      purposeTitle="Why Support the Mission?"
      purposeDescription="General support allows us to scale our impact, train thousands of teachers, and build curricula for the 21st century."
      benefits={[
        {
          title: "Teacher Training",
          description: "Upskilling rural educators with modern pedagogical tools and digital literacy."
        },
        {
          title: "Curriculum Innovation",
          description: "Developing holistic study materials that blend tradition with modern science."
        },
        {
          title: "Rural Outreach",
          description: "Expanding our network to tribal and border regions where education is scarce."
        },
        {
          title: "Institutional Scaling",
          description: "Optimizing school operations to reach more children with fewer resources."
        }
      ]}
      impactTitle="Scaling Excellence across India."
      impactDescription="Your contribution to the general fund helps us manage a network of over 15,000 schools, ensuring quality is maintained and no child is left behind in the digital age."
      impactStats={[
        { label: "Schools Managed", value: "15,000+" },
        { label: "States Impacted", value: "22" }
      ]}
      testimonial={{
        quote: "Training at Vidya Bharati transformed my approach to teaching. I now focus on the child's heart as much as their head.",
        author: "Shri R.K. Singh",
        role: "Headmaster, Uttar Pradesh"
      }}
    />
  );
}
