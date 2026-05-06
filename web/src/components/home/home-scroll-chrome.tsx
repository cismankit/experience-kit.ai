"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HomeScrollChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (el.scrollTop / scrollable) * 100) : 0);
      setShowTop(el.scrollTop > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-1 bg-slate-200/40"
        aria-hidden
        role="presentation"
      >
        <div
          className={cn("h-full bg-gradient-to-r from-amber-500 to-orange-500", !reduce && "transition-[width] duration-200")}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showTop ? (
        <button
          type="button"
          className={cn(
            "fixed bottom-5 right-5 z-[90] inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/10 backdrop-blur-sm",
            "hover:border-amber-200 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
            "ek-card-lift",
          )}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
          Top
        </button>
      ) : null}
    </>
  );
}
