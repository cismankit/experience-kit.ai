"use client";

import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProofUploadPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[140px] cursor-default flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-stone-50/80 px-4 py-6 text-center",
        className,
      )}
    >
      <ImagePlus className="h-8 w-8 text-slate-400" aria-hidden />
      <p className="mt-2 text-sm font-semibold text-slate-800">Drop a photo or clip</p>
      <p className="mt-1 text-xs text-slate-500">Preview only—uploads connect when your studio is live.</p>
    </div>
  );
}
