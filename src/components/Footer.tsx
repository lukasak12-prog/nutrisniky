import { Phone, Mail, MapPin, BadgeCheck, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brown text-brown-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="space-y-3 text-sm">
          <a href="tel:+420723166886" className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> +420 722 671 187
          </a>
          <a href="mailto:nutrisniky@seznam.cz" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> nutrisniky@seznam.cz
          </a>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Brno Příkop 2a / Online
          </p>
          <p className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" /> IČO: 19721421
          </p>
          <div className="flex gap-3 pt-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-brown-foreground/30 p-2 hover:bg-brown-foreground/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-full border border-brown-foreground/30 p-2 hover:bg-brown-foreground/10">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <a href="#" className="block hover:underline">Zásady ochrany osobních údajů</a>
          <a href="#" className="block hover:underline">Obchodní podmínky</a>
          <a href="#" className="block hover:underline">Rušení a přesouvání termínů</a>
        </div>

        <div className="space-y-2 text-sm font-semibold">
          <a href="#sluzby" className="block underline-offset-4 hover:underline">Jídelníček na míru</a>
          <a href="#sluzby" className="block underline-offset-4 hover:underline">Výživové poradenství Brno</a>
          <a href="#kontakt" className="block underline-offset-4 hover:underline">Konzultace zdarma</a>
        </div>
      </div>
      <div className="border-t border-brown-foreground/15 py-5 text-center text-xs text-brown-foreground/70">
        © {new Date().getFullYear()} Hubnutí psychologií · Vyrobeno s láskou
      </div>
    </footer>
  );
}
