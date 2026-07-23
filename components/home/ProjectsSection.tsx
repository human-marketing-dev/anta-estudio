"use client";

import Link from "next/link";
import { RevealLines } from "@/components/anim";
import { Arrow } from "@/components/site";
import { ScrollGridProjects } from "@/components/ScrollGridProjects";
import shared from "./home.module.css";
import styles from "./ProjectsSection.module.css";

/** Section 3 · Proyectos Recientes. Header on mist, then the scroll-grid showcase. */
export function ProjectsSection() {
  return (
    <section id="proyectos" className={`${shared.section} ${shared.sectionInk} ${styles.section}`}>
      <div className={shared.wrap}>
        <div className={styles.head}>
          <div>
            <RevealLines as="h2" className={shared.h2}>
              Proyectos Recientes
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Una selección de proyectos donde el diseño, los materiales y la ejecución se alinean
              con la marca y la experiencia. Explora nuestro trabajo en espacios comerciales,
              corporativos y residenciales.
            </p>
          </div>
          <Link href="/proyectos" className={`${shared.link} ${styles.headLink}`}>
            Ver portafolio completo
            <span className={shared.arrow}>
              <Arrow s={15} />
            </span>
          </Link>
        </div>
      </div>

      <ScrollGridProjects />
    </section>
  );
}
