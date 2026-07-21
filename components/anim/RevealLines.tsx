"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitIntoLines, lineRevealVars, LINE_FROM } from "@/lib/animation/lineReveal";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

export interface RevealLinesProps {
  /** Element to render. Keep the real heading tag for SEO. Default "h2". */
  as?: HeadingTag;
  children: ReactNode;
  className?: string;
  /** Per-line stagger override. */
  stagger?: number;
  /** Per-line duration override (0.6–0.9). */
  duration?: number;
  /** ScrollTrigger start. Default "top 80%". */
  start?: string;
  /** Show ScrollTrigger markers. */
  debug?: boolean;
}

/**
 * Heading revealed line-by-line behind a mask, once, on scroll into view.
 *
 * The reveal only exists when JS runs AND the user allows motion — initial
 * hidden state is applied via gsap.set inside useGSAP, never via CSS, so the
 * text is always present and visible for no-JS / reduced-motion / SEO / LCP.
 * The split reverts on complete, leaving clean text that reflows naturally.
 */
export function RevealLines({
  as = "h2",
  children,
  className,
  stagger,
  duration,
  start = "top 80%",
  debug = false,
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const [fontsReady, setFontsReady] = useState(false);

  // Split only after fonts load, or line breaks (and the mask) are measured wrong.
  useEffect(() => {
    let alive = true;
    const done = () => {
      if (alive) setFontsReady(true);
    };
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(done);
    } else {
      done();
    }
    return () => {
      alive = false;
    };
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !fontsReady) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = splitIntoLines(el);
        gsap.set(split.lines, LINE_FROM);
        gsap.to(
          split.lines,
          lineRevealVars({
            ...(duration != null ? { duration } : {}),
            ...(stagger != null ? { stagger } : {}),
            scrollTrigger: { trigger: el, start, once: true, markers: debug },
            onComplete: () => split.revert(),
          }),
        );
        return () => split.revert();
      });
    },
    { scope: ref, dependencies: [fontsReady] },
  );

  return createElement(as, { ref: ref as Ref<HTMLElement>, className }, children);
}
