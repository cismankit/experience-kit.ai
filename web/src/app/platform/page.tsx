import type { Metadata } from "next";
import { PlatformControlCenter } from "@/components/platform/platform-control-center";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "SaaS control center for ExperienceKit.ai: auth, workspaces, AI copilot, commerce operations, and support routing.",
};

export default function PlatformPage() {
  return <PlatformControlCenter />;
}
