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
import { SocialProofStrip } from "@/components/social-proof-strip";
import { TrustIconsStrip } from "@/components/trust-icons-strip";

/** Home page section order optimized for “daily habit” before platform depth. */
export function LandingPage() {
  return (
    <>
      <HeroSection />
      <SocialProofStrip />
      <PersonaJourneySection />
      <TrustIconsStrip />
      <TodayMissionSection />
      <PlatformBentoSection />
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
