import { NextResponse } from 'next/server';
import { pingSupabaseDatabase, getPingMetrics } from '@/lib/ping';

export const revalidate = 0; // Disable static caching for ping endpoint

export async function GET() {
  try {
    const pingResult = await pingSupabaseDatabase();
    const metrics = await getPingMetrics();

    return NextResponse.json({
      status: pingResult.success ? 'healthy' : 'unhealthy',
      keepAlive: 'active (never pause)',
      ping: pingResult,
      metrics,
    }, { status: pingResult.success ? 200 : 500 });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', error: err.message || 'Failed to ping Supabase database' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const pingResult = await pingSupabaseDatabase();
    const metrics = await getPingMetrics();

    return NextResponse.json({
      message: 'Manual database ping executed successfully',
      ping: pingResult,
      metrics,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to execute manual database ping' },
      { status: 500 }
    );
  }
}
