"use client";

import { KitFinder } from "@/components/kit-finder/kit-finder";
import { useHomePersona } from "@/components/home/persona-provider";

export function KitFinderWithSync() {
  const { persona } = useHomePersona();
  return <KitFinder variant="wizard" syncPersona={persona} />;
}
