import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { ArrowRight } from "lucide-react";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Quality engineering, cybersecurity, AI/ML testing, automation, next-gen testing and cloud services.",
  openGraph: {
    title: "Services   IntraQA",
    description: "Six practice areas, dozens of services, one accountable team.",
  },
};

export default function Page() {
  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-32">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ services /</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            One partner across QA, security, AI and cloud.
          </h1>
          <p className="mt-6 max-w-2xl text-cream/70">
            From exploratory testing to LLM red-teaming, from cloud migration to CERT-In empanelled
            audits   every service we offer is built and delivered by senior engineers.
          </p>
        </div>
      </section>

      {serviceCategories.map((cat, idx) => (
        <section key={cat.slug} className={idx % 2 === 0 ? "section-cream py-20" : "py-20"}>
          <div className="container-x">
            <SectionHeading
              eyebrow={`/ ${cat.slug.replace(/-/g, " ")} /`}
              title={cat.title}
              body={cat.blurb}
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item, i) => (
                <FadeIn key={item.slug} delay={i * 0.04}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-[var(--brand)]/60 hover:shadow-xl"
                  >
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.summary}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand)]">
                      Learn more{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
