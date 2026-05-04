"use client";

import { cn } from "@/lib/utils";

type AmbientOrbsProps = {
  className?: string;
  /** Lower intensity behind dense UI. */
  subtle?: boolean;
};

export function AmbientOrbs({ className, subtle }: AmbientOrbsProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "ek-orb ek-orb-a absolute -left-[12%] top-[8%] h-[min(52vw,28rem)] w-[min(52vw,28rem)] rounded-full bg-amber-400/35 blur-3xl",
          subtle && "opacity-60",
        )}
      />
      <div
        className={cn(
          "ek-orb ek-orb-b absolute -right-[8%] bottom-[0%] h-[min(48vw,26rem)] w-[min(48vw,26rem)] rounded-full bg-orange-500/25 blur-3xl",
          subtle && "opacity-50",
        )}
      />
      <div className="ek-orb ek-orb-c absolute left-[35%] top-[40%] h-[min(36vw,18rem)] w-[min(36vw,18rem)] rounded-full bg-sky-400/15 blur-3xl" />
    </div>
  );
}
