import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Polityka Prywatności</h1>
          <p className="last-updated">Ostatnia aktualizacja: 26 listopada 2025</p>
        </div>

        <div className="legal-content">
          <h2>1. Informacje ogólne</h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i
            ochrony danych osobowych użytkowników strony Bruxa Gaming (dalej:
            &quot;Strona&quot;).
          </p>
          <p>
            Administratorem danych osobowych jest właściciel strony Bruxa
            Gaming. Szanujemy prywatność naszych użytkowników i zobowiązujemy
            się do ochrony ich danych osobowych zgodnie z Rozporządzeniem
            Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia
            2016 r. (RODO).
          </p>

          <h2>2. Jakie dane zbieramy?</h2>
          <p>
            Nasza strona zbiera minimalne dane w sposób automatyczny podczas
            przeglądania:
          </p>
          <ul>
            <li>
              <strong>Dane techniczne</strong>: adres IP, typ przeglądarki,
              system operacyjny, czas wizyty
            </li>
            <li>
              <strong>Dane z ciasteczek</strong>: preferencje użytkownika (np.
              wybrany motyw strony)
            </li>
            <li>
              <strong>Dane z YouTube</strong>: jeśli zaakceptujesz ciasteczka,
              YouTube może zbierać dane związane z oglądaniem filmów
            </li>
          </ul>
          <p>
            <strong>Nie zbieramy</strong> danych osobowych identyfikujących,
            takich jak imię, nazwisko, adres email, chyba że użytkownik
            dobrowolnie je poda (np. w formularzu kontaktowym).
          </p>

          <h2>3. Ciasteczka (Cookies)</h2>
          <p>Strona wykorzystuje ciasteczka w następujących celach:</p>

          <h3>3.1. Ciasteczka niezbędne</h3>
          <p>
            Te ciasteczka są konieczne do prawidłowego działania strony i nie
            wymagają zgody:
          </p>
          <ul>
            <li>Zapisywanie preferencji użytkownika (motyw strony)</li>
            <li>Zapisywanie zgody na ciasteczka</li>
          </ul>

          <h3>3.2. Ciasteczka YouTube</h3>
          <p>Osadzamy filmy z YouTube. W zależności od Twojego wyboru:</p>
          <ul>
            <li>
              <strong>Jeśli zaakceptujesz ciasteczka</strong>: YouTube może
              używać ciasteczek do śledzenia Twojej aktywności (analytics,
              personalizacja reklam). Używamy standardowego odtwarzacza YouTube
              (youtube.com/embed).
            </li>
            <li>
              <strong>Jeśli odrzucisz ciasteczka</strong>: Używamy odtwarzacza
              YouTube w trybie prywatności (youtube-nocookie.com/embed), który
              nie ustawia ciasteczek śledzących.
            </li>
          </ul>
          <p>
            Więcej informacji o ciasteczkach YouTube:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Polityka prywatności Google
            </a>
          </p>

          <h3>3.3. Zarządzanie ciasteczkami</h3>
          <p>
            Możesz w każdej chwili zmienić ustawienia ciasteczek w swojej
            przeglądarce lub skorzystać z naszego banneru cookies przy pierwszej
            wizycie.
          </p>

          <h2>4. Cel przetwarzania danych</h2>
          <p>Dane są przetwarzane w następujących celach:</p>
          <ul>
            <li>Świadczenie usług dostępnych na stronie</li>
            <li>Zapewnienie prawidłowego działania strony</li>
            <li>Zapisywanie preferencji użytkownika</li>
            <li>
              Osadzanie i wyświetlanie treści z YouTube (filmy, playlisty)
            </li>
            <li>Analiza ruchu na stronie (jeśli zaakceptujesz ciasteczka)</li>
          </ul>

          <h2>5. Podstawa prawna przetwarzania</h2>
          <p>Przetwarzamy dane na podstawie:</p>
          <ul>
            <li>
              <strong>Art. 6 ust. 1 lit. a RODO</strong> - zgoda użytkownika
              (dla ciasteczek nieobowiązkowych)
            </li>
            <li>
              <strong>Art. 6 ust. 1 lit. f RODO</strong> - prawnie uzasadniony
              interes administratora (zapewnienie funkcjonalności strony)
            </li>
          </ul>

          <h2>6. Udostępnianie danych osobom trzecim</h2>
          <p>Dane mogą być udostępniane następującym podmiotom zewnętrznym:</p>
          <ul>
            <li>
              <strong>Google/YouTube</strong> - do osadzania filmów (zgodnie z{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Polityką prywatności Google
              </a>
              )
            </li>
            <li>
              <strong>Dostawca hostingu</strong> - do przechowywania danych
              strony
            </li>
          </ul>
          <p>
            <strong>Nie sprzedajemy</strong> ani nie przekazujemy danych
            osobowych do celów marketingowych.
          </p>

          <h2>7. Prawa użytkowników (RODO)</h2>
          <p>Zgodnie z RODO, użytkownikom przysługują następujące prawa:</p>
          <ul>
            <li>
              <strong>Prawo dostępu</strong> do swoich danych (Art. 15 RODO)
            </li>
            <li>
              <strong>Prawo do sprostowania</strong> danych (Art. 16 RODO)
            </li>
            <li>
              <strong>Prawo do usunięcia</strong> danych - &quot;prawo do bycia
              zapomnianym&quot; (Art. 17 RODO)
            </li>
            <li>
              <strong>Prawo do ograniczenia przetwarzania</strong> (Art. 18
              RODO)
            </li>
            <li>
              <strong>Prawo do przenoszenia danych</strong> (Art. 20 RODO)
            </li>
            <li>
              <strong>Prawo do sprzeciwu</strong> wobec przetwarzania danych
              (Art. 21 RODO)
            </li>
            <li>
              <strong>Prawo do cofnięcia zgody</strong> w dowolnym momencie
              (Art. 7 ust. 3 RODO)
            </li>
          </ul>
          <p>
            Aby skorzystać z tych praw, skontaktuj się z nami przez formularz
            kontaktowy lub email podany w sekcji &quot;Kontakt&quot;.
          </p>

          <h2>8. Okres przechowywania danych</h2>
          <p>Dane są przechowywane przez następujące okresy:</p>
          <ul>
            <li>
              <strong>Ciasteczka niezbędne</strong>: do momentu usunięcia przez
              użytkownika lub zmian ustawień
            </li>
            <li>
              <strong>Zgoda na ciasteczka</strong>: 365 dni od udzielenia zgody
            </li>
            <li>
              <strong>Dane YouTube</strong>: zgodnie z polityką prywatności
              Google
            </li>
          </ul>

          <h2>9. Bezpieczeństwo danych</h2>
          <p>
            Stosujemy odpowiednie środki techniczne i organizacyjne w celu
            ochrony danych osobowych przed:
          </p>
          <ul>
            <li>Nieuprawnionym dostępem</li>
            <li>Utratą</li>
            <li>Zniszczeniem</li>
            <li>Nieuprawnionym ujawnieniem</li>
          </ul>
          <p>
            Strona korzysta z bezpiecznego protokołu HTTPS do szyfrowania
            transmisji danych.
          </p>

          <h2>10. Zmiany w Polityce Prywatności</h2>
          <p>
            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce
            Prywatności. O wszelkich zmianach użytkownicy zostaną poinformowani
            poprzez aktualizację daty &quot;Ostatnia aktualizacja&quot; na górze tej
            strony.
          </p>

          <h2>11. Kontakt</h2>
          <p>
            W przypadku pytań dotyczących niniejszej Polityki Prywatności lub
            przetwarzania danych osobowych, prosimy o kontakt:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:contact@example.com">contact@example.com</a>
            </li>
          </ul>

          <h2>12. Organ nadzorczy</h2>
          <p>
            Użytkownikom przysługuje prawo wniesienia skargi do organu
            nadzorczego zajmującego się ochroną danych osobowych, którym w
            Polsce jest:
          </p>
          <p>
            <strong>Prezes Urzędu Ochrony Danych Osobowych (PUODO)</strong>
            <br />
            ul. Stawki 2
            <br />
            00-193 Warszawa
            <br />
            <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer">
              https://uodo.gov.pl
            </a>
          </p>

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
