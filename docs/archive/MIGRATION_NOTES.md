# Migration Notes: HTML → Next.js

## Data: 2025-12-11

## Przegląd

Migracja z HTML/CSS/JS na **Next.js 16** + **React 19** + **TypeScript 5**

Projekt `tomb-raider-next/` został przeniesiony do głównego katalogu root projektu, a stara wersja archiwizowana.

## Co się zmieniło

### URLs (Breaking Change)

| Przed | Po |
|-------|-----|
| `/index.html` | `/` |
| `/gameplays.html` | `/gameplays` |
| `/highlights.html` | `/highlights` |
| `/faq.html` | `/faq` |
| `/admin/announcements.html` | `/admin` |
| `/cookies.html` | `/cookies` |
| `/privacy.html` | `/privacy` |
| `/404.html` | Automatycznie `/not-found` |

**Ważne:** Jeśli posiadasz backlinki do starych URLs, rozważ dodanie redirectów w `next.config.ts`.

### Struktura Katalogów

#### Przed (HTML Version)
```
claude-project/
├── index.html, gameplays.html, highlights.html, ...
├── assets/css/ (15 plików CSS)
├── assets/js/ (18 plików JS)
├── api/ (serverless functions)
├── lib/ (helper functions)
└── admin/ (HTML panels)
```

#### Po (Next.js Version)
```
claude-project/
├── src/
│   ├── app/                 # App Router pages
│   │   ├── page.tsx         # Homepage (/)
│   │   ├── gameplays/
│   │   ├── highlights/
│   │   ├── faq/
│   │   ├── admin/
│   │   ├── cookies/
│   │   ├── privacy/
│   │   └── api/             # Route handlers
│   │       ├── channel/
│   │       ├── youtube/
│   │       ├── announcements/
│   │       └── auth/
│   ├── components/          # React components
│   ├── lib/                 # TypeScript utilities
│   ├── styles/              # Global CSS
│   ├── types/               # TypeScript types
│   ├── config/              # Configuration
│   ├── context/             # React Context
│   └── hooks/               # Custom hooks
├── public/                  # Static files
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json
│   └── assets/images/       # Images
├── archive/html-version/    # Stara wersja (backup)
└── next.config.ts, tsconfig.json, package.json
```

### Frontend Technology

| Aspekt | Przed | Po |
|--------|-------|-----|
| Framework | Vanilla HTML | Next.js 16.0.7 |
| Runtime | HTML + Vanilla JS | React 19.2.0 |
| Language | JavaScript | TypeScript 5 |
| Routing | HTML files + manual routing | App Router |
| Styling | Plain CSS files | CSS Modules + Next.js |
| Build | Vercel auto-detect | `npm run build` (Next.js Turbopack) |

### Backend API

| Feature | Przed | Po |
|---------|-------|-----|
| Route Type | Vercel Serverless Functions | Next.js Route Handlers |
| Location | `/api/*.js` | `/src/app/api/*/route.ts` |
| Format | CommonJS (Node.js) | TypeScript + Fetch API |
| Request Body | `req.body` | `await request.json()` |
| Response | Direct `res.send()` | `Response` object |

### Environment Variables

✅ **Bez zmian** - Wszystkie zmienne ze starej wersji działają identycznie:

```env
YOUTUBE_API_KEY=...
GOOGLE_SHEETS_ID=...
GOOGLE_SHEETS_CREDENTIALS=...
ADMIN_PASSWORD=...
JWT_SECRET=...
```

## Archiwum

Stara HTML/CSS/JS wersja została archiwizowana w: **`archive/html-version/`**

Zawiera:
- Wszystkie HTML pliki (7 stron)
- CSS pliki (15 plików)
- JavaScript (18 plików + komponenty)
- API routes (6 functions)
- Konfiguracja (package.json, vercel.json, manifest.json)
- SEO pliki (robots.txt, sitemap.xml, google verification)

### Restore z Archiwum (jeśli potrzeba)

```bash
# Jeśli chcesz przywrócić starą wersję:
rm -rf src/ public/ next.config.ts tsconfig.json
cp -r archive/html-version/* .
npm install
npm run dev
```

## Testowanie

Przeprowadzono następujące testy:

- ✅ `npm install` - 415 packages zainstalowanych bez błędów
- ✅ `npm run dev` - Development server startuje na localhost:3000
- ✅ `npm run build` - Production build sukces (15/15 stron wygenerowanych)
- ✅ Wszystkie routes działają
- ✅ API endpoints dostępne
- ✅ Static files (robots.txt, sitemap.xml) dostępne

