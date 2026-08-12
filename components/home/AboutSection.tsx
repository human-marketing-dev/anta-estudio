"use client";

import { RevealLines, StaggerReveal } from "@/components/anim";
import shared from "./home.module.css";
import styles from "./AboutSection.module.css";

const pillars: [string, string][] = [
  ["Diseño con propósito", "Espacios funcionales, estéticos y coherentes con la marca."],
  ["Ejecución con control", "Planeación sólida, presupuestos precisos y coordinación de obra."],
  ["Experiencia comprobada", "Más de 15 años en los tres sectores."],
];

/** Section 2 · Sobre Nosotros. Copy is literal from docs/references/home-copy-seo.md. */
export function AboutSection() {
  return (
    <section id="nosotros" className={shared.section}>
      <div className={`${shared.wrap} ${styles.grid}`}>
        <div>
          <RevealLines as="h2" className={shared.h2}>
            Sobre Nosotros
          </RevealLines>
          <RevealLines as="h3" className={`${shared.h3big} ${styles.subtitle}`}>
            Un despacho de arquitectura e interiorismo con más de 15 años de experiencia
          </RevealLines>
        </div>
        <div className={styles.right}>
          <p className={shared.body}>
            Somos un equipo de arquitectos en Monterrey especializado en el diseño de espacios que
            funcionan, comunican y perduran. Durante más de 15 años hemos desarrollado proyectos
            comerciales, corporativos y residenciales, acompañando a nuestros clientes desde el
            análisis y la conceptualización hasta la gerencia y supervisión de obra. Diseñamos con
            visión integral —concepto, función e identidad— y cuidamos cada detalle para que el
            resultado final sea fiel a la intención original.
          </p>
          <StaggerReveal className={styles.pillars} childSelector={`.${styles.pillar}`} stagger={0.1}>
            {pillars.map(([title, line]) => (
              <div key={title} className={styles.pillar}>
                <span className={styles.bullet} aria-hidden="true" />
                <div>
                  <h3 className={shared.h3}>{title}</h3>
                  <p className={`${shared.body} ${styles.pillarLine}`}>{line}</p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
