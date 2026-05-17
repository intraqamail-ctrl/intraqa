import type { Metadata } from "next";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "We're an SDET-first team building quality and security into how modern software is shipped.",
};

export default function Page() {
  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-32">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ about /</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            We build software that <span className="text-[var(--brand)]">won't break</span>   and{" "}
            <span className="text-[var(--amber-glow)]">won't be broken</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-cream/70">
            IntraQA is a remote-first SDET house. Senior testers, ethical hackers and AI engineers  
            embedded with product teams that care about how, not just what, they ship.
          </p>
        </div>
      </section>

      <section className="section-cream py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="/ story /"
            title={
              <>
                Started by the people{" "}
                <span className="text-[var(--brand)]">who used to be your QA team</span>.
              </>
            }
          />
          <div className="space-y-4 text-base text-muted-foreground">
            <p>
              IntraQA exists because too many companies treat quality engineering like an
              afterthought   a tax paid at the end of a sprint, by whoever has bandwidth.
            </p>
            <p>
              We've been the in-house QA lead. The lone security engineer. The poor SDET trying to
              keep up with three release trains. We started IntraQA so product teams could hire the
              team they always wished they had   without the headcount.
            </p>
            <p>
              Our engineers don't just run scripts. They write strategy, set up tooling, sit in your
              sprint reviews and ship deliverables your auditors and your customers can read.
            </p>
          </div>
        </div>
      </section>

      <section className="section-dark py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="/ by the numbers /" title={<>Outcomes, not output.</>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.05}>
                <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
                  <div className="font-display text-4xl font-semibold text-[var(--amber-glow)]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-cream">{s.label}</div>
                  <p className="mt-2 text-xs text-cream/70">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
