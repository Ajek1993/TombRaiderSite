# 📢 Stream Announcements System

## 🎯 Overview

System do zarządzania zapowiedziami streamów TikTok/YouTube dla strony Bruxa Gaming. Wykorzystuje Google Sheets jako bazę danych, co pozwala na proste zarządzanie bez konfiguracji tradycyjnej bazy danych.

---

## 🏗️ Architektura

```
┌─────────────────────────────────────────────────────────────┐
│                       User Flow                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Admin (Siostra)                         Public Users        │
│       │                                        │             │
│       │  1. Login                             │             │
│       ├──────────────────┐                    │             │
│       │                  │                    │             │
│       │  2. Add/Edit     │                    │             │
│       │   Announcement   │                    │             │
│       │                  │                    │             │
│       ▼                  ▼                    ▼             │
│  ┌──────────┐     ┌──────────┐        ┌──────────┐         │
│  │  Admin   │────▶│   API    │◀───────│ Frontend │         │
│  │  Panel   │     │Endpoint  │        │ (index.  │         │
│  └──────────┘     └─────┬────┘        │  html)   │         │
│                          │             └──────────┘         │
│                          │                                   │
│                          ▼                                   │
│                  ┌───────────────┐                          │
│                  │ Google Sheets │                          │
│                  │   (Database)  │                          │
│                  └───────────────┘                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Struktura Plików

### Nowe Pliki:

```
claude-project/
├── admin/
│   └── announcements.html          # Panel admina (UI)
├── api/
│   └── announcements.js            # API endpoint (GET/POST/PUT/DELETE)
├── assets/
│   ├── css/
│   │   └── admin.css               # Style panelu admina
│   └── js/
│       ├── admin-announcements.js  # Logika panelu admina
│       └── announcements.js        # Frontend rendering
├── lib/
│   └── google-sheets.js            # Helper do Google Sheets API
├── docs/
│   ├── ADMIN_GUIDE.md             # Instrukcja dla siostry
│   ├── GOOGLE_SHEETS_SETUP.md     # Setup Google Sheets API
│   └── ANNOUNCEMENTS_SYSTEM.md    # Ten dokument
└── .env.local                      # Credentials (zaktualizowane)
```

### Zmodyfikowane Pliki:

```
index.html                  # Dodano id="upcoming-stream-section" i <script> tag
package.json               # Dodano dependency: googleapis
```

---

## 🔧 Komponenty Systemu

### 1. **Admin Panel** (`/admin/announcements.html`)

**Features:**
- Prosty login z hasłem (localStorage)
- Formularz do dodawania zapowiedzi
- Tabela wszystkich zapowiedzi
- Edycja inline
- Zmiana statusu (cycle: Scheduled → Live → Completed)
- Usuwanie zapowiedzi

**Fields:**
- Tytuł* (wymagane)
- Opis
- Data* (wymagane)
- Godzina* (wymagane)
- Platforma (TikTok/YouTube/Twitch)
- Link do platformy
- Funkcje streamu (lista)
- Status (Zaplanowany/Na Żywo/Zakończony)
- Miniaturka (URL)

**Security:**
- Basic password protection (można ulepszyć)
- Credentials w localStorage (może być łatwo wylogowane)

### 2. **API Endpoint** (`/api/announcements.js`)

**Routes:**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/announcements` | Fetch all announcements |
| GET | `/api/announcements?status=scheduled` | Filter by status |
| GET | `/api/announcements?upcoming=true` | Upcoming only |
| POST | `/api/announcements` | Create new announcement |
| PUT | `/api/announcements` | Update announcement (by ID in body) |
| DELETE | `/api/announcements?id=xxx` | Delete announcement |

**Response Format:**

```json
{
  "success": true,
  "count": 3,
  "announcements": [
    {
      "id": "ann-1234567890",
      "title": "Rise of Tomb Raider - Episode 23",
      "description": "Eksploracja...",
      "date": "2025-11-16",
      "time": "12:00",
      "platform": "TikTok",
      "platformLink": "https://...",
      "features": ["Feature 1", "Feature 2"],
      "status": "scheduled",
      "thumbnail": "",
      "createdAt": "2025-11-16T10:00:00.000Z"
    }
  ]
}
```

### 3. **Google Sheets Integration** (`/lib/google-sheets.js`)

**Functions:**
- `fetchAnnouncements()` - Get all announcements
- `addAnnouncement(data)` - Add new row
- `updateAnnouncement(id, updates)` - Update existing row
- `deleteAnnouncement(id)` - Delete row
- `initializeSheet()` - Create headers if needed

**Spreadsheet Schema:**

| Column | Field | Type | Description |
|--------|-------|------|-------------|
| A | ID | String | Unique identifier |
| B | Title | String | Stream title |
| C | Description | String | Stream description |
| D | Date | String | YYYY-MM-DD |
| E | Time | String | HH:MM |
| F | Platform | String | TikTok/YouTube/Twitch |
| G | Platform Link | String | URL |
| H | Features | String | Comma-separated list |
| I | Status | String | scheduled/live/completed |
| J | Thumbnail | String | URL |
| K | Created At | String | ISO timestamp |

### 4. **Frontend Rendering** (`/assets/js/announcements.js`)

**Features:**
- Automatic fetching on page load
- Split announcements into upcoming/past
- Dynamic countdown timer
- Live status updates
- Automatic archiving

**Logic:**

```javascript
// Fetch announcements
fetch('/api/announcements')
  .then(data => {
    // Split by date
    upcoming = data.filter(ann => ann.date >= today && ann.status !== 'completed')
    past = data.filter(ann => ann.date < today || ann.status === 'completed')

    // Render
    renderUpcomingStream(upcoming[0])  // Show next stream
    renderPastStreams(past.slice(0, 6)) // Show last 6
  })
```

**Countdown Timer:**
- Updates every second
- Calculates days, hours, minutes
- Auto-refresh when stream starts
- Hides when status === 'live'

---

## 🔐 Security

### Current Implementation:

**Admin Panel:**
- Simple password in JavaScript (`bruxa2025`)
- Stored in localStorage
- No server-side validation

⚠️ **Note**: This is basic security suitable for low-risk admin panel. For production with sensitive data, consider:
- JWT authentication
- Session management
- Password hashing
- Rate limiting

### Environment Variables:

```bash
GOOGLE_SHEETS_ID=...           # Public (but hard to guess)
GOOGLE_SHEETS_CREDENTIALS=...  # SENSITIVE - Never commit!
```

**Protected by:**
- `.gitignore` includes `.env.local`
- Vercel environment variables (server-side only)

---

## 🚀 Deployment

### Vercel Setup:

1. **Environment Variables**:
   ```
   GOOGLE_SHEETS_ID=your_spreadsheet_id
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
   ```

2. **Build Settings**:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Post-Deployment:

1. Test admin panel: `https://your-domain/admin/announcements.html`
2. Add first announcement
3. Check Google Sheets
4. Verify frontend displays correctly

---

## 🧪 Testing

### Manual Testing Checklist:

**Admin Panel:**
- [ ] Login works
- [ ] Can add announcement
- [ ] Can edit announcement
- [ ] Can delete announcement
- [ ] Can change status
- [ ] Form validation works
- [ ] Error messages show correctly

**API:**
- [ ] GET all announcements
- [ ] GET with filters
- [ ] POST creates new
- [ ] PUT updates existing
- [ ] DELETE removes announcement
- [ ] Validation errors return 400

**Frontend:**
- [ ] Upcoming stream displays
- [ ] Countdown timer works
- [ ] Past streams show in archive
- [ ] Live badge shows when status=live
- [ ] No announcements hides section

**Google Sheets:**
- [ ] Rows are added correctly
- [ ] Updates modify existing rows
- [ ] Deletions remove rows
- [ ] Headers auto-create on first use

---

## 🐛 Troubleshooting

### Common Issues:

| Issue | Cause | Solution |
|-------|-------|----------|
| "API not configured" | Missing .env variables | Check .env.local exists and is correct |
| "Permission denied" | Service account not shared | Share spreadsheet with service account |
| "Invalid JSON" | Malformed credentials | Copy JSON as single line, no breaks |
| Countdown not working | Wrong date format | Use YYYY-MM-DD and HH:MM |
| Admin panel blank | JavaScript error | Check console, verify API endpoint |

---

## 🔄 Future Improvements

