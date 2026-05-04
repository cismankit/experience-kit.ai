"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md" : "border-slate-200/60 bg-white/90 backdrop-blur-md",
      )}
    >
      <div className="border-b border-slate-200/80 bg-slate-950 px-4 py-2.5 text-center text-xs font-medium leading-snug text-amber-100 sm:text-sm">
        <span className="text-amber-50/90">Future-ready learning, now made practical.</span>
      </div>
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
        <Link
          href="#top"
          className="flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-slate-950 shadow-sm">
            EK
          </span>
          <span className="hidden truncate sm:inline">ExperienceKit.ai</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" href="#contact" className="hidden xl:inline-flex">
            Join the Pilot
          </Button>
          <Button variant="outline" size="sm" href="#kits">
            Explore Kits
          </Button>
          <Button variant="primary" size="sm" href="#contact">
            Request a Demo
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[min(70vh,calc(100dvh-8rem))] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                className="w-full"
                href="#kits"
                onClick={() => setOpen(false)}
              >
                Explore Kits
              </Button>
              <Button variant="primary" className="w-full" href="#contact" onClick={() => setOpen(false)}>
                Request a Demo
              </Button>
              <Button variant="ghost" className="w-full" href="#contact" onClick={() => setOpen(false)}>
                Join the Pilot
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
