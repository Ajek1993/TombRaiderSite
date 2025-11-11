# Animacje i Efekty Interaktywne - Strona Gamingowa Tomb Raider

## Filozofia Animacji

### Zasady Projektowe
1. **Subtle but Impactful** - Animacje powinny wzmacniać UX, nie przeszkadzać
2. **Performance First** - Priorytet dla 60fps na wszystkich urządzeniach
3. **Purposeful Motion** - Każda animacja ma cel funkcjonalny
4. **Gaming Aesthetic** - Retro + cyber + adventure vibes
5. **Accessibility** - Respektowanie prefers-reduced-motion

---

## 1. Parallax Scrolling

### Hero Section Parallax

**Koncepcja:** Wielowarstwowe tło przedstawiające głębię grobowca

**Warstwy (od przodu do tyłu):**
```
Layer 1 (Foreground): Portal/Wejście do grobowca - scroll speed: 0.8
Layer 2 (Midground): Kolumny i ruiny - scroll speed: 0.5
Layer 3 (Background): Góry/dżungla - scroll speed: 0.2
Layer 4 (Deep BG): Niebo/mgła - scroll speed: 0.1
```

**Implementacja CSS:**
```css
.parallax-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

.parallax-layer-1 {
  z-index: 4;
  background-image: url('/assets/images/parallax-foreground.png');
}

.parallax-layer-2 {
  z-index: 3;
  background-image: url('/assets/images/parallax-midground.png');
}

.parallax-layer-3 {
  z-index: 2;
  background-image: url('/assets/images/parallax-background.png');
}

.parallax-layer-4 {
  z-index: 1;
  background-image: url('/assets/images/parallax-sky.png');
}
```

**JavaScript:**
```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  document.querySelector('.parallax-layer-1').style.transform =
    `translateY(${scrolled * 0.8}px)`;
  document.querySelector('.parallax-layer-2').style.transform =
    `translateY(${scrolled * 0.5}px)`;
  document.querySelector('.parallax-layer-3').style.transform =
    `translateY(${scrolled * 0.2}px)`;
  document.querySelector('.parallax-layer-4').style.transform =
    `translateY(${scrolled * 0.1}px)`;
});
```

**Performance Optimization:**
```javascript
// Throttle scroll events
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});
```

---

## 2. Hover Effects

### Card Hover Effect

**Effect:** Elevation + Glow + Scale

```css
.gameplay-card {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.gameplay-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(138, 43, 226, 0.5);
}

/* Neon border animation on hover */
.gameplay-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(90deg, #FF1493, #8A2BE2, #00FFFF);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.gameplay-card:hover::before {
  opacity: 1;
  animation: neon-border-rotate 2s linear infinite;
}

@keyframes neon-border-rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
```

### Button Hover Effects

**Primary Button:**
```css
.btn-primary {
  position: relative;
  padding: 12px 32px;
  font-family: var(--font-subheading);
  font-size: 18px;
  background: var(--cyber-pink);
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 20, 147, 0.5);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow:
    0 0 20px rgba(255, 20, 147, 0.8),
    0 0 40px rgba(255, 20, 147, 0.4);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

**Secondary Button (Outline):**
```css
.btn-secondary {
  padding: 12px 32px;
  background: transparent;
  color: var(--neon-cyan);
  border: 2px solid var(--neon-cyan);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--neon-cyan);
  transition: left 0.3s ease;
  z-index: -1;
}

.btn-secondary:hover::before {
  left: 0;
}

.btn-secondary:hover {
  color: var(--dark-bg);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
}
```

### Link Hover Effect

```css
.nav-link {
  position: relative;
  color: var(--neon-cyan);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--cyber-pink);
  box-shadow: 0 0 10px var(--cyber-pink);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--cyber-pink);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active::after {
  width: 100%;
  background: var(--gold-accent);
  box-shadow: 0 0 10px var(--gold-accent);
}
```

---

## 3. Neonowe Podświetlenia

### Pulsating Glow

```css
.neon-glow {
  animation: neon-pulse 2s ease-in-out infinite;
}

@keyframes neon-pulse {
  0%, 100% {
    box-shadow:
      0 0 10px rgba(0, 255, 255, 0.5),
      0 0 20px rgba(0, 255, 255, 0.3),
      0 0 30px rgba(0, 255, 255, 0.1);
  }
  50% {
    box-shadow:
      0 0 20px rgba(0, 255, 255, 0.8),
      0 0 40px rgba(0, 255, 255, 0.5),
      0 0 60px rgba(0, 255, 255, 0.3);
  }
}
```

### Neon Border Animation

```css
.neon-border {
  position: relative;
  border: 2px solid transparent;
}

.neon-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    #FF1493, #8A2BE2, #00FFFF, #FF1493
  );
  background-size: 400%;
  border-radius: inherit;
  opacity: 0.7;
  animation: neon-border-flow 3s linear infinite;
  z-index: -1;
}

