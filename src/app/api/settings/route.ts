import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 0; // Disable static caching

export async function GET() {
  try {
    const res = await query("SELECT key, value FROM public.settings WHERE key IN ('hide_team_images', 'hero_bg_type', 'hero_bg_url', 'hero_headline_text', 'hero_headline_visible')");
    const map: Record<string, string> = {};
    if (res && res.length > 0) {
      for (const row of res) { map[row.key] = row.value; }
    }
    return NextResponse.json({
      hide_team_images: map['hide_team_images'] === 'true',
      hero_bg_type: map['hero_bg_type'] || 'image',
      hero_bg_url: map['hero_bg_url'] || '',
      hero_headline_text: map['hero_headline_text'] !== undefined ? map['hero_headline_text'] : "Build better.\nBuild faster.\nBuild lighter.",
      hero_headline_visible: map['hero_headline_visible'] !== 'false',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const updates: Array<[string, string]> = [];

    if (body.hide_team_images !== undefined) {
      updates.push(['hide_team_images', body.hide_team_images ? 'true' : 'false']);
    }
    if (body.hero_bg_type !== undefined) {
      updates.push(['hero_bg_type', body.hero_bg_type]);
    }
    if (body.hero_bg_url !== undefined) {
      updates.push(['hero_bg_url', body.hero_bg_url]);
    }
    if (body.hero_headline_text !== undefined) {
      updates.push(['hero_headline_text', body.hero_headline_text]);
    }
    if (body.hero_headline_visible !== undefined) {
      updates.push(['hero_headline_visible', body.hero_headline_visible ? 'true' : 'false']);
    }

    for (const [key, value] of updates) {
      await query(
        `INSERT INTO public.settings (key, value)
         VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
        [key, value]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
