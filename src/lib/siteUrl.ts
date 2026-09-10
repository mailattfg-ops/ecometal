/**
 * Canonical origin for absolute URLs in robots.txt, sitemap.xml, llms.txt and
 * Open Graph tags. Every consumer is server-side, so SITE_URL needs no
 * NEXT_PUBLIC_ prefix — Vercel treats prefixed vars as browser-exposed Config.
 * NEXT_PUBLIC_SITE_URL is still honoured if it is the one already set.
 */
export const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'https://ecometal-rust.vercel.app'
).replace(/\/+$/, '');
