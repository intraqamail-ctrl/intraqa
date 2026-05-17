import Link from "next/link";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { allServices, type ServiceItem } from "@/data/services";

export function ServiceDetailPage({ service }: { service: ServiceItem }) {
  const related = allServices
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-28">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-cream/60 hover:text-cream"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All services
          </Link>
          <div className="mt-4">
            <Eyebrow>{service.category}</Eyebrow>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-xl italic text-cream/80 md:text-2xl">
            {service.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-cream/70">{service.summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-cream hover:scale-[1.02]"
            >
              Request a scoping call <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-6 py-3 text-sm font-medium text-cream hover:bg-cream/10"
            >
              See our process
            </a>
          </div>
        </div>
      </section>

      <section className="section-cream py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="/ what's included /"
              title={
                <>
                  What you get with <span className="text-[var(--brand)]">{service.title}</span>.
                </>
              }
            />
            <ul className="mt-8 space-y-4">
              {service.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />
                  <span className="text-sm font-medium text-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Typical outcomes
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {service.outcomes.map((o) => (
                  <div key={o.label} className="rounded-xl bg-muted p-4 text-center">
                    <div className="font-display text-2xl font-semibold text-[var(--brand)]">
                      {o.value}
                    </div>
                    <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      {o.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Tools & frameworks
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.tools.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="section-dark py-20 text-cream md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="/ process /"
            title={<>How an engagement runs.</>}
            body="Predictable cadence. Real engineers. No black boxes."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-cream/10 bg-cream/5 p-6 backdrop-blur">
                  <div className="font-mono text-xs text-[var(--amber-glow)]">{p.step}</div>
                  <div className="mt-2 font-display text-lg font-semibold">{p.title}</div>
                  <p className="mt-2 text-sm text-cream/70">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="/ faqs /" title={<>Common questions.</>} />
          <div className="space-y-3">
            {service.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card p-5 open:bg-muted/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                  {f.q}
                  <span className="text-[var(--brand)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-cream pb-24">
          <div className="container-x">
            <div className="mb-8 flex items-end justify-between">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                More in {service.category}
              </h3>
              <Link
                href="/services"
                className="text-sm text-foreground/80 hover:text-[var(--brand)]"
              >
                All services →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition hover:border-[var(--brand)]/60"
                >
                  <h4 className="font-display text-lg font-semibold tracking-tight">{r.title}</h4>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{r.summary}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand)]">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-brand py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              Ready to talk {service.title.toLowerCase()}?
            </h3>
            <p className="mt-2 text-cream/80">
              A 20-minute scoping call is the fastest way to a real number.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink hover:scale-[1.02]"
          >
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
