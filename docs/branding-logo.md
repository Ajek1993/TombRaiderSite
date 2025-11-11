# Logo i Branding - Strona Gamingowa Tomb Raider

## Koncepcja Logo

### Logo Główne - Wersja Podstawowa

#### Wariant 1: Text + Icon
```
┌────────────────────────────────────────┐
│                                        │
│    🏺  [Nick Siostry] GAMING          │
│    │   ━━━━━━━━━━━━━━━━━━━━━          │
│    │   TOMB RAIDER ADVENTURES          │
│    └─► Pixel Lara                     │
│                                        │
└────────────────────────────────────────┘
```

**Elementy:**
- Pixel art Lary Croft jako maskotka (8-bit style)
- Nick/nazwa kanału w retro gaming foncie
- Tagline: "Tomb Raider Adventures"
- Gold accent (#FFD700) dla głównego tekstu
- Neon cyan (#00FFFF) dla tagline

#### Wariant 2: Icon Only (Favicon/Social Media)
```
┌──────────┐
│  ╔════╗  │
│  ║ 🏺 ║  │
│  ║ LG ║  │  (LG = inicjały lub skrót nick'u)
│  ╚════╝  │
└──────────┘
```

**Zastosowanie:**
- Favicon 32x32, 16x16
- Social media profile pics
- Watermark na thumbnailach

#### Wariant 3: Horizontal Lockup
```
┌──────────────────────────────────────────────────┐
│  [Pixel Lara] │ [NICK] GAMING │ 🏺 TOMB RAIDER │
└──────────────────────────────────────────────────┘
```

**Zastosowanie:**
- Navigation bar
- Email headers
- Banners

---

## Logo Design Specifications

### Kolory Logo

#### Primary Version (Dark Background)
```css
/* Logo text */
--logo-primary: #FFD700;        /* Gold */
--logo-secondary: #00FFFF;      /* Cyan */
--logo-accent: #FF1493;         /* Pink */

/* Pixel art Lara */
--lara-skin: #F5C4A0;
--lara-hair: #8B4513;
--lara-outfit: #00A86B;         /* Classic teal */
--lara-pants: #654321;
--lara-outline: #000000;
```

#### Alternative Version (Light Background - if needed)
```css
--logo-primary-alt: #DAA520;    /* Darker gold */
--logo-secondary-alt: #0080FF;  /* Darker cyan */
--logo-accent-alt: #C71585;     /* Darker pink */
```

### Typografia Logo

#### Główny Text (Nick/Nazwa)
**Font Options:**
1. **Press Start 2P** (Google Fonts)
   - Pure retro gaming look
   - Excellent readability
   - Free license

2. **VT323** (Google Fonts)
   - Terminal/arcade style
   - Lighter weight
   - Great for headers

3. **Orbitron** (Google Fonts)
   - Futuristic/tech feel
   - Neo-gaming aesthetic
   - Multiple weights available

**Wybrany:** Press Start 2P
```css
font-family: 'Press Start 2P', cursive;
font-size: 32px;
color: #FFD700;
text-shadow: 0 0 10px #FFD700, 2px 2px 4px rgba(0,0,0,0.8);
letter-spacing: 2px;
```

#### Tagline
**Font:** VT323 lub Roboto Condensed
```css
font-family: 'VT323', monospace;
font-size: 16px;
color: #00FFFF;
text-shadow: 0 0 5px #00FFFF;
letter-spacing: 4px;
text-transform: uppercase;
```

### Rozmiary Logo

#### Desktop
- **Large:** 400px × 120px (header full)
- **Medium:** 300px × 90px (navigation)
- **Small:** 200px × 60px (footer)

#### Mobile
- **Medium:** 180px × 54px (navigation)
- **Icon:** 48px × 48px (collapsed menu)

#### Favicon
- **Standard:** 32×32, 16×16
- **Apple Touch:** 180×180
- **Android Chrome:** 192×192, 512×512

---

## Pixel Art Mascot - Lara Croft

### Pixel Art Specifications

#### Version 1: Standing Pose (16×16)
```
    ████
   █▓▓▓█
   ██▓██
   █████
  ███████
   ██ ██
   ██ ██
   ██ ██
```

#### Version 2: Action Pose (32×32)
```
      ████████
     █▓▓▓▓▓▓▓█
     ██▓▓▓▓▓██
    ███████████
   ██████████████
  ███  ███  ████
  ██   ███   ███
  ██   ███   ███
  ██   ███   ███
   ██  ███  ██
   ██       ██
  ██         ██
```

#### Version 3: Profile (64×64) - Detailed
- Full character sprite
- Dual pistols visible
- Dynamic pose (jumping/climbing)
- More color detail

### Color Palette - Pixel Lara
```css
:root {
  /* Skin */
  --pixel-skin-light: #F5C4A0;
  --pixel-skin-shadow: #D4A57A;

  /* Hair */
  --pixel-hair: #8B4513;
  --pixel-hair-highlight: #A0522D;

  /* Outfit (Classic Teal) */
  --pixel-outfit: #00A86B;
  --pixel-outfit-shadow: #008B5A;

  /* Pants (Brown) */
  --pixel-pants: #654321;
  --pixel-pants-shadow: #4A3319;

  /* Accessories */
  --pixel-belt: #8B7355;
  --pixel-gun: #696969;
  --pixel-boots: #3E2723;

  /* Outline */
  --pixel-outline: #000000;
}
```

### Animation States

#### Idle Animation (Loop)
1. Frame 1: Standing (0ms)
2. Frame 2: Slight bob up (500ms)
3. Frame 3: Standing (1000ms)
4. Frame 4: Slight bob down (1500ms)
5. Repeat

#### Hover Animation
1. Backflip rotation (360° in 0.6s)
2. Land with small bounce
3. Return to idle

#### Loading Animation
1. Running in place (4 frames loop)
2. Speed: 150ms per frame

---

## Branding Elements

### Icons & Symbols

#### Primary Icons (Pixel Art Style)
```
🏺 Artifact/Treasure
🗡️ Weapon/Action
🏛️ Temple/Tomb
🎮 Gaming/Controller
🔦 Exploration/Discovery
📜 Ancient Script
💎 Gem/Collectible
🎯 Target/Achievement
```

#### Custom Icon Set (to be created)
- Dual pistols (signature Lara weapon)
- Grappling hook
- Ancient key
- Compass
- Map scroll
- Health pack/medkit
- Torch/flame
- Stone door

### Patterns & Textures

#### Background Patterns

**Pattern 1: Ancient Hieroglyphs**
```css
background-image: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 10px,
  rgba(255, 215, 0, 0.05) 10px,
  rgba(255, 215, 0, 0.05) 20px
);
```

**Pattern 2: Pixel Grid**
```css
background-image:
  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
background-size: 20px 20px;
```

**Pattern 3: Neon Glow Lines**
- Animated scanning lines
- Cyberpunk aesthetic
- Subtle background movement

### Borders & Dividers

#### Style 1: Neon Border
```css
border: 2px solid transparent;
border-image: linear-gradient(90deg, #FF1493, #8A2BE2, #00FFFF) 1;
box-shadow: 0 0 10px rgba(255, 20, 147, 0.5);
```

#### Style 2: Ancient Stone
```css
border: 4px solid #8B7355;
border-style: ridge;
box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
```

#### Style 3: Pixel Art Frame
```
╔═══════════╗
║           ║
║  Content  ║
║           ║
╚═══════════╝
```

### Section Separators

#### Option 1: Artifact Separator
```
━━━━━━━━━━ 🏺 ━━━━━━━━━━
```

#### Option 2: Neon Line
```css
.separator {
  height: 2px;
  background: linear-gradient(90deg,
    transparent,
    #00FFFF 50%,
    transparent
  );
  box-shadow: 0 0 10px #00FFFF;
}
```

#### Option 3: Pixel Pattern
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

---

## Brand Guidelines

### Do's ✓

1. **Use approved color palette**
   - Stick to defined neon colors
   - Maintain gold as primary accent
   - Dark backgrounds always

2. **Maintain pixel art aesthetic**
   - Keep Lara sprite consistent
   - Use retro gaming fonts
   - Embrace 8-bit/16-bit style

3. **Apply neon effects consistently**
   - Glow on interactive elements
   - Subtle animations
   - Cyberpunk meets archaeology

4. **Keep Tomb Raider theme prominent**
   - Artifacts and treasure imagery
   - Adventure/exploration vibe
   - Strong female character representation

5. **Ensure readability**
   - High contrast text
   - Clear hierarchy
   - Accessible color combinations

### Don'ts ✗

1. **Don't use official TR assets**
   - No copyrighted logos
   - No game screenshots as primary branding
   - Create original pixel art only

2. **Don't overcomplicate**
   - Avoid too many effects at once
   - Keep animations subtle
   - Don't clutter the design

3. **Don't deviate from color palette**
   - No random neon colors
   - Maintain brand consistency
   - Follow accessibility guidelines

4. **Don't ignore mobile**
   - Always test responsive behavior
   - Simplify for small screens
   - Maintain brand recognition on all devices

5. **Don't forget the gaming roots**
   - Keep retro elements present
   - Honor gaming culture
   - Stay true to Tomb Raider spirit

---

## Logo Variations & Use Cases

### Primary Logo
**Use:** Main website header, about page, press kit
**Background:** Dark (#1a1a2e or #2F4F4F)
**Minimum size:** 200px width

### Secondary Logo (Icon + Text)
**Use:** Navigation bar, email signature, social banners
**Background:** Dark or transparent
**Minimum size:** 150px width

### Icon Only
**Use:** Favicon, social media avatars, watermarks
**Background:** Any (works on both light and dark)
**Minimum size:** 32px × 32px

### Monochrome Version
**Use:** Print materials, special cases, loading states
**Colors:** White or single neon color
**Background:** Dark

---

## Thumbnail Branding Template

### YouTube Thumbnail Standard
**Dimensions:** 1280×720 (16:9)
**Safe area:** 1120×630 (for mobile preview)

**Template Layout:**
```
┌────────────────────────────────────────┐
│  [Game Screenshot Background]          │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  [NICK] GAMING                   │ │ ← Top left
│  └──────────────────────────────────┘ │
│                                        │
│  ╔══════════════════════════════════╗ │
│  ║  TOMB RAIDER                     ║ │ ← Center
│  ║  Episode Title                   ║ │
│  ║  #15                             ║ │
│  ╚══════════════════════════════════╝ │
│                                        │
│  [Pixel Lara]  [Episode #]  [NEW!]    │ ← Bottom
└────────────────────────────────────────┘
```

**Text Styling:**
- Title: Press Start 2P, 64px, Gold with glow
- Episode: VT323, 48px, Cyan
- Badge: Pink background with white text

---

## Social Media Branding

### Profile Picture (All Platforms)
- **Version:** Icon only logo
- **Size:** 400×400 (scales down)
- **Style:** Pixel Lara with gold border
- **Background:** Dark or transparent

### Banner/Cover Photos

#### YouTube Channel Art (2560×1440)
```
┌──────────────────────────────────────────────────┐
│                                                  │
│        [Parallax Tomb Background]                │
│                                                  │
│     ╔════════════════════════════════╗          │
│     ║  [NICK] GAMING                 ║          │
│     ║  Tomb Raider Adventures        ║          │
│     ║  🎮 Nowe gameplay co [X]       ║          │
│     ║  🔴 Live na TikTok: [dni]     ║          │
│     ╚════════════════════════════════╝          │
│                                                  │
│  [YT] [TikTok] [Discord]  [Pixel Lara Animation]│
└──────────────────────────────────────────────────┘
```

#### Twitter/X Header (1500×500)
```
┌──────────────────────────────────────────────────┐
│  [Logo]     [NICK] GAMING                        │
│             Tomb Raider Adventures               │
│             🏺 Exploring tombs & sharing epic    │
│                gameplay moments!                 │
│                                     [Pixel Lara] │
└──────────────────────────────────────────────────┘
```

#### Discord Server Icon
- **Size:** 512×512
- **Style:** Pixel Lara close-up
- **Border:** Neon cyan glow

---

## Branded Assets Checklist

### Essential Files to Create

- [ ] Logo SVG (all variations)
- [ ] Logo PNG (transparent, various sizes)
- [ ] Favicon package (all sizes)
- [ ] Pixel Lara sprite sheet
- [ ] Social media profile pics
- [ ] Social media banners/covers
- [ ] YouTube thumbnail template (PSD/Figma)
- [ ] Email signature
- [ ] Watermark for videos
- [ ] Loading animation
- [ ] 404 page graphic
- [ ] About page hero image
- [ ] Pattern/texture files

### File Naming Convention
```
logo-primary-dark-bg.svg
logo-icon-only-512x512.png
pixel-lara-idle-32x32.png
social-youtube-banner-2560x1440.jpg
thumbnail-template-tomb-raider.psd
```

---

## Brand Voice & Messaging

### Tone
- **Enthusiastic:** Passionate about gaming and Tomb Raider
- **Adventurous:** Explorer mindset, discovery-focused
- **Friendly:** Approachable, community-oriented
- **Knowledgeable:** Expert on TR series, helpful tips
- **Authentic:** Genuine love for games, honest reactions

### Key Messages
1. "Exploring ancient tombs, one gameplay at a time"
2. "Join me on epic Tomb Raider adventures"
3. "Where retro gaming meets modern streaming"
4. "Lara Croft fan since [year], sharing the passion"
5. "Your guide through every secret and treasure"

### Hashtags
- #TombRaiderGameplay
- #LaraСroftAdventures
- #RetroGaming
- #NeoGaming
- #[NickSiostry]Gaming
- #GirlGamer (if applicable)
- #TombRaiderCommunity

---

## Implementation Notes

### CSS Custom Properties for Branding
```css
:root {
  /* Logo colors */
  --brand-gold: #FFD700;
  --brand-cyan: #00FFFF;
  --brand-pink: #FF1493;
  --brand-purple: #8A2BE2;

  /* Typography */
  --font-brand: 'Press Start 2P', cursive;
  --font-tagline: 'VT323', monospace;
  --font-body: 'Roboto', sans-serif;

  /* Branding spacing */
  --logo-padding: 20px;
  --brand-border-radius: 8px;

  /* Effects */
  --brand-glow: 0 0 10px currentColor;
  --brand-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}
```

### Logo Component (HTML)
```html
<div class="logo">
  <img src="/assets/images/pixel-lara.png" alt="Lara Croft Pixel Art" class="logo-icon">
  <div class="logo-text">
    <h1 class="logo-name">[NICK] GAMING</h1>
    <p class="logo-tagline">Tomb Raider Adventures</p>
  </div>
</div>
```

### Favicon Implementation
```html
<!-- In <head> -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

---

## Next Steps

1. Create pixel art Lara sprite (multiple poses)
2. Design logo variations in Figma/Illustrator
3. Generate favicon package
4. Create social media assets
5. Design YouTube thumbnail template
6. Prepare brand style guide PDF
7. Implement logo in website header

**Gotowe do implementacji w Fazie 3!**
