"use client";

import Image from "next/image";
import Link from "next/link";
import { MaskReveal } from "@/components/anim";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

/**
 * Project card — landscape (3:2) cover in a clip-reveal frame with the project
 * name overlaid on the image, hover scale. The name is a <span> (not a heading)
 * to keep it out of the page's heading hierarchy.
 */
export function ProjectCard({
  project,
  index = 0,
  sizes = "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw",
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
          <span className={styles.name}>{project.nombre}</span>
        </MaskReveal>
      </Link>
    </article>
  );
}
