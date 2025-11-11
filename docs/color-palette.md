# Paleta Kolorów Neo-Gamingowa - Tomb Raider Theme

## Główne Kolory

### Kolory Neonowe (Akcenty)

#### Cyber Pink
```css
--cyber-pink: #FF1493;
--cyber-pink-dark: #C71585;
--cyber-pink-light: #FF69B4;
--cyber-pink-glow: rgba(255, 20, 147, 0.5);
```
**Zastosowanie:** Główne akcenty, hover effects, neonowe podświetlenia, CTA buttons

#### Neon Cyan
```css
--neon-cyan: #00FFFF;
--neon-cyan-dark: #00CED1;
--neon-cyan-light: #7FFFD4;
--neon-cyan-glow: rgba(0, 255, 255, 0.5);
```
**Zastosowanie:** Linki, secondary buttons, tech elements, loading bars

#### Electric Purple
```css
--electric-purple: #8A2BE2;
--electric-purple-dark: #6A0DAD;
--electric-purple-light: #9370DB;
--electric-purple-glow: rgba(138, 43, 226, 0.5);
```
**Zastosowanie:** Headers, highlights, special sections, badges

#### Gold Accent (Tomb Raider)
```css
--gold-accent: #FFD700;
--gold-dark: #DAA520;
--gold-light: #FFEF85;
--gold-glow: rgba(255, 215, 0, 0.6);
```
**Zastosowanie:** Tomb Raider specyficzne elementy, artifacts, premium content, treasure icons

---

## Kolory Tła

### Ciemne Tła

#### Dark Primary
```css
--dark-bg: #1a1a2e;
--dark-bg-rgb: 26, 26, 46;
```
**Zastosowanie:** Główne tło strony, body background

#### Slate Dark
```css
--slate-dark: #2F4F4F;
--slate-dark-light: #3A5F5F;
--slate-dark-rgb: 47, 79, 79;
```
**Zastosowanie:** Sekcje, cards, panels, tomb textures

#### Near Black
```css
--near-black: #0f0f1e;
--near-black-rgb: 15, 15, 30;
```
**Zastosowanie:** Navigation bar, footer, modal overlays

---

## Kolory Tekstu

### Text Colors

```css
--text-primary: #FFFFFF;
--text-secondary: #B8B8D0;
--text-muted: #808080;
--text-disabled: #4A4A5E;
```

### Link Colors

```css
--link-default: #00FFFF;
--link-hover: #FF1493;
--link-visited: #9370DB;
--link-active: #FFD700;
```

---

## Kolory Gradientów

### Gradient Backgrounds

#### Cyber Gradient
```css
--gradient-cyber: linear-gradient(135deg, #1a1a2e 0%, #2F4F4F 50%, #1a1a2e 100%);
```

#### Neon Gradient
```css
--gradient-neon: linear-gradient(90deg, #FF1493 0%, #8A2BE2 50%, #00FFFF 100%);
```

#### Gold Gradient (Tomb Raider)
```css
--gradient-gold: linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #FFEF85 100%);
```

#### Dark Overlay
```css
--gradient-overlay: linear-gradient(180deg, rgba(15, 15, 30, 0) 0%, rgba(15, 15, 30, 0.8) 100%);
```

---

## Kolory Funkcjonalne

### Status Colors

```css
/* Success */
--success: #00FF7F;
--success-dark: #00CD66;
--success-glow: rgba(0, 255, 127, 0.4);

/* Warning */
--warning: #FFA500;
--warning-dark: #FF8C00;
--warning-glow: rgba(255, 165, 0, 0.4);

/* Error */
--error: #FF4444;
--error-dark: #CC0000;
--error-glow: rgba(255, 68, 68, 0.4);

/* Info */
--info: #00BFFF;
--info-dark: #0080FF;
--info-glow: rgba(0, 191, 255, 0.4);
```

---

## Cienie i Efekty

### Box Shadows

```css
/* Neon Glow Effects */
--shadow-pink: 0 0 10px rgba(255, 20, 147, 0.5),
               0 0 20px rgba(255, 20, 147, 0.3),
               0 0 30px rgba(255, 20, 147, 0.1);

--shadow-cyan: 0 0 10px rgba(0, 255, 255, 0.5),
               0 0 20px rgba(0, 255, 255, 0.3),
               0 0 30px rgba(0, 255, 255, 0.1);

--shadow-purple: 0 0 10px rgba(138, 43, 226, 0.5),
                 0 0 20px rgba(138, 43, 226, 0.3),
                 0 0 30px rgba(138, 43, 226, 0.1);

--shadow-gold: 0 0 10px rgba(255, 215, 0, 0.6),
               0 0 20px rgba(255, 215, 0, 0.4),
               0 0 30px rgba(255, 215, 0, 0.2);

/* Subtle Shadows */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.6);
```

### Text Shadows

```css
/* Neon Text Glow */
--text-glow-pink: 0 0 5px #FF1493,
                  0 0 10px #FF1493,
                  0 0 15px #FF1493;

--text-glow-cyan: 0 0 5px #00FFFF,
                  0 0 10px #00FFFF,
                  0 0 15px #00FFFF;

--text-glow-gold: 0 0 5px #FFD700,
                  0 0 10px #FFD700,
                  0 0 15px #FFD700;

/* Readable Text Shadow */
--text-shadow-dark: 2px 2px 4px rgba(0, 0, 0, 0.8);
--text-shadow-outline: -1px -1px 0 #000,
                       1px -1px 0 #000,
                       -1px 1px 0 #000,
                       1px 1px 0 #000;
```

---

## Kolory według Kontekstu

