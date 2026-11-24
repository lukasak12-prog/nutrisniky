# DESIGN.md: nutrisniky.cz

Jemné odstranění šablonového vzhledu. Stavba stránky, texty, fotky a přibližné barvy zůstávají.

## Zadání
- Web jedné nutriční terapeutky, hlavní akce: napsat nebo zavolat.
- Slova: lidsky, klidně, věcně, pečlivě.
- Ukotvení: to, co je opravdu Nicolino. Krémová a béžový kruh z dárkových poukazů, linka pod údajem z poukazu, zvýrazňovač ze záznamu stravy.

## Hlavní tah
Tyrkysový zvýrazňovač. Označuje jen údaje, na kterých záleží, v záznamu stravy. Nikde jinde tyrkysový text v odstavci.

## Úvod
Skutečná fotka přes celou šířku bez ztmavení. Titul je „namalovaný“ na zdi: násobí se s omítkou, Nicola sedí před ním. Nic se nevyřezává. `uvod-maska.webp` nepustí barvu na obličej, tričko a vnitřek vlasů, přes okraje vlasů se násobit smí (na tmavém to není vidět), proto nevzniká lem. Fotka a maska musí mít stejný výřez a stejné `object-position` / `mask-position`. Fotka se zarovnává nahoru a není vyšší než 57 % šířky, aby zdola netrčela víčka lahví. Po načtení se nápis klidně objeví zleva doprava. Pod ním jen jméno, místo a dvě tlačítka. Telefon má vlastní výřez na výšku (`uvod-mobil-*`, `uvod-maska-mobil.webp`): nápis přes celou šířku nad hlavou, spodek druhého řádku zajede za temeno. Používá se výřez původní fotky, ne verze rozšířená do šířky.

## Poukazy
`/poukazy` má velký nápis „Darujte péči o zdraví“ na béžové z poukazu (`--sand`, stejná jako kruh na poukazech). Fotka zdi tu být nemá. Na počítači je nápis na jednom řádku přesně přes šířku tří poukazů a nic ho nezakrývá. Na mobilu má tři řádky a poukazy zakryjí jen spodek posledního. Světlá plocha pod béžovou je stůl, na ní je u každého poukazu obsah, cena a výběr. Vybraný stojí o kousek vpředu. Na mobilu stojí poukazy za sebou a vybraný se vytáhne a postaví dopředu.

## Písmo
Commissioner (variabilní, soubory v `src/assets/fonts`, licence OFL). Nadpisy s osou FLAR 100 (rozšířené dříky), text bez ní. Prostrkání nadpisů -0,015em. Základ 17 px. Ceny a časy `tabular-nums`.

## Barvy
| role | token | hodnota |
|---|---|---|
| bg | `--background` | `oklch(0.985 0.012 82)` |
| surface | `--card` | `oklch(0.995 0.005 82)` |
| podklad sekcí | `--secondary` | `oklch(0.958 0.022 80)` |
| béžová z poukazu | `--sand` | `#ebded5` (přesně z poukazu) |
| text | `--foreground` | `oklch(0.27 0.025 58)` |
| tlumený text | `--muted-foreground` | `oklch(0.44 0.028 60)` |
| hnědá (patička, odeslání) | `--brown` | `oklch(0.42 0.055 52)` |
| tyrkysová plocha (hlavní akce) | `--turquoise` | `oklch(0.76 0.11 195)` |
| tyrkysová pro text a odkazy | `--teal` | `oklch(0.43 0.075 205)` |
| linka | `--border` | `oklch(0.86 0.022 72)` |

Tyrkysová `0.76` se nepoužívá na text, na krémové má malý kontrast.

## Hlavička
Výška se při posunu nemění (`--head`), jen se ukáže linka.

## Míry
- Zaoblení: 0,5 rem (plochy, pole, tlačítka) a kruh (ukazatele, dny, portrét). Nic jiného.
- Stín: žádný na kartách a tlačítkách. Jen obrázky poukazů jako předměty.
- Oddělení linkou 2 px nahoře, stejnou jako na poukazu.

## Nepoužívat
Štítky s ikonou nad nadpisem, prostrkané verzálky nad nadpisem, ikona v barevném čtverečku nad kartou, rozmazané koule, skleněné karty, přechody na pozadí, nekonečné animace, vlastní barva pro každou kartu, pilulky z odrážek, postupné objevování textů a karet při posunu, čísla 01/02/03.

## Pohyb
Hýbe se jen to, co něco ukazuje, a nejvýš jednou:
- nápis v úvodu se na zdi klidně objeví zleva doprava
- kroužky s minutami se dotočí, dny v jídelníčku a v záznamu se rozsvítí postupně
- přechod z úvodu: úvod stojí, lehce ustoupí a ztmavne, další sekce přes něj čistě přejede; linky nad tématy se dotáhnou zleva
- zvýrazňovač v záznamu stravy jede po řádcích, zpod listu vyjedou další dva
- vějíř poukazů se po najetí rozevře (na dotyku, když je vidět)
- poukazy na mobilu: vybraný se vytáhne zezadu a postaví dopředu
- poukaz na /poukazy se po najetí pootočí, protože má i druhou stranu
- linka pod odkazem v menu, otevření menu na mobilu, potvrzení zprávy

Čtyři věci navíc, každá vychází z něčeho Nicolina:
- poukazy z vějíře přeletí na svá místa na /poukazy a zpět (View Transitions; opt-in je v `index.html`, musí být dřív než CSS)
- jména z formuláře se píšou přímo na náhled poukazu, na mobilu se řádek přiblíží
- „Co jste dnes jedli?“: otázka po otázce se vyplní jeden řádek záznamu stravy, nic se neukládá
- 70 teček = 70 kg u InBody, na místě kroužku s minutami: posuvník mění složení, hodnoty jsou přímo v seznamu toho, co InBody měří (výpočet, ne výsledek měření)

Křivky `--ease-out` a `--ease-in-out`, odezva do 250 ms, vysvětlující pohyb do 0,9 s. Obsah není nikdy schovaný: bez JavaScriptu a při `prefers-reduced-motion` je vše hotové rovnou.

Nepoužívat motiv malování (váleček, štětec, natřená omítka), web pak vypadá jako pro malíře.
