import Link from "next/link";
import { FOOTER_PRIMARY, HOME_ANCHORS } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold text-white">ExperienceKit.ai</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Hands-on kits, guided missions, AI reflection, and portfolio-ready proof—built for families, learners,
              educators, and schools moving together into what&apos;s next.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" size="md" href="/kits">
                Browse kits
              </Button>
              <Button variant="outline" size="md" href="/#contact" className="border-slate-600 bg-transparent text-white hover:bg-white/10">
                Support
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Navigate</p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_PRIMARY.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Home</p>
              <ul className="mt-4 space-y-2.5">
                {HOME_ANCHORS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-300 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Orders & tracking</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="/track" className="text-sm text-slate-300 hover:text-white">
                    Track order
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-sm text-slate-300 hover:text-white">
                    Order history
                  </Link>
                </li>
                <li>
                  <Link href="/kits" className="text-sm text-slate-300 hover:text-white">
                    Kit catalog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Footer utilities" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link href="/#platform" className="text-slate-400 hover:text-white">
                Platform
              </Link>
              <Link href="/kits" className="text-slate-400 hover:text-white">
                Kits
              </Link>
              <Link href="/#daily-missions" className="text-slate-400 hover:text-white">
                Daily missions
              </Link>
              <Link href="/#faq" className="text-slate-400 hover:text-white">
                FAQ
              </Link>
              <Link href="/#contact" className="text-slate-400 hover:text-white">
                Support
              </Link>
            </nav>
            <p className="text-sm text-slate-500">Missions, reflection, proof—one journey.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-400">© {new Date().getFullYear()} ExperienceKit.ai. All rights reserved.</p>
            <p className="text-slate-500">Learn by doing. Build by exploring. Earn by applying.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
