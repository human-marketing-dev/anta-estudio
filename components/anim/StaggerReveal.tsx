"use client";

import { createElement, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";

export interface StaggerRevealProps {
  /** Selector for the items to stagger. Default: direct children. */
  childSelector?: string;
  /** Y offset of the rise. Default 24. Set 0 for fade-only (e.g. client logos). */
  y?: number;
  /** Stagger between items. Default 0.1. */
  stagger?: number;
  /** Duration override (0.6–0.9). */
  duration?: number;
  /** Only run once. Default true. */
  once?: boolean;
  /** ScrollTrigger start. Default "top 82%". */
  start?: string;
  as?: ElementType;
  className?: string;
  debug?: boolean;
  children: ReactNode;
}

/**
 * Reveals a group of children with a stagger (y:24→0 + fade) as the group
 * enters the viewport. Hidden start state is applied by gsap.from (JS) inside a
 * matchMedia no-preference branch — never CSS — so reduced-motion / no-JS render
 * everything visible.
 */
export function StaggerReveal({
  childSelector,
  y = 24,
  stagger = 0.1,
  duration,
  once = true,
  start = "top 82%",
  as = "div",
  className,
  debug = false,
  children,
}: StaggerRevealProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const targets = childSelector
        ? gsap.utils.toArray<Element>(root.querySelectorAll(childSelector))
        : gsap.utils.toArray<Element>(root.children);
      if (!targets.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: duration ?? DUR.base,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: root, start, once, markers: debug },
        });
      });
    },
    { scope: rootRef },
  );

  return createElement(as, { ref: rootRef, className }, children);
}
