import type { KitGoalTag, KitProduct, KitSettingTag } from "@/lib/kits-catalog";

export type { KitGoalTag, KitSettingTag };

export type UserAgeBucketId = "5-10" | "10-15" | "15-20" | "20+";

export const USER_AGE_BUCKETS: { id: UserAgeBucketId; label: string; min: number; max: number }[] = [
  { id: "5-10", label: "5–10", min: 5, max: 10 },
  { id: "10-15", label: "10–15", min: 10, max: 15 },
  { id: "15-20", label: "15–20", min: 15, max: 20 },
  { id: "20+", label: "20+", min: 20, max: 35 },
];

export type KitFilterState = {
  age: UserAgeBucketId | "";
  goal: KitGoalTag | "";
  setting: KitSettingTag | "";
};

export function ageRangesOverlap(
  aMin: number,
  aMax: number,
  bMin: number,
  bMax: number,
): boolean {
  return !(aMax < bMin || aMin > bMax);
}

export function filterKits(kits: KitProduct[], f: KitFilterState): KitProduct[] {
  const ageBucket = f.age ? USER_AGE_BUCKETS.find((b) => b.id === f.age) : undefined;

  return kits.filter((kit) => {
    if (ageBucket && !ageRangesOverlap(kit.filterAgeMin, kit.filterAgeMax, ageBucket.min, ageBucket.max)) {
      return false;
    }
    if (f.goal && !kit.filterGoals.includes(f.goal)) return false;
    if (f.setting && !kit.filterSettings.includes(f.setting)) return false;
    return true;
  });
}
