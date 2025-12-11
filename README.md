# 🏺 Bruxa Gaming - Tomb Raider Gameplay Website

> Neo-gaming themed website for Bruxa's YouTube gameplay channel featuring Tomb Raider series

Strona gamingowa poświęcona kanałowi YouTube **xBruksiax** z gameplay'ami z serii Tomb Raider. Projekt łączy retro gaming aesthetic z nowoczesnymi efektami neonowymi i cyber motywami, oferując kompleksową platformę do zarządzania treścią i interakcji z widzami.

## ✨ Features

### 🎮 Główne Funkcjonalności
- **Dynamiczna Integracja YouTube** - Automatyczne pobieranie i wyświetlanie filmów z YouTube API v3
- **Hero Section** z parallax scrolling i featured video
- **Gameplay Pages** - Kategoryzowane gameplay'e (TR1, TR2, TR3, etc.) z paginacją
- **Highlights** - Vertical shorts/clips w układzie siatki
- **Stream Announcements** - System zapowiedzi streamów z countdown timer
- **Video Modal Player** - Odtwarzanie filmów bez opuszczania strony
- **Theme Switcher** - Przełączanie między motywami Tomb Raider i Matrix
- **Calendar Integration** - Eksport streamów do Google Calendar
- **Browser Notifications** - Przypomnienia o nadchodzących streamach

### 🛠️ Panel Administracyjny
- **Admin Panel** (`/admin/announcements.html`) - Zarządzanie zapowiedziami streamów
- **Google Sheets Backend** - Prosty system zarządzania treścią bez bazy danych
- **Authentication** - Zabezpieczone hasłem logowanie do panelu admina
- **CRUD Operations** - Dodawanie, edycja, usuwanie i zmiana statusu streamów
- **Real-time Updates** - Natychmiastowa synchronizacja z główną stroną

### 🎨 Design
- **Neo-gaming aesthetic** - połączenie retro pixel art z neonowymi efektami
- **Paleta kolorów:** Cyber Pink (#FF1493), Neon Cyan (#00FFFF), Electric Purple (#9D00FF), Gold Accent (#FFD700)
- **Typografia:** Press Start 2P (headers), VT323 (subheaders), Roboto (body), Orbitron (akcenty)
- **Animacje:** Parallax, hover effects, neon glow, glitch effects, smooth transitions
- **Motywy:** Tomb Raider (domyślny) i Matrix (zielony)

### 📱 Responsywność
- **Mobile-first approach**
- Hamburger menu dla urządzeń mobilnych
- Pełna responsywność dla tablet i desktop
- Touch-optimized interactions
- Adaptive video layouts

### ♿ Accessibility
- WCAG AA compliance
- Skip to content link
- Keyboard navigation
- Screen reader friendly
- Prefers-reduced-motion support
- High contrast themes

## 🗂️ Struktura Projektu

```
claude-project/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Strona główna (/)
│   │   ├── gameplays/
│   │   │   └── page.tsx       # Strona z gameplay'ami (/gameplays)
│   │   ├── highlights/
│   │   │   └── page.tsx       # Strona z shorts (/highlights)
│   │   ├── faq/
│   │   │   └── page.tsx       # FAQ page (/faq)
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin panel (/admin)
│   │   ├── cookies/
│   │   │   └── page.tsx       # Cookies page (/cookies)
│   │   ├── privacy/
│   │   │   └── page.tsx       # Privacy page (/privacy)
│   │   ├── api/               # Next.js Route Handlers
│   │   │   ├── channel/
│   │   │   │   └── route.ts   # GET /api/channel - Channel stats
│   │   │   ├── youtube/
│   │   │   │   └── route.ts   # GET /api/youtube - Videos list
│   │   │   ├── announcements/
│   │   │   │   └── route.ts   # CRUD /api/announcements
│   │   │   └── auth/login/
│   │   │       └── route.ts   # POST /api/auth/login - Authentication
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React Components
│   │   ├── Navbar.tsx         # Navigation component
│   │   ├── Footer.tsx         # Footer component
│   │   ├── VideoCard.tsx      # Video card component
│   │   ├── ThemeSwitcher.tsx  # Theme toggle
│   │   └── ...                # Other components
│   │
│   ├── lib/                   # TypeScript Utilities
│   │   ├── youtube-api.ts     # YouTube API helpers
│   │   ├── google-sheets.ts   # Google Sheets integration
│   │   ├── auth.ts            # Authentication utilities
│   │   └── cache.ts           # Caching utilities
│   │
│   ├── styles/                # CSS Files
│   │   ├── variables.css      # CSS Variables (kolory, fonty)
│   │   ├── animations.css     # Animations & effects
│   │   └── ...                # Component styles
│   │
│   ├── types/                 # TypeScript Types
│   │   ├── youtube.ts         # YouTube API types
│   │   ├── announcement.ts    # Announcement types
│   │   └── ...                # Other types
│   │
│   ├── config/                # Configuration
│   │   └── playlists.ts       # YouTube playlist mapping
│   │
│   ├── context/               # React Context
│   │   ├── ThemeContext.tsx   # Theme provider
│   │   └── ...                # Other contexts
│   │
│   └── hooks/                 # Custom Hooks
│       ├── useTheme.ts        # Theme hook
│       └── ...                # Other hooks
│
├── public/                    # Static Files (images, fonts, etc.)
│   ├── robots.txt             # SEO - robots directives
│   ├── sitemap.xml            # SEO - sitemap
│   ├── manifest.json          # PWA manifest
│   ├── google52658329dff56699.html  # Google verification
│   └── assets/                # Images, icons, fonts
│
├── archive/html-version/      # Stara wersja HTML (backup)
│   ├── index.html, *.html files
│   ├── assets/, api/, lib/
│   ├── admin/, config/, scripts/
│   └── README.md              # Archiwum documentation
│
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.mjs          # ESLint configuration
├── package.json               # Dependencies & scripts
├── .gitignore                 # Git ignore rules
├── .env.example               # Environment variables template
├── .env.local                 # Environment variables (local, NOT in git)
├── README.md                  # Dokumentacja główna
├── MIGRATION_NOTES.md         # Migration details (HTML → Next.js)
├── ENV_COMPARISON.md          # Environment variables documentation
└── docs/                      # Documentation (optional)
```

**Zmiany z wersji HTML:**
- ✅ `src/` - Nowa struktura Next.js
- ✅ `public/` - Static files (zamiennie assets/)
- ✅ Route Handlers zamiast `/api/` functions
- ✅ React Components zamiast vanilla JS
- ✅ TypeScript zamiast plain JavaScript
- ✅ App Router zamiast HTML pages
- ✅ `archive/html-version/` - Stara wersja preserved
- ✅ Brak `vercel.json` - Next.js auto-configures

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ i npm
- YouTube Data API v3 key
- Google Sheets API credentials (dla admin panel)
- Vercel account (dla deployment)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd claude-project

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edytuj .env.local i dodaj API keys

# Start development server
npm run dev
```

### Environment Variables

Stwórz plik `.env.local` z następującymi zmiennymi:

```env
# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key_here

# Google Sheets (dla admin panel)
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}

