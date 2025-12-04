/**
 * Footer Component
 * Renders the site footer with navigation links and credits
 * @returns {string} HTML string for footer
 */
export function renderFooter() {
  return `
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Column 1 -->
          <div class="footer-column">
            <h4>O Stronie</h4>
            <ul class="footer-links">
              <li><a href="/#about">O Mnie</a></li>
              <li><a href="/faq.html">FAQ</a></li>
              <li><a href="/privacy.html">Polityka Prywatności</a></li>
              <li><a href="/cookies.html">Cookies</a></li>
            </ul>
          </div>

          <!-- Column 2 -->
          <div class="footer-column">
            <h4>Nawigacja</h4>
            <ul class="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/gameplays.html">Gameplay'e</a></li>
              <li><a href="/highlights.html">Highlights</a></li>
            </ul>
          </div>

          <!-- Column 3 -->
          <div class="footer-column">
            <h4>Gameplay'e</h4>
            <ul class="footer-links">
              <li>
                <a href="/gameplays.html?game=tomb-raider">Tomb Raider</a>
              </li>
              <li><a href="/gameplays.html?game=other">Inne Gry</a></li>
            </ul>
          </div>

          <!-- Column 4 -->
          <div class="footer-column">
            <h4>Social Media</h4>
            <ul class="footer-links">
              <li>
                <a href="https://www.youtube.com/@bruxa7656" target="_blank"
                  >▶ YouTube</a
                >
              </li>
              <li>
                <a href="https://www.tiktok.com/@xbruksiax" target="_blank"
                  >♪ TikTok</a
                >
              </li>
              <!-- <li><a href="https://instagram.com/placeholder" target="_blank">📷 Instagram</a></li> -->
              <!-- <li><a href="https://discord.gg/placeholder" target="_blank">💬 Discord</a></li> -->
            </ul>
          </div>

          <!-- Column 5 -->
          <div class="footer-column">
            <h4>Kontakt</h4>
            <ul class="footer-links">
              <li><a href="mailto:contact@example.com">📧 Email</a></li>
              <!-- <li><a href="https://discord.gg/placeholder" target="_blank">💬 Discord</a></li> -->
              <li><a href="/business.html">💼 Współpraca</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-divider"></div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-logo">
            <span class="logo-icon">🏺</span>
            <div class="pixel-lara-footer">
              <img src="/assets/images/pixel-art/lara-croft-hero.png"
                   alt="Lara Croft Logo"
                   class="pixel-art-tiny"
                   width="64"
                   height="64"
                   loading="lazy">
            </div>
          </div>

          <div class="footer-info">
            <p>© 2025 Bruxa Gaming | Tomb Raider Fan Site</p>
            <p class="footer-tagline">Powered by passion for adventure 💎</p>
          </div>

          <div class="footer-credits">
            <p>
              Created by 🤖
              <a href="https://my-portoflio-mu.vercel.app/" target="_blank"
                >Arkadiusz Sarach</a
              >
            </p>
            <p>
              <a href="/privacy.html">Privacy</a> |
              <a href="/terms.html">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  `;
}
