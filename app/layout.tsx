import type { Metadata } from "next";
import { Lato, Open_Sans, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Anta Estudio — Despacho de Arquitectura en Monterrey",
  description:
    "Despacho de arquitectura e interiorismo en Monterrey. Diseñamos y ejecutamos espacios comerciales, corporativos y residenciales, con más de 15 años de experiencia.",
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
      <body>{children}</body>
    </html>
  );
}
