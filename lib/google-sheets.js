/**
 * Google Sheets API Helper
 * Handles reading and writing to Google Sheets as a simple database
 */

const { google } = require('googleapis');

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = 'Announcements';

/**
 * Create authorized Google Sheets client
 */
function getGoogleSheetsClient() {
  try {
    // For Vercel deployment, we'll use service account credentials from env
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error creating Google Sheets client:', error);
    throw new Error('Failed to authenticate with Google Sheets API');
  }
}

/**
 * Fetch all announcements from Google Sheets
 * @returns {Array} Array of announcement objects
 */
async function fetchAnnouncements() {
  try {
    const sheets = getGoogleSheetsClient();

    // Ensure sheet has proper headers before fetching
    await ensureSheetInitialized();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:K`, // Skip header row, columns A-K
    });

    const rows = response.data.values || [];

    // Convert rows to objects
    return rows.map((row, index) => {
      // Parse features (comma-separated string to array)
      const features = row[7] ? row[7].split(',').map(f => f.trim()) : [];

      return {
        id: row[0] || `ann-${index + 1}`,
        title: row[1] || '',
        description: row[2] || '',
        date: row[3] || '', // Format: YYYY-MM-DD
        time: row[4] || '', // Format: HH:MM
        platform: row[5] || 'TikTok',
        platformLink: row[6] || '',
        features: features,
        status: row[8] || 'scheduled', // scheduled, live, completed
        thumbnail: row[9] || '',
        createdAt: row[10] || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching announcements from Google Sheets:', error);
    throw error;
  }
}

/**
 * Add new announcement to Google Sheets
 * @param {Object} announcement - Announcement data
 * @returns {Object} Created announcement with ID
 */
async function addAnnouncement(announcement) {
  try {
    const sheets = getGoogleSheetsClient();

    // Ensure sheet has proper headers before adding data
    await ensureSheetInitialized();

    // Generate unique ID
    const id = `ann-${Date.now()}`;

    // Convert features array to comma-separated string
    const featuresString = Array.isArray(announcement.features)
      ? announcement.features.join(', ')
      : announcement.features || '';

    // Prepare row data
    const row = [
      id,
      announcement.title || '',
      announcement.description || '',
      announcement.date || '',
      announcement.time || '',
      announcement.platform || 'TikTok',
      announcement.platformLink || '',
      featuresString,
      announcement.status || 'scheduled',
      announcement.thumbnail || '',
      new Date().toISOString(),
    ];

    // Append row to sheet - use A2:K to ensure we append after headers
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:K`,
      valueInputOption: 'RAW',
      resource: {
        values: [row],
      },
    });

    return {
      id,
      ...announcement,
      features: announcement.features || [],
      createdAt: row[10],
    };
  } catch (error) {
    console.error('Error adding announcement to Google Sheets:', error);
    throw error;
  }
}

/**
 * Update existing announcement in Google Sheets
 * @param {String} id - Announcement ID
 * @param {Object} updates - Updated announcement data
 * @returns {Object} Updated announcement
 */
