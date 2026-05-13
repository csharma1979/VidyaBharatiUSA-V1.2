import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | VidyaBharati USA",
  description: "Learn about how VidyaBharati USA uses cookies to improve your experience on our website.",
  robots: { index: false, follow: true },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
