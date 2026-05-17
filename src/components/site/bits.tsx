"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="pill font-mono uppercase tracking-[0.18em]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">{body}</p>
      )}
    </div>
  );
}

export function Marquee({
  items,
  speed = "normal",
  reverse = false,
  itemWrapperClassName,
}: {
  items: ReactNode[];
  speed?: "normal" | "slow";
  reverse?: boolean;
  /** Overrides default horizontal spacing between items (mast ribbons use wider gaps). */
  itemWrapperClassName?: string;
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "marquee-track",
          speed === "slow" && "slow",
          reverse && "reverse",
        )}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 items-center",
              itemWrapperClassName ?? "gap-12 px-6",
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
