import React from "react";
import type { Metadata } from "next";
import MarketSection from "../home/MarketSection";
import ProblemSection from "../home/ProblemSection";

export const metadata: Metadata = {
  title: "Market Analysis & Industry Impact | Ecometal Matrix Engineering",
  description: "Explore the structural shifts in urban construction, government-underwritten demand pipelines, and market opportunity.",
  alternates: { canonical: "/market" },
  openGraph: { url: "/market", title: "Market Analysis & Industry Impact | Ecometal Matrix Engineering", description: "Explore the structural shifts in urban construction, government-underwritten demand pipelines, and market opportunity.", images: ["/og-image.jpg"] },
  twitter: { card: "summary_large_image", title: "Market Analysis & Industry Impact | Ecometal Matrix Engineering", description: "Explore the structural shifts in urban construction, government-underwritten demand pipelines, and market opportunity.", images: ["/og-image.jpg"] },
};

export default function MarketPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header Banner */}
      <section className="relative w-full bg-[#001B51] text-white pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center overflow-hidden">
        {/* Decorative background and overlay */}
        <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-10 pointer-events-none select-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001B51]/95 z-0" />
        
        <div className="relative z-10 w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]">
          <div className="max-w-[800px] space-y-4">
            <span className="inline-block text-[11px] font-mono tracking-[0.2em] text-brand-gold uppercase font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Industry Opportunity
            </span>
            <h1 className="text-[clamp(36px,4.5vw,72px)] font-bold leading-[1.05] tracking-tight text-white font-display">
              Market & <span className="text-brand-gold">Impact</span>
            </h1>
            <p className="text-[clamp(16px,1.25vw,22px)] leading-relaxed text-white/80 font-sans font-light max-w-[650px]">
              Discover structural shifts in urban construction, government-underwritten demand pipelines, and traditional building friction.
            </p>
          </div>
        </div>
      </section>

      {/* RENDERED SECTIONS */}
      <div className="w-full">
        <MarketSection />
        <ProblemSection />
      </div>
    </div>
  );
}
