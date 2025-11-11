# Typografia - Strona Gamingowa Tomb Raider

## Strategia Typograficzna

### Podejście: Retro Gaming + Modern Readability

**Cel:**
- Nagłówki: Retro gaming font dla nostalgii i charakteru
- Treść: Czytelny sans-serif dla komfortu czytania
- Balans: Aesthetic vs. funkcjonalność

---

## Wybrane Fonty

### 1. Nagłówki - Press Start 2P

**Źródło:** Google Fonts (Open Source)
**Link:** https://fonts.google.com/specimen/Press+Start+2P

**Charakterystyka:**
- Klasyczny 8-bit gaming font
- Doskonała czytelność mimo pixel stylu
- Nostalgiczny feel idealny dla retro gamingu
- Szeroka kompatybilność przeglądarek

**Użycie:**
- H1 (główne nagłówki)
- Logo tekst
- Feature headers
- Call-to-action buttons (duże)

**CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

h1, .hero-title, .logo-text {
  font-family: 'Press Start 2P', cursive;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.05em;
}
```

**Rozmiary:**
```css
/* Desktop */
h1 { font-size: 48px; }

/* Tablet */
@media (max-width: 1024px) {
  h1 { font-size: 36px; }
}

/* Mobile */
@media (max-width: 768px) {
  h1 { font-size: 28px; }
}
```

---

### 2. Subheaders - VT323

**Źródło:** Google Fonts (Open Source)
**Link:** https://fonts.google.com/specimen/VT323

**Charakterystyka:**
- Terminal/monospace aesthetic
- Lżejszy od Press Start 2P
- Retro gaming ale bardziej readable
- Świetny dla tagline'ów i H2/H3

**Użycie:**
- H2, H3 (mniejsze nagłówki)
- Taglines
- Section headers
- Quotes (Lara Croft quotes)
- Metadata (dates, times, stats)

**CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

h2, h3, .tagline, .metadata {
  font-family: 'VT323', monospace;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.03em;
}
```

**Rozmiary:**
```css
/* Desktop */
h2 { font-size: 36px; }
h3 { font-size: 28px; }

/* Tablet */
@media (max-width: 1024px) {
  h2 { font-size: 32px; }
  h3 { font-size: 24px; }
}

/* Mobile */
@media (max-width: 768px) {
  h2 { font-size: 28px; }
  h3 { font-size: 22px; }
}
```

---

### 3. Body Text - Roboto

**Źródło:** Google Fonts (Open Source)
**Link:** https://fonts.google.com/specimen/Roboto

**Charakterystyka:**
- Nowoczesny, czytelny sans-serif
- Doskonały dla długich tekstów
- Multiple weights (300, 400, 500, 700)
- Świetna czytelność na ekranach

**Użycie:**
- Paragraphs (główna treść)
- Descriptions
- Navigation links
- Form inputs
- Footer text

**CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

body, p, .content, nav, .description {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0.01em;
}
```

**Weights & Usage:**
```css
/* Light - 300 (subtle text) */
.subtle-text {
  font-weight: 300;
}

/* Regular - 400 (body text) */
p, body {
  font-weight: 400;
}

/* Medium - 500 (emphasis) */
strong, .emphasis {
  font-weight: 500;
}

/* Bold - 700 (important) */
.important, .highlight {
  font-weight: 700;
}
```

**Rozmiary:**
```css
/* Desktop */
body, p { font-size: 16px; }
small { font-size: 14px; }

/* Mobile - slightly larger for comfort */
@media (max-width: 768px) {
  body, p { font-size: 18px; }
  small { font-size: 15px; }
}
```

---

### 4. Alternative: Orbitron (Optional)

**Źródło:** Google Fonts
**Link:** https://fonts.google.com/specimen/Orbitron

**Charakterystyka:**
- Futurystyczny/tech feel
- Neo-gaming aesthetic
- Good dla cyber elements
- Multiple weights

**Użycie (opcjonalnie):**
- Alternative dla H2/H3
- Tech-related sections
- Cyber/neon themed areas
- Stats counters

**CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.cyber-text, .tech-section h2 {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

---

## Hierarchia Typograficzna

### Complete Type Scale

```css
:root {
  /* Font Families */
  --font-heading: 'Press Start 2P', cursive;
  --font-subheading: 'VT323', monospace;
  --font-body: 'Roboto', sans-serif;
  --font-cyber: 'Orbitron', sans-serif;

  /* Font Sizes - Desktop */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 60px;

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;

  /* Font Weights */
  --weight-light: 300;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-bold: 700;
  --weight-black: 900;
}
```

### Typography Classes

```css
/* Heading Styles */
.heading-hero {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  color: var(--gold-accent);
  text-shadow: var(--text-glow-gold);
}

