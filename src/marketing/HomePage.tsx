"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bug,
  Cloud,
  Lock,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { Eyebrow, SectionHeading, Marquee, FadeIn } from "@/components/site/bits";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { serviceCategories } from "@/data/services";
import {
  stats,
  trustLogos,
  recognitions,
  hashtags,
  hashtagsSec,
  testimonials,
  sellingPoints,
  industries,
} from "@/data/site";

const categoryIcons: Record<string, typeof Bug> = {
  "quality-engineering": Bug,
  cybersecurity: ShieldCheck,
  "ai-ml-testing": Sparkles,
  "test-automation": Zap,
  "next-gen-testing": Cpu,
  "cloud-services": Cloud,
};

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <WhyUs />
      <StatsBand />
      <USP />
      <Hashtags />
      <Testimonials />
      <IndustriesSection />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-math relative flex min-h-[68svh] flex-col overflow-hidden text-cream sm:min-h-[72svh] lg:min-h-[min(82svh,940px)]">
      <HeroBackdropVideo />
      <div className="hero-math-grid" aria-hidden />
      {/* Light schematic frames   math / layout sheet */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute left-[4%] top-[10%] hidden h-24 w-[min(38vw,15.5rem)] border border-cream/[0.07] sm:block lg:left-[5%] lg:top-[12%] lg:h-28 lg:w-[min(30vw,17.5rem)]" />
        <div className="absolute bottom-[12%] right-[3%] h-[4.5rem] w-[min(44vw,11rem)] border border-cream/[0.05] sm:bottom-[14%] sm:h-24 sm:w-[min(36vw,13.5rem)] lg:right-[5%]" />
        <div className="absolute right-[8%] top-[18%] h-8 w-8 border-l border-t border-cream/[0.09] sm:right-[10%] sm:top-[20%] lg:h-10 lg:w-10" />
        <div className="absolute bottom-[28%] left-[8%] h-8 w-8 border-b border-r border-cream/[0.08] sm:bottom-[30%] lg:left-[10%]" />
      </div>
      <div className="container-x relative z-[1] grid flex-1 items-center gap-12 py-[4.75rem] sm:gap-14 sm:py-28 lg:grid-cols-[1.05fr_0.92fr] lg:gap-[4.25rem] lg:py-32 xl:gap-24 xl:py-36">
        <div className="mx-auto max-w-xl lg:mx-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="text-balance font-display text-[2.45rem] font-bold leading-[1.05] tracking-tight sm:text-[2.7rem] md:text-[3rem] lg:text-[3.4rem] lg:leading-[1.02] xl:text-[3.85rem]"
          >
            Engineer Confidence.
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-rose-500 bg-clip-text text-transparent">
              Secure Everything.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-cream/78 sm:text-[1rem] lg:mt-5 lg:max-w-xl lg:text-[1.0625rem]"
          >
            The external quality engineering & security powerhouse for modern companies. Senior SDETs
            and ethical hackers paired with AI-accelerated workflows, so you ship with evidence,
            resilience, and calm.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-10 flex flex-wrap items-center gap-3.5 sm:mt-11 sm:gap-4"
          >
            <Link
              href="/contact"
              className="glow-ring group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-cream transition hover:scale-[1.02] sm:px-7 sm:text-base sm:py-3.5"
            >
              Let's Begin Today{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-6 py-3 text-sm font-medium text-cream backdrop-blur transition hover:bg-cream/10 sm:px-7 sm:text-base sm:py-3.5"
            >
              Explore Services
            </Link>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2.5 text-[12px] text-cream/60 sm:mt-11 sm:text-[0.9375rem] lg:mt-12">
            {[
              "99% test coverage",
              "$250M+ saved",
              "500+ vulns remediated",
              "120+ products shipped",
            ].map((b) => (
              <div key={b} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--amber-glow)]" />
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Right: video panel substitute   animated bug-radar visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-cream/[0.09] bg-cream/[0.03] sm:max-w-xl lg:mx-0 lg:aspect-auto lg:h-[min(54svh,460px)] lg:max-w-none xl:h-[min(60svh,540px)]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=70"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-7173/1080p.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--ink)]/40 via-transparent to-[var(--ink)]/30" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-44 w-44 sm:h-48 sm:w-48 lg:h-44 lg:w-44 xl:h-52 xl:w-52">
              <div
                className="absolute inset-0 animate-ping rounded-full border border-[var(--amber-glow)]/40"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-4 animate-ping rounded-full border border-[var(--amber-glow)]/60"
                style={{ animationDuration: "2.5s" }}
              />
              <div className="absolute inset-[1.125rem] grid place-items-center rounded-full bg-[var(--ink)]/70 backdrop-blur sm:inset-10 lg:inset-[0.875rem]">
                <Bug className="h-9 w-9 text-[var(--amber-glow)] sm:h-10 sm:w-10 lg:h-9 lg:w-9 xl:h-11 xl:w-11" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-cream/10 bg-[var(--ink)]/70 px-2.5 py-1.5 text-[10px] text-cream/80 backdrop-blur sm:text-xs lg:bottom-2.5 lg:left-2.5 lg:right-2.5 lg:py-2">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--amber-glow)]" /> Live
              scan
            </span>
            <span className="font-mono">CVE-2025-INTRA · Critical</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="section-dark border-t border-border py-10 text-cream">
      <div className="container-x mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.18em] text-cream/60">
          Trusted by teams shipping at speed
        </div>
        <div className="flex flex-wrap gap-2">
          {recognitions.map((r) => (
            <span key={r} className="pill">
              {r}
            </span>
          ))}
        </div>
      </div>
      <Marquee
        items={trustLogos.map((l) => (
          <span
            key={l}
            className="font-display text-2xl font-semibold tracking-tight text-cream/50 hover:text-cream"
          >
            {l}
          </span>
        ))}
      />
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="section-cream py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="/ services /"
            title={
              <>
                The unique advantages of{" "}
                <span className="text-[var(--brand)]">working with us</span>.
              </>
            }
            body="One partner across QA, cybersecurity, AI/ML testing and cloud. Six practice areas, dozens of services, one accountable team."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-[var(--brand)]"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((cat, idx) => {
            const Icon = categoryIcons[cat.slug] ?? Bug;
            return (
              <FadeIn key={cat.slug} delay={idx * 0.05}>
                <Link
                  href={`/services/${cat.items[0].slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-[var(--brand)]/60 hover:shadow-2xl hover:shadow-[var(--brand)]/10"
                >
                  <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[var(--brand)]/8 blur-2xl transition group-hover:bg-[var(--brand)]/20" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--ink)] text-cream">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {cat.items.slice(0, 3).map((i) => (
                        <span key={i.slug} className="pill text-[10px]">
                          {i.title.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{cat.blurb}</p>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand)]">
                      Explore{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="section-dark relative overflow-hidden py-24 md:py-32">
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="/ why IntraQA /"
            title={
              <>
                Spot the bugs. <span className="text-[var(--brand)]">Secure the gaps.</span>
              </>
            }
            body="Every bug has a story   and we make sure it doesn't ruin yours. We find, validate and remediate issues and vulnerabilities before they hit production, your users or your reputation."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/why-us"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:scale-[1.02]"
            >
              See how <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-2.5 text-sm font-medium text-cream hover:bg-cream/10"
            >
              Browse services
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.slice(0, 4).map((s) => (
            <FadeIn key={s.label}>
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6 backdrop-blur">
                <div className="font-display text-4xl font-semibold tracking-tight text-[var(--amber-glow)] md:text-5xl">
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
  );
}

function StatsBand() {
  return (
    <section className="section-brand py-12">
      <div className="container-x">
        <Marquee
          items={[
            <Lock key="1" className="h-5 w-5" />,
            "Zero-trust by default",
            <Sparkles key="2" className="h-5 w-5" />,
            "AI-assisted automation",
            <Bug key="3" className="h-5 w-5" />,
            "99% defect catch-rate",
            <ShieldCheck key="4" className="h-5 w-5" />,
            "CERT-In empanelled",
            <Cpu key="5" className="h-5 w-5" />,
            "LLM red-teaming",
            <Cloud key="6" className="h-5 w-5" />,
            "Multi-cloud certified",
          ].map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight"
            >
              {c}
            </span>
          ))}
        />
      </div>
    </section>
  );
}

function USP() {
  return (
    <section className="section-cream py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="/ how we work /"
          title={
            <>
              Built like a senior team  {" "}
              <span className="text-[var(--brand)]">priced like a partner</span>.
            </>
          }
          body="Four things make IntraQA different from the staffing-shop you've worked with before."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className="relative h-full rounded-3xl border border-border bg-card p-6">
                <div className="font-mono text-xs text-[var(--brand)]">0{i + 1}</div>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hashtags() {
  const ribbonItem =
    "flex min-h-[2.85rem] items-center whitespace-nowrap font-sans text-[1rem] font-bold tracking-[-0.02em] text-white md:min-h-[3.35rem] md:text-lg lg:min-h-[3.65rem]";

  const qaRow = hashtags.map((h) => (
    <span key={h} className={ribbonItem}>
      {h}
    </span>
  ));
  const secRow = hashtagsSec.map((h) => (
    <span key={h} className={ribbonItem}>
      {h}
    </span>
  ));

  const mastGap = "px-5 md:px-9";

  return (
    <section className="relative overflow-hidden bg-cream py-[5.75rem] md:py-[7.25rem]" aria-label="Themes we work across">
      <div className="relative mx-auto min-h-[18.5rem] w-full md:min-h-[22.5rem]">
        {/* QA / automation ribbon (rear, deep crimson) */}
        <div className="absolute left-1/2 top-[6%] z-0 w-[min(168vw,2560px)] -translate-x-1/2 -rotate-[3.25deg] bg-[linear-gradient(to_bottom,color-mix(in_oklab,oklch(0.4_0.19_26)_94%,transparent),oklch(0.34_0.165_26))] py-6 shadow-[0_14px_40px_-22px_oklch(0.28_0.14_25/0.55)] md:top-[11%] md:py-[1.75rem] lg:py-8">
          <div className="overflow-hidden px-1">
            <Marquee speed="slow" itemWrapperClassName={mastGap} items={qaRow} />
          </div>
        </div>

        {/* Cyber / compliance ribbon (front, black → reads on top where bands cross) */}
        <div className="absolute left-1/2 top-[48%] z-[1] w-[min(168vw,2560px)] -translate-x-1/2 rotate-[3.25deg] bg-ink py-6 shadow-[0_18px_50px_-24px_rgb(0_0_0/0.42)] md:top-[42%] md:py-[1.75rem] lg:py-8">
          <div className="overflow-hidden px-1">
            <Marquee reverse speed="slow" itemWrapperClassName={mastGap} items={secRow} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-cream py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="/ user stories /"
          title={
            <>
              Hear what others love{" "}
              <span className="text-[var(--brand)]">about our exceptional services</span>.
            </>
          }
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <figure className="h-full rounded-3xl border border-border bg-card p-8">
                <div className="text-[var(--brand)]">★★★★★</div>
                <blockquote className="mt-4 font-serif text-2xl italic leading-snug text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <div className="font-medium">{t.author}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="section-cream pb-24 md:pb-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="/ industries /"
          title={<>Domain-aware, not generic.</>}
          body="We bring sector context   compliance, threat models, peak-load profiles   to every engagement."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-xl font-semibold tracking-tight">{i.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-dark relative overflow-hidden py-24 md:py-32">
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Let's begin today</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-cream md:text-7xl">
            From testing to security,
            <br />
            <span className="bg-gradient-to-r from-[var(--amber-glow)] to-[var(--brand)] bg-clip-text text-transparent">
              we've got you covered.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/70">
            Tell us what you're shipping and what worries you about shipping it. We'll do the rest.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="glow-ring inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-cream hover:scale-[1.02]"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-7 py-3.5 text-sm font-medium text-cream hover:bg-cream/10"
            >
              CERT-In Empanelment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
