# Plan: Strona z Zagadką - Bramka do Bruxa Gaming

## Koncepcja Narracyjna 🏛️

**Scenariusz:**
> Wchodzisz do jaskini, w głębi widzisz duże drzwi, które są strzeżone przez trola strażnika.
> Gdy do niego podchodzisz, mówi, że przepuści Cię dalej, jeśli odpowiesz na jego 4 pytania.

**Klimat:** Tomb Raider adventure + RPG quest + Neo-gaming aesthetics

## Cel
Stworzyć immersyjną stronę HTML z narracyjną zagadką (Troll Strażnik + 4 pytania), która po prawidłowych odpowiedziach przekieruje użytkownika na główną stronę Bruxa Gaming.

---

## Specyfikacja Techniczna

### Stack
- **HTML5** - struktura strony
- **CSS** (inline lub external) - stylowanie zgodne z motywem Bruxa Gaming
- **Vanilla JavaScript** - logika zagadki i przekierowanie

### Pliki do stworzenia
```
/zagadka/
  ├── index.html       (główny plik z HTML, CSS, JS)
  └── (opcjonalnie) style.css
```

---

## Design & Kolorystyka

### Paleta kolorów (z głównej strony)
```css
--cyber-pink: #FF1493
--neon-cyan: #00FFFF
--electric-purple: #8A2BE2
--gold-accent: #FFD700
--dark-bg: #1a1a2e
--near-black: #0f0f1e
--text-primary: #FFFFFF
--text-secondary: #B8B8D0
```

### Fonty (Google Fonts)
```
- Press Start 2P (pixel heading)
- VT323 (monospace subheading)
- Roboto (body text)
```

### Layout - Narracyjny Design
```
┌──────────────────────────────────────────┐
│        [CIEMNE TŁO - JASKINIA]          │
│                                          │
│         🏛️  [DUŻE DRZWI SVG]  🏛️        │
│                                          │
│       👹 STRAŻNIK TROLU PRZEMAWIA:      │
│                                          │
│  "Wchodzisz do jaskini, w głębi widzisz │
│   duże drzwi. Gdy podchodzisz, słyszysz │
│   głęboki głos:                          │
│                                          │
│   'Przepuszczę Cię dalej, jeśli         │
│    odpowiesz na moje 4 pytania...'"     │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│  ❓ PYTANIE 1:                          │
│  [Treść pytania 1]                      │
│  ┌────────────────────────────┐        │
│  │  [Input]                   │        │
│  └────────────────────────────┘        │
│                                          │
│  ❓ PYTANIE 2:                          │
│  [Treść pytania 2]                      │
│  ┌────────────────────────────┐        │
│  │  [Input]                   │        │
│  └────────────────────────────┘        │
│                                          │
│  ❓ PYTANIE 3:                          │
│  [Treść pytania 3]                      │
│  ┌────────────────────────────┐        │
│  │  [Input]                   │        │
│  └────────────────────────────┘        │
│                                          │
│  ❓ PYTANIE 4:                          │
│  [Treść pytania 4]                      │
│  ┌────────────────────────────┐        │
│  │  [Input]                   │        │
│  └────────────────────────────┘        │
│                                          │
│     [⚔️ ODPOWIEDZ STRAŻNIKOWI ⚔️]      │
│                                          │
│     [Komunikat: X/4 poprawnych]         │
│                                          │
│        [Animacja: Drzwi się otwierają]  │
│                                          │
└──────────────────────────────────────────┘
```

### Elementy Narracyjne
- **Intro text** - narracja o jaskini i trolu
- **Dialog box** - mowa trola (neonowy border, ciemne tło)
- **Cave atmosphere** - ciemne gradienty, kamienne tekstury (CSS)
- **Door visual** - SVG/emoji duże drzwi na górze
- **Troll character** - emoji 👹 lub ASCII art
- **Quest feel** - numeracja pytań jak w grze RPG

---

## 4 Pytania od Strażnika Trola 👹

**WYBRANY ZESTAW - Final Challenge:**

### Pytanie 1 (Łatwe - Historia)
**Narracja Trola:** *"Pierwsze pytanie, podróżniku... Kiedy narodziła się legenda Lary Croft?"*

```
W którym roku powstał pierwszy Tomb Raider?
```
**Odpowiedź:** `1996`
**Akceptowane warianty:** `1996`

---

### Pytanie 2 (Średnie - Antagoniści)
**Narracja Trola:** *"Dobrze... A teraz powiedz mi, kto próbował uwolnić smoka w Chinach?"*

```
Jak nazywa się główny antagonista w Tomb Raider 2?
```
**Odpowiedź:** `Marco Bartoli`
**Akceptowane warianty:** `marco bartoli`, `bartoli`, `marco` (case-insensitive)

