/** Task-based primary nav — each item is a real route, not a homepage anchor. */
export const HEADER_NAV = [
  { href: "/kits", label: "Kits" },
  { href: "/missions", label: "Missions" },
  { href: "/platform", label: "Platform" },
  { href: "/find-my-kit", label: "Find my kit" },
  { href: "/schools", label: "For schools" },
  { href: "/track", label: "Track" },
  { href: "/support", label: "Support" },
] as const;

export const FOOTER_PRIMARY = [
  { href: "/", label: "Home" },
  ...HEADER_NAV,
  { href: "/studio", label: "Studio" },
] as const;

/** Shortcuts for footer “Explore” — no duplicate CTAs. */
export const FOOTER_EXPLORE = [
  { href: "/find-my-kit", label: "Kit finder" },
  { href: "/missions", label: "Today’s mission" },
  { href: "/kits", label: "Browse kits" },
  { href: "/schools", label: "School pilot" },
] as const;
