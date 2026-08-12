import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { WhatsAppIcon, Arrow } from "@/components/site";
import { RevealLines, StaggerReveal, ParallaxImage, ProcessTimeline } from "@/components/anim";
import { ProjectTile } from "@/components/ProjectTile";
import { IntegralSection } from "@/components/home/IntegralSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getProject, type Project } from "@/lib/projects";
import shared from "@/components/home/home.module.css";
// Same design as Arquitectura Comercial — reuse its module so both stay in sync.
import styles from "../arquitectura-comercial/arquitectura-comercial.module.css";

export const metadata: Metadata = {
  title: "Arquitectura Corporativa y Diseño de Oficinas | Anta Estudio",
  description:
    "Diseño de oficinas e interiorismo corporativo en Monterrey. Creamos espacios que reflejan tu marca y mejoran la operación, con diseño y ejecución de principio a fin.",
};

const navLinks = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const perfiles = [
  { title: "Empresas en crecimiento", desc: "Necesitan oficinas a la altura de su siguiente etapa, sin frenar la operación." },
  { title: "Marcas que quieren elevar su percepción", desc: "Buscan un espacio que comunique solidez y profesionalismo a clientes y talento." },
  { title: "Equipos que necesitan eficiencia", desc: "Quieren optimizar el layout, los flujos y las áreas clave del día a día." },
  { title: "Negocios que van a remodelar", desc: "Van a renovar su espacio y quieren hacerlo con control de tiempos y presupuesto." },
];

// Line icons per profile (outline, inherit color from .perfilIcon → pink).
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const perfilIconos = [
  // Crecimiento — trending up
  <svg key="crecimiento" {...svgProps}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
  // Percepción — sparkle
  <svg key="percepcion" {...svgProps}>
    <path d="M12 3c.6 4 1.9 5.4 6 6-4.1.6-5.4 2-6 6-.6-4-1.9-5.4-6-6 4.1-.6 5.4-2 6-6Z" />
  </svg>,
  // Eficiencia — floor plan / layout
  <svg key="eficiencia" {...svgProps}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 10h16" />
    <path d="M11 10v10" />
  </svg>,
  // Remodelar — refresh
  <svg key="remodelar" {...svgProps}>
    <polyline points="21 4 21 9 16 9" />
    <polyline points="3 20 3 15 8 15" />
    <path d="M19.5 9A8 8 0 0 0 6 5.7L3 9m18 6-3 3.3A8 8 0 0 1 4.5 15" />
  </svg>,
];

const pasos = [
  { title: "Diagnóstico y objetivos", desc: "Entendemos tu operación, tu marca y la meta del proyecto." },
  { title: "Concepto y anteproyecto", desc: "Definimos la dirección estética y el layout del espacio." },
  { title: "Alcance y especificaciones", desc: "Aterrizamos materiales, acabados y detalles para decidir con claridad." },
  { title: "Presupuesto y calendario", desc: "Presentamos un presupuesto preciso y un calendario de obra realista." },
  { title: "Ejecución, supervisión y entrega", desc: "Coordinamos la obra de principio a fin y entregamos listo para operar." },
];

const pic = (slug: string, i = 0) => {
  const p = getProject(slug)!;
  return p.galeria[i] ?? p.cover;
};

const alcances = [
  { title: "Diseño de Oficinas", desc: "Distribución, ambientes y estaciones de trabajo pensados para la operación y la cultura de tu empresa.", image: pic("oficinas-majadma", 0) },
  { title: "Interiorismo Corporativo", desc: "Materiales, acabados, iluminación y atmósfera con estándar premium y coherencia de marca.", image: pic("e-80", 0) },
  { title: "Áreas Comunes y Salas de Juntas", desc: "Espacios de reunión, colaboración y recepción que reflejan profesionalismo.", image: pic("tp-zentralia", 0) },
  { title: "Remodelación y Adecuaciones", desc: "Renovación de oficinas existentes, optimizando lo que ya funciona sin perder control.", image: pic("valle-alto-club-de-golf", 0) },
  { title: "Mobiliario a Medida", desc: "Piezas y carpinterías especiales alineadas al concepto del espacio.", image: pic("e-80", 1) },
  { title: "Ejecución y Coordinación de Obra", desc: "Administración, supervisión y gestión de obra para entregar en tiempo y presupuesto.", image: pic("oficinas-majadma", 1) },
];