@keyframes neon-border-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

### Flickering Neon Sign

```css
.neon-flicker {
  animation: neon-flicker 4s infinite;
}

@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
    text-shadow:
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan),
      0 0 30px var(--neon-cyan);
  }
  20%, 24%, 55% {
    opacity: 0.5;
    text-shadow: none;
  }
}
```

---

## 4. Glitch Effects

### Text Glitch

```css
.glitch {
  position: relative;
  color: var(--neon-cyan);
  font-family: var(--font-heading);
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 var(--cyber-pink);
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim-1 3s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 var(--electric-purple);
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% {
    clip: rect(89px, 9999px, 83px, 0);
  }
  5% {
    clip: rect(29px, 9999px, 41px, 0);
  }
  10% {
    clip: rect(65px, 9999px, 18px, 0);
  }
  /* ... more keyframes for randomness */
  100% {
    clip: rect(72px, 9999px, 36px, 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    clip: rect(31px, 9999px, 94px, 0);
  }
  5% {
    clip: rect(78px, 9999px, 23px, 0);
  }
  10% {
    clip: rect(12px, 9999px, 67px, 0);
  }
  /* ... more keyframes */
  100% {
    clip: rect(45px, 9999px, 89px, 0);
  }
}
```

### Image Glitch Effect

```css
.glitch-image {
  position: relative;
  overflow: hidden;
}

.glitch-image::before,
.glitch-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  opacity: 0;
}

.glitch-image:hover::before {
  animation: glitch-img-1 0.3s infinite;
  opacity: 1;
  mix-blend-mode: screen;
}

.glitch-image:hover::after {
  animation: glitch-img-2 0.3s infinite;
  opacity: 1;
  mix-blend-mode: screen;
}

@keyframes glitch-img-1 {
  0%, 100% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  33% {
    transform: translate(-5px, 5px);
    filter: hue-rotate(90deg);
  }
  66% {
    transform: translate(5px, -5px);
    filter: hue-rotate(180deg);
  }
}

@keyframes glitch-img-2 {
  0%, 100% {
    transform: translate(0);
  }
  33% {
    transform: translate(5px, -5px);
  }
  66% {
    transform: translate(-5px, 5px);
  }
}
```

---

## 5. Loading Animations

### Pixel Lara Running

```css
.loading-lara {
  width: 64px;
  height: 64px;
  background-image: url('/assets/images/lara-sprite-sheet.png');
  background-size: 256px 64px; /* 4 frames */
  animation: lara-run 0.6s steps(4) infinite;
}

@keyframes lara-run {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -256px 0;
  }
}
```

### Rotating Artifact

```css
.loading-artifact {
  width: 64px;
  height: 64px;
  background: url('/assets/images/artifact-icon.png') no-repeat center;
  background-size: contain;
  animation: rotate-artifact 2s linear infinite;
  filter: drop-shadow(0 0 10px var(--gold-accent));
}

@keyframes rotate-artifact {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
```

### Progress Bar (Health Bar Style)

```css
.progress-bar {
  width: 100%;
  height: 24px;
  background: var(--dark-bg);
  border: 2px solid var(--gold-accent);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg,
    var(--gold-accent) 0%,
    var(--gold-light) 50%,
    var(--gold-accent) 100%
  );
  background-size: 200% 100%;
  width: 0;
  transition: width 0.5s ease;
  animation: progress-shimmer 2s linear infinite;
  box-shadow:
    0 0 10px var(--gold-glow),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
}

@keyframes progress-shimmer {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

/* Animated segments (retro game style) */
.progress-bar-segments {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 19px,
    rgba(0, 0, 0, 0.3) 19px,
    rgba(0, 0, 0, 0.3) 20px
  );
}
```

### Spinner Loading

```css
.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(0, 255, 255, 0.2);
  border-top: 4px solid var(--neon-cyan);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

---

## 6. Page Transition Effects

### Fade In on Load

```css
.page-content {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Section Reveal (Scroll Animation)

```css
.section-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

**JavaScript (Intersection Observer):**
```javascript
const sections = document.querySelectorAll('.section-reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
  observer.observe(section);
});
```

### Page Transition (Between Pages)

```css
.page-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-bg);
  z-index: 9999;
  pointer-events: none;
}

.page-transition.active {
  animation: pageSlide 0.6s ease-in-out;
}

@keyframes pageSlide {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
```

---

## 7. Particle Effects

### Floating Particles (Dust/Sparkles)

```css
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gold-accent);
  border-radius: 50%;
  opacity: 0.6;
  animation: float-particle 10s infinite;
  box-shadow: 0 0 6px var(--gold-glow);
}

