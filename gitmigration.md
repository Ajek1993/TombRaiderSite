# Plan Migracji: HTML/CSS/JS → Next.js/React

## Cel
Reorganizacja struktury projektu po migracji na Next.js:
1. Archiwizacja starej wersji HTML/CSS/JS do folderu `archive/html-version/`
2. Przeniesienie zawartości `tomb-raider-next/` do głównego katalogu
3. Aktualizacja plików konfiguracyjnych i SEO
4. Przygotowanie do późniejszej konfiguracji gałęzi Git (archive, main, dev)

## Decyzje Użytkownika
- **Folder archiwum**: `archive/html-version/`
- **Pliki SEO**: Archiwizacja starych, utworzenie nowych dla Next.js w `public/`
- **Zmienne środowiskowe**: Pozostawić obecny `.env.local`, pokazać różnice do ręcznej weryfikacji
- **Git**: Najpierw struktura plików, później konfiguracja gałęzi

---

## Faza 1: Przygotowanie i Backup (5 min)

### 1.1 Weryfikacja stanu wyjściowego
```bash
# Sprawdź czy tomb-raider-next działa
cd tomb-raider-next && npm run dev
# CTRL+C aby zatrzymać
```
**Oczekiwany rezultat**: Server działa na localhost:3000

### 1.2 Git checkpoint (pre-migration)
```bash
git add -A
git commit -m "Pre-migration checkpoint: Backup before restructuring

Current state:
- Old HTML version in root
- New Next.js version in tomb-raider-next/
- About to: Archive old, promote new to root

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Faza 2: Archiwizacja Starej Wersji (10 min)

### 2.1 Utworzenie katalogu archiwum
```bash
mkdir -p archive/html-version
```

### 2.2 Przeniesienie plików HTML (7 plików)
```bash
mv index.html archive/html-version/
mv gameplays.html archive/html-version/
mv highlights.html archive/html-version/
mv faq.html archive/html-version/
mv cookies.html archive/html-version/
mv privacy.html archive/html-version/
mv 404.html archive/html-version/
```

### 2.3 Przeniesienie katalogów starej wersji (6 folderów)
```bash
mv assets/ archive/html-version/
mv api/ archive/html-version/
mv lib/ archive/html-version/
mv admin/ archive/html-version/
mv config/ archive/html-version/
mv scripts/ archive/html-version/
```

### 2.4 Przeniesienie starych plików konfiguracyjnych
```bash
mv vercel.json archive/html-version/
mv package.json archive/html-version/
mv package-lock.json archive/html-version/
mv robots.txt archive/html-version/
mv sitemap.xml archive/html-version/
mv google52658329dff56699.html archive/html-version/
mv manifest.json archive/html-version/
```

### 2.5 Utworzenie README w archiwum
**Plik**: `archive/html-version/README.md`

**Zawartość**:
```markdown
# Archiwum: HTML/CSS/JS Version (Pre-Next.js)

## Data archiwizacji
2025-12-11

## Powód
Migracja projektu z HTML/CSS/JavaScript na Next.js/React/TypeScript.

## Zawartość

### Strony HTML (7 plików)
- index.html, gameplays.html, highlights.html, faq.html, cookies.html, privacy.html, 404.html

### Assets
- assets/css/ - 15 plików CSS
- assets/js/ - 18 plików JavaScript + komponenty
- assets/images/ - Grafiki, ikony, favicon

### Backend (Stara wersja)
- api/ - 6 Node.js serverless functions
- lib/ - 4 biblioteki helper

### Inne
- admin/, config/, scripts/
- manifest.json, vercel.json, package.json
- robots.txt, sitemap.xml, google verification

