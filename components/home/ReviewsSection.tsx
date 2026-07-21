"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";
import shared from "./home.module.css";
import styles from "./ReviewsSection.module.css";

/**
 * Section 7 · Reseñas de Google. Only the section fades in — the reviews come
 * from an external Google widget, so we never animate or touch its DOM.
 * The H2 is plain (not line-revealed) for the same reason.
 */
export function ReviewsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = innerRef.current;
      if (!inner) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(inner, {
          autoAlpha: 0,
          duration: DUR.slow,
          ease: EASE,
          scrollTrigger: { trigger: inner, start: "top 82%", once: true },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="resenas" className={`${shared.section} ${shared.sectionMist}`}>
      <div ref={innerRef} className={shared.wrap}>
        <div className={styles.head}>
          <h2 className={shared.h2}>Lo que Dicen Nuestros Clientes</h2>
          <p className={`${shared.sub} ${styles.headSub}`}>
            Testimonios reales de clientes que han vivido el proceso de principio a fin.
          </p>
        </div>

        {/* Google Business Profile reviews widget mounts here — DO NOT animate its DOM. */}
        <div className={styles.widget} data-google-reviews>
          <span className={styles.widgetNote}>Widget de reseñas de Google</span>
        </div>
      </div>
    </section>
  );
}
