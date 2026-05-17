import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "auto",
  className = "",
  elevated = false,
}: {
  variant?: "auto" | "dark" | "light";
  className?: string;
  /** Larger mark + wordmark for the expanded (top-of-page) navbar. */
  elevated?: boolean;
}) {
  // "BH-style" placeholder mark for IntraQA   4-dot grid + wordmark.
  // Swap with real logo asset when supplied.
  const colorClass =
    variant === "dark" ? "text-cream" : variant === "light" ? "text-ink" : "text-foreground";
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center transition-[gap] duration-300 ease-out",
        elevated ? "gap-3" : "gap-2.5",
        colorClass,
        className,
      )}
      aria-label="IntraQA home"
    >
      <span
        className={cn(
          "relative grid grid-cols-2 rounded-md border border-current/15 bg-current/5 p-1.5 transition-[width,height] duration-300 ease-out",
          elevated ? "h-10 w-10 gap-[3px]" : "h-9 w-9 gap-[3px]",
        )}
      >
        <span className="block rounded-sm bg-[var(--brand)]" />
        <span className="block rounded-sm bg-current/70" />
        <span className="block rounded-sm bg-current/70" />
        <span className="block rounded-sm bg-[var(--brand)] transition-transform duration-500 group-hover:rotate-45" />
      </span>
      <span
        className={cn(
          "font-display font-semibold tracking-tight transition-[font-size] duration-300 ease-out",
          elevated ? "text-[1.09rem]" : "text-lg",
        )}
      >
        Intra<span className="text-[var(--brand)]">QA</span>
      </span>
    </Link>
  );
}
