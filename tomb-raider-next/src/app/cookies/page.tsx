import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Polityka Cookies</h1>
          <p className="last-updated">Ostatnia aktualizacja: 26 listopada 2025</p>
        </div>

        <div className="legal-content">
          <h2>1. Co to są ciasteczka (cookies)?</h2>
          <p>
            Ciasteczka (ang. cookies) to małe pliki tekstowe, które są
            zapisywane na Twoim urządzeniu (komputerze, smartfonie, tablecie)
            podczas przeglądania stron internetowych. Umożliwiają one stronie
            internetowej rozpoznanie Twojego urządzenia i zapamiętanie pewnych
            informacji o Twoich preferencjach.
          </p>

          <h2>2. Jakie ciasteczka używamy?</h2>
          <p>
            Nasza strona Bruxa Gaming używa następujących rodzajów ciasteczek:
          </p>

          <h3>2.1. Ciasteczka niezbędne (bez wymaganej zgody)</h3>
          <p>
            Te ciasteczka są niezbędne do prawidłowego działania strony i nie
            wymagają Twojej zgody zgodnie z przepisami prawa.
          </p>

          <table className="cookie-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Cel</th>
                <th>Czas przechowywania</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Nazwa"><strong>bruxa_cookie_consent</strong></td>
                <td data-label="Cel">Zapisuje Twoją decyzję dotyczącą akceptacji ciasteczek</td>
                <td data-label="Czas przechowywania">365 dni</td>
              </tr>
              <tr>
                <td data-label="Nazwa"><strong>bruxa_theme</strong></td>
                <td data-label="Cel">
                  Zapisuje Twoje preferencje motywu strony (np. &quot;Pink Gamer
                  Girl&quot;)
                </td>
                <td data-label="Czas przechowywania">Do momentu wyczyszczenia przez użytkownika</td>
              </tr>
            </tbody>
          </table>

          <h3>2.2. Ciasteczka YouTube (wymaga zgody)</h3>
          <p>
            Osadzamy filmy z YouTube. W zależności od Twojej decyzji dotyczącej
            ciasteczek:
          </p>

          <h4>Jeśli zaakceptujesz ciasteczka:</h4>
          <p>
            Używamy standardowego odtwarzacza YouTube (youtube.com/embed), który
            może ustawiać następujące ciasteczka:
          </p>

          <table className="cookie-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Cel</th>
                <th>Dostawca</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Nazwa"><strong>VISITOR_INFO1_LIVE</strong></td>
                <td data-label="Cel">
                  Szacowanie przepustowości użytkownika na stronach z osadzonymi
                  filmami YouTube
                </td>
                <td data-label="Dostawca">Google/YouTube</td>
              </tr>
              <tr>
                <td data-label="Nazwa"><strong>YSC</strong></td>
                <td data-label="Cel">
                  Zapisywanie unikalnego ID użytkownika w celu śledzenia
                  statystyk oglądania filmów
                </td>
                <td data-label="Dostawca">Google/YouTube</td>
              </tr>
              <tr>
                <td data-label="Nazwa"><strong>PREF</strong></td>
                <td data-label="Cel">Zapisywanie preferencji odtwarzania i ustawień YouTube</td>
                <td data-label="Dostawca">Google/YouTube</td>
              </tr>
              <tr>
                <td data-label="Nazwa"><strong>CONSENT</strong></td>
                <td data-label="Cel">
                  Zapisywanie zgody użytkownika na używanie cookies przez Google
                </td>
                <td data-label="Dostawca">Google/YouTube</td>
              </tr>
            </tbody>
          </table>

          <h4>Jeśli odrzucisz nieobowiązkowe ciasteczka:</h4>
          <p>
            Używamy odtwarzacza YouTube w trybie prywatności
            (youtube-nocookie.com/embed), który:
          </p>
          <ul>
            <li><strong>Nie ustawia</strong> ciasteczek śledzących</li>
            <li><strong>Nie śledzi</strong> Twojej aktywności</li>
            <li>
              <strong>Umożliwia</strong> nadal oglądanie filmów, ale bez
              personalizacji i śledzenia
            </li>
          </ul>

          <h2>3. Cel używania ciasteczek</h2>
          <p>
            Ciasteczka na naszej stronie są wykorzystywane w następujących
            celach:
          </p>
          <ul>
            <li>
              <strong>Funkcjonalność strony</strong>: zapisywanie preferencji
              motywu, języka, itp.
            </li>
            <li>
              <strong>Zgodność z przepisami</strong>: zapisywanie informacji o
              Twojej zgodzie na ciasteczka
            </li>
            <li>
              <strong>Osadzanie treści</strong>: wyświetlanie filmów z YouTube
              (tylko jeśli zaakceptujesz ciasteczka)
            </li>
            <li>
              <strong>Analiza ruchu</strong>: YouTube może analizować zachowanie
              użytkowników (tylko jeśli zaakceptujesz ciasteczka)
            </li>
          </ul>

          <h2>4. Jak zarządzać ciasteczkami?</h2>

          <h3>4.1. Banner zgody na cookies</h3>
          <p>
            Przy pierwszej wizycie na stronie zobaczysz banner informujący o
            ciasteczkach. Możesz:
          </p>
          <ul>
            <li>
              <strong>Zaakceptować wszystkie</strong> - zgoda na wszystkie
              ciasteczka
            </li>
            <li>
              <strong>Tylko niezbędne</strong> - odrzucenie ciasteczek YouTube,
              ale zachowanie funkcjonalności strony
            </li>
          </ul>

          <h3>4.2. Ustawienia przeglądarki</h3>
          <p>
            Możesz zarządzać ciasteczkami bezpośrednio w swojej przeglądarce:
          </p>
          <ul>
            <li>
              <strong>Google Chrome</strong>: Ustawienia → Prywatność i
              bezpieczeństwo → Pliki cookie i inne dane witryn
            </li>
            <li>
              <strong>Mozilla Firefox</strong>: Ustawienia → Prywatność i
              bezpieczeństwo → Ciasteczka i dane stron
            </li>
            <li>
              <strong>Safari</strong>: Preferencje → Prywatność → Zarządzanie
              danymi witryn
            </li>
            <li>
              <strong>Microsoft Edge</strong>: Ustawienia → Prywatność,
              wyszukiwanie i usługi → Pliki cookie i uprawnienia witryn
            </li>
          </ul>

          <h3>4.3. Zmiana zgody</h3>
          <p>
            Możesz w każdej chwili zmienić swoją decyzję dotyczącą ciasteczek
            poprzez:
          </p>
          <ul>
            <li>Wyczyszczenie ciasteczek w przeglądarce</li>
            <li>Skontaktowanie się z nami (kontakt poniżej)</li>
          </ul>

          <h2>5. Konsekwencje odrzucenia ciasteczek</h2>
          <p>Jeśli odrzucisz nieobowiązkowe ciasteczka:</p>
          <ul>
            <li>✅ Strona będzie nadal działać prawidłowo</li>
            <li>✅ Filmy YouTube będą dostępne (w trybie prywatności)</li>
            <li>⚠️ YouTube nie będzie pamiętał Twoich preferencji oglądania</li>
            <li>⚠️ Nie będzie możliwa personalizacja treści</li>
          </ul>

          <h2>6. Ciasteczka firm trzecich</h2>
          <p>
            Nasza strona osadza treści z następujących serwisów zewnętrznych,
            które mogą ustawiać własne ciasteczka:
          </p>
          <ul>
            <li>
              <strong>YouTube (Google LLC)</strong>
              <br />
              Polityka prywatności:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              <br />
              Polityka cookies:{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/technologies/cookies
              </a>
            </li>
          </ul>

          <h2>7. Aktualizacje polityki cookies</h2>
          <p>
            Polityka cookies może być aktualizowana w związku ze zmianami w
            przepisach prawa lub sposobie działania strony. O wszelkich zmianach
            poinformujemy poprzez aktualizację daty &quot;Ostatnia aktualizacja&quot; na
            górze strony.
          </p>

          <h2>8. Kontakt</h2>
          <p>
            W przypadku pytań dotyczących ciasteczek lub niniejszej polityki,
            prosimy o kontakt:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:contact@example.com">contact@example.com</a>
            </li>
          </ul>

          <h2>9. Więcej informacji o cookies</h2>
          <p>Jeśli chcesz dowiedzieć się więcej o ciasteczkach, odwiedź:</p>
          <ul>
            <li>
              <a
                href="https://www.allaboutcookies.org/pl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AllAboutCookies.org (Polski)
              </a>
            </li>
            <li>
              <a href="https://uodo.gov.pl/" target="_blank" rel="noopener noreferrer">
                Urząd Ochrony Danych Osobowych (PUODO)
              </a>
            </li>
          </ul>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/" className="back-link">
              ← Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
