import { useState } from "react";
import { Check, Gift, QrCode, RotateCw, Send, ShoppingBag } from "lucide-react";
import { vouchers, formatCzk, type Voucher } from "@/data/vouchers";
import img350 from "@/assets/poukazy/poukaz-350.png";
import img1000 from "@/assets/poukazy/poukaz-1000.png";
import img3000 from "@/assets/poukazy/poukaz-3000.png";
import imgBack from "@/assets/poukazy/poukaz-zadni-strana.png";

const images: Record<Voucher["id"], string> = {
  inbody: img350,
  konzultace: img1000,
  jidelnicek: img3000,
};

const steps = [
  {
    icon: ShoppingBag,
    title: "Vyberte poukaz",
    text: "Zvolte poukaz, vyplňte formulář a napište mi případné požadavky.",
  },
  {
    icon: QrCode,
    title: "Zaplaťte QR kódem",
    text: "Na e-mail vám přijde poděkování s QR kódem k platbě v bankovní aplikaci.",
  },
  {
    icon: Gift,
    title: "Poukaz vám pošlu",
    text: "Jakmile platba dorazí na účet, pošlu vám poukaz e-mailem — připravený k darování.",
  },
];

type OrderResult = { voucher: Voucher; email: string; emailSent: boolean };

const inputClass =
  "w-full rounded-full border border-input bg-background/80 px-5 py-3 text-sm shadow-inner transition focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/40";

function VoucherFlip({ voucher }: { voucher: Voucher }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={flipped ? "Zobrazit přední stranu poukazu" : "Zobrazit zadní stranu poukazu"}
      className="group/flip relative block w-full cursor-pointer [perspective:1600px]"
    >
      <div
        className={`relative aspect-[1588/748] w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <img
          src={images[voucher.id]}
          alt={`Dárkový poukaz ${formatCzk(voucher.price)} — ${voucher.title}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_22px_50px_-28px_rgba(77,58,41,0.55)] ring-1 ring-black/5 [backface-visibility:hidden]"
        />
        <img
          src={imgBack}
          alt="Zadní strana poukazu — jak poukaz uplatnit"
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_22px_50px_-28px_rgba(77,58,41,0.55)] ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </div>
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-brown shadow-sm backdrop-blur transition group-hover/flip:bg-white">
        <RotateCw className={`h-3 w-3 transition-transform duration-500 ${flipped ? "rotate-180" : ""}`} />
        {flipped ? "Přední strana" : "Zadní strana"}
      </span>
    </button>
  );
}

