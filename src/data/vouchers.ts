// Katalog dárkových poukazů — sdílí ho web (src/) i serverová funkce (functions/api/poukaz.ts).
// QR kódy k platbě jsou hotové obrázky v public/poukazy/ (vygenerované v bance).

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
    qr: "/poukazy/qr-350.png",
    items: [{ title: "Měření na InBody", subtitle: "analýza složení těla" }],
  },
  {
    id: "konzultace",
    price: 1000,
    title: "Vstupní konzultace + InBody",
    qr: "/poukazy/qr-1000.png",
    items: [
      { title: "Vstupní konzultace", subtitle: "zhodnocení nutričního stavu" },
      { title: "Měření na InBody", subtitle: "analýza složení těla" },
    ],
  },
  {
    id: "jidelnicek",
    price: 3000,
    title: "Konzultace + jídelníček na 7 dní",
    qr: "/poukazy/qr-3000.png",
    items: [
      { title: "Vstupní konzultace", subtitle: "zhodnocení nutričního stavu" },
      { title: "Sestavení jídelníčku", subtitle: "na 7 dní" },
    ],
  },
];

export function formatCzk(amount: number) {
  return `${new Intl.NumberFormat("cs-CZ").format(amount)} Kč`;
}
