import { GraduationCap, Home, School } from "lucide-react";
import { Container } from "@/components/container";

const items = [
  {
    label: "Schools",
    text: "Classrooms & programs",
    icon: School,
  },
  {
    label: "Homes",
    text: "Guided family learning",
    icon: Home,
  },
  {
    label: "Learners",
    text: "Curiosity → capability",
    icon: GraduationCap,
  },
] as const;

export function TrustIconsStrip() {
  return (
    <section
      className="border-b border-slate-200/70 bg-white/80 py-4 backdrop-blur-sm sm:py-5"
      aria-label="Who ExperienceKit.ai is designed for"
    >
      <Container>
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
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
        <p className="mt-5 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
          Structured for practical, guided learning · Designed to turn curiosity into capability
        </p>
      </Container>
    </section>
  );
}
