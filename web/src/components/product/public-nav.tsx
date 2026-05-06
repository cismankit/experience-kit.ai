"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HEADER_NAV } from "@/lib/nav";
import { DEMO_AUTH_KEY } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authed, setAuthed] = useState(false);
  const showOrderPortal = process.env.NEXT_PUBLIC_ORDER_PORTAL === "1";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const read = () => setAuthed(typeof window !== "undefined" && window.localStorage.getItem(DEMO_AUTH_KEY) === "1");
    read();
    window.addEventListener("storage", read);
    window.addEventListener("ek-demo-auth", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("ek-demo-auth", read);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md" : "border-slate-200/60 bg-white/90 backdrop-blur-md",
      )}
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-center text-xs font-medium leading-snug text-slate-600 sm:text-sm">
        Physical kits · Daily missions · AI reflection supports the build—never replaces it
      </div>
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-900 sm:gap-3 sm:text-base"
        >
          <BrandMark />
          <span className="sr-only sm:not-sr-only sm:inline sm:truncate sm:text-lg sm:font-semibold sm:tracking-tight">
            ExperienceKit.ai
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {HEADER_NAV.map((item) => (
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
          {showOrderPortal ? (
            <Button variant="ghost" size="sm" href="/orders" className="hidden xl:inline-flex text-slate-600">
              Orders
            </Button>
          ) : null}
          <Button variant="outline" size="sm" href="/missions" className="bg-white">
            Start
          </Button>
          <Button variant="ghost" size="sm" href={authed ? "/studio" : "/studio"} className="text-slate-700">
            {authed ? "Studio" : "Sign in"}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
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
            {HEADER_NAV.map((item) => (
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
              <Button variant="primary" className="w-full" href="/find-my-kit" onClick={() => setOpen(false)}>
                Kit Finder
              </Button>
              <Button variant="outline" className="w-full bg-white" href="/missions" onClick={() => setOpen(false)}>
                Today&apos;s mission
              </Button>
              <Button variant="outline" className="w-full bg-white" href="/studio" onClick={() => setOpen(false)}>
                {authed ? "Studio" : "Sign in"}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
