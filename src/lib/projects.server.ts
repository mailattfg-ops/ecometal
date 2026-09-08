import { query } from '@/lib/db';
import type { Project } from '@/app/(public)/home/ProjectsSection';

/** Server-side read so the project carousel is in the initial HTML instead of blank until /api/projects returns. */
export async function getProjects(): Promise<Project[]> {
  try {
    return (await query('SELECT * FROM public.projects ORDER BY id ASC')) as Project[];
  } catch (err) {
    console.warn('getProjects failed:', err);
    return [];
  }
}
