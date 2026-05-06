import { cn } from "@/lib/utils";

/** Simple kit / stack mark—no letters, no square frame (stroke-only). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9 shrink-0 text-slate-900 sm:h-10 sm:w-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 14.5 20 8l12 6.5V26L20 32 8 26V14.5Z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path d="M8 14.5 20 21 32 14.5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <circle cx="20" cy="26.5" r="2.75" className="fill-emerald-500" stroke="none" />
    </svg>
  );
}