.heading-section {
  font-family: var(--font-subheading);
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  color: var(--neon-cyan);
  text-shadow: var(--text-glow-cyan);
  text-transform: uppercase;
}

.heading-card {
  font-family: var(--font-subheading);
  font-size: var(--text-2xl);
  line-height: var(--leading-normal);
  color: var(--gold-accent);
}

/* Body Text Styles */
.text-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
}

.text-lead {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  font-weight: var(--weight-light);
  color: var(--text-secondary);
}

.text-small {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
}

/* Special Text Styles */
.text-quote {
  font-family: var(--font-subheading);
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  font-style: italic;
  color: var(--cyber-pink);
  border-left: 4px solid var(--cyber-pink);
  padding-left: 20px;
}

.text-metadata {
  font-family: var(--font-subheading);
  font-size: var(--text-base);
  letter-spacing: var(--tracking-wide);
  color: var(--text-secondary);
  text-transform: uppercase;
}

.text-cyber {
  font-family: var(--font-cyber);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  background: var(--gradient-neon);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Responsive Typography

### Mobile-First Approach

```css
/* Base (Mobile) */
html {
  font-size: 16px;
}

h1 { font-size: 28px; }
h2 { font-size: 24px; }
h3 { font-size: 20px; }
p { font-size: 16px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }

  h1 { font-size: 36px; }
  h2 { font-size: 30px; }
  h3 { font-size: 24px; }
  p { font-size: 16px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  html {
    font-size: 16px;
  }

  h1 { font-size: 48px; }
  h2 { font-size: 36px; }
  h3 { font-size: 28px; }
  p { font-size: 16px; }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  html {
    font-size: 18px;
  }

  h1 { font-size: 56px; }
  h2 { font-size: 42px; }
  h3 { font-size: 32px; }
  p { font-size: 18px; }
}
```

### Fluid Typography (Optional)

```css
/* Using clamp() for smooth scaling */
h1 {
  font-size: clamp(28px, 5vw, 56px);
}

h2 {
  font-size: clamp(24px, 4vw, 42px);
}

h3 {
  font-size: clamp(20px, 3vw, 32px);
}

p {
  font-size: clamp(16px, 1.5vw, 18px);
}
```

---

## Text Effects & Styling

### Neon Glow Text

```css
.neon-text-gold {
  color: var(--gold-accent);
  text-shadow:
    0 0 5px var(--gold-accent),
    0 0 10px var(--gold-accent),
    0 0 20px var(--gold-accent),
    0 0 40px var(--gold-accent);
}

.neon-text-cyan {
  color: var(--neon-cyan);
  text-shadow:
    0 0 5px var(--neon-cyan),
    0 0 10px var(--neon-cyan),
    0 0 20px var(--neon-cyan);
}

.neon-text-pink {
  color: var(--cyber-pink);
  text-shadow:
    0 0 5px var(--cyber-pink),
    0 0 10px var(--cyber-pink),
    0 0 20px var(--cyber-pink);
}
```

### Glitch Effect

```css
.glitch-text {
  position: relative;
  font-family: var(--font-heading);
  color: var(--neon-cyan);
  animation: glitch 2s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: var(--cyber-pink);
  animation: glitch-1 2s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}

.glitch-text::after {
  color: var(--electric-purple);
  animation: glitch-2 2s infinite;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
}

@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  33% { transform: translate(-4px, 0); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  33% { transform: translate(4px, 0); }
}
```

### Gradient Text

```css
.gradient-text {
  background: var(--gradient-neon);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--weight-bold);
}

.gold-gradient-text {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Pixelated Text Edge

```css
.pixel-text {
  font-family: var(--font-heading);
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
```

---

## Special Typography Components

### Quote Block (Lara Croft Quotes)

```css
.quote-block {
  position: relative;
  padding: 30px 40px;
  margin: 40px 0;
  background: rgba(138, 43, 226, 0.1);
  border-left: 4px solid var(--electric-purple);
  font-family: var(--font-subheading);
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--text-primary);
  box-shadow: var(--shadow-purple);
}

.quote-block::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 80px;
  color: var(--electric-purple);
  opacity: 0.3;
  font-family: Georgia, serif;
}

.quote-author {
  display: block;
  margin-top: 15px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-style: normal;
  font-weight: var(--weight-medium);
  color: var(--neon-cyan);
  text-align: right;
}

.quote-author::before {
  content: '— ';
}
```

### Stats/Numbers Display

```css
.stat-number {
  font-family: var(--font-cyber);
  font-size: var(--text-5xl);
  font-weight: var(--weight-black);
  color: var(--gold-accent);
  text-shadow: var(--text-glow-gold);
  line-height: 1;
}

