import Script from "next/script";

/**
 * Google Tag Manager (carga estándar del contenedor). Se desactiva si
 * NEXT_PUBLIC_GTM_ID está vacía o no tiene forma de ID ("GTM-XXXXXXX"); el
 * formato se valida porque el ID se interpola dentro de un script inline.
 *
 * NEXT_PUBLIC_* se incrusta en el build: cambiar el ID requiere rebuild.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
const enabled = /^GTM-[A-Z0-9]+$/.test(GTM_ID);

/**
 * Snippet de GTM. strategy="afterInteractive" (el default de next/script): se
 * inyecta después de la hidratación, así que no bloquea el render ni compite
 * con el LCP, y aún así corre en cuanto la página es interactiva — a tiempo
 * para registrar la visita. gtm.js se carga async igual que en el snippet
 * oficial.
 */
export function GoogleTagManager() {
  if (!enabled) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Fallback sin JavaScript. Va como primer hijo de <body>. */
export function GoogleTagManagerNoScript() {
  if (!enabled) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
