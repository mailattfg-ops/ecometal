/**
 * Standalone Supabase Database Keep-Alive Ping Script
 * 
 * Usage:
 *   node scripts/ping-supabase.js
 *   npm run db:ping
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Attempt to load .env.local variables if running locally
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envConfig = fs.readFileSync(envLocalPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const val = valueParts.join('=').replace(/^["']|["']$/g, '');
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  });
}

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

async function pingDatabase() {
  console.log('----------------------------------------------------');
  console.log('🔄 Eco Metal - Supabase Keep-Alive Ping');
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log('----------------------------------------------------');

  if (!connectionString) {
    console.error('❌ Error: Neither DATABASE_URL nor DIRECT_URL environment variable is set.');
    process.exit(1);
  }

  const startTime = Date.now();
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
  });

  try {
    const client = await pool.connect();
    const res = await client.query('SELECT 1 as keep_alive, NOW() as db_now;');
    client.release();
    await pool.end();

    const latencyMs = Date.now() - startTime;
    console.log('✅ SUCCESS: Supabase PostgreSQL database pinged successfully!');
    console.log(`⏱️ Latency: ${latencyMs} ms`);
    console.log(`📅 DB Time: ${res.rows[0]?.db_now}`);
    console.log('🛡️ Status: Database timer reset. Supabase will NOT pause.');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('❌ ERROR: Failed to ping database:', err.message);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

pingDatabase();
