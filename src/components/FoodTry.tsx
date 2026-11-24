import { useEffect, useRef, useState } from "react";

type Key = "cas" | "misto" | "jidlo" | "druh" | "mnozstvi" | "napoj";
type Row = Partial<Record<Key, string>>;

// pořadí sloupců jako ve formuláři zaznam_stravy.docx
const columns: [Key, string][] = [
  ["cas", "Čas"],
  ["misto", "Místo"],
  ["jidlo", "Potravina"],
  ["druh", "Značka, druh"],
  ["mnozstvi", "Množství"],
  ["napoj", "Nápoje"],
];

// pořadí otázek; příklady jsou ze vzorového jídelníčku
const steps: { key: Key; ask: (food: string) => string; hint: string; tips: string[] }[] = [
  { key: "jidlo", ask: () => "Co jste dnes jedli?", hint: "např. chléb", tips: ["chléb", "jogurt", "jablko"] },
  { key: "druh", ask: (f) => `Jaký druh nebo značka? (${f})`, hint: "např. kmínový", tips: [] },
  { key: "mnozstvi", ask: () => "Kolik toho bylo?", hint: "např. 1 krajíc", tips: ["1 krajíc", "150 g", "1 ks"] },
  { key: "cas", ask: () => "V kolik hodin?", hint: "např. 7:30", tips: ["7:30", "12:30", "18:30"] },
  { key: "misto", ask: () => "Kde to bylo?", hint: "např. doma", tips: ["doma", "v práci", "v restauraci"] },
  { key: "napoj", ask: () => "A co k pití?", hint: "např. zelený čaj 250 ml", tips: ["voda 250 ml", "zelený čaj 250 ml", "nic"] },
];

/** Zkouška jednoho řádku záznamu stravy: otázka po otázce se vyplňuje skutečná tabulka. */
export function FoodTry() {
  const [row, setRow] = useState<Row>({});
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const again = useRef<HTMLButtonElement>(null);
  const moved = useRef(false); // po načtení stránky se nesmí přeskočit na pole

  const done = step >= steps.length;
  const s = steps[step];

  useEffect(() => {
    if (!moved.current) return;
    (done ? again.current : input.current)?.focus({ preventScroll: true });
  }, [step, done]);

  const go = (i: number, r: Row) => {
    moved.current = true;
    setStep(i);
    setText(i < steps.length ? (r[steps[i].key] ?? "") : "");
  };

  const answer = (value: string) => {
    const v = value.trim();
    if (!v) return input.current?.focus();
    const r = { ...row, [s.key]: v };
    setRow(r);
    // další nezodpovězená otázka; po opravě políčka se tak vrátí tam, kde člověk skončil
    const next = steps.findIndex((x) => !r[x.key]);
    go(next === -1 ? steps.length : next, r);
  };

  const reset = () => {
    setRow({});
    go(0, {});
  };

  return (
    <div className="food">
      <p className="mb-3 text-muted-foreground">Zkuste si jeden řádek záznamu. Stačí odpovídat, tabulka se vyplní sama.</p>
      <div className="food-ask">
        {done ? (
          <div className="enter">
            <h3>Hotovo, přesně takhle.</h3>
            <p className="mt-2 text-muted-foreground">Z jednoho slova je řádek, se kterým se dá pracovat. Před konzultací si takto zapište tři dny.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button ref={again} type="button" className="btn btn-main" onClick={reset}>Zkusit další jídlo</button>
              <a href="/zaznam_stravy.docx" download className="btn btn-line">Stáhnout záznam stravy (.docx)</a>
            </div>
          </div>
        ) : (
          <form
            key={step}
            className={step ? "enter" : undefined}
            onSubmit={(e) => {
              e.preventDefault();
              answer(text);
            }}
          >
            <h3>
              <label htmlFor="food-answer">{s.ask(row.jidlo ?? "")}</label>
            </h3>
            <div className="food-line">
              <input id="food-answer" ref={input} className="field" value={text} onChange={(e) => setText(e.target.value.slice(0, 60))} placeholder={s.hint} autoComplete="off" enterKeyHint="next" />
              <button className="btn btn-main">Dál</button>
            </div>
            {s.tips.length > 0 && (
              <p className="food-tips">
                {s.tips.map((t) => (
                  <button key={t} type="button" onClick={() => answer(t)}>{t}</button>
                ))}
              </p>
            )}
          </form>
        )}
      </div>

      <div className="food-row">
        {columns.map(([k, label]) => {
          const i = steps.findIndex((x) => x.key === k);
          return (
            <button key={k} type="button" onClick={() => go(i, row)} aria-current={i === step ? "step" : undefined} className={row[k] ? "ok" : undefined}>
              <span>{label}</span>
              <b>{row[k] ? <mark key={row[k]}>{row[k]}</mark> : "…"}</b>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Kliknutím do tabulky odpověď opravíte. Nic se neukládá ani neodesílá.</p>
    </div>
  );
}