export function VouchersSection() {
  const [selectedId, setSelectedId] = useState<Voucher["id"]>("konzultace");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  const selected = vouchers.find((v) => v.id === selectedId)!;

  const chooseVoucher = (id: Voucher["id"]) => {
    setSelectedId(id);
    setResult(null);
    document.getElementById("poukaz-objednavka")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    if (!String(fd.get("name") ?? "").trim()) return setError("Zadejte jméno.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Zadejte platný e-mail.");

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/poukaz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          voucherId: selectedId,
          name: fd.get("name"),
          email,
          phone: fd.get("phone"),
          recipient: fd.get("recipient"),
          from: fd.get("from"),
          note: fd.get("note"),
          company: fd.get("company"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Objednávku se nepodařilo odeslat. Zkuste to prosím znovu.");
        return;
      }
      form.reset();
      setResult({ voucher: selected, email, emailSent: data.emailSent !== false });
    } catch {
      setError("Objednávku se nepodařilo odeslat. Zkontrolujte připojení k internetu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="poukazy" className="relative overflow-hidden bg-secondary py-28 md:py-32">
      {/* Béžový kruh jako na poukazech */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full md:-right-40 md:-top-40 md:h-[34rem] md:w-[34rem] bg-[#e9ddd2]/70" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-80 w-80 rounded-full bg-turquoise/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-screen-2xl px-4">
        <div className="reveal-on-scroll mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">Dárkové poukazy</p>
          <h2 className="text-4xl font-medium leading-tight md:text-5xl">Darujte péči o zdraví</h2>
          <p className="mt-5 text-muted-foreground">
            Poukaz na konzultaci, měření nebo jídelníček na míru. Dárek, který vydrží déle než bonboniéra.
          </p>
        </div>

        {/* Karty poukazů */}
        <div className="grid gap-6 lg:grid-cols-3">
          {vouchers.map((v, idx) => {
            const isSelected = v.id === selectedId;
            return (
              <div
                key={v.id}
                className="reveal-on-scroll"
                style={{ "--reveal-delay": `${idx * 110}ms` } as React.CSSProperties}
              >
                <div
                  className={`relative flex h-full flex-col rounded-[2rem] border bg-card/90 p-4 shadow-[0_14px_45px_-32px_rgba(77,58,41,0.4)] transition-all duration-300 hover:-translate-y-1 sm:p-5 ${
                    isSelected
                      ? "border-turquoise/70 ring-2 ring-turquoise/30 shadow-[0_24px_60px_-28px_rgba(131,197,190,0.6)]"
                      : "border-border/80 hover:border-turquoise/40"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-3 right-6 z-10 inline-flex items-center gap-1 rounded-full bg-turquoise px-3 py-1 text-xs font-semibold text-turquoise-foreground shadow-md">
                      <Check className="h-3.5 w-3.5" /> Vybráno
                    </span>
                  )}
                  <VoucherFlip voucher={v} />

                  <div className="flex flex-1 flex-col px-1 pt-5">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <ul className="space-y-1.5">
                        {v.items.map((item) => (
                          <li key={item.title} className="flex items-start gap-2.5 text-sm">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-turquoise/20 text-turquoise">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>
                              <span className="font-semibold text-foreground">{item.title}</span>
                              <span className="text-muted-foreground"> · {item.subtitle}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <span className="shrink-0 text-2xl font-bold tracking-tight text-brown">{formatCzk(v.price)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => chooseVoucher(v.id)}
                      className={`mt-auto w-full rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                        isSelected
                          ? "bg-turquoise text-turquoise-foreground shadow-lg shadow-turquoise/25"
                          : "border border-turquoise/40 bg-turquoise/10 text-turquoise hover:bg-turquoise/20"
                      }`}
                    >
                      {isSelected ? "Objednat tento poukaz" : "Vybrat poukaz"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jak to funguje + objednávka */}
        <div id="poukaz-objednavka" className="mt-16 grid items-start gap-8 scroll-mt-24 lg:grid-cols-[2fr_3fr]">
          <div className="reveal-on-scroll rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)]">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-turquoise">Jak to funguje</p>
            <ol className="space-y-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="flex gap-4">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-turquoise">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brown text-[11px] font-bold text-brown-foreground">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 rounded-2xl bg-secondary px-5 py-4 text-sm leading-6 text-muted-foreground">
              Na poukaz můžu doplnit jméno obdarovaného i vaše — stačí je vyplnit ve formuláři. Poukaz nelze vyměnit za hotovost.
            </p>
          </div>

          <div className="reveal-on-scroll" style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            {result ? (
              <OrderSuccess result={result} onReset={() => setResult(null)} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-3xl border border-border/80 bg-card/90 p-6 shadow-[0_18px_60px_-38px_rgba(77,58,41,0.45)] sm:p-8"
              >
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">Poukaz</p>
                  <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Výběr poukazu">
                    {vouchers.map((v) => {
                      const active = v.id === selectedId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSelectedId(v.id)}
                          className={`group/opt relative flex items-center gap-4 rounded-2xl border p-2.5 text-left transition sm:flex-col sm:items-stretch sm:gap-0 ${
                            active
                              ? "border-turquoise bg-turquoise/10 ring-1 ring-turquoise/40"
                              : "border-border/80 bg-background/70 hover:border-turquoise/40"
                          }`}
                        >
                          <img
                            src={images[v.id]}
                            alt=""
                            loading="lazy"
                            className={`aspect-[1588/748] w-32 shrink-0 rounded-xl object-cover shadow-[0_10px_24px_-16px_rgba(77,58,41,0.6)] ring-1 ring-black/5 transition duration-300 sm:w-full ${
                              active ? "" : "opacity-80 group-hover/opt:opacity-100"
                            }`}
                          />
                          {active && (
                            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-turquoise text-turquoise-foreground shadow-md sm:right-4 sm:top-4">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                          <span className="block sm:px-1.5 sm:pb-1 sm:pt-3">
                            <span className="block text-lg font-bold text-foreground">{formatCzk(v.price)}</span>
                            <span className="block text-xs leading-5 text-muted-foreground">{v.title}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>


                <div className="grid gap-5 sm:grid-cols-2">
                  <Input name="name" label="Jméno a příjmení" required autoComplete="name" />
                  <Input name="email" label="E-mail" type="email" required autoComplete="email" />
                  <Input name="phone" label="Telefon" type="tel" autoComplete="tel" />
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    Údaje na poukaz <span className="font-normal text-muted-foreground">(nepovinné)</span>
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input name="recipient" label="Pro (obdarovaný)" />
                    <Input name="from" label="Od (dárce)" />
                  </div>
                </div>

                <div>
                  <label htmlFor="voucher-note" className="mb-2 block text-sm text-muted-foreground">Požadavky a poznámka</label>
                  <textarea
                    id="voucher-note"
                    name="note"
                    rows={3}
                    maxLength={1000}
                    className="w-full rounded-2xl border border-input bg-background/80 px-5 py-4 text-sm shadow-inner transition focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/40"
                  />
                </div>

                {/* honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {error && (
                  <p className="rounded-2xl bg-destructive/10 px-5 py-3 text-center text-sm font-medium text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brown px-8 py-3.5 text-sm font-semibold text-brown-foreground shadow-lg shadow-brown/20 transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Odesílám…" : `Objednat poukaz za ${formatCzk(selected.price)}`}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Po odeslání vám na e-mail přijde QR kód k platbě.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderSuccess({ result, onReset }: { result: OrderResult; onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-turquoise/40 bg-card/95 p-6 text-center shadow-[0_24px_60px_-28px_rgba(131,197,190,0.6)] sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-turquoise text-turquoise-foreground shadow-lg shadow-turquoise/25">
        <Check className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-2xl font-bold">Děkuji za objednávku!</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {result.emailSent ? (
          <>QR kód k platbě jsem poslala na <strong className="text-foreground">{result.email}</strong>. Můžete zaplatit i rovnou tady:</>
        ) : (
          <>Objednávka dorazila, jen se nepodařilo odeslat potvrzovací e-mail. Zaplatit můžete tímto QR kódem:</>
        )}
      </p>

      <img
        src={result.voucher.qr}
        alt={`QR kód k platbě ${formatCzk(result.voucher.price)}`}
        width={240}
        className="mx-auto mt-6 w-[240px] max-w-full rounded-2xl bg-white p-2 shadow-md ring-1 ring-black/5"
      />
      <p className="mt-3 text-sm font-semibold text-foreground">
        {formatCzk(result.voucher.price)} · {result.voucher.title}
      </p>

      <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-muted-foreground">
        Jakmile platba dorazí na účet, pošlu vám poukaz e-mailem.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full border border-turquoise/40 bg-turquoise/10 px-6 py-2.5 text-sm font-semibold text-turquoise transition hover:bg-turquoise/20"
      >
        Objednat další poukaz
      </button>
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `voucher-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} maxLength={255} className={inputClass} />
    </div>
  );
}
