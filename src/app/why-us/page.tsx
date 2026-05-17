import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { stats, sellingPoints } from "@/data/site";

export const metadata: Metadata = {
  title: "Why IntraQA",
  description:
    "Why teams that ship fast choose IntraQA for quality engineering, cybersecurity and AI/ML testing.",
};

export default function Page() {
  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-32">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ why IntraQA /</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            The QA team you wish you'd hired{" "}
            <span className="text-[var(--brand)]">two quarters ago</span>.
          </h1>
        </div>
      </section>

      <section className="section-cream py-20">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-4xl font-semibold text-[var(--brand)]">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium">{s.label}</div>
                <p className="mt-2 text-xs text-muted-foreground">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-cream py-10 md:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="/ how we're different /"
            title="Four things you'll feel in week one."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {sellingPoints.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05}>
                <div className="rounded-3xl border border-border bg-card p-8">
                  <div className="font-mono text-xs text-[var(--brand)]">0{i + 1}</div>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-20 text-cream md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading
            eyebrow="/ promise /"
            title={
              <>
                What you can <span className="text-[var(--amber-glow)]">expect from us</span>.
              </>
            }
          />
          <ul className="space-y-3">
            {[
              "Daily updates from the engineer doing the work   not a PM relay.",
              "Findings ranked by business impact, not just CVSS.",
              "A re-test included with every security engagement.",
              "Hand-off documentation your future team will thank us for.",
              "An NDA before we see a single line of your code.",
              "A real human on a real call when something blocks you.",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 rounded-xl border border-cream/10 bg-cream/5 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--amber-glow)]" />
                <span className="text-sm">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-brand py-16">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h3 className="font-display text-3xl font-semibold md:text-4xl">
            Bring us in for the next release.
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink hover:scale-[1.02]"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
