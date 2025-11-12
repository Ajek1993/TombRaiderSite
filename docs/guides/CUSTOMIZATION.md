# 🎨 Przewodnik Customizacji

## Jak Spersonalizować Stronę

### 1. Zmiana Nazwy Kanału

#### W pliku `index.html`:
Znajdź i zamień wszystkie wystąpienia:

```html
<!-- Obecne placeholder'y -->
[Nick Siostry]
[Nick]
[Nick] Gaming

<!-- Zamień na -->
TwojaStreamerka Gaming
Twoja_Nazwa
```

**Lokalizacje do zmiany:**
- Line 8: `<meta name="author">`
- Line 11: `<meta property="og:title">`
- Line 26: `<title>`
- Logo section: `.logo-name`
- Footer: Copyright notice

---

### 2. Dodanie Social Media Links

#### W pliku `index.html`, znajdź sekcję Social Icons:

```html
<!-- Zamień placeholder linki -->
<a href="https://youtube.com/@placeholder" ... >
<!-- Na prawdziwe -->
<a href="https://youtube.com/@twoj_kanal" ... >

<!-- TikTok -->
<a href="https://tiktok.com/@twoj_nick" ... >

<!-- Discord -->
<a href="https://discord.gg/twoje_zaproszenie" ... >

<!-- Instagram -->
<a href="https://instagram.com/twoj_nick" ... >
```

**Lokalizacje:**
- Desktop navigation (line ~60)
- Mobile menu (line ~103)
- Footer (line ~595)

---

### 3. Zmiana Kolorów

#### W pliku `assets/css/variables.css`:

```css
/* Zmień główne kolory według preferencji */
:root {
  /* Przykład: Zmiana na zielony theme */
  --cyber-pink: #00FF00;        /* Zmień na swój kolor */
  --neon-cyan: #00FFFF;         /* Zostaw lub zmień */
  --electric-purple: #9D4EDD;   /* Dostosuj */
  --gold-accent: #FFD700;       /* Zmień jeśli nie pasuje */
}
```

**Popularne Theme'y:**

**🩷 Pink Gamer Girl:**
```css
--cyber-pink: #FF1493;
--neon-cyan: #FF69B4;
--electric-purple: #DA70D6;
--gold-accent: #FFB6C1;
```

**💚 Matrix/Green:**
```css
--cyber-pink: #00FF00;
--neon-cyan: #39FF14;
--electric-purple: #32CD32;
--gold-accent: #7FFF00;
```

**💙 Blue Cyber:**
```css
--cyber-pink: #00BFFF;
--neon-cyan: #1E90FF;
--electric-purple: #4169E1;
--gold-accent: #87CEEB;
```

---

### 4. Zmiana Fontów

#### W pliku `assets/css/variables.css`:

```css
:root {
  /* Obecne fonty */
  --font-heading: 'Press Start 2P', cursive;
  --font-subheading: 'VT323', monospace;
  --font-body: 'Roboto', sans-serif;

  /* Alternatywne opcje: */

  /* Bardziej nowoczesne */
  --font-heading: 'Orbitron', sans-serif;
  --font-subheading: 'Rajdhani', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Bardziej retro */
  --font-heading: 'VT323', monospace;
  --font-subheading: 'Courier New', monospace;
  --font-body: 'Share Tech Mono', monospace;
}
```

**Pamiętaj:** Jeśli zmieniasz fonty, zaktualizuj import w `assets/css/main.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=TwojFont&display=swap');
```

---

### 5. Dodanie Prawdziwych Obrazów

#### Krok 1: Przygotuj obrazy
```
assets/images/
├── thumbnails/
│   ├── gameplay-01.jpg
│   ├── gameplay-02.jpg
│   ├── highlight-01.jpg
│   └── ...
├── parallax/
│   ├── layer-1.png
│   ├── layer-2.png
│   └── layer-3.png
├── logo.png
└── favicon.png
```

#### Krok 2: Zamień placeholder'y w HTML

**Przykład - Gameplay Card:**
```html
<!-- PRZED -->
<div class="thumbnail-placeholder">
  <span class="thumbnail-icon">🏛️</span>
</div>

<!-- PO -->
<img src="/assets/images/thumbnails/gameplay-01.jpg"
     alt="Shadow of Tomb Raider - Episode 15"
     class="card-thumbnail">
```

**Dodaj do CSS:**
```css
.card-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

### 6. Dodanie YouTube Embedów

#### Zamień Video Placeholder:

```html
<!-- PRZED -->
<div class="video-placeholder">
  <div class="video-placeholder-content">
    <span class="play-icon">▶</span>
    <!-- ... -->
  </div>
</div>

<!-- PO -->
<div class="video-container">
  <iframe
    width="100%"
    height="450"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

