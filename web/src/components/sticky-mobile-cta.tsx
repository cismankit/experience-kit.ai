"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SHOW_AFTER = 160;
const LG = 1024;

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") return;
      setVisible(window.scrollY > SHOW_AFTER && window.innerWidth < LG);
    };
    const onResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= LG) setVisible(false);
      else onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 px-4 py-3 shadow-[0_-12px_40px_-28px_rgb(15_23_42/0.35)] backdrop-blur-md transition-transform duration-300 ease-out lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full opacity-0",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex w-full max-w-lg gap-2">
        <Button variant="primary" size="md" className="min-h-12 flex-1 shadow-md" href="/kits">
          Browse kits
        </Button>
        <Button variant="outline" size="md" className="min-h-12 flex-1 bg-white" href="/track">
          Track order
        </Button>
      </div>
    </nav>
  );
}
