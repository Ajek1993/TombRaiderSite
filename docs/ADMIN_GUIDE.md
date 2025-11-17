# 📖 Instrukcja Panelu Admina - Zapowiedzi Streamów

## 🎯 Wprowadzenie

Ten dokument opisuje jak używać panelu admina do zarządzania zapowiedziami streamów na stronie **Bruxa Gaming**.

---

## 📋 Spis Treści

1. [Pierwsze Uruchomienie](#pierwsze-uruchomienie)
2. [Logowanie do Panelu](#logowanie-do-panelu)
3. [Dodawanie Nowej Zapowiedzi](#dodawanie-nowej-zapowiedzi)
4. [Edycja Zapowiedzi](#edycja-zapowiedzi)
5. [Zmiana Statusu](#zmiana-statusu)
6. [Usuwanie Zapowiedzi](#usuwanie-zapowiedzi)
7. [Najczęstsze Problemy](#najczęstsze-problemy)

---

## 🚀 Pierwsze Uruchomienie

### Wymagania

Aby panel admina działał poprawnie, potrzebna jest konfiguracja Google Sheets API. **Arek pomoże Ci z tym!**

### Dostęp do Panelu

Panel admina jest dostępny pod adresem:

```
https://[twoja-domena]/admin/announcements.html
```

### Pierwsze Logowanie

1. Wejdź na stronę panelu admina
2. Wprowadź hasło admina (ustawione w zmiennej środowiskowej `ADMIN_PASSWORD`)
3. Kliknij **"Zaloguj się"**

🔒 **Uwaga**: Hasło jest zapisywane lokalnie w przeglądarce - jeśli wyczyścisz ciasteczka, będziesz musiała zalogować się ponownie.

---

## 🔐 Logowanie do Panelu

![Login Screen](../assets/images/admin-login.png)

1. Otwórz panel admina w przeglądarce
2. Wpisz hasło admina
3. Naciśnij Enter lub kliknij przycisk "Zaloguj się"

### Wylogowanie

Aby się wylogować, kliknij przycisk **"Wyloguj"** w prawym górnym rogu.

---

## ➕ Dodawanie Nowej Zapowiedzi

### Krok po kroku:

1. **Wypełnij formularz** na górze strony:

   #### Tytuł Streamu ⭐ (Wymagane)
   - Nazwa streamu, np. "Rise of Tomb Raider - Episode 23"
   - Pojawi się jako główny nagłówek

   #### Opis Streamu
   - Krótki opis co będzie na streamie
   - Np. "Eksploracja Syberyjskich Ruin - Kontynuujemy naszą przygodę..."

   #### Data Streamu ⭐ (Wymagane)
   - Wybierz datę z kalendarza
   - Format: RRRR-MM-DD (np. 2025-11-16)

   #### Godzina Streamu ⭐ (Wymagane)
   - Wybierz godzinę rozpoczęcia
   - Format: HH:MM (np. 12:00)

   #### Platforma
   - Wybierz z listy: TikTok, YouTube, lub Twitch
   - Domyślnie: TikTok

   #### Link do Streamu
   - Pełny URL do streamu (opcjonalnie)
   - Np. https://www.tiktok.com/@xbruksiax/live

   #### Funkcje/Atrakcje Streamu
   - Lista punktów co będzie na streamie
   - **Każda funkcja w nowej linii!**
   - Przykład:
     ```
     Kontynuacja głównej fabuły
     Eksploracja opcjonalnych grobowców
     Q&A z widzami
     Giveaway dla społeczności!
     ```

   #### Status
   - **Zaplanowany**: Stream jeszcze się nie odbył (domyślnie)
   - **Na Żywo**: Stream trwa w tej chwili
   - **Zakończony**: Stream się skończył

   #### URL Miniatury (opcjonalnie)
   - Link do obrazka miniaturki streamu

2. **Kliknij "Dodaj Zapowiedź"**

3. **Sprawdź komunikat**:
   - ✅ Zielony = Sukces!
   - ❌ Czerwony = Błąd (sprawdź czy wypełniłaś wszystkie wymagane pola)

4. **Zobaczysz nową zapowiedź** w tabeli poniżej

---

## ✏️ Edycja Zapowiedzi

### Jak edytować istniejącą zapowiedź:

1. **Znajdź zapowiedź** w tabeli na dole strony
2. **Kliknij przycisk "Edytuj"**
3. Formularz wypełni się danymi tej zapowiedzi
4. **Zmień** co chcesz
5. **Kliknij "Zapisz zmiany"**
6. **Gotowe!** Zmiany są widoczne od razu na stronie

### Anulowanie edycji:

Jeśli zmieniłaś zdanie, kliknij **"Anuluj edycję"** - formularz się wyczyści.

---

## 🔄 Zmiana Statusu

Najszybszy sposób na zmianę statusu zapowiedzi:

1. **Znajdź zapowiedź** w tabeli
2. **Kliknij przycisk "Status"**
3. Status zmieni się automatycznie:
   - Zaplanowany → Na Żywo → Zakończony → Zaplanowany...

### Kiedy zmieniać status?

- **Przed streamem**: Zaplanowany
- **Podczas streamu**: Na Żywo (wyświetli się czerwony pulsujący badge "LIVE NOW!")
- **Po streamie**: Zakończony (zapowiedź przeniesie się do archiwum)

---

## 🗑️ Usuwanie Zapowiedzi

### Jak usunąć zapowiedź:

1. **Znajdź zapowiedź** w tabeli
2. **Kliknij przycisk "Usuń"**
3. **Potwierdź** usunięcie w oknie dialogowym
4. Zapowiedź zniknie **na zawsze** (nie ma cofnięcia!)

⚠️ **Uwaga**: Usuń zapowiedź tylko jeśli stream został odwołany i nie chcesz go w archiwum.

---

## 🔍 Jak Wygląda to na Stronie?

### Nadchodzący Stream (Status: Zaplanowany)

- Wyświetla się w sekcji **"🔴 Nadchodzący Stream"** na stronie głównej
- Pokazuje **odliczanie czasu** do streamu
- Przycisk **"Link do TikTok"** prowadzi do Twojego profilu

### Stream Na Żywo (Status: Na Żywo)

- Badge zmienia się na **"LIVE NOW!"** (czerwony, pulsujący)
- Odliczanie znika
- Widoczne na górze strony głównej

### Zakończone Streamy (Status: Zakończony)

- Przenoszą się do sekcji **"📺 Poprzednie Streamy"**
- Wyświetlają się jako małe karty
- Maksymalnie 6 ostatnich streamów

---

## ⚠️ Najczęstsze Problemy

### Problem: "Błąd podczas ładowania zapowiedzi"

**Rozwiązanie**:
- Sprawdź połączenie z internetem
- Odśwież stronę (F5)
- Jeśli problem nie ustępuje, skontaktuj się z Arkiem

### Problem: "Validation Error: Title, date, and time are required"

**Rozwiązanie**:
- Upewnij się, że wypełniłaś wszystkie pola oznaczone gwiazdką (*)
- Tytuł, Data i Godzina są **wymagane**

### Problem: "Zapowiedź nie wyświetla się na stronie"

**Rozwiązanie**:
1. Sprawdź status zapowiedzi - czy to "Zaplanowany"?
2. Sprawdź datę - czy jest w przyszłości?
3. Odśwież stronę główną (Ctrl+F5)

### Problem: "Zapomniałam hasła"

**Rozwiązanie**:
- Skontaktuj się z Arkiem - on może zmienić hasło w kodzie

### Problem: "Odliczanie nie działa"

**Rozwiązanie**:
- Sprawdź czy data i godzina są poprawne
- Upewnij się, że data jest w przyszłości
- Odśwież stronę

---

## 💡 Wskazówki i Dobre Praktyki

### ✅ DO:

- **Dodawaj zapowiedzi z wyprzedzeniem** (3-7 dni przed streamem)
- **Sprawdzaj podgląd strony** przed streamem (przycisk "Podgląd strony")
- **Zmieniaj status na "Na Żywo"** gdy zaczynas stream
- **Zmieniaj status na "Zakończony"** po streamie
- **Używaj dokładnych godzin** (np. 12:00, nie 12:05)
- **Pisz krótkie, atrakcyjne opisy** (1-2 zdania)
- **Dodawaj 3-5 funkcji** w liście atrakcji

### ❌ DON'T:

- **Nie usuwaj zapowiedzi** bez potrzeby (lepiej zmień status na "Zakończony")
- **Nie zostawiaj pustych pól** w funkcjach (jedna funkcja = jedna linia)
- **Nie zmieniaj daty** na przeszłą (zapowiedź zniknie ze strony głównej)
- **Nie dodawaj wielu zapowiedzi na ten sam dzień** (wyświetli się tylko najbliższa)

---

## 📞 Pomoc

Jeśli masz problemy lub pytania:

1. Przeczytaj ten dokument jeszcze raz
2. Sprawdź sekcję "Najczęstsze Problemy"
3. Skontaktuj się z Arkiem:
   - Discord: [nick]
   - Email: [email]

---

## 🔒 Bezpieczeństwo

### Hasło:

- **Nie udostępniaj hasła** nikomu
- Jeśli podejrzewasz, że ktoś zna Twoje hasło, poproś Arka o zmianę

### Wylogowywanie:

- **Zawsze wyloguj się** po skończeniu pracy
- Szczególnie jeśli używasz wspólnego komputera

---

## 📊 Przykładowy Formularz

Oto przykład dobrze wypełnionej zapowiedzi:

```
Tytuł: Rise of Tomb Raider - Episode 24 🏔️
Opis: Finałowa rozprawa z Trynity! Kontynuujemy eksplorację lodowych jaskiń i odkrywamy ostatnie sekrety starożytnego miasta.
Data: 2025-11-23
Godzina: 14:00
Platforma: TikTok
Link: https://www.tiktok.com/@xbruksiax/live
Funkcje:
Finałowa misja głównej fabuły
Ukryte grobowce i sekrety
Live Q&A sesja
Losowanie nagród dla widzów!
Status: Zaplanowany
Miniaturka: (opcjonalnie)
```

---

## 🎉 Gotowe!

Teraz jesteś gotowa do zarządzania zapowiedziami streamów! Powodzenia! 🚀

---

**Wersja dokumentu**: 1.0
**Data ostatniej aktualizacji**: 16 Listopada 2025
**Autor**: Claude Code & Arek
