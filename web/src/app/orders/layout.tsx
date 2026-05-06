import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My orders",
  description: "View ExperienceKit.ai orders stored in this browser; sign-in backed history arrives with accounts.",
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
