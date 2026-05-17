import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="container-x relative py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="dark" />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">{site.description}</p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`mailto:${site.emails.sales}`}
                className="flex items-center gap-2 text-foreground/80 hover:text-[var(--brand)]"
              >
                <Mail className="h-4 w-4" /> {site.emails.sales}
              </a>
              <a
                href={`mailto:${site.emails.careers}`}
                className="flex items-center gap-2 text-foreground/80 hover:text-[var(--brand)]"
              >
                <Mail className="h-4 w-4" /> {site.emails.careers}
              </a>
              <div className="flex items-center gap-2 text-foreground/60">
                <MapPin className="h-4 w-4" /> Remote-first · India · Global
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {serviceCategories.slice(0, 4).map((cat) => (
              <div key={cat.slug}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">
                  {cat.title}
                </div>
                <ul className="space-y-2">
                  {cat.items.slice(0, 6).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="text-sm text-foreground/80 transition hover:text-[var(--brand)]"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-border pt-8 md:grid-cols-2 md:items-center">
          <div className="text-xs text-foreground/60">
            © {new Date().getFullYear()} {site.name}. All rights reserved. · CERT-In Empanelled ·
            ISO 27001
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <Link href="/compliance" className="text-xs text-foreground/70 hover:text-foreground">
              Compliance
            </Link>
            <Link href="/careers" className="text-xs text-foreground/70 hover:text-foreground">
              Careers
            </Link>
            <Link href="/contact" className="text-xs text-foreground/70 hover:text-foreground">
              Contact
            </Link>
            <a
              href={site.social.linkedin}
              className="text-xs text-foreground/70 hover:text-foreground inline-flex items-center gap-1"
            >
              LinkedIn <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
