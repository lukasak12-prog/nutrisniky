import { Phone, Menu, X, Brain } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { href: "#sluzby", label: "Služby" },
  { href: "#cenik", label: "Ceník" },
  { href: "#o-mne", label: "O mně" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = transparent && !scrolled;
  const base = isTransparent
    ? "fixed inset-x-0 top-0 z-30 bg-transparent"
    : "fixed inset-x-0 top-0 z-30 bg-background/90 backdrop-blur border-b border-border";
  const textColor = isTransparent ? "text-white" : "text-foreground";

  return (
    <header className={base}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        <a href="/" className={`flex items-center gap-2 ${textColor}`}>
          <Brain className="h-7 w-7" strokeWidth={1.5} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">
            NUTRISNIKY
          </span>
        </a>

        <nav className={`hidden items-center gap-8 lg:flex ${textColor}`}>
          <a href="#hero" className="text-sm transition-opacity hover:opacity-70">Domů</a>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={`hidden items-center gap-5 lg:flex ${textColor}`}>
          <a href="tel:+420723166886" className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" /> +420 722 671 187
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-turquoise px-5 py-2.5 text-sm font-medium text-turquoise-foreground shadow-sm transition hover:opacity-90"
          >
            Napište mi zprávu
          </a>
        </div>

        <button
          className={`lg:hidden ${textColor}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-foreground">
            <a href="#hero" onClick={() => setOpen(false)} className="py-1 text-sm">Domů</a>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1 text-sm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-turquoise px-5 py-2.5 text-center text-sm font-medium text-turquoise-foreground"
            >
              Napište mi zprávu
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
