/**
 * Client-safe hero types/defaults. Keep this file free of server-only imports —
 * HeroSection is a client component and would otherwise drag `pg` into the bundle.
 * The database read lives in ./heroSettings.server.
 */
export interface HeroSettings {
  hero_bg_type: "image" | "video";
  hero_bg_url: string;
  hero_poster_url: string;
  hero_headline_text: string;
  hero_headline_visible: boolean;
}

export const DEFAULT_HERO_SETTINGS: HeroSettings = {
  hero_bg_type: "video",
  hero_bg_url: "/hero-bg.mp4",
  hero_poster_url: "",
  hero_headline_text: "Build better.\nBuild faster.\nBuild lighter.",
  hero_headline_visible: true,
};
