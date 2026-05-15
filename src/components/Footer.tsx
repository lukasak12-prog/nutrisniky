import { Phone, Mail, MapPin, BadgeCheck, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brown text-brown-foreground">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 md:grid-cols-3">
        <div className="space-y-3 text-sm">
          <a href="tel:+420723166886" className="flex items-center gap-2 text-brown-foreground/90 transition hover:text-brown-foreground">
            <Phone className="h-4 w-4" /> +420 722 671 187
          </a>
          <a href="mailto:nutrisniky@seznam.cz" className="flex items-center gap-2 text-brown-foreground/90 transition hover:text-brown-foreground">
            <Mail className="h-4 w-4" /> nutrisniky@seznam.cz
          </a>
          <p className="flex items-center gap-2 text-brown-foreground/90">
            <MapPin className="h-4 w-4" /> Tišnov
          </p>
          <p className="flex items-center gap-2 text-brown-foreground/90">
            <BadgeCheck className="h-4 w-4" /> IČO: 
          </p>
          <div className="flex gap-3 pt-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-brown-foreground/30 p-2 transition hover:-translate-y-0.5 hover:bg-brown-foreground/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-full border border-brown-foreground/30 p-2 transition hover:-translate-y-0.5 hover:bg-brown-foreground/10">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-2 text-sm text-brown-foreground/80">
          <a href="#" className="block underline-offset-4 transition hover:text-brown-foreground hover:underline">Zásady ochrany osobních údajů</a>
          <a href="#" className="block underline-offset-4 transition hover:text-brown-foreground hover:underline">Obchodní podmínky</a>
          <a href="#" className="block underline-offset-4 transition hover:text-brown-foreground hover:underline">Rušení a přesouvání termínů</a>
        </div>

        <div className="space-y-2 text-sm font-semibold">
          <a href="#sluzby" className="block underline-offset-4 transition hover:text-turquoise hover:underline">Jídelníček na míru</a>
          <a href="#sluzby" className="block underline-offset-4 transition hover:text-turquoise hover:underline">Výživové poradenství Brno</a>
          <a href="#kontakt" className="block underline-offset-4 transition hover:text-turquoise hover:underline">Konzultace zdarma</a>
        </div>
      </div>
      <div className="border-t border-brown-foreground/15 py-5 text-center text-xs text-brown-foreground/70">
        © {new Date().getFullYear()} Nutrisniky · Vyrobeno s láskou
      </div>
    </footer>
  );
}
