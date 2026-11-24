import { vouchers, formatCzk } from "@/data/vouchers";
import img350 from "@/assets/poukazy/poukaz-350.png";
import img1000 from "@/assets/poukazy/poukaz-1000.png";
import img3000 from "@/assets/poukazy/poukaz-3000.png";

// Malá upoutávka na úvodní stránce → odkaz na /poukazy
const fan = [
  { src: img350, cls: "fan-left", name: "poukaz-inbody" },
  { src: img3000, cls: "fan-right", name: "poukaz-jidelnicek" },
  { src: img1000, cls: "fan-mid", name: "poukaz-konzultace" },
];

export function VouchersTeaser() {
  const minPrice = Math.min(...vouchers.map((v) => v.price));

  return (
    <section className="bg-secondary pb-24 md:pb-32">
      <div className="mx-auto max-w-screen-2xl px-4">
        <a
          href="/poukazy"
          data-in=""
          className="teaser group relative grid items-center gap-10 overflow-hidden rounded-lg bg-card p-7 md:grid-cols-[1fr_1.1fr] md:p-14"
        >
          <div className="pointer-events-none absolute -right-24 -top-32 h-56 w-56 rounded-full md:h-96 md:w-96 bg-sand" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl">Darujte péči o zdraví</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Poukaz na konzultaci, měření na InBody nebo jídelníček na míru. Od {formatCzk(minPrice)}, zaplatíte
              jednoduše QR kódem.
            </p>
            <span className="btn btn-main mt-7 group-hover:bg-[oklch(0.83_0.1_192)]">
              Prohlédnout poukazy
            </span>
          </div>

          <div className="relative mx-auto h-44 w-full max-w-lg sm:h-64" aria-hidden="true">
            {fan.map((f) => (
              <img
                key={f.src}
                src={f.src}
                alt=""
                loading="lazy"
                style={{ viewTransitionName: f.name }}
                className={`fan absolute aspect-[1588/748] w-[68%] rounded-lg object-cover shadow-[0_10px_22px_-12px_rgba(77,58,41,0.6)] ${f.cls}`}
              />
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}
