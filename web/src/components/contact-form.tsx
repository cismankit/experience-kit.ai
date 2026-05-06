"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  SUPPORT_CATEGORIES,
  getSupportCategory,
  type SupportCategoryId,
} from "@/lib/support-categories";

const ROLES = [
  "School Leader",
  "Teacher",
  "Parent",
  "Learner",
  "Partner",
  "Other",
] as const;

const SUCCESS =
  "Thanks for reaching out. We'll get back to you soon with the next steps.";

export type ContactIntent = "family" | "school" | "other";

export type ContactFormProps = {
  defaultIntent?: ContactIntent;
  /** Support hub: category field, optional order ID, no “interest” row. */
  variant?: "default" | "support";
  presetCategory?: SupportCategoryId | null;
};

export function ContactForm({
  defaultIntent = "family",
  variant = "default",
  presetCategory = null,
}: ContactFormProps) {
  const support = variant === "support";
  const formId = useId();
  const errorId = `${formId}-error`;
  const successRef = useRef<HTMLHeadingElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [intent, setIntent] = useState<ContactIntent>(defaultIntent);
  const [category, setCategory] = useState<SupportCategoryId | "">(() => presetCategory ?? "");

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  const catDef = getSupportCategory(category || undefined);
  const showOrderFields = support && (category === "order_issue" || category === "kit_replacement");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email) {
      setError("Please add your name and email so we can respond.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (support) {
      if (!category) {
        setError("Choose a support category so we can route your message.");
        return;
      }
      if (!message) {
        setError("Add a short message—we need context to help.");
        return;
      }
    }
    if (support) {
      setSubmitting(true);
      try {
        const payload = {
          requesterName: name,
          requesterEmail: email,
          role: String(data.get("role") ?? "") || undefined,
          category,
          message,
          orderNumber: String(data.get("order_id") ?? "") || undefined,
          workspaceSlug: "public-experiencekit",
        };
        const res = await fetch("/api/support/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          setError("Could not submit support ticket right now. Please try again.");
          return;
        }
      } catch {
        setError("Network error while submitting. Please retry.");
        return;
      } finally {
        setSubmitting(false);
      }
    }

    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50 to-white p-6 text-emerald-950 shadow-sm ring-1 ring-emerald-900/5 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80">
            <CheckCircle2 className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3
              ref={successRef}
              tabIndex={-1}
              className="text-lg font-semibold text-emerald-950 outline-none"
            >
              You’re all set
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">{SUCCESS}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-5 border-emerald-200 bg-white"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={onSubmit}
      noValidate
      aria-describedby={error ? errorId : undefined}
    >
      {!support ? (
        <div role="group" aria-labelledby={`${formId}-intent-label`} className="space-y-2">
          <p id={`${formId}-intent-label`} className="text-sm font-semibold text-slate-900">
            You’re writing as…
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "family" as const, label: "Family / learner" },
                { id: "school" as const, label: "School / org" },
                { id: "other" as const, label: "Other" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                  intent === opt.id
                    ? "border-amber-400 bg-amber-50 text-amber-950"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                )}
                aria-pressed={intent === opt.id}
                onClick={() => setIntent(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            {intent === "school"
              ? "Include cohort size, sites, and target pilot window if you can—we’ll mirror that language in our reply."
              : intent === "family"
                ? "Tell us who’s learning and where (home, class, club)—we’ll suggest a sensible starting kit."
                : "Share enough context that we can route you without a game of email tag."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor={`${formId}-category`}>Category</Label>
          <Select
            id={`${formId}-category`}
            name="support_category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value as SupportCategoryId | "")}
          >
            <option value="" disabled>
              Select a category
            </option>
            {SUPPORT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
          {catDef ? (
            <p className="text-xs leading-relaxed text-slate-500">{catDef.messageHint}</p>
          ) : (
            <p className="text-xs leading-relaxed text-slate-500">
              Pick the closest match—we’ll reroute if needed.
            </p>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder=""
            aria-invalid={error ? true : undefined}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            placeholder=""
            aria-invalid={error ? true : undefined}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            id="role"
            name="role"
            key={`${support ? category : intent}-role`}
            defaultValue={support && catDef ? catDef.defaultRole : intent === "school" ? "School Leader" : ""}
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="organization">School / organization (optional)</Label>
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            placeholder=""
          />
        </div>
      </div>

      {showOrderFields ? (
        <div className="space-y-2">
          <Label htmlFor="order_id">Order ID (optional)</Label>
          <Input id="order_id" name="order_id" autoComplete="off" placeholder="From your confirmation email" />
        </div>
      ) : null}

      {!support ? (
        <div className="space-y-2">
          <Label htmlFor="interest">Area of interest (optional)</Label>
          <Input id="interest" name="interest" placeholder="" />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required={support}
          placeholder={catDef?.messageHint ?? ""}
          rows={5}
        />
      </div>
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" size="lg" className="min-h-12 w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending..." : "Send message"}
        </Button>
        <p className="text-xs leading-relaxed text-slate-500 sm:max-w-xs sm:text-right">
          We’ll only use this to follow up—no spam.
        </p>
      </div>
    </form>
  );
}
