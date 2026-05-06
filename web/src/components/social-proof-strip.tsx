import { Container } from "@/components/container";

/**
 * Lightweight credibility band — no fabricated logos; copy-only for production trust.
 */
export function SocialProofStrip() {
  return (
    <div className="border-b border-slate-200/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-3 text-center sm:py-3.5">
      <Container>
        <p className="text-xs font-medium tracking-wide text-amber-100/95 sm:text-sm">
          <span className="text-amber-50/95">Pilots & programs</span>
          <span className="mx-2 text-amber-200/40" aria-hidden>
            ·
          </span>
          <span>Homes, classrooms, labs, and makerspaces</span>
          <span className="mx-2 text-amber-200/40" aria-hidden>
            ·
          </span>
          <span className="text-amber-100/90">Built for real daily use at scale</span>
        </p>
      </Container>
    </div>
  );
}
