import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track order",
  description: "Track ExperienceKit.ai shipments with your order ID and email.",
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
