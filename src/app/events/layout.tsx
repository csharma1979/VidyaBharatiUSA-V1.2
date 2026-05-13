import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Workshops | Join Our Community | VidyaBharati USA",
  description: "Stay updated with VidyaBharati USA events, webinars, and master trainer workshops. Join our community gatherings and contribute to educational growth.",
  keywords: ["nonprofit events", "educational workshops", "Master Trainer Workshop", "educational webinars", "charity events India"],
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
