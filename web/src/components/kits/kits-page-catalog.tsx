"use client";

import { useMemo, useState, type ReactNode } from "react";
import { KitCardCompact } from "@/components/product/kit-card-compact";
import { KitDetailDrawer } from "@/components/product/kit-detail-drawer";
import type { KitGoalTag, KitSettingTag } from "@/lib/kits-catalog";
import type { KitProduct } from "@/lib/kits-catalog";
import { KITS } from "@/lib/kits-catalog";
import { USER_AGE_BUCKETS, filterKits, type KitFilterState, type UserAgeBucketId } from "@/lib/kits-filters";
import { cn } from "@/lib/utils";

const GOALS: { id: KitGoalTag; label: string }[] = [
  { id: "creativity", label: "Creativity" },
  { id: "stem", label: "STEM" },
  { id: "ai-literacy", label: "AI literacy" },
  { id: "career", label: "Career skills" },
  { id: "confidence", label: "Confidence" },
  { id: "portfolio", label: "Portfolio" },
];

const SETTINGS: { id: KitSettingTag; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "classroom", label: "Classroom" },
  { id: "workshop", label: "Workshop" },
  { id: "club", label: "Club" },
];

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:text-sm",
        active
          ? "border-amber-400 bg-amber-50 text-amber-950"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
      )}
    >
      {children}
    </button>
  );
}

export function KitsPageCatalog() {
  const [f, setF] = useState<KitFilterState>({ age: "", goal: "", setting: "" });
  const [drawerKit, setDrawerKit] = useState<KitProduct | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const list = useMemo(() => filterKits(KITS, f), [f]);

  const setAge = (id: UserAgeBucketId | "") => setF((s) => ({ ...s, age: s.age === id ? "" : id }));
  const setGoal = (id: KitGoalTag | "") => setF((s) => ({ ...s, goal: s.goal === id ? "" : id }));
  const setSetting = (id: KitSettingTag | "") => setF((s) => ({ ...s, setting: s.setting === id ? "" : id }));

  function openDrawer(kit: KitProduct) {
    setDrawerKit(kit);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <>
      <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-10 lg:items-start">
        <aside className="space-y-6 rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Age band</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip active={f.age === ""} onClick={() => setF((s) => ({ ...s, age: "" }))}>
                All ages
              </FilterChip>
              {USER_AGE_BUCKETS.map((b) => (
                <FilterChip key={b.id} active={f.age === b.id} onClick={() => setAge(b.id)}>
                  {b.label}
                </FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Goal</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip active={f.goal === ""} onClick={() => setF((s) => ({ ...s, goal: "" }))}>
                Any goal
              </FilterChip>
              {GOALS.map((g) => (
                <FilterChip key={g.id} active={f.goal === g.id} onClick={() => setGoal(g.id)}>
                  {g.label}
                </FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Setting</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip active={f.setting === ""} onClick={() => setF((s) => ({ ...s, setting: "" }))}>
                Any setting
              </FilterChip>
              {SETTINGS.map((s) => (
                <FilterChip key={s.id} active={f.setting === s.id} onClick={() => setSetting(s.id)}>
                  {s.label}
                </FilterChip>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <p className="text-sm font-medium text-slate-700">
            {list.length} {list.length === 1 ? "journey" : "journeys"} match
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {list.map((kit) => (
              <KitCardCompact key={kit.id} kit={kit} onDetails={() => openDrawer(kit)} />
            ))}
          </div>

          {list.length === 0 ? (
            <p className="mt-10 text-center text-sm font-medium text-slate-600">
              No journeys match those filters—try clearing one dimension or use the{" "}
              <a href="/find-my-kit" className="font-semibold text-amber-900 underline-offset-2 hover:underline">
                guided kit finder
              </a>
              .
            </p>
          ) : null}
        </div>
      </div>

      <KitDetailDrawer kit={drawerKit} open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
