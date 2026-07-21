"use client";

import Image from "next/image";
import { RevealLines, StaggerReveal } from "@/components/anim";
import shared from "./home.module.css";
import styles from "./ClientsSection.module.css";

// White, transparent client logos → shown on an ink panel. [file, alt]
const clientes: [string, string][] = [
  ["grupo-pangea-logo.webp", "Grupo Pangea"],
  ["grupo-kampai-logo.webp", "Grupo Kampai"],
  ["group-80-logo.webp", "Group 80"],
  ["majadma-logo.webp", "MAJADMA"],
  ["valle-alto-club-de-golf-logo.webp", "Valle Alto Club de Golf"],
  ["teleperformance-logo.webp", "Teleperformance"],
  ["cavimex-logo.webp", "Cavimex"],
  ["sibau-logo.webp", "Sibau"],
  ["casa-liebre-logo.webp", "Casa Liebre"],
  ["oh-darling-logo.webp", "Oh Darling"],
  ["nikkori-logo.webp", "Nikkori"],
  ["viva-pizza-logo.webp", "Viva Pizza"],
  ["line-2u-logo.webp", "Line 2U"],
  ["rg-mx-logo.webp", "RG MX"],
  ["latin-american-school-of-monterrey-logo.png", "Latin American School of Monterrey"],
];

/** Section 6 · Nuestros Clientes. White logos on an ink wall, staggered fade. */
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

        <StaggerReveal className={styles.grid} childSelector={`.${styles.cell}`} y={0} stagger={0.04}>
          {clientes.map(([file, name]) => (
            <div key={file} className={styles.cell}>
              <Image
                src={`/clientes/${file}`}
                alt={name}
                fill
                sizes="(max-width: 600px) 45vw, (max-width: 980px) 30vw, 18vw"
                style={{ objectFit: "contain" }}
                className={styles.logo}
              />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
