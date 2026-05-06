import type { Metadata } from "next";
import { MissionsPageClient } from "@/components/missions/missions-page-client";

export const metadata: Metadata = {
  title: "Daily missions",
  description:
    "Today’s mission, mission library, and reflection prompts—bite-sized builds from ExperienceKit.ai learning paths.",
};

export default function MissionsPage({
  searchParams,
}: {
  searchParams?: { source?: string };
}) {
  const fromOnboarding = searchParams?.source === "onboarding";
  return (
    <main id="top" className="flex-1 bg-white">
      {fromOnboarding ? (
        <div className="border-b border-emerald-200 bg-emerald-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 text-sm font-medium text-emerald-900 sm:px-6 lg:px-8">
            Onboarding handoff complete. Start with Mission 1 and capture your first proof artifact.
          </div>
        </div>
      ) : null}
      <MissionsPageClient />
    </main>
  );
}
