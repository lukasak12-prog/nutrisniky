# Cloudflare Pages Deployment Verification Checklist (PowerShell)
# Spusť tento skript aby se ověřilo, že je vše připraveno pro deployment

Write-Host "🔍 Cloudflare Pages Deployment Verification" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Zkontroluj package.json
Write-Host "✓ Kontroluji package.json..." -ForegroundColor Yellow
$packageJson = Get-Content package.json | ConvertFrom-Json
if ($packageJson.scripts.build -eq "vite build") {
    Write-Host "  ✅ Build skript je správně nakonfigurován" -ForegroundColor Green
} else {
    Write-Host "  ❌ Build skript není správný!" -ForegroundColor Red
}

# 2. Zkontroluj vite.config.ts
Write-Host ""
Write-Host "✓ Kontroluji vite.config.ts..." -ForegroundColor Yellow
$viteConfig = Get-Content vite.config.ts -Raw
if ($viteConfig -match 'cloudflare-pages') {
    Write-Host "  ✅ Cloudflare Pages preset je nastaven" -ForegroundColor Green
} else {
    Write-Host "  ❌ Cloudflare Pages preset chybí!" -ForegroundColor Red
}

if ($viteConfig -match 'src/server\.ts') {
    Write-Host "  ✅ Server entry point je správný" -ForegroundColor Green
} else {
    Write-Host "  ❌ Server entry point není správný!" -ForegroundColor Red
}

# 3. Zkontroluj wrangler.json
Write-Host ""
Write-Host "✓ Kontroluji wrangler.json..." -ForegroundColor Yellow
if (Test-Path wrangler.json) {
    Write-Host "  ✅ wrangler.json existuje" -ForegroundColor Green
    $wranglerJson = Get-Content wrangler.json | ConvertFrom-Json
    if ($wranglerJson.name -eq "nutrisniky") {
        Write-Host "  ✅ Projekt name je správný" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ wrangler.json chybí!" -ForegroundColor Red
}

# 4. Zkontroluj _routes.json
Write-Host ""
Write-Host "✓ Kontroluji _routes.json..." -ForegroundColor Yellow
if (Test-Path _routes.json) {
    Write-Host "  ✅ _routes.json existuje" -ForegroundColor Green
    $routesJson = Get-Content _routes.json | ConvertFrom-Json
    if ($routesJson.include -contains "/*") {
        Write-Host "  ✅ SPA routing je nakonfigurován" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ _routes.json chybí!" -ForegroundColor Red
}

# 5. Zkontroluj src/server.ts
Write-Host ""
Write-Host "✓ Kontroluji src/server.ts..." -ForegroundColor Yellow
$serverTs = Get-Content src/server.ts -Raw
if ($serverTs -match 'async fetch.*Request.*env.*ctx') {
    Write-Host "  ✅ Server handler je pro Cloudflare Workers format" -ForegroundColor Green
} else {
    Write-Host "  ❌ Server handler format je nesprávný!" -ForegroundColor Red
}

# 6. Zkontroluj app.config.ts (měl by NE existovat)
Write-Host ""
Write-Host "✓ Kontroluji app.config.ts..." -ForegroundColor Yellow
if (-not (Test-Path app.config.ts)) {
    Write-Host "  ✅ app.config.ts byl smazán (správně!)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  app.config.ts existuje - může způsobit build konflikty" -ForegroundColor Yellow
}

# 7. Zkontroluj dist/
Write-Host ""
Write-Host "✓ Kontroluji dist/ struktura..." -ForegroundColor Yellow
if (Test-Path dist/client) {
    $clientFiles = @(Get-ChildItem dist/client -Recurse -File).Count
    Write-Host "  ✅ dist/client/ existuje (počet souborů: $clientFiles)" -ForegroundColor Green
} else {
    Write-Host "  ❌ dist/client/ neexistuje - spusť 'npm run build'" -ForegroundColor Red
}

if (Test-Path dist/server) {
    Write-Host "  ✅ dist/server/ existuje" -ForegroundColor Green
    if (Test-Path dist/server/server.js) {
        Write-Host "  ✅ dist/server/server.js (main entry point) existuje" -ForegroundColor Green
        $serverSize = (Get-Item dist/server/server.js).Length
        Write-Host "     Velikost: $serverSize bytes" -ForegroundColor Gray
    }
} else {
    Write-Host "  ❌ dist/server/ neexistuje - spusť 'npm run build'" -ForegroundColor Red
}

# 8. Zkontroluj .gitignore
Write-Host ""
Write-Host "✓ Kontroluji .gitignore..." -ForegroundColor Yellow
$gitignore = Get-Content .gitignore -Raw
if ($gitignore -match 'dist') {
    Write-Host "  ✅ dist/ je v .gitignore (nebude se uploadovat)" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  dist/ není v .gitignore - může se uploadovat" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✅ Ověření hotovo!" -ForegroundColor Green
Write-Host ""
Write-Host "Pokud je vše zelené (✅), můžeš:" -ForegroundColor Green
Write-Host "1. git push origin main" -ForegroundColor Green
Write-Host "2. Cloudflare Pages automaticky nadeployuje" -ForegroundColor Green
Write-Host ""
Write-Host "Pokud vidíš ❌ chyby, oprav je před deploymentem." -ForegroundColor Yellow
