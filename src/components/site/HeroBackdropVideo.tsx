"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/hero-ambient-loop.mp4";

type HeroBackdropVideoProps = {
  className?: string;
};

/** Soft looping backdrop for dark heroes (muted autoplay); pauses at first frame if reduced-motion. */
export function HeroBackdropVideo({ className }: HeroBackdropVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduceMotion(mq.matches);
      setMounted(true);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !mounted) return;

    v.muted = true;

    if (reduceMotion) {
      const hold = () => {
        try {
          v.pause();
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
      };
      v.addEventListener("loadeddata", hold, { once: true });
      hold();
      return;
    }

    const run = async () => {
      try {
        await v.play();
      } catch {
        requestAnimationFrame(() => void v.play().catch(() => {}));
      }
    };
    void run();
  }, [mounted, reduceMotion]);

  if (!mounted) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden
    >
      <video
        ref={ref}
        className="absolute inset-0 -top-[3%] h-[106%] w-full min-w-full object-cover object-center opacity-[0.5] saturate-[0.82] brightness-[0.9] contrast-[0.95]"
        src={VIDEO_SRC}
        muted
        playsInline
        loop={!reduceMotion}
        autoPlay={!reduceMotion}
        preload="auto"
        tabIndex={-1}
      />
      {/* One soft veil — readable headline, motion still visible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--ink)_74%,transparent),color-mix(in_oklab,var(--ink)_48%,transparent)_42%,color-mix(in_oklab,var(--ink)_68%,transparent))]" />
    </div>
  );
}
