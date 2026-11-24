import { OPEN_COOKIE_SETTINGS } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="bg-brown text-brown-foreground [&_:focus-visible]:outline-current">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 md:grid-cols-3">
        <div className="space-y-2">
          <a href="tel:+420722671187" className="block underline-offset-4 hover:underline">
            +420 722 671 187
          </a>
          <a href="mailto:nutrisniky@seznam.cz" className="block underline-offset-4 hover:underline">
            nutrisniky@seznam.cz
          </a>
          <p>
            nám. Míru 24, 666 01 Tišnov 1
          </p>
          <p>
            IČO: 221 51 290 
          </p>
        </div>

        <div className="space-y-2 text-brown-foreground/90">
          <a href="/ochrana-osobnich-udaju" className="block underline-offset-4 hover:underline">Zásady ochrany osobních údajů</a>
          <a href="/obchodni-podminky" className="block underline-offset-4 hover:underline">Obchodní podmínky</a>
          <a href="/obchodni-podminky#terminy" className="block underline-offset-4 hover:underline">Rušení a přesouvání termínů</a>
          <a href="/odstoupeni-od-smlouvy" className="block underline-offset-4 hover:underline">Odstoupit od smlouvy</a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
            className="block underline-offset-4 hover:underline"
          >
            Nastavení cookies
          </button>
        </div>

        <div className="space-y-2 font-semibold">
          <a href="/#sluzby" className="block underline-offset-4 hover:underline">Jídelníček na míru</a>
          <a href="/#sluzby" className="block underline-offset-4 hover:underline">Nutriční poradenství Tišnov</a>
          <a href="/#kontakt" className="block underline-offset-4 hover:underline">Konzultace</a>
          <a href="/poukazy" className="block underline-offset-4 hover:underline">Dárkové poukazy</a>
        </div>
      </div>
      <div className="border-t border-brown-foreground/25 py-5 text-center text-sm">
        © {new Date().getFullYear()} Nutrisniky · Vyrobeno s láskou
      </div>
    </footer>
  );
}
