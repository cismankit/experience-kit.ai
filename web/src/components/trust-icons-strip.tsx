import { Box, Cpu, Truck } from "lucide-react";
import { Container } from "@/components/container";

const items = [
  {
    label: "Manifested SKUs",
    text: "Every part listed before checkout",
    icon: Box,
  },
  {
    label: "AI + physical",
    text: "Scaffold without stealing the build",
    icon: Cpu,
  },
  {
    label: "Logistics aware",
    text: "Track + reorder in the same UI",
    icon: Truck,
  },
] as const;

export function TrustIconsStrip() {
  return (
    <section
      className="border-b border-slate-200/70 bg-white/80 py-4 backdrop-blur-sm sm:py-5"
      aria-label="ExperienceKit fulfillment highlights"
    >
      <Container>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {items.map((item) => (
            <li
              key={item.label}
              className="ek-card-lift flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-stone-50/80 px-4 py-3 sm:px-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-300 ring-1 ring-slate-900/10">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
                <span className="block text-xs text-slate-600">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
