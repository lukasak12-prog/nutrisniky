// SEO údaje pro jednotlivé stránky. Používá je scripts/prerender.mjs při buildu
// (titulek, popis, canonical, Open Graph a strukturovaná data se zapíšou přímo do HTML).

export const SITE_URL = "https://nutrisniky.cz";

export type PageSeo = {
  path: string;
  file: string; // výstupní soubor v dist/
  title: string;
  description: string;
  image: string;
  jsonLd?: Record<string, unknown>[];
};

const business = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#ambulance`,
  name: "Nutrisniky – ambulance nutričního terapeuta",
  description:
    "Nutriční terapie a poradenství v Tišnově i online: vstupní konzultace, jídelníček na míru, měření složení těla na InBody.",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og/og-home.jpg`,
  logo: `${SITE_URL}/nutrisniky2.png`,
  telephone: "+420722671187",
  email: "nutrisniky@seznam.cz",
  priceRange: "280–4000 Kč",
  currenciesAccepted: "CZK",
  paymentAccepted: "Hotovost, QR platba",
  address: {
    "@type": "PostalAddress",
    streetAddress: "nám. Míru 24",
    addressLocality: "Tišnov",
    postalCode: "666 01",
    addressCountry: "CZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 49.34977, longitude: 16.42145 },
  hasMap: "https://maps.app.goo.gl/zAEpi13V4t5hc9GQ6",
  areaServed: ["Tišnov", "Brno-venkov", "Česká republika"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "19:00",
    },
  ],
  employee: {
    "@type": "Person",
    name: "Mgr. Nicola Zounková",
    jobTitle: "Nutriční terapeutka",
  },
  sameAs: ["https://www.instagram.com/nutrisniky", "https://www.facebook.com/profile.php?id=61568124151775"],
};

export const pages: PageSeo[] = [
  {
    path: "/",
    file: "index.html",
    title: "Nutriční terapeut Tišnov | Nutrisniky – Mgr. Nicola Zounková",
    description:
      "Chcete zlepšit své stravování, zhubnout nebo vyřešit zažívací potíže? Nutriční terapie v Tišnově i online s individuálním přístupem, jídelníček na míru a měření na InBody.",
    image: "/og/og-home.jpg",
    jsonLd: [business],
  },
  {
    path: "/poukazy",
    file: "poukazy.html",
    title: "Dárkové poukazy | Nutrisniky – nutriční terapeut Tišnov",
    description:
      "Darujte péči o zdraví: dárkový poukaz na vstupní konzultaci, měření na InBody nebo jídelníček na míru od nutriční terapeutky v Tišnově. Od 350 Kč, platba QR kódem.",
    image: "/og/og-poukazy.jpg",
  },
];

export function pageByPath(path: string) {
  return pages.find((p) => p.path === path) ?? pages[0];
}

const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** HTML značky do <head> pro danou stránku. */
export function headTags(page: PageSeo) {
  const url = SITE_URL + page.path;
  const image = SITE_URL + page.image;
  const tags = [
    `<title>${attr(page.title)}</title>`,
    `<meta name="description" content="${attr(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="cs_CZ" />`,
    `<meta property="og:site_name" content="Nutrisniky" />`,
    `<meta property="og:title" content="${attr(page.title)}" />`,
    `<meta property="og:description" content="${attr(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  for (const data of page.jsonLd ?? []) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
  }
  return tags.join("\n    ");
}
