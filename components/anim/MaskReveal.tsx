"use client";

import { createElement, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";
import styles from "./MaskReveal.module.css";

type Direction = "up" | "down" | "left" | "right";

// clip-path inset() start states. "up" = revealed from the bottom edge upward
// (the default for the "recorrido de obra" feel).
const CLIP_FROM: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  right: "inset(0% 100% 0% 0%)",
  left: "inset(0% 0% 0% 100%)",
};

export interface MaskRevealProps {
  /** "slide": translateY behind an overflow:hidden frame. "clip": clip-path inset. */
  variant?: "slide" | "clip";
  /** Reveal direction (clip variant). Default "up". */
  direction?: Direction;
  /** Only run once. Default true. */
  once?: boolean;
  /** Duration override (0.6–0.9). */
  duration?: number;
  /** Delay after the trigger fires — use to stagger a grid of MaskReveals. */
  delay?: number;
  /** ScrollTrigger start. Default "top 82%". */
  start?: string;
  /** Element for the animated node (clip) or the outer frame (slide). */
  as?: ElementType;
  className?: string;
  debug?: boolean;
  children: ReactNode;
}

/**
 * Reveals a block or image as it enters the viewport. Nothing is hidden by CSS:
 * the hidden start state is applied by gsap.from (JS) inside a matchMedia
 * no-preference branch, so reduced-motion / no-JS render the content visible.
 */
export function MaskReveal({
  variant = "slide",
  direction = "up",
  once = true,
  duration,
  delay = 0,
  start = "top 82%",
  as = "div",
  className,
  debug = false,
  children,
}: MaskRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: root, start, once, markers: debug };

        if (variant === "clip") {
          gsap.from(root, {
            clipPath: CLIP_FROM[direction],
            duration: duration ?? DUR.slow,
            delay,
            ease: EASE,
            scrollTrigger,
          });
        } else {
          const inner = innerRef.current;
          if (!inner) return;
          gsap.from(inner, {
            yPercent: 100,
            duration: duration ?? DUR.base,
            delay,
            ease: EASE,
            scrollTrigger,
          });
        }
      });
    },
    { scope: rootRef },
  );

  if (variant === "clip") {
    return createElement(
      as,
      { ref: rootRef, className: [styles.clip, className].filter(Boolean).join(" ") },
      children,
    );
  }

  // slide: outer frame masks the inner translate
  return createElement(
    as,
    { ref: rootRef, className: [styles.mask, className].filter(Boolean).join(" ") },
    <div ref={innerRef} className={styles.slideInner}>
      {children}
    </div>,
  );
}
