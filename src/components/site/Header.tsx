"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { navGroups, type NavGroup } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { cn } from "@/lib/utils";

const panelEase = [0.22, 1, 0.36, 1] as const;

/** Hysteresis: compact after scrolling past this, expand again only nearer the top   avoids jitter at the cutoff. */
const NAV_SCROLL_COMPACT_AFTER = 32;
const NAV_SCROLL_EXPAND_BEFORE = 4;

/** No height/blur in transition   avoids layout + compositor jank. */
const barTransition =
  "transition-[padding,border-color,background-color,box-shadow] duration-300 ease-out";

const outerShellTransition = "transition-[padding] duration-300 ease-out";

function pathnameMatches(navPath: string, pathname: string) {
  if (navPath === "/") return pathname === "/";
  return pathname === navPath || pathname.startsWith(`${navPath}/`);
}

function groupHasActiveHref(g: NavGroup, pathname: string) {
  if (g.href) return pathnameMatches(g.href, pathname);
  return g.sections?.some((sec) => sec.links.some((l) => pathnameMatches(l.href, pathname)));
}

/** Category slug for current /services/[slug], or null. */
function serviceCategorySlugFromPath(pathname: string): string | null {
  const m = /^\/services\/([^/?#]+)/.exec(pathname);
  if (!m) return null;
  const serviceSlug = m[1];
  for (const cat of serviceCategories) {
    if (cat.items.some((i) => i.slug === serviceSlug)) return cat.slug;
  }
  return null;
}

function MinimalNavTrigger({
  active,
  dense,
  className,
  children,
}: {
  active: boolean;
  dense?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center whitespace-nowrap rounded-lg leading-snug font-medium tracking-tight text-foreground transition-[padding,opacity] duration-300 ease-out",
        dense
          ? "px-2.5 py-2 text-[13px]"
          : "px-3 py-2 text-[13px] sm:px-3.5",
        active &&
          "after:pointer-events-none after:absolute after:inset-x-2.5 after:bottom-0 after:z-[1] after:h-[2px] after:rounded-[1px] after:bg-red-500 sm:after:inset-x-2 lg:after:inset-x-3",
        !active && "hover:opacity-90",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [megaKey, setMegaKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!scrolledRef.current && y > NAV_SCROLL_COMPACT_AFTER) {
        scrolledRef.current = true;
        setScrolled(true);
      } else if (scrolledRef.current && y < NAV_SCROLL_EXPAND_BEFORE) {
        scrolledRef.current = false;
        setScrolled(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const y = window.scrollY;
    if (y > NAV_SCROLL_COMPACT_AFTER) {
      scrolledRef.current = true;
      setScrolled(true);
    } else if (y < NAV_SCROLL_EXPAND_BEFORE) {
      scrolledRef.current = false;
      setScrolled(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  useEffect(() => setOpenMobile(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaKey(null);
        setOpenMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = useCallback((key: string) => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaKey(key);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaKey(null), 320);
  }, []);

  useEffect(() => {
    return () => {
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    };
  }, []);

  const megaMenuSections =
    megaKey != null
      ? navGroups.find((g) => g.label === megaKey && g.sections)?.sections
      : undefined;

  return (
    <>
      <header className="sticky top-0 z-[100]">
        <div
          className={cn(
            "container-x",
            outerShellTransition,
            scrolled
              ? "px-4 pb-2.5 pt-2.5 sm:px-5 lg:px-6"
              : "px-3 pb-2.5 pt-3 sm:px-4 lg:px-5",
          )}
        >
          <div
            className={cn(
              "relative flex h-14 min-h-14 shrink-0 items-center justify-between overflow-visible rounded-2xl backdrop-blur-xl",
              barTransition,
              "gap-4 lg:gap-8",
              scrolled
                ? "border border-[color-mix(in_oklab,var(--foreground)_7%,transparent)] px-4 sm:px-5 lg:px-6"
                : "border border-transparent px-4 sm:px-5 lg:px-7",
              scrolled
                ? "bg-background/94 shadow-[0_10px_40px_-28px_rgb(0_0_0/0.18)]"
                : "bg-background/86 shadow-[0_14px_44px_-32px_rgb(0_0_0/0.14)]",
            )}
          >
            <Logo
              elevated={!scrolled}
              className={cn(
                "shrink-0 origin-left transition-transform duration-300 ease-out",
                !scrolled && "scale-[1.02]",
              )}
            />

            <div className="hidden min-h-0 min-w-0 flex-1 justify-center lg:flex">
              <nav
                className="relative flex w-full max-w-none flex-col items-center"
                aria-label="Main"
                onMouseLeave={() => scheduleMegaClose()}
              >
                <ul className="flex flex-wrap items-center justify-center gap-x-0 gap-y-0.5 sm:gap-x-px">
                  {navGroups.map((g) => {
                    const active = Boolean(groupHasActiveHref(g, pathname));
                    const menuOpen = megaKey === g.label;
                    return (
                      <li
                        key={g.label}
                        className="flex items-center"
                        onMouseEnter={() => (g.sections ? openMega(g.label) : setMegaKey(null))}
                        onPointerEnter={() => (g.sections ? openMega(g.label) : setMegaKey(null))}
                      >
                        {g.href ? (
                          <Link
                            href={g.href}
                            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            <MinimalNavTrigger active={active} dense={scrolled}>
                              {g.label}
                            </MinimalNavTrigger>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            aria-expanded={menuOpen}
                            aria-haspopup="true"
                            className="cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            onMouseEnter={() => openMega(g.label)}
                            onPointerEnter={() => openMega(g.label)}
                            onFocus={() => openMega(g.label)}
                          >
                            <MinimalNavTrigger active={active} dense={scrolled}>
                              <span className="flex items-baseline gap-1">
                                {g.label}
                                <ChevronDown
                                  aria-hidden
                                  className={cn(
                                    "relative top-[0.08em] h-3.5 w-3.5 shrink-0 text-foreground transition-transform duration-200 ease-out",
                                    menuOpen && "rotate-180 text-red-500",
                                  )}
                                />
                              </span>
                            </MinimalNavTrigger>
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <AnimatePresence mode="sync">
                  {megaKey != null && megaMenuSections != null ? (
                    <motion.div
                      key={megaKey}
                      role="presentation"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 2 }}
                      transition={{ duration: 0.17, ease: panelEase }}
                      className={cn(
                        "pointer-events-none absolute left-4 right-4 top-full z-[120] flex justify-center pt-4 sm:left-5 sm:right-5 -mt-1 sm:-mt-[5px]",
                      )}
                      onMouseEnter={() => megaKey != null && openMega(megaKey)}
                      onPointerEnter={() => megaKey != null && openMega(megaKey)}
                      onMouseLeave={() => scheduleMegaClose()}
                    >
                      <div
                        className={cn(
                          "pointer-events-auto min-w-0 px-2 sm:px-3",
                          megaKey === "Services"
                            ? "w-full max-w-[1040px]"
                            : "w-full max-w-[min(100%,22rem)] sm:w-max sm:max-w-[min(100vw-3rem,36rem)]",
                        )}
                      >
                        {megaKey === "Services" ? (
                          <ServicesMegaPanel pathname={pathname} open={megaKey === "Services"} />
                        ) : (
                          <CompanyMegaPanel sections={megaMenuSections} pathname={pathname} />
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </nav>
            </div>

            <div className="hidden shrink-0 items-center lg:flex">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className={cn(
                    "group/nav inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-[var(--foreground)] text-[13px] font-semibold text-[var(--cream)] outline-none transition-[padding,filter,gap] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:brightness-105 sm:gap-2",
                    scrolled ? "px-4 py-2 sm:px-5 sm:py-2.5" : "px-5 py-2 sm:px-5 sm:py-2.5",
                  )}
                >
                  Let&apos;s talk
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/nav:translate-x-0.5 sm:h-4 sm:w-4" />
                </Link>
              </motion.div>
            </div>

            <button
              type="button"
              aria-label={openMobile ? "Close navigation" : "Open navigation"}
              aria-expanded={openMobile}
              onClick={() => setOpenMobile((v) => !v)}
              className={cn(
                "relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 lg:hidden",
                openMobile
                  ? "border-[color-mix(in_oklab,var(--brand)_38%,transparent)] bg-[color-mix(in_oklab,var(--brand)_8%,transparent)] text-[var(--brand)]"
                  : "border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-[color-mix(in_oklab,var(--background)_40%,transparent)] text-foreground/75 hover:bg-muted/50",
              )}
            >
              <span className="sr-only">{openMobile ? "Close" : "Menu"}</span>
              {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {openMobile && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[110] bg-ink/50 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, ease: panelEase } }}
              exit={{ opacity: 0, transition: { duration: 0.16, ease: panelEase } }}
              onClick={() => setOpenMobile(false)}
            />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-[130] flex w-[min(100vw,22rem)] flex-col border-l border-border/80 bg-background/98 shadow-xl backdrop-blur-2xl lg:hidden"
              initial={{ x: "102%" }}
              animate={{
                x: 0,
                transition: { type: "spring", stiffness: 400, damping: 40 },
              }}
              exit={{ x: "102%", transition: { duration: 0.22, ease: panelEase } }}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border/70 px-5 py-4">
                <span className="font-display text-sm font-semibold tracking-tight text-foreground">
                  Navigate
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpenMobile(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/80 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                <ul className="space-y-1">
                  {navGroups.map((g, gi) =>
                    g.href ? (
                      <motion.li
                        key={g.label}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.028 * gi + 0.04, duration: 0.18, ease: panelEase },
                        }}
                      >
                        <Link
                          href={g.href}
                          onClick={() => setOpenMobile(false)}
                          className={cn(
                            "block rounded-lg py-3 pl-3 text-[15px] font-medium text-foreground hover:bg-muted/50",
                            pathnameMatches(g.href, pathname) &&
                              "relative text-foreground after:pointer-events-none after:absolute after:bottom-2 after:left-3 after:right-3 after:h-[2px] after:rounded-[1px] after:bg-red-500",
                          )}
                        >
                          {g.label}
                        </Link>
                      </motion.li>
                    ) : (
                      <motion.li
                        key={g.label}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.028 * gi + 0.04, duration: 0.18, ease: panelEase },
                        }}
                      >
                        <MobileDropdownGroup
                          group={g}
                          pathname={pathname}
                          close={() => setOpenMobile(false)}
                        />
                      </motion.li>
                    ),
                  )}
                </ul>
              </nav>
              <div className="shrink-0 border-t border-border/70 px-5 py-5">
                <Link
                  href="/contact"
                  onClick={() => setOpenMobile(false)}
                  className="nav-mobile-cta glow-ring relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-cream"
                >
                  <span
                    className="pointer-events-none absolute inset-[1px] rounded-full bg-ink opacity-92"
                    aria-hidden
                  />
                  <span className="relative">Contact sales</span>
                  <ArrowRight className="relative h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ServicesMegaPanel({ pathname, open }: { pathname: string; open: boolean }) {
  const [tab, setTab] = useState(serviceCategories[0].slug);

  useEffect(() => {
    if (!open) return;
    const slug = serviceCategorySlugFromPath(pathname);
    setTab(slug ?? serviceCategories[0].slug);
  }, [open, pathname]);

  const cat = serviceCategories.find((c) => c.slug === tab) ?? serviceCategories[0];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_9%,transparent)]",
        "bg-[color-mix(in_oklab,var(--popover)_97%,transparent)] shadow-[0_32px_64px_-48px_rgb(0_0_0/0.45)]",
        "backdrop-blur-xl",
      )}
    >
      <div className="px-4 pb-3 pt-3.5 sm:px-6 sm:pb-4 sm:pt-4" role="tablist" aria-label="Practice areas">
        <div className="-mb-px flex flex-wrap gap-x-1 gap-y-1 border-b border-border/40 pb-px sm:gap-x-2 lg:flex-nowrap lg:justify-between lg:gap-x-3">
          {serviceCategories.map((c) => {
            const sel = tab === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                title={c.title}
                aria-selected={sel}
                onFocus={() => setTab(c.slug)}
                onClick={() => setTab(c.slug)}
                className={cn(
                  "relative min-w-0 shrink-0 rounded-md px-2.5 py-2 text-left text-[11px] font-medium leading-snug transition-colors sm:flex-1 sm:px-2 sm:text-center sm:text-[12px] lg:flex-initial lg:grow lg:basis-0 lg:px-1.5 lg:text-[11px] xl:px-2 xl:text-[12px]",
                  sel ? "text-foreground" : "text-foreground hover:opacity-90",
                  sel &&
                    "after:absolute after:inset-x-2 after:-bottom-[1px] after:z-[1] after:h-[2px] after:rounded-[1px] after:bg-red-500 sm:after:inset-x-1 lg:after:inset-x-1",
                )}
              >
                <span className="line-clamp-3 sm:line-clamp-2 xl:line-clamp-none">{c.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel" className="max-h-[min(58vh,480px)] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
        <p className="mb-3 text-[12px] leading-relaxed text-muted-foreground sm:mb-4 sm:text-[13px]">
          {cat.blurb}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {cat.items.map((item) => {
            const href = `/services/${item.slug}`;
            const active = pathnameMatches(href, pathname);
            return (
              <Link
                key={item.slug}
                href={href}
                prefetch
                className={cn(
                  "group/s block rounded-lg border border-transparent px-3 py-2.5 outline-none transition-[background-color,color,border-color] duration-150",
                  "focus-visible:ring-2 focus-visible:ring-[var(--brand)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--popover)]",
                  active
                    ? "border-[color-mix(in_oklab,var(--brand)_30%,transparent)] bg-[color-mix(in_oklab,var(--brand)_7%,transparent)] text-foreground"
                    : "text-foreground/80 hover:border-border/70 hover:bg-muted/40 hover:text-foreground",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-medium leading-snug">{item.title}</span>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover/s:opacity-100" />
                </div>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                  {item.summary}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4 sm:mt-5">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--brand)] hover:underline"
          >
            All services overview
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact"
            className="text-[12px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Request a scope call
          </Link>
        </div>
      </div>
    </div>
  );
}

function CompanyMegaPanel({
  sections,
  pathname,
}: {
  sections: NonNullable<NavGroup["sections"]>;
  pathname: string;
}) {
  const wide = sections.length >= 3;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_9%,transparent)]",
        "bg-[color-mix(in_oklab,var(--popover)_97%,transparent)] shadow-[0_32px_64px_-48px_rgb(0_0_0/0.45)]",
        "backdrop-blur-xl sm:min-w-[20rem]",
      )}
    >
      <div className="max-h-[min(62vh,520px)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-5">
        <div
          className={cn(
            "grid w-full items-start",
            wide
              ? "grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-4",
          )}
        >
          {sections.map((sec, i) => (
            <div
              key={sec.title}
              className={cn(
                "min-w-0",
                !wide &&
                  i > 0 &&
                  "border-t border-border/55 pt-6 sm:border-t-0 sm:border-l sm:border-border/55 sm:pl-10 sm:pt-0",
                !wide && i === 0 && "sm:pr-1",
              )}
            >
              <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {sec.title}
              </div>
              <ul className="space-y-0.5">
                {sec.links.map((l) => {
                  const active = pathnameMatches(l.href, pathname);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        prefetch
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[13px] transition-colors duration-150",
                          "focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--popover)]",
                          active
                            ? "bg-muted/70 font-medium text-foreground"
                            : "text-foreground/75 hover:bg-muted/45 hover:text-foreground",
                        )}
                      >
                        <span className="min-w-0">{l.label}</span>
                        <ArrowRight className="h-3 w-3 shrink-0 opacity-30" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDropdownGroup({
  group,
  pathname,
  close,
}: {
  group: NavGroup;
  pathname: string;
  close: () => void;
}) {
  const isServices = group.label === "Services" && Boolean(group.sections);

  const groupActive = groupHasActiveHref(group, pathname);

  return (
    <details className={cn("nav-acc rounded-lg [&[open]]:bg-muted/20")}>
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between px-3 py-3 text-[15px] font-medium text-foreground [&::-webkit-details-marker]:hidden",
          groupActive &&
            "relative text-foreground after:pointer-events-none after:absolute after:inset-x-3 after:bottom-2 after:h-[2px] after:rounded-[1px] after:bg-red-500",
        )}
      >
        {group.label}
        <ChevronDown aria-hidden className="nav-acc-icon h-4 w-4 shrink-0 text-foreground" />
      </summary>
      <div className="pb-3 pl-2 pr-1 pt-1">
        {isServices ? (
          <ServicesMobileTabs pathname={pathname} close={close} />
        ) : (
          <div className="space-y-3 border-l-2 border-border/80 pl-3">
            {group.sections?.map((sec) => (
              <div key={sec.title}>
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {sec.title}
                </div>
                <ul className="space-y-px">
                  {sec.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={close}
                        className={cn(
                          "block rounded-md py-1.5 pl-2 text-sm text-foreground hover:bg-muted/50",
                          pathnameMatches(l.href, pathname) &&
                            "relative after:pointer-events-none after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[2px] after:rounded-[1px] after:bg-red-500",
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

function ServicesMobileTabs({ pathname, close }: { pathname: string; close: () => void }) {
  const [tab, setTab] = useState(() => serviceCategorySlugFromPath(pathname) ?? serviceCategories[0].slug);
  useEffect(() => {
    const s = serviceCategorySlugFromPath(pathname);
    if (s) setTab(s);
  }, [pathname]);
  const cat = serviceCategories.find((c) => c.slug === tab) ?? serviceCategories[0];

  return (
    <div>
      <div className="mb-3 border-b border-border/45 px-0.5 pb-0">
        <div className="-mb-px flex flex-wrap gap-x-0.5 gap-y-0.5 pb-px">
          {serviceCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setTab(c.slug)}
              title={c.title}
              className={cn(
                "relative min-h-[2.5rem] min-w-[calc(50%-2px)] flex-1 rounded-md px-2 py-1.5 text-center text-[11px] font-medium leading-tight transition-colors sm:min-w-0 sm:text-[12px]",
                tab === c.slug ? "text-foreground" : "text-foreground hover:opacity-90",
                tab === c.slug &&
                  "after:pointer-events-none after:absolute after:inset-x-1 after:-bottom-px after:z-[1] after:h-[2px] after:rounded-[1px] after:bg-red-500 sm:after:inset-x-2",
              )}
            >
              <span className="line-clamp-2">{c.title}</span>
            </button>
          ))}
        </div>
      </div>
      <ul className="space-y-px border-l border-border/70 pl-3">
        {cat.items.map((item) => {
          const href = `/services/${item.slug}`;
          return (
            <li key={item.slug}>
              <Link
                href={href}
                onClick={close}
                className={cn(
                  "block rounded-md py-1.5 pl-2 text-sm text-foreground hover:bg-muted/50",
                  pathnameMatches(href, pathname) &&
                    "relative after:pointer-events-none after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[2px] after:rounded-[1px] after:bg-red-500",
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
