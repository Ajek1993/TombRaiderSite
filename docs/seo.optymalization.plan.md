# Plan Kompleksowej Optymalizacji SEO - Bruxa Gaming (Tomb Raider)

## Cel

Maksymalna optymalizacja strony pod pozycjonowanie w Google dla polskiego rynku, bez konieczności wykupywania płatnego hostingu. Wszystkie optymalizacje będą działać na obecnym hostingu Vercel (darmowy tier).

## Podsumowanie Obecnego Stanu

**Struktura strony:**

- 6 stron publicznych: index.html, gameplays.html, highlights.html, faq.html, privacy.html, cookies.html
- 1 strona admin: admin/announcements.html
- Vanilla JavaScript (bez frameworków - świetnie dla wydajności)
- Hosting: Vercel z API routes
- Język: Polski (lang="pl")

**Główne braki SEO:**

- ❌ Brak robots.txt i sitemap.xml
- ❌ Brak canonical URLs
- ❌ Niepełne tagi Open Graph (brak og:url, og:locale, og:site_name)
- ❌ Brak Schema.org (structured data)
- ❌ Brak katalog /assets/images/ (referencje do og-image.jpg zwracają 404)
- ❌ Brak optymalizacji wydajności (lazy loading, async scripts, resource hints)
- ❌ CSS i JS nie zoptymalizowane pod ładowanie

**Co już działa dobrze:**

- ✅ Podstawowe meta tagi (description, keywords, author)
- ✅ Dobra dostępność (skip-to-content, ARIA labels)
- ✅ RODO/GDPR compliance
- ✅ Responsive design
- ✅ Modułowa architektura JavaScript

---

## FAZA 1: KRYTYCZNE PODSTAWY SEO (4-6 godzin)

### 1.1 Utworzenie robots.txt

**Plik:** `/robots.txt` (nowy plik w katalogu głównym)

```txt
# Robots.txt dla Bruxa Gaming - Tomb Raider

User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /.vercel/
Disallow: /node_modules/

# Pozwól na skanowanie głównych stron
Allow: /
Allow: /gameplays.html
Allow: /highlights.html
Allow: /faq.html

# Sitemap
Sitemap: https://bruxa-tomb-raider.vercel.app//sitemap.xml

# Crawl-delay (opcjonalnie, zapobiega przeciążeniu)
Crawl-delay: 1
```

**Uwaga:** Zamień `https://bruxa-tomb-raider.vercel.app/` na rzeczywisty URL Twojej domeny.

---

### 1.2 Utworzenie sitemap.xml

**Plik:** `/sitemap.xml` (nowy plik w katalogu głównym)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Homepage -->
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app//</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="https://bruxa-tomb-raider.vercel.app//"/>
  </url>

  <!-- Gameplays -->
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app//gameplays.html</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="https://bruxa-tomb-raider.vercel.app//gameplays.html"/>
  </url>

  <!-- Highlights -->
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app//highlights.html</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="https://bruxa-tomb-raider.vercel.app//highlights.html"/>
  </url>

  <!-- FAQ -->
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app//faq.html</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="https://bruxa-tomb-raider.vercel.app//faq.html"/>
  </url>

  <!-- Privacy Policy -->
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app//privacy.html</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="https://bruxa-tomb-raider.vercel.app//privacy.html"/>
  </url>

  <!-- Cookie Policy -->
  <url>
    <loc>https://bruxa-tomb-raider.vercel.app//cookies.html</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="https://bruxa-tomb-raider.vercel.app//cookies.html"/>
  </url>

</urlset>
```

**Uwagi:**

- Zamień wszystkie `https://bruxa-tomb-raider.vercel.app/` na rzeczywisty URL
- Aktualizuj `<lastmod>` po każdej znaczącej zmianie na stronie
- `<priority>` określa ważność strony (1.0 = najważniejsza)
- `<changefreq>` informuje roboty jak często sprawdzać zmiany

---

### 1.3 Dodanie Canonical URLs do wszystkich stron

**Pliki do edycji:**

- `index.html`
- `gameplays.html`
- `highlights.html`
- `faq.html`
- `privacy.html`
- `cookies.html`

**Dodaj w sekcji `<head>` każdej strony (po meta viewport):**

```html
<!-- index.html -->
<link rel="canonical" href="https://bruxa-tomb-raider.vercel.app//" />

<!-- gameplays.html -->
<link
  rel="canonical"
  href="https://bruxa-tomb-raider.vercel.app//gameplays.html"
/>

<!-- highlights.html -->
<link
  rel="canonical"
  href="https://bruxa-tomb-raider.vercel.app//highlights.html"
/>

<!-- faq.html -->
<link rel="canonical" href="https://bruxa-tomb-raider.vercel.app//faq.html" />

<!-- privacy.html -->
<link
  rel="canonical"
  href="https://bruxa-tomb-raider.vercel.app//privacy.html"
/>

<!-- cookies.html -->
<link
  rel="canonical"
  href="https://bruxa-tomb-raider.vercel.app//cookies.html"
/>
```

**Cel:** Zapobiega problemom z duplikacją treści (np. gdyby strona była dostępna pod różnymi URL).

---

### 1.4 Uzupełnienie tagów Open Graph

**Plik:** `index.html`

**Dodaj/zastąp w sekcji `<head>`:**

