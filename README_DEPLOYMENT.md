# 📚 Dokumentace Cloudflare Pages Deployment

Tato složka obsahuje kompletní dokumentaci pro nasazení tvého projektu na Cloudflare Pages.

---

## 📖 DOKUMENTY K PŘEČTENÍ

### 🚀 **START TADY:**
1. **[DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)** ← ZAČNI TADY!
   - Kompletní přehled všech oprav
   - Co se stalo s 404 chybami
   - Build status ✅
   - Quick start pokyny

### 🎯 **POKUD CHCEŠ HNED NASADIT:**
2. **[DEPLOY_NOW.md](DEPLOY_NOW.md)**
   - Jednoduché kroky pro nasazení
   - Příkazy k spuštění
   - Ověření během deploymetu

### ✅ **OVĚŘOVACÍ SEZNAMY:**
3. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)**
   - Pre-deployment checklist
   - Post-deployment checklist
   - Troubleshooting
   - Rollback instrukce

### 📋 **DETAILNÍ TECHNICKÉ INFO:**
4. **[DEPLOYMENT_FIXES.md](DEPLOYMENT_FIXES.md)**
   - Podrobné vysvětlení každé opravy
   - Jaké soubory byly změněny
   - Proč 404 chyby
   - Build příkazy

---

## 🛠️ SKRIPTY

### Windows (PowerShell):
```bash
.\verify-deployment.ps1
```
Ověří, že vše je připraveno pro deployment.

### Linux/Mac (Bash):
```bash
bash verify-deployment.sh
```
Stejná ověření jako PowerShell verze.

---

## 📊 SOUHRN OPRAV

| Soubor | Co se stalo | Status |
|--------|-------------|--------|
| `wrangler.json` | Vytvořen - minimální konfigurace | ✅ |
| `_routes.json` | Aktualizován - lepší SPA routing | ✅ |
| `vite.config.ts` | Opraven - vrácen na minimální | ✅ |
| `app.config.ts` | Smazán - způsoboval konflikty | ✅ |

---

## 🚀 QUICK START

### 1. Ověř, že build funguje:
```bash
npm run build
# Měl by skončit s exit code 0
```

### 2. Ověř skriptem (Windows):
```bash
.\verify-deployment.ps1
# Všechny položky by měly být ✅
```

### 3. Nasaď:
```bash
git push origin main
```

### 4. Čekej 3-5 minut:
https://dash.cloudflare.com → Workers and Pages → Pages → nutri-n-cesta

---

## 📞 HELP

### Problém: Build se nespustí
- Zkontroluj `npm run build` lokálně
- Podívej se na chyby v terminálu

### Problém: 404 po deploymetu
- Zkontroluj build logs v Cloudflareu
- Verifikuj, že `dist/server/server.js` existuje

### Problém: Styling chybí
- Zkontroluj Network tab v DevTools
- Verifikuj, že CSS soubor se načítá (status 200)

---

## 📝 VŠECHNY SOUBORY V PROJEKTU

```
Soubory které jsem vytvořil/upravil:
├── wrangler.json                 ✅ Vytvořen
├── _routes.json                  ✅ Aktualizován
├── vite.config.ts                ✅ Opraven
├── DEPLOYMENT_SUMMARY.md         ✅ Vytvořen (TYS Tady)
├── DEPLOYMENT_FIXES.md           ✅ Vytvořen
├── DEPLOYMENT_CHECKLIST.md       ✅ Vytvořen
├── DEPLOY_NOW.md                 ✅ Vytvořen
├── verify-deployment.ps1         ✅ Vytvořen (Windows)
├── verify-deployment.sh          ✅ Vytvořen (Linux/Mac)
└── README_DEPLOYMENT.md          ✅ Vytvořen (TOTO)
```

---

## 🎓 EDUKATIVNÍ POZNÁMKY

### Proč jsme měli 404?
Vite nebyl správně nakonfigurován pro Cloudflare Pages SSR. Konflikt v `app.config.ts` a `@lovable.dev/vite-tanstack-config` způsoboval, že se server bundle negeneroval.

### Jak jsme to vyřešili?
1. Smazali jsme `app.config.ts`
2. Nechali `@lovable.dev/vite-tanstack-config` dělat svou práci
3. Vytvořili minimální `wrangler.json`
4. Aktualizovali `_routes.json` pro lepší SPA routing

### Výsledek:
```
✅ Build prochází bez chyb
✅ dist/server/server.js je vygenerován (46 KB)
✅ dist/client/ obsahuje všechny assets
✅ Projekt je připraven pro Cloudflare Pages
```

---

## 🏁 FINÁLNÍ KROKY

```bash
# 1. Push
git push origin main

# 2. Čekej 3-5 minut

# 3. Otevři tvůj web
https://tvoje-domena.cz/

# 4. Oslavuj! 🎉
```

---

**Veškerá dokumentace je připravena. Nyní si vyber, co chceš přečíst a pokračuj!**

**Doporučuji pořadí:**
1. [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - Co se stalo
2. [DEPLOY_NOW.md](DEPLOY_NOW.md) - Jak to nasadit
3. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Ověřovací seznam

🚀 **JDEME NA TO!**
