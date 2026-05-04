import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My orders",
  description: "View and manage ExperienceKit.ai orders—demo desk until accounts ship.",
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