```html
<!-- Open Graph Meta Tags -->
<meta property="og:url" content="https://bruxa-tomb-raider.vercel.app//" />
<meta property="og:type" content="website" />
<meta
  property="og:site_name"
  content="Bruxa Gaming - Tomb Raider Gameplay PL"
/>
<meta property="og:locale" content="pl_PL" />
<meta
  property="og:title"
  content="Bruxa Gaming - Tomb Raider Gameplay po Polsku | TR1-TR6 Remastered"
/>
<meta
  property="og:description"
  content="🎮 Pełne gameplay'e z serii Tomb Raider po polsku! Oglądaj przejścia TR1-TR6 Remastered, najlepsze momenty z gry, streamy na TikTok. Dołącz do przygód z Larą Croft!"
/>
<meta
  property="og:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-image.jpg"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta
  property="og:image:alt"
  content="Bruxa Gaming - Tomb Raider Gameplay Banner"
/>

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="Bruxa Gaming - Tomb Raider Gameplay po Polsku"
/>
<meta
  name="twitter:description"
  content="🎮 Pełne gameplay'e z serii Tomb Raider po polsku! TR1-TR6 Remastered, highlights, streamy TikTok."
/>
<meta
  name="twitter:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-image.jpg"
/>
<meta
  name="twitter:image:alt"
  content="Bruxa Gaming - Tomb Raider Gameplay Banner"
/>
```

---

**Plik:** `gameplays.html`

```html
<!-- Open Graph Meta Tags -->
<meta
  property="og:url"
  content="https://bruxa-tomb-raider.vercel.app//gameplays.html"
/>
<meta property="og:type" content="website" />
<meta
  property="og:site_name"
  content="Bruxa Gaming - Tomb Raider Gameplay PL"
/>
<meta property="og:locale" content="pl_PL" />
<meta
  property="og:title"
  content="Gameplay'e - Tomb Raider po Polsku | Bruxa Gaming"
/>
<meta
  property="og:description"
  content="📺 Kompletne przejścia Tomb Raider 1-6 Remastered po polsku! Wszystkie poziomy, sekrety, skarby. Oglądaj gameplay z Larą Croft!"
/>
<meta
  property="og:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-gameplays.jpg"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Tomb Raider Gameplays - Bruxa Gaming" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Gameplay'e - Tomb Raider po Polsku" />
<meta
  name="twitter:description"
  content="📺 Kompletne przejścia Tomb Raider 1-6 Remastered po polsku! Wszystkie poziomy, sekrety."
/>
<meta
  name="twitter:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-gameplays.jpg"
/>
```

---

**Plik:** `highlights.html`

```html
<!-- Open Graph Meta Tags -->
<meta
  property="og:url"
  content="https://bruxa-tomb-raider.vercel.app//highlights.html"
/>
<meta property="og:type" content="website" />
<meta
  property="og:site_name"
  content="Bruxa Gaming - Tomb Raider Gameplay PL"
/>
<meta property="og:locale" content="pl_PL" />
<meta
  property="og:title"
  content="Highlights - Najlepsze Momenty z Tomb Raider | Bruxa Gaming"
/>
<meta
  property="og:description"
  content="⭐ Najlepsze momenty, funny fails i epickie sceny z Tomb Raider! Krótkie wideo z gameplay'ów po polsku. Obejrzyj highlights!"
/>
<meta
  property="og:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-highlights.jpg"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Tomb Raider Highlights - Bruxa Gaming" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="Highlights - Najlepsze Momenty z Tomb Raider"
/>
<meta
  name="twitter:description"
  content="⭐ Najlepsze momenty, funny fails i epickie sceny z Tomb Raider po polsku!"
/>
<meta
  name="twitter:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-highlights.jpg"
/>
```

---

**Plik:** `faq.html`

**UWAGA:** Ten plik obecnie w ogóle NIE MA tagów Open Graph! Dodaj całą sekcję:

```html
<!-- Open Graph Meta Tags -->
<meta
  property="og:url"
  content="https://bruxa-tomb-raider.vercel.app//faq.html"
/>
<meta property="og:type" content="website" />
<meta
  property="og:site_name"
  content="Bruxa Gaming - Tomb Raider Gameplay PL"
/>
<meta property="og:locale" content="pl_PL" />
<meta
  property="og:title"
  content="FAQ - Najczęściej Zadawane Pytania | Bruxa Gaming"
/>
<meta
  property="og:description"
  content="❓ Odpowiedzi na pytania o gameplay'e Tomb Raider, streamy, harmonogram publikacji. Wszystko co musisz wiedzieć o kanale!"
/>
<meta
  property="og:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-image.jpg"
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="FAQ - Najczęściej Zadawane Pytania" />
<meta
  name="twitter:description"
  content="❓ Odpowiedzi na pytania o gameplay'e Tomb Raider, streamy, harmonogram."
/>
<meta
  name="twitter:image"
  content="https://bruxa-tomb-raider.vercel.app//assets/images/og-image.jpg"
/>
```

**Dodatkowo w faq.html dodaj brakujące meta tagi:**

```html
<meta
  name="description"
  content="Najczęściej zadawane pytania o gameplay'e Tomb Raider, streamy na TikTok, harmonogram publikacji wideo. Znajdź odpowiedzi na wszystkie pytania!"
/>
<meta
  name="keywords"
  content="tomb raider faq, pytania tomb raider, gameplay pytania, bruxa gaming faq, lara croft pytania"
/>
<meta name="author" content="Bruxa Gaming" />
<meta name="robots" content="index, follow" />
```

---

### 1.5 Optymalizacja meta descriptions (polskie słowa kluczowe)

**Plik:** `index.html`

```html
<meta
  name="description"
  content="🎮 Tomb Raider gameplay po polsku! Pełne przejścia TR1-TR6 Remastered, najlepsze momenty, streamy TikTok. Dołącz do przygód z Larą Croft na Bruxa Gaming!"
/>
<meta
  name="keywords"
  content="tomb raider gameplay po polsku, tomb raider pl, lara croft gra, tomb raider remastered polska, tomb raider przejście po polsku, bruxa gaming, tomb raider 1 gameplay, tomb raider 2 polska, tomb raider stream"
/>
```

**Plik:** `gameplays.html`

