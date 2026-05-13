import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VidyaBharati USA",
  description: "Read the VidyaBharati USA privacy policy to understand how we collect, use, and protect your personal information and donation data.",
  robots: { index: false, follow: true }, // Usually legal pages don't need to be indexed as primary content but followed
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