## Restore
Jeśli potrzebujesz przywrócić:
1. Usuń zawartość root (oprócz archive/)
2. Skopiuj z archive/html-version/ do root
3. `npm install && npm run dev`
```

---

## Faza 3: Migracja Zawartości tomb-raider-next (15 min)

### 3.1 Przeniesienie katalogów głównych
```bash
mv tomb-raider-next/src ./
mv tomb-raider-next/public ./
```

**Rezultat**:
- `src/` w root (app/, components/, lib/, styles/, types/, config/, context/, hooks/)
- `public/` w root (manifest.json, assets/images/, icons/)

### 3.2 Przeniesienie plików konfiguracyjnych Next.js
```bash
mv tomb-raider-next/next.config.ts ./
mv tomb-raider-next/tsconfig.json ./
mv tomb-raider-next/eslint.config.mjs ./
mv tomb-raider-next/next-env.d.ts ./ 2>/dev/null || true
mv tomb-raider-next/package.json ./
mv tomb-raider-next/package-lock.json ./
mv tomb-raider-next/.gitignore ./
```

### 3.3 Przeniesienie .env.example
```bash
mv tomb-raider-next/.env.example ./
```

**Uwaga**: `.env.local` pozostaje NIEZMIENIONY w root directory

---

## Faza 4: Pliki SEO (10 min)

### 4.1 Nowy robots.txt
**Plik**: `public/robots.txt`

**Zawartość**:
```txt
User-agent: *
Disallow: /admin
Disallow: /api/
Disallow: /.vercel/
Disallow: /_next/static/

Allow: /
Allow: /gameplays
Allow: /highlights
Allow: /faq
Allow: /cookies
Allow: /privacy

Sitemap: https://bruxa-tomb-raider.vercel.app/sitemap.xml
Crawl-delay: 1
```

**Zmiany vs stara wersja**: Usunięte .html extensions, dodane /_next/

### 4.2 Nowy sitemap.xml
**Plik**: `public/sitemap.xml`

**Zawartość**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/gameplays</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/highlights</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/faq</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/privacy</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/cookies</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app/admin</loc>
    <lastmod>2025-12-11T00:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.1</priority>
  </url>
</urlset>
```

**Zmiany**: Wszystkie URLs bez .html extensions

### 4.3 Przeniesienie Google verification
```bash
cp archive/html-version/google52658329dff56699.html public/
```

### 4.4 Vercel.json
**USUNIĘTY** - Next.js używa domyślnej konfiguracji Vercel (nie trzeba tworzyć nowego)

---

## Faza 5: Zmienne Środowiskowe (5 min)

### 5.1 Porównanie .env files
**Analiza**: `.env.example` są IDENTYCZNE w obu wersjach (stara i nowa)

**Akcja**: `.env.example` już przeniesiony w Fazie 3.3

### 5.2 .env.local review
**WAŻNE**: NIE przenoś `.env.local` z tomb-raider-next!

**Instrukcja użytkownika**:
```bash
# Porównaj oba pliki
cat .env.local
cat tomb-raider-next/.env.local

# Sprawdź różnice
diff .env.local tomb-raider-next/.env.local || true
```

**Po weryfikacji** (ręcznie przez użytkownika):
```bash
# Usuń kopię z tomb-raider-next
rm tomb-raider-next/.env.local
```

### 5.3 Dokumentacja ENV
**Plik**: `ENV_COMPARISON.md`

**Zawartość**:
```markdown
# Porównanie Zmiennych Środowiskowych

## Status
✅ `.env.example` - IDENTYCZNE
⚠️ `.env.local` - WYMAGA RĘCZNEJ WERYFIKACJI

## Zmienne w .env.example
- `YOUTUBE_API_KEY` - YouTube Data v3 API
- `GOOGLE_SHEETS_ID` - Spreadsheet z ogłoszeniami
- `GOOGLE_SHEETS_CREDENTIALS` - Service account JSON
- `ADMIN_PASSWORD` - Hasło admin panel
- `JWT_SECRET` - Secret do JWT (min 32 znaki)

## TODO
- [ ] Zweryfikuj `.env.local` w root
- [ ] Sprawdź czy klucze API działają
- [ ] Usuń `tomb-raider-next/.env.local` po weryfikacji
- [ ] Przetestuj API routes: `/api/channel`, `/api/youtube`

## Testowanie
```bash
npm run dev
curl http://localhost:3000/api/channel
curl http://localhost:3000/api/youtube
```
```

