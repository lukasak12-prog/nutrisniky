import { useState } from "react";
import { Check } from "lucide-react";
import { vouchers, formatCzk, type Voucher } from "@/data/vouchers";
import { track } from "@/lib/analytics";
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
    title: "Vyberte poukaz",
    text: "Zvolte poukaz, vyplňte formulář a napište mi případné požadavky.",
  },
  {
    title: "Zaplaťte QR kódem",
    text: "Na e-mail vám přijde poděkování s QR kódem k platbě v bankovní aplikaci.",
  },
  {
    title: "Poukaz vám pošlu",
    text: "Jakmile platba dorazí na účet, pošlu vám poukaz e-mailem, připravený k darování.",
  },
];

type OrderResult = { voucher: Voucher; email: string; emailSent: boolean };

const lead = "Poukaz na konzultaci, měření nebo jídelníček na míru. Dárek, který vydrží déle než bonboniéra.";

const inputClass = "field";

function VoucherFlip({ voucher, flipped, onFlip }: { voucher: Voucher; flipped: boolean; onFlip: () => void }) {
  return (
    <button
      type="button"
      onClick={onFlip}
      aria-label={`${flipped ? "Přední strana" : "Zadní strana"} poukazu ${formatCzk(voucher.price)}`}
      style={{ viewTransitionName: `poukaz-${voucher.id}` }}
      className="group/flip relative block w-full cursor-pointer [perspective:1600px]"
    >
      <div
        className={`flip-card relative aspect-[1588/748] w-full ${flipped ? "is-flipped" : ""}`}
      >
        <img
          src={images[voucher.id]}
          alt={`Dárkový poukaz ${formatCzk(voucher.price)}, ${voucher.title}`}
          className="bg-card absolute inset-0 h-full w-full rounded-lg object-cover ring-1 ring-border [backface-visibility:hidden]"
        />
        <img
          src={imgBack}
          alt="Zadní strana poukazu: jak poukaz uplatnit"
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-lg object-cover ring-1 ring-border [backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </div>
    </button>
  );
}

/** Vybraný poukaz, na který se rovnou píší jména z formuláře. Jen náhled, poukaz vyplňuje Nicola. */
function VoucherPreview({ voucher, names, field }: { voucher: Voucher; names: { recipient: string; from: string }; field: string | null }) {
  const line = (k: "recipient" | "from") => {
    const t = names[k].trim();
    return (
      <span className={`line line-${k} ${field === k ? "is-active" : ""}`} style={{ "--len": Math.max(t.length, 1) } as React.CSSProperties}>
        {[...t].map((c, i) => <span key={i}>{c === " " ? "\u00a0" : c}</span>)}
      </span>
    );
  };
  const who = [names.recipient.trim() && `pro ${names.recipient.trim()}`, names.from.trim() && `od ${names.from.trim()}`].filter(Boolean).join(", ");
  return (
    <div className="preview" role="img" aria-label={`Náhled poukazu ${formatCzk(voucher.price)}${who ? `: ${who}` : ""}`}>
      <div className={field ? "is-near" : undefined}>
        <img src={images[voucher.id]} alt="" width={1588} height={748} />
        {line("recipient")}
        {line("from")}
      </div>
    </div>
  );
}

export function VouchersSection() {
  const [order, setOrder] = useState<Voucher["id"][]>(["konzultace", "jidelnicek", "inbody"]);
  const selectedId = order[0];
  const [flipped, setFlipped] = useState<Voucher["id"] | null>(null);
  const [picked, setPicked] = useState<{ id: Voucher["id"]; from: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);
  const [names, setNames] = useState({ recipient: "", from: "" });
  const [field, setField] = useState<keyof typeof names | null>(null);

  const selected = vouchers.find((v) => v.id === selectedId)!;

  const flip = (id: Voucher["id"]) => setFlipped((f) => (f === id ? null : id));
  // na mobilu stojí poukazy za sebou: vybraný přejde dopředu, ostatní o místo dozadu
  const pick = (id: Voucher["id"]) => {
    if (id === selectedId) return;
    setFlipped(null);
    setPicked({ id, from: order.indexOf(id) });
    setOrder([id, ...order.filter((o) => o !== id)]);
    setResult(null);
  };

  const chooseVoucher = (id: Voucher["id"]) => {
    pick(id);
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
      setNames({ recipient: "", from: "" });
      setResult({ voucher: selected, email, emailSent: data.emailSent !== false });
      track("voucher_order", { value: selected.price, currency: "CZK", voucher: selected.title });
    } catch {
      setError("Objednávku se nepodařilo odeslat. Zkontrolujte připojení k internetu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="poukazy" className="shelf">
      <div className="wall">
        <h1>
          <span>Darujte</span> <span>péči</span> <span>o zdraví</span>
        </h1>
        <p className="shelf-text max-md:hidden">{lead}</p>
      </div>

      <div className="stand">
        {vouchers.map((v) => {
          const isSelected = v.id === selectedId;
          const depth = order.indexOf(v.id);
          return (
            <div
              key={v.id}
              className={`stand-item ${isSelected ? "is-selected" : ""} ${picked?.id === v.id ? "is-picked" : ""}`}
              style={{ "--d": depth, "--z": picked?.from ?? 0 } as React.CSSProperties}
              onAnimationEnd={(e) => e.animationName === "vpredu" && setPicked(null)}
            >
              <div className="stand-card">
                <VoucherFlip voucher={v} flipped={flipped === v.id} onFlip={() => flip(v.id)} />
                {!isSelected && (
                  <button
                    type="button"
                    className="stand-pick"
                    aria-label={`Vybrat poukaz ${formatCzk(v.price)}, ${v.title}`}
                    onClick={() => pick(v.id)}
                  />
                )}
              </div>

              <div className="stand-info">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <ul className="space-y-2.5">
                    {v.items.map((item) => (
                      <li key={item.title}>
                        <span className="block font-semibold leading-snug">{item.title}</span>
                        <span className="block text-sm text-muted-foreground">{item.subtitle}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="shrink-0 text-right">
                    <span className="block whitespace-nowrap text-2xl font-bold tabular-nums">{formatCzk(v.price)}</span>
                    <button type="button" className="stand-turn" onClick={() => flip(v.id)} aria-label={`Otočit poukaz ${formatCzk(v.price)}`}>
                      Otočit
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => chooseVoucher(v.id)}
                  className={`btn mt-auto w-full ${isSelected ? "btn-main" : "btn-line"}`}
                >
                  {isSelected ? "Objednat tento poukaz" : "Vybrat poukaz"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="shelf-text md:hidden">{lead}</p>

      <div className="mx-auto max-w-screen-2xl px-4 pb-28 md:pb-32">
        {/* Jak to funguje + objednávka */}
        <div id="poukaz-objednavka" className="mt-20 grid items-start gap-8 scroll-mt-24 lg:grid-cols-[2fr_3fr]">
          <div>
            <h2 className="text-3xl">Jak to funguje</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s) => {
                return (
                  <li key={s.title} className="rule pt-3">
                    <div>
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p className="mt-1 text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 rounded-lg bg-sand px-5 py-4">
              Na poukaz můžu doplnit jméno obdarovaného i vaše, stačí je vyplnit ve formuláři. Poukaz nelze vyměnit za hotovost.
            </p>
          </div>

          <div>
            {result ? (
              <OrderSuccess result={result} onReset={() => setResult(null)} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-lg border border-border bg-card p-5 sm:p-8"
              >
                <div>
                  <p className="mb-2 font-semibold">Poukaz</p>
                  <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Výběr poukazu">
                    {vouchers.map((v) => {
                      const active = v.id === selectedId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => pick(v.id)}
                          className={`group/opt relative flex items-center gap-4 rounded-lg border-2 p-2.5 text-left transition-colors sm:flex-col sm:items-stretch sm:gap-0 ${
                            active
                              ? "border-teal bg-turquoise/15"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          <img
                            src={images[v.id]}
                            alt=""
                            loading="lazy"
                            className={`aspect-[1588/748] w-32 shrink-0 rounded object-cover ring-1 ring-border sm:w-full`}
                          />
                          {active && (
                            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-teal text-white sm:right-4 sm:top-4">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          )}
                          <span className="block sm:px-1.5 sm:pb-1 sm:pt-3">
                            <span className="block text-lg font-bold tabular-nums">{formatCzk(v.price)}</span>
                            <span className="block text-sm leading-5 text-muted-foreground">{v.title}</span>
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
                  <p className="mb-3 font-semibold">
                    Údaje na poukaz <span className="font-normal text-muted-foreground">(nepovinné)</span>
                  </p>
                  <VoucherPreview voucher={selected} names={names} field={field} />
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    {([["recipient", "Pro (obdarovaný)"], ["from", "Od (dárce)"]] as const).map(([k, label]) => (
                      <Input
                        key={k}
                        name={k}
                        label={label}
                        onInput={(e) => {
                          const v = e.currentTarget.value;
                          setNames((n) => ({ ...n, [k]: v }));
                        }}
                        onFocus={() => setField(k)}
                        onBlur={() => setField(null)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="voucher-note" className="mb-1.5 block font-semibold">Požadavky a poznámka</label>
                  <textarea
                    id="voucher-note"
                    name="note"
                    rows={3}
                    maxLength={1000}
                    className="field"
                  />
                </div>

                {/* honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {error && (
                  <p role="alert" className="rounded-lg border-2 border-destructive px-4 py-3 font-semibold">{error}</p>
                )}

                {/* zákon chce obsah a cenu bezprostředně před tlačítkem */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-y-2 border-brown/25 py-4">
                  <p className="text-sm text-foreground">
                    Dárkový poukaz: <strong>{selected.items.map((i) => `${i.title} (${i.subtitle})`).join(" + ")}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Celkem <strong className="ml-1 text-xl text-foreground">{formatCzk(selected.price)}</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-brown w-full"
                >
                  {submitting ? "Odesílám…" : "Objednávka zavazující k platbě"}
                </button>
                <p className="text-sm leading-6 text-muted-foreground">
                  Po odeslání vám na e-mail přijde QR kód k platbě. Pro nákup platí{" "}
                  <a href="/obchodni-podminky" target="_blank" rel="noopener" className="underline underline-offset-2">obchodní podmínky</a> včetně
                  práva odstoupit do 14 dnů. Jak nakládám s údaji, popisují{" "}
                  <a href="/ochrana-osobnich-udaju" target="_blank" rel="noopener" className="underline underline-offset-2">zásady ochrany osobních údajů</a>.
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
    <div className="rounded-lg border-2 border-teal bg-card p-6 text-center sm:p-10">
      <h3 className="text-3xl">Děkuji za objednávku!</h3>
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
        className="mx-auto mt-6 w-[240px] max-w-full rounded-lg bg-white p-2 ring-1 ring-border"
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
        className="btn btn-line mt-6"
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
  ...events
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
} & Pick<React.ComponentProps<"input">, "onInput" | "onFocus" | "onBlur">) {
  const id = `voucher-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} maxLength={255} className={inputClass} {...events} />
    </div>
  );
}
