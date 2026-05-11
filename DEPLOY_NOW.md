# Deploy Script - Jednoduché nasazení na Cloudflare Pages

## 🚀 Jednoduchý Deploy

### 1. Jednotný příkaz pro vše:

```bash
# Zkombinuj všechny kroky v jeden příkaz:
npm run build && git add . && git commit -m "Deploy: Cloudflare Pages deployment" && git push origin main
```

### Nebo krok za krokem:

```bash
# Krok 1: Build
npm run build

# Zkontroluj, že byl build úspěšný (exit code 0)
echo "Build status: $?"

# Krok 2: Přidej všechny soubory
git add .

# Krok 3: Commit
git commit -m "Deploy: Cloudflare Pages deployment"

# Krok 4: Push - Cloudflare Pages bude automaticky buildovat a deployovat
git push origin main
```

---

## 🔍 Ověření Během Deploymetu

### V Cloudflare Dashboardu (v reálném čase):

1. Jdi na: https://dash.cloudflare.com
2. Vyber Workers and Pages → Pages
3. Klikni na `nutri-n-cesta`
4. Podívej se na "Deployments" sekci
5. Měl by se tam zobrazit nový deployment (žlutě - building, pak zelená - ready)

### V terminálu (sleduj, co se děje):

```bash
# Zkontroluj, že push se podařil:
git log --oneline -5

# Měl by být vidět tvůj nový commit

# Zkontroluj branchi
git branch -vv

# main by měla být v sync s origin/main
```

---

## ⏱️ Časy Nasazení

- **Git Push**: < 1 sekunda
- **Cloudflare Build**: ~1-2 minuty
- **Cloudflare Deploy**: < 1 minuta
- **DNS Propagace**: < 30 sekund (v Cloudflareu to je instant)

**Celkový čas**: ~3-5 minut od pushu až k tomu, kdy je web live

---

## 🌐 Jak Vědět, že Deployment Pracuje

### Během Buildu:
```
Status: Building 🟡
```

### Když je Hotovo:
```
Status: Success ✅
```

### Klikni na Deployment, aby ses viděl detaily:
- Build time
- Deployment time
- commit hash
- deployment URL

---

## 🔗 Odkaz na Tvůj Web

Po úspěšném deploymentu:
```
https://tvoje-domena.cz/
```

Zkontroluj, že se stránka načítá a není 404.

---

## 📱 Alternativní Deploy Metody

### Metoda 1: GitHub Desktop
1. Otevři GitHub Desktop
2. Klikni "Push origin"
3. Hotovo! Cloudflare se automaticky deployuje

### Metoda 2: VS Code Git
1. V VS Code: Ctrl+Shift+G (nebo Cmd+Shift+G na Maku)
2. Vyplň commit zprávu
3. Klikni na "Push"
4. Hotovo!

### Metoda 3: Command Line (Terminál)
```bash
git push origin main
```

---

## ✅ Quick Deploy Checklist

- [ ] Spustil jsem `npm run build` (bez chyb)
- [ ] Git changes přidány (`git add .`)
- [ ] Commit vytvořen (`git commit -m "..."`)
- [ ] Pushnuto do GitHub (`git push origin main`)
- [ ] Čekám 3-5 minut
- [ ] Cloudflare Dashboard ukazuje deployment ✅
- [ ] Web je live na https://tvoje-domena.cz/

---

**Teď už jen:**
```bash
git push origin main
```

🚀 **GO!**
