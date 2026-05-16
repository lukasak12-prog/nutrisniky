import { Layout } from "@/components/Layout";
import heroImg from "@/assets/nikca web.png";
import portrait from "@/assets/portrait-optimized.jpg";
import avatar from "@/assets/avatar2.jpg";
import {
  MapPin, Sparkles, CalendarDays, Ruler, Pizza,
  HandHeart, ClipboardList, Salad, Check,
  GraduationCap, Award, Heart, Phone, Mail,
  Clock, MessageSquare, UtensilsCrossed, TrendingUp, Download,
  Scale, Leaf, Dumbbell, Activity, ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    description: "V mé nutriční ambulanci upřednostňuji osobní kontakt, který považuji za nenahraditelný. Osobní setkání nám umožňuje provést měření na Inbody a podrobněji probrat vaše obtíže. Nicméně jsou situace, kdy je kvůli větší vzdálenosti či jiným okolnostem výhodná online konzultace.",
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
    description: "Po úvodní konzultaci vám mohu zpracovat individuální jídelníček na 7 nebo 14 dní, který bude zohledňovat vaše osobní potřeby, zdravotní stav a podobně. Vypracovaný jídelníček vám bude následně zaslán na vaši e-mailovou adresu, nebo si ho můžete osobně vyzvednout.",
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

function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="grid items-start gap-4 sm:grid-cols-2">
      {services.map((s, idx) => {
        const Icon = s.icon;
        const isActive = activeIdx === idx;
        const isCentered = idx === 4;
        return (
          <div
            key={s.title}
            className={`reveal-on-scroll ${isCentered ? "sm:col-span-2 sm:flex sm:justify-center" : ""}`}
            style={{ "--reveal-delay": `${Math.min(idx * 80, 240)}ms` } as React.CSSProperties}
          >
            <div
              className={`relative overflow-hidden rounded-3xl border bg-card/90 shadow-[0_14px_45px_-32px_rgba(77,58,41,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:bg-card hover:shadow-[0_24px_60px_-20px_rgba(131,197,190,0.45)] ${
                isActive
                  ? "border-turquoise/50 shadow-[0_18px_50px_-24px_rgba(77,58,41,0.5)]"
                  : "border-border/80 hover:border-turquoise/40"
              } ${isCentered ? "w-full sm:w-[calc(50%-8px)]" : ""}`}
            >
              {/* Ambient card shimmer */}
              <div
                className="animate-card-shimmer pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                style={{ animationDelay: `${idx * 1.8}s` }}
              />
              {/* Card header — clickable toggle */}
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-4 p-5 text-left"
                onClick={() => setActiveIdx((p) => (p === idx ? null : idx))}
                aria-expanded={isActive}
              >
                <div
                  className={`animate-float relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-colors duration-300 ${isActive ? "bg-turquoise/25" : "bg-turquoise/12"}`}
                  style={{ animationDelay: `${idx * 0.6}s` }}
                >
                  <div
                    className="animate-card-shimmer absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
                    style={{ animationDelay: `${idx * 2}s` }}
                  />
                  <Icon className="relative z-10 h-6 w-6 text-turquoise" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-lg font-bold leading-snug tracking-tight transition-colors duration-300 ${isActive ? "text-turquoise" : "text-foreground"}`}>{s.title}</h3>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "rotate-180 text-turquoise" : "text-muted-foreground"}`}
                />
              </button>

              {/* Accordion body — slides down on expand */}
              <div
                style={{
                  maxHeight: isActive ? "700px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
                  opacity: isActive ? 1 : 0,
                }}
              >
                <div className="px-5 pb-6">
                  <div className="mb-4 h-px bg-border/60" />
                  {s.duration && (
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise/15 px-4 py-1.5 text-sm font-semibold text-turquoise">
                      <Clock className="h-3.5 w-3.5" /> {s.duration}
                    </p>
                  )}
                  {s.description && (
                    <p className="mb-4 text-sm leading-7 text-muted-foreground">{s.description}</p>
                  )}
                  {s.items && s.items.length > 0 && (
                    <ul className="mb-5 grid gap-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 px-4 py-2.5 text-sm">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-turquoise/20 text-turquoise">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="leading-6 text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href="#kontakt"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-turquoise to-turquoise/80 px-6 py-2.5 text-sm font-semibold text-turquoise-foreground shadow-md shadow-turquoise/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Mám zájem
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HeroDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ opacity: 0.1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="h-full w-full max-h-[500px] max-w-[500px] text-turquoise"
      >
        <circle cx="200" cy="200" r="55"  stroke="currentColor" strokeWidth="1.5" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0s' }} />
        <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1"   className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.7s' }} />
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.75" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.4s' }} />
        <circle cx="200" cy="200" r="192" stroke="currentColor" strokeWidth="0.5" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '2.1s' }} />
        <path
          d="M200 128 C224 145 230 168 200 178 C170 168 176 145 200 128 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          className="animate-pulse"
          style={{ animationDuration: '4s', animationDelay: '0.4s' }}
        />
      </svg>
    </div>
  );
}

function HeroMobilePhoto({ src }: { src: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const wrapper = wrapperRef.current;
    if (!img || !wrapper) return;

    const onScroll = () => {
      if (window.innerWidth >= 768) return;
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      img.style.transform = `translateY(${(progress - 0.5) * -30}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-4 -mt-4 mb-6 overflow-hidden rounded-3xl shadow-lg"
      style={{ height: '50vh' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Nutriční terapeutka Nicola Zounková"
        className="h-[115%] w-full object-cover object-[80%_top] animate-fade-in-up"
        style={{ marginTop: '-15px', willChange: 'transform' }}
      />
    </div>
  );
}

function HomePage() {
  useRevealOnScroll();

  return (
    <Layout transparentHeader>
      {/* HERO */}
      <section id="hero" className="w-full overflow-hidden">

        {/* ━━━ MOBILE layout (< md) ━━━ */}
        <div className="flex flex-col bg-background md:hidden">
          {/* Text block with subtle SVG decoration behind */}
          <div className="relative overflow-hidden px-6 pb-10 pt-24 text-center">
            <HeroDecoration />
            <div className="relative z-10 mx-auto max-w-sm">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-turquoise/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-turquoise animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Sparkles className="h-3.5 w-3.5" /> Tišnov · Online
              </p>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-foreground animate-fade-in-up sm:text-5xl" style={{ animationDelay: '0.2s' }}>
                Nutriční terapeut
              </h1>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-turquoise to-turquoise/50 animate-fade-in" style={{ animationDelay: '0.35s' }} />
              <p className="mt-5 text-xl font-medium text-foreground/80 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
                Mgr. Nicola Zounková
              </p>
              <div className="mt-8 rounded-2xl border border-turquoise/20 bg-turquoise/10 p-5 text-left animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
                <p className="text-sm font-medium leading-7 text-foreground">
                  <span className="font-semibold text-turquoise">Kromě toho, co jíst,</span> poradím i jak na zdravý vztah k jídlu a disciplínu.
                </p>
                <p className="mt-3 text-sm font-medium leading-7 text-foreground">
                  <span className="font-semibold text-turquoise">Společně najdeme cestu,</span> která vám vydrží.
                </p>
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.65s' }}>
                <a
                  href="#kontakt"
                  className="w-full rounded-full bg-turquoise px-8 py-4 text-sm font-semibold text-turquoise-foreground shadow-lg transition hover:scale-105 hover:shadow-xl duration-300"
                >
                  Kontakt
                </a>
                <a
                  href="#sluzby"
                  className="w-full rounded-full border border-turquoise/40 bg-turquoise/10 px-8 py-4 text-sm font-medium text-turquoise transition hover:bg-turquoise/20 duration-300"
                >
                  Služby a ceník
                </a>
              </div>
            </div>
          </div>

          {/* Photo with scroll-based parallax + fade-in-up */}
          <HeroMobilePhoto src={heroImg} />
        </div>

        {/* ━━━ DESKTOP layout (≥ md) — original overlay unchanged ━━━ */}
        <div className="relative isolate hidden min-h-[88vh] md:block">
          <img
            src={heroImg}
            alt="Nutriční terapeutka v moderní kuchyni"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover object-[70%_18%] animate-hero-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-screen-2xl items-center px-4 pt-32 pb-20">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white backdrop-blur animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Sparkles className="h-3.5 w-3.5" /> Tišnov · Online
              </p>
              <div className="relative mb-8">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-turquoise/15 via-white/5 to-transparent blur-2xl opacity-60" />
                <div className="relative">
                  <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white animate-fade-in-up sm:text-6xl md:text-7xl lg:text-8xl" style={{ animationDelay: '0.2s' }}>
                    Nutriční terapeut
                  </h1>
                  <h2 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white animate-fade-in-up sm:text-6xl md:text-7xl lg:text-8xl" style={{ animationDelay: '0.3s' }}>
                    
                  </h2>
                  <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-turquoise to-turquoise/50 animate-fade-in" style={{ animationDelay: '0.4s' }} />
                  <p className="mt-6 text-2xl font-medium text-white/95 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    Mgr. Nicola Zounková
                  </p>
                </div>
              </div>
              <div className="relative mb-8 max-w-3xl overflow-hidden rounded-[2rem] border border-white/25 bg-black/35 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl animate-fade-in-up sm:p-8" style={{ animationDelay: '0.6s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/6 to-transparent" />
                <p className="relative max-w-2xl text-base font-medium leading-8 text-white sm:text-lg">
                  <span className="font-semibold text-turquoise">Kromě toho, co jíst,</span> poradím i jak na zdravý vztah k jídlu a disciplínu.
                </p>
                <p className="relative mt-4 max-w-2xl text-base font-medium leading-8 text-white sm:text-lg">
                  <span className="font-semibold text-turquoise">Společně najdeme cestu,</span> která vám vydrží.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <a
                  href="#kontakt"
                  className="rounded-full bg-turquoise px-8 py-4 text-sm font-semibold text-turquoise-foreground shadow-xl transition hover:shadow-2xl hover:scale-105 duration-300 transform"
                >
                  Kontakt
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
        </div>

      </section>


      {/* S CIM VAM MOHU POMOCI */}
      <section className="relative overflow-hidden bg-secondary py-28 md:py-32">
        <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-turquoise/8 blur-3xl" />
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Oblasti péče</p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">S čím vám mohu pomoci?</h2>
            <p className="mt-5 text-muted-foreground">Specializuji se na výživu při různých životních situacích a zdravotních stavech.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Scale,
                title: "Hubnutí a přibírání na váze",
                text: "Sestavím individuální plán pro dosažení zdravé tělesné hmotnosti",
                accent: "from-turquoise/30 to-turquoise/5",
                iconColor: "text-turquoise",
                iconBg: "bg-turquoise/15",
              },
              {
                icon: Leaf,
                title: "Stravování při dietních omezeních",
                text: "Bezlaktózová, bezlepková nebo jiná specifická dieta — chutná a vyvážená řešení.",
                accent: "from-emerald-500/20 to-emerald-500/5",
                iconColor: "text-emerald-600",
                iconBg: "bg-emerald-500/15",
              },
              {
                icon: Dumbbell,
                title: "Zdravý životní styl",
                text: "Výživa přizpůsobená vašemu tempu života — pro více energie, pohody a vitality každý den.",
                accent: "from-brown/20 to-brown/5",
                iconColor: "text-brown",
                iconBg: "bg-brown/15",
              },
              {
                icon: Activity,
                title: "Stravování při diabetu a dalších onemocněních",
                text: "Odborná výživová podpora při metabolických onemocněních a dalších zdravotních stavech.",
                accent: "from-sky-500/20 to-sky-500/5",
                iconColor: "text-sky-600",
                iconBg: "bg-sky-500/15",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="reveal-on-scroll group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-[0_14px_45px_-32px_rgba(77,58,41,0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-28px_rgba(77,58,41,0.5)]"
                  style={{ "--reveal-delay": `${idx * 110}ms` } as React.CSSProperties}
                >
                  {/* Visual area */}
                  <div className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${item.accent} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
                    {/* Shimmer sweep */}
                    <div
                      className="animate-card-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                      style={{ animationDelay: `${idx * 1.5}s` }}
                    />
                    {/* Icon with float */}
                    <div className="animate-float" style={{ animationDelay: `${idx * 0.55}s` }}>
                      <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl ${item.iconBg} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className={`h-10 w-10 ${item.iconColor}`} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-turquoise">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{item.text}</p>
                    <a href="#kontakt" className={`mt-6 inline-flex items-center text-sm font-semibold ${item.iconColor} hover:underline underline-offset-4`}>
                      Více informací →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES & PRICING */}
      <section id="sluzby" className="relative bg-gradient-to-b from-secondary via-background to-secondary py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise"></p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Služby</h2>
            <p className="mt-5 text-muted-foreground">Vyberte si podporu podle toho, kde se na své cestě právě nacházíte.</p>
          </div>

          <ServicesSection />
        </div>
      </section>

      {/* PRICING */}
      <section id="cenik" className="bg-secondary py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-2xl text-center mb-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise"></p>
            <h2 className="text-4xl font-medium leading-tight md:text-5xl">Ceník služeb</h2>
            <p className="mt-5 text-muted-foreground"></p>
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
                <span className="font-semibold text-turquoise">Doklad:</span> Na poskytnuté služby vám bude vystavený přijímací doklad
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

      {/* ZAZNAM STRAVY */}
      <section className="bg-background py-20 md:py-24">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="reveal-on-scroll mx-auto max-w-3xl rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)] md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Záznam stravy</h2>
            </div>

            <div className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                Před každou konzultací je třeba si vést 3 denní záznam stravy, který mi zašlete na{" "}
                <span className="font-semibold text-foreground">můj e-mail</span> nejpozději tři dny před konzultací.
              </p>
              <p>
                Záznam stravy zahrnuje zapisování všeho, co jste během dne jedli a pili po dobu 3 dnů
                (2 pracovních a 1 víkendového). Pro inspiraci vám je k dispozici vzorový jídelníček.
                Je potřeba si zaznamenávat opravdu vše. To znamená přesně specifikovat, o jakou potravinu,
                pokrm nebo nápoj se jedná — uvádět značku, druh potraviny/pokrmu/nápoje, a přibližné
                množství, které jste zkonzumovali. Například gramáže jídel, objem vypitých nápojů v
                litrech nebo v mililitrech.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/zaznam_stravy.docx"
                download
                className="inline-flex items-center gap-2.5 rounded-full border border-turquoise/40 bg-turquoise/10 px-6 py-3 text-sm font-semibold text-turquoise shadow-sm transition hover:bg-turquoise/20 hover:shadow-md"
              >
                <Download className="h-4 w-4" />
                Stáhnout záznam stravy (.docx)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* expert help */}
      <section className="bg-gradient-to-b from-secondary to-background py-28 md:py-32">
        <div className="mx-auto max-w-screen-2xl px-4">
          <h2 className="reveal-on-scroll mx-auto max-w-3xl text-center text-3xl font-medium leading-tight md:text-4xl">
            Zdravé stravování nemusí být tak těžké, když vám někdo podá pomocnou ruku!
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
              Jmenuji se Nicola a jsem nutriční terapeutka. Vím, že zdravé stravování není o zákazech a přísných dietách, ale o porozumění vlastnímu tělu a hlavě.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Při své práci kombinuji odborné znalosti z nutriční terapie s psychologickým přístupem. Pomohu vám najít cestu, která vám vydrží bez výčitek a jojo efektu.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <AboutItem icon={<GraduationCap className="h-7 w-7" />} title="Vzdělání" text="Vysokoškolsky vzdělaná nutriční terapeutka." />
              <AboutItem icon={<Award className="h-7 w-7" />} title="Praxe" text="Desítky spokojených klientů." />
              <AboutItem icon={<Heart className="h-7 w-7" />} title="Přístup" text="Empatický a individuální." />
            </div>
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
              Ráda vám pomohu s vašimi obtížemi, nebo odpovím na jakýkoliv dotaz. Vždy se snažím odpovědět <strong>do 24 hodin</strong>.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-12 md:grid-cols-2">
            <div className="reveal-on-scroll space-y-6">
              <div className="space-y-5 rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)]">
                <div className="flex items-start gap-4">
                  <img src={avatar} alt="Nicola Zounková" width={96} height={96} className="h-20 w-20 shrink-0 rounded-full object-cover shadow-md" />
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
      const res = await fetch("https://formspree.io/f/xzdonvvg", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.errors?.[0]?.message ?? "Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
      }
    } catch {
      setError("Nepodařilo se odeslat zprávu. Zkontrolujte připojení k internetu.");
    } finally {
      setSubmitting(false);
    }
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
      {error && (
        <p className="rounded-2xl bg-destructive/10 px-5 py-3 text-center text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      {sent ? (
        <div className="rounded-2xl border border-turquoise/30 bg-turquoise/10 px-6 py-5 text-center">
          <p className="text-sm font-semibold text-turquoise">✓ Zpráva byla úspěšně odeslána!</p>
          <p className="mt-1 text-sm text-foreground/70">Děkuji za váš zájem. Ozvu se vám brzy.</p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brown px-8 py-3.5 text-sm font-semibold text-brown-foreground shadow-lg shadow-brown/20 transition hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Odesílám…" : "Odeslat zprávu"}
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