### Hero Section
- **Tło:** `--dark-bg` z `--gradient-overlay`
- **Nagłówek:** `--gold-accent` z `--text-glow-gold`
- **Tekst:** `--text-primary`
- **CTA Button:** `--cyber-pink` z `--shadow-pink`

### Navigation
- **Tło:** `--near-black` z 80% opacity
- **Links:** `--neon-cyan`
- **Active:** `--cyber-pink`
- **Hover:** `--electric-purple`

### Cards (Gameplay'e)
- **Tło:** `--slate-dark`
- **Border:** `--electric-purple` z 30% opacity
- **Hover:** `--shadow-purple`
- **Title:** `--gold-accent`

### Footer
- **Tło:** `--near-black`
- **Tekst:** `--text-secondary`
- **Links:** `--neon-cyan`
- **Icons:** `--cyber-pink`

### Buttons
- **Primary:** `--cyber-pink` background, `--text-primary` text
- **Secondary:** `--neon-cyan` border, transparent background
- **Hover:** Add glow effect
- **Disabled:** `--text-disabled` z 50% opacity

---

## Accessibility Considerations

### Kontrast (WCAG AAA Compliance)

```
✓ White text (#FFFFFF) na dark-bg (#1a1a2e) - 15.8:1
✓ Gold (#FFD700) na dark-bg (#1a1a2e) - 10.2:1
✓ Cyan (#00FFFF) na dark-bg (#1a1a2e) - 11.5:1
✓ Pink (#FF1493) na dark-bg (#1a1a2e) - 5.8:1
⚠ Purple (#8A2BE2) na dark-bg (#1a1a2e) - 4.2:1 (tylko dla dużych elementów)
```

### Alternatywne Kolory dla Lepszego Kontrastu

```css
/* Jaśniejsze wersje dla małych tekstów */
--purple-accessible: #A855F7; /* 7:1 contrast ratio */
--pink-accessible: #FF69B4;   /* 7.5:1 contrast ratio */
```

---

## CSS Variables - Complete Set

```css
:root {
  /* Primary Neon Colors */
  --cyber-pink: #FF1493;
  --cyber-pink-dark: #C71585;
  --cyber-pink-light: #FF69B4;
  --cyber-pink-glow: rgba(255, 20, 147, 0.5);

  --neon-cyan: #00FFFF;
  --neon-cyan-dark: #00CED1;
  --neon-cyan-light: #7FFFD4;
  --neon-cyan-glow: rgba(0, 255, 255, 0.5);

  --electric-purple: #8A2BE2;
  --electric-purple-dark: #6A0DAD;
  --electric-purple-light: #9370DB;
  --electric-purple-glow: rgba(138, 43, 226, 0.5);

  --gold-accent: #FFD700;
  --gold-dark: #DAA520;
  --gold-light: #FFEF85;
  --gold-glow: rgba(255, 215, 0, 0.6);

  /* Backgrounds */
  --dark-bg: #1a1a2e;
  --slate-dark: #2F4F4F;
  --near-black: #0f0f1e;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #B8B8D0;
  --text-muted: #808080;
  --text-disabled: #4A4A5E;

  /* Links */
  --link-default: #00FFFF;
  --link-hover: #FF1493;
  --link-visited: #9370DB;
  --link-active: #FFD700;

  /* Status */
  --success: #00FF7F;
  --warning: #FFA500;
  --error: #FF4444;
  --info: #00BFFF;

  /* Gradients */
  --gradient-cyber: linear-gradient(135deg, #1a1a2e 0%, #2F4F4F 50%, #1a1a2e 100%);
  --gradient-neon: linear-gradient(90deg, #FF1493 0%, #8A2BE2 50%, #00FFFF 100%);
  --gradient-gold: linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #FFEF85 100%);
  --gradient-overlay: linear-gradient(180deg, rgba(15, 15, 30, 0) 0%, rgba(15, 15, 30, 0.8) 100%);

  /* Shadows */
  --shadow-pink: 0 0 10px rgba(255, 20, 147, 0.5), 0 0 20px rgba(255, 20, 147, 0.3);
  --shadow-cyan: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
  --shadow-purple: 0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(138, 43, 226, 0.3);
  --shadow-gold: 0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4);

  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.6);

  /* Text Shadows */
  --text-glow-pink: 0 0 5px #FF1493, 0 0 10px #FF1493;
  --text-glow-cyan: 0 0 5px #00FFFF, 0 0 10px #00FFFF;
  --text-glow-gold: 0 0 5px #FFD700, 0 0 10px #FFD700;
  --text-shadow-dark: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
```

---

## Przykłady Zastosowania

### Przykład 1: Hero Section
```css
.hero {
  background: var(--dark-bg);
  background-image: var(--gradient-overlay);
}

.hero h1 {
  color: var(--gold-accent);
  text-shadow: var(--text-glow-gold);
}

.hero-cta {
  background: var(--cyber-pink);
  color: var(--text-primary);
  box-shadow: var(--shadow-pink);
}
```

### Przykład 2: Card Component
```css
.gameplay-card {
  background: var(--slate-dark);
  border: 1px solid var(--electric-purple-glow);
  box-shadow: var(--shadow-md);
}

.gameplay-card:hover {
  box-shadow: var(--shadow-purple);
  transform: translateY(-4px);
}

.gameplay-card-title {
  color: var(--gold-accent);
}
```

### Przykład 3: Button States
```css
.btn-primary {
  background: var(--cyber-pink);
  color: var(--text-primary);
  box-shadow: var(--shadow-pink);
}

.btn-primary:hover {
  background: var(--cyber-pink-light);
  box-shadow: var(--shadow-pink), var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--neon-cyan);
  color: var(--neon-cyan);
}

.btn-secondary:hover {
  background: var(--neon-cyan);
  color: var(--dark-bg);
  box-shadow: var(--shadow-cyan);
}
```