**Dodaj do CSS:**
```css
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

---

### 7. Dostosowanie Countdown Timer

#### W pliku `assets/js/main.js`:

```javascript
// Znajdź sekcję COUNTDOWN TIMER
// Zmień datę docelową:

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 7); // Za 7 dni
targetDate.setHours(12, 0, 0, 0); // O 12:00

// Lub ustaw konkretną datę:
const targetDate = new Date('2025-11-20T12:00:00');
```

---

### 8. Dodanie Własnych Cytatów

#### W pliku `assets/js/main.js`:

```javascript
// Znajdź sekcję RANDOM QUOTE GENERATOR
// Dodaj własne cytaty do tablicy:

const quotes = [
  "Twój własny cytat 1",
  "Twój własny cytat 2",
  "Coś inspirującego o gaming",
  "Motto twojego kanału",
  // ... dodaj więcej
];
```

---

### 9. Zmiana Logo (Emoji → Obrazek)

#### Krok 1: Przygotuj logo (PNG transparent, 200×200px)

#### Krok 2: W `index.html` zamień:

```html
<!-- PRZED -->
<span class="logo-icon">🏺</span>

<!-- PO -->
<img src="/assets/images/logo.png"
     alt="Logo"
     class="logo-icon-img"
     width="48"
     height="48">
```

#### Krok 3: Dodaj do CSS:

```css
.logo-icon-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
```

---

### 10. Dodanie Favicon

#### Krok 1: Przygotuj ikony
- 16×16 PNG
- 32×32 PNG
- 180×180 PNG (Apple)

#### Krok 2: Umieść w `assets/images/`

#### Krok 3: Linki już są w HTML (line 22-24), tylko podmień pliki

---

### 11. Zmiana Tekstu Sekcji

#### Przykład - About Section:

Znajdź w `index.html`:
```html
<p>
  Jestem streamerką i wieloletnią fanką Tomb Raider...
</p>
```

Zamień na własną bio:
```html
<p>
  Twoja własna biografia. Opisz siebie, swoją historię
  z gamingiem, dlaczego założyłaś kanał, co Cię motywuje...
</p>
```

---

### 12. Dostosowanie Mobile Menu

#### Zmiana Ikon w Menu:

W `index.html`, sekcja mobile menu:
```html
<li><a href="/" class="mobile-menu-link active">
  🏠 Home  <!-- Zmień emoji na swoje -->
</a></li>
<li><a href="/gameplays.html" class="mobile-menu-link">
  🎮 Gameplay'e  <!-- Lub użyj innego -->
</a></li>
```

---

### 13. Dodanie Google Analytics

#### W `<head>` sekcji `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

### 14. Zmiana Animacji Parallax

#### W `assets/css/hero.css`:

Dostosuj prędkość parallax:
```css
/* Wolniejszy parallax */
.parallax-layer-1 { /* data-speed="0.8" */ }
.parallax-layer-2 { /* data-speed="0.5" */ }
.parallax-layer-3 { /* data-speed="0.2" */ }

/* Szybszy parallax */
.parallax-layer-1 { /* data-speed="1.2" */ }
.parallax-layer-2 { /* data-speed="0.8" */ }
.parallax-layer-3 { /* data-speed="0.4" */ }
```

Zmień w HTML sekcji parallax:
```html
<div class="parallax-layer parallax-layer-1" data-speed="1.2"></div>
```

---

### 15. Wyłączenie/Włączenie Funkcji

#### Wyłącz Parallax:
W `assets/js/main.js` zakomentuj:
```javascript
// window.addEventListener('scroll', () => {
//   ... parallax code
// });
```

#### Wyłącz Animacje:
Dodaj klasę do `<body>`:
```html
<body class="no-animations">
```

I w CSS:
```css
.no-animations * {
  animation: none !important;
  transition: none !important;
}
```

---

## 🎯 Quick Checklist

- [ ] Zmienić nazwę kanału we wszystkich miejscach
- [ ] Dodać prawdziwe social media links
- [ ] Zmienić kolory (opcjonalnie)
- [ ] Dodać thumbnail'y gameplay'ów
- [ ] Dodać YouTube embedy
- [ ] Dostosować countdown timer
- [ ] Dodać własne cytaty
- [ ] Zmienić logo na obrazek
- [ ] Dodać favicon
- [ ] Napisać własną bio
- [ ] Dodać Google Analytics
- [ ] Przetestować na różnych urządzeniach

---

## 💡 Pro Tips

1. **Testuj często** - po każdej zmianie sprawdź jak wygląda
2. **Backup** - zrób kopię przed większymi zmianami
3. **Git commits** - commituj po każdej udanej zmianie
4. **Mobile first** - zawsze testuj na mobile
5. **Performance** - kompresuj obrazy przed uploadem
6. **Consistency** - zachowaj spójność visual design

---

**Need help?** Sprawdź `README.md` dla więcej informacji!
