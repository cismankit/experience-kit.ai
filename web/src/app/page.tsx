import { LandingPage } from "@/components/landing-page";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";

export default function Home() {
  return (
    <main id="top" className="flex-1 max-lg:pb-28" aria-label="ExperienceKit.ai product overview">
      <LandingPage />
      <StickyMobileCta />
    </main>
  );
}
