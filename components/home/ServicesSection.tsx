"use client";

import { RevealLines, MaskReveal } from "@/components/anim";
import { Arrow } from "@/components/site";
import { Button } from "@/components/Button";
import shared from "./home.module.css";
import styles from "./ServicesSection.module.css";

const categories = [
  {
    n: "01",
    title: "Arquitectura Comercial",
    body: "Arquitectura e interiorismo para restaurantes, cafés, retail y espacios de hospitalidad, diseñados para recibir clientes y representar tu marca. Alineamos distribución, materiales e iluminación con el concepto y la operación.",
    link: "Conoce nuestro trabajo comercial",
    href: "/servicios/arquitectura-comercial",
  },
  {
    n: "02",
    title: "Arquitectura Corporativa",
    body: "Arquitectura e interiorismo corporativo y diseño de oficinas que traducen la identidad de la empresa en ambientes funcionales y eficientes, fortaleciendo la cultura y la experiencia del equipo.",
    link: "Conoce nuestro trabajo corporativo",
    href: "/servicios/arquitectura-corporativa",
  },
  {
    n: "03",
    title: "Arquitectura Residencial",
    body: "Arquitectura e interiorismo para casas, departamentos y residencias premium, donde la arquitectura, los interiores y el detalle se integran en una experiencia coherente de habitar.",
    link: "Conoce nuestro trabajo residencial",
    href: "/servicios/arquitectura-residencial",
  },
];

/** Section 4 · Servicios (categorías). Three wide masked blocks, not cards. */
export function ServicesSection() {
  return (
    <section id="servicios" className={shared.section}>
      <div className={shared.wrap}>
        <div className={styles.head}>
          <RevealLines as="h2" className={shared.h2}>
            Servicios de Arquitectura e Interiorismo
          </RevealLines>
          <p className={`${shared.sub} ${styles.headSub}`}>
            Un servicio integral que se ajusta al alcance de cada proyecto, en tres grandes áreas de
            especialidad.
          </p>
        </div>

        <div className={styles.blocks}>
          {categories.map((c, i) => (
            <MaskReveal key={c.n} variant="slide" delay={i * 0.06} className={styles.block}>
              <div className={styles.blockGrid}>
                <div className={styles.blockLead}>
                  <span className={shared.num}>{c.n}</span>
                  <h3 className={`${shared.h3big} ${styles.blockTitle}`}>{c.title}</h3>
                </div>
                <div className={styles.blockBody}>
                  <p className={shared.body}>{c.body}</p>
                  <Button as="a" href={c.href} size="sm" className={styles.blockLink}>
                    {c.link}
                    <Arrow s={15} />
                  </Button>
                </div>
              </div>
            </MaskReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
