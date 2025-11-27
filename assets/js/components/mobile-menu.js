/**
 * Mobile Menu Component
 * Renders the mobile navigation menu
 * @param {string} activePage - Current page identifier ('home', 'gameplays', 'highlights', 'about')
 * @returns {string} HTML string for mobile menu
 */
export function renderMobileMenu(activePage = '') {
  const isActive = (page) => activePage === page ? 'active' : '';

  return `
    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobile-menu">
      <ul class="mobile-menu-list">
        <li><a href="/" class="mobile-menu-link ${isActive('home')}">🏠 Home</a></li>
        <li>
          <a href="/gameplays.html" class="mobile-menu-link ${isActive('gameplays')}">🎮 Gameplay'e</a>
        </li>
        <li>
          <a href="/highlights.html" class="mobile-menu-link ${isActive('highlights')}">⭐ Highlights</a>
        </li>
        <li><a href="/#about" class="mobile-menu-link ${isActive('about')}">👤 O Mnie</a></li>
      </ul>

      <div class="section-divider"></div>

      <!-- Mobile Social Icons -->
      <div class="mobile-social">
        <h3>Social Media</h3>
        <div class="social-grid">
          <a
            href="https://www.youtube.com/@bruxa7656"
            class="mobile-social-link"
            target="_blank"
            rel="noopener"
          >
            <span>▶</span> YouTube
          </a>
          <a
            href="https://www.tiktok.com/@xbruksiax"
            class="mobile-social-link"
            target="_blank"
            rel="noopener"
          >
            <span>♪</span> TikTok
          </a>
          <!-- <a href="https://discord.gg/placeholder" class="mobile-social-link" target="_blank" rel="noopener">
          <span>💬</span> Discord
        </a> -->
          <!-- <a href="https://instagram.com/placeholder" class="mobile-social-link" target="_blank" rel="noopener">
          <span>📷</span> Instagram
        </a> -->
        </div>
      </div>

      <!-- Mobile Theme Section -->
      <div class="mobile-theme-section">
        <h3>Motyw Strony</h3>
        <button class="theme-btn-mobile" data-theme="original">
          <span>🏺</span> Original
        </button>
        <button class="theme-btn-mobile" data-theme="pink-gamer">
          <span>💖</span> Pink Gamer Girl
        </button>
        <button class="theme-btn-mobile" data-theme="matrix">
          <span>💚</span> Matrix Green
        </button>
        <button class="theme-btn-mobile" data-theme="blue-cyber">
          <span>💙</span> Blue Cyber
        </button>
      </div>
    </div>
  `;
}
