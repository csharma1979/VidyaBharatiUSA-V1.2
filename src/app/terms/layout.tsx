import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VidyaBharati USA",
  description: "Review the terms of service for using the VidyaBharati USA website and donation platform.",
  robots: { index: false, follow: true },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
