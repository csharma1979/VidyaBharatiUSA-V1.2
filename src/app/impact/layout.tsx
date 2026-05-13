import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact | Transparency & Results | VidyaBharati USA",
  description: "See the tangible impact of your donations. We measure our success through students empowered, schools supported, and lives transformed across 22 states in India.",
  keywords: ["educational impact", "nonprofit transparency", "UPSC toppers", "rural education results", "charity impact report"],
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