```html
<meta
  name="description"
  content="📺 Kompletne gameplay'e Tomb Raider 1-6 Remastered po polsku! Wszystkie poziomy, sekrety, skarby. Pełne przejścia gier z Larą Croft. Oglądaj teraz!"
/>
<meta
  name="keywords"
  content="tomb raider 1 gameplay po polsku, tomb raider 2 przejście, tomb raider 3 polska, tomb raider remastered gameplay, lara croft gameplay pl, tomb raider unfinished business, tomb raider golden mask"
/>
```

**Plik:** `highlights.html`

```html
<meta
  name="description"
  content="⭐ Najlepsze momenty z Tomb Raider po polsku! Funny fails, epickie skoki, trudne poziomy. Krótkie wideo highlights z gameplay'ów Lary Croft!"
/>
<meta
  name="keywords"
  content="tomb raider highlights, tomb raider funny moments, lara croft fails, tomb raider best moments, tomb raider shorts, tomb raider najlepsze momenty"
/>
```

---

## FAZA 2: SCHEMA.ORG STRUCTURED DATA (6-8 godzin)

### 2.1 WebSite Schema z SearchAction

**Plik:** `index.html`

**Dodaj w sekcji `<head>` (przed zamknięciem):**

```html
<!-- Schema.org JSON-LD - WebSite with SearchAction -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bruxa Gaming - Tomb Raider Gameplay PL",
    "alternateName": "Bruxa Gaming",
    "url": "https://bruxa-tomb-raider.vercel.app//",
    "description": "Pełne gameplay'e z serii Tomb Raider po polsku. Przejścia TR1-TR6 Remastered, highlights, streamy.",
    "inLanguage": "pl-PL",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://bruxa-tomb-raider.vercel.app//?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
</script>
```

**Efekt:** Może wyświetlić pole wyszukiwania w wynikach Google.

---

### 2.2 Organization Schema

**Plik:** `index.html`

**Dodaj zaraz po WebSite schema:**

```html
<!-- Schema.org JSON-LD - Organization -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bruxa Gaming",
    "url": "https://bruxa-tomb-raider.vercel.app//",
    "logo": "https://bruxa-tomb-raider.vercel.app//assets/images/logo.png",
    "description": "Kanał gamingowy specjalizujący się w gameplay'ach Tomb Raider po polsku",
    "sameAs": [
      "https://www.youtube.com/@bruxagaming",
      "https://www.tiktok.com/@bruxagaming"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "kontakt@bruxagaming.pl"
    }
  }
</script>
```

**Uwagi:**

- Zamień email na prawdziwy adres kontaktowy
- Dodaj prawdziwe linki do YouTube i TikTok
- Logo będzie trzeba stworzyć później (512x512px PNG)

---

### 2.3 VideoObject Schema Generator (dynamiczny)

**Plik:** `assets/js/schema-generator.js` (NOWY PLIK)

```javascript
/**
 * Schema.org Video Generator
 * Generuje schema markup dla filmów YouTube na stronie
 */

class SchemaGenerator {
  /**
   * Generuje VideoObject schema dla pojedynczego wideo
   * @param {Object} video - Obiekt z danymi wideo z YouTube API
   * @returns {Object} Schema.org VideoObject
   */
  static generateVideoSchema(video) {
    const videoId =
      video.id?.videoId || video.snippet?.resourceId?.videoId || "";
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Wyciągnij długość wideo w formacie ISO 8601
    const duration = video.contentDetails?.duration || "PT0S";

    // Data publikacji
    const uploadDate = video.snippet?.publishedAt || new Date().toISOString();

    // Thumbnail (najwyższa jakość dostępna)
    const thumbnailUrl =
      video.snippet?.thumbnails?.maxres?.url ||
      video.snippet?.thumbnails?.high?.url ||
      video.snippet?.thumbnails?.medium?.url ||
      video.snippet?.thumbnails?.default?.url;

    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.snippet?.title || "",
      description: video.snippet?.description || "",
      thumbnailUrl: thumbnailUrl,
      uploadDate: uploadDate,
      duration: duration,
      contentUrl: videoUrl,
      embedUrl: embedUrl,
      publisher: {
        "@type": "Organization",
        name: "Bruxa Gaming",
        logo: {
          "@type": "ImageObject",
          url: "https://bruxa-tomb-raider.vercel.app//assets/images/logo.png",
        },
      },
      author: {
        "@type": "Person",
        name: "Bruxa Gaming",
      },
      inLanguage: "pl-PL",
    };
  }

  /**
   * Wstrzykuje schema markup do DOM
   * @param {Object} schema - Schema.org object
   */
  static injectSchema(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  /**
   * Generuje schema dla listy wideo (ItemList)
   * @param {Array} videos - Tablica obiektów wideo
   * @param {String} listName - Nazwa listy
   * @returns {Object} Schema.org ItemList
   */
  static generateVideoListSchema(videos, listName = "Tomb Raider Gameplays") {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: listName,
      description: `Lista ${videos.length} filmów z gameplay Tomb Raider`,
      itemListElement: videos.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.snippet?.title || "",
          url: `https://www.youtube.com/watch?v=${
            video.id?.videoId || video.snippet?.resourceId?.videoId || ""
          }`,
          thumbnailUrl: video.snippet?.thumbnails?.high?.url || "",
        },
      })),
    };
  }
}

// Export dla użycia w innych plikach
if (typeof module !== "undefined" && module.exports) {
  module.exports = SchemaGenerator;
}
```

---

**Plik:** `assets/js/home.js` (MODYFIKACJA)

**Znajdź funkcję która renderuje "Najnowsze Gameplay'e" (prawdopodobnie `renderLatestGameplays` lub podobną) i dodaj na końcu:**