---

### Pytanie 3 (Średnie - Geografia)
**Narracja Trola:** *"Hmmm, nieźle... Gdzie zaczęła się pierwsza przygoda Lary?"*

```
Jak nazywa się pierwszy poziom w Tomb Raider 1?
(Podpowiedź: Góry Peru)
```
**Odpowiedź:** `Caves` / `The Caves` / `Jaskinie`
**Akceptowane warianty:** `caves`, `the caves`, `jaskinie` (case-insensitive)

---

### Pytanie 4 (Trudne - Szczegóły)
**Narracja Trola:** *"I ostatnie pytanie dla prawdziwych poszukiwaczy przygód..."*

```
Ile sekretów można znaleźć ŁĄCZNIE w Peru?
(Peru = pierwsze 3 poziomy TR1)
```
**Odpowiedź:** `9`
**Akceptowane warianty:** `9`, `dziewięć`, `dziewiec` (case-insensitive)
**Wyjaśnienie:** Caves (3), City of Vilcabamba (3), Lost Valley (3)

---

## Funkcjonalności

### JavaScript - Logika
1. **Sprawdzanie 4 odpowiedzi jednocześnie:**
   - Każde pytanie ma zdefiniowaną tablicę akceptowanych odpowiedzi
   - Porównanie case-insensitive z trim()
   - Obsługa różnych wariantów (np. "marco", "bartoli", "marco bartoli")
   - WSZYSTKIE 4 odpowiedzi muszą być poprawne, aby otworzyć drzwi

2. **Walidacja per pytanie:**
   ```javascript
   const answers = {
     q1: ['1996'],
     q2: ['marco bartoli', 'bartoli', 'marco'],
     q3: ['caves', 'the caves', 'jaskinie'],
     q4: ['9', 'dziewięć', 'dziewiec']
   };

   function checkAnswers() {
     const input1 = document.getElementById('answer1').value.toLowerCase().trim();
     const input2 = document.getElementById('answer2').value.toLowerCase().trim();
     const input3 = document.getElementById('answer3').value.toLowerCase().trim();
     const input4 = document.getElementById('answer4').value.toLowerCase().trim();

     const correct1 = answers.q1.includes(input1);
     const correct2 = answers.q2.includes(input2);
     const correct3 = answers.q3.includes(input3);
     const correct4 = answers.q4.includes(input4);

     if (correct1 && correct2 && correct3 && correct4) {
       // Sukces - Troll przepuszcza, drzwi się otwierają!
       showSuccess();
     } else {
       // Błąd - Troll kręci głową
       showErrors(correct1, correct2, correct3, correct4);
     }
   }
   ```

3. **Feedback wizualny dla każdego inputa:**
   - ✅ Zielony border + checkmark dla poprawnych
   - ❌ Czerwony border + X dla błędnych
   - Shake animation dla błędnych pól
   - Komunikat: "X/4 poprawnych odpowiedzi"
   - Narracja trola: "Nie... spróbuj jeszcze raz, podróżniku."

4. **Przekierowanie po sukcesie:**
   ```javascript
   // Po wszystkich 4 poprawnych odpowiedziach
   showSuccessMessage(); // "Drzwi się otwierają..."
   setTimeout(() => {
     window.location.href = 'https://bruxagaming.vercel.app';
   }, 3000); // 3s delay - animacja otwierania drzwi
   ```

5. **Success Celebration - Narracyjna:**
   - Neonowy "glow" effect na wszystkich inputach
   - Narracja trola: *"Dobrze ci poszło, podróżniku... Możesz przejść."*
   - Komunikat: "🏛️ DRZWI SIĘ OTWIERAJĄ... 🏛️"
   - Animacja: Drzwi rozchylają się (opcjonalnie fade out)
   - Sound effect: rumble/kamienie (opcjonalnie)

---

## Animacje & Efekty

### CSS Effects - Atmosphere & Feedback

1. **Cave Background - Gradient Animation:**
   ```css
   background: linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%);
   background-size: 100% 200%;
   animation: cave-ambience 10s ease infinite;

   @keyframes cave-ambience {
     0%, 100% { background-position: 0% 0%; }
     50% { background-position: 0% 100%; }
   }
   ```

2. **Door Visual - Pulse:**
   ```css
   @keyframes door-pulse {
     0%, 100% { opacity: 0.8; transform: scale(1); }
     50% { opacity: 1; transform: scale(1.02); }
   }
   ```

3. **Input Focus - Neon Glow:**
   ```css
   box-shadow: 0 0 20px var(--neon-cyan), 0 0 40px rgba(0, 255, 255, 0.3);
   border: 2px solid var(--neon-cyan);
   transition: all 0.3s ease;
   ```

