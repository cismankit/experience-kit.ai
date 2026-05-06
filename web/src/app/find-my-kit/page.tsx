import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PersonaProvider } from "@/components/home/persona-provider";
import { HomePersonaUrlSync } from "@/components/home/home-persona-url-sync";
import { KitFinderWithSync } from "@/components/kit-finder/kit-finder-with-sync";

export const metadata: Metadata = {
  title: "Find my kit",
  description:
    "Guided kit recommendation—who it’s for, goals, setting, pace, and comfort. Get a journey, first mission preview, and next path.",
};

export default function FindMyKitPage() {
  return (
    <main id="top" className="flex-1 min-h-[70vh] border-b border-slate-200/80 bg-gradient-to-b from-amber-50/30 via-white to-stone-50">
      <PersonaProvider>
        <HomePersonaUrlSync />
        <Container className="py-10 sm:py-12 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Kit Finder</p>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Configure your kit path
            </h1>
            <p className="mt-3 text-pretty text-sm leading-snug text-slate-600 sm:text-base">
              Six steps—your match updates as you go. No account required.
            </p>
          </div>
          <div className="mt-10">
            <KitFinderWithSync />
          </div>
        </Container>
      </PersonaProvider>
    </main>
  );
}