```javascript
// Na końcu funkcji renderLatestGameplays (po załadowaniu filmów)
async function renderLatestGameplays() {
  // ... istniejący kod ładowania filmów ...

  // NOWY KOD - dodaj na końcu funkcji:
  if (videos && videos.length > 0) {
    // Generuj schema dla pierwszych 3 filmów
    const featuredVideos = videos.slice(0, 3);

    // Generuj VideoObject schema dla każdego filmu
    featuredVideos.forEach((video) => {
      const schema = SchemaGenerator.generateVideoSchema(video);
      SchemaGenerator.injectSchema(schema);
    });

    // Opcjonalnie: generuj ItemList schema dla całej listy
    const listSchema = SchemaGenerator.generateVideoListSchema(
      featuredVideos,
      "Najnowsze Tomb Raider Gameplays"
    );
    SchemaGenerator.injectSchema(listSchema);
  }
}
```

**Dodaj import schema-generator.js w index.html:**

```html
<!-- Przed zamknięciem </body>, przed home.js -->
<script src="assets/js/schema-generator.js"></script>
<script src="assets/js/home.js"></script>
```

---

**Plik:** `assets/js/gameplays.js` (MODYFIKACJA)

**Podobnie, dodaj na końcu funkcji ładującej filmy:**

```javascript
// Po załadowaniu wszystkich playlist i filmów
async function loadGameplays() {
  // ... istniejący kod ...

  // NOWY KOD - na końcu po renderowaniu:
  if (allVideos && allVideos.length > 0) {
    // Generuj schema dla pierwszych 10 filmów (lub wszystkich jeśli mniej)
    const videosForSchema = allVideos.slice(0, 10);

    videosForSchema.forEach((video) => {
      const schema = SchemaGenerator.generateVideoSchema(video);
      SchemaGenerator.injectSchema(schema);
    });

    // ItemList schema dla całej kolekcji
    const listSchema = SchemaGenerator.generateVideoListSchema(
      videosForSchema,
      "Kompletne Gameplay'e Tomb Raider"
    );
    SchemaGenerator.injectSchema(listSchema);
  }
}
```

**Dodaj import w gameplays.html:**

```html
<script src="assets/js/schema-generator.js"></script>
<script src="assets/js/gameplays.js"></script>
```

---

**Plik:** `assets/js/highlights.js` (MODYFIKACJA)

```javascript
// Po załadowaniu highlights
async function loadHighlights() {
  // ... istniejący kod ...

  // NOWY KOD:
  if (highlights && highlights.length > 0) {
    const highlightsForSchema = highlights.slice(0, 10);

    highlightsForSchema.forEach((video) => {
      const schema = SchemaGenerator.generateVideoSchema(video);
      SchemaGenerator.injectSchema(schema);
    });

    const listSchema = SchemaGenerator.generateVideoListSchema(
      highlightsForSchema,
      "Najlepsze Momenty z Tomb Raider"
    );
    SchemaGenerator.injectSchema(listSchema);
  }
}
```

**Dodaj import w highlights.html:**

```html
<script src="assets/js/schema-generator.js"></script>
<script src="assets/js/highlights.js"></script>
```

---

### 2.4 FAQPage Schema (dynamiczny z Google Sheets)

**Plik:** `assets/js/faq.js` (MODYFIKACJA)

**Znajdź funkcję która ładuje FAQ z Google Sheets i dodaj generowanie schema:**

```javascript
// W funkcji która renderuje FAQ (prawdopodobnie renderFAQ lub loadFAQ)
async function renderFAQ(faqData) {
  // ... istniejący kod renderowania FAQ ...

  // NOWY KOD - generuj FAQPage schema
  if (faqData && faqData.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question || item.pytanie, // dostosuj do nazw kolumn w Sheets
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer || item.odpowiedz, // dostosuj do nazw kolumn
        },
      })),
    };

    // Wstrzyknij schema do DOM
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema, null, 2);
    document.head.appendChild(script);
  }
}
```

**UWAGA:** Sprawdź dokładne nazwy kolumn w Twoim arkuszu Google Sheets i dostosuj `item.question`/`item.answer` do rzeczywistych nazw.

---

### 2.5 BreadcrumbList Schema

**Plik:** `gameplays.html`

**Dodaj w `<head>`:**

```html
<!-- Schema.org - Breadcrumb -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona Główna",
        "item": "https://bruxa-tomb-raider.vercel.app//"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gameplay'e",
        "item": "https://bruxa-tomb-raider.vercel.app//gameplays.html"
      }
    ]
  }
</script>
```

---

**Plik:** `highlights.html`

```html
<!-- Schema.org - Breadcrumb -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona Główna",
        "item": "https://bruxa-tomb-raider.vercel.app//"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Highlights",
        "item": "https://bruxa-tomb-raider.vercel.app//highlights.html"
      }
    ]
  }
</script>
```

---

**Plik:** `faq.html`

```html
<!-- Schema.org - Breadcrumb -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona Główna",
        "item": "https://bruxa-tomb-raider.vercel.app//"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ",
        "item": "https://bruxa-tomb-raider.vercel.app//faq.html"
      }
    ]
  }
</script>
```

---

## FAZA 3: OPTYMALIZACJA WYDAJNOŚCI (4-5 godzin)

### 3.1 Resource Hints (preconnect, dns-prefetch)

**Dodaj w KAŻDYM pliku HTML (index, gameplays, highlights, faq, privacy, cookies) w sekcji `<head>`, PRZED innymi tagami:**

```html
<!-- Resource Hints -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://www.youtube.com" />
<link rel="dns-prefetch" href="https://i.ytimg.com" />
<link rel="dns-prefetch" href="https://www.googleapis.com" />
<link rel="dns-prefetch" href="https://sheets.googleapis.com" />
```

