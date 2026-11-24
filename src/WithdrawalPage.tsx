import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { formatCzk, vouchers } from "@/data/vouchers";
import { pageByPath } from "@/seo";

type Data = { name: string; email: string; order: string; company: string };

const field = "field";

/** Odstoupení ve dvou krocích: vyplnění a potvrzení (§ 1830a občanského zákoníku). */
export default function WithdrawalPage() {
  const [data, setData] = useState<Data>({ name: "", email: "", order: "", company: "" });
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ sentAt: string; emailSent: boolean } | null>(null);

  useEffect(() => {
    document.title = pageByPath("/odstoupeni-od-smlouvy").title;
  }, []);

  const set = (k: keyof Data) => (e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, [k]: e.target.value });

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/odstoupeni", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        setError(out.error ?? "Odstoupení se nepodařilo odeslat. Pošlete ho prosím na nutrisniky@seznam.cz.");
        return;
      }
      setResult(out);
      setStep("done");
    } catch {
      setError("Odstoupení se nepodařilo odeslat. Pošlete ho prosím na nutrisniky@seznam.cz.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-32 md:pt-40">
        <h1 className="h-section">Odstoupení od smlouvy</h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          Od nákupu poukazu můžete odstoupit do 14 dnů od uzavření smlouvy, bez udání důvodu. Podrobnosti jsou v{" "}
          <a href="/obchodni-podminky#odstoupeni" className="underline underline-offset-4">obchodních podmínkách</a>.
        </p>

        {step === "form" && (
          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("confirm");
            }}
          >
            <label className="block">
              <span className="mb-1.5 block font-semibold">Jméno a příjmení</span>
              <input required autoComplete="name" maxLength={100} value={data.name} onChange={set("name")} className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-semibold">E-mail, kam přijde potvrzení</span>
              <input required type="email" autoComplete="email" maxLength={255} value={data.email} onChange={set("email")} className={field} />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-semibold">Která objednávka (poukaz, datum nebo číslo)</span>
              <input
                required
                maxLength={300}
                list="poukazy"
                value={data.order}
                onChange={set("order")}
                className={field}
              />
              <datalist id="poukazy">
                {vouchers.map((v) => <option key={v.id} value={`${v.title}, ${formatCzk(v.price)}`} />)}
              </datalist>
            </label>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={data.company} onChange={set("company")} />
            <button type="submit" className="btn btn-brown">
              Odstoupit od smlouvy
            </button>
          </form>
        )}

        {step === "confirm" && (
          <div className="mt-10">
            <p className="font-semibold">Zkontrolujte údaje a odstoupení potvrďte.</p>
            <dl className="mt-6 space-y-5">
              {([["Jméno a příjmení", data.name], ["E-mail", data.email], ["Objednávka", data.order]] as const).map(([k, val]) => (
                <div key={k} className="border-b-2 border-brown/25 pb-2">
                  <dt className="text-sm text-muted-foreground">{k}</dt>
                  <dd className="mt-1 break-words">{val}</dd>
                </div>
              ))}
            </dl>
            {error && <p role="alert" className="mt-6 text-sm font-medium text-destructive">{error}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={submit}
                className="btn btn-brown"
              >
                {busy ? "Odesílám…" : "Potvrdit odstoupení od smlouvy"}
              </button>
              <button type="button" disabled={busy} onClick={() => setStep("form")} className="btn btn-line">
                Upravit údaje
              </button>
            </div>
          </div>
        )}

        {step === "done" && result && (
          <div role="status" className="mt-10 border-t-2 border-turquoise pt-6 leading-7">
            <p className="text-xl font-semibold">Odstoupení bylo odesláno {result.sentAt}.</p>
            <p className="mt-3 text-muted-foreground">
              {result.emailSent
                ? `Potvrzení přišlo na ${data.email}.`
                : "Potvrzovací e-mail se nepodařilo odeslat. Odstoupení ale dorazilo, potvrzení vám pošlu ručně."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
