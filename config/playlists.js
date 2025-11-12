/**
 * YouTube Playlist Configuration
 * Maps category keys to YouTube playlist IDs
 */

const PLAYLISTS = {
  // Tomb Raider Gameplays
  tr1: {
    id: 'PLjCja23HvzLRPTApUu1ANPrfbpSh9EFmW',
    name: 'TR1 Remastered',
    icon: '🏺',
    description: 'Tomb Raider 1 Remastered gameplay series'
  },
  tr1ub: {
    id: 'PLjCja23HvzLR4HE2EdBMWR3Exs5JahXOY',
    name: 'TR1 Unfinished Business',
    icon: '🗡️',
    description: 'Tomb Raider 1: Unfinished Business expansion'
  },
  tr2: {
    id: 'PLjCja23HvzLSOr5dlZtaErCX0p0XZf9Q8',
    name: 'TR2 Remastered',
    icon: '🌏',
    description: 'Tomb Raider 2 Remastered gameplay series'
  },
  tr2gold: {
    id: 'PLjCja23HvzLT-j_1ncEOCeZCB3qxBxj31',
    name: 'TR2 Gold',
    icon: '🔺',
    description: 'Tomb Raider 2 Gold expansion'
  },
  tr3: {
    id: 'PLjCja23HvzLS6jRUfbEab5hrQxjcrm1mK',
    name: 'TR3 Remastered',
    icon: '📜',
    description: 'Tomb Raider 3 Remastered gameplay series'
  },
  tlolc: {
    id: 'PLjCja23HvzLRfiuPHDnolXBf4jC2IRuDJ',
    name: 'The Legend of Lara Croft',
    icon: '😈',
    description: 'Tomb Raider: The Legend of Lara Croft series'
  },

  // Highlights & Shorts
  shorts: {
    id: 'PLjCja23HvzLSL7ZIUqBmGH7mHxs_yNi2-',
    name: 'Tomb Raider Shorts',
    icon: '⭐',
    description: 'Best moments and highlights from Tomb Raider gameplay'
  }
};

/**
 * Get playlist ID by category key
 */
function getPlaylistId(category) {
  const playlist = PLAYLISTS[category];
  return playlist ? playlist.id : null;
}

/**
 * Get all gameplay categories (excluding shorts)
 */
function getGameplayCategories() {
  return Object.keys(PLAYLISTS).filter(key => key !== 'shorts');
}

/**
 * Get playlist info by category key
 */
function getPlaylistInfo(category) {
  return PLAYLISTS[category] || null;
}

/**
 * Check if category exists
 */
function isValidCategory(category) {
  return category in PLAYLISTS;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PLAYLISTS,
    getPlaylistId,
    getGameplayCategories,
    getPlaylistInfo,
    isValidCategory
  };
}
