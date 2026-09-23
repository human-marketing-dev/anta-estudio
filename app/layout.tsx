import type { Metadata } from "next";
import { Lato, Open_Sans, Poppins } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { businessLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

// Brand fonts: Lato (display), Open Sans (body/UI), Poppins (italic accent).
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const DESCRIPTION =
  "Despacho de arquitectura e interiorismo en Monterrey. Diseñamos y ejecutamos espacios comerciales, corporativos y residenciales, con más de 15 años de experiencia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anta Estudio — Despacho de Arquitectura en Monterrey",
  description: DESCRIPTION,
  // Defaults OG/Twitter para cualquier ruta que no los defina (todas usan
  // buildMetadata, esto es el respaldo).
  openGraph: {
    type: "website",
    siteName: "Anta Estudio",
    locale: "es_MX",
    url: "/",
    title: "Anta Estudio — Despacho de Arquitectura en Monterrey",
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Anta Estudio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anta Estudio — Despacho de Arquitectura en Monterrey",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${lato.variable} ${openSans.variable} ${poppins.variable}`}
    >
      <body>
        <JsonLd data={businessLd()} />
        {children}
      </body>
    </html>
  );
}
