/**
 * YouTube Playlist Configuration
 * Maps category keys to YouTube playlist IDs
 * Organized by game groups for multi-game support
 */

const PLAYLISTS = {
  // Tomb Raider Series
  'tomb-raider': {
    tr1: {
      id: 'PLjCja23HvzLRPTApUu1ANPrfbpSh9EFmW',
      name: 'TR1 Remastered',
      shortName: 'TR1',
      icon: '🏺',
      description: 'Tomb Raider 1 Remastered gameplay series'
    },
    tr1ub: {
      id: 'PLjCja23HvzLR4HE2EdBMWR3Exs5JahXOY',
      name: 'TR1 Unfinished Business',
      shortName: 'TR1 UB',
      icon: '🗡️',
      description: 'Tomb Raider 1: Unfinished Business expansion'
    },
    tr2: {
      id: 'PLjCja23HvzLSOr5dlZtaErCX0p0XZf9Q8',
      name: 'TR2 Remastered',
      shortName: 'TR2',
      icon: '🌏',
      description: 'Tomb Raider 2 Remastered gameplay series'
    },
    tr2gold: {
      id: 'PLjCja23HvzLT-j_1ncEOCeZCB3qxBxj31',
      name: 'TR2 Gold',
      shortName: 'TR2 Gold',
      icon: '🔺',
      description: 'Tomb Raider 2 Gold expansion'
    },
    tr3: {
      id: 'PLjCja23HvzLS6jRUfbEab5hrQxjcrm1mK',
      name: 'TR3 Remastered',
      shortName: 'TR3',
      icon: '📜',
      description: 'Tomb Raider 3 Remastered gameplay series'
    },
    tlolc: {
      id: 'PLjCja23HvzLRfiuPHDnolXBf4jC2IRuDJ',
      name: 'The Legend of Lara Croft',
      shortName: 'TLOLC',
      icon: '😈',
      description: 'Tomb Raider: The Legend of Lara Croft series'
    },
    trlegend: {
      id: 'PLjCja23HvzLTPln91WaZ9j4ysi5_O344g',
      name: 'TR Legend',
      shortName: 'TRL',
      icon: '🗝️',
      description: 'Tomb Raider: Legend gameplay series'
    }
  },

  // Other Games
  'other': {
    gtav: {
      id: 'PLjCja23HvzLQwjlCY_-fQDHWNPvrJPFGo',
      name: 'GTA V',
      shortName: 'GTA V',
      icon: '🚗',
      description: 'Grand Theft Auto V gameplay series'
    },
    duke: {
      id: 'PLjCja23HvzLQsZAbECkQnnK35drwXClfo',
      name: 'Duke Nukem: Manhattan Project',
      shortName: 'Duke Nukem',
      icon: '💣',
      description: 'Duke Nukem: Manhattan Project gameplay'
    }
  },

  // Highlights & Shorts (not part of a game group)
  'shorts': {
    id: 'PLjCja23HvzLSL7ZIUqBmGH7mHxs_yNi2-',
    name: 'Tomb Raider Shorts',
    icon: '⭐',
    description: 'Best moments and highlights from Tomb Raider gameplay'
  }
};

/**
 * Get playlist ID by category key
 * Searches across all game groups
 */
function getPlaylistId(category) {
  // Check if it's shorts
  if (category === 'shorts') {
    return PLAYLISTS.shorts.id;
  }

  // Search in all game groups
  for (const game in PLAYLISTS) {
    if (typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id) {
      // This is a game group
      if (PLAYLISTS[game][category]) {
        return PLAYLISTS[game][category].id;
      }
    }
  }

  return null;
}

/**
 * Get all gameplay categories for a specific game
 */
function getGameCategories(game) {
  if (!PLAYLISTS[game] || typeof PLAYLISTS[game] !== 'object' || PLAYLISTS[game].id) {
    return [];
  }
  return Object.keys(PLAYLISTS[game]);
}

/**
 * Get all gameplay categories (excluding shorts) - legacy support
 */
function getGameplayCategories() {
  const categories = [];
  for (const game in PLAYLISTS) {
    if (game !== 'shorts' && typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id) {
      categories.push(...Object.keys(PLAYLISTS[game]));
    }
  }
  return categories;
}

/**
 * Get playlist info by category key
 */
function getPlaylistInfo(category) {
  // Check if it's shorts
  if (category === 'shorts') {
    return PLAYLISTS.shorts;
  }

  // Search in all game groups
  for (const game in PLAYLISTS) {
    if (typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id) {
      if (PLAYLISTS[game][category]) {
        return PLAYLISTS[game][category];
      }
    }
  }

  return null;
}

/**
 * Check if category exists
 */
function isValidCategory(category) {
  if (category === 'shorts') {
    return true;
  }

  for (const game in PLAYLISTS) {
    if (typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id) {
      if (category in PLAYLISTS[game]) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check if game exists
 */
function isValidGame(game) {
  return game in PLAYLISTS && game !== 'shorts' && typeof PLAYLISTS[game] === 'object' && !PLAYLISTS[game].id;
}

/**
 * Get metadata for a game
 */
function getGameMetadata(game) {
  const metadata = {
    'tomb-raider': {
      title: 'Wszystkie Gameplay\'e - Tomb Raider',
      description: 'Kompletna kolekcja przygód z Larą Croft - od pierwszych kroków w Tomb Raider 1 po epickie finały!',
      icon: '🎮'
    },
    'other': {
      title: 'Wszystkie Gameplay\'e - Inne Gry',
      description: 'Kolekcja gameplay\'ów z różnych gier - GTA V, Duke Nukem i więcej!',
      icon: '🎲'
    }
  };

  return metadata[game] || metadata['tomb-raider'];
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PLAYLISTS,
    getPlaylistId,
    getGameCategories,
    getGameplayCategories,
    getPlaylistInfo,
    isValidCategory,
    isValidGame,
    getGameMetadata
  };
}