**Cel:** Przyspiesza połączenia z zewnętrznymi serwisami (Google Fonts, YouTube).

---

### 3.2 Defer JavaScript Loading

**W KAŻDYM pliku HTML zamień:**

```html
<!-- STARY KOD (bez defer) -->
<script src="assets/js/main.js"></script>

<!-- NOWY KOD (z defer) -->
<script src="assets/js/main.js" defer></script>
```

**Zastosuj `defer` do WSZYSTKICH skryptów (oprócz tych które muszą się załadować natychmiast):**

```html
<!-- Przykład dla index.html -->
<script src="assets/js/components/navbar.js" defer></script>
<script src="assets/js/components/footer.js" defer></script>
<script src="assets/js/components/mobile-menu.js" defer></script>
<script src="assets/js/main.js" defer></script>
<script src="assets/js/theme-switcher.js" defer></script>
<script src="assets/js/cookie-consent.js" defer></script>
<script src="assets/js/stream-reminders.js" defer></script>
<script src="assets/js/calendar-export.js" defer></script>
<script src="assets/js/search.js" defer></script>
<script src="assets/js/schema-generator.js" defer></script>
<script src="assets/js/home.js" defer></script>
```

**UWAGA:** Jeśli jakieś skrypty wymagają określonej kolejności ładowania, użyj `defer` (zachowuje kolejność) zamiast `async`.

---

### 3.3 Lazy Loading dla YouTube Iframes

**Plik:** `assets/js/video-modal.js` (MODYFIKACJA)

**Znajdź kod tworzący iframe YouTube i dodaj `loading="lazy"`:**

```javascript
// PRZED (przykład):
const iframe = `<iframe src="https://www.youtube.com/embed/${videoId}" ...></iframe>`;

// PO:
const iframe = `<iframe
  src="https://www.youtube.com/embed/${videoId}"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>`;
```

**Alternatywnie:** Możesz użyć techniki "click to load" - iframe ładuje się dopiero po kliknięciu w thumbnail. To da największy boost wydajności.

---

### 3.4 Optymalizacja CSS - Inline Critical CSS

**Zamiast ładować wszystkie pliki CSS osobno, stwórz jeden zoptymalizowany bundle.**

**Opcja A: Prostsza - połącz wszystkie CSS w jeden plik**

**Stwórz nowy plik:** `assets/css/bundle.css`

**Zawartość (w tej kolejności):**

```css
/* Połącz zawartość WSZYSTKICH plików CSS w tej kolejności: */
/* 1. variables.css */
/* 2. reset.css */
/* 3. main.css */
/* 4. hero.css */
/* 5. cards.css */
/* 6. footer.css */
/* 7. modal.css */
/* 8. animations.css */
/* ... wszystkie pozostałe */
```

**Następnie w `<head>` zamień wszystkie linki CSS na:**

```html
<link rel="stylesheet" href="assets/css/bundle.css" />
```

---

**Opcja B: Zaawansowana - Critical CSS**

1. **Wyodrębnij critical CSS** (style potrzebne above-the-fold)
2. **Wstaw inline w `<head>`:**

```html
<style>
  /* Critical CSS - tylko najważniejsze style dla above-the-fold */
  :root {
    --primary-color: #cd853f; /* ... */
  }
  body {
    margin: 0;
    font-family: "Segoe UI", sans-serif;
  }
  .navbar {
    /* style navbar */
  }
  .hero {
    /* style hero section */
  }
  /* ... tylko style widoczne przed scrollem */
</style>

<!-- Reszta CSS z defer -->
<link
  rel="stylesheet"
  href="assets/css/bundle.css"
  media="print"
  onload="this.media='all'"
/>
<noscript><link rel="stylesheet" href="assets/css/bundle.css" /></noscript>
```

**Narzędzia do wyodrębnienia Critical CSS (darmowe):**

- https://www.sitelocity.com/critical-path-css-generator
- https://jonassebastianohlsson.com/criticalpathcssgenerator/

---

### 3.5 Optymalizacja vercel.json

**Plik:** `vercel.json` (MODYFIKACJA)

**Dodaj/uzupełnij:**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(robots.txt|sitemap.xml)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

**Efekt:**

- Bezpieczeństwo (XSS protection, clickjacking prevention)
- Cache dla statycznych zasobów (CSS, JS, obrazy)
- Świeże HTML-e przy każdym odwiedzeniu

---

## FAZA 4: DODATKOWE OPTIMALIZACJE TECHNICZNE (3-4 godziny)

### 4.1 Utworzenie Strony 404

**Plik:** `404.html` (NOWY PLIK w głównym katalogu)

```html
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>404 - Strona nie znaleziona | Bruxa Gaming</title>
    <link rel="stylesheet" href="assets/css/variables.css" />
    <link rel="stylesheet" href="assets/css/reset.css" />
    <style>
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: #ffffff;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
        padding: 20px;
      }

      .error-container {
        max-width: 600px;
      }

      h1 {
        font-size: 120px;
        margin: 0;
        color: #cd853f;
        text-shadow: 0 0 20px rgba(205, 133, 63, 0.5);
      }

      h2 {
        font-size: 32px;
        margin: 20px 0;
      }

      p {
        font-size: 18px;
        margin: 20px 0;
        opacity: 0.8;
      }

      .btn {
        display: inline-block;
        margin-top: 30px;
        padding: 15px 40px;
        background: #cd853f;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .btn:hover {
        background: #b8752e;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(205, 133, 63, 0.3);
      }

      .lara {
        font-size: 80px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="error-container">
      <div class="lara">🏺</div>
      <h1>404</h1>
      <h2>Skarb nie został znaleziony!</h2>
      <p>
        Przepraszamy, ale strona której szukasz nie istnieje. Może Lara Croft
        znalazła ją pierwsza?
      </p>
      <a href="/" class="btn">Powrót do Strony Głównej</a>
    </div>
  </body>
</html>
```

