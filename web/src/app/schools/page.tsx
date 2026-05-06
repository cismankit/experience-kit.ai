import type { Metadata } from "next";
import { SchoolsLaneHero } from "@/components/home/schools-lane-hero";
import { PilotTimelineSection } from "@/components/home/pilot-timeline-section";
import { ContactSection } from "@/components/sections/contact-section";
import {
  SchoolsClassroomDashboardPreview,
  SchoolsDeploymentModel,
  SchoolsFacilitatorSupport,
  SchoolsMeasurableOutcomes,
} from "@/components/schools/schools-page-sections";

export const metadata: Metadata = {
  title: "For schools",
  description:
    "Classroom and district pilots for ExperienceKit.ai—cohort deployment, educator guides, timelines, and measurable learner outcomes.",
};

const CONTACT = "/schools#pilot-request";

export default function SchoolsPage() {
  return (
    <main id="top" className="flex-1 bg-white">
      <SchoolsLaneHero contactHref={CONTACT} />
      <PilotTimelineSection
        sectionId="pilot-timeline"
        contactHref={CONTACT}
        faqHref="/support"
        secondaryCtaLabel="Support hub"
      />
      <SchoolsDeploymentModel contactHref={CONTACT} />
      <SchoolsFacilitatorSupport />
      <SchoolsMeasurableOutcomes />
      <SchoolsClassroomDashboardPreview />
      <ContactSection defaultLane="school" anchorId="pilot-request" />
    </main>
  );
}
