"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { DEFAULT_HERO_SETTINGS, type HeroSettings } from "@/lib/heroSettings";

interface HeroSectionProps {
  /** Rendered on the server so the video URL is in the initial HTML. */
  initialSettings?: HeroSettings;
}

export default function HeroSection({ initialSettings }: HeroSectionProps) {
  const [settings, setSettings] = useState<HeroSettings>(initialSettings || DEFAULT_HERO_SETTINGS);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Background refresh so admin changes show up before the page cache rolls over.
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const newSettings: HeroSettings = {
          hero_bg_type: data.hero_bg_type || "video",
          hero_bg_url: data.hero_bg_url || (data.hero_bg_type === "image" ? "" : "/hero-bg.mp4"),
          hero_bg_url_mobile: data.hero_bg_url_mobile || "",
          hero_poster_url: data.hero_poster_url || "",
          hero_headline_text: data.hero_headline_text !== undefined ? data.hero_headline_text : DEFAULT_HERO_SETTINGS.hero_headline_text,
          hero_headline_visible: data.hero_headline_visible !== false,
          hero_text_mobile_visible: data.hero_text_mobile_visible === true,
        };
        // Only re-render when something actually changed — a needless state swap
        // remounts the <video> and restarts the download.
        setSettings((prev) =>
          JSON.stringify(prev) === JSON.stringify(newSettings) ? prev : newSettings
        );
      })
      .catch(() => {/* fall back to the server-rendered settings */ });
  }, []);

  const bgUrl = settings.hero_bg_url || (settings.hero_bg_type === "video" ? "/hero-bg.mp4" : "");
  const isVideo = (settings.hero_bg_type === "video" || bgUrl.endsWith(".mp4") || bgUrl.endsWith(".webm") || bgUrl.includes("video")) && !!bgUrl && !videoError;
  const posterUrl = settings.hero_poster_url || "";
  const mobileUrl = settings.hero_bg_url_mobile || "";

  // Belt and braces for the <source media> switch: some browsers ignore the media
  // attribute on video sources, so once the element has picked a file, make sure a
  // phone got the portrait cut (and desktop the landscape one). Only touches src
  // when the wrong file was chosen, so there is no double download otherwise.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !mobileUrl) return;
    const want = window.matchMedia("(max-width: 1023px)").matches ? mobileUrl : bgUrl;
    const enforce = () => {
      if (v.currentSrc && v.currentSrc !== want) {
        v.src = want;
        v.load();
        v.play().catch(() => { });
      }
    };
    enforce();
    v.addEventListener("loadedmetadata", enforce, { once: true });
    return () => v.removeEventListener("loadedmetadata", enforce);
  }, [bgUrl, mobileUrl]);
  // Phones show only the buttons unless the admin turns the text on for mobile.
  const mobileText = settings.hero_text_mobile_visible ? "" : "hidden lg:block";

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-end bg-[#050811] overflow-hidden">
      {/* Poster paints immediately while the video streams in behind it */}
      {isVideo && posterUrl && (
        <link rel="preload" href={posterUrl} as="image" fetchPriority="high" />
      )}

      {/* ── Full-bleed background ── */}
      {isVideo ? (
        <video
          ref={videoRef}
          key={bgUrl + mobileUrl}
          poster={posterUrl || undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            setVideoLoaded(true);
            e.currentTarget.play().catch(() => { });
          }}
          onCanPlay={(e) => {
            setVideoLoaded(true);
            e.currentTarget.play().catch(() => { });
          }}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 z-0 w-full h-full object-cover object-center transition-opacity duration-300 ${videoLoaded || posterUrl ? "opacity-100" : "opacity-90"
            }`}
        >
          {/* Browsers pick a <source> at load time; the plain one at the end is the fallback. */}
          {mobileUrl && <source src={bgUrl} media="(min-width: 1024px)" />}
          {mobileUrl && <source src={mobileUrl} media="(max-width: 1023px)" />}
          <source src={bgUrl} />
        </video>
      ) : bgUrl ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-[center_38%] bg-no-repeat"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-[#050811] bg-gradient-to-b from-[#001B51] via-[#050811] to-[#050811]" />
      )}

      {/* ── Radial blur vignette overlay ── */}
      <div
        className="hidden absolute inset-0 z-[1] pointer-events-none backdrop-blur-[4px]"
        style={{
          maskImage: "radial-gradient(circle at 50% 45%, transparent 35%, black 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 45%, transparent 35%, black 80%)"
        }}
      />

      {/* ── Gradient overlay: transparent top → dark bottom ── */}
      <div
        className="absolute inset-0 z-[2] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.15)_40%,rgba(0,0,0,0.72)_70%,rgba(0,0,0,0.88)_100%)]"
      />

      {/* ── Bottom content — sits ON TOP of image via z-[3] ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] backdrop-blur-0">
        <div className="w-full mx-auto px-8 lg:px-14 pb-[clamp(32px,5vh,64px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 items-start w-full">

            {/* Left — Headline */}
            {settings.hero_headline_visible && (
              <div className={`lg:col-span-6 h-full ${mobileText}`}>
                <h1
                  className="h-full text-[clamp(32px,3.8vw,58px)] leading-[1.05] font-bold font-display m-0 p-0 bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] bg-clip-text text-transparent pb-[clamp(32px,5vh,64px)] whitespace-pre-wrap"
                >
                  {settings.hero_headline_text}
                </h1>
              </div>
            )}

            {/* Right — Body + Buttons */}
            <div className={`h-full justify-center ${settings.hero_headline_visible ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-6 lg:col-start-1'} flex flex-col gap-[clamp(16px,2vh,24px)]`}>
              <p className={`text-[clamp(16px,1.3vw,20px)] text-[rgba(255,255,255,0.82)] leading-[1.5] m-0 font-normal tracking-[-0.01em] ${mobileText}`}>
                One factory. One model. One integrated system — for every building type.
                We combine Light Gauge Steel framing, foam concrete, and an AI
                design-to-manufacture platform to deliver buildings in weeks, not years.
              </p>

              {/* Buttons */}
              <div className="flex flex-row gap-3.5 flex-wrap">
                {/* Get In Touch */}
                <a
                  href="#contact"
                  className="flex items-center justify-center h-[clamp(38px,4.5vh,46px)] px-[clamp(18px,2vw,30px)] rounded-[10px] bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] text-[clamp(12px,0.85vw,14px)] font-semibold no-underline whitespace-nowrap transition-all duration-200 tracking-[-0.01em] hover:opacity-88 active:scale-98 select-none"
                >
                  Get In Touch
                </a>

                {/* Chat on WhatsApp */}
                <a
                  href="https://wa.me/918438124471?text=Hi!%20I%20have%20an%20enquiry%20about%20Ecometal%20Matrix."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-[clamp(38px,4.5vh,46px)] px-[clamp(16px,1.8vw,26px)] rounded-[10px] border-[1.5px] border-white/20 bg-white/10 text-white text-[clamp(12px,0.85vw,14px)] font-medium no-underline whitespace-nowrap transition-all duration-200 backdrop-blur-[8px] tracking-[-0.01em] hover:bg-white/15 active:scale-98"
                >
                  <MessageSquare size={15} className="opacity-80" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}