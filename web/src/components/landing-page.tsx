import { ApproachSection } from "@/components/sections/approach-section";
import { CompactCtaSection } from "@/components/sections/compact-cta-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeKitsSpotlight } from "@/components/sections/home-kits-spotlight";
import { PlatformBentoSection } from "@/components/sections/platform-bento-section";
import { TrustIconsStrip } from "@/components/trust-icons-strip";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustIconsStrip />
      <PlatformBentoSection />
      <HomeKitsSpotlight />
      <ApproachSection />
      <CompactCtaSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
