import { useEffect, useRef } from "react";

/** První dítě (úvod) zůstane stát a lehce ustoupí, druhé přes něj při posunu přejede. */
export function SlideOver({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current!;
    const next = el.lastElementChild!;
    let raf = 0;
    const draw = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = next.getBoundingClientRect().top;
      // na začátku stránky vždy 0, i když další sekce vykukuje už před posunem
      const p = Math.min(Math.max(1 - top / Math.min(top + window.scrollY, vh), 0), 1);
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      raf ||= requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={box} className="slide">
      {children}
    </div>
  );
}
