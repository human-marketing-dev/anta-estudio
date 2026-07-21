"use client";

import Link from "next/link";
import { RevealLines } from "@/components/anim";
import { Arrow } from "@/components/site";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/lib/projects";
import shared from "./home.module.css";
import styles from "./ProjectsSection.module.css";

/** Section 3 · Proyectos Recientes. Shows the featured projects (cover 4:5). */
export function ProjectsSection() {
  return (
    <section id="proyectos" className={`${shared.section} ${shared.sectionMist}`}>
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

        <div className={styles.grid}>
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
