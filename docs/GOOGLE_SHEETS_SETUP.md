# 🔧 Google Sheets API Setup Guide

This guide will help you set up Google Sheets as a database for stream announcements.

---

## 📋 Overview

The admin panel uses Google Sheets to store stream announcements. This requires:

1. A Google Sheets spreadsheet
2. Google Cloud Project with Sheets API enabled
3. Service Account credentials
4. Environment variables configuration

---

## 🚀 Step 1: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"Bruxa Gaming - Stream Announcements"**
4. **Copy the Spreadsheet ID** from the URL:

   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

   Example: `1a2b3c4d5e6f7g8h9i0j`

5. **Note down this ID** - you'll need it later!

---

## 🔧 Step 2: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Project name: **"Bruxa Gaming Website"**
4. Click **"Create"**
5. Wait for project creation (this may take a minute)

---

## 📊 Step 3: Enable Google Sheets API

1. In Google Cloud Console, make sure your new project is selected
2. Go to **"APIs & Services"** → **"Library"**
3. Search for **"Google Sheets API"**
4. Click on **"Google Sheets API"**
5. Click **"Enable"**
6. Wait for API to be enabled

---

## 🔑 Step 4: Create Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"Service Account"**
3. Fill in details:
   - **Service account name**: `bruxa-admin`
   - **Service account ID**: (auto-generated)
   - **Description**: "Admin panel for managing stream announcements"
4. Click **"Create and Continue"**
5. **Role**: Select **"Editor"** (for full read/write access)
6. Click **"Continue"**
7. Click **"Done"**

---

## 📥 Step 5: Download Service Account Key

1. In **"Credentials"** page, find your service account
2. Click on the service account email (e.g., `bruxa-admin@...`)
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. **JSON file will download automatically** - save it securely!

⚠️ **Important**: This file contains sensitive credentials. Never commit it to Git or share it publicly!

---

## 🔐 Step 6: Share Spreadsheet with Service Account

1. Open the JSON file you just downloaded
2. Find the `client_email` field - it looks like:
   ```
   bruxa-admin@bruxa-gaming-website.iam.gserviceaccount.com
   ```
3. **Copy this email address**
4. Go back to your Google Spreadsheet
5. Click **"Share"** button (top right)
6. Paste the service account email
7. Make sure role is **"Editor"**
8. **Uncheck** "Notify people" (it's a bot, not a person!)
9. Click **"Share"**

---

## ⚙️ Step 7: Configure Environment Variables

1. Open the JSON credentials file
2. **Copy the ENTIRE content** (it should be one long line of JSON)
3. Open `.env.local` in your project
4. Update the following variables:

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_ID=your_spreadsheet_id_from_step_1
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...paste entire JSON here..."}
```

### Example:

```env
GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0j
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"bruxa-gaming-website","private_key_id":"abc123...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...","client_email":"bruxa-admin@bruxa-gaming-website.iam.gserviceaccount.com",...}
```

⚠️ **Important**:

- Replace `your_spreadsheet_id_from_step_1` with actual ID
- Paste the **entire JSON object** as a single line
- Make sure there are no line breaks in the JSON

---

## 🎨 Step 8: Initialize Spreadsheet Headers

The spreadsheet needs specific column headers. You can either:

### Option A: Manual Setup

Open your spreadsheet and add these headers in row 1:

| A   | B     | C           | D    | E    | F        | G             | H        | I      | J         | K          |
| --- | ----- | ----------- | ---- | ---- | -------- | ------------- | -------- | ------ | --------- | ---------- |
| ID  | Title | Description | Date | Time | Platform | Platform Link | Features | Status | Thumbnail | Created At |

### Option B: Automatic Setup (Recommended)

The system will automatically create headers on first use. Just make sure:

- Sheet name is **"Announcements"** (rename if needed)
- Row 1 is empty

When you add your first announcement via admin panel, headers will be created automatically.

---

## ✅ Step 9: Test the Setup

1. Deploy your website to Vercel (or restart local server)
2. Go to `/admin/announcements.html`
3. Log in with admin password
4. Try adding a test announcement
5. Check your Google Spreadsheet - you should see the new row!

If it works: **Congratulations! 🎉 Setup is complete!**

If not: See [Troubleshooting](#troubleshooting) below.

---

## 🐛 Troubleshooting

### Error: "Google Sheets API not configured"

**Cause**: Environment variables are missing or incorrect.

**Solution**:

1. Check `.env.local` file exists
2. Verify `GOOGLE_SHEETS_ID` is correct
3. Verify `GOOGLE_SHEETS_CREDENTIALS` is valid JSON
4. Restart your server after changing `.env.local`

### Error: "The caller does not have permission"

**Cause**: Service account doesn't have access to spreadsheet.

**Solution**:

1. Go to your Google Spreadsheet
2. Click "Share"
3. Make sure service account email is listed
4. Make sure role is "Editor"

### Error: "Unable to parse range"

**Cause**: Sheet name is wrong.

**Solution**:

1. Open your spreadsheet
2. Rename the sheet to **"Announcements"** (bottom left tab)
3. Try again

### Error: "Invalid JSON in credentials"

**Cause**: JSON is malformed in `.env.local`.

**Solution**:

1. Open the downloaded JSON file
2. Copy **entire content** (use Ctrl+A, Ctrl+C)
3. Paste as **single line** in `.env.local`
4. Make sure there are no line breaks or extra spaces

### Headers not created automatically

**Cause**: Sheet name is wrong or row 1 is not empty.

**Solution**:

1. Rename sheet to "Announcements"
2. Clear row 1 completely
3. Run the initialization function or add your first announcement

---

## 🔒 Security Best Practices

### DO:

✅ Keep JSON credentials file secure and private
✅ Add `.env.local` to `.gitignore` (already done)
✅ Use different service accounts for development and production
✅ Regularly rotate service account keys (every 90 days)
✅ Limit service account permissions to only Google Sheets API

### DON'T:

❌ Commit credentials to Git
❌ Share credentials in Slack/Discord/Email
❌ Use the same credentials for multiple projects
❌ Give service account more permissions than needed
❌ Store credentials in client-side code

---

## 📦 For Vercel Deployment

When deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add two variables:
   - `GOOGLE_SHEETS_ID`: Your spreadsheet ID
   - `GOOGLE_SHEETS_CREDENTIALS`: Entire JSON credentials (paste as-is)
3. Make sure to add them for all environments (Production, Preview, Development)
4. Redeploy your site

---

## 🔄 Updating Credentials

If you need to rotate or update credentials:

1. Go to Google Cloud Console
2. Navigate to your service account
3. Delete old key
4. Create new key (JSON)
5. Download new file
6. Update `.env.local` with new credentials
7. Update Vercel environment variables (if deployed)
8. Restart server / redeploy

---

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Service Accounts Overview](https://cloud.google.com/iam/docs/service-accounts)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## 📞 Need Help?

If you're stuck, don't hesitate to ask Arek for help!

---

**Document Version**: 1.0
**Last Updated**: November 16, 2025
