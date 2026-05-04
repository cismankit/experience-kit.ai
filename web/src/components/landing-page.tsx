import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";
import { TrustIconsStrip } from "@/components/trust-icons-strip";
import { ApproachSection } from "@/components/sections/approach-section";
import { AudienceKitsSection } from "@/components/sections/audience-kits-section";
import { CompactCtaSection } from "@/components/sections/compact-cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OverviewSection } from "@/components/sections/overview-section";

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="top"
        className="flex-1 max-lg:pb-28"
        aria-label="ExperienceKit.ai product overview"
      >
        <HeroSection />
        <TrustIconsStrip />
        <OverviewSection />
        <ExperienceSection />
        <AudienceKitsSection />
        <ApproachSection />
        <CompactCtaSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <StickyMobileCta />
    </>
  );
}
