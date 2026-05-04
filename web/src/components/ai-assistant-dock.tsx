"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; text: string };

const STORAGE_SESSION = "ek-assistant-session-opened";
const SUGGESTIONS = [
  "Which kit for a middle school lab?",
  "How do I track an order?",
  "District rollout — what do you need from us?",
] as const;

export function AiAssistantDock() {
  const reduce = useReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "ExperienceKit copilot online. Ask about kits, logistics, or pilots—I answer in plain language.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollEnd();
  }, [messages, open, scrollEnd]);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(STORAGE_SESSION)) return;
      const t = window.setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem(STORAGE_SESSION, "1");
      }, 1100);
      return () => window.clearTimeout(t);
    } catch {
      /* private mode */
    }
  }, [reduce]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setPending(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        typeof data.reply === "string"
          ? data.reply
          : data.error ?? "Something went wrong—try again or use Support.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Network hiccup—retry in a moment or email through Support." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[60] flex max-w-[100vw] flex-col items-end p-4 sm:p-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            id={panelId}
            role="dialog"
            aria-label="AI assistant"
            initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/20 sm:w-[26rem]"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white px-4 py-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-300 shadow-inner">
                  <Sparkles className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">Kit copilot</p>
                  <p className="truncate text-xs text-slate-500">Logistics · kits · pilots</p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              ref={listRef}
              className="max-h-[min(50dvh,20rem)] space-y-3 overflow-y-auto px-4 py-3 text-sm"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${i}-${msg.role}`}
                  className={cn(
                    "rounded-xl px-3 py-2 leading-relaxed",
                    msg.role === "user"
                      ? "ml-6 bg-amber-50 text-slate-900 ring-1 ring-amber-200/80"
                      : "mr-4 bg-slate-50 text-slate-700 ring-1 ring-slate-200/80",
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {pending ? (
                <p className="text-xs font-medium text-slate-400">Thinking…</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-slate-100 bg-stone-50/80 px-3 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-amber-300 hover:text-slate-900"
                  onClick={() => send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-slate-100 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              <label htmlFor="ek-assistant-input" className="sr-only">
                Message
              </label>
              <input
                id="ek-assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="min-h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-amber-500/0 transition-shadow focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-300 shadow-md hover:bg-slate-800 disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-900/25 ring-2 ring-white/80 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        aria-label={open ? "Close assistant" : "Open AI assistant"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" strokeWidth={2} />}
      </button>
    </div>
  );
}