**Dodaj w vercel.json:**

```json
{
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "status": 404,
      "dest": "/404.html"
    }
  ]
}
```

---

### 4.2 Manifest.json dla PWA

**Plik:** `manifest.json` (NOWY PLIK w głównym katalogu)

```json
{
  "name": "Bruxa Gaming - Tomb Raider Gameplay PL",
  "short_name": "Bruxa Gaming",
  "description": "Pełne gameplay'e z serii Tomb Raider po polsku",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#cd853f",
  "orientation": "portrait-primary",
  "lang": "pl-PL",
  "dir": "ltr",
  "icons": [
    {
      "src": "/assets/images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Dodaj w `<head>` WSZYSTKICH stron HTML:**

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#cd853f" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
<meta name="apple-mobile-web-app-title" content="Bruxa Gaming" />
```

---

### 4.3 Ukrycie Linku do Admin Panel

**Plik:** `assets/js/components/footer.js` (MODYFIKACJA)

**Znajdź sekcję "O nas" lub miejsce gdzie jest link do admin panel i usuń go:**

```javascript
// USUŃ tę linię (jeśli istnieje):
<a href="/admin/announcements.html">Admin Panel</a>

// Alternatywnie: dodaj sprawdzanie czy użytkownik jest zalogowany
```

**Panel admina powinien być dostępny tylko przez bezpośredni URL, nie przez nawigację.**

---

### 4.4 Optymalizacja Tytułów Stron (< 60 znaków)

**Plik:** `index.html`

```html
<title>Bruxa Gaming - Tomb Raider Gameplay PL | TR1-TR6 Remastered</title>
<!-- 58 znaków - idealnie! -->
```

**Plik:** `gameplays.html`

```html
<title>Gameplay'e Tomb Raider 1-6 po Polsku | Bruxa Gaming</title>
<!-- 54 znaki -->
```

**Plik:** `highlights.html`

```html
<title>Highlights - Najlepsze Momenty Tomb Raider PL | Bruxa</title>
<!-- 55 znaków -->
```

**Plik:** `faq.html`

```html
<title>FAQ - Pytania o Tomb Raider Gameplay | Bruxa Gaming</title>
<!-- 53 znaki -->
```

---

## FAZA 5: POLSKIE SŁOWA KLUCZOWE I CONTENT (3-4 godziny)

### 5.1 Research Słów Kluczowych

**Główne frazy do targetowania:**

**High Volume (wysokie wyszukiwania):**

- "tomb raider gameplay po polsku"
- "tomb raider pl"
- "lara croft gra"
- "tomb raider remastered polska"
- "tomb raider przejście po polsku"

**Medium Volume:**

- "tomb raider 1 gameplay"
- "tomb raider 2 polska"
- "tomb raider gameplay pl"
- "lara croft przejście gry"
- "tomb raider po polsku"

**Long-tail (niższa konkurencja, wyższa konwersja):**

- "tomb raider 1 pełne przejście po polsku"
- "tomb raider remastered sekrety"
- "jak przejść tomb raider 1"
- "tomb raider gameplay bez komentarza"
- "tomb raider golden mask po polsku"

**Zastosuj te frazy w:**

- Tytułach stron (`<title>`)
- Meta descriptions
- Nagłówkach H1, H2
- Opisach wideo (jeśli masz kontrolę nad YouTube)
- Treści na stronie (naturalnie, nie spam)

---

### 5.2 Dodanie Sekcji "O Mnie" z Tekstem

