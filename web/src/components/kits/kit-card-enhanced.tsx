import Link from "next/link";
import type { KitProduct } from "@/lib/kits-catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type KitCardEnhancedProps = {
  kit: KitProduct;
  /** Tighter grid cards on home vs roomy catalog */
  variant?: "spotlight" | "catalog";
};

export function KitCardEnhanced({ kit, variant = "spotlight" }: KitCardEnhancedProps) {
  const roomy = variant === "catalog";
  const spotlight = !roomy;

  return (
    <article
      id={kit.id}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br p-px shadow-md ring-1 ring-slate-900/5",
        kit.accent,
      )}
    >
      <div className={cn("h-full rounded-[15px] bg-white", roomy ? "p-6 sm:p-8" : "p-5 sm:p-6")}>
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
              {kit.tier}
              {spotlight ? (
                <span className="ml-2 font-normal normal-case tracking-normal text-slate-500">
                  — learning path
                </span>
              ) : null}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{kit.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-slate-600">{kit.tagline}</p>
          </div>
          <span
            className="shrink-0 rounded-full border border-slate-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-slate-700"
            title="Challenge level"
          >
            {kit.difficulty}
          </span>
        </header>

        <dl
          className={cn(
            "mt-4 grid gap-2 text-sm",
            roomy ? "sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
          )}
        >
          <div className="rounded-lg border border-slate-100 bg-stone-50/80 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Age range</dt>
            <dd className="font-medium text-slate-900">{kit.ageRange}</dd>
          </div>
          <div className="rounded-lg border border-slate-100 bg-stone-50/80 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Best for</dt>
            <dd className="text-pretty font-medium text-slate-900">{kit.bestFor}</dd>
          </div>
          <div className="rounded-lg border border-slate-100 bg-stone-50/80 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">First mission</dt>
            <dd className="font-medium text-slate-900">~{kit.firstMissionMinutes} min</dd>
          </div>
          <div className="rounded-lg border border-slate-100 bg-stone-50/80 px-3 py-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Missions</dt>
            <dd className="font-medium text-slate-900">{kit.dailyMissionCount} guided steps</dd>
          </div>
        </dl>

        <p className={cn("mt-4 text-pretty leading-relaxed text-slate-600", roomy ? "text-base" : "text-sm")}>
          {kit.blurb}
        </p>

        <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/50 px-3 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-900">What they ship</p>
          <p className="mt-1 text-sm leading-snug text-slate-800">{kit.whatLearnerBuilds}</p>
        </div>

        {roomy ? (
          <>
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Skill outcomes</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {kit.skillOutcomes.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">What&apos;s in the box</p>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {kit.contents.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2 rounded-lg border border-slate-100 bg-stone-50/90 px-2 py-1.5 text-xs font-medium text-slate-800"
                  >
                    <c.icon className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden />
                    <span className="leading-tight">{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/90 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Capstone artifact</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{kit.finalArtifact}</p>
            </div>
          </>
        ) : (
          <>
            <details className="group mt-4 rounded-xl border border-slate-200 bg-stone-50/60 px-3 py-2 [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-amber-500">
                <span className="flex items-center justify-between gap-2">
                  Skills & pack contents
                  <span className="text-xs font-medium text-amber-800 group-open:hidden">Show</span>
                  <span className="hidden text-xs font-medium text-amber-800 group-open:inline">Hide</span>
                </span>
              </summary>
              <div className="mt-3 border-t border-slate-200/80 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Skills</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {kit.skillOutcomes.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">In the box</p>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {kit.contents.map((c) => (
                    <li
                      key={c.label}
                      className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-2 py-1.5 text-xs font-medium text-slate-800"
                    >
                      <c.icon className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden />
                      <span className="leading-tight">{c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/90 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Capstone artifact</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{kit.finalArtifact}</p>
            </div>
          </>
        )}

        <div
          className={cn(
            "mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap",
            roomy ? "lg:flex-nowrap" : "",
          )}
        >
          <Button variant="primary" size="md" href={`/kits#${kit.id}`} className="w-full sm:w-auto">
            View full journey
          </Button>
          <Button variant="secondary" size="md" href="/support#contact" className="w-full sm:w-auto">
            Request quote
          </Button>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          Full manifests & mission outlines on the{" "}
          <Link href={`/kits#${kit.id}`} className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            kit page
          </Link>
          . Questions?{" "}
          <Link href="/support#contact" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            Talk with our team
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
