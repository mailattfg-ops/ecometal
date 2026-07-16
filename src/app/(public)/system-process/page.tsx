import React from "react";
import type { Metadata } from "next";
import SystemsSection from "../home/SystemsSection";
import ProcessSection from "../home/ProcessSection";
import CompareSection from "../home/CompareSection";

export const metadata: Metadata = {
  title: "Systems & Process | Ecometal Matrix Engineering",
  description: "Discover our Light Gauge Steel (LGS) systems integrated with foam concrete and our AI-optimized execution workflow.",
};

export default function SystemProcessPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFBFD]">
      {/* Page Header Banner */}
      <section className="relative w-full bg-[#001B51] text-white pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center overflow-hidden">
        {/* Decorative background and overlay */}
        <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-10 pointer-events-none select-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001B51]/95 z-0" />
        
        <div className="relative z-10 w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]">
          <div className="max-w-[800px] space-y-4">
            <span className="inline-block text-[11px] font-mono tracking-[0.2em] text-brand-gold uppercase font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Technology & Execution
            </span>
            <h1 className="text-[clamp(36px,4.5vw,72px)] font-bold leading-[1.05] tracking-tight text-white font-display">
              System & <span className="text-brand-gold">Process</span>
            </h1>
            <p className="text-[clamp(16px,1.25vw,22px)] leading-relaxed text-white/80 font-sans font-light max-w-[650px]">
              Discover our Light Gauge Steel framing technology, our AI-optimized execution flow, and how traditional building methods compare.
            </p>
          </div>
        </div>
      </section>

      {/* RENDERED SECTIONS */}
      <div className="w-full">
        <SystemsSection />
        <ProcessSection />
        <CompareSection />
      </div>
    </div>
  );
}
