# YouTube API Setup Guide

## 1. Setup YouTube API Key

1. Wejdź na: https://console.cloud.google.com/apis/credentials
2. Stwórz nowy projekt (lub wybierz istniejący)
3. Włącz **YouTube Data API v3**:
   - APIs & Services → Library
   - Szukaj "YouTube Data API v3"
   - Kliknij "Enable"
4. Stwórz API Key:
   - APIs & Services → Credentials
   - Create Credentials → API Key
   - Skopiuj klucz

## 2. Local Development Setup

### Krok 1: Dodaj API Key do `.env.local`

```bash
# Otwórz .env.local i zamień placeholder na prawdziwy klucz:
YOUTUBE_API_KEY=twój_prawdziwy_klucz_tutaj
```

### Krok 2: Zainstaluj zależności

```bash
npm install
```

### Krok 3: Uruchom Development Server

```bash
npm run dev
```

To uruchomi Express server na `http://localhost:6969` (używa server.js)

### Krok 4: Testuj API

Otwórz w przeglądarce:

- http://localhost:6969/api/youtube?playlist=tr1
- http://localhost:6969/api/youtube?playlist=shorts

Powinieneś zobaczyć JSON z filmami.

### Krok 5: Testuj strony

- http://localhost:6969/gameplays.html
- http://localhost:6969/highlights.html

## 3. Vercel Deployment

### Krok 1: Zainstaluj Vercel CLI (opcjonalne)

```bash
npm i -g vercel
```

### Krok 2: Deploy

```bash
vercel
```

### Krok 3: Dodaj Environment Variable w Vercel Dashboard

1. Wejdź na https://vercel.com/dashboard
2. Wybierz projekt
3. Settings → Environment Variables
4. Dodaj:
   - Name: `YOUTUBE_API_KEY`
   - Value: twój klucz API
   - Environment: Production, Preview, Development

### Krok 4: Redeploy

```bash
vercel --prod
```

## 4. Troubleshooting

### Problem: "YouTube API key is not configured"

**Rozwiązanie:** Sprawdź czy `.env.local` zawiera klucz i czy Vercel Dev działa.

### Problem: "Failed to fetch videos"

**Rozwiązanie:**
- Sprawdź czy API key jest poprawny
- Sprawdź czy YouTube Data API v3 jest włączone
- Sprawdź limity quota (10,000 units/dzień)

### Problem: Quota exceeded

**Rozwiązanie:**
- Poczekaj do jutro (quota resetuje się o północy PST)
- Cache działa 24h, więc odświeżanie strony nie zużywa quota
- Możesz zwiększyć limit w Google Cloud Console

## 5. Struktura Projektu

```
claude-project/
├── api/
│   └── youtube.js          # Vercel serverless function
├── lib/
│   ├── cache.js            # 24h in-memory cache
│   └── youtube-api.js      # YouTube API helpers
├── config/
│   └── playlists.js        # Playlist mapping
├── assets/js/
│   ├── gameplays.js        # Frontend - Gameplays page
│   └── highlights.js       # Frontend - Highlights page
├── server.js               # Local Express dev server
├── .env.local              # Local environment variables (nie commitować!)
├── .env.example            # Template
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies
```

**Development Server:**
- `server.js` - Express server dla lokalnego developmentu
- Serwuje statyczne pliki (HTML/CSS/JS)
- Routuje `/api/*` do serverless functions
- Ładuje `.env.local` automatycznie

## 6. API Endpoints

### GET /api/youtube

**Query Parameters:**
- `playlist` lub `category`: Category key (tr1, tr1ub, tr2, tr2gold, tr3, tlolc, shorts)

**Response:**
```json
{
  "success": true,
  "category": "tr1",
  "playlistId": "PLjCja23HvzLRPTApUu1ANPrfbpSh9EFmW",
  "cached": false,
  "videos": [...],
  "count": 15
}
```

**Available categories:**
- `tr1` - TR1 Remastered
- `tr1ub` - TR1 Unfinished Business
- `tr2` - TR2 Remastered
- `tr2gold` - TR2 Gold
- `tr3` - TR3 Remastered
- `tlolc` - The Legend of Lara Croft
- `shorts` - Tomb Raider Shorts

## 7. Cache

- Cache działa 24h
- Cache jest in-memory (resetuje się przy restarcie serwera)
- Każda playlista ma osobny cache
- Cache oszczędza YouTube API quota

## 8. YouTube API Quota

**Koszty operacji:**
- Playlist items list: 1 unit
- Videos list: 1 unit
- **Total per category fetch: ~2 units**

**Dzienny limit:** 10,000 units = ~5,000 requestów

**Z cache (24h):** Możesz obsłużyć tysiące użytkowników dziennie!
