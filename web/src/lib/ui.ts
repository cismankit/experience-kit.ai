import { cn } from "@/lib/utils";

/** Premium card surface + optional hover lift (pair with a rounded-* class). */
export function cardSurface(className?: string) {
  return cn(
    "border border-slate-200/90 bg-white/95 shadow-sm ring-1 ring-slate-900/[0.03] ek-card-lift",
    className,
  );
}
