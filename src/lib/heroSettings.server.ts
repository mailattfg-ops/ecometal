import { query } from '@/lib/db';
import { DEFAULT_HERO_SETTINGS, type HeroSettings } from '@/lib/heroSettings';

/**
 * Server-side read of the hero settings so the <video> tag (and its poster) ship
 * inside the initial HTML. Without this the browser can only start downloading
 * the background video after hydration + /api/settings resolves, which adds a
 * full round-trip before the first frame can even begin loading.
 */
export async function getHeroSettings(): Promise<HeroSettings> {
  try {
    const rows = await query(
      "SELECT key, value FROM public.settings WHERE key IN ('hero_bg_type', 'hero_bg_url', 'hero_poster_url', 'hero_headline_text', 'hero_headline_visible')"
    );
    const map: Record<string, string> = {};
    for (const row of rows || []) map[row.key] = row.value;

    const type = map['hero_bg_type'] === 'image' ? 'image' : 'video';
    return {
      hero_bg_type: type,
      hero_bg_url: map['hero_bg_url'] || (type === 'image' ? '' : '/hero-bg.mp4'),
      hero_poster_url: map['hero_poster_url'] || '',
      hero_headline_text:
        map['hero_headline_text'] !== undefined
          ? map['hero_headline_text']
          : DEFAULT_HERO_SETTINGS.hero_headline_text,
      hero_headline_visible: map['hero_headline_visible'] !== 'false',
    };
  } catch (err) {
    // Never let a cold/unreachable database block the page from rendering.
    console.warn('getHeroSettings failed, falling back to defaults:', err);
    return DEFAULT_HERO_SETTINGS;
  }
}