async function updateAnnouncement(id, updates) {
  try {
    const sheets = getGoogleSheetsClient();

    // Ensure sheet has proper headers
    await ensureSheetInitialized();

    // Verify headers are in place (row 1 should contain headers)
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:K1`,
    });

    const headers = headerCheck.data.values ? headerCheck.data.values[0] : [];
    if (!headers || headers.length === 0 || headers[0] !== 'ID') {
      throw new Error('Sheet structure is corrupted. Please reinitialize the sheet.');
    }

    // Find the row with this ID (starting from row 2 to skip headers)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:A`,
    });

    const ids = response.data.values || [];
    const dataRowIndex = ids.findIndex(row => row[0] === id);

    if (dataRowIndex === -1) {
      throw new Error(`Announcement with ID ${id} not found`);
    }

    // Row number (1-indexed, +2: +1 for header row, +1 for 0-indexed array)
    const rowNumber = dataRowIndex + 2;

    // Get current row data
    const currentRow = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:K${rowNumber}`,
    });

    const current = currentRow.data.values[0] || [];

    // Validate that we have the correct row structure
    if (current.length < 11) {
      console.warn(`Row ${rowNumber} has incomplete data (${current.length} columns). Filling with defaults.`);
    }

    // Convert features array to comma-separated string if needed
    const featuresString = updates.features
      ? (Array.isArray(updates.features) ? updates.features.join(', ') : updates.features)
      : (current[7] || '');

    // Merge updates with current data
    const updatedRow = [
      id, // Keep original ID (column A)
      updates.title !== undefined ? updates.title : (current[1] || ''), // column B
      updates.description !== undefined ? updates.description : (current[2] || ''), // column C
      updates.date !== undefined ? updates.date : (current[3] || ''), // column D
      updates.time !== undefined ? updates.time : (current[4] || ''), // column E
      updates.platform !== undefined ? updates.platform : (current[5] || 'TikTok'), // column F
      updates.platformLink !== undefined ? updates.platformLink : (current[6] || ''), // column G
      featuresString, // column H
      updates.status !== undefined ? updates.status : (current[8] || 'scheduled'), // column I
      updates.thumbnail !== undefined ? updates.thumbnail : (current[9] || ''), // column J
      current[10] || new Date().toISOString(), // column K - Keep original createdAt
    ];

    // Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:K${rowNumber}`,
      valueInputOption: 'RAW',
      resource: {
        values: [updatedRow],
      },
    });

    // Parse features back to array for return
    const features = updatedRow[7] ? updatedRow[7].split(',').map(f => f.trim()) : [];

    return {
      id: updatedRow[0],
      title: updatedRow[1],
      description: updatedRow[2],
      date: updatedRow[3],
      time: updatedRow[4],
      platform: updatedRow[5],
      platformLink: updatedRow[6],
      features,
      status: updatedRow[8],
      thumbnail: updatedRow[9],
      createdAt: updatedRow[10],
    };
  } catch (error) {
    console.error('Error updating announcement in Google Sheets:', error);
    throw error;
  }
}

/**
 * Delete announcement from Google Sheets
 * @param {String} id - Announcement ID
 * @returns {Boolean} Success status
 */
async function deleteAnnouncement(id) {
  try {
    const sheets = getGoogleSheetsClient();

    // Find the row with this ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });

    const ids = response.data.values || [];
    const rowIndex = ids.findIndex(row => row[0] === id);

    if (rowIndex === -1) {
      throw new Error(`Announcement with ID ${id} not found`);
    }

    // Row number (1-indexed, +1 because array is 0-indexed, +1 for header)
    const rowNumber = rowIndex + 2;

    // Delete the row using batchUpdate
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Assumes first sheet
                dimension: 'ROWS',
                startIndex: rowNumber - 1, // 0-indexed
                endIndex: rowNumber, // Exclusive
              },
            },
          },
        ],
      },
    });

    return true;
  } catch (error) {
    console.error('Error deleting announcement from Google Sheets:', error);
    throw error;
  }
}

/**
 * Ensure Google Sheets has proper header row
 * Validates and creates headers if missing or incorrect
 * @returns {Boolean} Success status
 */
async function ensureSheetInitialized() {
  try {
    const sheets = getGoogleSheetsClient();

    // Define expected headers
    const expectedHeaders = [
      'ID',
      'Title',
      'Description',
      'Date',
      'Time',
      'Platform',
      'Platform Link',
      'Features',
      'Status',
      'Thumbnail',
      'Created At',
    ];

    // Check if sheet exists and has row 1
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:K1`,
    });

    const currentHeaders = response.data.values ? response.data.values[0] : null;

    // Check if headers are missing or incorrect
    const needsInitialization = !currentHeaders ||
                                 currentHeaders.length === 0 ||
                                 currentHeaders[0] !== 'ID';

    if (needsInitialization) {
      console.log('Initializing Google Sheets with headers...');

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:K1`,
        valueInputOption: 'RAW',
        resource: {
          values: [expectedHeaders],
        },
      });

      console.log('Headers created successfully');
    }

    return true;
  } catch (error) {
    console.error('Error ensuring sheet initialization:', error);
    throw error;
  }
}

/**
 * Initialize Google Sheets with header row if needed
 * @deprecated Use ensureSheetInitialized() instead
 * @returns {Boolean} Success status
 */
async function initializeSheet() {
  return ensureSheetInitialized();
}

module.exports = {
  fetchAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  initializeSheet,
  ensureSheetInitialized,
};
