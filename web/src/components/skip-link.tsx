export function SkipLink() {
  return (
    <a
      href="#top"
      className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-emerald-50 opacity-0 shadow-lg shadow-slate-900/30 ring-2 ring-emerald-500/50 transition-all focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      Skip to main content
    </a>
  );
}
