# Plan Migracji do Next.js

## Podsumowanie Projektu

**Obecny stan:**

- Statyczna strona HTML/CSS/JavaScript
- Backend: Vercel Serverless Functions (Node.js)
- API: YouTube Data API v3, Google Sheets API v4
- Hosting: Vercel
- Brak frameworka frontendowego

**Cel:** Pełna migracja do Next.js 14+ (App Router)

---

## KROK 1: Przygotowanie Środowiska

### 1.1 Inicjalizacja projektu Next.js

```bash
npx create-next-app@latest tomb-raider-next --typescript --tailwind --eslint --app --src-dir
```

**Konfiguracja:**

- TypeScript (opcjonalnie, ale zalecane)
- App Router (nowsza architektura)
- ESLint dla jakości kodu
- Struktura w `src/` dla lepszej organizacji

### 1.2 Struktura katalogów

```
tomb-raider-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (navbar, footer)
│   │   ├── page.tsx             # Strona główna
│   │   ├── gameplays/
│   │   │   └── page.tsx         # Katalog gier
│   │   ├── highlights/
│   │   │   └── page.tsx         # Skróty/Shorts
│   │   ├── faq/
│   │   │   └── page.tsx         # FAQ
│   │   ├── admin/
│   │   │   └── announcements/
│   │   │       └── page.tsx     # Panel admina
│   │   ├── cookies/
│   │   │   └── page.tsx         # Polityka cookies
│   │   ├── privacy/
│   │   │   └── page.tsx         # Polityka prywatności
│   │   ├── not-found.tsx        # Strona 404
│   │   ├── globals.css          # Globalne style
│   │   └── api/
│   │       ├── youtube/
│   │       │   └── route.ts     # GET /api/youtube
│   │       ├── channel/
│   │       │   └── route.ts     # GET /api/channel
│   │       ├── announcements/
│   │       │   └── route.ts     # CRUD /api/announcements
│   │       ├── faq/
│   │       │   └── route.ts     # CRUD /api/faq
│   │       └── auth/
│   │           └── login/
│   │               └── route.ts # POST /api/auth/login
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── ui/
│   │   │   ├── VideoCard.tsx
│   │   │   ├── VideoModal.tsx
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   ├── CookieBanner.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── Announcements.tsx
│   │   │   └── FeaturedContent.tsx
│   │   ├── gameplays/
│   │   │   ├── GameAccordion.tsx
│   │   │   └── VideoList.tsx
│   │   └── highlights/
│   │       └── ShortsGrid.tsx
│   │
│   ├── lib/
│   │   ├── youtube-api.ts       # YouTube API helper
│   │   ├── google-sheets.ts     # Google Sheets helper
│   │   ├── cache.ts             # System cachowania
│   │   └── auth.ts              # JWT utilities
│   │
│   ├── config/
│   │   └── playlists.ts         # Konfiguracja playlist
│   │
│   ├── hooks/
│   │   ├── useTheme.ts          # Hook dla motywów
│   │   ├── useVideos.ts         # Hook dla danych video
│   │   └── useAuth.ts           # Hook dla autentykacji
│   │
│   ├── context/
│   │   ├── ThemeContext.tsx     # Kontekst motywów
│   │   └── AuthContext.tsx      # Kontekst autentykacji
│   │
│   ├── types/
│   │   ├── video.ts             # Typy dla video
│   │   ├── announcement.ts      # Typy dla ogłoszeń
│   │   └── api.ts               # Typy dla API
│   │
│   └── styles/
│       ├── variables.css        # Design tokens
│       ├── animations.css       # Animacje
│       └── components/          # Style komponentów
│
├── public/
│   ├── images/                  # Obrazy statyczne
│   ├── icons/                   # Ikony
│   └── manifest.json            # PWA manifest
│
├── .env.local                   # Zmienne środowiskowe
├── next.config.js               # Konfiguracja Next.js
├── tailwind.config.js           # Konfiguracja Tailwind (opcjonalnie)
└── package.json
```

