/**
 * Client-safe hero types/defaults. Keep this file free of server-only imports —
 * HeroSection is a client component and would otherwise drag `pg` into the bundle.
 * The database read lives in ./heroSettings.server.
 */
export interface HeroSettings {
  hero_bg_type: "image" | "video";
  hero_bg_url: string;
  /** Optional 9:16 cut of the video, served to phones via <source media>. */
  hero_bg_url_mobile: string;
  hero_poster_url: string;
  hero_headline_text: string;
  hero_headline_visible: boolean;
  /** Show the headline and intro paragraph on phones (they always show from lg up). */
  hero_text_mobile_visible: boolean;
}

export const DEFAULT_HERO_SETTINGS: HeroSettings = {
  hero_bg_type: "video",
  hero_bg_url: "/hero-bg.mp4",
  hero_bg_url_mobile: "",
  hero_poster_url: "",
  hero_headline_text: "Build better.\nBuild faster.\nBuild lighter.",
  hero_headline_visible: true,
  hero_text_mobile_visible: false,
};
