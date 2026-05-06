import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioProofSection } from "@/components/sections/portfolio-proof-section";
import { DailyMissionPreview } from "@/components/home/daily-mission-preview";
import { HomeContextBar } from "@/components/home/home-context-bar";
import { HomePersonaUrlSync } from "@/components/home/home-persona-url-sync";
import { HomeScrollChrome } from "@/components/home/home-scroll-chrome";
import { HomeTaskShell } from "@/components/home/home-task-shell";
import { HowItWorksStepper } from "@/components/home/how-it-works-stepper";
import { KitMatchSection } from "@/components/home/kit-match-section";
import { PersonaProvider } from "@/components/home/persona-provider";
import { PersonaSelectorSection } from "@/components/home/persona-selector-section";
import { PilotTimelineSection } from "@/components/home/pilot-timeline-section";
import { SchoolsLaneHero } from "@/components/home/schools-lane-hero";
import { HomeSchoolPilotCta } from "@/components/home/home-school-pilot-cta";

/** Task lanes + merged match flow: less scroll-hopping, clearer school path. */
export function LandingPage() {
  return (
    <PersonaProvider>
      <HomeScrollChrome />
      <HomePersonaUrlSync />
      <HomeTaskShell
        discover={
          <>
            <HeroSection />
            <HomeContextBar />
            <PersonaSelectorSection />
            <DailyMissionPreview />
            <KitMatchSection />
            <HowItWorksStepper />
            <PortfolioProofSection />
            <HomeSchoolPilotCta />
            <FaqSection defaultGroup="families" anchorId="faq" />
            <ContactSection defaultLane="discover" anchorId="contact" />
          </>
        }
        schools={
          <>
            <SchoolsLaneHero contactHref="/#contact-school" />
            <PilotTimelineSection
              contactHref="/#contact-school"
              faqHref="/#faq-school"
            />
            <FaqSection defaultGroup="schools" anchorId="faq-school" />
            <ContactSection defaultLane="school" anchorId="contact-school" />
          </>
        }
      />
    </PersonaProvider>
  );
}
