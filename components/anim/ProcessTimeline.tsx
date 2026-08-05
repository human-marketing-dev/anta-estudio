"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./ProcessTimeline.module.css";

export interface Step {
  title: string;
  desc: string;
}

/**
 * Horizontal process timeline (on ink). A connecting line draws left→right and
 * the steps rise in, staggered, as it enters view. H3 titles preserved.
 * Reduced motion / no-JS render it static. Stacks vertically on mobile.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = q(`.${styles.step}`);
        const n = steps.length || 1;
        gsap.set(q(`.${styles.line}`), { scaleX: 0, transformOrigin: "left center" });
        gsap.set(steps, { autoAlpha: 0, y: 24 });

        // Scrubbed: the line draws and each step reveals as you scroll through.
        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top 78%", end: "top 30%", scrub: true } })
          .to(q(`.${styles.line}`), { scaleX: 1, ease: "none", duration: 1 }, 0)
          .to(steps, { autoAlpha: 1, y: 0, ease: "none", duration: 1 / n, stagger: 1 / n }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={styles.timeline}>
      <span className={styles.line} aria-hidden="true" />
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.desc}>{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
