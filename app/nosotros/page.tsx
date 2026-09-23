import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { Arrow } from "@/components/site";
import { RevealLines, StaggerReveal, ParallaxImage, ProcessTimeline } from "@/components/anim";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { buildMetadata, breadcrumbList } from "@/lib/seo";
import { requireProject } from "@/lib/projects";
import janethFoto from "@/public/socias/janeth-galindo-anta-estudio.webp";
import jessicaFoto from "@/public/socias/jessica-gonzalez-anta-estudio.webp";
import shared from "@/components/home/home.module.css";
import styles from "./nosotros.module.css";

export const metadata = buildMetadata({
  title: "Nosotros — Despacho de Arquitectura en Monterrey | Anta Estudio",
  description:
    "Conoce a Anta Estudio: despacho de arquitectura e interiorismo en Monterrey con más de 15 años diseñando y construyendo espacios comerciales, corporativos y residenciales bajo un mismo estándar.",
  path: "/nosotros",
});

const navLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const pasos = [
  { title: "Diagnóstico y objetivos", desc: "Entendemos cómo se usa el espacio y qué quieres lograr." },
  { title: "Concepto y anteproyecto", desc: "Definimos la dirección estética y la distribución." },
  { title: "Alcance y especificaciones", desc: "Aterrizamos materiales, acabados y detalles para decidir con claridad." },
  { title: "Presupuesto y calendario", desc: "Presentamos un presupuesto preciso y un calendario de obra realista." },
  { title: "Ejecución, supervisión y entrega", desc: "Coordinamos la obra de principio a fin y entregamos listo para usar." },
];

const especialidades = [
  {
    n: "01",
    title: "Comercial",
    line: "Restaurantes, cafés, retail y hospitalidad.",
    href: "/servicios/arquitectura-comercial",
  },
  {
    n: "02",
    title: "Corporativo",
    line: "Oficinas, corporativos y espacios para marcas.",
    href: "/servicios/arquitectura-corporativa",
  },
  {
    n: "03",
    title: "Residencial",
    line: "Casas, departamentos y residencias premium.",
    href: "/servicios/arquitectura-residencial",
  },
];

const socias = [
  {
    nombre: "ARQ. Janeth Galindo Páez",
    rol: "Dirección de Ejecución de Proyectos",
    foto: janethFoto,
  },
  {
    nombre: "ARQ. Jessica González Cavazos",
    rol: "Dirección de Diseño de Proyectos",
    foto: jessicaFoto,
  },
];

