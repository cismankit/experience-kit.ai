import type { Metadata } from "next";
import { SupportPageClient } from "@/components/support/support-page-client";
import { SUPPORT_CATEGORY_IDS, type SupportCategoryId } from "@/lib/support-categories";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with ExperienceKit.ai kits, school pilots, orders, and partnerships—routed to the right team.",
};

function isTopic(v: string | undefined): v is SupportCategoryId {
  return !!v && (SUPPORT_CATEGORY_IDS as readonly string[]).includes(v);
}

export default async function SupportPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const sp = await searchParams;
  const initialTopic = isTopic(sp.topic) ? sp.topic : null;

  return (
    <main id="top" className="flex-1 bg-gradient-to-b from-stone-50 to-white">
      <SupportPageClient initialTopic={initialTopic} />
    </main>
  );
}
