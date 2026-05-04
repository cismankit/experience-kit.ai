import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold text-white">ExperienceKit.ai</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              AI-powered kits that turn learning into hands-on experience.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-amber-300/90">
              Powered by a future-ready learning vision.
            </p>
            <Button variant="primary" size="md" className="mt-6" href="#contact">
              Request a Demo
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Navigate
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Get started
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="#contact" className="text-sm text-slate-300 hover:text-white">
                    Request a Demo
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-slate-300 hover:text-white">
                    Join the Pilot
                  </Link>
                </li>
                <li>
                  <Link href="#kits" className="text-sm text-slate-300 hover:text-white">
                    Explore Kits
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-slate-300 hover:text-white">
                    Talk to Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Product
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href="#overview" className="text-sm text-slate-300 hover:text-white">
                    Product overview
                  </Link>
                </li>
                <li>
                  <Link href="#experience" className="text-sm text-slate-300 hover:text-white">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#approach" className="text-sm text-slate-300 hover:text-white">
                    Approach
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-sm text-slate-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Footer utilities" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link href="#overview" className="text-slate-400 hover:text-white">
                Product
              </Link>
              <Link href="#kits" className="text-slate-400 hover:text-white">
                Kits
              </Link>
              <Link href="#approach" className="text-slate-400 hover:text-white">
                Approach
              </Link>
              <Link href="#faq" className="text-slate-400 hover:text-white">
                FAQ
              </Link>
              <Link href="#contact" className="text-slate-400 hover:text-white">
                Contact
              </Link>
            </nav>
            <p className="text-sm text-slate-500">Ready when you are—tell us what you’re building.</p>
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
