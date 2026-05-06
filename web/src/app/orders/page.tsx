import type { Metadata } from "next";
import { OrdersPageClient } from "./orders-page-client";

export const metadata: Metadata = {
  title: "Orders",
  description: "View orders linked to your ExperienceKit.ai account when sign-in is available.",
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
