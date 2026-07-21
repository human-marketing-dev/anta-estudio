"use client";

import Image from "next/image";
import Link from "next/link";
import { MaskReveal } from "@/components/anim";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

/**
 * Project card — cover in a 4:5 clip-reveal frame, hover scale, title below.
 * The title is a <span> (not a heading) so it never competes with page H2/H3.
 * Category label is intentionally omitted until projects are categorized.
 */
export function ProjectCard({
  project,
  index = 0,
  sizes = "(max-width: 860px) 100vw, 33vw",
}: {
  project: Project;
  index?: number;
  sizes?: string;
}) {
  return (
    <article className={styles.card}>
      <Link href={`/proyectos/${project.slug}`} className={styles.cardLink}>
        <MaskReveal variant="clip" direction="up" delay={index * 0.08} className={styles.frame}>
          <span className={styles.imgScale}>
            <Image
              src={project.cover}
              alt={project.nombre}
              fill
              placeholder="blur"
              sizes={sizes}
              style={{ objectFit: "cover" }}
            />
          </span>
        </MaskReveal>
        <div className={styles.meta}>
          <span className={styles.title}>{project.nombre}</span>
        </div>
      </Link>
    </article>
  );
}
