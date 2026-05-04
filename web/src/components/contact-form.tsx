"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

export function ContactForm() {
  const formId = useId();
  const errorId = `${formId}-error`;
  const successRef = useRef<HTMLHeadingElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || !email) {
      setError("Please add your name and email so we can respond.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Alex Rivera"
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
            placeholder="you@school.org"
            aria-invalid={error ? true : undefined}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select id="role" name="role" defaultValue="" required>
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
          <Label htmlFor="organization">School / Organization</Label>
          <Input
            id="organization"
            name="organization"
            autoComplete="organization"
            placeholder="Optional"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="interest">Area of Interest</Label>
        <Input
          id="interest"
          name="interest"
          placeholder="e.g., classroom rollout, home learning, pilot"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="What outcome are you chasing—and what should we know before we reply?"
        />
      </div>
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" size="lg" className="min-h-12 w-full sm:w-auto">
          Request a Demo
        </Button>
        <p className="text-xs leading-relaxed text-slate-500 sm:max-w-xs sm:text-right">
          We’ll only use this to follow up on your request—no spam.
        </p>
      </div>
    </form>
  );
}