const diferenciadores = [
  { title: "Diseño + ejecución", desc: "Un solo estándar de principio a fin, sin fragmentar responsabilidades." },
  { title: "Planeación y precisión", desc: "Claridad de alcances que permite presupuestos precisos." },
  { title: "Enfoque premium", desc: "Detalle, materialidad y coherencia estética." },
  { title: "Coordinación integral", desc: "Menos fricción entre proveedores, más control de tiempos y calidad." },
];

const subInk = { color: "var(--anta-ink-30)" };

export default function ArquitecturaCorporativaPage() {
  const heroImg = getProject("oficinas-majadma")!.cover;
  const queEsImg = getProject("e-80")!.cover;
  const nosotrosImg = getProject("tp-zentralia")!.cover;
  const corporativo = ["e-80", "valle-alto-club-de-golf", "oficinas-majadma", "tp-zentralia"].flatMap((s) => {
    const p = getProject(s);
    return p ? [p as Project] : [];
  });

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>

      {/* 1 · HERO */}
      <header className={styles.hero}>
        <ParallaxImage src={heroImg} alt="Oficina — arquitectura corporativa de Anta Estudio" priority sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <RevealLines as="h1" className={styles.heroTitle}>
            Arquitectura Corporativa
          </RevealLines>
          <StaggerReveal>
            <p className={styles.heroSub}>
              Diseñamos y ejecutamos oficinas y espacios corporativos que reflejan tu marca, mejoran
              la operación y elevan la experiencia del equipo. Diseño e interiorismo de principio a
              fin, con más de 15 años de experiencia.
            </p>
            <div className={styles.ctas}>
              <Button as="a" href="/contacto">
                Solicitar propuesta
              </Button>
              <Button as="a" href="https://wa.me/528100000000" variant="outline" style={{ borderColor: "#fff", color: "#fff" }}>
                <WhatsAppIcon />
                Hablar por WhatsApp
              </Button>
            </div>
          </StaggerReveal>
        </div>
      </header>

      {/* 2 · ¿QUÉ ES? */}
      <section className={shared.section}>
        <div className={styles.queEs}>
          <div className={styles.queEsText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowTick} />
              Arquitectura e interiorismo corporativo
            </p>
            <RevealLines as="h2" className={shared.h2}>
              ¿Qué es la Arquitectura Corporativa?
            </RevealLines>
            <p className={`${shared.body} ${styles.lead}`}>
              La arquitectura corporativa es el diseño de espacios de trabajo que traducen la
              identidad de una empresa en un entorno real. Va más allá de la estética: se trata de
              organizar el espacio para que la operación fluya, la marca se sienta y el equipo trabaje
              mejor. En Anta Estudio diseñamos y construimos oficinas, corporativos y espacios para
              marcas que buscan cultura, eficiencia y presencia.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              Cada proyecto integra interiorismo corporativo, distribución y ejecución bajo un mismo
              estándar, para que el resultado final sea fiel a la intención original y esté listo para
              operar.
            </p>
          </div>

          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={queEsImg}
              alt="Interiorismo corporativo de Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <span className={styles.composeTag}>+15 años</span>
          </div>
        </div>
      </section>

      {/* 3 · ¿PARA QUIÉN? */}
      <section className={`${shared.section} ${shared.sectionMist}`}>
        <div className={shared.wrap}>
          <div className={styles.perfilSplit}>
            <div className={styles.perfilAside}>
              <RevealLines as="h2" className={shared.h2}>
                ¿Para quién es este servicio?
              </RevealLines>
              <p className={`${shared.body} ${styles.perfilIntro}`}>
                Diseñado para empresas que crecen, elevan su marca o remodelan sus oficinas —
                y para quienes entienden el espacio de trabajo como parte de su cultura y operación.
              </p>
            </div>
            <StaggerReveal
              as="ul"
              className={styles.perfilStack}
              childSelector={`.${styles.perfilItem}`}
              stagger={0.08}
              start="top 82%"
            >
              {perfiles.map((p, i) => (
                <li key={p.title} className={styles.perfilItem}>
                  <span className={styles.perfilIcon} aria-hidden="true">
                    {perfilIconos[i]}
                  </span>
                  <div className={styles.perfilBody}>
                    <h3 className={styles.perfilItemTitle}>{p.title}</h3>
                    <p className={styles.perfilItemDesc}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* 4 · PROYECTOS CORPORATIVOS */}
      <section className={shared.section}>
        <div className={shared.wrap}>
          <div className={styles.headRow}>
            <div className={styles.headText}>
              <RevealLines as="h2" className={shared.h2}>
                Proyectos Corporativos
              </RevealLines>
              <p className={`${shared.sub} ${styles.headSub}`}>
                Una selección de oficinas y espacios corporativos donde el diseño, los materiales y la
                ejecución se alinean con la marca.
              </p>
            </div>
            <Link href="/proyectos" className={shared.link}>
              Ver más proyectos corporativos
              <span className={shared.arrow}>
                <Arrow s={15} />
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {corporativo.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* 5 · NUESTRO PROCESO */}
      <section className={`${shared.section} ${shared.sectionInk}`}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Nuestro Proceso
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`} style={subInk}>
              Un proceso claro para alinear expectativas, definir alcances y ejecutar con control.
            </p>
          </div>
          <div className={styles.listWrap}>
            <ProcessTimeline steps={pasos} />
          </div>
        </div>
      </section>

      {/* 6 · ALCANCE DEL SERVICIO — tabs (mismo diseño que "Servicio Integral") */}
      <IntegralSection
        id="alcance"
        tone="white"
        heading="Alcance del Servicio"
        intro="Contigo en cada etapa: nos encargamos de todo lo que tu proyecto corporativo necesita, bajo un mismo estándar de calidad."
        items={alcances}
      />

      {/* 7 · POR QUÉ ANTA ESTUDIO */}
      <section className={`${shared.section} ${shared.sectionMist}`}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Por qué Anta Estudio
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Por qué las empresas nos eligen para su proyecto corporativo.
            </p>
          </div>
          <StaggerReveal className={styles.whyStrip} childSelector={`.${styles.whyItem}`} stagger={0.1}>
            {diferenciadores.map((d) => (
              <div key={d.title} className={styles.whyItem}>
                <span className={styles.whyDash} aria-hidden="true" />
                <span className={styles.whyTitle}>{d.title}</span>
                <p className={styles.whyDesc}>{d.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* 8 · SOBRE NOSOTROS */}
      <section className={shared.section}>
        <div className={styles.queEsRev}>
          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={nosotrosImg}
              alt="Proyecto corporativo de Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className={styles.queEsText}>
            <RevealLines as="h2" className={shared.h2}>
              Sobre Nosotros
            </RevealLines>
            <RevealLines as="h3" className={`${shared.h3big} ${styles.aboutSub}`}>
              Un despacho de arquitectura e interiorismo con más de 15 años de experiencia
            </RevealLines>
            <p className={`${shared.body} ${styles.aboutBody}`}>
              Somos un equipo de arquitectos en Monterrey especializado en el diseño de espacios que
              funcionan, comunican y perduran. Durante más de 15 años hemos desarrollado proyectos
              corporativos, comerciales y residenciales, acompañando a nuestros clientes desde el
              análisis y la conceptualización hasta la gerencia y supervisión de obra. En el ámbito
              corporativo, esto significa oficinas que reflejan la cultura de cada empresa y están
              listas para operar desde el primer día.
            </p>
          </div>
        </div>
      </section>

      {/* 9 · NUESTROS CLIENTES */}
      <ClientsSection />

      {/* 10 · RESEÑAS */}
      <ReviewsSection />

      {/* 11 · CTA DE CIERRE */}
      <ClosingCta
        title="¿Buscas Arquitectura Corporativa en Monterrey?"
        body="Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, ejecución y más de 15 años de experiencia para crear oficinas que reflejan tu marca y funcionan desde el primer día."
      />

      <Footer />
    </>
  );
}