### 1.3 Przeniesienie zmiennych środowiskowych

Skopiować `.env.local` z obecnego projektu:

```env
YOUTUBE_API_KEY=xxx
GOOGLE_SHEETS_ID=xxx
GOOGLE_SHEETS_CREDENTIALS=xxx
ADMIN_PASSWORD=xxx
JWT_SECRET=xxx
```

---

## KROK 2: Migracja Stylów CSS

### 2.1 Strategia stylowania

**Opcja A: Zachowanie obecnego CSS (zalecane na początek)**

- Skopiować `assets/css/` do `src/styles/`
- Importować w `globals.css`
- Stopniowa refaktoryzacja do CSS Modules

**Opcja B: Migracja do Tailwind CSS**

- Zamiana klas CSS na utility classes Tailwind
- Większy nakład pracy, ale lepsze DX

### 2.2 Przeniesienie plików CSS

```
assets/css/variables.css    → src/styles/variables.css
assets/css/reset.css        → src/styles/reset.css
assets/css/main.css         → src/styles/main.css
assets/css/hero.css         → src/styles/hero.css
assets/css/cards.css        → src/styles/cards.css
assets/css/footer.css       → src/styles/footer.css
assets/css/animations.css   → src/styles/animations.css
assets/css/gameplays.css    → src/styles/gameplays.css
assets/css/highlights.css   → src/styles/highlights.css
assets/css/modal.css        → src/styles/modal.css
assets/css/admin.css        → src/styles/admin.css
assets/css/faq.css          → src/styles/faq.css
assets/css/cookie-banner.css → src/styles/cookie-banner.css
assets/css/search.css       → src/styles/search.css
assets/css/theme-switcher.css → src/styles/theme-switcher.css
```

### 2.3 Konfiguracja globals.css

```css
/* src/app/globals.css */
@import "../styles/variables.css";
@import "../styles/reset.css";
@import "../styles/main.css";
@import "../styles/animations.css";
/* ... pozostałe importy */
```

---

## KROK 3: Migracja Komponentów Layoutu

### 3.1 Root Layout

```tsx
// src/app/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

export const metadata = {
  title: "Tomb Raider Archive",
  description: "Archiwum gameplay i highlights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 3.2 Konwersja Navbar

Przekonwertować `assets/js/components/navbar.js` na komponent React:

```tsx
// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        {/* Logo */}
      </Link>

      <div className="nav-links">
        <Link href="/gameplays">Gameplays</Link>
        <Link href="/highlights">Highlights</Link>
        <Link href="/faq">FAQ</Link>
      </div>

      <ThemeSwitcher />

      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {/* Hamburger icon */}
      </button>

      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </nav>
  );
}
```

### 3.3 Konwersja Footer

Analogicznie przekonwertować `assets/js/components/footer.js`.

---

## KROK 4: Migracja Stron HTML do React

### 4.1 Strona główna (index.html → page.tsx)

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";
import { Announcements } from "@/components/home/Announcements";
import { FeaturedContent } from "@/components/home/FeaturedContent";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Announcements />
      <FeaturedContent />
    </>
  );
}
```

### 4.2 Strona Gameplays

```tsx
// src/app/gameplays/page.tsx
"use client";

import { useState } from "react";
import { GameAccordion } from "@/components/gameplays/GameAccordion";
import { useVideos } from "@/hooks/useVideos";

export default function GameplaysPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="gameplays-container">
      <h1>Archiwum Gameplays</h1>
      <GameAccordion activeGame={activeGame} onGameSelect={setActiveGame} />
    </div>
  );
}
```

### 4.3 Strona Highlights

```tsx
// src/app/highlights/page.tsx
import { ShortsGrid } from "@/components/highlights/ShortsGrid";

export default function HighlightsPage() {
  return (
    <div className="highlights-container">
      <h1>Highlights & Shorts</h1>
      <ShortsGrid />
    </div>
  );
}
```

