import type { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "Guided onboarding wizard with maturity scoring and a tenant-aware target-state plan across design, development, security, operations, and transformation.",
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}

