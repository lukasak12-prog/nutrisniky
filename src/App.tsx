import { Layout } from "@/components/Layout";
import { useInView } from "@/hooks/use-in-view";
import { track } from "@/lib/analytics";
import { InbodyRow } from "@/components/InbodyRow";
import { SlideOver } from "@/components/SlideOver";
import { FoodTry } from "@/components/FoodTry";
import { VouchersTeaser } from "@/components/VouchersTeaser";
import uvod1000 from "@/assets/uvod-1000.webp";
import uvod2000 from "@/assets/uvod-2000.webp";
import uvod3200 from "@/assets/uvod-3200.webp";
import uvodMaska from "@/assets/uvod-maska.webp";
import uvodMaskaMobil from "@/assets/uvod-maska-mobil.webp";
import uvodMobil750 from "@/assets/uvod-mobil-750.webp";
import uvodMobil1200 from "@/assets/uvod-mobil-1200.webp";
import nicola800 from "@/assets/nicola-800.webp";
import nicola1600 from "@/assets/nicola-1600.webp";
import avatar from "@/assets/avatar2.jpg";
import { Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

const services = [
  {
    title: "Vstupní konzultace",
    duration: "60 minut",
    items: [
      "Délka konzultace 60 minut",
      "Kompletní anamnéza pacienta (osobní, rodinná, sociální...) antropometrie, nutriční anamnéza, léky a jiné",
      "Zhodnocení nutričního stavu + analýza 3 denního záznamu stravy",
      "Součástí je i měření na Inbody",
    ],
  },
  {
    title: "Následující konzultace",
    duration: "30 minut",
    items: [
      "Délka konzultace 30 minut",
      "Kontrola stravovacích návyků",
      "Edukace",
      "Odpovědi na nové otázky",
      "Měření na Inbody",
    ],
  },
  {
    title: "Online konzultace",
    description: "V mé nutriční ambulanci upřednostňuji osobní kontakt, který považuji za nenahraditelný. Osobní setkání nám umožňuje provést měření na Inbody a podrobněji probrat vaše obtíže. Nicméně jsou situace, kdy je kvůli větší vzdálenosti či jiným okolnostem výhodná online konzultace.",
    items: [
      "Délka konzultace 60 minut",
      "Kompletní anamnéza pacienta (osobní, rodinná, sociální...) nutriční anamnéza, léky a jiné",
      "Zhodnocení nutričního stavu + analýza 3 denního záznamu stravy",
      "Spojení přes WhatsApp, Messenger, Google Meet",
    ],
  },
  {
    title: "Individuální jídelníček",
    description: "Po úvodní konzultaci vám mohu zpracovat individuální jídelníček na 7 nebo 14 dní, který bude zohledňovat vaše osobní potřeby, zdravotní stav a podobně. Vypracovaný jídelníček vám bude následně zaslán na vaši e-mailovou adresu, nebo si ho můžete osobně vyzvednout.",
  },
  {
    title: "Inbody 270",
    description: "Přístroj Inbody umožňuje detailní analýzu složení těla, přičemž využívá bioimpedanční analýzu k měření různých parametrů lidského těla. Měření:",
    items: [
      "Celkovou hmotnost těla",
      "Hmotnost svalové hmoty",
      "Procento tělesného tuku",
      "Množství vody v těle",
      "Rozložení tuku a svalů v jednotlivých částech těla",
      "Bazální metabolický výdej",
      "A mnohem více...",
    ],
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Zadejte jméno").max(100),
  email: z.string().trim().email("Neplatný e-mail").max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().max(1000).optional(),
});

type Service = (typeof services)[number];

const minutesOf = (s: Service) => {
  const src = [s.duration ?? "", ...(s.items ?? [])].join(" ");
  const m = src.match(/(\d+)\s*minut/);
  return m ? Number(m[1]) : null;
};

/** Délka konzultace jako kruhový ukazatel (60 min = plný kruh). */
function DurationRing({ minutes, size = 64, compact = false }: { minutes: number; size?: number; compact?: boolean }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const filled = Math.min(minutes / 60, 1) * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${minutes} minut`} data-in="">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" className="stroke-sand" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeDasharray={`${filled} ${c}`}
          className="ring-fill stroke-turquoise"
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-bold text-foreground" style={{ fontSize: size * 0.28 }}>{minutes}</span>
        {!compact && <span className="mt-0.5 text-xs text-muted-foreground">min</span>}
      </span>
    </div>
  );
}

/** Jídelníček na 7 nebo 14 dní jako mřížka dní. */
function DayGrid() {
  return (
    <div className="shrink-0" role="img" aria-label="7 nebo 14 dní" data-in="">
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ "--d": `${i * 60}ms` } as React.CSSProperties} className={`h-3.5 w-3.5 rounded-full ${i < 7 ? "dot-on bg-turquoise" : "bg-sand"}`} />
        ))}
      </div>
      <p className="mt-1.5 flex justify-between text-xs text-muted-foreground">
        <span>7 dní</span>
        <span>14 dní</span>
      </p>
    </div>
  );
}

/** Jedna služba: vlevo délka (nebo počet dní), vedle název a co obsahuje. */
function ServiceRow({ s, featured = false }: { s: Service; featured?: boolean }) {
  const minutes = minutesOf(s);
  const isMenu = s.title.toLowerCase().includes("jídelníček");
  const items = (s.items ?? []).filter((i) => !i.startsWith("Délka konzultace"));
  const graphic = minutes ? <DurationRing minutes={minutes} size={featured ? 104 : 76} /> : isMenu ? <DayGrid /> : null;

  return (
    <div className={`grid gap-x-8 gap-y-4 sm:grid-cols-[8rem_minmax(0,1fr)] ${featured ? "rounded-lg bg-sand p-6 sm:p-9" : "rule px-0 pt-7 sm:px-9"}`}>
      <div>{graphic}</div>
      <div>
        <h3 className={featured ? "text-3xl" : "text-2xl"}>{s.title}</h3>
        {s.description && <p className="mt-3 max-w-prose text-muted-foreground">{s.description}</p>}
        {items.length > 0 && (
          <ul className="mt-4 grid gap-y-1.5">
            {items.map((item) => (
              <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.62em] before:h-[3px] before:w-2.5 before:bg-brown/60">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const priceGroups = [
  {
    title: "Konzultace",
    rows: [
      { name: "Vstupní konzultace", minutes: 60, note: "vč. InBody", price: "1000" },
      { name: "Následující konzultace", minutes: 30, price: "700" },
      { name: "Online konzultace", minutes: 60, price: "1000" },
    ],
  },
  {
    title: "Individuální jídelníček",
    rows: [
      { name: "na 7 dní", days: 7, price: "2000" },
      { name: "na 14 dní", days: 14, price: "4000" },
    ],
  },
  {
    title: "Měření na Inbody",
    rows: [
      { name: "bez interpretace výsledků", price: "280" },
      { name: "včetně interpretace výsledků", price: "350" },
    ],
  },
] as const;

const priceNotes = [
  { label: "Platba", text: "Pouze v hotovosti nebo přes QR kód" },
  { label: "Doklad", text: "Na poskytnuté služby vám bude vystavený přijímací doklad" },
  {
    label: "Pojišťovna",
    text: "Služby nutriční ambulance nejsou hrazeny zdravotní pojišťovnou. Některé služby splňující podmínky mohou být částečně proplaceny zdravotními pojišťovnami v rámci prevence.",
  },
];

const fmtPrice = (p: string) => new Intl.NumberFormat("cs-CZ").format(Number(p));

function DayBar({ days }: { days: number }) {
  return (
    <div className="grid w-[46px] shrink-0 grid-cols-7 gap-[3px]" role="img" aria-label={`${days} dní`} data-in="">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} style={{ "--d": `${i * 45}ms` } as React.CSSProperties} className={`h-[4px] rounded-full ${i < days ? "dot-on bg-turquoise" : "bg-sand"}`} />
      ))}
    </div>
  );
}

function PriceList() {
  return (
    <>
      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-3 xl:gap-x-20">
        {priceGroups.map((g) => (
          <div key={g.title}>
            <h3 className="text-2xl">{g.title}</h3>
            <ul className="mt-5">
              {g.rows.map((r) => (
                <li key={r.name} className="rule flex items-center gap-4 py-4">
                  {"minutes" in r ? (
                    <DurationRing minutes={r.minutes} size={46} compact />
                  ) : "days" in r ? (
                    <DayBar days={r.days} />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug">{r.name}</p>
                    {"minutes" in r && (
                      <p className="text-sm text-muted-foreground">
                        {r.minutes} minut{"note" in r && `, ${r.note}`}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 whitespace-nowrap text-right tabular-nums">
                    <span className="text-2xl font-bold">{fmtPrice(r.price)}</span> <span className="text-sm">Kč</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dl className="mt-14 grid gap-x-12 gap-y-6 md:grid-cols-3 xl:gap-x-20">
        {priceNotes.map((n) => (
          <div key={n.label}>
            <dt className="font-semibold">{n.label}</dt>
            <dd className="mt-1 text-muted-foreground">{n.text}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/* Vzorový jídelníček přímo z formuláře public/zaznam_stravy.docx */
const sampleMeals = [
  {
    meal: "snídaně",
    time: "7:30",
    place: "doma",
    foods: [
      ["chléb kmínový", "1 krajíc"],
      ["šunka |Amálka|", "2 plátky"],
      ["sýr eidam |30 %|", "2 plátky"],
      ["žervé |(Madeta)|", "10 g"],
      ["paprika červená", "půlka"],
    ],
    drink: "zelený čaj |250 ml|",
  },
  {
    meal: "přesnídávka",
    time: "10:00",
    place: "práce",
    foods: [
      ["jablko", "1 ks (100 g)"],
      ["bílý jogurt |Klasik (Olma)|", "150 g"],
    ],
    drink: "voda |500 ml|",
  },
  {
    meal: "oběd",
    time: "12:30",
    place: "práce",
    foods: [
      ["pečené filé na másle", "100 g"],
      ["brambory", "150 g"],
      ["okurka", "70 g"],
    ],
    drink: "voda |250 ml|",
  },
  {
    meal: "večeře",
    time: "18:30",
    place: "Vietnamská restaurace (Gỗ Brno)",
    foods: [["Bún bò Nam Bộ", "300 g"]],
    drink: "Ovocný čaj |(Pickwick)| |250 ml|",
  },
];

/** Text s |zvýrazněnými| částmi jako fixou. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split("|").map((part, i) =>
        i % 2 ? (
          <mark key={i} className="fixa">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function WeekStrip() {
  const days = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
  const picked = new Set([1, 3, 5]);
  return (
    <div className="mt-8 max-w-md" data-in="">
      <div className="flex items-end gap-2">
        {days.map((d, i) => (
          <span
            key={d}
            style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
            className={`flex aspect-square flex-1 items-center justify-center rounded-full text-sm font-semibold ${i === 5 ? "ml-4" : ""} ${
              picked.has(i) ? "dot-on bg-turquoise text-turquoise-foreground" : "bg-sand text-muted-foreground"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <p className="mt-2 flex justify-between text-sm text-muted-foreground">
        <span>2 všední dny</span>
        <span>1 den o víkendu</span>
      </p>
    </div>
  );
}

function FoodRecordSample() {
  return (
    <div className="relative pb-4" data-in="">
      {/* další dva listy pod vzorem = 3 dny záznamu */}
      <div className="sheet-3 absolute inset-x-5 bottom-0 top-8 rounded-lg border border-border bg-secondary" aria-hidden="true" />
      <div className="sheet-2 absolute inset-x-2.5 bottom-2 top-4 rounded-lg border border-border bg-secondary" aria-hidden="true" />

      <div className="relative rounded-lg border border-border bg-card">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 px-5 py-4 sm:px-7">
          <p className="font-semibold">Záznam stravy, 3 dny</p>
          <p className="text-sm text-muted-foreground">Příklad: vzorový jídelníček</p>
        </div>

        <div className="rule mx-5 hidden grid-cols-[8rem_1fr_6.5rem_9rem] gap-4 py-2.5 text-sm text-muted-foreground sm:mx-7 md:grid">
          <span>Čas, místo</span>
          <span>Seznam potravin</span>
          <span>Množství</span>
          <span>Nápoje</span>
        </div>

        {sampleMeals.map((m) => (
          <div key={m.meal} className="mx-5 grid gap-3 border-t border-border py-4 sm:mx-7 md:grid-cols-[8rem_1fr_6.5rem_9rem] md:gap-4">
            <div>
              <p className="font-semibold first-letter:uppercase">{m.meal}</p>
              <p className="text-sm tabular-nums text-muted-foreground">
                {m.time}, {m.place}
              </p>
            </div>
            <ul className="space-y-1 md:col-span-2">
              {m.foods.map(([food, qty]) => (
                <li key={food} className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[1fr_6.5rem]">
                  <span>
                    <Marked text={food} />
                  </span>
                  <span className="font-semibold tabular-nums">{qty}</span>
                </li>
              ))}
            </ul>
            <p>
              <Marked text={m.drink} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesSection() {
  const byTitle = (t: string) => services.find((x) => x.title === t)!;
  const first = byTitle("Vstupní konzultace");
  const rest = ["Následující konzultace", "Individuální jídelníček", "Online konzultace", "Inbody 270"].map(byTitle);
  return (
    <>
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="h-section">Služby</h2>
        <p className="mt-4 text-muted-foreground">Vyberte si podporu podle toho, kde se na své cestě právě nacházíte.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] xl:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h3 className="text-2xl">Nevíte, kde začít?</h3>
          <p className="mt-3 max-w-sm">Začněte vstupní konzultací. Probereme vše potřebné a doporučím, co dál.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#kontakt" className="btn btn-main">Objednat se</a>
            <a href="#cenik" className="btn btn-line">Ceník</a>
          </div>
        </div>

        <div className="grid gap-10">
          <ServiceRow s={first} featured />
          {rest.map((s) =>
            s.title === "Inbody 270" ? (
              <InbodyRow key={s.title} title={s.title} description={s.description} items={s.items ?? []} />
            ) : (
              <ServiceRow key={s.title} s={s} />
            ),
          )}
        </div>
      </div>
    </>
  );
}

const help = [
  { title: "Hubnutí a přibírání na váze", text: "Sestavím individuální plán pro dosažení zdravé tělesné hmotnosti" },
  { title: "Stravování při dietních omezeních", text: "Bezlaktózová, bezlepková nebo jiná specifická dieta, chutná a vyvážená řešení." },
  { title: "Zdravý životní styl", text: "Výživa přizpůsobená vašemu tempu života, pro více energie, pohody a vitality každý den." },
  { title: "Stravování při diabetu a dalších onemocněních", text: "Odborná výživová podpora při metabolických onemocněních a dalších zdravotních stavech." },
];

const benefits = [
  { title: "Odborná pomoc", text: 'Budu tu pro vás, pokud bude váha stagnovat nebo něco nepůjde podle vašich představ. Pomůžu Vám zůstat "on track" i při neočekávaných událostech.' },
  { title: "Individuální přístup", text: "Někomu k dosažení jeho cílů chybí znalosti, jinému zdravý vztah k jídlu. Budeme pracovat na tom, co vy konkrétně potřebujete." },
  { title: "Vyvážený jídelníček", text: "Pomůžu vám vyznat se v informacích o výživě i výběrem potravin. Připravím pro vás zdravé verze Vašich oblíbených jídel a poskytnu rychlé zdravé recepty." },
];

const about = [
  ["Vzdělání", "Vysokoškolsky vzdělaná nutriční terapeutka."],
  ["Praxe", "Desítky spokojených klientů."],
  ["Přístup", "Empatický a individuální."],
];

/**
 * Úvod: nápis je „namalovaný“ na skutečné zdi a Nicola sedí před ním. Fotka je jedna, nic se nevyřezává:
 * nápis se s ní násobí a maska ho nepustí na obličej, tričko a vnitřek vlasů. Přes okraje a jednotlivé
 * vlasy se násobit smí, na tmavém to není vidět, takže nevzniká žádný lem.
 */
function Hero() {
  return (
    <section id="hero" className="hero">
      <picture>
        {/* telefon: výřez na výšku se zdí nad hlavou */}
        <source media="(max-width: 599px)" srcSet={`${uvodMobil750} 750w, ${uvodMobil1200} 1200w`} sizes="100vw" width={1200} height={1759} />
        <img
          src={uvod2000}
          srcSet={`${uvod1000} 1000w, ${uvod2000} 2000w, ${uvod3200} 3200w`}
          sizes="100vw"
          alt="Mgr. Nicola Zounková, nutriční terapeutka v Tišnově"
          width={2000}
          height={1440}
          fetchPriority="high"
        />
      </picture>
      <h1 style={{ "--maska": `url(${uvodMaska})`, "--maska-mobil": `url(${uvodMaskaMobil})` } as React.CSSProperties}>
        <span>Nutriční</span> <span>terapeut</span>
      </h1>
      <div className="hero-text">
        <p>
          <strong>Mgr. Nicola Zounková</strong>
          <span className="block">Tišnov, online</span>
        </p>
        <div className="hero-go">
          <a href="#kontakt" className="btn btn-main">Kontakt</a>
          <a href="#sluzby" className="btn btn-line">Služby a ceník</a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  useScrollToHash();
  useInView();

  return (
    <Layout>
      {/* úvod stojí a následující sekce přes něj přejede */}
      <SlideOver>
        <Hero />
        <section className="help">
          <div className="mx-auto max-w-screen-2xl px-4">
            <h2>S čím vám mohu pomoci?</h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">Specializuji se na výživu při různých životních situacích a zdravotních stavech.</p>
            <ul className="mt-12 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-2 md:gap-y-14 xl:gap-x-20">
              {help.map((h, i) => (
                <li key={h.title} data-in="" style={{ "--d": `${(i % 2) * 120}ms` } as React.CSSProperties}>
                  <h3 className="text-2xl md:text-4xl">{h.title}</h3>
                  <p className="mt-3 max-w-prose text-muted-foreground">{h.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SlideOver>

      {/* SLUŽBY */}
      <section id="sluzby" className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <ServicesSection />
        </div>
      </section>

      {/* CENÍK */}
      <section id="cenik" className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <h2 className="h-section mb-14 text-center">Ceník služeb</h2>
          <PriceList />
        </div>
      </section>

      {/* DÁRKOVÉ POUKAZY: upoutávka na /poukazy */}
      <VouchersTeaser />

      {/* ZÁZNAM STRAVY */}
      <section id="zaznam-stravy" className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-screen-2xl items-start gap-12 px-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-20">
          <div>
            <h2 className="h-section">Záznam stravy</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Před každou konzultací je třeba si vést 3 denní záznam stravy, který mi zašlete na{" "}
                <span className="font-semibold text-foreground">můj e-mail</span> nejpozději tři dny před konzultací.
              </p>
              <p>
                Záznam stravy zahrnuje zapisování všeho, co jste během dne jedli a pili po dobu 3 dnů
                (2 pracovních a 1 víkendového). Pro inspiraci vám je k dispozici vzorový jídelníček.
                Je potřeba si zaznamenávat opravdu vše. To znamená přesně specifikovat, o jakou potravinu,
                pokrm nebo nápoj se jedná, uvádět značku, druh potraviny/pokrmu/nápoje, a přibližné
                množství, které jste zkonzumovali. Například gramáže jídel, objem vypitých nápojů v
                litrech nebo v mililitrech.
              </p>
            </div>
            <WeekStrip />
            <a href="/zaznam_stravy.docx" download className="btn btn-line mt-8">
              <Download className="h-4 w-4" aria-hidden="true" />
              Stáhnout záznam stravy (.docx)
            </a>
          </div>
          <FoodRecordSample />
        </div>
        <div className="mx-auto max-w-screen-2xl px-4">
          <FoodTry />
        </div>
      </section>

      {/* ODBORNÁ POMOC */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <h2 className="mx-auto max-w-4xl text-center text-3xl md:text-5xl">
            Zdravé stravování nemusí být tak těžké, když vám někdo podá pomocnou ruku!
          </h2>
          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3 xl:gap-x-20">
            {benefits.map((b) => (
              <li key={b.title} className="rule pt-5">
                <h3 className="text-2xl">{b.title}</h3>
                <p className="mt-3">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* O MNĚ */}
      <section id="o-mne" className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-20">
          <img
            src={nicola800}
            srcSet={`${nicola800} 800w, ${nicola1600} 1600w`}
            sizes="(min-width: 768px) 42vw, 100vw"
            alt="Mgr. Nicola Zounková při práci, na stole výsledky z InBody a potraviny"
            width={1600}
            height={1979}
            loading="lazy"
            className="w-full rounded-lg"
          />
          <div>
            <h2 className="h-section">Ráda Vám pomohu na vaší cestě</h2>
            <p className="mt-6 text-lg">
              Jmenuji se Nicola a jsem nutriční terapeutka. Vím, že zdravé stravování není o zákazech a přísných dietách, ale o porozumění vlastnímu tělu a hlavě.
            </p>
            <p className="mt-4 text-lg">
              Při své práci kombinuji odborné znalosti z nutriční terapie s psychologickým přístupem. Pomohu vám najít cestu, která vám vydrží bez výčitek a jojo efektu.
            </p>
            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {about.map(([t, d]) => (
                <div key={t} className="rule pt-3">
                  <dt className="font-semibold">{t}</dt>
                  <dd className="mt-1 text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h-section">Napište mi zprávu</h2>
            <p className="mt-4 text-muted-foreground">
              Ráda vám pomohu s vašimi obtížemi, nebo odpovím na jakýkoliv dotaz. Vždy se snažím odpovědět <strong>do 24 hodin</strong>.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-12 md:grid-cols-2 xl:gap-20">
            <div>
              <div className="flex items-center gap-5">
                <img src={avatar} alt="Nicola Zounková" width={96} height={96} className="h-20 w-20 shrink-0 rounded-full object-cover" />
                <p>
                  <span className="block text-xl font-semibold">Nicola Zounková</span>
                  <span className="text-muted-foreground">Nutriční terapeutka</span>
                </p>
              </div>
              <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {[
                  ["Telefon", <a href="tel:+420722671187" className="underline decoration-2 underline-offset-4 hover:text-teal">+420 722 671 187</a>],
                  ["E-mail", <a href="mailto:nutrisniky@seznam.cz" className="underline decoration-2 underline-offset-4 hover:text-teal">nutrisniky@seznam.cz</a>],
                  ["Adresa", "nám. Míru 24, 666 01 Tišnov 1 / Online"],
                  ["Otevírací hodiny", <>Po-Pá 15.00-19.00<span className="block text-muted-foreground">dle objednání</span></>],
                ].map(([t, d]) => (
                  <div key={t as string} className="rule pt-3">
                    <dt className="text-sm text-muted-foreground">{t}</dt>
                    <dd className="text-lg font-semibold [&_span]:text-base [&_span]:font-normal">{d}</dd>
                  </div>
                ))}
              </dl>

              <iframe
                title="Mapa – Nutrisniky, nám. Míru 24, Tišnov"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.5144188621166!2d16.421451576444987!3d49.349768271402944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471285004e2b401b%3A0xafbed84e21c2c6ba!2sAmbulance%20nutri%C4%8Dn%C3%ADho%20terapeuta%20-%20Nutrisniky!5e1!3m2!1scs!2scz!4v1778364808322!5m2!1scs!2scz"
                width="100%"
                height={300}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-8 w-full rounded-lg"
              />
              <a
                href="https://maps.app.goo.gl/zAEpi13V4t5hc9GQ6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-teal underline decoration-2 underline-offset-4 hover:text-foreground"
              >
                Otevřít v Google Maps
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Při příchodu z jiné stránky (např. /poukazy → /#kontakt) dojet na správnou sekci.
function useScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    const t = window.setTimeout(go, 100);
    // obrázky se dotahují a posouvají stránku — po načtení ještě jednou dorovnat
    window.addEventListener("load", go, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", go);
    };
  }, []);
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Zkontrolujte prosím formulář");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...result.data, company: fd.get("company") }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        setSent(true);
        track("generate_lead", { form: "kontakt" });
      } else {
        setError(data.error ?? "Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
      }
    } catch {
      setError("Nepodařilo se odeslat zprávu. Zkontrolujte připojení k internetu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field name="name" label="Jméno a příjmení" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Telefon" type="tel" />
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-semibold">Zpráva</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={1000}
          className="field"
        />
      </div>
      {error && (
        <p role="alert" className="rounded-lg border-2 border-destructive px-4 py-3 font-semibold">
          {error}
        </p>
      )}
      {sent ? (
        <div role="status" className="enter rounded-lg bg-turquoise px-5 py-4 text-turquoise-foreground">
          <p className="font-semibold">Zpráva byla úspěšně odeslána!</p>
          <p>Děkuji za váš zájem. Ozvu se vám brzy.</p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-brown w-full"
        >
          {submitting ? "Odesílám…" : "Odeslat zprávu"}
        </button>
      )}
      <p className="text-sm text-muted-foreground">
        Jak nakládám s údaji, popisují{" "}
        <a href="/ochrana-osobnich-udaju" target="_blank" rel="noopener" className="underline underline-offset-2">zásady ochrany osobních údajů</a>.
      </p>
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="mb-1.5 block font-semibold">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="field"
      />
    </div>
  );
}

export default HomePage;
