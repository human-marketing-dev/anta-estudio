import type { Metadata } from "next";
import heroWide from "@/public/proyectos/terraza-pangea/EA_AES_SRPA_24_001AV2_5260_P-e1771974642904.webp";
import heroPortrait from "@/public/proyectos/terraza-pangea/EA_AES_SRPA_24_004AV2_5324_P-scaled-1.webp";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { IntegralSection } from "@/components/home/IntegralSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Despacho de Arquitectura en Monterrey | Anta Estudio",
  description:
    "Despacho de arquitectura e interiorismo en Monterrey con +15 años de experiencia. Diseño y ejecución de proyectos comerciales, corporativos y residenciales.",
};

const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "/contacto" },
];

export default function Home() {
  return (
    <>
      {/* Nav overlays the hero (absolute) so the 100svh hero fills the viewport
          from the very top — otherwise the nav would push the hero down and clip
          its bottom (the CTAs). */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>
      <Hero
        image={{ src: heroWide, alt: "Terraza Pangea, proyecto de arquitectura de Anta Estudio en Monterrey" }}
        mobileImage={{ src: heroPortrait, alt: "Terraza Pangea, proyecto de arquitectura de Anta Estudio en Monterrey" }}
      />
      {/* Opaque wrapper above the sticky hero — it scrolls over the hero image. */}
      <div style={{ position: "relative", zIndex: 1, background: "var(--anta-white)" }}>
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <IntegralSection />
        <ClientsSection />
        <ReviewsSection />
        <ClosingCta />
        <Footer />
      </div>
    </>
  );
}
