import type { Metadata } from "next";
import { MissionsPageClient } from "@/components/missions/missions-page-client";

export const metadata: Metadata = {
  title: "Daily missions",
  description:
    "Today’s mission, mission library, and reflection prompts—bite-sized builds from ExperienceKit.ai learning paths.",
};

export default function MissionsPage() {
  return (
    <main id="top" className="flex-1 bg-white">
      <MissionsPageClient />
    </main>
  );
}
