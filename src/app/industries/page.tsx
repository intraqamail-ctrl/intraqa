import type { Metadata } from "next";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { industries } from "@/data/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Domain-aware quality and security across BFSI, healthcare, SaaS, government, gaming and more.",
};

export default function Page() {
  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-28">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ industries /</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Sector context, <span className="text-[var(--brand)]">not generic playbooks</span>.
          </h1>
        </div>
      </section>
      <section className="section-cream py-20">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i, idx) => (
            <FadeIn key={i.name} delay={idx * 0.04}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{i.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
