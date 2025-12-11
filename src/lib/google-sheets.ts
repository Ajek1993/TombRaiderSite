/**
 * Google Sheets API Helper
 * Handles reading and writing to Google Sheets as a simple database
 */

import { google, sheets_v4 } from "googleapis";

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const ANNOUNCEMENTS_SHEET = "Announcements";
const FAQ_SHEET = "FAQ";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  platform: string;
  platformLink: string;
  features: string[];
  status: "scheduled" | "live" | "completed";
  thumbnail: string;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  visible: boolean;
  createdAt: string;
}

/**
 * Create authorized Google Sheets client
 */
function getGoogleSheetsClient(): sheets_v4.Sheets {
  try {
    const credentials = JSON.parse(
      process.env.GOOGLE_SHEETS_CREDENTIALS || "{}"
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("Error creating Google Sheets client:", error);
    throw new Error("Failed to authenticate with Google Sheets API");
  }
}

// ==================== ANNOUNCEMENTS ====================

/**
 * Ensure Announcements sheet has proper header row
 */
async function ensureAnnouncementsSheetInitialized(): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const expectedHeaders = [
      "ID",
      "Title",
      "Description",
      "Date",
      "Time",
      "Platform",
      "Platform Link",
      "Features",
      "Status",
      "Thumbnail",
      "Created At",
    ];

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A1:K1`,
    });

    const currentHeaders = response.data.values
      ? response.data.values[0]
      : null;

    const needsInitialization =
      !currentHeaders ||
      currentHeaders.length === 0 ||
      currentHeaders[0] !== "ID";

    if (needsInitialization) {
      console.log("Initializing Announcements sheet with headers...");

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${ANNOUNCEMENTS_SHEET}!A1:K1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [expectedHeaders],
        },
      });

      console.log("Announcements headers created successfully");
    }

    return true;
  } catch (error) {
    console.error("Error ensuring sheet initialization:", error);
    throw error;
  }
}

/**
 * Fetch all announcements from Google Sheets
 */
export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const sheets = getGoogleSheetsClient();
    await ensureAnnouncementsSheetInitialized();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A2:K`,
    });

    const rows = response.data.values || [];

    return rows.map((row, index) => {
      const features = row[7] ? row[7].split(",").map((f: string) => f.trim()) : [];

      return {
        id: row[0] || `ann-${index + 1}`,
        title: row[1] || "",
        description: row[2] || "",
        date: row[3] || "",
        time: row[4] || "",
        platform: row[5] || "TikTok",
        platformLink: row[6] || "",
        features: features,
        status: (row[8] || "scheduled") as Announcement["status"],
        thumbnail: row[9] || "",
        createdAt: row[10] || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching announcements from Google Sheets:", error);
    throw error;
  }
}

/**
 * Add new announcement to Google Sheets
 */
export async function addAnnouncement(
  announcement: Omit<Announcement, "id" | "createdAt">
): Promise<Announcement> {
  try {
    const sheets = getGoogleSheetsClient();
    await ensureAnnouncementsSheetInitialized();

    const id = `ann-${Date.now()}`;
    const featuresString = Array.isArray(announcement.features)
      ? announcement.features.join(", ")
      : announcement.features || "";

    const row = [
      id,
      announcement.title || "",
      announcement.description || "",
      announcement.date || "",
      announcement.time || "",
      announcement.platform || "TikTok",
      announcement.platformLink || "",
      featuresString,
      announcement.status || "scheduled",
      announcement.thumbnail || "",
      new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A2:K`,
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    return {
      id,
      ...announcement,
      features: announcement.features || [],
      createdAt: row[10] as string,
    };
  } catch (error) {
    console.error("Error adding announcement to Google Sheets:", error);
    throw error;
  }
}

/**
 * Update existing announcement in Google Sheets
 */
export async function updateAnnouncement(
  id: string,
  updates: Partial<Announcement>
): Promise<Announcement> {
  try {
    const sheets = getGoogleSheetsClient();
    await ensureAnnouncementsSheetInitialized();

    // Find the row with this ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A2:A`,
    });

    const ids = response.data.values || [];
    const dataRowIndex = ids.findIndex((row) => row[0] === id);

    if (dataRowIndex === -1) {
      throw new Error(`Announcement with ID ${id} not found`);
    }

    const rowNumber = dataRowIndex + 2;

    // Get current row data
    const currentRow = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A${rowNumber}:K${rowNumber}`,
    });

    const current = currentRow.data.values?.[0] || [];

    const featuresString = updates.features
      ? Array.isArray(updates.features)
        ? updates.features.join(", ")
        : updates.features
      : current[7] || "";

    const updatedRow = [
      id,
      updates.title !== undefined ? updates.title : current[1] || "",
      updates.description !== undefined
        ? updates.description
        : current[2] || "",
      updates.date !== undefined ? updates.date : current[3] || "",
      updates.time !== undefined ? updates.time : current[4] || "",
      updates.platform !== undefined
        ? updates.platform
        : current[5] || "TikTok",
      updates.platformLink !== undefined
        ? updates.platformLink
        : current[6] || "",
      featuresString,
      updates.status !== undefined ? updates.status : current[8] || "scheduled",
      updates.thumbnail !== undefined ? updates.thumbnail : current[9] || "",
      current[10] || new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A${rowNumber}:K${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [updatedRow],
      },
    });

    const features = updatedRow[7]
      ? (updatedRow[7] as string).split(",").map((f) => f.trim())
      : [];

    return {
      id: updatedRow[0] as string,
      title: updatedRow[1] as string,
      description: updatedRow[2] as string,
      date: updatedRow[3] as string,
      time: updatedRow[4] as string,
      platform: updatedRow[5] as string,
      platformLink: updatedRow[6] as string,
      features,
      status: updatedRow[8] as Announcement["status"],
      thumbnail: updatedRow[9] as string,
      createdAt: updatedRow[10] as string,
    };
  } catch (error) {
    console.error("Error updating announcement in Google Sheets:", error);
    throw error;
  }
}

/**
 * Delete announcement from Google Sheets
 */
export async function deleteAnnouncement(id: string): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ANNOUNCEMENTS_SHEET}!A:A`,
    });

    const ids = response.data.values || [];
    const rowIndex = ids.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      throw new Error(`Announcement with ID ${id} not found`);
    }

    const rowNumber = rowIndex + 1;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: "ROWS",
                startIndex: rowNumber - 1,
                endIndex: rowNumber,
              },
            },
          },
        ],
      },
    });

    return true;
  } catch (error) {
    console.error("Error deleting announcement from Google Sheets:", error);
    throw error;
  }
}

