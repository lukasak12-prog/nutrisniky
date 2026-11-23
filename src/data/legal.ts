// Obchodní podmínky a zásady ochrany osobních údajů.
// Bez Reactu, protože stejný text posílá i potvrzovací e-mail (functions/api/poukaz.ts).
//
// Údaje s `ok: false` nikdo nepotvrdil. Na stránce jsou zvýrazněné a produkční build na nich
// záměrně spadne (scripts/prerender.mjs), aby se nehotové podmínky nedostaly na web.
// Po potvrzení stačí upravit `text` a přepnout na `ok: true`.

type Item = { text: string; ok: boolean; ask: string };

const items = {
  sidlo: {
    text: "č. p. 8, 664 71 Hvozdec",
    ok: true,
    ask: "Sídlo podle ARES, 23. 11. 2026",
  },
  zapis: {
    text: "Živnostenský rejstřík; Národní registr poskytovatelů zdravotních služeb",
    ok: true,
    ask: "Zápis podle ARES, 23. 11. 2026",
  },
  dph: { text: "Prodávající není plátcem DPH.", ok: true, ask: "Je Nicola plátce DPH?" },
  splatnost: { text: "7 dnů", ok: true, ask: "Do kdy má zákazník zaplatit?" },
  dodani: { text: "24 hodin", ok: true, ask: "Do kdy po zaplacení poukaz odešle?" },
  platnost: { text: "12 měsíců", ok: true, ask: "Jak dlouho poukaz platí od vystavení?" },
  storno: { text: "24 hodin", ok: true, ask: "Jak dlouho předem lze zrušit nebo přesunout termín?" },
  dotazy: { text: "1 roku", ok: true, ask: "Jak dlouho se uchovávají zprávy z formuláře?" },
  // při zveřejnění nastavit na den nasazení
  ucinnost: { text: "23. 11. 2026", ok: true, ask: "Od kdy podmínky platí?" },
} satisfies Record<string, Item>;

/** Nepotvrzené údaje jsou v textu obalené značkami ⟦ ⟧. */
const v = (key: keyof typeof items) => (items[key].ok ? items[key].text : `⟦${items[key].text}⟧`);

export const openItems = Object.values(items as Record<string, Item>)
  .filter((i) => !i.ok)
  .map((i) => i.ask);

export const seller = [
  ["Prodávající", "Mgr. Nicola Zounková"],
  ["IČO", "221 51 290"],
  ["Sídlo", v("sidlo")],
  ["Zápis", v("zapis")],
  ["Ambulance", "Poliklinika Tišnov, nám. Míru 24, 666 01 Tišnov"],
  ["Telefon", "+420 722 671 187"],
  ["E-mail", "nutrisniky@seznam.cz"],
] as const;

export type Section = { id: string; title: string; body: (string | string[])[] };

export const WITHDRAWAL_PATH = "/odstoupeni-od-smlouvy";
export const WITHDRAWAL_URL = `https://nutrisniky.cz${WITHDRAWAL_PATH}`;
export const VOUCHER_VALIDITY = v("platnost");

export const termsEffective = v("ucinnost");