---

## Faza 6: Czyszczenie i Weryfikacja (10 min)

### 6.1 Usuń pusty folder tomb-raider-next
```bash
# Sprawdź co zostało
ls -la tomb-raider-next/

# Usuń (jeśli puste lub tylko cache)
rm -rf tomb-raider-next/
```

### 6.2 Fresh npm install
```bash
rm -rf node_modules
npm install
```

**Oczekiwany rezultat**: Instalacja Next.js dependencies bez błędów

### 6.3 Testowanie dev server
```bash
npm run dev
```

**Testy**:
1. http://localhost:3000 → Strona główna
2. http://localhost:3000/gameplays → Gameplays page
3. http://localhost:3000/highlights → Highlights page
4. http://localhost:3000/faq → FAQ page
5. http://localhost:3000/admin → Admin panel
6. http://localhost:3000/api/channel → JSON z danymi kanału
7. http://localhost:3000/api/youtube → JSON z filmami

### 6.4 Testowanie plików statycznych
```bash
curl http://localhost:3000/manifest.json
curl http://localhost:3000/robots.txt
curl http://localhost:3000/google52658329dff56699.html
```

### 6.5 Production build
```bash
npm run build
npm start
```

**Oczekiwany rezultat**: Build sukces, wszystkie strony wygenerowane

---

## Faza 7: Dokumentacja i Git (10 min)

### 7.1 Aktualizacja README.md
**Plik**: `README.md`

**Kluczowe sekcje do dodania/zaktualizowania**:
- Tech stack: Next.js 16.0.7, React 19.2.0, TypeScript 5
- Installation: `npm install`, `npm run dev`
- Struktura projektu: `src/`, `public/`, `archive/`
- Scripts: `dev`, `build`, `start`, `lint`
- Environment variables: Lista wszystkich zmiennych z `.env.example`
- Deployment: Vercel auto-deploy
- Migration note: Link do `MIGRATION_NOTES.md`

### 7.2 Utworzenie MIGRATION_NOTES.md
**Plik**: `MIGRATION_NOTES.md`

**Zawartość**:
```markdown
# Migration Notes: HTML → Next.js

## Data: 2025-12-11

## Przegląd
Migracja z HTML/CSS/JS na Next.js 16 + React 19 + TypeScript 5

## Co się zmieniło

### URLs (Breaking Change)
**Przed**: /gameplays.html, /highlights.html
**Po**: /gameplays, /highlights

### Struktura
- HTML files → `src/app/*/page.tsx`
- CSS → `src/styles/*.css`
- JS → React components w `src/components/`
- API → `src/app/api/*/route.ts`

### Tech Stack
- Framework: Next.js 16.0.7
- Frontend: React 19.2.0 + TypeScript 5
- Routing: Next.js App Router
- API: Next.js Route Handlers

## Archiwum
Stara wersja: `archive/html-version/`

## Testowanie
- [ ] Homepage działa
- [ ] Wszystkie strony ładują się
- [ ] API routes działają
- [ ] Admin panel działa
- [ ] SEO files dostępne

## Rollback
Git revert lub restore z `archive/html-version/`
```

