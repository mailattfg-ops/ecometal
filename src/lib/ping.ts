import { query } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export interface PingResult {
  success: boolean;
  timestamp: string;
  latencyMs: number;
  method: 'pg' | 'supabase-js';
  message: string;
  totalPings?: number;
  details?: any;
}

export async function pingSupabaseDatabase(): Promise<PingResult> {
  const startTime = Date.now();
  let success = false;
  let method: 'pg' | 'supabase-js' = 'pg';
  let message = '';
  let details: any = null;

  // Try direct Postgres connection pool query first
  try {
    const res = await query('SELECT 1 as ping_check, NOW() as server_time');
    const latencyMs = Date.now() - startTime;
    success = true;
    method = 'pg';
    message = 'Direct PostgreSQL ping successful';
    details = res && res[0] ? res[0] : null;

    // Record ping metrics in settings table (best-effort)
    await recordPingSuccess(latencyMs, method).catch((e) =>
      console.warn('Failed to persist ping metrics to settings:', e.message)
    );

    return {
      success,
      timestamp: new Date().toISOString(),
      latencyMs,
      method,
      message,
      details,
    };
  } catch (pgError: any) {
    console.warn('Direct PG ping failed, trying Supabase JS client fallback...', pgError.message);
  }

  // Fallback to Supabase JS client REST query
  try {
    const jsStartTime = Date.now();
    const { data, error } = await supabase.from('projects').select('id').limit(1);

    const latencyMs = Date.now() - jsStartTime;
    if (error) {
      throw error;
    }

    success = true;
    method = 'supabase-js';
    message = 'Supabase REST API ping successful';
    details = { count: data?.length || 0 };

    await recordPingSuccess(latencyMs, method).catch((e) =>
      console.warn('Failed to persist ping metrics to settings:', e.message)
    );

    return {
      success,
      timestamp: new Date().toISOString(),
      latencyMs,
      method,
      message,
      details,
    };
  } catch (jsError: any) {
    const latencyMs = Date.now() - startTime;
    return {
      success: false,
      timestamp: new Date().toISOString(),
      latencyMs,
      method: 'supabase-js',
      message: `Ping failed: ${jsError.message || 'Unknown database error'}`,
    };
  }
}

async function recordPingSuccess(latencyMs: number, method: string) {
  const now = new Date().toISOString();

  // Get current ping count
  let currentCount = 0;
  try {
    const rows = await query("SELECT value FROM public.settings WHERE key = 'db_ping_total_count'");
    if (rows && rows.length > 0) {
      currentCount = parseInt(rows[0].value, 10) || 0;
    }
  } catch (_) {}

  const newCount = currentCount + 1;

  const updates = [
    ['db_ping_last_at', now],
    ['db_ping_last_latency', latencyMs.toString()],
    ['db_ping_last_method', method],
    ['db_ping_status', 'active'],
    ['db_ping_total_count', newCount.toString()],
  ];

  for (const [key, value] of updates) {
    await query(
      `INSERT INTO public.settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, value]
    );
  }
}

export async function getPingMetrics() {
  try {
    const rows = await query(
      "SELECT key, value FROM public.settings WHERE key LIKE 'db_ping_%'"
    );
    const map: Record<string, string> = {};
    if (rows && rows.length > 0) {
      for (const r of rows) {
        map[r.key] = r.value;
      }
    }
    return {
      lastPingAt: map['db_ping_last_at'] || null,
      lastLatencyMs: map['db_ping_last_latency'] ? parseInt(map['db_ping_last_latency'], 10) : null,
      lastMethod: map['db_ping_last_method'] || null,
      status: map['db_ping_status'] || 'active',
      totalPings: map['db_ping_total_count'] ? parseInt(map['db_ping_total_count'], 10) : 0,
    };
  } catch (err: any) {
    return {
      lastPingAt: null,
      lastLatencyMs: null,
      lastMethod: null,
      status: 'unknown',
      totalPings: 0,
      error: err.message,
    };
  }
}
