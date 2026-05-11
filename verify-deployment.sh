#!/bin/bash
# Cloudflare Pages Deployment Verification Checklist
# Spusť tento skript aby se ověřilo, že je vše připraveno pro deployment

echo "🔍 Cloudflare Pages Deployment Verification"
echo "=============================================="
echo ""

# 1. Zkontroluj package.json
echo "✓ Kontroluji package.json..."
if grep -q '"build": "vite build"' package.json; then
    echo "  ✅ Build skript je správně nakonfigurován"
else
    echo "  ❌ Build skript chybí!"
fi

# 2. Zkontroluj vite.config.ts
echo ""
echo "✓ Kontroluji vite.config.ts..."
if grep -q 'preset.*cloudflare-pages' vite.config.ts; then
    echo "  ✅ Cloudflare Pages preset je nastaven"
else
    echo "  ❌ Cloudflare Pages preset chybí!"
fi

if grep -q 'entry.*src/server.ts' vite.config.ts; then
    echo "  ✅ Server entry point je správný"
else
    echo "  ❌ Server entry point není správný!"
fi

# 3. Zkontroluj wrangler.json
echo ""
echo "✓ Kontroluji wrangler.json..."
if [ -f wrangler.json ]; then
    echo "  ✅ wrangler.json existuje"
    if grep -q '"name".*"nutrisniky"' wrangler.json; then
        echo "  ✅ Projekt name je správný"
    fi
else
    echo "  ❌ wrangler.json chybí!"
fi

# 4. Zkontroluj _routes.json
echo ""
echo "✓ Kontroluji _routes.json..."
if [ -f _routes.json ]; then
    echo "  ✅ _routes.json existuje"
    if grep -q '"include".*"\*"' _routes.json; then
        echo "  ✅ SPA routing je nakonfigurován"
    fi
else
    echo "  ❌ _routes.json chybí!"
fi

# 5. Zkontroluj src/server.ts
echo ""
echo "✓ Kontroluji src/server.ts..."
if grep -q 'async fetch.*Request.*env.*ctx' src/server.ts; then
    echo "  ✅ Server handler je pro Cloudflare Workers format"
else
    echo "  ❌ Server handler format je nesprávný!"
fi

# 6. Zkontroluj app.config.ts (měl by NE existovat)
echo ""
echo "✓ Kontroluji app.config.ts..."
if [ ! -f app.config.ts ]; then
    echo "  ✅ app.config.ts byl smazán (správně!)"
else
    echo "  ⚠️  app.config.ts existuje - může způsobit build konflikty"
fi

# 7. Zkontroluj dist/
echo ""
echo "✓ Kontroluji dist/ struktura..."
if [ -d dist/client ]; then
    echo "  ✅ dist/client/ existuje"
    client_files=$(find dist/client -type f | wc -l)
    echo "     Počet souborů: $client_files"
else
    echo "  ❌ dist/client/ neexistuje - spusť 'npm run build'"
fi

if [ -d dist/server ]; then
    echo "  ✅ dist/server/ existuje"
    if [ -f dist/server/server.js ]; then
        echo "  ✅ dist/server/server.js (main entry point) existuje"
        server_size=$(stat -f%z dist/server/server.js 2>/dev/null || stat -c%s dist/server/server.js 2>/dev/null)
        echo "     Velikost: $server_size bytes"
    fi
else
    echo "  ❌ dist/server/ neexistuje - spusť 'npm run build'"
fi

# 8. Zkontroluj .gitignore
echo ""
echo "✓ Kontroluji .gitignore..."
if grep -q 'dist' .gitignore; then
    echo "  ✅ dist/ je v .gitignore (nebude se uploadovat)"
else
    echo "  ⚠️  dist/ není v .gitignore - může se uploadovat"
fi

# Summary
echo ""
echo "=============================================="
echo "✅ Ověření hotovo!"
echo ""
echo "Pokud je vše zelené (✅), můžeš:"
echo "1. git push origin main"
echo "2. Cloudflare Pages automaticky nadeployuje"
echo ""
echo "Pokud vidíš ❌ chyby, oprav je před deploymentem."
