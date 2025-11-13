/* ===================================================================
   Theme Switcher
   Tomb Raider Gaming Website - Bruxa Gaming
   =================================================================== */

// Theme configuration
const THEMES = {
  original: {
    name: 'Original',
    icon: '🏺',
    label: 'Original'
  },
  'pink-gamer': {
    name: 'Pink Gamer Girl',
    icon: '💖',
    label: 'Pink Gamer'
  },
  matrix: {
    name: 'Matrix Green',
    icon: '💚',
    label: 'Matrix'
  },
  'blue-cyber': {
    name: 'Blue Cyber',
    icon: '💙',
    label: 'Blue Cyber'
  }
};

const THEME_KEYS = Object.keys(THEMES);
const STORAGE_KEY = 'tomb-raider-theme';

// State
let currentThemeIndex = 0;

// ===================================================================
// INITIALIZATION
// ===================================================================

function initThemeSwitcher() {
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme && THEMES[savedTheme]) {
    currentThemeIndex = THEME_KEYS.indexOf(savedTheme);
    applyTheme(savedTheme);
  } else {
    // Apply default theme
    applyTheme(THEME_KEYS[0]);
  }

  // Update button UI
  updateThemeButton();
  updateMobileThemeButtons();

  // Set up event listeners
  setupEventListeners();

  console.log('✅ Theme switcher initialized');
}

// ===================================================================
// THEME APPLICATION
// ===================================================================

function applyTheme(themeName) {
  // Set data-theme attribute on html element
  document.documentElement.setAttribute('data-theme', themeName);

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, themeName);

  // Update button UI
  updateThemeButton();
  updateMobileThemeButtons();

  // Dispatch custom event for other scripts to listen to
  const event = new CustomEvent('themeChanged', {
    detail: { theme: themeName }
  });
  document.dispatchEvent(event);

  console.log(`🎨 Theme changed to: ${THEMES[themeName].name}`);
}

function cycleTheme() {
  // Move to next theme
  currentThemeIndex = (currentThemeIndex + 1) % THEME_KEYS.length;
  const newTheme = THEME_KEYS[currentThemeIndex];
  applyTheme(newTheme);
}

// ===================================================================
// UI UPDATES
// ===================================================================

function updateThemeButton() {
  const themeBtn = document.querySelector('.theme-btn');
  if (!themeBtn) return;

  const currentTheme = THEME_KEYS[currentThemeIndex];
  const themeConfig = THEMES[currentTheme];

  const iconElement = themeBtn.querySelector('.theme-icon');
  const labelElement = themeBtn.querySelector('.theme-label');

  if (iconElement) {
    iconElement.textContent = themeConfig.icon;
  }

  if (labelElement) {
    labelElement.textContent = themeConfig.label;
  }

  themeBtn.setAttribute('title', `Current theme: ${themeConfig.name}`);
}

function updateMobileThemeButtons() {
  const currentTheme = THEME_KEYS[currentThemeIndex];
  const mobileButtons = document.querySelectorAll('.theme-btn-mobile');

  mobileButtons.forEach(btn => {
    const btnTheme = btn.getAttribute('data-theme');
    if (btnTheme === currentTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ===================================================================
// EVENT LISTENERS
// ===================================================================

function setupEventListeners() {
  // Desktop theme button - cycles through themes
  const themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      cycleTheme();

      // Add click animation
      themeBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        themeBtn.style.transform = '';
      }, 150);
    });
  }

  // Mobile theme buttons - direct theme selection
  const mobileButtons = document.querySelectorAll('.theme-btn-mobile');
  mobileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeName = btn.getAttribute('data-theme');
      if (themeName && THEMES[themeName]) {
        currentThemeIndex = THEME_KEYS.indexOf(themeName);
        applyTheme(themeName);
      }
    });
  });

  // Keyboard shortcut: Ctrl/Cmd + Shift + T
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      cycleTheme();
    }
  });
}

// ===================================================================
// INITIALIZE ON PAGE LOAD
// ===================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
  initThemeSwitcher();
}

// Export for use in other scripts if needed
window.ThemeSwitcher = {
  applyTheme,
  getCurrentTheme: () => THEME_KEYS[currentThemeIndex],
  THEMES
};
