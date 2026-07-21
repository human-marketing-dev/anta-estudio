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
  { label: "Contacto", href: "#cta" },
];

export default function Home() {
  return (
    <>
      <NavBar theme="light" links={navLinks} cta="Solicitar propuesta" />
      <Hero
        image={{ src: heroWide, alt: "Terraza Pangea, proyecto de arquitectura de Anta Estudio en Monterrey" }}
        mobileImage={{ src: heroPortrait, alt: "Terraza Pangea, proyecto de arquitectura de Anta Estudio en Monterrey" }}
      />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <IntegralSection />
      <ClientsSection />
      <ReviewsSection />
      <ClosingCta />
      <Footer />
    </>
  );
}