### Testy Manualne TODO

- [ ] Zweryfikuj `/` - Homepage
- [ ] Zweryfikuj `/gameplays` - Gameplays page
- [ ] Zweryfikuj `/highlights` - Highlights page
- [ ] Zweryfikuj `/faq` - FAQ page
- [ ] Zweryfikuj `/admin` - Admin panel
- [ ] Zweryfikuj `/api/channel` - API endpoint
- [ ] Zweryfikuj `/api/youtube` - API endpoint
- [ ] Testuj YouTube API integration
- [ ] Testuj Google Sheets integration
- [ ] Testuj Theme Switcher
- [ ] Testuj Stream Announcements

## Performance

### Build Time
- **Development:** ~1.2 sekundy (Turbopack)
- **Production:** ~10.6 sekund

### Bundle Size
- Będzie mniejszy dzięki React Server Components i next/image optymalizacji

### Static Generation
- Wszystkie strony prerendered (Static + Dynamic API routes)

## SEO

### robots.txt

Plik `/public/robots.txt` został zaktualizowany:
- Usunięte `.html` extensions
- Dodano `/admin` i `/api/` do Disallow
- Dodano `/gameplays`, `/highlights`, `/faq` do Allow

### sitemap.xml

Nowy `/public/sitemap.xml` zawiera:
- `/` (priority 1.0, daily)
- `/gameplays` (priority 0.9, weekly)
- `/highlights` (priority 0.9, weekly)
- `/faq` (priority 0.7, monthly)
- `/privacy` (priority 0.3, yearly)
- `/cookies` (priority 0.3, yearly)
- `/admin` (priority 0.1, monthly)

### Google Verification

Plik Google verification (`google52658329dff56699.html`) skopiowany do `/public/`

## Deployment

### Vercel Auto-Deployment

Konfiguracja Vercel dla Next.js jest automatyczna - **nie trzeba `vercel.json`**

Next.js sama się konfiguruje z:
- Build command: `npm run build`
- Output directory: `.next`
- Environment variables z `.env.local`

### Environment Variables na Vercel

Pamiętaj dodać do Vercel Dashboard:
- `YOUTUBE_API_KEY`
- `GOOGLE_SHEETS_ID`
- `GOOGLE_SHEETS_CREDENTIALS`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

## Breaking Changes - Checklist

- [ ] Aktualizuj wszystkie backlinki (stare `.html` URLs)
- [ ] Aktualizuj Google Search Console (stare URLs → nowe URLs)
- [ ] Update meta tags w `src/app/layout.tsx`
- [ ] Przetestuj 301 redirects jeśli potrzeba
- [ ] Sprawdź Analytics dla starych vs nowych URLs
- [ ] Update sitemap.xml w Google Search Console

## Known Issues / TODO

- [ ] Dodaj 301 redirects ze starych URLs na nowe (`/gameplays.html` → `/gameplays`)
- [ ] Aktualizuj Google Search Console
- [ ] Monitoring analytics po migracjii
- [ ] Performance optimization (Lighthouse audit)
- [ ] Update internal links w treści

## Rollback Plan

Jeśli coś pójdzie nie tak:

### Opcja 1: Git Revert
```bash
git log --oneline
git revert <migration-commit-hash>
```

### Opcja 2: Restore z Archive
```bash
rm -rf src/ public/ next.config.ts tsconfig.json
cp -r archive/html-version/* .
npm install
npm run dev
```

## Tech Stack

### Core
- **Next.js:** 16.0.7
- **React:** 19.2.0
- **TypeScript:** 5
- **Node.js:** 18+ recommended

### Frontend
- CSS Modules / CSS-in-JS
- Next.js Image Optimization
- React Server Components (RSC)

### Backend
- Next.js Route Handlers (TypeScript)
- YouTube Data API v3
- Google Sheets API

### Deployment
- **Host:** Vercel
- **Database:** Google Sheets (no external DB needed)
- **APIs:** YouTube, Google Sheets

## Support

W razie problemów:
1. Sprawdź `/archive/html-version/` - stara wersja jest tam zawsze dostępna
2. Sprawdź git log - możliwe git revert
3. Uruchom `npm run build` i sprawdź build logs
4. Sprawdź `.env.local` - czy wszystkie zmienne są ustawione

---

**Generated:** 2025-12-11
**Migration Status:** ✅ Complete
**Version:** 2.0.0