export const terms: Section[] = [
  {
    id: "co-upravuji",
    title: "Co podmínky upravují",
    body: [
      "Podmínky platí pro dárkové poukazy objednané na stránce nutrisniky.cz/poukazy. Poukaz je potvrzení o předem zaplacené službě, kterou může využít kupující nebo obdarovaný.",
      "Smlouva se uzavírá v českém jazyce. Prodávající ukládá objednávku v e-mailu a kupující dostane její potvrzení i text těchto podmínek e-mailem.",
    ],
  },
  {
    id: "objednavka",
    title: "Objednávka a uzavření smlouvy",
    body: [
      "Kupující vybere poukaz, vyplní formulář a před odesláním může všechny údaje zkontrolovat a opravit. Objednávku odešle tlačítkem „Objednávka zavazující k platbě“.",
      "Smlouva je uzavřena ve chvíli, kdy kupujícímu přijde e-mail s potvrzením objednávky.",
    ],
  },
  {
    id: "cena",
    title: "Cena a platba",
    body: [
      `Cena uvedená u poukazu je konečná a za dodání e-mailem se nic nepřipočítává. ${v("dph")}`,
      `Platí se převodem na účet, nejsnáze QR kódem z potvrzovacího e-mailu, do ${v("splatnost")} od objednávky. Pokud platba v této lhůtě nedorazí, objednávka bez dalšího zaniká.`,
    ],
  },
  {
    id: "dodani",
    title: "Dodání poukazu",
    body: [
      `Poukaz posílá prodávající e-mailem na adresu z objednávky do ${v("dodani")} od připsání platby.`,
    ],
  },
  {
    id: "platnost",
    title: "Platnost a uplatnění",
    body: [
      `Poukaz platí ${v("platnost")} od vystavení. Datum konce platnosti je na poukazu. Službu je potřeba vyčerpat do tohoto data, potom nárok na ni zaniká.`,
      "Poukaz se uplatňuje domluvením termínu na telefonu 722 671 187 nebo e-mailu nutrisniky@seznam.cz a nahlášením čísla poukazu.",
      "Poukaz platí na službu, která je na něm uvedená, i kdyby se její cena mezitím zvýšila. Je přenosný a nelze ho vyměnit za hotovost. Tím není dotčeno právo odstoupit od smlouvy.",
      "Pokud prodávající nemůže službu do konce platnosti poskytnout, platnost přiměřeně prodlouží, nebo zaplacenou částku vrátí.",
    ],
  },
  {
    id: "terminy",
    title: "Zrušení a přesunutí termínu",
    body: [
      `Domluvený termín lze bezplatně zrušit nebo přesunout nejpozději ${v("storno")} předem telefonicky nebo e-mailem.`,
    ],
  },
  {
    id: "odstoupeni",
    title: "Odstoupení od smlouvy",
    body: [
      "Kupující, který je spotřebitelem, může od smlouvy odstoupit bez udání důvodu do 14 dnů od jejího uzavření. Právo náleží tomu, kdo poukaz koupil, ne obdarovanému.",
      `Odstoupit lze on-line na adrese ${WITHDRAWAL_URL}, e-mailem na nutrisniky@seznam.cz nebo jiným jednoznačným prohlášením zaslaným prodávajícímu před koncem lhůty. Použít lze i formulář níže, není to ale povinné.`,
      "Prodávající vrátí přijaté peníze do 14 dnů od odstoupení stejným způsobem, jakým je přijal, pokud se strany nedohodnou jinak. Kupujícímu tím nevznikají žádné náklady. Vrácený poukaz pozbývá platnosti.",
      "Má-li služba proběhnout ještě v této lhůtě, musí o to kupující výslovně požádat. Pokud potom odstoupí, zaplatí poměrnou část ceny za to, co už bylo poskytnuto. Úplným poskytnutím služby právo odstoupit zaniká.",
    ],
  },
  {
    id: "reklamace",
    title: "Reklamace a stížnosti",
    body: [
      "Vady služby nebo poukazu lze uplatnit na kontaktech prodávajícího. Reklamaci spotřebitele prodávající vyřídí bez zbytečného odkladu, nejpozději do 30 dnů, pokud se s ním nedohodne na delší lhůtě.",
    ],
  },
  {
    id: "spory",
    title: "Mimosoudní řešení sporů",
    body: [
      "Pokud se spor nepodaří vyřešit dohodou, může spotřebitel podat návrh na mimosoudní řešení u České obchodní inspekce: Ústřední inspektorát, oddělení ADR, Gorazdova 1969/24, 120 00 Praha 2, adr@coi.gov.cz, coi.gov.cz/informace-o-adr/.",
    ],
  },
];

