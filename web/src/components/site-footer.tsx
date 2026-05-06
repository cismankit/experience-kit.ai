import Link from "next/link";
import { FOOTER_EXPLORE, FOOTER_PRIMARY } from "@/lib/nav";
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
              Hands-on kits, guided missions, AI reflection, and proof you can point to—built for learners, families,
              and schools on a shared journey.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" size="md" href="/find-my-kit">
                Find my kit
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/missions"
                className="border-slate-600 bg-transparent text-white hover:bg-white/10"
              >
                Missions
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
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_EXPLORE.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-300 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Orders</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="/track" className="text-sm text-slate-300 hover:text-white">
                    Track a shipment
                  </Link>
                </li>
                <li>
                  <Link href="/support?topic=order_issue" className="text-sm text-slate-300 hover:text-white">
                    Order help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Footer utilities" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link href="/kits" className="text-slate-400 hover:text-white">
                Kits
              </Link>
              <Link href="/missions" className="text-slate-400 hover:text-white">
                Missions
              </Link>
              <Link href="/schools" className="text-slate-400 hover:text-white">
                Schools
              </Link>
              <Link href="/support" className="text-slate-400 hover:text-white">
                Support
              </Link>
            </nav>
            <p className="text-sm text-slate-500">Build. Reflect. Prove progress.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-400">© {new Date().getFullYear()} ExperienceKit.ai. All rights reserved.</p>
            <p className="text-slate-500">A learning OS for physical kits.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
