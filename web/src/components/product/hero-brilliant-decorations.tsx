/**
 * Headline-adjacent widgets (chart, plot, code, wave)—decorative only, no data.
 * Palette aligned to brand neutrals + one emerald accent for a calmer, premium read.
 */
export function HeroBrilliantDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* Mini bars — upper left */}
      <div className="ek-hero-drift-a absolute left-[2%] top-[8%] sm:left-[6%] sm:top-[12%]">
        <div className="rounded-xl border border-slate-200/90 bg-white/85 p-2.5 shadow-sm ring-1 ring-slate-900/[0.04] backdrop-blur-sm">
          <div className="flex h-12 items-end justify-center gap-1">
            <span className="w-2 rounded-sm bg-slate-200" style={{ height: "38%" }} />
            <span className="w-2 rounded-sm bg-emerald-500/90" style={{ height: "72%" }} />
            <span className="w-2 rounded-sm bg-slate-300" style={{ height: "52%" }} />
          </div>
          <p className="mt-1 text-center text-[9px] font-bold tabular-nums tracking-tight text-slate-600">71%</p>
        </div>
      </div>

      {/* Trend + points — upper right */}
      <div className="ek-hero-drift-b absolute right-[4%] top-[14%] sm:right-[10%] sm:top-[18%]">
        <div className="h-16 w-20 rounded-xl border border-slate-200/90 bg-white/85 p-2 shadow-sm ring-1 ring-slate-900/[0.04] backdrop-blur-sm">
          <svg viewBox="0 0 80 56" className="h-full w-full" fill="none">
            <path
              d="M8 44 Q28 8 72 16"
              stroke="rgb(100 116 139)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />
            {[
              [12, 38],
              [22, 28],
              [36, 22],
              [48, 18],
              [62, 20],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill="rgb(16 185 129)" opacity="0.85" />
            ))}
          </svg>
        </div>
      </div>

      {/* Code — lower left */}
      <div className="ek-hero-drift-c absolute bottom-[18%] left-[4%] hidden sm:block sm:bottom-[22%] sm:left-[8%]">
        <div className="rounded-xl border border-slate-700/90 bg-slate-950 px-2.5 py-2 font-mono text-[9px] leading-relaxed text-emerald-300/95 shadow-lg shadow-slate-900/25 ring-1 ring-white/10">
          <span className="text-violet-300/95">while</span>
          <span className="text-slate-500"> learning:</span>
          <br />
          <span className="text-slate-500"> </span>
          <span className="text-amber-200/90">build</span>
          <span className="text-slate-500">()</span>
        </div>
      </div>

      {/* Wave — lower right */}
      <div className="ek-hero-drift-a absolute bottom-[12%] right-[2%] sm:bottom-[16%] sm:right-[6%]">
        <div className="rounded-xl border border-slate-200/90 bg-white/85 px-2 py-2 shadow-sm ring-1 ring-slate-900/[0.04] backdrop-blur-sm">
          <svg viewBox="0 0 96 32" className="h-8 w-24" fill="none" aria-hidden>
            <path
              d="M4 20 Q16 4 32 20 T60 20 T92 12"
              stroke="rgb(14 165 233)"
              strokeWidth="2.25"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx="72" cy="14" r="3.5" fill="white" stroke="rgb(14 165 233)" strokeWidth="1.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}
