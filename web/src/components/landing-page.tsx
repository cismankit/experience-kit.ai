import { ApproachSection } from "@/components/sections/approach-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeKitsSpotlight } from "@/components/sections/home-kits-spotlight";
import { KitFinderSection } from "@/components/sections/kit-finder-section";
import { LearnerDashboardPreviewSection } from "@/components/sections/learner-dashboard-preview-section";
import { LearningCtaSection } from "@/components/sections/learning-cta-section";
import { ParentTrustSection } from "@/components/sections/parent-trust-section";
import { PersonaJourneySection } from "@/components/sections/persona-journey-section";
import { PlatformBentoSection } from "@/components/sections/platform-bento-section";
import { PortfolioProofSection } from "@/components/sections/portfolio-proof-section";
import { SchoolPilotSection } from "@/components/sections/school-pilot-section";
import { TodayMissionSection } from "@/components/sections/today-mission-section";
import { TrustIconsStrip } from "@/components/trust-icons-strip";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <PersonaJourneySection />
      <TrustIconsStrip />
      <PlatformBentoSection />
      <TodayMissionSection />
      <KitFinderSection />
      <LearnerDashboardPreviewSection />
      <PortfolioProofSection />
      <ParentTrustSection />
      <SchoolPilotSection />
      <HomeKitsSpotlight />
      <ApproachSection />
      <LearningCtaSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
