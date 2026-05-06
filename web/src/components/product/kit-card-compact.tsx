import type { KitProduct } from "@/lib/kits-catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type KitCardCompactProps = {
  kit: KitProduct;
  onDetails: () => void;
};

export function KitCardCompact({ kit, onDetails }: KitCardCompactProps) {
  return (
    <article
      id={kit.id}
      className={cn(
        "ek-card-lift flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-900/5",
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{kit.tier}</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{kit.name}</h3>
          <p className="mt-0.5 text-sm text-slate-600">{kit.tagline}</p>
        </div>
        <span className="shrink-0 rounded-full border border-slate-200 bg-stone-50 px-2 py-1 text-xs font-semibold text-slate-700">
          {kit.difficulty}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-stone-50 px-2.5 py-2">
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Ages</dt>
          <dd className="mt-0.5 font-medium text-slate-900">{kit.ageRange}</dd>
        </div>
        <div className="rounded-lg bg-stone-50 px-2.5 py-2">
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Missions</dt>
          <dd className="mt-0.5 font-medium text-slate-900">{kit.dailyMissionCount}</dd>
        </div>
        <div className="col-span-2 rounded-lg bg-stone-50 px-2.5 py-2">
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Best for</dt>
          <dd className="mt-0.5 font-medium text-slate-900">{kit.bestFor}</dd>
        </div>
        <div className="rounded-lg bg-stone-50 px-2.5 py-2">
          <dt className="font-semibold uppercase tracking-wider text-slate-500">First mission</dt>
          <dd className="mt-0.5 font-medium text-slate-900">~{kit.firstMissionMinutes} min</dd>
        </div>
        <div className="rounded-lg bg-stone-50 px-2.5 py-2">
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Capstone</dt>
          <dd className="mt-0.5 line-clamp-2 font-medium text-slate-900">{kit.finalArtifact}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-1 flex-col justify-end gap-2 sm:flex-row">
        <Button variant="primary" size="md" className="w-full sm:flex-1" href="/missions">
          View journey
        </Button>
        <Button variant="outline" size="md" type="button" className="w-full bg-white sm:flex-1" onClick={onDetails}>
          Journey details
        </Button>
      </div>
    </article>
  );
}
