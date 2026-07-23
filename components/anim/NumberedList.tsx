"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";
import styles from "./NumberedList.module.css";

export interface NumberedItem {
  title: string;
  desc: string;
}

/**
 * Editorial numbered list: rows reveal (y + fade, staggered) and a hairline
 * separator draws in (scaleX, origin left) per row. `tone="ink"` for dark
 * sections. Row titles are H3. Reduced motion / no-JS render it static.
 */
export function NumberedList({
  items,
  tone = "light",
  start = "top 80%",
}: {
  items: NumberedItem[];
  tone?: "light" | "ink";
  start?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rules = q(`.${styles.rule}`);
        gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
        gsap
          .timeline({ scrollTrigger: { trigger: root, start, once: true } })
          .from(q(`.${styles.row}`), { y: 24, autoAlpha: 0, duration: DUR.base, ease: EASE, stagger: 0.1 }, 0)
          .to(rules, { scaleX: 1, duration: DUR.base, ease: EASE, stagger: 0.1 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className={`${styles.list} ${tone === "ink" ? styles.ink : ""}`}>
      {items.map((it, i) => (
        <li key={it.title} className={styles.row}>
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={styles.title}>{it.title}</h3>
          <p className={styles.desc}>{it.desc}</p>
        </li>
      ))}
    </ul>
  );
}
