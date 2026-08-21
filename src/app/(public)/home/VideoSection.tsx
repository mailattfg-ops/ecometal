"use client";

import React, { useState } from "react";
import SectionDivider from "@/components/SectionDivider";

interface VideoSectionProps {
  /** Replace with your YouTube Video ID or full link, e.g. "https://www.youtube.com/watch?v=YOUR_VIDEO_ID" */
  youtubeUrl?: string;
}

export default function VideoSection({
  youtubeUrl = "https://www.youtube.com/embed/ScMzIvxBSi4", // Light Gauge Steel Framing Construction Showcase
}: VideoSectionProps) {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  // Helper to ensure proper embed URL format
  const getEmbedUrl = (url: string) => {
    if (!url) return "https://www.youtube.com/embed/ScMzIvxBSi4";
    if (url.includes("embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const embedUrl = getEmbedUrl(youtubeUrl);

  return (
    <section id="video-showcase" className="w-full bg-[#001B51] text-white py-16 md:py-24 flex flex-col items-center overflow-x-hidden relative border-b border-white/10">
      {/* Background overlay effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Video Showcase" />
      </div>

      {/* Title & Description Header */}
      <div className={`${CONTAINER} mb-10 md:mb-14`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="inline-block text-[11px] font-mono tracking-[0.2em] text-brand-gold uppercase font-bold bg-white/5 border border-white/10 px-3.5 py-1 mb-4">
              Watch Ecometal In Action
            </span>
            <h2 className="text-[clamp(32px,3.5vw,60px)] font-bold leading-[1.08] font-display text-white tracking-tight">
              Automated Fabrication & <br className="hidden sm:block" />
              <span className="text-brand-gold">Precision Steel Assembly.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[clamp(15px,1.1vw,18px)] leading-relaxed font-sans font-light text-white/80">
              See how our AI-native digital twin models translate directly into millimeter-precise CAD roll-forming and rapid modular panel assembly on-site.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive YouTube Video Frame */}
      <div className={CONTAINER}>
        <div className="relative w-full max-w-[1280px] mx-auto aspect-video rounded-none overflow-hidden bg-black/60 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          <iframe
            className="w-full h-full object-cover rounded-none"
            src={embedUrl}
            title="Ecometal Matrix Engineering Video Showcase"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