export const withdrawalForm = [
  "Adresát: Mgr. Nicola Zounková, nám. Míru 24, 666 01 Tišnov, nutrisniky@seznam.cz",
  "Oznamuji, že tímto odstupuji od smlouvy o poskytnutí těchto služeb (dárkový poukaz):",
  "Datum objednání:",
  "Jméno a příjmení kupujícího:",
  "Adresa kupujícího:",
  "Podpis kupujícího (pouze při zaslání v listinné podobě):",
  "Datum:",
];

export const privacy: Section[] = [
  {
    id: "spravce",
    title: "Kdo údaje spravuje",
    body: [
      "Správcem je Mgr. Nicola Zounková, IČO 221 51 290. Ve věcech osobních údajů pište na nutrisniky@seznam.cz nebo volejte +420 722 671 187.",
      "Tento text popisuje údaje zpracované prostřednictvím webu. O údajích souvisejících s konzultací vás správce informuje samostatně.",
    ],
  },
  {
    id: "jake-udaje",
    title: "Jaké údaje a proč",
    body: [
      [
        "Kontaktní formulář: jméno, e-mail, telefon a zpráva. Slouží k vyřízení dotazu a jednání o službě. Základem je jednání před uzavřením smlouvy, případně oprávněný zájem odpovědět.",
        "Objednávka poukazu: jméno, e-mail, telefon, jména na poukaz a poznámka. Slouží k uzavření a splnění smlouvy a ke splnění daňových a účetních povinností.",
        "Odstoupení od smlouvy: jméno, e-mail a označení objednávky. Slouží ke splnění zákonné povinnosti.",
        "Měření návštěvnosti: údaje z Google Analytics, pouze s vaším souhlasem.",
      ],
      "Jméno a e-mail jsou pro vyřízení objednávky nutné, ostatní údaje jsou dobrovolné. Uvádíte-li na poukaz jméno obdarovaného, dejte mu o tom prosím vědět. Podrobnosti o zdravotním stavu do formulářů nepište, patří na konzultaci.",
    ],
  },
  {
    id: "prijemci",
    title: "Kdo údaje zpracovává",
    body: [
      [
        "Cloudflare: provoz webu a základní statistika návštěv bez cookies.",
        "Resend (Plus Five Five, Inc., USA): odesílání e-mailů z formulářů na webu. Zpracovatelská smlouva uvádí certifikaci EU-U.S. Data Privacy Framework a standardní smluvní doložky.",
        "Seznam.cz: e-mailová schránka.",
        "Google: Google Analytics po udělení souhlasu a mapa v sekci Kontakt.",
        "Banka a osoby zajišťující účetnictví, pokud údaje potřebují ke své práci.",
      ],
      "Mapa Google se na úvodní stránce načte, když se k ní posunete. Prohlížeč přitom předá Googlu technické údaje, například IP adresu.",
    ],
  },
  {
    id: "doba",
    title: "Jak dlouho",
    body: [
      [
        `Zprávy z kontaktního formuláře: do ${v("dotazy")} od vyřízení, pokud nenavazuje další služba.`,
        "Objednávky poukazů: po dobu smlouvy a obecné tříleté promlčecí lhůty. Daňové a účetní doklady po dobu, kterou ukládá zákon.",
        "Data Google Analytics: 14 měsíců.",
      ],
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "Bez souhlasu web analytické cookies neukládá. Vaše volba se uloží v prohlížeči (položka nutrisniky-cookies) a změnit ji můžete kdykoli odkazem „Nastavení cookies“ v patičce.",
      [
        "_ga: rozlišení návštěvníků, až 2 roky.",
        "_ga_9DKKN39Q2J: stav návštěvy, až 2 roky.",
      ],
    ],
  },
  {
    id: "prava",
    title: "Vaše práva",
    body: [
      "Máte právo na přístup k údajům, opravu, výmaz, omezení zpracování a přenositelnost. Proti zpracování z oprávněného zájmu můžete vznést námitku a souhlas s měřením můžete kdykoli odvolat.",
      "Stížnost můžete podat u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, uoou.gov.cz.",
    ],
  },
];

/** Text bez značek ⟦ ⟧ (do e-mailu). */
export const plain = (s: string) => s.replace(/[⟦⟧]/g, "");
