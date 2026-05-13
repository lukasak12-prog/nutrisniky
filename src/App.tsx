import { Layout } from "@/components/Layout";
import heroImg from "@/assets/nikca web.png";
import portrait from "@/assets/Nikča web.jpg";
import {
  MapPin, Sparkles, CalendarDays, Ruler, Pizza,
  HandHeart, ClipboardList, Salad, Check,
  GraduationCap, Award, Heart, Phone, Mail,
  Clock, MessageSquare, UtensilsCrossed, TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

const services = [
  {
    icon: Clock,
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
    icon: CalendarDays,
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
    icon: MessageSquare,
    title: "Online konzultace",
    description: "V mé nutriční ambulanci upřednostňuji osobní kontakt, který vím umožní osobní setkání. Osobní setkání provést měření na Inbody 270. Nicméně jsou situace, kdy je kvůli okolnostem vhodná online konzultace.",
    items: [
      "Délka konzultace 60 minut",
      "Kompletní anamnéza pacienta (osobní, rodinná, sociální...) nutriční anamnéza, léky a jiné",
      "Zhodnocení nutričního stavu + analýza 3 denního záznamu stravy",
      "Spojení přes WhatsApp, Messenger, Google Meet",
    ],
  },
  {
    icon: UtensilsCrossed,
    title: "Individuální jídelníček",
    description: "Po úvodní konzultaci vím mohu zpracovat individuální jídelníček na 7 nebo 14 dní, který bude zohledňovat vaše osobní potřeby, zdravotní stav a podobně. Vypracovaný jídelníček vím bude následně zaslán na vaši e-mailovou adresu, nebo si ho můžete osobně vyzvedout.",
  },
  {
    icon: TrendingUp,
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

const posts = [
  { title: "Proč diety nefungují (a co dělat místo nich)", excerpt: "Restriktivní diety vedou k jojo efektu. Vysvětlím proč a co dělat jinak.", date: "5. 4. 2026" },
  { title: "Emoční jídlo: jak ho rozpoznat", excerpt: "Často jíme z jiných důvodů než hladu. Jak si toho všimnout a co s tím.", date: "22. 3. 2026" },
  { title: "Bílkoviny v praxi: kolik a odkud", excerpt: "Praktický přehled, kolik bílkovin opravdu potřebujete a kde je najít.", date: "10. 3. 2026" },
];

const pricing = [
  { title: "Vstupní konzultace", price: "1000 Kč", duration: "60 minut" },
  { title: "Následující konzultace", price: "700 Kč", duration: "30 minut" },
  { title: "Online konzultace", price: "1000 Kč", duration: "60 minut" },
  { title: "Individuální jídelníček na 7 dní", price: "2000 Kč" },
  { title: "Individuální jídelníček na 14 dní", price: "4000 Kč" },
  { title: "Měření na Inbody bez interpretace výsledků", price: "280 Kč" },
  { title: "Měření na Inbody včetně interpretace výsledků", price: "350 Kč" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Zadejte jméno").max(100),
  email: z.string().trim().email("Neplatný e-mail").max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().max(1000).optional(),
});

function HomePage() {
  useRevealOnScroll();

  return (
    <Layout transparentHeader>
      {/* HERO */}
      <section id="hero" className="relative isolate min-h-[88vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Nutriční terapeutka v moderní kuchyni"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-[70%_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-screen-2xl items-center px-4 pt-32 pb-20">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.2em] backdrop-blur animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Sparkles className="h-3.5 w-3.5" /> Tišnov · Online
            </p>
            
            {/* Main Title with Background */}
            <div className="relative mb-8">
              {/* Subtle gradient background */}
              <div className="absolute -inset-6 bg-gradient-to-r from-turquoise/15 via-white/5 to-transparent rounded-3xl blur-2xl opacity-60"></div>
              
              <div className="relative">
                <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Nutriční terapeut
                </h1>
                <h2 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  
                </h2>
                <div className="mt-4 h-1 w-16 bg-gradient-to-r from-turquoise to-turquoise/50 rounded-full animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
                <p className="mt-6 text-2xl font-medium text-white/95 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  Mgr. Nicola Zounková
                </p>
              </div>
            </div>

            {/* Description with enhanced styling */}
            <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 p-8 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="absolute top-4 right-4 w-20 h-20 bg-turquoise/10 rounded-full blur-xl"></div>
              <p className="relative max-w-xl text-lg font-normal leading-8 text-white/95">
                <span className="font-semibold text-turquoise">Kromě toho, co jíst,</span> poradím i <span className="text-white">jak na zdravý vztah k jídlu a disciplínu.</span>
              </p>
              <p className="relative mt-4 max-w-xl text-lg font-normal leading-8 text-white/90">
                <span className="text-turquoise font-semibold">Společně najdeme cestu,</span> která vám <span className="font-semibold italic">vydrží.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <a
                href="#kontakt"
                className="rounded-full bg-turquoise px-8 py-4 text-sm font-semibold text-turquoise-foreground shadow-xl transition hover:shadow-2xl hover:scale-105 duration-300 transform"
              >
                Zhodnocení stravování zdarma
              </a>
              <a
                href="#sluzby"
                className="rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 hover:border-white/60 duration-300"
              >
                Služby a ceník
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* location strip */}
      <div className="border-b border-border/70 bg-background/70 py-5 text-center shadow-sm backdrop-blur">
        <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-5 py-2 text-sm font-medium text-muted-foreground shadow-sm">
          <MapPin className="h-4 w-4 text-turquoise" />
          <span>Tišnov</span> <span className="opacity-50">/</span> <span>Online</span>
        </p>
      </div>

      {/* benefits */}
      <section className="relative overflow-hidden bg-secondary py-28 md:py-32">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-turquoise/10 blur-3xl" />
        <div className="mx-auto max-w-screen-2xl px-4">
          <h2 className="reveal-on-scroll mx-auto max-w-3xl text-center text-3xl font-medium leading-tight md:text-4xl mb-4">
            Aby změna vydržela, musí vám vyhovovat. Zaměřuji se na to, abyste…
          </h2>
          <div className="reveal-on-scroll mx-auto max-w-3xl text-center mb-16" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="text-base text-muted-foreground">Společné řešení pro všechny vaše potřeby</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Benefit icon={<Sparkles className="h-10 w-10" />} title="…nejen vypadali dobře, ale i se dobře cítili" text="Najdeme způsob stravování, který dá vašemu tělu co potřebuje, abyste měli energii a cítili se skvěle." />
            <Benefit icon={<CalendarDays className="h-10 w-10" />} title="…rady dokázali začlenit i do hektického režimu" text='Dím vám návod, „jak jíst zdravě pro smrtelníky", kterí mají práci, rodinu a svůj život.' />
            <Benefit icon={<Ruler className="h-10 w-10" />} title="…si váhu udrželi až do konce života" text="Kromě jídla budeme pracovat i na vašem vztahu k jídlu a návycích. Získáte nad jídlem přirozenou kontrolu." />
            <Benefit icon={<Pizza className="h-10 w-10" />} title="…mohli jíst i jídla, která mají rádi a přesto hubli" text="Naučím vás základy zdravého stravování, abyste získali svobodu. Bez drastických omezení." />
          </div>
        </div>
      </section>

      {/* SERVICES & PRICING */}
      <section id="sluzby" className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-secondary py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Co nabízím</p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Služby</h2>
            <p className="mt-5 text-muted-foreground">Vyberte si podporu podle toho, kde se na své cestě právě nacházíte.</p>
          </div>

          <div className="space-y-6">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="reveal-on-scroll service-card group relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-35px_rgba(77,58,41,0.45)] backdrop-blur md:flex-row md:p-10"
                  style={{ "--reveal-delay": `${Math.min(idx * 90, 360)}ms` } as React.CSSProperties}
                >
                  {/* Icon Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-turquoise/5 rounded-full blur-3xl group-hover:bg-turquoise/10 transition-colors duration-500"></div>

                  {/* Icon Container */}
                  <div className="relative flex-shrink-0 flex items-start justify-center w-full md:w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-turquoise/15 group-hover:bg-turquoise/25 transition-all duration-500">
                      {Icon && <Icon className="w-10 h-10 text-turquoise group-hover:scale-110 transition-transform duration-500" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1">
                    <div className="flex flex-col gap-3 border-b border-border/70 pb-6 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Služba {idx + 1}</p>
                        <h3 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-turquoise md:text-3xl">{s.title}</h3>
                      </div>
                      <span className="inline-flex w-fit rounded-full bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm">
                        Nutriční péče
                      </span>
                    </div>
                    
                    {s.duration && (
                      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-turquoise/15 px-4 py-2 text-sm font-semibold text-turquoise">
                        <Clock className="h-4 w-4" />
                        {s.duration}
                      </p>
                    )}

                    {s.description && (
                      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{s.description}</p>
                    )}

                    {s.items && s.items.length > 0 && (
                      <ul className="mt-6 grid gap-3">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-turquoise/20 text-turquoise">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="leading-6">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href="#kontakt"
                      className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-turquoise to-turquoise/80 px-7 py-3 text-sm font-semibold text-turquoise-foreground shadow-lg shadow-turquoise/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      Mám zájem
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="cenik" className="bg-secondary py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Transparentní ceny</p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Ceník služeb</h2>
            <p className="mt-5 text-muted-foreground">Přehledné ceny bez skrytých poplatků.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {pricing.map((p, idx) => (
              <div
                key={p.title}
                className="reveal-on-scroll price-card group relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-7 shadow-[0_14px_45px_-32px_rgba(77,58,41,0.5)] transition-all duration-500 hover:-translate-y-1"
                style={{ "--reveal-delay": `${Math.min(idx * 70, 280)}ms` } as React.CSSProperties}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-turquoise/5 rounded-full blur-3xl group-hover:bg-turquoise/10 transition-colors duration-500"></div>
                
                <div className="relative">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-turquoise transition-colors duration-300 pr-20">{p.title}</h3>
                  
                  {p.duration && (
                    <p className="mt-2 text-sm text-muted-foreground">{p.duration}</p>
                  )}
                  
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-turquoise">{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="reveal-on-scroll mt-16 space-y-4 rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-turquoise/20">
                  <span className="text-turquoise font-semibold">•</span>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold text-turquoise">Platba:</span> Pouze v hotovosti nebo přes QR kód
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-turquoise/20">
                  <span className="text-turquoise font-semibold">•</span>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold text-turquoise">Doklad:</span> Na poskytnuté služby vím bude vystavený přijímací doklad
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-turquoise/20">
                  <span className="text-turquoise font-semibold">•</span>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold text-turquoise">Pojišťovna:</span> Služby nutriční ambulance nejsou hrazeny zdravotní pojišťovnou. Některé služby splňující podmínky mohou být částečně proplaceny zdravotními pojišťovnami v rámci prevence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* expert help */}
      <section className="bg-gradient-to-b from-secondary to-background py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <h2 className="reveal-on-scroll mx-auto max-w-3xl text-center text-3xl font-medium leading-tight md:text-4xl">
            Zdravé stravování nemusí být tak těžké, když vím nějaký podá pomocnou ruku!
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <Benefit icon={<HandHeart className="h-10 w-10" />} title="Odborná pomoc" text='Budu tu pro vás, pokud bude váha stagnovat nebo něco nepůjde podle vašich představ. Pomůžu Vám zůstat "on track" i při neočekávaných událostech.' />
            <Benefit icon={<ClipboardList className="h-10 w-10" />} title="Individuální přístup" text="Někomu k dosažení jeho cílů chybí znalosti, jinému zdravý vztah k jídlu. Budeme pracovat na tom, co vy konkrétně potřebujete." />
            <Benefit icon={<Salad className="h-10 w-10" />} title="Vyvážený jídelníček" text="Pomůžu vám vyznat se v informacích o výživě i výběrem potravin. Připravím pro vás zdravé verze Vašich oblíbených jídel a poskytnu rychlé zdravé recepty." />
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section id="o-mne" className="bg-background py-28 md:py-32">
        <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-4 md:grid-cols-2">
          <div className="reveal-on-scroll relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-turquoise/15 blur-2xl" />
            <img
              src={portrait}
              alt="Adéla Durčáková"
              width={800}
              height={800}
              className="relative aspect-square w-full rounded-[2rem] border border-white/50 object-cover shadow-[0_30px_80px_-45px_rgba(77,58,41,0.7)]"
            />
          </div>
          <div className="reveal-on-scroll rounded-[2rem] border border-border/80 bg-card/85 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)] md:p-10" style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">O mně</p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Ráda Vám pomohu na vaší cestě</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Jmenuji se Adéla a jsem nutriční terapeutka. Vím, že zdravé stravování není o zákazech a přísných dietách, ale o porozumění vlastnímu tělu a hlavě.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Při své práci kombinuji odborné znalosti z nutriční terapie s psychologickým přístupem. Pomohu vám najít cestu, která vám vydrží – bez výčitek a jojo efektu.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <AboutItem icon={<GraduationCap className="h-7 w-7" />} title="Vzdělání" text="Vysokoškolsky vzdělané nutriční terapeutka." />
              <AboutItem icon={<Award className="h-7 w-7" />} title="Praxe" text="Stovky spokojených klientů." />
              <AboutItem icon={<Heart className="h-7 w-7" />} title="Přístup" text="Empatický a individuální." />
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="bg-secondary py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Blog</p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Inspirace a tipy</h2>
            <p className="mt-5 text-muted-foreground">Krátké články o výživě, psychologii jídla a praktických návycích.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {posts.map((p, idx) => (
              <article key={p.title} className="reveal-on-scroll flex flex-col rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_14px_45px_-32px_rgba(77,58,41,0.5)] transition hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-[0_24px_60px_-35px_rgba(77,58,41,0.55)]" style={{ "--reveal-delay": `${idx * 100}ms` } as React.CSSProperties}>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{p.date}</p>
                <h3 className="mt-3 text-xl font-medium leading-snug">{p.title}</h3>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <a href="#kontakt" className="mt-6 text-sm font-medium text-brown underline-offset-4 hover:underline">Číst článek →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="bg-gradient-to-b from-secondary to-background py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Kontakt</p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Napište mi zprávu</h2>
            <p className="mt-5 text-muted-foreground">
              Ráda vím pomohu s vašimi obtížemi, nebo odpovím na jakýkoliv dotaz. Vždy se snažím odpovědět <strong>do 24 hodin</strong>.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-12 md:grid-cols-2">
            <div className="reveal-on-scroll space-y-6">
              <div className="space-y-5 rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)]">
                <div className="flex items-start gap-4">
                  <img src={portrait} alt="Nicola Zounková" width={96} height={96} className="h-20 w-20 shrink-0 rounded-full object-cover shadow-md" />
                  <div>
                    <p className="font-semibold">Nicola Zounková</p>
                    <p className="text-sm text-muted-foreground">Nutriční terapeutka</p>
                  </div>
                </div>
                <p className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-turquoise" /> nám. Míru 24, 666 01 Tišnov 1 / Online</p>
                <p className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-turquoise" /> +420 722 671 187</p>
                <p className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-turquoise" /> nutrisniky@seznam.cz</p>
                <div className="relative overflow-hidden rounded-2xl border border-turquoise/30 bg-gradient-to-br from-turquoise/20 via-turquoise/10 to-background p-5">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-turquoise/20 blur-2xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-turquoise text-turquoise-foreground shadow-lg shadow-turquoise/20">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-turquoise">Otevírací hodiny</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">Po-Pá 15.00-19.00</p>
                      <p className="mt-1 text-sm text-muted-foreground">dle objednání</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="overflow-hidden rounded-3xl border border-border/80 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.5144188621166!2d16.421451576444987!3d49.349768271402944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471285004e2b401b%3A0xafbed84e21c2c6ba!2sAmbulance%20nutri%C4%8Dn%C3%ADho%20terapeuta%20-%20Nutrisniky!5e1!3m2!1scs!2scz!4v1778364808322!5m2!1scs!2scz"
                  width="100%"
                  height={300}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              {/* Link to Google Maps */}
              <a
                href="https://maps.app.goo.gl/zAEpi13V4t5hc9GQ6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-turquoise/10 hover:bg-turquoise/20 border border-turquoise/30 px-6 py-3 text-sm font-medium text-turquoise transition-colors duration-300"
              >
                <MapPin className="h-4 w-4" />
                Otevřít v Google Maps
              </a>
            </div>

            <div className="reveal-on-scroll" style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Benefit({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="reveal-on-scroll benefit-card group relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-6 shadow-[0_14px_45px_-32px_rgba(77,58,41,0.5)] transition-all duration-500 hover:-translate-y-2 md:p-8">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-turquoise/5 rounded-full blur-3xl group-hover:bg-turquoise/10 transition-colors duration-500"></div>

      {/* Icon Container */}
      <div className="relative mb-5 flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-turquoise/15 text-brown transition-all duration-500 group-hover:bg-turquoise/25">
          <div className="group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="relative text-center">
        <h3 className="text-base md:text-lg font-semibold leading-snug text-foreground group-hover:text-turquoise transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {text}
        </p>
      </div>
    </div>
  );
}

function AboutItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-turquoise/20 text-brown">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)]">
      <Field name="name" label="Jméno a příjmení" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Telefon" type="tel" />
      <div>
        <label className="mb-2 block text-sm text-muted-foreground">Zpráva</label>
        <textarea
          name="message"
          rows={5}
          maxLength={1000}
          className="w-full rounded-2xl border border-input bg-background/80 px-5 py-4 text-sm shadow-inner transition focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/40"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {sent ? (
        <p className="rounded-full bg-turquoise/30 px-6 py-3 text-center text-sm font-medium text-foreground">
          Děkuji! Ozvu se vám brzy.
        </p>
      ) : (
        <button
          type="submit"
          className="w-full rounded-full bg-brown px-8 py-3.5 text-sm font-semibold text-brown-foreground shadow-lg shadow-brown/20 transition hover:-translate-y-0.5 hover:opacity-95"
        >
          Odeslat zprávu
        </button>
      )}
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="w-full rounded-full border border-input bg-background/80 px-5 py-3 text-sm shadow-inner transition focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/40"
      />
    </div>
  );
}

export default HomePage;
