/**
 * Cookie Consent Banner Manager
 * Manages user consent for cookies (YouTube embeds, analytics, etc.)
 */

class CookieConsent {
  constructor() {
    this.cookieName = 'bruxa_cookie_consent';
    this.cookieExpiry = 365; // days
    this.banner = null;
    this.hasConsent = this.checkConsent();
  }

  /**
   * Initialize the cookie banner
   */
  init() {
    // Check if consent was already given
    if (this.hasConsent !== null) {
      // User has made a choice
      this.applyConsent(this.hasConsent);
      return;
    }

    // Show banner if no choice was made
    this.createBanner();
    this.showBanner();
  }

  /**
   * Check if user has already consented
   * @returns {boolean|null} true if accepted, false if declined, null if not set
   */
  checkConsent() {
    const consent = localStorage.getItem(this.cookieName);
    if (consent === null) return null;
    return consent === 'accepted';
  }

  /**
   * Create the banner HTML and inject into page
   */
  createBanner() {
    const bannerHTML = `
      <div class="cookie-banner" id="cookieBanner" role="dialog" aria-labelledby="cookieBannerTitle" aria-describedby="cookieBannerDesc">
        <div class="cookie-banner-container">
          <div class="cookie-banner-content">
            <h3 class="cookie-banner-title" id="cookieBannerTitle">
              <span class="cookie-banner-icon">🍪</span>
              Ta strona używa ciasteczek
            </h3>
            <p class="cookie-banner-text" id="cookieBannerDesc">
              Używamy ciasteczek do osadzania filmów z YouTube oraz do zapisywania Twoich preferencji (np. motyw strony).
              Możesz je zaakceptować lub odrzucić.
              <a href="/privacy.html">Dowiedz się więcej</a> |
              <a href="/cookies.html">Polityka cookies</a>
            </p>
          </div>
          <div class="cookie-banner-actions">
            <button class="cookie-banner-btn cookie-banner-btn-accept" id="cookieAccept" aria-label="Zaakceptuj wszystkie ciasteczka">
              ✓ Akceptuję
            </button>
            <button class="cookie-banner-btn cookie-banner-btn-decline" id="cookieDecline" aria-label="Odrzuć nieobowiązkowe ciasteczka">
              ✗ Tylko niezbędne
            </button>
          </div>
        </div>
      </div>
    `;

    // Inject banner into body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    this.banner = document.getElementById('cookieBanner');

    // Add event listeners
    document.getElementById('cookieAccept').addEventListener('click', () => this.accept());
    document.getElementById('cookieDecline').addEventListener('click', () => this.decline());
  }

  /**
   * Show the banner with animation
   */
  showBanner() {
    if (this.banner) {
      // Delay to allow CSS transition
      setTimeout(() => {
        this.banner.classList.add('show');
      }, 100);
    }
  }

  /**
   * Hide the banner with animation
   */
  hideBanner() {
    if (this.banner) {
      this.banner.classList.remove('show');
      // Remove from DOM after animation
      setTimeout(() => {
        this.banner.remove();
      }, 400);
    }
  }

  /**
   * User accepts cookies
   */
  accept() {
    this.saveConsent('accepted');
    this.applyConsent(true);
    this.hideBanner();
  }

  /**
   * User declines cookies
   */
  decline() {
    this.saveConsent('declined');
    this.applyConsent(false);
    this.hideBanner();
  }

  /**
   * Save consent to localStorage
   * @param {string} consent - 'accepted' or 'declined'
   */
  saveConsent(consent) {
    localStorage.setItem(this.cookieName, consent);

    // Also save timestamp
    const timestamp = new Date().toISOString();
    localStorage.setItem(`${this.cookieName}_timestamp`, timestamp);
  }

  /**
   * Apply user's consent choice
   * @param {boolean} hasConsent - Whether user accepted cookies
   */
  applyConsent(hasConsent) {
    if (hasConsent) {
      // User accepted - enable YouTube embeds with cookies
      this.enableYouTubeEmbeds();
    } else {
      // User declined - use privacy-enhanced YouTube embeds or disable
      this.enablePrivacyEnhancedEmbeds();
    }

    // Dispatch custom event for other scripts to listen to
    const event = new CustomEvent('cookieConsentChanged', {
      detail: { hasConsent }
    });
    document.dispatchEvent(event);
  }

  /**
   * Enable regular YouTube embeds (with cookies)
   */
  enableYouTubeEmbeds() {
    // Find all YouTube iframes
    const iframes = document.querySelectorAll('iframe[data-cookie-consent]');

    iframes.forEach(iframe => {
      const src = iframe.getAttribute('data-src');
      if (src) {
        // Use regular youtube.com (allows cookies)
        iframe.src = src.replace('youtube-nocookie.com', 'youtube.com');
      }
    });

    // Store consent state globally
    window.cookieConsentAccepted = true;
  }

  /**
   * Enable privacy-enhanced YouTube embeds (without cookies)
   */
  enablePrivacyEnhancedEmbeds() {
    // Find all YouTube iframes
    const iframes = document.querySelectorAll('iframe[data-cookie-consent]');

    iframes.forEach(iframe => {
      const src = iframe.getAttribute('data-src');
      if (src) {
        // Use youtube-nocookie.com (privacy-enhanced, no tracking cookies)
        iframe.src = src.replace('youtube.com', 'youtube-nocookie.com');
      }
    });

    // Store consent state globally
    window.cookieConsentAccepted = false;
  }

  /**
   * Allow user to change consent later
   */
  resetConsent() {
    localStorage.removeItem(this.cookieName);
    localStorage.removeItem(`${this.cookieName}_timestamp`);
    this.hasConsent = null;
    this.init();
  }

  /**
   * Get YouTube embed URL based on consent
   * @param {string} videoId - YouTube video ID
   * @returns {string} Embed URL
   */
  getYouTubeEmbedUrl(videoId) {
    const hasConsent = this.checkConsent();

    if (hasConsent === true) {
      // Regular embed with cookies
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      // Privacy-enhanced embed without cookies
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
  }
}

// Initialize on DOM ready
let cookieConsent;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    cookieConsent = new CookieConsent();
    cookieConsent.init();
  });
} else {
  cookieConsent = new CookieConsent();
  cookieConsent.init();
}

// Export for use in other scripts
window.CookieConsent = CookieConsent;
window.cookieConsent = cookieConsent;
