import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { getConsent, setConsent, OPEN_COOKIE_SETTINGS, type Consent } from "@/lib/analytics";

/** Lišta se souhlasem s analytickými cookies. Vykreslí se až v prohlížeči (ne v předgenerovaném HTML). */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  if (!open) return null;

  const choose = (v: Consent) => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Souhlas s cookies"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm"
    >
      <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-[0_24px_60px_-20px_rgba(77,58,41,0.45)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise">
            <Cookie className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Rádi bychom měřili návštěvnost webu pomocí Google Analytics. Ukládá k tomu cookies, proto potřebujeme váš souhlas.
            Volbu můžete kdykoli změnit v patičce webu.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-turquoise/50"
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-turquoise px-4 py-2.5 text-sm font-semibold text-turquoise-foreground transition hover:-translate-y-0.5"
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
