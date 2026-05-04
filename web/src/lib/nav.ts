/** Primary chrome — works from any route (hash targets home). */
export const HEADER_NAV = [
  { href: "/kits", label: "Shop" },
  { href: "/track", label: "Track" },
  { href: "/orders", label: "Orders" },
  { href: "/#platform", label: "Platform" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const FOOTER_PRIMARY = [
  { href: "/", label: "Home" },
  ...HEADER_NAV,
  { href: "/#contact", label: "Support" },
] as const;

/** Legacy anchors on the home page (for deep links from docs). */
export const HOME_ANCHORS = [
  { href: "/#platform", label: "Platform" },
  { href: "/#kits-spotlight", label: "Featured kits" },
  { href: "/#approach", label: "Approach" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;
