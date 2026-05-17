import type { Metadata } from "next";
import { Eyebrow, SectionHeading, FadeIn } from "@/components/site/bits";
import { HeroBackdropVideo } from "@/components/site/HeroBackdropVideo";
import { ShieldCheck } from "lucide-react";

const standards = [
  {
    name: "CERT-In Empanelment",
    body: "Empanelled by the Indian Computer Emergency Response Team for information-security auditing.",
  },
  { name: "ISO/IEC 27001", body: "Information security management system certification." },
  {
    name: "SOC 2 Type II",
    body: "Security, availability and confidentiality controls   independently audited.",
  },
  { name: "ISO/IEC 42001:2023", body: "AI Management System (AIMS) readiness and audit support." },
  { name: "PCI DSS", body: "Cardholder data environment assessments." },
  { name: "HIPAA", body: "PHI handling, breach response and BAA-ready workflows." },
  { name: "GDPR", body: "EU data protection and DPIA support." },
  { name: "CCSS", body: "Cryptocurrency Security Standard assessments." },
  { name: "OWASP ASVS", body: "Application Security Verification Standard alignment." },
];

export const metadata: Metadata = {
  title: "Compliance & CERT-In Empanelment",
  description:
    "CERT-In empanelled, ISO 27001, SOC 2, ISO 42001, PCI DSS, HIPAA, GDPR   compliance-grade engagements.",
};

export default function Page() {
  return (
    <>
      <section
        id="cert-in"
        className="section-dark relative overflow-hidden py-24 text-cream md:py-32"
      >
        <HeroBackdropVideo />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="container-x relative">
          <Eyebrow>/ compliance /</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            CERT-In Empanelled. <span className="text-[var(--brand)]">Audit-grade by default.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-cream/70">
            Our deliverables are designed to satisfy the auditors your customers send. Every report
            includes evidence, methodology and remediation guidance.
          </p>
        </div>
      </section>

      <section className="section-cream py-20">
        <div className="container-x">
          <SectionHeading eyebrow="/ standards /" title="Frameworks we work with." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standards.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.03}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-[var(--brand)]">
                    <ShieldCheck className="h-5 w-5" />
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {s.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
