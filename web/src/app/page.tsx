import { HomeLobby } from "@/components/home-lobby";
import { PersonaProvider } from "@/components/home/persona-provider";
import { HomePersonaUrlSync } from "@/components/home/home-persona-url-sync";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";
import { resolveHomeSpotlightKitId } from "@/lib/home-spotlight";

/** Fresh SSR each request so env-driven homepage content and headers stay current. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const spotlightKitId = resolveHomeSpotlightKitId();

  return (
    <main id="top" className="flex-1 max-lg:pb-28" aria-label="ExperienceKit.ai home">
      <PersonaProvider>
        <HomePersonaUrlSync />
        <HomeLobby spotlightKitId={spotlightKitId} />
      </PersonaProvider>
      <StickyMobileCta />
    </main>
  );
}