### 4.4 Pozostałe strony

- `faq.html` → `src/app/faq/page.tsx`
- `cookies.html` → `src/app/cookies/page.tsx`
- `privacy.html` → `src/app/privacy/page.tsx`
- `404.html` → `src/app/not-found.tsx`
- `admin/announcements.html` → `src/app/admin/page.tsx`

---

## KROK 5: Migracja API Routes

### 5.1 YouTube API Route

```tsx
// src/app/api/youtube/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchPlaylistVideos } from "@/lib/youtube-api";
import { cache } from "@/lib/cache";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const playlist = searchParams.get("playlist");

  if (!playlist) {
    return NextResponse.json(
      { error: "Playlist parameter is required" },
      { status: 400 }
    );
  }

  const cacheKey = `youtube_${playlist}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    const videos = await fetchPlaylistVideos(playlist);
    cache.set(cacheKey, videos);
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
```

### 5.2 Announcements API Route

```tsx
// src/app/api/announcements/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/lib/google-sheets";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const announcements = await getAnnouncements();
  return NextResponse.json(announcements);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!verifyToken(authHeader)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const result = await createAnnouncement(data);
  return NextResponse.json(result);
}

// PUT i DELETE analogicznie...
```

### 5.3 Auth API Route

```tsx
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return NextResponse.json({ token });
}
```

---

## KROK 6: Migracja Logiki JavaScript

### 6.1 Custom Hooks

**useVideos Hook:**

```tsx
// src/hooks/useVideos.ts
"use client";

import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
}

export function useVideos(playlistKey: string) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const response = await fetch(`/api/youtube?playlist=${playlistKey}`);
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [playlistKey]);

  return { videos, loading, error };
}
```

**useTheme Hook:**

```tsx
// src/hooks/useTheme.ts
"use client";

import { useState, useEffect } from "react";

type Theme = "original" | "pink-gamer" | "matrix" | "blue-cyber";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("original");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return { theme, changeTheme };
}
```

### 6.2 Context Providers

**ThemeContext:**

```tsx
// src/context/ThemeContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

type Theme = "original" | "pink-gamer" | "matrix" | "blue-cyber";

