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
├── index.html                 # Strona główna
├── gameplays.html             # Strona z gameplay'ami
├── highlights.html            # Strona z shorts/highlights
├── README.md                  # Dokumentacja główna
├── .gitignore                 # Git ignore rules
├── .env.local                 # Environment variables (local)
├── package.json               # Dependencies & scripts
├── vercel.json                # Vercel deployment config
│
├── admin/                     # Panel administracyjny
│   └── announcements.html     # Zarządzanie zapowiedziami streamów
│
├── api/                       # Vercel serverless functions
│   ├── youtube.js             # YouTube API endpoint (z paginacją)
│   ├── announcements.js       # CRUD dla zapowiedzi streamów
│   └── channel.js             # Statystyki kanału (subskrybenci, etc.)
│
├── assets/
│   ├── css/
│   │   ├── variables.css      # CSS Variables (kolory, fonty, spacing)
│   │   ├── reset.css          # CSS Reset & Base styles
│   │   ├── main.css           # Main styles (layout, navigation, utilities)
│   │   ├── hero.css           # Hero section & Intro styles
│   │   ├── cards.css          # Card components (gameplay, highlights, widgets)
│   │   ├── footer.css         # Footer styles
│   │   ├── animations.css     # Animations & effects
│   │   ├── gameplays.css      # Gameplays page styles
│   │   └── highlights.css     # Highlights page styles
│   │
│   ├── js/
│   │   ├── main.js            # Main JavaScript (navigation, parallax, widgets)
│   │   ├── home.js            # Homepage logic
│   │   ├── gameplays.js       # Gameplays page logic + YouTube API
│   │   ├── highlights.js      # Highlights page logic + YouTube API
│   │   ├── announcements.js   # Stream announcements display
│   │   ├── stream-reminders.js # Browser notifications system
│   │   ├── calendar-export.js # Google Calendar integration
│   │   ├── theme-switcher.js  # Theme toggling logic
│   │   ├── video-modal.js     # Video modal player
│   │   └── admin-announcements.js # Admin panel logic
│   │
│   └── images/                # Images & assets
│       ├── icons/             # Icon files
│       ├── thumbnails/        # Video thumbnails
│       ├── backgrounds/       # Background images
│       ├── parallax/          # Parallax layers
│       └── ui/                # UI elements
│
├── config/
│   └── playlists.js           # YouTube playlist mapping
│
├── lib/
│   ├── cache.js               # 24h in-memory cache dla YouTube API
│   ├── youtube-api.js         # YouTube API helpers
│   └── google-sheets.js       # Google Sheets API integration
│
├── scripts/
│   └── dev-server.js          # Local development Express server
│
└── docs/                      # Documentation
    ├── README.md              # Documentation index
    ├── ADMIN_GUIDE.md         # Admin panel user guide
    ├── ANNOUNCEMENTS_SYSTEM.md # Technical documentation
    ├── GOOGLE_SHEETS_SETUP.md # Google Sheets API setup guide
    ├── guides/                # Setup & usage guides
    │   ├── API_SETUP.md       # YouTube API configuration
    │   ├── CUSTOMIZATION.md   # Customization guide
    │   └── QUICKSTART.md      # Quick start guide
    └── archive/               # Archived planning documents
        ├── idea.md            # Initial concept
        ├── plan.md            # Implementation plan
        └── design/            # Design mockups & wireframes
```

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
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx

# Google Sheets (dla admin panel)
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}

# Admin Panel
ADMIN_PASSWORD=your_secure_password_here
```

### Development

```bash
# Start local development server (port 6969)
npm run dev

# Dostęp do strony
open http://localhost:6969

# Dostęp do panelu admina
open http://localhost:6969/admin/announcements.html
```

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

### Frontend
- **HTML5, CSS3, JavaScript** (Vanilla JS - no frameworks)
- **Responsive Design** (Mobile-first approach)
- **YouTube IFrame API** (Video playback)
- **Notifications API** (Browser notifications)

### Backend
- **Vercel Serverless Functions** (Node.js)
- **YouTube Data API v3** (Video content)
- **Google Sheets API** (Database replacement)
- **Express.js** (Local development server)

### Libraries & Tools
- `googleapis` - Google Sheets integration
- `axios` - HTTP requests
- `dotenv` - Environment variables
- `express` - Development server

### Infrastructure
- **Vercel** - Hosting & Serverless Functions
- **Google Cloud Platform** - API credentials
- **Google Sheets** - Content database

## 📚 Documentation

Szczegółowa dokumentacja dostępna w katalogu `/docs`:

- **[Admin Guide](docs/ADMIN_GUIDE.md)** - Jak zarządzać zapowiedziami streamów
- **[Announcements System](docs/ANNOUNCEMENTS_SYSTEM.md)** - Dokumentacja techniczna systemu zapowiedzi
- **[Google Sheets Setup](docs/GOOGLE_SHEETS_SETUP.md)** - Konfiguracja backend'u Google Sheets
- **[API Setup](docs/guides/API_SETUP.md)** - Konfiguracja YouTube API

## 🎯 API Endpoints

### YouTube API (`/api/youtube`)
```bash
GET /api/youtube?playlistId=PLxxx&maxResults=20&pageToken=xxx
```
Zwraca filmy z playlisty YouTube z paginacją.

### Channel Stats (`/api/channel`)
```bash
GET /api/channel
```
Zwraca statystyki kanału (subskrybenci, liczba filmów).

### Announcements (`/api/announcements`)
```bash
GET /api/announcements?upcoming=true  # Lista zapowiedzi
POST /api/announcements              # Dodaj zapowiedź (auth required)
PUT /api/announcements/:id           # Edytuj zapowiedź (auth required)
DELETE /api/announcements/:id        # Usuń zapowiedź (auth required)
```

## 🔧 Configuration

### YouTube Playlists
Edytuj `config/playlists.js` aby dodać/zmienić playlisty:

```javascript
export const playlists = {
  tr1: 'PLxxxxxxxxxxxxxxxxx', // Tomb Raider 1
  tr2: 'PLxxxxxxxxxxxxxxxxx', // Tomb Raider 2
  // ...
};
```

### Admin Panel
Panel administracyjny dostępny pod `/admin/announcements.html`
- **Login:** admin
- **Password:** ustawione w `ADMIN_PASSWORD` env variable

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

**Status:** ✅ **Phase 4 (Backend Integration) - Complete**

**Current Version:** 1.1.0

**Features:**
- ✅ Full YouTube API integration with pagination
- ✅ Google Sheets backend for stream announcements
- ✅ Admin panel with authentication
- ✅ Calendar integration (Google Calendar)
- ✅ Browser notifications for stream reminders
- ✅ Theme switcher (Tomb Raider / Matrix)
- ✅ Video modal player
- ✅ Fully responsive design
- ✅ Deployed on Vercel

**Live Site:** [Add your Vercel URL here]

**Admin Panel:** [Add your Vercel URL]/admin/announcements.html

---

Made with 💜 by Claude Code for xBruksiax Gaming Community
