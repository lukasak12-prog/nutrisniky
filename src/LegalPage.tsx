import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { pageByPath } from "@/seo";
import {
  openItems, privacy, seller, terms, termsEffective, withdrawalForm, WITHDRAWAL_PATH, type Section,
} from "@/data/legal";

/** Nepotvrzené údaje ⟦…⟧ zvýrazní, aby se neztratily. */
function Text({ children }: { children: string }) {
  return (
    <>
      {children.split(/(⟦[^⟧]*⟧)/).map((part, i) =>
        part.startsWith("⟦") ? (
          <mark key={i} data-draft="" className="bg-amber-200 px-1 text-foreground">{part.slice(1, -1)}</mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-border pt-8">
          <h2 className="text-2xl">{s.title}</h2>
          <div className="mt-4 space-y-4 leading-7 text-foreground/85">
            {s.body.map((b, i) =>
              Array.isArray(b) ? (
                <ul key={i} className="list-disc space-y-2 pl-5 marker:text-brown">
                  {b.map((li) => <li key={li}><Text>{li}</Text></li>)}
                </ul>
              ) : (
                <p key={i}><Text>{b}</Text></p>
              ),
            )}
          </div>
          {s.id === "odstoupeni" && (
            <>
              <a
                href={WITHDRAWAL_PATH}
                className="btn btn-brown mt-6"
              >
                Odstoupit od smlouvy
              </a>
              <details className="mt-6 border-l-2 border-brown/30 pl-5 text-sm leading-7">
                <summary className="cursor-pointer font-semibold">Vzorový formulář pro odstoupení</summary>
                {withdrawalForm.map((l) => <p key={l} className="mt-2">{l}</p>)}
              </details>
            </>
          )}
        </section>
      ))}
    </>
  );
}

export function DocumentPage({ path, title, intro, sections, showSeller = false }: {
  path: string;
  title: string;
  intro: string;
  sections: Section[];
  showSeller?: boolean;
}) {
  useEffect(() => {
    document.title = pageByPath(path).title;
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  }, [path]);

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-4 pb-24 pt-32 md:pt-40">
        {openItems.length > 0 && (
          <p data-draft="" className="mb-10 bg-amber-200 px-4 py-3 text-sm text-foreground">
            Návrh. Zvýrazněné údaje čekají na potvrzení.
          </p>
        )}
        <h1 className="max-w-3xl h-section">{title}</h1>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground"><Text>{intro}</Text></p>

        {showSeller && (
          // stejná políčka jako na poukazu: popisek a linka
          <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {seller.map(([label, value]) => (
              <div key={label} className="border-b-2 border-brown/25 pb-2">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-foreground"><Text>{value}</Text></dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[16rem_minmax(0,44rem)]">
          <nav aria-label="Obsah" className="self-start text-sm lg:sticky lg:top-28">
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-10"><Sections sections={sections} /></div>
        </div>
      </div>
    </Layout>
  );
}

export const TermsPage = () => (
  <DocumentPage
    path="/obchodni-podminky"
    title="Obchodní podmínky"
    intro={`Pro nákup dárkových poukazů na nutrisniky.cz. Účinné od: ${termsEffective}.`}
    sections={terms}
    showSeller
  />
);

export const PrivacyPage = () => (
  <DocumentPage
    path="/ochrana-osobnich-udaju"
    title="Zásady ochrany osobních údajů"
    intro="Jaké údaje web zpracovává, proč a jaká máte práva."
    sections={privacy}
  />
);
