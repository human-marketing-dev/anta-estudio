"use client";

import { gsap, SplitText, EASE, DUR } from "@/lib/gsap";

/** Per-line stagger, shared by the hero timeline and <RevealLines>. */
export const LINE_STAGGER = 0.08;

/** Hidden state of a masked line before it rises into view. */
export const LINE_FROM = { yPercent: 110 } as const;

/**
 * Split a heading/paragraph into masked lines. Real text stays in the DOM
 * (SplitText only runs client-side), so without JS the text renders normally —
 * good for LCP and SEO. Remember to `split.revert()` when the reveal completes.
 */
export function splitIntoLines(target: Element): SplitText {
  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    linesClass: "anta-line",
  });
}

/**
 * Shared tween vars for the line reveal, so the hero timeline and <RevealLines>
 * animate identically. Pass overrides (scrollTrigger, onComplete, delay, …).
 */
export function lineRevealVars(overrides: gsap.TweenVars = {}): gsap.TweenVars {
  return {
    yPercent: 0,
    duration: DUR.base,
    ease: EASE,
    stagger: LINE_STAGGER,
    ...overrides,
  };
}
