/**
 * HOME PAGE - Dynamic YouTube Data Loading
 * Handles hero video, channel info, latest gameplays, top highlights, and stats
 */

// ===================================
// CONFIGURATION
// ===================================

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://${window.location.hostname}:${window.location.port}/api`
  : '/api';

const PLAYLIST_CATEGORIES = ['tr1', 'tr1ub', 'tr2', 'tr2gold', 'tr3', 'tlolc'];
const SHORTS_CATEGORY = 'shorts';

// ===================================
// STATE MANAGEMENT
// ===================================

const state = {
  channelInfo: null,
  allVideos: [],
  gameplayVideos: [],
  shortVideos: [],
  stats: {
    totalGameplays: 0,
    totalHighlights: 0
  }
};

// ===================================
// API FUNCTIONS
// ===================================

/**
 * Fetch channel information
 */
async function fetchChannelInfo() {
  try {
    console.log('[Home] Fetching channel info...');
    const response = await fetch(`${API_BASE_URL}/channel`);

    if (!response.ok) {
      throw new Error('Failed to fetch channel info');
    }

    const data = await response.json();
    console.log('[Home] Channel info loaded:', data.cached ? '(cached)' : '(fresh)');

    return data.channel;
  } catch (error) {
    console.error('[Home] Error fetching channel info:', error);
    return null;
  }
}

/**
 * Fetch videos from a category
 */
