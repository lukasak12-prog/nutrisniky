import { ArrowRight, Gift } from "lucide-react";
import { vouchers, formatCzk } from "@/data/vouchers";
import img350 from "@/assets/poukazy/poukaz-350.png";
import img1000 from "@/assets/poukazy/poukaz-1000.png";
import img3000 from "@/assets/poukazy/poukaz-3000.png";

// Malá upoutávka na úvodní stránce → odkaz na /poukazy
const fan = [
  { src: img350, cls: "left-0 top-10 -rotate-[9deg] group-hover:-translate-x-3 group-hover:-rotate-[12deg]" },
  { src: img3000, cls: "right-0 top-12 rotate-[8deg] group-hover:translate-x-3 group-hover:rotate-[11deg]" },
  { src: img1000, cls: "left-1/2 top-0 -translate-x-1/2 group-hover:-translate-y-2" },
];

export function VouchersTeaser() {
  const minPrice = Math.min(...vouchers.map((v) => v.price));

  return (
    <section className="bg-secondary pb-20 md:pb-24">
      <div className="mx-auto max-w-screen-2xl px-4">
        <a
          href="/poukazy"
          className="reveal-on-scroll group relative grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-[0_28px_60px_-28px_rgba(131,197,190,0.55)] md:grid-cols-[1fr_1.1fr] md:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e9ddd2]/70" aria-hidden="true" />

          <div className="relative">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">
              <Gift className="h-4 w-4" /> Dárkové poukazy
            </p>
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">Darujte péči o zdraví</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              Poukaz na konzultaci, měření na InBody nebo jídelníček na míru. Od {formatCzk(minPrice)}, zaplatíte
              jednoduše QR kódem.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-turquoise-foreground shadow-lg shadow-turquoise/20 transition-all duration-300 group-hover:gap-3 group-hover:shadow-xl">
              Prohlédnout poukazy <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          <div className="relative mx-auto h-44 w-full max-w-md sm:h-56" aria-hidden="true">
            {fan.map((f) => (
              <img
                key={f.src}
                src={f.src}
                alt=""
                loading="lazy"
                className={`absolute aspect-[1588/748] w-[68%] rounded-xl object-cover shadow-[0_20px_40px_-22px_rgba(77,58,41,0.6)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${f.cls}`}
              />
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}
