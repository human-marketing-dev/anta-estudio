import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ProjectTile } from "@/components/ProjectTile";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Proyectos | Anta Estudio",
  description:
    "Portafolio de Anta Estudio: proyectos de arquitectura e interiorismo comercial, corporativo y residencial en Monterrey.",
};

export default function ProyectosPage() {
  return (
    <>
      <NavBar theme="light" cta="Solicitar propuesta" />
      <main className={styles.main}>
        <header className={styles.head}>
          <h1 className={styles.title}>Proyectos</h1>
          <p className={styles.sub}>
            Espacios comerciales, corporativos y residenciales donde el diseño, los materiales y la
            ejecución se alinean con la marca.
          </p>
        </header>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
