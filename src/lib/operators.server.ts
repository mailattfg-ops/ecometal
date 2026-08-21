import { query } from '@/lib/db';
import { EMPTY_OPERATORS_DATA, type Operator, type OperatorsSectionData } from '@/lib/operators';

/**
 * Server-side read so the leadership cards are already in the HTML. Fetching them
 * on mount left the section blank until hydration + an API round-trip finished,
 * which is very visible when jumping straight to #team from the nav.
 */
export async function getOperatorsSectionData(): Promise<OperatorsSectionData> {
  try {
    const [operatorRows, settingRows] = await Promise.all([
      query('SELECT id, name, role, badge, image_url FROM public.operators ORDER BY id ASC'),
      query("SELECT value FROM public.settings WHERE key = 'hide_team_images'"),
    ]);

    return {
      operators: (operatorRows || []) as Operator[],
      hideTeamImages: settingRows?.[0]?.value === 'true',
    };
  } catch (err) {
    // Never let a cold/unreachable database block the page from rendering.
    console.warn('getOperatorsSectionData failed:', err);
    return EMPTY_OPERATORS_DATA;
  }
}
