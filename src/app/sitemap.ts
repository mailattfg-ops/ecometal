import type { MetadataRoute } from 'next';
import { query } from '@/lib/db';
import { siteUrl } from '@/lib/siteUrl';

// Regenerated hourly so newly added case studies appear without a redeploy.
export const revalidate = 3600;

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/system-process', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/market', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/downloads', changeFrequency: 'monthly', priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await query('SELECT id, created_at FROM public.projects ORDER BY id ASC');
    projectEntries = (rows || []).map((row: { id: string | number; created_at: string | Date }) => ({
      url: `${siteUrl}/project/${row.id}`,
      lastModified: row.created_at ? new Date(row.created_at) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (err) {
    // A cold database must not produce an empty or failing sitemap.
    console.warn('sitemap: project query failed, serving static routes only:', err);
  }

  // /admin is deliberately absent — it is disallowed in robots.txt and noindexed.
  return [...staticEntries, ...projectEntries];
}
