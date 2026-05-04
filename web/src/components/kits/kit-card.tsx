import Link from "next/link";
import type { KitProduct } from "@/lib/kits-catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type KitCardProps = {
  kit: KitProduct;
  /** When true, full description + CTA row */
  expanded?: boolean;
};

export function KitCard({ kit, expanded = false }: KitCardProps) {
  return (
    <article
      id={kit.id}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br p-px shadow-md ring-1 ring-slate-900/5",
        kit.accent,
      )}
    >
      <div className={cn("h-full rounded-[15px] bg-white", expanded ? "p-6 sm:p-8" : "p-5")}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{kit.tier}</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{kit.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-slate-600">{kit.tagline}</p>
          </div>
          <Link
            href="/#contact"
            className="text-xs font-semibold text-amber-800 underline-offset-4 hover:underline"
          >
            Quote
          </Link>
        </div>
        <p className={cn("text-sm leading-relaxed text-slate-600", expanded ? "mt-4 max-w-2xl" : "mt-3 line-clamp-3")}>
          {kit.blurb}
        </p>
        <ul
          className={cn(
            "mt-4 grid gap-2",
            expanded ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3",
          )}
        >
          {kit.contents.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-2 rounded-lg border border-slate-100 bg-stone-50/90 px-2.5 py-2 text-xs font-medium text-slate-800"
            >
              <c.icon className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden />
              <span className="leading-tight">{c.label}</span>
            </li>
          ))}
        </ul>
        {expanded ? (
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="primary" size="md" href="/#contact">
              Add to quote
            </Button>
            <Button variant="outline" size="md" href="/track" className="bg-white">
              Track shipment
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button variant="outline" size="sm" href={`/kits#${kit.id}`} className="bg-white">
              View on shop
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
