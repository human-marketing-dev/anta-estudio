"use client";

import { RevealLines, StaggerReveal } from "@/components/anim";
import shared from "./home.module.css";
import styles from "./ClientsSection.module.css";

/** Section 6 · Nuestros Clientes. Logo wall with a staggered fade (static otherwise). */
export function ClientsSection() {
  return (
    <section id="clientes" className={shared.section}>
      <div className={shared.wrap}>
        <div className={styles.head}>
          <RevealLines as="h2" className={shared.h2}>
            Nuestros Clientes
          </RevealLines>
          <p className={`${shared.sub} ${styles.headSub}`}>
            Marcas y empresas que han confiado en nosotros para diseñar y construir sus espacios.
          </p>
        </div>

        <StaggerReveal className={styles.grid} childSelector={`.${styles.cell}`} y={0} stagger={0.05}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={styles.cell}>
              <span className={styles.logo}>LOGO</span>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
