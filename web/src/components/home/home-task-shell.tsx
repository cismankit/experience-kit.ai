"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

export type HomeLane = "discover" | "schools";

export function HomeTaskShell({
  discover,
  schools,
}: {
  discover: ReactNode;
  schools: ReactNode;
}) {
  const [lane, setLane] = useState<HomeLane>("discover");

  useLayoutEffect(() => {
    const applyHash = () => {
      setLane(window.location.hash === "#schools" ? "schools" : "discover");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const toDiscover = () => {
      setLane("discover");
      if (window.location.hash === "#schools") {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    };
    window.addEventListener("ek-home-discover", toDiscover);
    return () => window.removeEventListener("ek-home-discover", toDiscover);
  }, []);

  const goDiscover = () => {
    setLane("discover");
    const base = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", base);
  };

  const goSchools = () => {
    setLane("schools");
    const base = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", `${base}#schools`);
  };

  return (
    <>
      <nav
        aria-label="Choose home experience"
        className="sticky top-[6.75rem] z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md sm:top-[7rem]"
      >
        <Container className="flex gap-2 py-2.5">
          <button
            type="button"
            className={cn(
              "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:flex-none sm:px-5",
              lane === "discover"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-stone-100 text-slate-700 hover:bg-stone-200/90",
            )}
            aria-pressed={lane === "discover"}
            onClick={goDiscover}
          >
            Discover kits
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:flex-none sm:px-5",
              lane === "schools"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "bg-stone-100 text-slate-700 hover:bg-stone-200/90",
            )}
            aria-pressed={lane === "schools"}
            onClick={goSchools}
          >
            For schools
          </button>
        </Container>
      </nav>

      <div id="home-discover-lane" hidden={lane !== "discover"}>
        {discover}
      </div>
      <div id="home-schools-lane" hidden={lane !== "schools"}>
        {schools}
      </div>
    </>
  );
}
