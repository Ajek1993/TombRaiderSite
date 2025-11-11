# 🏺 Tomb Raider Gaming Website

> Neo-gaming themed website for Tomb Raider gameplay channel

Strona gamingowa poświęcona kanałowi YouTube z gameplay'ami z serii Tomb Raider. Projekt łączy retro gaming aesthetic z nowoczesnymi efektami neonowymi i cyber motywami.

## ✨ Features

### 🎮 Główne Funkcjonalności
- **Hero Section** z parallax scrolling i featured video
- **Gameplay Cards** - prezentacja najnowszych filmów z YouTube
- **Highlights** - najlepsze momenty z rozgrywki
- **Stream Announcements** - zapowiedzi nadchodzących streamów TikTok z countdown
- **Gaming Widgets** - losowy gameplay, statystyki, najnowszy upload
- **Quote Generator** - losowe cytaty Lary Croft

### 🎨 Design
- **Neo-gaming aesthetic** - połączenie retro pixel art z neonowymi efektami
- **Paleta kolorów:** Cyber Pink, Neon Cyan, Electric Purple, Gold Accent
- **Typografia:** Press Start 2P (headers), VT323 (subheaders), Roboto (body)
- **Animacje:** Parallax, hover effects, neon glow, glitch effects
- **Pixel Art:** Lara Croft jako maskotka w różnych rozmiarach

### 📱 Responsywność
- **Mobile-first approach**
- Hamburger menu dla urządzeń mobilnych
- Pełna responsywność dla tablet i desktop
- Touch-optimized interactions

### ♿ Accessibility
- WCAG AA compliance
- Skip to content link
- Keyboard navigation
- Screen reader friendly
- Prefers-reduced-motion support

## 🗂️ Struktura Projektu

```
claude-project/
├── index.html                 # Strona główna
├── README.md                  # Dokumentacja
├── .gitignore                 # Git ignore rules
│
├── assets/
│   ├── css/
│   │   ├── variables.css      # CSS Variables (kolory, fonty, spacing)
│   │   ├── reset.css          # CSS Reset & Base styles
│   │   ├── main.css           # Main styles (layout, navigation, utilities)
│   │   ├── hero.css           # Hero section & Intro styles
│   │   ├── cards.css          # Card components (gameplay, highlights, widgets)
│   │   ├── footer.css         # Footer styles
│   │   └── animations.css     # Animations & effects
│   │
│   ├── js/
│   │   └── main.js            # Main JavaScript (navigation, parallax, widgets)
│   │
│   └── images/                # (do utworzenia) Images & assets
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── og-image.jpg
│       └── parallax/          # Parallax background layers
│
├── docs/                      # Design documentation
│   ├── sitemap.md
│   ├── tomb-raider-concept.md
│   ├── color-palette.md
│   ├── wireframes.md
│   ├── branding-logo.md
│   ├── typography.md
│   ├── animations-effects.md
│   ├── mockups-desktop.md
│   └── mockups-mobile.md
│
├── specs/                     # Project specifications
│   └── plan.md
│
└── src/                       # (future) Source components
    ├── components/
    └── pages/
```

## 🎨 Paleta Kolorów

### Kolory Neonowe
```css
--cyber-pink: #FF1493;
--neon-cyan: #00FFFF;
--electric-purple: #8A2BE2;
--gold-accent: #FFD700;
```

### Tła
```css
--dark-bg: #1a1a2e;
--slate-dark: #2F4F4F;
--near-black: #0f0f1e;
```

## 🔤 Typografia

- **Headers:** Press Start 2P (retro gaming)
- **Subheaders:** VT323 (terminal/arcade style)
- **Body:** Roboto (czytelność)
- **Cyber Elements:** Orbitron (opcjonalnie)

## 🚀 Uruchomienie Lokalne

### Wymagania
- Nowoczesna przeglądarka (Chrome, Firefox, Safari, Edge)
- Serwer HTTP (opcjonalnie dla development)

### Metoda 1: Live Server (VS Code)
1. Zainstaluj rozszerzenie "Live Server" w VS Code
2. Otwórz folder projektu w VS Code
3. Kliknij prawym na `index.html` → "Open with Live Server"

### Metoda 2: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Następnie otwórz: http://localhost:8000

### Metoda 3: Node.js http-server
```bash
npx http-server -p 8000
```

### Metoda 4: Bezpośrednio w przeglądarce
Otwórz plik `index.html` bezpośrednio w przeglądarce (niektóre funkcje mogą nie działać bez serwera).

## 📦 Deployment

### GitHub Pages
1. Push projektu do GitHub
2. Settings → Pages → Source: main branch
3. Strona dostępna pod: `https://[username].github.io/[repo-name]`

### Netlify
1. Przeciągnij folder projektu na netlify.com/drop
2. Lub połącz z GitHub repo dla ciągłego wdrożenia

### Vercel
```bash
npx vercel
```

## 🛠️ Customization

### Zmiana Nicku/Nazwy Kanału
Znajdź i zamień `[Nick Siostry]` lub `[Nick]` w:
- `index.html` (title, meta tags, nagłówki)
- Logo sections

### Dodanie Prawdziwych Linków
Zastąp placeholder linki w:
- Social media links (YouTube, TikTok, Discord, Instagram)
- Navigation links (gdy utworzysz dodatkowe strony)

### Dodanie Thumbnail'ów
1. Utwórz folder `assets/images/thumbnails/`
2. Zamień `.thumbnail-placeholder` na `<img src="...">` w kartach

### Konfiguracja YouTube API (opcjonalnie)
Dla automatycznego pobierania filmów:
1. Uzyskaj YouTube API key
2. Dodaj skrypt do `main.js` pobierający filmy z playlisty
3. Dynamicznie generuj karty gameplay'ów

## 📝 TODO - Kolejne Kroki

### Faza 3 - Dokończenie
- [ ] Dodać prawdziwe obrazy (thumbnails, parallax backgrounds)
- [ ] Utworzyć favicon i logo
- [ ] Utworzyć dodatkowe strony (gameplays.html, highlights.html, etc.)
- [ ] Dodać prawdziwe YouTube embedy

### Faza 4 - Backend (opcjonalnie)
- [ ] Integracja YouTube API
- [ ] System zarządzania treścią
- [ ] Baza danych dla zapowiedzi
- [ ] Panel administracyjny

### Faza 5 - SEO
- [ ] Meta tags dla wszystkich stron
- [ ] sitemap.xml i robots.txt
- [ ] Open Graph images
- [ ] Schema.org markup
- [ ] Google Analytics

### Faza 6 - Testowanie
- [ ] Testy responsywności
- [ ] Testy przeglądarek
- [ ] PageSpeed Insights
- [ ] Accessibility audit
- [ ] User testing

### Faza 7 - Uruchomienie
- [ ] Domena
- [ ] Hosting + SSL
- [ ] DNS configuration
- [ ] Monitoring
- [ ] Social media announcement

## 🤝 Contributing

Projekt stworzony z Claude Code jako prezentacja możliwości AI-assisted development.

## 📄 License

Projekt edukacyjny. Tomb Raider i Lara Croft są znakami towarowymi Square Enix.

## 🎮 Credits

- **Design & Development:** Created with [Claude Code](https://claude.com/claude-code)
- **Inspiration:** Tomb Raider game series
- **Fonts:** Google Fonts (Press Start 2P, VT323, Roboto, Orbitron)

---

**Status:** ✅ Faza 3 (Frontend) - Ukończona

Strona gotowa do testowania i dodania prawdziwych treści (obrazy, filmy, linki).