4. **Button Hover - Epic Effect:**
   ```css
   transform: translateY(-3px);
   box-shadow: 0 0 30px var(--cyber-pink), 0 0 60px rgba(255, 20, 147, 0.4);
   ```

5. **Success Animation - Door Opening:**
   ```css
   @keyframes door-opening {
     0% { transform: scaleX(1); opacity: 1; }
     100% { transform: scaleX(0); opacity: 0; }
   }

   @keyframes success-glow {
     0%, 100% { box-shadow: 0 0 15px #00FF7F; }
     50% { box-shadow: 0 0 40px #00FF7F; }
   }
   ```

6. **Error Shake - Troll Says No:**
   ```css
   @keyframes shake {
     0%, 100% { transform: translateX(0); }
     25% { transform: translateX(-10px); }
     50% { transform: translateX(10px); }
     75% { transform: translateX(-5px); }
   }

   @keyframes troll-head-shake {
     0%, 100% { transform: rotate(0deg); }
     25% { transform: rotate(-5deg); }
     75% { transform: rotate(5deg); }
   }
   ```

7. **Typewriter Effect (opcjonalnie dla narracji):**
   ```css
   @keyframes typewriter {
     from { width: 0; }
     to { width: 100%; }
   }
   ```

---

## Responsive Design

### Breakpoints
```css
/* Mobile: < 768px */
- Font size: 16px → 14px
- Padding: reduced
- Input width: 100%

/* Desktop: > 768px */
- Max-width container: 600px
- Centered layout
```

---

## Wdrożenie - Kroki

1. ✅ Stworzenie `index.html` z pełną strukturą
2. ✅ Dodanie inline CSS (lub external `style.css`)
3. ✅ Implementacja JavaScript dla zagadki
4. ✅ Dodanie animacji i efektów
5. ✅ Testowanie różnych odpowiedzi
6. ✅ Sprawdzenie responsywności (mobile/desktop)
7. ✅ Deploy w docelowej lokalizacji

---

## Dodatkowe Pomysły

### Możliwe Rozszerzenia
- **Wynik częściowy** - "2/3 poprawnych odpowiedzi" po każdej próbie
- **Licznik prób** - po 3 błędnych próbach pokazać podpowiedzi
- **Wizualne checkmarki** - ✅ ❌ obok każdego pytania
- **Progress indicator** - "Pytanie 1/3", "2/3", "3/3"
- **Hint system** - przycisk "Podpowiedź" dla każdego pytania
- **Timer challenge** - czas na rozwiązanie wszystkich pytań (opcjonalnie)
- **Leaderboard** - najszybsze czasy (wymaga backendu)
- **Easter egg** - sekretny kod debugowania (np. "konami code")

### Pixel Art
- Użycie emoji lub prostej grafiki SVG jako "Lara pixel art"
- Animacja float dla ikony (jak na głównej stronie)

---

## Podsumowanie - Final Design

**ZATWIERDZONE 4 Pytania od Strażnika Trola:**
1. ✅ W którym roku powstał pierwszy Tomb Raider? → `1996`
2. ✅ Główny antagonista TR2? → `Marco Bartoli`
3. ✅ Pierwszy poziom TR1? → `Caves/Jaskinie`
4. ✅ Ile sekretów w Peru (3 poziomy)? → `9`

**Layout:** Narracyjna strona z immersją:
- 🏛️ Duże drzwi na górze strony (SVG/emoji)
- 👹 Strażnik trolu z dialogiem
- 4 pytania pod sobą, każde z własnym inputem
- Mocne neonowe akcenty (cyan/pink/gold)
- Animowane tło jaskini (#0f0f1e → #1a1a2e)
- Feedback wizualny per pytanie (✅/❌)
- Narracyjne komunikaty trola
- Animacja otwierania drzwi po sukcesie

**Flow:**
1. User wchodzi → Intro narracji o jaskini
2. Troll przedstawia się i zadaje 4 pytania
3. User odpowiada na wszystkie pytania
4. Klik "Odpowiedz Strażnikowi"
5. Walidacja → Feedback (X/4 poprawnych)
6. Sukces → "Drzwi się otwierają..." → Przekierowanie (3s)

---

## Gotowe do Implementacji

**Czy mam stworzyć gotowy `index.html`?**

Potrzebuję jeszcze informacji:
1. ✅ Pytania zatwierdzone
2. Czy standalone `index.html` czy w folderze `/zagadka/`?
3. Czy chcesz typewriter effect dla narracji? (tekst pojawia się litera po literze)
4. Czy dodać sound effects? (rumble przy otwieraniu drzwi)
5. URL przekierowania: `https://bruxagaming.vercel.app` ✅
