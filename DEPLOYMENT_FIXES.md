# Cloudflare Pages Deployment - Opravy a Postupy

## ✅ Co jsem opravil

### 1. ✅ Vytvořen minimální `wrangler.json` 
**Problém**: Chyběl konfigurační soubor pro Cloudflare Pages
**Řešení**: Vytvořen jednoduchý `wrangler.json`:
```json
{
  "name": "nutrisniky",
  "compatibility_date": "2024-09-23"
}
```
**Poznámka**: Cloudflare Pages automaticky detekuje `dist/` strukturu, nepotřebujeme `main` nebo `site` nastavení.

### 2. ✅ Aktualizován `_routes.json`
**Problém**: Neúplná konfigurace pro SPA routing
**Staré**: `{"version": 1, "include": ["/*"], "exclude": ["/assets/*"]}`
**Nové**: 
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/assets/*",
    "/*.ico",
    "/*.txt",
    "/*.xml",
    "/*.json"
  ]
}
```

### 3. ❌ Smazán `app.config.ts`
**Důvod**: Kolidoval s `@lovable.dev/vite-tanstack-config`, který je nadefinován v balíčku `@lovable.dev/vite-tanstack-config`. Duplikátní konfigurace způsobovala build chyby.

### 4. ✅ Opraven `vite.config.ts`
**Změna**: Vrácen na minimální konfiguraci
```typescript
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "src/server.ts",
      preset: "cloudflare-pages",
    },
  },
});
```

## 🚀 Build Výstup - OVĚŘENO

### Struktura `dist/` po úspěšném buildu:
```
dist/
├── client/                    # Klientské assets (bundlované React)
│   ├── index-*.js            # Main JS bundles (341 KB + 86 KB)
│   ├── styles-*.css          # Tailwind CSS (89 KB)
│   ├── images/               # Obrázky (25 MB)
│   └── ...                   # Ostatní statické soubory
├── server/
│   └── server.js             # Server bundle (46 KB) - MAIN ENTRY POINT
└── .assetsignore             # Soubory které se nenahrávají
```

**Status**: ✅ Build projde bez chyb (exit code 0)

## 🌐 Nasazení na Cloudflare Pages

### Krok 1: Push do GitHub
```bash
# Ujisti se, že .gitignore zahrnuje dist/ (aby se neuploadu staré buildy)
# Přidej všechny nové/upravené soubory
git add .
git commit -m "Fix: Cloudflare Pages deployment configuration"
git push origin main
```

### Krok 2: Automatické nasazení
Cloudflare Pages automaticky:
1. Detektuje push
2. Spustí `npm run build` (z `package.json`)
3. Naloží `dist/server/server.js` jako worker
4. Naloží `dist/client/` jako statické assets
5. Nastaví routing podle `_routes.json`

### Krok 3: Ověření v Cloudflare Dashboardu
1. Jdi na https://dash.cloudflare.com
2. Vyber Workers and Pages → Pages
3. Klikni na tvůj projekt
4. Podívej se na sekci "Deployments" → poslední deploy

## 🔍 Jak zjistit, jestli to funguje

### Produkce URL testování:
```bash
# Testuj domovskou stránku
curl https://tvoje-domena.cz/ -I

# Měl bys vidět: HTTP/2 200 OK (ne 404!)
# Zkontroluj, že je HTML odpověď (ne "Not Found")
```

### Pokud stále vidíš 404:
1. Zkontroluj Cloudflare Pages build logs:
   - Dashboard → Workers and Pages → Pages → `nutri-n-cesta` → Build logs
2. Hledej chyby v sekci "Build Output"
3. Ověř, že `dist/server/server.js` existuje

## 📝 Soubory, které byly změněny/vytvořeny

| Soubor | Status | Poznámka |
|--------|--------|----------|
| `wrangler.json` | ✅ Vytvořen | Minimální konfigurace pro Cloudflare |
| `_routes.json` | ✅ Aktualizován | Lepší SPA routing konfigurace |
| `vite.config.ts` | ✅ Opravený | Vrácen na minimální nastavení |
| `app.config.ts` | ❌ Smazán | Způsoboval build konflikty |

## 🛠️ Build Příkazy

```bash
# Lokální vývoj
npm run dev

# Produkční build (generuje dist/)
npm run build

# Produkční build v dev módu (pro debugging)
npm run build:dev

# Náhled produkčního buildu
npm run preview

# Lint kontrola
npm run lint

# Formátování kódu
npm run format
```

## ⚠️ Důležité Poznámky

1. **Build warnings**: Některé moduly hlásí unused imports z `@tanstack/router-core`. To je normální a nijak neovlivňuje funkcionalitu.

2. **Image velikosti**: Máš obrázky o celkové velikosti ~25 MB. Pro lepší výkon by bylo dobré:
   - Zkomprimovat PNG/JPG soubory
   - Zvážit WebP konverzi
   - Lazy-load obrázky na stránce

3. **Cache**: Cloudflare Pages automaticky cachuje klientské assets (JS, CSS). Server bundle se cachuje s kratší TTL.

## 🔧 Dalších kroky (optional)

### Pokud chceš monitorovat nasazení:
- Nainstaluj Wrangler CLI: `npm install -g wrangler`
- Možný je live preview: `npm run preview`
- Možné je lokální testování: `wrangler pages dev dist/`

---

**Poslední aktualizace**: Když se build podařil s exit code 0 a `dist/` struktura je správná.
