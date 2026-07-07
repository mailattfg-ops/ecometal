import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 0; // Disable static caching so it always gets live data

export async function GET() {
  try {
    const projects = await query('SELECT * FROM public.projects ORDER BY id ASC');
    return NextResponse.json(projects);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