async function fetchCategoryVideos(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/youtube?playlist=${category}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category}`);
    }

    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error(`[Home] Error fetching ${category}:`, error);
    return [];
  }
}

/**
 * Fetch all playlists
 */
async function fetchAllPlaylists() {
  try {
    console.log('[Home] Fetching all playlists...');

    const promises = PLAYLIST_CATEGORIES.map(cat => fetchCategoryVideos(cat));
    const results = await Promise.all(promises);

    // Flatten all videos
    const allVideos = results.flat();

    // Separate gameplays (non-shorts) and sort by actual publication date (newest first across all playlists)
    const gameplayVideos = allVideos
      .filter(v => !v.isShort)
      .sort((a, b) => new Date(b.publishedAtRaw) - new Date(a.publishedAtRaw));

    console.log(`[Home] Loaded ${allVideos.length} total videos, ${gameplayVideos.length} gameplays`);

    return { allVideos, gameplayVideos };
  } catch (error) {
    console.error('[Home] Error fetching playlists:', error);
    return { allVideos: [], gameplayVideos: [] };
  }
}

/**
 * Fetch shorts/highlights
 */
async function fetchShorts() {
  try {
    console.log('[Home] Fetching shorts...');
    const shorts = await fetchCategoryVideos(SHORTS_CATEGORY);

    // Sort by view count (descending)
    const sortedShorts = shorts.sort((a, b) => {
      const getNumericViews = (viewString) => {
        if (!viewString) return 0;
        const str = viewString.toString();
        if (str.includes('M')) return parseFloat(str) * 1000000;
        if (str.includes('K')) return parseFloat(str) * 1000;
        return parseFloat(str.replace(/,/g, '')) || 0;
      };

      return getNumericViews(b.views) - getNumericViews(a.views);
    });

    console.log(`[Home] Loaded ${sortedShorts.length} shorts`);
    return sortedShorts;
  } catch (error) {
    console.error('[Home] Error fetching shorts:', error);
    return [];
  }
}

// ===================================
// UI UPDATE FUNCTIONS
// ===================================

/**
 * Update hero section with latest gameplay video
 */
function updateHeroVideo(video) {
  const heroVideoContainer = document.querySelector('.featured-video');

  if (!heroVideoContainer || !video) {
    console.log('[Home] Hero video container not found or no video available');
    return;
  }

  // Create iframe embed
  heroVideoContainer.innerHTML = `
    <div class="video-embed-wrapper">
      <iframe
        src="${video.embedUrl}?rel=0&modestbranding=1"
        class="video-embed-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
    <div class="video-embed-info">
      <h3 class="video-embed-title">${video.title}</h3>
      <div class="video-embed-meta">
        <span>🕐 ${video.duration}</span>
        <span>👁 ${video.views}</span>
        <span>📅 ${video.publishedAt}</span>
      </div>
    </div>
  `;
}

/**
 * Update channel avatar and subscriber count
 */
function updateChannelInfo(channelInfo) {
  if (!channelInfo) return;

  // Update avatar
  const avatarElement = document.querySelector('.avatar');
  if (avatarElement) {
    avatarElement.innerHTML = `<img src="${channelInfo.avatar}" alt="${channelInfo.title}" loading="lazy">`;
  }

  // Update subscriber count with animation
  const subscriberElement = document.getElementById('subscriber-count');
  if (subscriberElement && channelInfo.subscriberCount) {

    // Parse the target count from formatted string (e.g., "47.2k" -> 47200)
    const countText = channelInfo.subscriberCount;
    let targetCount;

    if (countText.toLowerCase().includes('m')) {
      targetCount = parseFloat(countText) * 1000000;
    } else if (countText.toLowerCase().includes('k')) {
      targetCount = parseFloat(countText) * 1000;
    } else {
      targetCount = parseInt(countText);
    }

    // Animate the counter
    const duration = 2000; // 2 seconds
    const startCount = 0;
    const startTime = Date.now();

    function animateCount() {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(startCount + (targetCount - startCount) * progress);

      // Format with k/M suffix
      if (currentCount >= 1000000) {
        subscriberElement.textContent = (currentCount / 1000000).toFixed(1) + 'M';
      } else if (currentCount >= 1000) {
        subscriberElement.textContent = (currentCount / 1000).toFixed(1) + 'k';
      } else {
        subscriberElement.textContent = currentCount;
      }

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    }

    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(subscriberElement);
  }
}

/**
 * Create gameplay card HTML
 */
function createGameplayCard(video, isNew = false) {
  return `
    <article class="gameplay-card card">
      <div class="card-thumbnail-wrapper">
        <img
          src="${video.thumbnail}"
          alt="${video.title} - Tomb Raider Gameplay PL"
          class="card-thumbnail"
          loading="lazy">
        ${isNew ? '<span class="badge badge-new">NEW!</span>' : ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${video.title}</h3>
        <div class="card-metadata">
          <span>🕐 ${video.duration}</span>
          <span>👁 ${video.views}</span>
          <span>📅 ${video.publishedAt}</span>
        </div>
        <button
          class="btn btn-secondary btn-small watch-video-btn"
          data-video-id="${video.id}"
          data-video-title="${video.title}">
          Oglądaj →
        </button>
      </div>
    </article>
  `;
}

/**
 * Create highlight card HTML
 */
function createHighlightCard(video) {
  return `
    <article class="highlight-card card">
      <div class="card-thumbnail-wrapper">
        <img
          src="${video.thumbnail}"
          alt="${video.title} - Tomb Raider Highlights PL"
          class="card-thumbnail thumbnail-small"
          loading="lazy">
      </div>
      <div class="card-content">
        <h3 class="card-title">${video.title}</h3>
        <div class="card-metadata">
          <span>🕐 ${video.duration}</span>
          <span>👁 ${video.views}</span>
          <span>📅 ${video.publishedAt}</span>
        </div>
        <button
          class="btn btn-secondary btn-small watch-highlight-btn"
          data-video-id="${video.id}"
          data-video-title="${video.title}">
          Oglądaj →
        </button>
      </div>
    </article>
  `;
}

/**
 * Update latest gameplays section
 */
function updateLatestGameplays(videos) {
  const gridElement = document.querySelector('.gameplay-grid');

  if (!gridElement) {
    console.log('[Home] Gameplay grid not found');
    return;
  }

  if (videos.length === 0) {
    gridElement.innerHTML = '<p class="no-content-message">Brak dostępnych gameplay\'ów</p>';
    return;
  }

  // Take top 4 latest gameplays
  const latestVideos = videos.slice(0, 4);

  gridElement.innerHTML = latestVideos.map((video, index) =>
    createGameplayCard(video, index === 0)
  ).join('');

  // Add click handlers for watch buttons
  gridElement.querySelectorAll('.watch-video-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const videoId = btn.getAttribute('data-video-id');
      const videoTitle = btn.getAttribute('data-video-title');

      if (window.VideoModal) {
        window.VideoModal.open(videoId, videoTitle);
      } else {
        // Fallback: open in new tab
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      }
    });
  });
}

/**
 * Update highlights section
 */
function updateHighlights(videos) {
  const gridElement = document.querySelector('.highlights-grid');

  if (!gridElement) {
    console.log('[Home] Highlights grid not found');
    return;
  }

  if (videos.length === 0) {
    gridElement.innerHTML = '<p class="no-content-message">Brak dostępnych highlights</p>';
    return;
  }

  // Take top 4 most viewed shorts
  const topVideos = videos.slice(0, 4);

  gridElement.innerHTML = topVideos.map(video =>
    createHighlightCard(video)
  ).join('');

  // Add click handlers for buttons
  gridElement.querySelectorAll('.watch-highlight-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const videoId = btn.getAttribute('data-video-id');
      const videoTitle = btn.getAttribute('data-video-title');

      if (window.VideoModal) {
        window.VideoModal.open(videoId, videoTitle);
      } else {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      }
    });
  });
}

/**
 * Update gaming widgets stats
 */
function updateWidgetStats(gameplayCount, highlightCount) {
  const gameplayCountElement = document.getElementById('total-gameplays');
  const highlightCountElement = document.getElementById('total-highlights');

  if (gameplayCountElement) {
    gameplayCountElement.textContent = gameplayCount;
  }

  if (highlightCountElement) {
    highlightCountElement.textContent = highlightCount;
  }
}

/**
 * Update most viewed widget
 */
function updateMostViewedWidget(video) {
  const widgetElement = document.getElementById('most-viewed-widget');

  if (!widgetElement || !video) {
    return;
  }

  widgetElement.innerHTML = `
    <div class="widget-video-thumbnail" style="cursor: pointer;">
      <img src="${video.thumbnail}" alt="${video.title} - Tomb Raider Gameplay PL" loading="lazy" style="width: 100%; border-radius: 8px; margin-bottom: 12px;">
    </div>
    <h4 style="font-size: 14px; margin-bottom: 8px; color: var(--text-primary);">${video.title}</h4>
    <div style="display: flex; gap: 12px; justify-content: center; font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
      <span>👁 ${video.views}</span>
      <span>🕐 ${video.duration}</span>
    </div>
    <button class="btn btn-secondary btn-small btn-full watch-most-viewed-btn" data-video-id="${video.id}" data-video-title="${video.title}">
      Oglądaj →
    </button>
  `;

  // Add click handlers
  const thumbnail = widgetElement.querySelector('.widget-video-thumbnail');
  const button = widgetElement.querySelector('.watch-most-viewed-btn');

  const openVideo = () => {
    if (window.VideoModal) {
      window.VideoModal.open(video.id, video.title);
    } else {
      window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
    }
  };

  if (thumbnail) thumbnail.addEventListener('click', openVideo);
  if (button) button.addEventListener('click', openVideo);
}

/**
 * Setup random gameplay button
 */
function setupRandomGameplayButton() {
  const button = document.getElementById('random-gameplay-btn');

  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    const gameplays = state.gameplayVideos;

    if (gameplays.length === 0) {
      alert('Brak dostępnych gameplay\'ów!');
      return;
    }

    // Pick random gameplay (already filtered from shorts)
    const randomIndex = Math.floor(Math.random() * gameplays.length);
    const randomVideo = gameplays[randomIndex];

    if (window.VideoModal) {
      window.VideoModal.open(randomVideo.id, randomVideo.title);
    } else {
      window.open(`https://www.youtube.com/watch?v=${randomVideo.id}`, '_blank');
    }
  });
}

