/**
 * Local Development Server
 * Express server for local development with API support
 */

require('dotenv').config({ path: '.env.local' });
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6969;

// ===================================
// MIDDLEWARE
// ===================================

// Parse JSON bodies
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===================================
// API ROUTES
// ===================================

// YouTube API endpoint
app.get('/api/youtube', async (req, res) => {
  try {
    // Import the serverless function handler
    const youtubeHandler = require('../api/youtube.js');

    // Call the handler with Express req/res
    await youtubeHandler(req, res);

  } catch (error) {
    console.error('[Server] API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasApiKey: !!process.env.YOUTUBE_API_KEY,
      nodeVersion: process.version
    }
  });
});

// ===================================
// STATIC FILES
// ===================================

// Serve static files from root directory
app.use(express.static(path.join(__dirname, '..'), {
  extensions: ['html', 'htm'],
  index: 'index.html'
}));

// Serve assets directory
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// ===================================
// ERROR HANDLING
// ===================================

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[Server] Error:', err);
  res.status(500).json({
    error: 'Server error',
    message: err.message
  });
});

// ===================================
// START SERVER
// ===================================

app.listen(PORT, () => {
  console.log('\n🚀 Development Server Started!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔑 API Key: ${process.env.YOUTUBE_API_KEY ? '✅ Loaded' : '❌ Missing'}`);
  console.log('\n📄 Available pages:');
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/gameplays.html`);
  console.log(`   - http://localhost:${PORT}/highlights.html`);
  console.log('\n🔌 API endpoints:');
  console.log(`   - http://localhost:${PORT}/api/youtube?playlist=tr1`);
  console.log(`   - http://localhost:${PORT}/api/youtube?playlist=shorts`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log('\n💡 Press Ctrl+C to stop\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down server...');
  process.exit(0);
});
