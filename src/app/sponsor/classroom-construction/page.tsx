import { SponsorshipLayout } from "@/components/ui/SponsorshipLayout";
import classroomConstruct from "@/assets/classroom construct.png";

export default function ClassroomConstructionPage() {
  return (
    <SponsorshipLayout
      heroTitle="Build a Legacy of Learning"
      heroSubtitle="Help us construct safe, modern, and inspiring classrooms for children in rural India."
      heroImage={classroomConstruct}
      purposeTitle="Why Sponsor a Classroom?"
      purposeDescription="Physical infrastructure is the foundation of education. A safe classroom is a sanctuary for growth and innovation."
      benefits={[
        {
          title: "Permanent Structure",
          description: "Sturdy bricks and mortar replacing temporary shacks or outdoor classes."
        },
        {
          title: "Modern Furniture",
          description: "Comfortable desks and chairs designed for ergonomic student learning."
        },
        {
          title: "Tech Ready",
          description: "Pre-wired for digital blackboards, computers, and stable electricity."
        },
        {
          title: "Lifetime Impact",
          description: "A single classroom will serve thousands of students over the decades."
        }
      ]}
      impactTitle="Bricks that build better futures."
      impactDescription="Proper classroom infrastructure has been shown to improve student concentration by 40% and teacher retention by 25%. You are building more than a room; you are building a future."
      impactStats={[
        { label: "Classrooms Built", value: "850+" },
        { label: "Student Capacity", value: "35,000" }
      ]}
      testimonial={{
        quote: "Before this room, we studied under a tree. In rain or heat, school was closed. Now, we never have to stop learning.",
        author: "Rahul M.",
        role: "7th Grade Student, Bihar"
      }}
    />
  );
}
