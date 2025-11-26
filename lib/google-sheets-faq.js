/**
 * Google Sheets FAQ API Helper
 * Handles reading and writing FAQ to Google Sheets as a simple database
 */

const { google } = require('googleapis');

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = 'FAQ';

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
 * Fetch all FAQ items from Google Sheets
 * @returns {Array} Array of FAQ objects
 */
async function fetchFAQ() {
  try {
    const sheets = getGoogleSheetsClient();

    // Ensure sheet has proper headers before fetching
    await ensureSheetInitialized();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:G`, // Skip header row, columns A-G
    });

    const rows = response.data.values || [];

    // Convert rows to objects
    return rows.map((row, index) => {
      return {
        id: row[0] || `faq-${index + 1}`,
        question: row[1] || '',
        answer: row[2] || '',
        category: row[3] || 'Ogólne/O Kanale',
        order: parseInt(row[4]) || index,
        visible: String(row[5]).toLowerCase() === 'true' || row[5] === true || row[5] === 1,
        createdAt: row[6] || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching FAQ from Google Sheets:', error);
    throw error;
  }
}

/**
 * Add new FAQ item to Google Sheets
 * @param {Object} faq - FAQ data
 * @returns {Object} Created FAQ with ID
 */
async function addFAQ(faq) {
  try {
    const sheets = getGoogleSheetsClient();

    // Ensure sheet has proper headers before adding data
    await ensureSheetInitialized();

    // Generate unique ID
    const id = `faq-${Date.now()}`;

    // Prepare row data
    const row = [
      id,
      faq.question || '',
      faq.answer || '',
      faq.category || 'Ogólne/O Kanale',
      faq.order !== undefined ? faq.order : 0,
      faq.visible !== undefined ? String(faq.visible).toLowerCase() : 'true',
      new Date().toISOString(),
    ];

    // Append row to sheet - use A2:G to ensure we append after headers
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:G`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [row],
      },
    });

    return {
      id,
      question: row[1],
      answer: row[2],
      category: row[3],
      order: parseInt(row[4]),
      visible: row[5],
      createdAt: row[6],
    };
  } catch (error) {
    console.error('Error adding FAQ to Google Sheets:', error);
    throw error;
  }
}

/**
 * Update existing FAQ item in Google Sheets
 * @param {String} id - FAQ ID
 * @param {Object} updates - Updated FAQ data
 * @returns {Object} Updated FAQ
 */
async function updateFAQ(id, updates) {
  try {
    const sheets = getGoogleSheetsClient();

    // Ensure sheet has proper headers
    await ensureSheetInitialized();

    // Verify headers are in place (row 1 should contain headers)
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:G1`,
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
      throw new Error(`FAQ with ID ${id} not found`);
    }

    // Row number (1-indexed, +2: +1 for header row, +1 for 0-indexed array)
    const rowNumber = dataRowIndex + 2;

    // Get current row data
    const currentRow = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:G${rowNumber}`,
    });

    const current = currentRow.data.values[0] || [];

    // Validate that we have the correct row structure
    if (current.length < 7) {
      console.warn(`Row ${rowNumber} has incomplete data (${current.length} columns). Filling with defaults.`);
    }

    // Merge updates with current data
    const updatedRow = [
      id, // Keep original ID (column A)
      updates.question !== undefined ? updates.question : (current[1] || ''), // column B
      updates.answer !== undefined ? updates.answer : (current[2] || ''), // column C
      updates.category !== undefined ? updates.category : (current[3] || 'Ogólne/O Kanale'), // column D
      updates.order !== undefined ? updates.order : (parseInt(current[4]) || 0), // column E
      updates.visible !== undefined ? String(updates.visible).toLowerCase() : (current[5] === 'true' || current[5] === true || current[5] === '1' ? 'true' : 'false'), // column F
      current[6] || new Date().toISOString(), // column G - Keep original createdAt
    ];

    // Update the row
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A${rowNumber}:G${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [updatedRow],
      },
    });

    return {
      id: updatedRow[0],
      question: updatedRow[1],
      answer: updatedRow[2],
      category: updatedRow[3],
      order: parseInt(updatedRow[4]),
      visible: updatedRow[5],
      createdAt: updatedRow[6],
    };
  } catch (error) {
    console.error('Error updating FAQ in Google Sheets:', error);
    throw error;
  }
}

/**
 * Delete FAQ item from Google Sheets
 * @param {String} id - FAQ ID
 * @returns {Boolean} Success status
 */
async function deleteFAQ(id) {
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
      throw new Error(`FAQ with ID ${id} not found`);
    }

    // Row number (1-indexed)
    const rowNumber = rowIndex + 1;

    // Delete the row using batchUpdate
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: await getSheetId(sheets, SHEET_NAME),
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
    console.error('Error deleting FAQ from Google Sheets:', error);
    throw error;
  }
}

/**
 * Get sheet ID by name
 * @param {Object} sheets - Google Sheets client
 * @param {String} sheetName - Name of the sheet
 * @returns {Number} Sheet ID
 */
async function getSheetId(sheets, sheetName) {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = response.data.sheets.find(
      s => s.properties.title === sheetName
    );

    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    return sheet.properties.sheetId;
  } catch (error) {
    console.error('Error getting sheet ID:', error);
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
      'Question',
      'Answer',
      'Category',
      'Order',
      'Visible',
      'Created At',
    ];

    // Check if sheet exists
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:G1`,
      });

      const currentHeaders = response.data.values ? response.data.values[0] : null;

      // Check if headers are missing or incorrect
      const needsInitialization = !currentHeaders ||
                                   currentHeaders.length === 0 ||
                                   currentHeaders[0] !== 'ID';

      if (needsInitialization) {
        console.log('Initializing FAQ sheet with headers...');

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:G1`,
          valueInputOption: 'RAW',
          resource: {
            values: [expectedHeaders],
          },
        });

        console.log('FAQ headers created successfully');
      }
    } catch (error) {
      // If sheet doesn't exist, create it
      if (error.message.includes('Unable to parse range')) {
        console.log('Creating FAQ sheet...');

        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          resource: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: SHEET_NAME,
                  },
                },
              },
            ],
          },
        });

        // Add headers to the new sheet
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:G1`,
          valueInputOption: 'RAW',
          resource: {
            values: [expectedHeaders],
          },
        });

        console.log('FAQ sheet created successfully');
      } else {
        throw error;
      }
    }

    return true;
  } catch (error) {
    console.error('Error ensuring FAQ sheet initialization:', error);
    throw error;
  }
}

module.exports = {
  fetchFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  ensureSheetInitialized,
};
