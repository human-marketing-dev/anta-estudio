"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

// Register plugins once. This module is only imported by client components, and
// registration is safe during SSR (no window access happens at register time).
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

// The project's single easing curve — mirrors --ease: cubic-bezier(0.22, 0.61, 0.36, 1).
// CustomEase accepts the four bezier control points directly, same result.
CustomEase.create("anta", "0.22,0.61,0.36,1");

/** Name of the registered project easing. Use as `ease: EASE`. */
export const EASE = "anta";

/** Allowed duration band for the "recorrido de obra" motion (0.6–0.9s). */
export const DUR = { fast: 0.6, base: 0.7, slow: 0.9 } as const;

export { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase };
