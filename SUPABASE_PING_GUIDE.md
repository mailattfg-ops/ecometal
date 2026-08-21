# Supabase Database Keep-Alive & Ping Guide (Never Pause)

This project includes a continuous keep-alive ping engine to prevent your Supabase PostgreSQL database from auto-pausing after 7 days of inactivity.

---

## 🚀 Overview of Keep-Alive Mechanisms

1. **Vercel Cron (`vercel.json`)**:
   - Pre-configured to trigger `/api/ping` daily at 00:00 UTC when hosted on Vercel.
   - Requires zero maintenance once deployed.

2. **GitHub Action (`.github/workflows/keep-alive.yml`)**:
   - Scheduled to run every 3 days automatically.
   - Pings your Supabase database using secrets `DATABASE_URL` or `DIRECT_URL`.

3. **Admin Panel UI (`/admin`)**:
   - Features a **"Database Keep-Alive"** tab.
   - Displays live latency (ms), status, timestamp of last ping, and total ping count.
   - Includes a manual **"Ping Database Now"** button.

4. **CLI / Server Script (`npm run db:ping`)**:
   - Run `npm run db:ping` or `node scripts/ping-supabase.js` manually or from any cron manager (e.g. crontab / PM2).

---

## 🛠️ Testing the Ping System

### 1. Test via CLI Script
```bash
npm run db:ping
```
Example Output:
```text
🔄 Eco Metal - Supabase Keep-Alive Ping
⏰ Timestamp: 2026-08-21T11:23:00.000Z
----------------------------------------------------
✅ SUCCESS: Supabase PostgreSQL database pinged successfully!
⏱️ Latency: 14 ms
📅 DB Time: 2026-08-21T11:23:00.123Z
🛡️ Status: Database timer reset. Supabase will NOT pause.
```

### 2. Test via HTTP Endpoint
Start your dev server (`npm run dev`) and visit:
```text
http://localhost:3000/api/ping
```
Response:
```json
{
  "status": "healthy",
  "keepAlive": "active (never pause)",
  "ping": {
    "success": true,
    "latencyMs": 18,
    "method": "pg",
    "message": "Direct PostgreSQL ping successful"
  },
  "metrics": {
    "lastPingAt": "2026-08-21T11:23:00.000Z",
    "lastLatencyMs": 18,
    "status": "active",
    "totalPings": 1
  }
}
```

### 3. Test in Admin Dashboard
1. Navigate to `/admin` in your browser.
2. Sign in with your admin passcode.
3. Click the **Database Keep-Alive** tab.
4. Click **Ping Database Now** to run an instant keep-alive ping and inspect live latency metrics.
