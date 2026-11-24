import { useEffect } from "react";

/** Prvkům [data-in] přidá třídu .in, jakmile jsou poprvé vidět. Pohyb samotný je v styles.css. */
export function useInView() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          // tahy zvýrazňovačem jdou po řádcích za sebou
          e.target.querySelectorAll<HTMLElement>(".fixa").forEach((m, i) => m.style.setProperty("--d", `${200 + i * 75}ms`));
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
    );
    document.querySelectorAll("[data-in]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