# Admin Panel
ADMIN_PASSWORD=your_secure_password_here

# JWT Secret
JWT_SECRET=your_jwt_secret_min_32_characters
```

**Szczegółowe informacje:** Zobacz `ENV_COMPARISON.md`

### Development

```bash
# Start local development server (port 3000)
npm run dev

# Dostęp do strony
open http://localhost:3000

# Dostęp do panelu admina
open http://localhost:3000/admin

# Production build & start
npm run build
npm start
```

### Available Routes

| Route | Description |
|-------|-------------|
| `/` | Strona główna |
| `/gameplays` | Gameplay videos |
| `/highlights` | Short clips |
| `/faq` | FAQ page |
| `/admin` | Admin panel |
| `/cookies` | Cookies policy |
| `/privacy` | Privacy policy |
| `/api/channel` | YouTube channel stats |
| `/api/youtube` | YouTube videos list |
| `/api/announcements` | Stream announcements CRUD |

## 📦 Deployment

### Vercel Deployment

1. **Fork/Clone repository**
2. **Import do Vercel**
   ```bash
   vercel
   ```
3. **Dodaj Environment Variables** w Vercel Dashboard:
   - `YOUTUBE_API_KEY`
   - `YOUTUBE_CHANNEL_ID`
   - `GOOGLE_SHEETS_ID`
   - `GOOGLE_SHEETS_CREDENTIALS`
   - `ADMIN_PASSWORD`

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Auto-deployment
- Push do `main` branch automatycznie deployuje na Vercel
- Preview deployments dla pull requests

## 🛠️ Tech Stack

### Core Framework
- **Next.js:** 16.0.7 (React 19.2.0 + TypeScript 5)
- **Turbopack:** Ultra-fast bundler
- **App Router:** Modern routing with React Server Components

### Frontend
- **React 19** - UI components
- **TypeScript 5** - Type safety
- **CSS Modules / CSS-in-JS** - Styling
- **Next.js Image** - Image optimization
- **Responsive Design** (Mobile-first approach)
- **YouTube IFrame API** (Video playback)
- **Notifications API** (Browser notifications)

### Backend
- **Next.js Route Handlers** (TypeScript)
- **YouTube Data API v3** (Video content)
- **Google Sheets API** (Database replacement)
- **JWT Authentication** (Token-based security)

### Libraries & Tools
- `googleapis` - Google Sheets integration
- `dotenv` - Environment variables
- `TypeScript` - Type safety throughout

### Infrastructure
- **Vercel** - Hosting & Auto-deployment
- **Google Cloud Platform** - API credentials
- **Google Sheets** - Serverless database

## 📚 Documentation

Szczegółowa dokumentacja dostępna w katalogu `/docs`:

- **[Admin Guide](docs/ADMIN_GUIDE.md)** - Jak zarządzać zapowiedziami streamów
- **[Announcements System](docs/ANNOUNCEMENTS_SYSTEM.md)** - Dokumentacja techniczna systemu zapowiedzi
- **[Google Sheets Setup](docs/GOOGLE_SHEETS_SETUP.md)** - Konfiguracja backend'u Google Sheets
- **[API Setup](docs/guides/API_SETUP.md)** - Konfiguracja YouTube API

## 🎯 API Endpoints

### YouTube Videos (`/api/youtube`)
```bash
GET /api/youtube?playlistId=PLxxx&maxResults=20&pageToken=xxx
```
Zwraca filmy z playlisty YouTube z paginacją.

**Response:** JSON array z video metadata (title, thumbnail, duration, etc.)

### Channel Stats (`/api/channel`)
```bash
GET /api/channel
```
Zwraca statystyki kanału (subskrybenci, liczba filmów, description).

**Response:** JSON object z channel data

### Announcements CRUD (`/api/announcements`)
```bash
GET /api/announcements?upcoming=true  # Lista zapowiedzi streamów
POST /api/announcements               # Dodaj zapowiedź (auth required)
PUT /api/announcements/[id]          # Edytuj zapowiedź (auth required)
DELETE /api/announcements/[id]       # Usuń zapowiedź (auth required)
```

**Auth:** Wymaga JWT token z `ADMIN_PASSWORD` (otrzymany przez `/api/auth/login`)

### Authentication (`/api/auth/login`)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "password": "your_admin_password"
}
```

