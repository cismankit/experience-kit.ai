"use client";

import { useEffect, useRef } from "react";
import { useHomePersona } from "@/components/home/persona-provider";
import type { KitFinderPersona } from "@/lib/kit-finder-logic";

const VALID = new Set<KitFinderPersona>(["parent", "school", "learner", "educator"]);

/** Reads `?persona=` on load; writes it only after that (avoids clobbering the URL before hydration). */
export function HomePersonaUrlSync() {
  const { persona, setPersona } = useHomePersona();
  const skipWriteOnce = useRef(true);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("persona");
    if (q && VALID.has(q as KitFinderPersona)) {
      setPersona(q as KitFinderPersona);
    }
  }, [setPersona]);

  useEffect(() => {
    if (skipWriteOnce.current) {
      skipWriteOnce.current = false;
      return;
    }
    const url = new URL(window.location.href);
    if (persona) url.searchParams.set("persona", persona);
    else url.searchParams.delete("persona");
    const next = `${url.pathname}${url.search}${window.location.hash}`;
    window.history.replaceState(null, "", next);
  }, [persona]);

  return null;
}
