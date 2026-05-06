import type { Metadata } from "next";
import { StudioPageClient } from "@/components/studio/studio-page-client";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Learner studio preview—current mission, proof, reflections, badges, and kit journey. Demo data until accounts ship.",
};

export default function StudioPage() {
  return (
    <main id="top" className="flex-1 border-b border-slate-200/80 bg-gradient-to-b from-stone-50 to-white">
      <StudioPageClient />
    </main>
  );
}
