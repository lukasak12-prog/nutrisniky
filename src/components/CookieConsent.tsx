import { useEffect, useState } from "react";
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
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-w-sm"
    >
      <div className="rounded-lg border-2 border-brown bg-card p-5">
        <div>
          <p className="text-sm leading-6">
            Rádi bychom měřili návštěvnost webu pomocí Google Analytics. Ukládá k tomu cookies, proto potřebujeme váš souhlas.
            Volbu můžete kdykoli změnit v patičce webu.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="btn btn-line"
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="btn btn-line"
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
