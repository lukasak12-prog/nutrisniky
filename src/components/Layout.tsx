import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { CookieConsent } from "./CookieConsent";
import { track } from "@/lib/analytics";

export function Layout({
  children,
  transparentHeader = false,
}: {
  children: React.ReactNode;
  transparentHeader?: boolean;
}) {
  // kliky na telefon a e-mail jako události v GA4
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='tel:'], a[href^='mailto:']") as HTMLAnchorElement | null;
      if (!a) return;
      const method = a.href.startsWith("tel:") ? "telefon" : "e-mail";
      track("contact_click", { method });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header transparent={transparentHeader} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
