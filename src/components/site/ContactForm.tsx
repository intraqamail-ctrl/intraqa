"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setState("loading");
        setError(null);
        const fd = new FormData(e.currentTarget);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: String(fd.get("name") ?? ""),
              email: String(fd.get("email") ?? ""),
              company: String(fd.get("company") ?? ""),
              service: String(fd.get("service") ?? ""),
              message: String(fd.get("message") ?? ""),
            }),
          });
          const data = (await res.json()) as { error?: string };
          if (!res.ok) {
            throw new Error(data.error ?? "Something went wrong");
          }
          setState("done");
        } catch (err) {
          setState("error");
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      }}
      className="grid gap-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Full name" required />
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
        />
        <Field label="Company" name="company" placeholder="Company name" />
        <Field label="Service of interest" name="service" placeholder="e.g. VAPT, QA, AI testing" />
      </div>
      <label className="text-sm">
        <span className="mb-1.5 block font-medium text-foreground/90">How can we help?</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Briefly describe your goals, timelines, and stack."
          className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-[var(--brand)]"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "loading" || state === "done"}
          className="glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-cream transition hover:scale-[1.02] disabled:opacity-60"
        >
          {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {state === "done" ? "Sent   talk soon" : "Send message"}
          {state !== "done" && state !== "loading" && <ArrowRight className="h-4 w-4" />}
          {state === "done" && <CheckCircle2 className="h-4 w-4" />}
        </button>
        <span className="text-xs text-muted-foreground">We reply within 1 business day.</span>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm">
      <span className="mb-1.5 block font-medium text-foreground/90">
        {label}
        {required && <span className="text-[var(--brand)]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
      />
    </label>
  );
}