@keyframes float-particle {
  0% {
    transform: translateY(100vh) translateX(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) translateX(100px) scale(1);
    opacity: 0;
  }
}

/* Generate multiple particles with different delays */
.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 25%; animation-delay: 2s; }
.particle:nth-child(3) { left: 40%; animation-delay: 4s; }
.particle:nth-child(4) { left: 55%; animation-delay: 1s; }
.particle:nth-child(5) { left: 70%; animation-delay: 3s; }
.particle:nth-child(6) { left: 85%; animation-delay: 5s; }
```

### Torch Flame Effect

```css
.torch-flame {
  width: 30px;
  height: 40px;
  background: linear-gradient(
    to top,
    var(--gold-accent) 0%,
    rgba(255, 165, 0, 0.8) 50%,
    transparent 100%
  );
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: flame-flicker 0.3s infinite alternate;
  box-shadow:
    0 0 20px var(--gold-accent),
    0 0 40px rgba(255, 165, 0, 0.5);
}

@keyframes flame-flicker {
  0% {
    transform: scale(1, 1) translateY(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.05, 0.95) translateY(-2px);
    opacity: 0.9;
  }
  100% {
    transform: scale(0.95, 1.05) translateY(2px);
    opacity: 0.95;
  }
}
```

---

## 8. Interactive Element Animations

### Clickable Artifact

```css
.artifact-icon {
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 5px var(--gold-accent));
}

.artifact-icon:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 15px var(--gold-accent));
}

.artifact-icon:active {
  animation: artifact-collect 0.6s ease;
}

@keyframes artifact-collect {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}
```

### Badge Entrance Animation

```css
.badge-new {
  animation: badge-bounce 1s ease-out;
}

@keyframes badge-bounce {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  70% {
    transform: scale(0.9) rotate(-5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
```

### Countdown Timer Animation

```css
.countdown-digit {
  display: inline-block;
  font-family: var(--font-cyber);
  font-size: 48px;
  color: var(--gold-accent);
  text-shadow: var(--text-glow-gold);
  animation: digit-pulse 1s infinite;
}

@keyframes digit-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    color: var(--gold-light);
  }
}

.countdown-digit.changing {
  animation: digit-flip 0.6s ease-in-out;
}

@keyframes digit-flip {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  51% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
```

---

## 9. Navigation Animations

### Sticky Navigation Reveal

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(15, 15, 30, 0.95);
  backdrop-filter: blur(10px);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.navbar.scrolled {
  transform: translateY(0);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
```

### Hamburger Menu Animation

```css
.hamburger {
  width: 30px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: var(--neon-cyan);
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px var(--neon-cyan);
}

.hamburger-line:nth-child(1) {
  top: 0;
}

.hamburger-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-line:nth-child(3) {
  bottom: 0;
}

.hamburger.active .hamburger-line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}
```

### Mobile Menu Slide In

```css
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: var(--dark-bg);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu-item {
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu.open .mobile-menu-item {
  opacity: 1;
  transform: translateX(0);
}

.mobile-menu.open .mobile-menu-item:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.open .mobile-menu-item:nth-child(2) { transition-delay: 0.2s; }
.mobile-menu.open .mobile-menu-item:nth-child(3) { transition-delay: 0.3s; }
.mobile-menu.open .mobile-menu-item:nth-child(4) { transition-delay: 0.4s; }
```

---

## 10. Performance & Accessibility

### Prefers-Reduced-Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable parallax for motion-sensitive users */
  .parallax-layer {
    transform: none !important;
  }
}
```

### GPU Acceleration

```css
.accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Only apply will-change when needed */
.card:hover {
  will-change: transform;
}

.card {
  will-change: auto; /* Reset after animation */
}
```

### Lazy Load Animations

```javascript
// Only animate elements when they're visible
const animatedElements = document.querySelectorAll('[data-animate]');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      animationObserver.unobserve(entry.target); // Stop observing after animation
    }
  });
}, {
  threshold: 0.2
});

animatedElements.forEach(el => {
  animationObserver.observe(el);
});
```

---

## Summary - Animation Library

### Utworzone animacje:
✓ Parallax scrolling (4-layer depth)
✓ Card hover effects (elevation + glow)
✓ Button interactions (ripple + scale)
✓ Neon glow effects (pulse, border, flicker)
✓ Glitch effects (text + image)
✓ Loading animations (Lara sprite, artifact, progress bar)
✓ Page transitions (fade, slide, reveal)
✓ Particle effects (floating dust, torch flame)
✓ Interactive elements (artifacts, badges, countdown)
✓ Navigation animations (sticky reveal, mobile menu)

### Performance considerations:
✓ GPU acceleration (transform, opacity)
✓ RequestAnimationFrame for scroll
✓ Intersection Observer for visibility
✓ Prefers-reduced-motion support
✓ Will-change optimization

**Gotowe do implementacji w Fazie 3!**
