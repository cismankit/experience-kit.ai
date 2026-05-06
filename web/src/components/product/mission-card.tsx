import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

export type MissionCardProps = {
  title: string;
  skill: string;
  minutes: number;
  difficulty: string;
  kitLabel: string;
  output: string;
  reflection: string;
  badge: string;
  className?: string;
};

export function MissionCard({
  title,
  skill,
  minutes,
  difficulty,
  kitLabel,
  output,
  reflection,
  badge,
  className,
}: MissionCardProps) {
  return (
    <article className={cn(cardSurface(), "flex h-full flex-col rounded-2xl p-5 shadow-sm", className)}>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <dl className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
        <div>
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Skill</dt>
          <dd className="mt-0.5 font-medium text-slate-800">{skill}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Time</dt>
          <dd className="mt-0.5 font-medium text-slate-800">{minutes} min</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Difficulty</dt>
          <dd className="mt-0.5 font-medium text-slate-800">{difficulty}</dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wider text-slate-500">Kit</dt>
          <dd className="mt-0.5 font-medium text-slate-800">{kitLabel}</dd>
        </div>
      </dl>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Output</p>
        <p className="mt-1 text-sm text-slate-700">{output}</p>
      </div>
      <div className="mt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Reflection</p>
        <p className="mt-1 text-sm text-slate-700">{reflection}</p>
      </div>
      <p className="mt-4 text-xs font-semibold text-amber-900">{badge}</p>
    </article>
  );
}
