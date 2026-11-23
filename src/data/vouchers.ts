// Katalog dárkových poukazů — sdílí ho web (src/) i serverová funkce (functions/api/poukaz.ts).
// QR kódy k platbě jsou hotové obrázky v public/platba/ (vygenerované v bance).

export type Voucher = {
  id: "inbody" | "konzultace" | "jidelnicek";
  price: number;
  title: string;
  qr: string;
  items: { title: string; subtitle: string }[];
};

export const vouchers: Voucher[] = [
  {
    id: "inbody",
    price: 350,
    title: "Měření na InBody",
    qr: "/platba/qr-350.png",
    items: [{ title: "Měření na InBody", subtitle: "analýza složení těla" }],
  },
  {
    id: "konzultace",
    price: 1000,
    title: "Vstupní konzultace + InBody",
    qr: "/platba/qr-1000.png",
    items: [
      { title: "Vstupní konzultace", subtitle: "zhodnocení nutričního stavu" },
      { title: "Měření na InBody", subtitle: "analýza složení těla" },
    ],
  },
  {
    id: "jidelnicek",
    price: 3000,
    title: "Konzultace + jídelníček na 7 dní",
    qr: "/platba/qr-3000.png",
    items: [
      { title: "Vstupní konzultace", subtitle: "zhodnocení nutričního stavu" },
      { title: "Sestavení jídelníčku", subtitle: "na 7 dní" },
    ],
  },
];

/** Poslední den objednávek, které se stihnou poslat do Vánoc, např. "2026-12-20". Dokud je null, na webu se nic neukazuje. */
export const christmasOrderBy: string | null = null;

export function formatCzk(amount: number) {
  return `${new Intl.NumberFormat("cs-CZ").format(amount)} Kč`;
}
