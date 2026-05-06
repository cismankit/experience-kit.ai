/** Primary chrome — works from any route (hash targets home). */
export const HEADER_NAV = [
  { href: "/kits", label: "Kits" },
  { href: "/#daily-missions", label: "Daily Missions" },
  { href: "/#kit-finder", label: "Kit Finder" },
  { href: "/#schools", label: "For Schools" },
  { href: "/track", label: "Track Order" },
  { href: "/#contact", label: "Support" },
] as const;

export const FOOTER_PRIMARY = [
  { href: "/", label: "Home" },
  ...HEADER_NAV,
  { href: "/orders", label: "Orders" },
  { href: "/#faq", label: "FAQ" },
] as const;

/** Legacy anchors on the home page (for deep links from docs). */
export const HOME_ANCHORS = [
  { href: "/#choose-journey", label: "Choose your journey" },
  { href: "/#daily-missions", label: "Daily missions" },
  { href: "/#kit-finder", label: "Kit Finder" },
  { href: "/#dashboard-preview", label: "Learner preview" },
  { href: "/#portfolio-proof", label: "Portfolio proof" },
  { href: "/#platform", label: "Platform" },
  { href: "/#kits-spotlight", label: "Featured kits" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;
