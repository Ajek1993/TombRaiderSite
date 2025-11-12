# 🚀 Quick Start Guide

## Szybkie Uruchomienie Strony

### Opcja 1: Bezpośrednio w Przeglądarce
Najprostszy sposób - po prostu otwórz plik w przeglądarce:

1. Kliknij prawym przyciskiem na `index.html`
2. Wybierz "Otwórz za pomocą" → Twoja przeglądarka (Chrome/Firefox/Edge)

**Uwaga:** Niektóre funkcje (jak parallax scrolling) mogą działać lepiej z lokalnym serwerem.

---

### Opcja 2: Python HTTP Server (Zalecane)

Jeśli masz zainstalowany Python:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Następnie otwórz w przeglądarce:
```
http://localhost:8000
```

---

### Opcja 3: Node.js (jeśli masz npm)

```bash
# Uruchom lokalny serwer
npm start

# Lub alternatywnie
npx http-server -p 8000
```

Następnie otwórz:
```
http://localhost:8000
```

---

### Opcja 4: VS Code Live Server

1. Zainstaluj rozszerzenie "Live Server" w VS Code
2. Otwórz folder projektu w VS Code
3. Kliknij prawym na `index.html` → "Open with Live Server"
4. Strona otworzy się automatycznie

---

## ✅ Co Sprawdzić Po Uruchomieniu

### Desktop (powyżej 1024px)
- [ ] Nawigacja z logo i linkami
- [ ] Hero section z pixel art Lary
- [ ] Parallax scrolling (poruszaj się w górę/dół)
- [ ] 4 karty gameplay'ów w grid
- [ ] 4 karty highlights
- [ ] Countdown do streamu
- [ ] 3 gaming widgets
- [ ] Footer z 5 kolumnami

### Mobile (poniżej 768px)
- [ ] Hamburger menu (kliknij ☰)
- [ ] Menu slide-in z lewej
- [ ] Single column layout
- [ ] Wszystkie sekcje ułożone pionowo
- [ ] Footer responsywny (2 kolumny)

### Interaktywność
- [ ] Hover na kartach (podnoszą się)
- [ ] Hover na linkach (zmiana koloru + glow)
- [ ] Random Quote button (zmienia cytat)
- [ ] Countdown timer (aktualizuje się co minutę)
- [ ] Sticky navigation (chowa się przy scrollu w dół)

---

## 🎨 Kolory do Przetestowania

Sprawdź czy widzisz kolory neo-gaming:
- **🩷 Cyber Pink (#FF1493)** - przyciski, akcenty
- **💠 Neon Cyan (#00FFFF)** - linki, headery
- **💜 Electric Purple (#8A2BE2)** - bordery, glow
- **💛 Gold (#FFD700)** - tytuły, Lara pixel art

---

## 📱 Testowanie Responsywności

### W Przeglądarce
1. Otwórz DevTools (F12)
2. Kliknij ikonę urządzenia mobilnego (Ctrl+Shift+M)
3. Testuj różne rozmiary:
   - iPhone X (375×812)
   - iPad (768×1024)
   - Desktop (1920×1080)

### Breakpointy do Sprawdzenia
- **< 768px** → Mobile (hamburger menu)
- **768px - 1024px** → Tablet (2 kolumny)
- **> 1024px** → Desktop (4 kolumny gameplay)

---

## 🐛 Troubleshooting

### Nie widać stylów
✅ Sprawdź Console (F12) czy są błędy ładowania CSS
✅ Upewnij się, że ścieżki w `<link>` są poprawne

### Animacje nie działają
✅ Sprawdź czy masz włączone animacje w systemie
✅ Otwórz DevTools → Application → Local Storage

### JavaScript nie działa
✅ Sprawdź Console (F12) czy są błędy JavaScript
✅ Upewnij się że plik main.js został załadowany

### Parallax nie działa
✅ Użyj lokalnego serwera HTTP (nie file://)
✅ Sprawdź Console czy są błędy CORS

---

## 📝 Następne Kroki

Po sprawdzeniu że strona działa:

1. **Dodaj prawdziwe obrazy**
   - Utwórz folder `assets/images/thumbnails/`
   - Dodaj thumbnail'y do kart gameplay

2. **Zmień placeholder'y**
   - Zastąp `[Nick Siostry]` prawdziwym nickiem
   - Dodaj prawdziwe linki do social media
   - Dodaj prawdziwe YouTube embedy

3. **Dodaj więcej stron**
   - Utwórz `gameplays.html`
   - Utwórz `highlights.html`
   - Utwórz `about.html`

4. **Zoptymalizuj obrazy**
   - Skompresuj wszystkie grafiki
   - Użyj WebP dla lepszej wydajności

---

## 🎮 Enjoy!

Jeśli wszystko działa - gratulacje! Masz działającą stronę gamingową z neo-gaming aesthetic i Tomb Raider theme! 🏺

**Created with Claude Code** 🤖
