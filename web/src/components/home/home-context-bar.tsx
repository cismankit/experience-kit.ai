"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/container";
import { useHomePersona } from "@/components/home/persona-provider";
import type { KitFinderPersona } from "@/lib/kit-finder-logic";

const LABEL: Record<KitFinderPersona, string> = {
  parent: "Parents",
  school: "Schools",
  learner: "Learners",
  educator: "Educators",
};

export function HomeContextBar() {
  const { persona, setPersona } = useHomePersona();
  if (!persona) return null;

  return (
    <div className="border-b border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50">
      <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="text-sm text-slate-800">
          <span className="font-semibold text-slate-900">Showing:</span>{" "}
          <span className="rounded-full bg-white px-2.5 py-0.5 text-sm font-semibold text-amber-950 ring-1 ring-amber-200">
            {LABEL[persona]}
          </span>{" "}
          <span className="text-slate-600">Finder + featured order follow this choice.</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/find-my-kit"
            className="text-sm font-semibold text-amber-900 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Open finder
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            onClick={() => setPersona(null)}
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear
          </button>
        </div>
      </Container>
    </div>
  );
}