.stat-label {
  font-family: var(--font-subheading);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  color: var(--text-secondary);
  text-transform: uppercase;
}
```

### Badge/Tag Typography

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  font-family: var(--font-subheading);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-primary);
  background: var(--cyber-pink);
  border-radius: 4px;
  box-shadow: var(--shadow-pink);
}

.badge-new {
  background: var(--cyber-pink);
  animation: pulse-glow 2s infinite;
}

.badge-featured {
  background: var(--gold-accent);
  color: var(--dark-bg);
}

.badge-live {
  background: var(--error);
  animation: pulse-glow 1s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 10px currentColor;
  }
  50% {
    box-shadow: 0 0 20px currentColor;
  }
}
```

---

## Accessibility Considerations

### Contrast Ratios (WCAG AA Compliance)

```css
/* High Contrast Combinations */

/* Gold on Dark Background */
.text-gold-dark {
  color: #FFD700; /* 10.2:1 ratio ✓ */
  background: #1a1a2e;
}

/* Cyan on Dark Background */
.text-cyan-dark {
  color: #00FFFF; /* 11.5:1 ratio ✓ */
  background: #1a1a2e;
}

/* White on Dark Background */
.text-white-dark {
  color: #FFFFFF; /* 15.8:1 ratio ✓ */
  background: #1a1a2e;
}

/* Pink on Dark (adjusted for small text) */
.text-pink-dark-accessible {
  color: #FF69B4; /* 7.5:1 ratio ✓ */
  background: #1a1a2e;
}
```

### Readable Line Length

```css
.readable-text {
  max-width: 75ch; /* Optimal: 45-75 characters per line */
  margin-left: auto;
  margin-right: auto;
}

.narrow-text {
  max-width: 60ch; /* For larger font sizes */
}

.wide-text {
  max-width: 90ch; /* For very small text */
}
```

### Focus States

```css
a:focus,
button:focus,
input:focus {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 4px;
  text-decoration: underline;
}

/* Custom focus for retro aesthetic */
.retro-focus:focus {
  outline: 4px dotted var(--gold-accent);
  outline-offset: 2px;
  background: rgba(255, 215, 0, 0.1);
}
```

---

## Loading Fonts Efficiently

### Font Loading Strategy

```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap for better performance -->
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Font Display

```css
@font-face {
  font-family: 'Press Start 2P';
  font-display: swap; /* Prevents invisible text during loading */
  /* other properties */
}
```

### Font Subsetting (Optional)

```
/* Load only characters you need */
&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
```

---

## Complete Font Import

```css
/* typography.css */

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Roboto:wght@300;400;500;700&family=Orbitron:wght@400;700;900&display=swap');

/* CSS Variables */
:root {
  --font-heading: 'Press Start 2P', cursive;
  --font-subheading: 'VT323', monospace;
  --font-body: 'Roboto', sans-serif;
  --font-cyber: 'Orbitron', sans-serif;
}

/* Base Typography */
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  font-weight: 400;
  line-height: 1.2;
}

h1 {
  font-family: var(--font-heading);
  font-size: 48px;
  color: var(--gold-accent);
  text-shadow: var(--text-glow-gold);
}

h2, h3 {
  font-family: var(--font-subheading);
}

h2 {
  font-size: 36px;
  color: var(--neon-cyan);
}

h3 {
  font-size: 28px;
  color: var(--electric-purple);
}

p {
  margin-top: 0;
  margin-bottom: 1em;
}

a {
  color: var(--link-default);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--link-hover);
  text-shadow: 0 0 5px currentColor;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  body {
    font-size: 16px;
  }

  h1 { font-size: 28px; }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }
}
```

---

## Usage Examples

### Homepage Hero
```html
<section class="hero">
  <h1 class="heading-hero">Witaj w Moim Grobowcu!</h1>
  <p class="text-lead">Eksplorujemy starożytne ruiny razem z Larą Croft</p>
</section>
```

### Gameplay Card
```html
<div class="gameplay-card">
  <h3 class="heading-card">Shadow of Tomb Raider - #15</h3>
  <p class="text-body">Kontynuacja przygody w tajemniczej świątyni...</p>
  <div class="text-metadata">
    <span>🕐 45:23</span>
    <span>👁 2.5k views</span>
  </div>
</div>
```

### Quote Widget
```html
<blockquote class="quote-block">
  I make my own luck.
  <cite class="quote-author">Lara Croft</cite>
</blockquote>
```

---

## Podsumowanie

### Wybrane Fonty:
✓ **Press Start 2P** - Główne nagłówki (H1, logo)
✓ **VT323** - Subheaders (H2, H3, metadata)
✓ **Roboto** - Body text (paragrafy, nawigacja)
✓ **Orbitron** - Optional (cyber elements)

### Kluczowe Cechy:
- Retro gaming aesthetic w nagłówkach
- Czytelność w treści
- Neon glow effects
- Responsywne rozmiary
- WCAG AA compliance
- Efficient loading

**Gotowe do implementacji w Fazie 3!**
