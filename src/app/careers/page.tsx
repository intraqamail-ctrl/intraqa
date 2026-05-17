import type { Metadata } from "next";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { site } from "@/data/site";
import { ArrowRight, Mail } from "lucide-react";

const roles = [
  {
    title: "Senior SDET",
    type: "Full-time · Remote",
    body: "Own end-to-end automation for a flagship product team. 5+ years across UI + API + performance.",
  },
  {
    title: "Application Security Engineer",
    type: "Full-time · Remote",
    body: "Lead web/mobile/API pentests. OSCP / OSWE preferred. CERT-In experience a plus.",
  },
  {
    title: "AI/ML Test Engineer",
    type: "Full-time · Remote",
    body: "Validate ML models, red-team LLM apps and build evals. Python + understanding of model internals.",
  },
  {
    title: "Cloud Security Consultant",
    type: "Full-time · Remote",
    body: "AWS/Azure/GCP security assessments and DevSecOps engagements.",
  },
  {
    title: "QA Engineer (mid-level)",
    type: "Full-time · Remote",
    body: "Manual + exploratory + light automation. Strong product instincts.",
  },
];

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join an SDET-first team. We hire senior testers, security engineers and AI testers.",
};

export default function Page() {
  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-32">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ careers /</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Build the team you <span className="text-[var(--brand)]">always wanted to be on</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-cream/70">
            We're remote-first, deeply technical, and obsessed with craft. If you find joy in
            finding bugs other people miss   we should talk.
          </p>
          <a
            href={`mailto:${site.emails.careers}`}
            className="glow-ring mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-cream hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" /> {site.emails.careers}
          </a>
        </div>
      </section>

      <section id="life" className="section-cream py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="/ life at IntraQA /" title="The good parts (and we mean it)." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Async by default",
                b: "Real focus time. Meetings only when they earn their place on the calendar.",
              },
              {
                t: "Senior bench",
                b: "Every engineer here has shipped   you'll learn from peers, not over them.",
              },
              {
                t: "Real ownership",
                b: "You'll own outcomes, not tickets. Engagements end when clients say so   and they rarely do quickly.",
              },
              { t: "Generous learning budget", b: "Certifications, courses, conferences   on us." },
              {
                t: "Open-source time",
                b: "Time carved out every sprint to give back to the tooling we depend on.",
              },
              { t: "Equity for early hires", b: "Build something with us, own a slice of it." },
            ].map((c, i) => (
              <FadeIn key={c.t} delay={i * 0.04}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="font-display text-lg font-semibold">{c.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream pb-24">
        <div className="container-x">
          <SectionHeading eyebrow="/ open roles /" title="Currently hiring." />
          <ul className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {roles.map((r) => (
              <li
                key={r.title}
                className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="font-display text-lg font-semibold tracking-tight">{r.title}</div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {r.type}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{r.body}</p>
                </div>
                <a
                  href={`mailto:${site.emails.careers}?subject=Application   ${encodeURIComponent(r.title)}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream hover:scale-[1.02]"
                >
                  Apply <ArrowRight className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