**Plik:** `index.html` (MODYFIKACJA sekcji #about)

**Dodaj więcej tekstu SEO-friendly w sekcji "O Mnie":**

```html
<section id="about" class="about-section">
  <div class="container">
    <h2>O Kanale Bruxa Gaming</h2>
    <div class="about-content">
      <p>
        Witaj w <strong>Bruxa Gaming</strong> - Twoim miejscu na kompletne
        <strong>gameplay'e Tomb Raider po polsku</strong>! Specjalizuję się w
        pełnych przejściach klasycznej serii z <strong>Larą Croft</strong>, od
        Tomb Raider 1 aż po TR6 w wersji Remastered.
      </p>
      <p>Na kanale znajdziesz:</p>
      <ul>
        <li>
          📺 <strong>Pełne przejścia</strong> wszystkich części Tomb Raider
          (TR1-TR6 Remastered)
        </li>
        <li>
          🎮 <strong>Dodatki i ekspansje</strong>: Unfinished Business, Golden
          Mask, Lost Artifact
        </li>
        <li>⭐ <strong>Highlights i najlepsze momenty</strong> z gier</li>
        <li>🔴 <strong>Streamy na żywo</strong> na TikTok z rozgrywką</li>
        <li>
          💎 <strong>Wszystkie sekrety i skarby</strong> odkryte w każdym
          poziomie
        </li>
      </ul>
      <p>
        Każdy <strong>gameplay Tomb Raider</strong> jest nagrany w wysokiej
        jakości, z polskim komentarzem i dokładnym pokazaniem wszystkich
        zagadek, sekretów i trudnych fragmentów. Idealne zarówno dla weteranów
        serii Tomb Raider, jak i dla nowych graczy którzy chcą poznać przygody
        <strong>Lary Croft</strong> po raz pierwszy.
      </p>
    </div>
  </div>
</section>
```

**Cel:** Google lubi strony z sensowną ilością tekstu (min. 300 słów). Ta sekcja dodaje wartościową treść z naturalnymi słowami kluczowymi.

---

### 5.3 Dodanie Alt Text do Obrazów (jeśli będą)

**Gdy w przyszłości dodasz obrazy (og-image, logo itp.), zawsze dodawaj alt text:**

```html
<!-- Przykłady -->
<img
  src="assets/images/og-image.jpg"
  alt="Bruxa Gaming - Tomb Raider Gameplay po Polsku Banner"
/>
<img
  src="assets/images/logo.png"
  alt="Bruxa Gaming Logo - Kanał Tomb Raider PL"
/>
```

**Dla dynamicznie generowanych thumbnails YouTube:**

```javascript
// W plikach JS generujących karty wideo
const img = document.createElement("img");
img.src = video.snippet.thumbnails.medium.url;
img.alt = `${video.snippet.title} - Tomb Raider Gameplay PL`;
img.loading = "lazy";
```

---

## FAZA 6: GOOGLE SEARCH CONSOLE & MONITORING (2-3 godziny)

### 6.1 Weryfikacja w Google Search Console

**Krok 1: Dodaj meta tag weryfikacyjny**

1. Idź do https://search.google.com/search-console/
2. Dodaj swoją domenę
3. Wybierz metodę "Meta tag HTML"
4. Skopiuj tag `<meta name="google-site-verification" content="..." />`

**Dodaj w `index.html` w `<head>`:**

```html
<meta name="google-site-verification" content="TU_WSTAW_SWOJ_KOD" />
```

**Krok 2: Prześlij sitemap.xml**

Po weryfikacji, w Google Search Console:

1. Idź do "Sitemaps" w menu
2. Wklej URL: `https://twoja-domena.vercel.app/sitemap.xml`
3. Kliknij "Submit"

---

### 6.2 Test Rich Results (Schema.org)

**Narzędzie:** https://search.google.com/test/rich-results

**Sprawdź:**

1. Homepage - czy WebSite i Organization schema są poprawne
2. Gameplays - czy VideoObject schema działa
3. FAQ - czy FAQPage schema jest rozpoznawany

**Napraw wszystkie błędy które wykryje narzędzie.**

---

### 6.3 PageSpeed Insights Test

**Narzędzie:** https://pagespeed.web.dev/

**Sprawdź wydajność:**

1. Testuj każdą stronę (index, gameplays, highlights)
2. Cel: min. 90+ dla Mobile i Desktop
3. Zwróć uwagę na Core Web Vitals:
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

**Jeśli wyniki są słabe:**

- Sprawdź czy wszystkie skrypty mają `defer`
- Upewnij się że CSS jest zoptymalizowany
- Dodaj więcej lazy loading

---

### 6.4 Bing Webmaster Tools (opcjonalnie)

**Jeśli chcesz być też w Bing:**

```html
<!-- Dodaj w index.html -->
<meta name="msvalidate.01" content="TU_WSTAW_KOD_BING" />
```

1. Idź do https://www.bing.com/webmasters/
2. Dodaj stronę
3. Prześlij sitemap podobnie jak w Google

---

## FAZA 7: CONTENT OPTIMIZATION (ONGOING)

### 7.1 Regularne Aktualizacje Sitemap

**Zawsze gdy dodasz nowe wideo lub zmienisz treść:**

1. Otwórz `sitemap.xml`
2. Zaktualizuj `<lastmod>` dla zmienionych stron
3. Przykład:

```xml
<url>
  <loc>https://bruxa-tomb-raider.vercel.app//gameplays.html</loc>
  <lastmod>2025-02-15</lastmod> <!-- ZAKTUALIZUJ tę datę -->
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

4. Prześlij ponownie w Google Search Console

---

### 7.2 Monitorowanie i Analiza

**Co tydzień sprawdzaj:**

1. **Google Search Console:**

   - Impressions (wyświetlenia w wynikach)
   - Clicks (kliknięcia)
   - CTR (click-through rate)
   - Average position (średnia pozycja)
   - Które frazy przynoszą ruch

2. **Google Analytics (jeśli zainstalowany):**

   - Liczba odwiedzin
   - Bounce rate
   - Czas na stronie
   - Najpopularniejsze strony

3. **Errory w Search Console:**
   - Sprawdź zakładkę "Coverage" - czy są błędy 404
   - Sprawdź "Enhancements" - czy structured data jest OK

---

### 7.3 Content Marketing (Opcjonalnie)

**Jeśli chcesz jeszcze lepsze SEO, rozważ:**

1. **Blog/Artykuły:**

   - Tworzenie artykułów typu "Jak przejść poziom X w Tomb Raider"
   - "10 najlepszych sekretów w Tomb Raider 2"
   - "Historia serii Tomb Raider"

2. **Opisy wideo na YouTube:**

   - Dodaj link do swojej strony w opisach wszystkich filmów
   - Użyj polskich słów kluczowych
   - Dodaj timestamps (chaptery)

3. **Social Media:**
   - Udostępniaj linki do strony na TikTok, YouTube Community
   - Zachęcaj widzów do odwiedzenia strony

---

## PODSUMOWANIE - CHECKLIST IMPLEMENTACJI

### ✅ FAZA 1: KRYTYCZNE (DO ZROBIENIA NAJPIERW)

- [ ] Utworzyć `/robots.txt`
- [ ] Utworzyć `/sitemap.xml`
- [ ] Dodać canonical URLs do wszystkich 6 stron
- [ ] Uzupełnić Open Graph tags (index, gameplays, highlights, faq)
- [ ] Dodać brakujące meta tagi w faq.html
- [ ] Zoptymalizować meta descriptions z polskimi słowami kluczowymi

### ✅ FAZA 2: SCHEMA.ORG

- [ ] Dodać WebSite schema (index.html)
- [ ] Dodać Organization schema (index.html)
- [ ] Utworzyć `/assets/js/schema-generator.js`
- [ ] Zmodyfikować `home.js` - dodać VideoObject schema
- [ ] Zmodyfikować `gameplays.js` - dodać VideoObject schema
- [ ] Zmodyfikować `highlights.js` - dodać VideoObject schema
- [ ] Zmodyfikować `faq.js` - dodać FAQPage schema
- [ ] Dodać BreadcrumbList schema (gameplays, highlights, faq)

### ✅ FAZA 3: WYDAJNOŚĆ

- [ ] Dodać resource hints do wszystkich HTML (preconnect, dns-prefetch)
- [ ] Dodać `defer` do wszystkich skryptów JavaScript
- [ ] Dodać `loading="lazy"` do YouTube iframes
- [ ] Utworzyć `/assets/css/bundle.css` (połączone CSS)
- [ ] Zoptymalizować `vercel.json` (cache, security headers)

### ✅ FAZA 4: TECHNICZNE

- [ ] Utworzyć `/404.html`
- [ ] Dodać routing 404 w `vercel.json`
- [ ] Utworzyć `/manifest.json`
- [ ] Dodać `<link rel="manifest">` do wszystkich stron
- [ ] Usunąć link do admin panel z footer.js
- [ ] Zoptymalizować tytuły stron (< 60 znaków)

### ✅ FAZA 5: CONTENT

- [ ] Dodać rozszerzoną sekcję "O Mnie" z polskimi słowami kluczowymi
- [ ] Dodać alt text do wszystkich obrazów (gdy będą)
- [ ] Sprawdzić heading hierarchy (H1 → H2 → H3)

### ✅ FAZA 6: MONITORING

- [ ] Zarejestrować się w Google Search Console
- [ ] Dodać meta tag weryfikacyjny
- [ ] Przesłać sitemap.xml
- [ ] Przetestować w Rich Results Test
- [ ] Sprawdzić PageSpeed Insights
- [ ] (Opcjonalnie) Zarejestrować w Bing Webmaster

### ✅ FAZA 7: ONGOING

- [ ] Ustawić reminder do aktualizacji sitemap co tydzień
- [ ] Regularnie sprawdzać Google Search Console
- [ ] Monitorować pozycje w Google
- [ ] Optymalizować opisy YouTube z linkami do strony

---

## PLIKI DO UTWORZENIA (NOWE)

1. `/robots.txt` - Dyrektywy dla robotów
2. `/sitemap.xml` - Mapa strony
3. `/404.html` - Strona błędu 404
4. `/manifest.json` - PWA manifest
5. `/assets/js/schema-generator.js` - Generator schema markup
6. `/assets/css/bundle.css` - Połączone style (opcjonalnie)

---

## PLIKI DO MODYFIKACJI

### HTML (6 plików)

1. `index.html` - Canonical, OG tags, schema, resource hints, defer
2. `gameplays.html` - Canonical, OG tags, breadcrumb schema, resource hints
3. `highlights.html` - Canonical, OG tags, breadcrumb schema, resource hints
4. `faq.html` - Canonical, OG tags, breadcrumb schema, meta tags, resource hints
5. `privacy.html` - Canonical, resource hints
6. `cookies.html` - Canonical, resource hints

### JavaScript (4 pliki)

7. `assets/js/home.js` - Dodać generowanie VideoObject schema
8. `assets/js/gameplays.js` - Dodać generowanie VideoObject schema
9. `assets/js/highlights.js` - Dodać generowanie VideoObject schema
10. `assets/js/faq.js` - Dodać generowanie FAQPage schema
11. `assets/js/video-modal.js` - Dodać lazy loading do iframe
12. `assets/js/components/footer.js` - Usunąć link do admin

### Config

13. `vercel.json` - Cache headers, security, 404 routing

---

## OCZEKIWANE REZULTATY

Po pełnej implementacji tego planu możesz oczekiwać:

### Krótkoterminowe (1-4 tygodnie)

- ✅ Strona pojawi się w Google Search Console
- ✅ Sitemap zostanie zaindeksowany
- ✅ Rich snippets zaczną się pojawiać (gwiazdki FAQ, wideo)
- ✅ Wynik PageSpeed Insights > 90

### Średnioterminowe (1-3 miesiące)

- ✅ Pozycje w Google dla fraz "tomb raider gameplay po polsku"
- ✅ Wzrost organicznego ruchu z wyszukiwarki
- ✅ Wyświetlanie video snippets w wynikach
- ✅ Lepsze CTR dzięki rich results

### Długoterminowe (3-6 miesięcy)

- ✅ Top 10 dla głównych polskich fraz Tomb Raider
- ✅ Featured snippets dla FAQ
- ✅ Stabilny ruch organiczny
- ✅ Rozpoznawalność marki "Bruxa Gaming"

---

## UWAGI KOŃCOWE

2. **Grafiki (og-image, logo)** - pomijamy teraz, dodasz później
3. **YouTube API Key** - upewnij się że masz limity pod kontrolą
4. **Testuj na dev environment** przed wdrożeniem na produkcję
5. **Backup kodu** przed każdą większą zmianą
6. **Nie spamuj słowami kluczowymi** - użyj ich naturalnie

---

## POTRZEBUJESZ JESZCZE

- [ ] Email kontaktowy (dla Organization schema)
- [ ] Linki do YouTube i TikTok (dla Organization schema)
- [ ] Google Search Console account
- [ ] (Później) Grafiki: og-image.jpg, logo.png, PWA icons

---

## SZACOWANY CZAS

- **Faza 1:** 4-6 godzin
- **Faza 2:** 6-8 godzin
- **Faza 3:** 4-5 godzin
- **Faza 4:** 3-4 godziny
- **Faza 5:** 3-4 godziny
- **Faza 6:** 2-3 godziny
- **Faza 7:** Ongoing

**TOTAL:** 22-33 godzin dla pełnej kompleksowej optymalizacji

---

Plan gotowy do implementacji! 🚀
