import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery | Moments of Impact | VidyaBharati USA",
  description: "Browse through our gallery of photos and videos showcasing the impact of VidyaBharati USA. See our students, schools, and cultural events in action.",
  keywords: ["NGO gallery", "education photos India", "VidyaBharati schools", "charity impact photos", "cultural education gallery"],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
