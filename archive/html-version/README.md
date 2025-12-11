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