// ==================== FAQ ====================

/**
 * Get sheet ID by name
 */
async function getSheetId(
  sheets: sheets_v4.Sheets,
  sheetName: string
): Promise<number> {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = response.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );

    if (!sheet || sheet.properties?.sheetId === undefined || sheet.properties.sheetId === null) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    return sheet.properties.sheetId as number;
  } catch (error) {
    console.error("Error getting sheet ID:", error);
    throw error;
  }
}

/**
 * Ensure FAQ sheet has proper header row
 */
async function ensureFAQSheetInitialized(): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const expectedHeaders = [
      "ID",
      "Question",
      "Answer",
      "Category",
      "Order",
      "Visible",
      "Created At",
    ];

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${FAQ_SHEET}!A1:G1`,
      });

      const currentHeaders = response.data.values
        ? response.data.values[0]
        : null;

      const needsInitialization =
        !currentHeaders ||
        currentHeaders.length === 0 ||
        currentHeaders[0] !== "ID";

      if (needsInitialization) {
        console.log("Initializing FAQ sheet with headers...");

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${FAQ_SHEET}!A1:G1`,
          valueInputOption: "RAW",
          requestBody: {
            values: [expectedHeaders],
          },
        });

        console.log("FAQ headers created successfully");
      }
    } catch (error) {
      // If sheet doesn't exist, create it
      if (
        error instanceof Error &&
        error.message.includes("Unable to parse range")
      ) {
        console.log("Creating FAQ sheet...");

        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: FAQ_SHEET,
                  },
                },
              },
            ],
          },
        });

        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${FAQ_SHEET}!A1:G1`,
          valueInputOption: "RAW",
          requestBody: {
            values: [expectedHeaders],
          },
        });

        console.log("FAQ sheet created successfully");
      } else {
        throw error;
      }
    }

    return true;
  } catch (error) {
    console.error("Error ensuring FAQ sheet initialization:", error);
    throw error;
  }
}

/**
 * Fetch all FAQ items from Google Sheets
 */
export async function fetchFAQ(): Promise<FAQ[]> {
  try {
    const sheets = getGoogleSheetsClient();
    await ensureFAQSheetInitialized();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FAQ_SHEET}!A2:G`,
    });

    const rows = response.data.values || [];

    return rows.map((row, index) => {
      return {
        id: row[0] || `faq-${index + 1}`,
        question: row[1] || "",
        answer: row[2] || "",
        category: row[3] || "Ogólne/O Kanale",
        order: parseInt(row[4]) || index,
        visible:
          String(row[5]).toLowerCase() === "true" ||
          row[5] === true ||
          row[5] === "1",
        createdAt: row[6] || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching FAQ from Google Sheets:", error);
    throw error;
  }
}

/**
 * Add new FAQ item to Google Sheets
 */
export async function addFAQ(faq: Omit<FAQ, "id" | "createdAt">): Promise<FAQ> {
  try {
    const sheets = getGoogleSheetsClient();
    await ensureFAQSheetInitialized();

    const id = `faq-${Date.now()}`;

    const row = [
      id,
      faq.question || "",
      faq.answer || "",
      faq.category || "Ogólne/O Kanale",
      faq.order !== undefined ? faq.order : 0,
      faq.visible !== undefined ? String(faq.visible).toLowerCase() : "true",
      new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FAQ_SHEET}!A2:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return {
      id,
      question: row[1] as string,
      answer: row[2] as string,
      category: row[3] as string,
      order: parseInt(row[4] as string),
      visible: row[5] === "true",
      createdAt: row[6] as string,
    };
  } catch (error) {
    console.error("Error adding FAQ to Google Sheets:", error);
    throw error;
  }
}

/**
 * Update existing FAQ item in Google Sheets
 */
export async function updateFAQ(
  id: string,
  updates: Partial<FAQ>
): Promise<FAQ> {
  try {
    const sheets = getGoogleSheetsClient();
    await ensureFAQSheetInitialized();

    // Find the row with this ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FAQ_SHEET}!A2:A`,
    });

    const ids = response.data.values || [];
    const dataRowIndex = ids.findIndex((row) => row[0] === id);

    if (dataRowIndex === -1) {
      throw new Error(`FAQ with ID ${id} not found`);
    }

    const rowNumber = dataRowIndex + 2;

    // Get current row data
    const currentRow = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FAQ_SHEET}!A${rowNumber}:G${rowNumber}`,
    });

    const current = currentRow.data.values?.[0] || [];

    const updatedRow = [
      id,
      updates.question !== undefined ? updates.question : current[1] || "",
      updates.answer !== undefined ? updates.answer : current[2] || "",
      updates.category !== undefined
        ? updates.category
        : current[3] || "Ogólne/O Kanale",
      updates.order !== undefined ? updates.order : parseInt(current[4]) || 0,
      updates.visible !== undefined
        ? String(updates.visible).toLowerCase()
        : current[5] === "true" ||
            current[5] === true ||
            current[5] === "1"
          ? "true"
          : "false",
      current[6] || new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FAQ_SHEET}!A${rowNumber}:G${rowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [updatedRow],
      },
    });

    return {
      id: updatedRow[0] as string,
      question: updatedRow[1] as string,
      answer: updatedRow[2] as string,
      category: updatedRow[3] as string,
      order: parseInt(updatedRow[4] as string),
      visible: updatedRow[5] === "true",
      createdAt: updatedRow[6] as string,
    };
  } catch (error) {
    console.error("Error updating FAQ in Google Sheets:", error);
    throw error;
  }
}

/**
 * Delete FAQ item from Google Sheets
 */
export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FAQ_SHEET}!A:A`,
    });

    const ids = response.data.values || [];
    const rowIndex = ids.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      throw new Error(`FAQ with ID ${id} not found`);
    }

    const rowNumber = rowIndex + 1;
    const sheetId = await getSheetId(sheets, FAQ_SHEET);

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: rowNumber - 1,
                endIndex: rowNumber,
              },
            },
          },
        ],
      },
    });

    return true;
  } catch (error) {
    console.error("Error deleting FAQ from Google Sheets:", error);
    throw error;
  }
}
