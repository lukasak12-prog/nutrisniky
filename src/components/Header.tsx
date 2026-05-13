import { Phone, Menu, X, Brain, Instagram, Facebook } from "lucide-react";
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
    ? "fixed inset-x-0 top-0 z-30 bg-transparent transition-all duration-300"
    : "fixed inset-x-0 top-0 z-30 border-b border-border/70 bg-background/85 shadow-[0_18px_45px_-35px_rgba(77,58,41,0.45)] backdrop-blur-xl transition-all duration-300";
  const textColor = isTransparent ? "text-white" : "text-foreground";

  return (
    <header className={base}>
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-4">
        <a href="/" className={`group flex items-center gap-3 rounded-full ${isTransparent ? "bg-white/10" : "bg-card/80"} px-3 py-2 shadow-sm backdrop-blur transition hover:-translate-y-0.5 ${textColor}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-turquoise/90 text-turquoise-foreground shadow-sm">
            <Brain className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.22em]">
            NUTRISNIKY
          </span>
        </a>

        <nav className={`hidden items-center gap-8 lg:flex ${textColor}`}>
          <a href="#hero" className="text-sm font-medium transition hover:text-turquoise">Domů</a>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-turquoise"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={`hidden items-center gap-5 lg:flex ${textColor}`}>
          <a href="tel:+420723166886" className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" /> +420 722 671 187
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/nutrisniky"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-turquoise/20 hover:text-turquoise ${isTransparent ? "bg-white/10" : "bg-border/40"}`}
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61568124151775"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-turquoise/20 hover:text-turquoise ${isTransparent ? "bg-white/10" : "bg-border/40"}`}
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <a
            href="#kontakt"
            className="rounded-full bg-turquoise px-5 py-2.5 text-sm font-semibold text-turquoise-foreground shadow-lg shadow-turquoise/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-turquoise/25"
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
        <div className="border-t border-border/70 bg-background/95 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-4 py-5 text-foreground">
            <a href="#hero" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-turquoise/10">Domů</a>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-turquoise/10"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3 px-3">
              <a
                href="https://www.instagram.com/nutrisniky"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium hover:bg-turquoise/10"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href="https://www.facebook.com/nutrisniky"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium hover:bg-turquoise/10"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </div>
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
