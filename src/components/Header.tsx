import { Menu, X, Instagram, Facebook } from "lucide-react";
import logoImg from "@/assets/nutrisniky2.png";
import { useState, useEffect } from "react";

const nav = [
  { href: "/#sluzby", label: "Služby" },
  { href: "/#cenik", label: "Ceník" },
  { href: "/#o-mne", label: "O mně" },
  { href: "/poukazy", label: "Poukazy" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ viewTransitionName: "hlavicka" }} className={`fixed inset-x-0 top-0 z-30 border-b bg-background ${scrolled ? "border-border" : "border-transparent"}`}>
      <div className={`mx-auto flex max-w-screen-2xl items-center justify-between px-4 lg-cols ${scrolled ? "py-2" : "py-4"}`}>
        <a href="/">
          <img src={logoImg} alt="Nutrisniky" className={`w-auto rounded-lg ${scrolled ? "h-8 md:h-12" : "h-10 md:h-16"}`} />
        </a>

        <nav className="hidden items-center justify-between gap-3 lg:flex xl:justify-start xl:gap-7">
          <a href="/#hero" className="nav-link font-medium">Domů</a>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-between gap-3 lg:flex">
          <a href="tel:+420722671187" className="hidden whitespace-nowrap font-semibold xl:block">
            +420 722 671 187
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/nutrisniky"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-sand"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61568124151775"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-sand"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <a
            href="/#kontakt"
            className="btn btn-main whitespace-nowrap"
          >
            Napište mi zprávu
          </a>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="enter border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-screen-2xl flex-col px-4 py-4 text-foreground">
            <a href="/#hero" onClick={() => setOpen(false)} className="py-2.5 text-lg font-semibold">Domů</a>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-t border-border py-2.5 text-lg font-semibold"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-6 border-t border-border py-2">
              <a
                href="https://www.instagram.com/nutrisniky"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 font-medium"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568124151775"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 font-medium"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </div>
            <a
              href="/#kontakt"
              onClick={() => setOpen(false)}
              className="btn btn-main mt-2"
            >
              Napište mi zprávu
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
