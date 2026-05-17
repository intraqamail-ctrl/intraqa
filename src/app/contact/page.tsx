import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/site/bits";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/data/site";
import { Mail, MessageSquare, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to IntraQA about your QA, security or AI/ML testing engagement.",
};

export default function Page() {
  return (
    <>
      <section className="section-dark relative overflow-hidden py-24 text-cream md:py-28">
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ contact /</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Tell us what you're shipping.
          </h1>
          <p className="mt-5 max-w-xl text-cream/70">
            We reply within one business day. Your message goes straight to a senior engineer, not a
            sales funnel.
          </p>
        </div>
      </section>

      <section className="section-cream py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="/ reach us /"
              title={
                <>
                  The fastest <span className="text-[var(--brand)]">ways in</span>.
                </>
              }
            />
            <a
              href={`mailto:${site.emails.sales}`}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-[var(--brand)]/60"
            >
              <Mail className="mt-1 h-5 w-5 text-[var(--brand)]" />
              <div>
                <div className="font-medium">Sales & engagements</div>
                <div className="text-sm text-muted-foreground">{site.emails.sales}</div>
              </div>
            </a>
            <a
              href={`mailto:${site.emails.careers}`}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-[var(--brand)]/60"
            >
              <Briefcase className="mt-1 h-5 w-5 text-[var(--brand)]" />
              <div>
                <div className="font-medium">Careers</div>
                <div className="text-sm text-muted-foreground">{site.emails.careers}</div>
              </div>
            </a>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <MessageSquare className="mt-1 h-5 w-5 text-[var(--brand)]" />
              <div>
                <div className="font-medium">Chat with Intra</div>
                <div className="text-sm text-muted-foreground">
                  Click the chat bubble in the corner for instant answers.
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
