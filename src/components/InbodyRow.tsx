import { useEffect, useRef, useState } from "react";

const KG = 70;
const num = (n: number, d = 0) => n.toLocaleString("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d });

/**
 * Řádek služby InBody. Vlevo je místo kroužku s minutami 70 teček = 70 kg, posuvník mění jejich složení
 * a hodnoty se ukazují přímo u toho, co InBody měří.
 * Nejde o výsledek měření: počítá se z podílu tuku, bazální výdej podle Cunninghama (370 + 21,6 × beztuková hmota).
 */
export function InbodyRow({ title, description, items }: { title: string; description?: string; items: string[] }) {
  const [fat, setFat] = useState(18);
  const box = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  // jednou se samo posune, aby bylo vidět, co posuvník dělá
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now() + 500;
        const step = (t: number) => {
          if (touched.current) return;
          const p = Math.min(Math.max((t - t0) / 1600, 0), 1);
          setFat(Math.round(18 + 14 * (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.8 },
    );
    io.observe(box.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const fatKg = (KG * fat) / 100;
  const rest = KG - fatKg;
  const bmr = num(Math.round((370 + 21.6 * rest) / 10) * 10);
  const dots = Math.round(fatKg);

  const live: Record<string, string> = {
    "Celkovou hmotnost těla": `${KG} kg`,
    "Procento tělesného tuku": `${fat} %`,
    "Bazální metabolický výdej": `${bmr} kcal`,
  };

  return (
    <div className="rule grid gap-x-8 gap-y-6 pt-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:px-9">
      <div className="body-dots" ref={box}>
        <div className="dots" aria-hidden="true">
          {Array.from({ length: KG }, (_, i) => (
            <span key={i} className={i < dots ? "fat" : undefined} />
          ))}
        </div>
        <input
          type="range"
          min={12}
          max={40}
          value={fat}
          style={{ "--p": `${((fat - 12) / 28) * 100}%` } as React.CSSProperties}
          aria-label="Podíl tělesného tuku"
          aria-valuetext={`${fat} procent tuku, bazální výdej ${bmr} kcal`}
          onPointerDown={() => (touched.current = true)}
          onKeyDown={() => (touched.current = true)}
          onChange={(e) => {
            touched.current = true;
            setFat(Number(e.target.value));
          }}
        />
        <p className="text-sm tabular-nums text-muted-foreground">
          <span><i className="fat" />tuk {num(fatKg, 1)} kg</span>
          <span><i />zbytek {num(rest, 1)} kg</span>
        </p>
      </div>

      <div>
        <h3 className="text-2xl">{title}</h3>
        <p className="mt-3 max-w-prose text-muted-foreground">{description}</p>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.62em] before:h-[3px] before:w-2.5 before:bg-brown/60">
              {item} {live[item] && <b className="fixa ml-1 font-semibold tabular-nums">{live[item]}</b>}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">Posuňte a váha zůstane stejná, tělo ne. Příklad, ne výsledek měření.</p>
      </div>
    </div>
  );
}
