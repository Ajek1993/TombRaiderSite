/**
 * SEARCH COMPONENT
 * Handles site-wide search functionality for videos and FAQ
 */

(function () {
  'use strict';

  // ===================================
  // CONFIGURATION
  // ===================================

  const CACHE_KEY = 'bruxa_search_data';
  const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
  const DEBOUNCE_DELAY = 300; // ms
  const MAX_RESULTS_PER_CATEGORY = 5;

  const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://${window.location.hostname}:${window.location.port}/api`
    : '/api';

  // ===================================
  // STATE
  // ===================================

  let searchData = {
    videos: [],
    faq: [],
    lastFetch: null
  };

  let isSearchActive = false;
  let searchTimeout = null;
  let highlightedIndex = -1;
  let currentResults = [];

  // ===================================
  // DOM ELEMENTS
  // ===================================

  let searchContainer = null;
  let searchBtn = null;
  let searchInputWrapper = null;
  let searchInput = null;
  let searchCloseBtn = null;
  let searchResults = null;
  let searchDropdownOverlay = null;

  // ===================================
  // INITIALIZATION
  // ===================================

  /**
   * Initialize search component
   */
  function initSearch() {
    console.log('[Search] Initializing search component...');

    // Create search elements
    createSearchElements();

    // Load cached data
    loadCachedData();

    // Setup event listeners
    setupEventListeners();

    console.log('[Search] Search component initialized');
  }

  /**
   * Create search DOM elements and inject into navbar
   */
  function createSearchElements() {
    // Find search button in navbar
    searchBtn = document.querySelector('.search-btn');

    if (!searchBtn) {
      console.warn('[Search] Search button not found in navbar');
      return;
    }

    // Wrap button in container
    searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchBtn.parentNode.insertBefore(searchContainer, searchBtn);
    searchContainer.appendChild(searchBtn);

    // Create input wrapper
    searchInputWrapper = document.createElement('div');
    searchInputWrapper.className = 'search-input-wrapper';

    // Create input
    searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Szukaj filmów, FAQ...';
    searchInput.setAttribute('aria-label', 'Wyszukiwarka');
    searchInput.autocomplete = 'off';

    // Create close button
    searchCloseBtn = document.createElement('button');
    searchCloseBtn.className = 'search-close-btn';
    searchCloseBtn.innerHTML = '✕';
    searchCloseBtn.setAttribute('aria-label', 'Zamknij wyszukiwarkę');

    // Assemble input wrapper
    searchInputWrapper.appendChild(searchInput);
    searchInputWrapper.appendChild(searchCloseBtn);
    searchContainer.appendChild(searchInputWrapper);

    // Create results dropdown
    searchResults = document.createElement('div');
    searchResults.className = 'search-results';

    // Create dropdown overlay (outside navbar, fixed positioned)
    searchDropdownOverlay = document.createElement('div');
    searchDropdownOverlay.className = 'search-dropdown-overlay';
    searchDropdownOverlay.setAttribute('aria-hidden', 'true');
    searchDropdownOverlay.appendChild(searchResults);
    document.body.appendChild(searchDropdownOverlay);
  }

  /**
   * Setup all event listeners
   */
  function setupEventListeners() {
    if (!searchBtn || !searchInput || !searchCloseBtn) return;

    // Open search
    searchBtn.addEventListener('click', openSearch);

    // Close search
    searchCloseBtn.addEventListener('click', closeSearch);

    // Input handling with debounce
    searchInput.addEventListener('input', handleSearchInput);

    // Keyboard navigation
    searchInput.addEventListener('keydown', handleKeyboardNavigation);

    // Click outside to close
    document.addEventListener('click', handleClickOutside);

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isSearchActive) {
        closeSearch();
      }
    });

    // Reposition dropdown on window resize
    window.addEventListener('resize', () => {
      if (isSearchActive) {
        positionSearchDropdown();
      }
    });

    // Reposition on scroll (handles mobile address bar hide/show)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (isSearchActive) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          positionSearchDropdown();
        }, 50);
      }
    });
  }

  // ===================================
  // SEARCH UI CONTROLS
  // ===================================

  /**
   * Open search and fetch data if needed
   */
  async function openSearch() {
    isSearchActive = true;

    // Show input wrapper (lupka pozostaje widoczna)
    searchInputWrapper.classList.add('active');
    searchInput.focus();

    // Show dropdown overlay
    searchDropdownOverlay.classList.add('active');
    searchDropdownOverlay.setAttribute('aria-hidden', 'false');

    // Position dropdown below navbar
    positionSearchDropdown();

    // Show loading state
    showLoading();

    // Fetch data if cache is stale
    await ensureDataLoaded();

    // Clear loading if no input yet
    if (!searchInput.value.trim()) {
      hideResults();
    }
  }

  /**
   * Close search and reset state
   */
  function closeSearch() {
    isSearchActive = false;
    searchInputWrapper.classList.remove('active');
    searchDropdownOverlay.classList.remove('active');
    searchDropdownOverlay.setAttribute('aria-hidden', 'true');
    searchInput.value = '';
    hideResults();
    highlightedIndex = -1;
    currentResults = [];
  }

  /**
   * Position search dropdown below navbar
   */
  function positionSearchDropdown() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || !searchDropdownOverlay) return;

    const navbarRect = navbar.getBoundingClientRect();

    // Position below navbar (or at top if navbar is hidden)
    if (navbar.classList.contains('hidden')) {
      searchDropdownOverlay.style.top = '0px';
    } else {
      searchDropdownOverlay.style.top = `${navbarRect.bottom}px`;
    }

    // Mobile: full width | Desktop: align to search button
    if (window.innerWidth <= 768) {
      searchDropdownOverlay.style.left = '0';
      searchDropdownOverlay.style.right = '0';
    } else {
      const searchBtn = document.querySelector('.search-btn');
      if (searchBtn) {
        const btnRect = searchBtn.getBoundingClientRect();
        searchDropdownOverlay.style.right = `${window.innerWidth - btnRect.right}px`;
        searchDropdownOverlay.style.left = 'auto';
      }
    }
  }

  /**
   * Handle search input with debouncing
   */
  function handleSearchInput(e) {
    const query = e.target.value.trim();

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Show loading
    if (query.length > 0) {
      showLoading();
    }

    // Debounce search
    searchTimeout = setTimeout(() => {
      if (query.length === 0) {
        hideResults();
        return;
      }

      if (query.length < 2) {
        showEmpty('Wpisz co najmniej 2 znaki');
        return;
      }

      performSearch(query);
    }, DEBOUNCE_DELAY);
  }

  // ===================================
  // DATA FETCHING & CACHING
  // ===================================

  /**
   * Load cached search data from localStorage
   */
  function loadCachedData() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return;

      const data = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (data.lastFetch && (now - data.lastFetch) < CACHE_TTL) {
        searchData = data;
        console.log('[Search] Loaded data from cache');
      } else {
        console.log('[Search] Cache expired');
        localStorage.removeItem(CACHE_KEY);
      }
    } catch (error) {
      console.error('[Search] Error loading cache:', error);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  /**
   * Save search data to cache
   */
  function saveCachedData() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(searchData));
      console.log('[Search] Data saved to cache');
    } catch (error) {
      console.error('[Search] Error saving cache:', error);
    }
  }

  /**
   * Ensure search data is loaded and fresh
   */
  async function ensureDataLoaded() {
    const now = Date.now();

    // Check if we need to fetch
    if (!searchData.lastFetch || (now - searchData.lastFetch) > CACHE_TTL) {
      await fetchAllData();
    }
  }

  /**
   * Fetch all searchable data (videos + FAQ)
   */
  async function fetchAllData() {
    console.log('[Search] Fetching all data...');

    try {
      // Fetch videos and FAQ in parallel
      const [videos, faq] = await Promise.all([
        fetchAllVideos(),
        fetchFAQ()
      ]);

      searchData = {
        videos,
        faq,
        lastFetch: Date.now()
      };

      saveCachedData();

      console.log(`[Search] Fetched ${videos.length} videos and ${faq.length} FAQ items`);
    } catch (error) {
      console.error('[Search] Error fetching data:', error);
    }
  }

  /**
   * Fetch all videos from all categories
   */
  async function fetchAllVideos() {
    // Get all categories from PLAYLISTS
    const categories = getAllCategories();
    const allVideos = [];

    console.log(`[Search] Fetching videos from ${categories.length} categories...`);

    // Fetch all categories in parallel
    const promises = categories.map(async (categoryKey) => {
      try {
        const response = await fetch(`${API_BASE_URL}/youtube?playlist=${categoryKey}`);

        if (!response.ok) {
          console.warn(`[Search] Failed to fetch ${categoryKey}`);
          return [];
        }

        const data = await response.json();
        const categoryInfo = getPlaylistInfo(categoryKey);

        // Add category metadata to each video
        return (data.videos || []).map(video => ({
          ...video,
          category: categoryKey,
          categoryName: categoryInfo?.name || categoryKey,
          categoryIcon: categoryInfo?.icon || '🎮'
        }));
      } catch (error) {
        console.error(`[Search] Error fetching ${categoryKey}:`, error);
        return [];
      }
    });

    const results = await Promise.all(promises);

    // Flatten results
    results.forEach(videos => {
      allVideos.push(...videos);
    });

    return allVideos;
  }

  /**
   * Fetch FAQ items
   */
  async function fetchFAQ() {
    try {
      const response = await fetch(`${API_BASE_URL}/faq?visible=true`);

      if (!response.ok) {
        console.warn('[Search] Failed to fetch FAQ');
        return [];
      }

      const data = await response.json();
      return data.faq || [];
    } catch (error) {
      console.error('[Search] Error fetching FAQ:', error);
      return [];
    }
  }

  /**
   * Get all playlist categories
   */
  function getAllCategories() {
    if (typeof PLAYLISTS === 'undefined') {
      console.warn('[Search] PLAYLISTS not loaded');
      return [];
    }

    const categories = [];

    // Get all gameplay categories
    for (const game in PLAYLISTS) {
      if (game === 'shorts') {
        categories.push('shorts');
      } else if (typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id) {
        categories.push(...Object.keys(PLAYLISTS[game]));
      }
    }

    return categories;
  }

  // ===================================
  // SEARCH LOGIC
  // ===================================

  /**
   * Perform search and display results
   */
  function performSearch(query) {
    console.log(`[Search] Searching for: "${query}"`);

    const results = {
      videos: searchVideos(query),
      faq: searchFAQ(query)
    };

    const totalResults = results.videos.length + results.faq.length;

    if (totalResults === 0) {
      showEmpty('Nie znaleziono wyników');
      currentResults = [];
      return;
    }

    renderResults(results, query);
  }

  /**
   * Search videos with fuzzy matching
   */
  function searchVideos(query) {
    const normalizedQuery = normalizeString(query);

    return searchData.videos
      .filter(video => {
        const title = normalizeString(video.title || '');
        const category = normalizeString(video.categoryName || '');

        return title.includes(normalizedQuery) || category.includes(normalizedQuery);
      })
      .slice(0, MAX_RESULTS_PER_CATEGORY)
      .map(video => ({
        type: 'video',
        ...video
      }));
  }

  /**
   * Search FAQ with fuzzy matching
   */
  function searchFAQ(query) {
    const normalizedQuery = normalizeString(query);

    return searchData.faq
      .filter(faq => {
        const question = normalizeString(faq.question || '');
        const answer = normalizeString(faq.answer || '');

        return question.includes(normalizedQuery) || answer.includes(normalizedQuery);
      })
      .slice(0, MAX_RESULTS_PER_CATEGORY)
      .map(faq => ({
        type: 'faq',
        ...faq
      }));
  }

  /**
   * Normalize string for searching (lowercase, remove accents)
   */
  function normalizeString(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  }

  /**
   * Highlight matched text in string
   */
  function highlightMatch(text, query) {
    if (!query || !text) return text;

    const normalizedText = normalizeString(text);
    const normalizedQuery = normalizeString(query);
    const index = normalizedText.indexOf(normalizedQuery);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return `${before}<span class="search-highlight">${match}</span>${after}`;
  }

  // ===================================
  // RESULTS RENDERING
  // ===================================

  /**
   * Render search results
   */
  function renderResults(results, query) {
    searchResults.innerHTML = '';

    const totalResults = results.videos.length + results.faq.length;

    // Header
    const header = document.createElement('div');
    header.className = 'search-results-header';
    header.textContent = `Znaleziono ${totalResults} wynik${totalResults === 1 ? '' : totalResults < 5 ? 'i' : 'ów'}`;
    searchResults.appendChild(header);

    // Results list
    const list = document.createElement('div');
    list.className = 'search-results-list';

    // Flatten results for keyboard navigation
    currentResults = [
      ...results.videos,
      ...results.faq
    ];

    // Render videos
    if (results.videos.length > 0) {
      const videoSection = createCategorySection('🎮 Filmy', results.videos, query);
      list.appendChild(videoSection);
    }

    // Render FAQ
    if (results.faq.length > 0) {
      const faqSection = createCategorySection('❓ FAQ', results.faq, query);
      list.appendChild(faqSection);
    }

    searchResults.appendChild(list);
    searchResults.classList.add('show');
    highlightedIndex = -1;
  }

  /**
   * Create category section
   */
  function createCategorySection(title, items, query) {
    const section = document.createElement('div');
    section.className = 'search-category';

    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'search-category-title';
    categoryTitle.textContent = title;
    section.appendChild(categoryTitle);

    items.forEach((item, index) => {
      const resultItem = createResultItem(item, query, index);
      section.appendChild(resultItem);
    });

    return section;
  }

  /**
   * Create individual result item
   */
  function createResultItem(item, query, index) {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.dataset.index = currentResults.indexOf(item);

    // Icon
    const icon = document.createElement('div');
    icon.className = 'search-result-icon';
    icon.textContent = item.type === 'video' ? item.categoryIcon : '❓';
    resultItem.appendChild(icon);

    // Content
    const content = document.createElement('div');
    content.className = 'search-result-content';

    const titleEl = document.createElement('div');
    titleEl.className = 'search-result-title';
    titleEl.innerHTML = highlightMatch(
      item.type === 'video' ? item.title : item.question,
      query
    );
    content.appendChild(titleEl);

    const meta = document.createElement('div');
    meta.className = 'search-result-meta';

    if (item.type === 'video') {
      const badge = document.createElement('span');
      badge.className = 'search-result-badge';
      badge.textContent = item.categoryName;
      meta.appendChild(badge);
    } else {
      const categoryText = document.createTextNode(getCategoryLabel(item.category));
      meta.appendChild(categoryText);
    }

    content.appendChild(meta);
    resultItem.appendChild(content);

    // Click handler
    resultItem.addEventListener('click', () => handleResultClick(item));

    return resultItem;
  }

  /**
   * Get FAQ category label
   */
  function getCategoryLabel(category) {
    const labels = {
      'general': 'Ogólne',
      'channel': 'O Kanale',
      'streams': 'Streamy',
      'technical': 'Techniczne',
      'games': 'Gry',
      'gameplay': 'Gameplay'
    };
    return labels[category] || category;
  }

  /**
   * Handle result item click
   */
  function handleResultClick(item) {
    console.log('[Search] Result clicked:', item);

    if (item.type === 'video') {
      // Open video modal
      if (window.VideoModal) {
        window.VideoModal.open(item.id, item.title);
        closeSearch();
      } else {
        console.error('[Search] VideoModal not available');
      }
    } else if (item.type === 'faq') {
      // Navigate to FAQ page with hash
      closeSearch();
      window.location.href = `/faq.html#faq-${item.id || item.question.replace(/\s+/g, '-').toLowerCase()}`;
    }
  }

  // ===================================
  // KEYBOARD NAVIGATION
  // ===================================

  /**
   * Handle keyboard navigation in results
   */
  function handleKeyboardNavigation(e) {
    if (!searchResults.classList.contains('show')) return;
    if (currentResults.length === 0) return;

    const items = searchResults.querySelectorAll('.search-result-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = Math.min(highlightedIndex + 1, currentResults.length - 1);
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(highlightedIndex - 1, -1);
      updateHighlight(items);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleResultClick(currentResults[highlightedIndex]);
    }
  }

  /**
   * Update visual highlight
   */
  function updateHighlight(items) {
    items.forEach((item, index) => {
      if (index === highlightedIndex) {
        item.classList.add('highlighted');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('highlighted');
      }
    });
  }

  // ===================================
  // UI STATE MANAGEMENT
  // ===================================

  /**
   * Show loading state
   */
  function showLoading() {
    searchResults.innerHTML = `
      <div class="search-loading">
        <div class="search-loading-spinner"></div>
        <div class="search-loading-text">Ładowanie...</div>
      </div>
    `;
    searchResults.classList.add('show');
  }

  /**
   * Show empty state
   */
  function showEmpty(message = 'Nie znaleziono wyników') {
    searchResults.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">🔍</div>
        <div class="search-empty-text">${message}</div>
      </div>
    `;
    searchResults.classList.add('show');
  }

  /**
   * Hide results
   */
  function hideResults() {
    searchResults.classList.remove('show');
    searchResults.innerHTML = '';
  }

  /**
   * Handle click outside search
   */
  function handleClickOutside(e) {
    if (!isSearchActive) return;

    // Check if click is outside BOTH search container AND dropdown overlay
    if (
      searchContainer && !searchContainer.contains(e.target) &&
      searchDropdownOverlay && !searchDropdownOverlay.contains(e.target)
    ) {
      closeSearch();
    }
  }

  // ===================================
  // HELPER FUNCTIONS
  // ===================================

  /**
   * Get playlist info from PLAYLISTS config
   */
  function getPlaylistInfo(category) {
    if (typeof getPlaylistInfo === 'function') {
      // Use global function if available
      return window.getPlaylistInfo ? window.getPlaylistInfo(category) : null;
    }

    // Fallback: search manually
    if (typeof PLAYLISTS === 'undefined') return null;

    if (category === 'shorts') {
      return PLAYLISTS.shorts;
    }

    for (const game in PLAYLISTS) {
      if (typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id) {
        if (PLAYLISTS[game][category]) {
          return PLAYLISTS[game][category];
        }
      }
    }

    return null;
  }

  // ===================================
  // PUBLIC API
  // ===================================

  window.Search = {
    init: initSearch,
    open: openSearch,
    close: closeSearch
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
