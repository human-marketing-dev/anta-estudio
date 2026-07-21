"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";
import { RevealLines } from "@/components/anim";
import shared from "./home.module.css";
import styles from "./IntegralSection.module.css";

const capabilities: [string, string][] = [
  ["Diseño Arquitectónico", "Distribución, reconfiguración y soluciones espaciales."],
  ["Diseño de Interiores", "Materiales, acabados, iluminación y atmósfera con estándar premium."],
  ["Remodelación y Adecuaciones", "Renovación optimizando lo existente, sin perder control."],
  ["Project Management de Obra", "Administración, supervisión, coordinación y gestión de obra."],
  ["Diseño de Mobiliario a Medida", "Piezas y carpinterías alineadas al concepto."],
  ["Análisis Arquitectónico", "Evaluación del inmueble para anticipar implicaciones y costos."],
];

/** Section 5 · Servicio Integral. Numbered editorial list 01–06 with a drawn separator. */
export function IntegralSection() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const q = gsap.utils.selector(list);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rules = q(`.${styles.rule}`);
        gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

        gsap
          .timeline({ scrollTrigger: { trigger: list, start: "top 80%", once: true } })
          .from(
            q(`.${styles.row}`),
            { y: 24, autoAlpha: 0, duration: DUR.base, ease: EASE, stagger: 0.1 },
            0,
          )
          .to(rules, { scaleX: 1, duration: DUR.base, ease: EASE, stagger: 0.1 }, 0);
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="servicio-integral" className={shared.section}>
      <div className={shared.wrap}>
        <div className={styles.head}>
          <RevealLines as="h2" className={shared.h2}>
            Un Servicio Integral: del Diseño a la Obra
          </RevealLines>
          <p className={`${shared.body} ${styles.headBody}`}>
            Contigo en cada etapa: nos encargamos de todo el proceso —diseño arquitectónico, diseño
            de interiores, remodelación, ejecución y coordinación— bajo un mismo estándar de calidad.
          </p>
        </div>

        <ul ref={listRef} className={styles.list}>
          {capabilities.map(([title, line], i) => (
            <li key={title} className={styles.row}>
              <span className={styles.rule} aria-hidden="true" />
              <span className={`${shared.num} ${styles.rowNum}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`${shared.h3} ${styles.rowTitle}`}>{title}</h3>
              <p className={`${shared.body} ${styles.rowLine}`}>{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
