# Mapa Witryny - Strona Gamingowa Tomb Raider

## Struktura Główna

### 1. Strona Główna (Home)
**Ścieżka:** `/index.html`

**Sekcje:**
- Hero Section z trailerem/najlepszym gameplay'em Tomb Raider
- Intro/Powitanie z opisem kanału
- Najnowsze gameplay'e (ostatnie 3-4 filmy)
- Highlights - najlepsze momenty
- Call-to-action: Subskrybuj kanał
- Social media links

**Elementy interaktywne:**
- Animowane tło z pixel art Lary Croft
- Neonowe efekty
- Losowy gameplay widget

---

### 2. Gameplay'e (Gameplays)
**Ścieżka:** `/gameplays.html`

**Kategorie gier:**
- **Tomb Raider** (gra przewodnia - główna kategoria)
  - Tomb Raider I-III Remastered
  - Tomb Raider (2013)
  - Rise of the Tomb Raider
  - Shadow of the Tomb Raider
  - Klasyczne wersje TR
- **Inne Gry** (dodatkowe kategorie)
  - Gry akcji/przygodowe
  - Gry indie
  - Retro games

**Funkcjonalności:**
- Filtrowanie po grze/kategorii
- Siatka embedów YouTube
- Opis każdego gameplay'u
- Data publikacji
- Czas trwania

---

### 3. Highlights (Najlepsze Momenty)
**Ścieżka:** `/highlights.html`

**Zawartość:**
- Kolekcja najlepszych/najzabawniejszych momentów z gier
- Skróty epickich achievementów
- Funny moments
- Boss fights
- Niesamowite odkrycia w grach

**Układ:**
- Grid layout z thumbnailami
- Krótkie embeddy YouTube (shorty/klipy)
- Opisy co się dzieje w klipie

---

### 4. Galeria (Gallery)
**Ścieżka:** `/gallery.html`

**Zawartość:**
- Screenshoty z rozgrywki
- Fan art Tomb Raider
- Easter eggs odkryte w grach
- Behind the scenes z nagrywania

**Układ:**
- Responsywna galeria obrazów
- Lightbox do powiększania
- Kategorie: Screenshots, Fan Art, Discoveries

---

### 5. Zapowiedzi (Announcements)
**Ścieżka:** `/announcements.html`

**Zawartość:**
- Zapowiedzi nadchodzących streamów na TikTok
- Nowe serie gameplay'ów
- Specjalne eventy
- Q&A sessions

**Funkcjonalności:**
- Lista zapowiedzi z datami
- Linki do TikTok live
- Countdown timer do najbliższego streamu
- Miejsce przygotowane pod przyszłe komentarze (ukryte na razie)

---

### 6. Social Media
**Ścieżka:** Linki zewnętrzne w nawigacji/stopce

**Platformy:**
- YouTube (główny kanał)
- TikTok (streamy live)
- Discord (społeczność)
- Instagram (opcjonalnie)
- Twitter/X (opcjonalnie)

**Implementacja:**
- Stylizowane ikony z neonowym hover effectem
- Bezpośrednie linki do profili
- Widget z najnowszymi postami (opcjonalnie)

---

### 7. O Mnie (About)
**Ścieżka:** `/about.html`

**Zawartość:**
- Kim jest streamerka
- Historia z grami (szczególnie Tomb Raider)
- Dlaczego gaming
- Ulubione gry
- Setup do nagrywania

**Elementy:**
- Zdjęcie/avatar
- Krótka bio
- Statystyki kanału (subscriber count)
- Osiągnięcia/milestones

---

## Nawigacja Globalna

**Menu główne (sticky navigation):**
```
[LOGO] | Home | Gameplay'e | Highlights | Galeria | Zapowiedzi | O Mnie
                                                    [Social Icons]
```

**Stopka (Footer):**
- Linki do wszystkich sekcji
- Social media icons
- Copyright
- Polityka prywatności (jeśli potrzebna)
- Kontakt

---

## Dodatkowe Funkcje/Gadżety

### Gaming Widgets:
1. **Random Gameplay Picker**
   - Przycisk "Losowy gameplay"
   - Otwiera losowy film z kanału

2. **Subscriber Counter**
   - Live licznik subskrybentów YouTube
   - Integracja przez YouTube API

3. **Latest Upload Notification**
   - Badge z "NEW!" przy najnowszym filmie
   - Auto-update przy nowym uploadzie

4. **Tomb Raider Quote Generator**
   - Losowe cytaty Lary Croft
   - Easter egg element

---

## Responsywność

**Breakpointy:**
- Mobile: < 768px (hamburger menu, single column)
- Tablet: 768px - 1024px (2 kolumny)
- Desktop: > 1024px (pełny layout, 3-4 kolumny)

---

## Branding i Tematyka

**Główny motyw:** Tomb Raider + Neo-Gaming Aesthetic

**Elementy wizualne:**
- Pixel art Lary Croft jako maskotka
- Neonowe akcenty w kolorach cyber pink, cyan, purple
- Ciemne tło z subtelnymi gradientami
- Animacje inspirowane retro gamingiem
- Glitch effects na hover
- Parallax scrolling z elementami z gier

**Typografia:**
- Nagłówki: Retro gaming font (np. Press Start 2P, VT323)
- Treść: Czytelny sans-serif (Roboto, Open Sans)

---

## Przyszłe rozszerzenia (Faza 8)

- System komentarzy pod zapowiedziami
- Newsletter (jeśli siostra zmieni zdanie)
- Live chat widget podczas streamów TikTok
- Sekcja z recenzjami gier
- Blog z poradnikami do Tomb Raider
- Konkursy dla społeczności
- Marketplace z merchendise (fan-made)