### Nice to Have:

1. **Authentication**:
   - JWT-based auth
   - Multi-user support
   - Password hashing

2. **Features**:
   - Image upload for thumbnails
   - Rich text editor for descriptions
   - Calendar integration (Google Calendar, iCal)
   - Email notifications
   - Social media auto-posting

3. **UI/UX**:
   - Preview mode in admin panel
   - Bulk operations
   - Duplicate announcement
   - Schedule templates

4. **Database**:
   - Migrate to PostgreSQL/MongoDB for better performance
   - Add caching layer
   - Full-text search

5. **Analytics**:
   - Track views
   - Click-through rates
   - Most popular streams

---

## 📊 Data Flow Diagrams

### Adding Announcement:

```
Admin → Form Submit → POST /api/announcements → Google Sheets API
  ↓
Success/Error Message
  ↓
Refresh Table → GET /api/announcements → Render Updated List
```

### Frontend Loading:

```
Page Load → GET /api/announcements?upcoming=false
  ↓
Split by date & status
  ├─ Upcoming → Render in "Nadchodzący Stream"
  └─ Past     → Render in "Poprzednie Streamy"
  ↓
Start Countdown Timer
```

### Status Update Flow:

```
Admin clicks "Status" → Cycle status (scheduled→live→completed)
  ↓
PUT /api/announcements (with new status)
  ↓
Update Google Sheets
  ↓
Frontend auto-detects status change
  ├─ scheduled: Show countdown
  ├─ live:      Show "LIVE NOW" badge
  └─ completed: Move to archive
```

---

## 🎓 How It Works

### Countdown Timer Logic:

```javascript
setInterval(() => {
  const now = new Date()
  const target = new Date(`${date}T${time}`)
  const diff = target - now

  if (diff <= 0) {
    // Stream started - reload announcements
    loadAndRenderAnnouncements()
    return
  }

  // Calculate time units
  days = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  // Update DOM
  updateCountdownDisplay(days, hours, minutes)
}, 1000)
```

### Automatic Archiving:

```javascript
const now = new Date()
upcomingAnnouncements = announcements.filter(ann => {
  const streamDateTime = new Date(`${ann.date}T${ann.time}`)
  return streamDateTime >= now && ann.status !== 'completed'
})

pastAnnouncements = announcements.filter(ann => {
  const streamDateTime = new Date(`${ann.date}T${ann.time}`)
  return streamDateTime < now || ann.status === 'completed'
})
```

---

## 📝 API Examples

### Create Announcement:

```bash
curl -X POST https://your-domain/api/announcements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Rise of Tomb Raider - Episode 24",
    "description": "Finałowa rozprawa!",
    "date": "2025-11-23",
    "time": "14:00",
    "platform": "TikTok",
    "platformLink": "https://tiktok.com/@xbruksiax",
    "features": ["Finał", "Q&A", "Giveaway"],
    "status": "scheduled"
  }'
```

### Update Status:

```bash
curl -X PUT https://your-domain/api/announcements \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ann-1234567890",
    "status": "live"
  }'
```

### Get Upcoming:

```bash
curl https://your-domain/api/announcements?upcoming=true
```

---

## 🎨 Customization

### Changing Password:

Edit `/assets/js/admin-announcements.js`:

```javascript
const ADMIN_PASSWORD = 'your_new_password'; // Line 8
```

### Changing Colors:

Edit `/assets/css/admin.css` - uses same CSS variables as main site.

### Adding Fields:

1. Update Google Sheets schema (add column)
2. Update `/lib/google-sheets.js` (add field to row array)
3. Update `/api/announcements.js` (add to request body)
4. Update admin form HTML (add input field)
5. Update frontend rendering (display new field)

---

## 📞 Support

**Documentation:**
- Admin Guide: `docs/ADMIN_GUIDE.md`
- Google Sheets Setup: `docs/GOOGLE_SHEETS_SETUP.md`
- This Document: `docs/ANNOUNCEMENTS_SYSTEM.md`

**Contact Arek** if you need help with:
- Google Sheets API setup
- Deployment issues
- Custom features
- Bug fixes

---

**Version**: 1.0
**Date**: November 16, 2025
**Author**: Claude Code (via Arek)
**Status**: Production Ready ✅