interface ThemeContextType {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
```

---

## KROK 7: Optymalizacje Next.js

### 7.1 Image Optimization

```tsx
// Zamiast <img src="...">
import Image from "next/image";

<Image
  src="/images/thumbnail.jpg"
  alt="Video thumbnail"
  width={320}
  height={180}
  priority={false}
  placeholder="blur"
/>;
```

### 7.2 Server Components vs Client Components

**Server Components (domyślne):**

- Strony statyczne (FAQ, Cookies, Privacy)
- Fetchowanie danych po stronie serwera
- SEO-friendly

**Client Components ('use client'):**

- Interaktywne elementy (ThemeSwitcher, VideoModal)
- Komponenty z useState, useEffect
- Event handlery (onClick, onChange)

### 7.3 Metadata dla SEO

```tsx
// src/app/gameplays/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gameplays | Tomb Raider Archive",
  description: "Pełne przejścia gier z serii Tomb Raider",
  openGraph: {
    title: "Gameplays | Tomb Raider Archive",
    description: "Pełne przejścia gier z serii Tomb Raider",
    images: ["/images/og-gameplays.jpg"],
  },
};
```

### 7.4 Loading States

```tsx
// src/app/gameplays/loading.tsx
export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p>Ładowanie gameplays...</p>
    </div>
  );
}
```

### 7.5 Error Handling

```tsx
// src/app/gameplays/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Coś poszło nie tak!</h2>
      <button onClick={() => reset()}>Spróbuj ponownie</button>
    </div>
  );
}
```

---

## KROK 8: Konfiguracja i Deploy

### 8.1 next.config.js

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ytimg.com", "img.youtube.com"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 8.2 Vercel Deployment

1. Połączyć repozytorium z Vercel
2. Ustawić zmienne środowiskowe w Vercel Dashboard
3. Framework Preset: Next.js (automatyczna detekcja)
4. Build Command: `next build`
5. Output Directory: `.next`

### 8.3 Testowanie

```bash
# Lokalne testowanie
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server lokalnie
npm run lint     # ESLint
```

---

## Harmonogram Migracji

| Faza | Zakres                                          | Priorytet |
| ---- | ----------------------------------------------- | --------- |
| 1    | Setup projektu, struktura, zmienne środowiskowe | Wysoki    |
| 2    | Migracja stylów CSS                             | Wysoki    |
| 3    | Layout (Navbar, Footer) + ThemeProvider         | Wysoki    |
| 4    | Strona główna + Hero + Announcements            | Wysoki    |
| 5    | API Routes (YouTube, Announcements)             | Wysoki    |
| 6    | Strona Gameplays + komponenty                   | Średni    |
| 7    | Strona Highlights                               | Średni    |
| 8    | FAQ, Cookies, Privacy, 404                      | Niski     |
| 9    | Panel Admin                                     | Niski     |
| 10   | Optymalizacje (Image, SEO, Performance)         | Średni    |
| 11   | Testy i QA                                      | Średni    |
| 12   | Deploy produkcyjny                              | Wysoki    |

---

## Checklist Migracji

### Przygotowanie

- [ ] Backup obecnego projektu
- [ ] Utworzenie nowego repozytorium (opcjonalnie)
- [ ] Inicjalizacja Next.js projektu
- [ ] Konfiguracja TypeScript (opcjonalnie)
- [ ] Przeniesienie zmiennych środowiskowych

### Styles

- [ ] Przeniesienie CSS do src/styles
- [ ] Konfiguracja globals.css
- [ ] Test motywów (4 warianty)
- [ ] Responsywność (mobile, tablet, desktop)

### Komponenty

- [ ] Navbar
- [ ] Footer
- [ ] MobileMenu
- [ ] ThemeSwitcher
- [ ] VideoCard
- [ ] VideoModal
- [ ] CookieBanner
- [ ] LoadingSpinner

### Strony

- [ ] Homepage
- [ ] Gameplays
- [ ] Highlights
- [ ] FAQ
- [ ] Cookies
- [ ] Privacy
- [ ] 404
- [ ] Admin Panel

### API

- [ ] /api/youtube
- [ ] /api/channel
- [ ] /api/announcements
- [ ] /api/faq
- [ ] /api/auth/login

### Funkcjonalności

- [ ] Fetchowanie video z YouTube
- [ ] System ogłoszeń (CRUD)
- [ ] FAQ (CRUD)
- [ ] Autentykacja admina (JWT)
- [ ] Cachowanie danych
- [ ] Parallax efekty
- [ ] Cookie consent
- [ ] Przełączanie motywów

### Optymalizacje

- [ ] Next/Image dla obrazów
- [ ] Metadata SEO
- [ ] Loading states
- [ ] Error boundaries
- [ ] Code splitting

### Deploy

- [ ] Test lokalny (npm run build)
- [ ] Deploy na Vercel staging
- [ ] Test wszystkich funkcjonalności
- [ ] Deploy produkcyjny
- [ ] Monitoring i logi

---

## Uwagi Końcowe

1. **Zachowanie kompatybilności URL** - Next.js z App Router automatycznie obsługuje clean URLs
2. **Google Sheets** - Można rozważyć migrację do prawdziwej bazy danych (np. Supabase, PlanetScale)
3. **Tailwind CSS** - Opcjonalna migracja dla lepszego DX
4. **TypeScript** - Silnie zalecane dla lepszej jakości kodu
5. **Testy** - Dodać Jest + React Testing Library dla unit testów