### 7.3 Git commit (Migration complete)
```bash
git add -A
git commit -m "feat: Complete migration from HTML/CSS/JS to Next.js/React/TypeScript

Major changes:
- Archived old HTML version to archive/html-version/
- Promoted tomb-raider-next/ to root directory
- Updated configuration (package.json, .gitignore, tsconfig)
- Created new SEO files (robots.txt, sitemap.xml) for Next.js
- Preserved .env.local
- Updated README.md and added MIGRATION_NOTES.md

Structure:
- src/app/ - Next.js App Router
- src/components/ - React components
- src/lib/ - TypeScript utilities
- public/ - Static assets
- archive/html-version/ - Old HTML version

Tech: Next.js 16.0.7, React 19.2.0, TypeScript 5

Verified:
✅ npm install successful
✅ npm run dev works
✅ npm run build successful
✅ All pages render
✅ API routes functional

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 7.4 Git tag
```bash
git tag -a v2.0.0-migration -m "Migration to Next.js complete"
```

---

## Weryfikacja Końcowa - Checklist

### Struktura
- [ ] `tomb-raider-next/` usunięty
- [ ] `src/` w root
- [ ] `public/` w root
- [ ] `archive/html-version/` utworzony z zawartością

### Konfiguracja
- [ ] `next.config.ts` w root
- [ ] `tsconfig.json` w root
- [ ] `package.json` (Next.js) w root
- [ ] `.gitignore` (Next.js) w root
- [ ] `vercel.json` USUNIĘTY

### SEO
- [ ] `public/robots.txt` utworzony (bez .html)
- [ ] `public/sitemap.xml` utworzony (bez .html)
- [ ] `public/google52658329dff56699.html` skopiowany

### Env
- [ ] `.env.local` NIEZMIENIONY w root
- [ ] `.env.example` w root
- [ ] `ENV_COMPARISON.md` utworzony

### Dokumentacja
- [ ] `README.md` zaktualizowany
- [ ] `MIGRATION_NOTES.md` utworzony
- [ ] `archive/html-version/README.md` utworzony

### Funkcjonalność
- [ ] `npm install` działa
- [ ] `npm run dev` działa
- [ ] `npm run build` działa
- [ ] Wszystkie strony ładują się
- [ ] API routes działają

### Git
- [ ] Pre-migration commit
- [ ] Migration complete commit
- [ ] Git tag v2.0.0-migration

---

## Krytyczne Pliki do Modyfikacji

1. **README.md** - Główna dokumentacja, pełna aktualizacja dla Next.js
2. **MIGRATION_NOTES.md** - Nowy plik z dokumentacją migracji
3. **ENV_COMPARISON.md** - Porównanie zmiennych środowiskowych
4. **public/robots.txt** - Nowy SEO file dla Next.js
5. **public/sitemap.xml** - Nowy sitemap bez .html extensions
6. **archive/html-version/README.md** - Dokumentacja archiwum

---

## Następne Kroki (Po Migracji Struktury)

### Natychmiastowe
1. Deploy na Vercel
2. Weryfikacja wszystkich funkcjonalności w production
3. Monitoring błędów

### Późniejsze
4. **Git Branch Strategy** (OSOBNY PLAN):
   - Utworzenie gałęzi `archive` ze starą wersją
   - Przeniesienie obecnej wersji React na `main`
   - Utworzenie gałęzi `dev` dla development

5. Performance optimization (Lighthouse audit)
6. Update Google Search Console (nowe URLs)

---

## Uwagi

- **Bezpieczeństwo**: Wszystkie operacje odwracalne (git checkpoint + archiwum)
- **Windows paths**: Używamy forward slashes w Bash (Git Bash normalizuje)
- **.env.local**: NIGDY nie commitować, pozostaje NIEZMIENIONY
- **vercel.json**: Nie jest potrzebny - Next.js auto-konfiguruje się na Vercel
- **Git branches**: Plan na gałęzie będzie OSOBNY po zakończeniu migracji struktury

---

## Rollback Plan

Jeśli coś pójdzie źle:

### Opcja 1: Git revert
```bash
git log --oneline
git revert <migration-commit-hash>
```

### Opcja 2: Restore z archive
```bash
rm -rf src/ public/ next.config.ts tsconfig.json
cp -r archive/html-version/* ./
npm install
```

### Opcja 3: Restore z .backup
```bash
cp -r .backup/pre-migration-*/* ./
```
