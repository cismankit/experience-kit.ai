import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  /** Use on dark backgrounds (e.g. slate hero bands). */
  tone?: "default" | "dark";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm",
            tone === "dark" ? "text-amber-300" : "text-amber-700",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance font-semibold tracking-tight text-slate-900",
          eyebrow ? "mt-3" : "mt-0",
          "text-[1.65rem] leading-snug sm:text-3xl lg:text-[2.125rem] lg:leading-tight",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <div
          className={cn(
            "mt-4 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-slate-300" : "text-slate-600",
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
