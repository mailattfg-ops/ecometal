/**
 * Canonical origin for absolute URLs in robots.txt, sitemap.xml, llms.txt and
 * Open Graph tags. Set NEXT_PUBLIC_SITE_URL once the custom domain is live;
 * until then it falls back to the Vercel production domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'https://ecometal-rust.vercel.app'
).replace(/\/+$/, '');