// ===================================
// INITIALIZATION
// ===================================

async function initHomePage() {
  try {
    console.log('[Home] Initializing home page...');

    // Show loading states
    const loadingMessage = 'Ładowanie...';

    // Fetch all data in parallel
    const [channelInfo, { gameplayVideos }, shortVideos] = await Promise.all([
      fetchChannelInfo(),
      fetchAllPlaylists(),
      fetchShorts()
    ]);

    // Update state
    state.channelInfo = channelInfo;
    state.gameplayVideos = gameplayVideos;
    state.shortVideos = shortVideos;
    state.stats.totalGameplays = gameplayVideos.length;
    state.stats.totalHighlights = shortVideos.length;

    // Update UI
    if (channelInfo) {
      updateChannelInfo(channelInfo);
    }

    if (gameplayVideos.length > 0) {
      // Update hero with newest gameplay (first in sorted array)
      const newestGameplay = gameplayVideos[0];
      updateHeroVideo(newestGameplay);

      // Update latest gameplays section
      updateLatestGameplays(gameplayVideos);
    }

    if (shortVideos.length > 0) {
      updateHighlights(shortVideos);
    }

    // Update widget stats
    updateWidgetStats(state.stats.totalGameplays, state.stats.totalHighlights);

    // Find and update most viewed video
    if (gameplayVideos.length > 0) {
      // Sort by view count to get most viewed
      const sortedByViews = [...gameplayVideos].sort((a, b) => {
        const getNumericViews = (viewString) => {
          if (!viewString) return 0;
          const str = viewString.toString();
          if (str.includes('M')) return parseFloat(str) * 1000000;
          if (str.includes('K')) return parseFloat(str) * 1000;
          return parseFloat(str.replace(/,/g, '')) || 0;
        };
        return getNumericViews(b.views) - getNumericViews(a.views);
      });

      const mostViewedVideo = sortedByViews[0];
      updateMostViewedWidget(mostViewedVideo);
    }

    // Setup random gameplay button
    setupRandomGameplayButton();

    // Generate schema markup for SEO
    if (gameplayVideos.length > 0 && window.SchemaGenerator) {
      // Generuj VideoObject schema dla pierwszych 3 filmów
      const featuredVideos = gameplayVideos.slice(0, 3);

      featuredVideos.forEach((video) => {
        const schema = window.SchemaGenerator.generateVideoSchema(video);
        window.SchemaGenerator.injectSchema(schema);
      });

      // Generuj ItemList schema dla całej listy
      const listSchema = window.SchemaGenerator.generateVideoListSchema(
        featuredVideos,
        "Najnowsze Tomb Raider Gameplays"
      );
      window.SchemaGenerator.injectSchema(listSchema);
    }

    console.log('[Home] Home page initialized successfully');

  } catch (error) {
    console.error('[Home] Error initializing home page:', error);
  }
}

// ===================================
// EVENT LISTENERS
// ===================================

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initHomePage,
    state
  };
}
