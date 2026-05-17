"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, X, Send } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string; cta?: { label: string; href: string }[] };

const quickReplies = [
  "Quality engineering before our next ship",
  "Scope a penetration test",
  "LLM security & governance",
  "Compliance & attestations",
];

function reply(input: string): Msg {
  const t = input.toLowerCase();
  if (/(pen|pentest|vapt|hack|security|cyber)/.test(t))
    return {
      from: "bot",
      text: "Our CERT-In empanelled team runs VAPT, web/mobile/API pentests and cloud security assessments. Want me to point you to the right service?",
      cta: [
        { label: "VAPT", href: "/services/vapt" },
        { label: "Web App Pentest", href: "/services/web-app-pentest" },
        { label: "Talk to sales", href: "/contact" },
      ],
    };
  if (/(qa|test|automation|quality)/.test(t))
    return {
      from: "bot",
      text: "We cover QA & testing across web, mobile, API, performance and accessibility   manual rigor plus AI-assisted automation.",
      cta: [
        { label: "QA & Testing", href: "/services/qa-and-testing" },
        { label: "Test Automation", href: "/services/ai-powered-test-automation" },
      ],
    };
  if (/(ai|ml|llm|model)/.test(t))
    return {
      from: "bot",
      text: "We validate ML models, secure LLM apps against prompt injection, and align to ISO 42001 / EU AI Act.",
      cta: [
        { label: "LLM Security", href: "/services/llm-security" },
        { label: "AI/ML Governance", href: "/services/ai-ml-governance-testing" },
      ],
    };
  if (/(price|cost|quote|budget)/.test(t))
    return {
      from: "bot",
      text: "Engagements start from compact 2-week sprints. The fastest way to a number is a 20-min scoping call.",
      cta: [{ label: "Book a call", href: "/contact" }],
    };
  if (/(hire|career|job)/.test(t))
    return {
      from: "bot",
      text: "We're hiring SDETs, security engineers and AI testers. Send your CV to career@intraqa.com.",
      cta: [{ label: "Careers", href: "/careers" }],
    };
  if (/(contact|sales|email|talk|book a call)/.test(t))
    return {
      from: "bot",
      text: "Easiest is the contact form   we reply within one business day.",
      cta: [{ label: "Contact", href: "/contact" }],
    };
  if (/(compliance|soc\s*2|soc2|gdpr|hipaa|iso\s*42001|iso\s*27001|attestation)/.test(t))
    return {
      from: "bot",
      text: "We map testing programmes to SOC 2 readiness, GDPR-style privacy posture, HIPAA control evidence and ISO-aligned security baselines alongside delivery.",
      cta: [
        { label: "Compliance programme", href: "/compliance" },
        { label: "Contact", href: "/contact" },
      ],
    };
  if (/(hi|hello|hey)/.test(t))
    return {
      from: "bot",
      text: "Hi! I can help you find the right service, share pricing, or connect you to a human. What are you exploring?",
    };
  return {
    from: "bot",
    text: "I can point you to QA, cybersecurity, AI/ML testing, or route you to a human tap a shortcut below.",
  };
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "I'm here to help with QA, security, and AI-led testing or use a shortcut below.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, reply(text)]), 450);
  };

  return (
    <>
      <div className="pointer-events-auto fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-[125] max-sm:bottom-4 max-sm:right-4">
        <div className="group relative">
          {!open && (
            <div
              className="pointer-events-none absolute bottom-1/2 right-[calc(100%+0.625rem)] z-0 hidden min-[360px]:block translate-x-1 translate-y-1/2 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:z-[126] group-hover:translate-x-0 group-hover:opacity-100"
              role="tooltip"
            >
              <span className="inline-block whitespace-nowrap rounded-lg border border-cream/[0.12] bg-[var(--ink)]/95 px-2.5 py-1.5 text-[11px] font-medium tracking-tight text-cream shadow-md backdrop-blur-sm">
                IntraQA Assistant
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open chat"
            title="Open IntraQA chat"
            aria-expanded={open}
            className="glow-ring relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-cream shadow-2xl transition hover:scale-[1.05] max-sm:h-12 max-sm:w-12"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={2} aria-hidden />
            ) : (
              <Bot className="h-[1.35rem] w-[1.35rem]" strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed bottom-[calc(7rem+env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] top-[max(8.25rem,env(safe-area-inset-top,0px)+5.75rem)] z-[125] flex w-[min(380px,calc(100vw-1.75rem))] max-sm:right-4 flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl max-sm:top-[max(7.5rem,env(safe-area-inset-top,0px)+4.75rem)] max-sm:w-[calc(100vw-2rem)]">
          <div className="flex items-center gap-3 border-b border-border/80 bg-[var(--ink)] p-4 text-cream">
            <div
              className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-[var(--brand-foreground)]"
              aria-hidden
            >
              <Bot className="size-[1.0625rem]" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight tracking-tight">
                Intra · IntraQA
              </div>
              <div className="text-xs text-cream/70">Avg reply within one business day</div>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "bg-[var(--brand)] text-cream" : "bg-muted text-foreground"}`}
                >
                  {m.text}
                  {m.cta && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.cta.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:border-[var(--brand)]"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/80 hover:border-[var(--brand)] hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 rounded-full border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-[var(--brand)]"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand)] text-cream hover:opacity-90"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