**Response:** JSON object z JWT token do autoryzacji dla admin endpoints

## 🔧 Configuration

### YouTube Playlists
Edytuj `src/config/playlists.ts` aby dodać/zmienić playlisty:

```typescript
export const PLAYLISTS = {
  tr1: 'PLxxxxxxxxxxxxxxxxx', // Tomb Raider 1
  tr2: 'PLxxxxxxxxxxxxxxxxx', // Tomb Raider 2
  // ...
} as const;
```

### Admin Panel
Panel administracyjny dostępny pod `/admin`
- **Login:** Nie wymaga username, tylko password
- **Password:** ustawione w `ADMIN_PASSWORD` env variable
- **Auth:** JWT token z `/api/auth/login`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎮 Credits

- **Design & Development:** Created with Claude Code
- **Content:** xBruksiax YouTube Channel
- **Tomb Raider IP:** Crystal Dynamics / Square Enix
- **Fonts:** Google Fonts (Press Start 2P, VT323, Roboto, Orbitron)

---

**Status:** ✅ **Version 2.0 - Next.js Migration Complete**

**Current Version:** 2.0.0

**Migration Date:** 2025-12-11

**Notable Changes:**
- ✅ Migrated from HTML/CSS/JS to Next.js 16 + React 19 + TypeScript 5
- ✅ Upgraded from Vercel Serverless Functions to Next.js Route Handlers
- ✅ Improved performance with Turbopack bundler
- ✅ Full URL structure update (no more .html extensions)
- ✅ Old version archived in `archive/html-version/`

**Core Features:**
- ✅ Full YouTube API integration with pagination
- ✅ Google Sheets backend for stream announcements
- ✅ Admin panel with JWT authentication
- ✅ Calendar integration (Google Calendar)
- ✅ Browser notifications for stream reminders
- ✅ Theme switcher (Tomb Raider / Matrix)
- ✅ Video modal player
- ✅ Fully responsive design with TypeScript
- ✅ Deployed on Vercel with auto-deployment

**Documentation:**
- 📖 `README.md` - Main documentation
- 📖 `MIGRATION_NOTES.md` - Migration details
- 📖 `ENV_COMPARISON.md` - Environment variables guide

**Live Site:** [bruxa-tomb-raider.vercel.app]

**Admin Panel:** [bruxa-tomb-raider.vercel.app]/admin

---

Made with 💜 by Claude Code for xBruksiax Gaming Community
