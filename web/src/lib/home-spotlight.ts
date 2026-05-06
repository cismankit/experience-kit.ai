import { getKitById } from "@/lib/kits-catalog";

const DEFAULT_SPOTLIGHT_KIT_ID = "launch-pad-core";

/**
 * Kit id for the homepage “Today’s mission” band.
 * Set `HOME_SPOTLIGHT_KIT_ID` to any valid catalog `id` (see `KITS` in `kits-catalog.ts`).
 * Invalid or empty values fall back to the default.
 */
export function resolveHomeSpotlightKitId(): string {
  const raw = process.env.HOME_SPOTLIGHT_KIT_ID?.trim();
  if (raw && getKitById(raw)) return raw;
  return DEFAULT_SPOTLIGHT_KIT_ID;
}
