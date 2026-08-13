import type { StaticImageData } from "next/image";
import { RevealLines, ParallaxImage } from "@/components/anim";
import { getProject } from "@/lib/projects";
import shared from "@/components/home/home.module.css";
import styles from "./AboutStudio.module.css";

/**
 * "Sobre Nosotros" — the studio's about block (image + text), matching the
 * service pages. Reusable across the site; pass an image or it defaults to a
 * project cover.
 */
export function AboutStudio({
  image,
  alt = "Proyecto de Anta Estudio",
}: {
  image?: StaticImageData;
  alt?: string;
}) {
  const img = image ?? getProject("terraza-pangea")!.cover;

  return (
    <section className={shared.section}>
      <div className={styles.grid}>
        <div className={styles.media}>
          <ParallaxImage src={img} alt={alt} className={styles.img} sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
        <div className={styles.text}>
          <RevealLines as="h2" className={shared.h2}>
            Sobre Nosotros
          </RevealLines>
          <RevealLines as="h3" className={`${shared.h3big} ${styles.sub}`}>
            Un despacho de arquitectura e interiorismo con más de 15 años de experiencia
          </RevealLines>
          <p className={`${shared.body} ${styles.body}`}>
            Somos un equipo de arquitectos en Monterrey especializado en el diseño de espacios que
            funcionan, comunican y perduran. Durante más de 15 años hemos desarrollado proyectos
            comerciales, corporativos y residenciales, acompañando a nuestros clientes desde el
            análisis y la conceptualización hasta la gerencia y supervisión de obra. Diseñamos con
            visión integral —concepto, función e identidad— y cuidamos cada detalle para que el
            resultado final sea fiel a la intención original.
          </p>
        </div>
      </div>
    </section>
  );
}
