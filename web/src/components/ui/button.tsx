import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-[box-shadow,background-color,border-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-emerald-600 text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-500/35 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-900/25",
  secondary:
    "bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-1 ring-white/10 hover:bg-slate-800 hover:shadow-lg",
  outline:
    "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-800 hover:bg-slate-100 hover:text-slate-950",
} as const;

const sizes = {
  sm: "h-9 min-h-9 px-3.5 text-sm",
  md: "h-11 min-h-11 px-5 text-sm",
  lg: "h-12 min-h-12 px-6 text-base",
} as const;

type BaseProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const cls = cn(base, variants[variant], sizes[size], className);
    if ("href" in props && typeof props.href === "string") {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={cls}
          {...(props as ButtonAsLink)}
        />
      );
    }
    const p = props as ButtonAsButton;
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type={p.type ?? "button"}
        className={cls}
        {...p}
      />
    );
  },
);
Button.displayName = "Button";
