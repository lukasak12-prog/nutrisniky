# 🚀 DEPLOYMENT CHECKLIST

## Pre-Deployment Checklist (Před deploymentem)

### ✅ Lokální Ověření
- [ ] Spusť `npm run build` a zkontroluj, že exit code je 0
- [ ] Ověř, že existují soubory v `dist/client/` a `dist/server/`
- [ ] Zkontroluj, že `dist/server/server.js` existuje
- [ ] Spusť skript `verify-deployment.ps1` (Windows) nebo `verify-deployment.sh` (Linux/Mac)
- [ ] Všechny kontroly jsou ✅ (zelené)

### ✅ Git Příprava
- [ ] Přidej všechny změny: `git add .`
- [ ] Vytvoř commit: `git commit -m "Fix: Cloudflare Pages deployment configuration"`
- [ ] Zkontroluj, že `.gitignore` obsahuje `dist/` (aby se neuploadvaly staré buildy)

### ✅ Ověření Souborů
- [ ] `wrangler.json` existuje a je minimální
- [ ] `_routes.json` existuje s SPA routing konfigurací
- [ ] `vite.config.ts` má `preset: "cloudflare-pages"`
- [ ] `app.config.ts` NE-existuje (byl smazán)
- [ ] `src/server.ts` má správný Cloudflare Workers fetch handler

---

## Deployment (Nasazení)

### 1️⃣ Push do GitHub
```bash
git push origin main
```

### 2️⃣ Automatické Nasazení
Cloudflare Pages automaticky:
- Detektuje push
- Spustí `npm run build`
- Nadeployuje `dist/` obsah
- Provede routing podle `_routes.json`

**Čas**: ~2-5 minut

### 3️⃣ Ověřit Deployment
Jdi na: https://dash.cloudflare.com
- Vyber Workers and Pages → Pages
- Klikni na projekt `nutri-n-cesta`
- Zkontroluj "Deployments" - mělo by být ✅ zelené

---

## Post-Deployment Checklist (Po deploymentu)

### 🔍 Funkčnost Test
- [ ] Otevři https://tvoje-domena.cz/
- [ ] Zkontroluj, že stránka se načítá bez 404
- [ ] Klikni na navigační links (O mně, Služby, Ceník, Kontakt)
- [ ] Zkontroluj, že všechny sekce se načítají
- [ ] Zkontroluj, že obrázky se zobrazují
- [ ] Zkontroluj, že CSS/styling je správně

### 📱 Responsive Design
- [ ] Otevři DevTools (F12)
- [ ] Zkontroluj desktop view (✅)
- [ ] Zkontroluj tablet view (iPad, 768px) (✅)
- [ ] Zkontroluj mobile view (iPhone, 375px) (✅)

### ⚡ Performance
- [ ] Otevři DevTools → Network tab
- [ ] Zkontroluj, že assets se načítají (není 404)
- [ ] Zkontroluj cache headers na static assets
- [ ] Zkontroluj, že strany se načítají do 3 sekund

### 🔐 Bezpečnost
- [ ] Zkontroluj, že URL začíná na `https://` (ne `http://`)
- [ ] Zkontroluj SSL certificate (klikni na zámek v URL baru)
- [ ] Zkontroluj Content Security Policy headers

---

## Troubleshooting (Řešení Problémů)

### Problem: Stále vidím 404
**Řešení:**
1. Zkontroluj build logs v Cloudflareu:
   - Dashboard → Workers and Pages → Pages → nutri-n-cesta → Build logs
2. Hledej chyby v "Build Output" sekci
3. Zkontroluj, že `dist/server/server.js` byl vygenerován lokálně

### Problem: Stránka se načítá ale není styling
**Řešení:**
1. Zkontroluj DevTools → Network tab
2. Zkontroluj, že CSS soubor se načítá (status 200)
3. Zkontroluj Content Security Policy headers

### Problem: Obrázky se nenačítají
**Řešení:**
1. Zkontroluj, že obrázky existují v `dist/client/`
2. Zkontroluj Network tab v DevTools
3. Zkontroluj `_routes.json` - zbytečně nevylučuješ obrázky?

### Problem: 500 error namísto obsahu
**Řešení:**
1. Zkontroluj server logs v Cloudflareu
2. Zkontroluj `src/server.ts` - má správný format?
3. Zkontroluj `src/routes/` - všechny routes jsou správné?

---

## Rollback (Vrácení Zpět)

Pokud je deployment rozbitý:

```bash
# 1. Vrať poslední commit
git revert HEAD

# 2. Pushnout zpět
git push origin main

# Cloudflare Pages se automaticky zdeployuje na předchozí verzi
```

---

## Monitoring (Sledování)

### Pravidelné Kontroly
- **Denně**: Zkontroluj, že web funguje (https://tvoje-domena.cz/)
- **Týdně**: Zkontroluj Cloudflare Pages dashboard
- **Měsíčně**: Zkontroluj performance metrics

### Užitečné URLs
- Dashboard: https://dash.cloudflare.com
- Pages Projekt: https://dash.cloudflare.com/... (Pages > nutri-n-cesta)
- Workers KV: https://dash.cloudflare.com/... (Storage > KV)

---

## ✅ FINÁLNÍ CHECKLIST

- [ ] Všechny soubory jsou připravené
- [ ] `npm run build` prochází bez chyb
- [ ] Verifikační skript vrátí všechny ✅
- [ ] Git je připraven (`git push origin main`)
- [ ] Deployment je hotový a ✅ zelený
- [ ] Web funguje bez 404 chyb
- [ ] Všechny sekce se zobrazují
- [ ] Responsive design funguje
- [ ] Performance je OK

---

**Stav**: 🟢 READY FOR DEPLOYMENT

Teď už jen pushnout:
```bash
git push origin main
```

🚀 **HOTOVO!**