const heroImg = requireProject("terraza-pangea").cover;
const quienesImg = requireProject("e-80").cover;

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Inicio", path: "/" },
          { name: "Nosotros", path: "/nosotros" },
        ])}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>

      <main>
        {/* 1 · HERO */}
        <header className={styles.hero}>
          <ParallaxImage
            src={heroImg}
            alt="Proyecto de arquitectura de Anta Estudio en Monterrey"
            priority
            sizes="100vw"
            className={styles.heroMedia}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>
              <span className={styles.heroTick} />
              Sobre Anta Estudio
            </p>
            <RevealLines as="h1" className={styles.heroTitle}>
              Diseñamos espacios que funcionan, comunican y perduran.
            </RevealLines>
            <StaggerReveal>
              <p className={styles.heroSub}>
                Despacho de arquitectura e interiorismo en Monterrey con más de 15 años de
                experiencia, diseñando y construyendo proyectos comerciales, corporativos y
                residenciales.
              </p>
            </StaggerReveal>
          </div>
        </header>

        {/* 2 · QUIÉNES SOMOS */}
        <section className={shared.section}>
          <div className={`${shared.wrap} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowTick} />
                Quiénes somos
              </p>
              <RevealLines as="h2" className={shared.h2}>
                Un despacho de arquitectura e interiorismo con más de 15 años de experiencia
              </RevealLines>
              <p className={`${shared.body} ${styles.leadBody}`}>
                Somos un equipo de arquitectas y arquitectos en Monterrey especializado en diseñar
                espacios y llevarlos a la realidad. Trabajamos con una misma forma de hacer las
                cosas: entender primero cómo se usa un espacio y después darle forma, cuidando cada
                detalle desde el concepto hasta la obra terminada.
              </p>
              <p className={`${shared.body} ${styles.leadBody}`}>
                En más de 15 años hemos desarrollado proyectos comerciales, corporativos y
                residenciales, acompañando a cada cliente del análisis y la conceptualización a la
                gerencia y supervisión de obra.
              </p>
            </div>
            <div className={styles.splitMedia}>
              <ParallaxImage
                src={quienesImg}
                alt="Proyecto corporativo de Anta Estudio"
                className={styles.splitImg}
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* 3 · NUESTRAS SOCIAS */}
        <section className={shared.section}>
          <div className={shared.wrap}>
            <div className={styles.sociasHead}>
              <RevealLines as="h2" className={shared.h2}>
                Nuestras Socias
              </RevealLines>
              <p className={`${shared.sub} ${styles.sociasSub}`}>
                Liderado por profesionales con visión estratégica, pasión por el diseño y más de una
                década de experiencia en proyectos de alto nivel.
              </p>
            </div>
            <div className={styles.socias}>
              {socias.map((s) => (
                <div key={s.nombre} className={styles.sociaCard}>
                  <Image
                    src={s.foto}
                    alt={s.nombre}
                    placeholder="blur"
                    sizes="(max-width: 560px) 100vw, 50vw"
                    className={styles.sociaPhoto}
                  />
                  <h3 className={styles.sociaName}>{s.nombre}</h3>
                  <p className={styles.sociaRole}>{s.rol}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · CONTIGO EN CADA ETAPA */}
        <section className={`${shared.section} ${shared.sectionMist}`}>
          <div className={`${shared.wrap} ${styles.narrow}`}>
            <RevealLines as="h2" className={shared.h2}>
              Contigo en cada etapa
            </RevealLines>
            <p className={`${shared.body} ${styles.leadBody}`}>
              Muchos proyectos se complican cuando el diseño y la obra van por caminos separados. En
              Anta Estudio nos encargamos de todo el proceso —diseño arquitectónico, interiorismo,
              remodelación, ejecución y coordinación— bajo un mismo estándar de calidad. Eso
              significa un solo interlocutor, alcances claros y menos fricción entre proveedores.
            </p>
          </div>
        </section>

        {/* 5 · NUESTRO PROCESO */}
        <section className={shared.section}>
          <div className={shared.wrap}>
            <div className={styles.specHead}>
              <RevealLines as="h2" className={shared.h2}>
                Nuestro Proceso
              </RevealLines>
              <p className={`${shared.sub}`}>
                Un proceso claro para alinear expectativas, definir alcances y ejecutar con control.
              </p>
            </div>
            <ProcessTimeline steps={pasos} />
          </div>
        </section>

        {/* 6 · TRES ESPECIALIDADES */}
        <section className={`${shared.section} ${shared.sectionMist}`}>
          <div className={shared.wrap}>
            <div className={styles.specHead}>
              <RevealLines as="h2" className={shared.h2}>
                Nuestras Tres Especialidades
              </RevealLines>
              <p className={`${shared.sub}`}>
                Cubrimos el proceso completo en tres grandes áreas: del concepto y el interiorismo a
                la ejecución y coordinación de obra.
              </p>
            </div>
            <div className={styles.specs}>
              {especialidades.map((e) => (
                <Link key={e.n} href={e.href} className={styles.spec}>
                  <span className={styles.specNum}>{e.n}</span>
                  <span className={styles.specTitle}>{e.title}</span>
                  <span className={styles.specLine}>{e.line}</span>
                  <span className={styles.specGo}>
                    Ver servicio
                    <Arrow s={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7 · NUESTROS CLIENTES */}
        <ClientsSection />

        {/* 8 · RESEÑAS */}
        <ReviewsSection />

        {/* 9 · CTA DE CIERRE */}
        <ClosingCta
          title="¿Empezamos tu proyecto?"
          body="Nos encantaría conocer tu proyecto. Cuéntanos lo básico y te contactamos para aterrizar alcance, tiempos y siguientes pasos."
        />
      </main>
      <Footer />
    </>
  );
}
