// Google Analytics 4 (ID měření G-9DKKN39Q2J) se souhlasem návštěvníka.
// Značka se načte AŽ po kliknutí na „Přijmout“ (v ČR je souhlas s analytickými cookies povinný).
// Bez souhlasu se události zahodí, aby se po jeho udělení neodeslaly zpětně.

const GA_ID = "G-9DKKN39Q2J";
const STORAGE_KEY = "nutrisniky-cookies";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag musí do dataLayer posílat objekt `arguments`, ne pole
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

let loaded = false;

function loadTag() {
  if (loaded) return;
  loaded = true;
  ensureGtag();
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Volá se jednou při startu webu. */
export function initAnalytics() {
  ensureGtag();
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (getConsent() === "granted") {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    loadTag();
  }
}

/** Úplně zastaví už načtené GA (samotné odvolání souhlasu by dál posílalo požadavky bez cookies). */
function setDisabled(off: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = off;
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* soukromé okno apod. */
  }
  ensureGtag();
  setDisabled(value === "denied");
  window.gtag("consent", "update", { analytics_storage: value });
  if (value === "granted") {
    loadTag();
  } else {
    // smazat případné GA cookies po odvolání souhlasu
    for (const c of document.cookie.split(";")) {
      const name = c.split("=")[0].trim();
      if (name.startsWith("_ga")) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
        document.cookie = `${name}=; Max-Age=0; path=/`;
      }
    }
  }
}

/** Odeslání události do GA4 (bez souhlasu se nic neodešle). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || getConsent() !== "granted") return;
  ensureGtag();
  window.gtag("event", event, params);
}

export const OPEN_COOKIE_SETTINGS = "nutrisniky:open-cookies";
