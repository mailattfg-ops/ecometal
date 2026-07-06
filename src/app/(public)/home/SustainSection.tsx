"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function SustainSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const stats = [
    { value: "3–5%", label: "Material waste vs ~20–30% on site*" },
    { value: "100%", label: "Steel recyclable at end of life" },
    { value: "Dry", label: "Construction — sharply lower site water use" },
    { value: "Low", label: "Embodied carbon vs wet trades*" },
  ];

  return (
    <section id="sustain" className="w-full bg-[#001B51] text-white py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Sustainability" num="08" />
      </div>

      {/* Main Title & Content Grid */}
      <div className={`${CONTAINER}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-white tracking-tight">
              Lighter on <span className="text-brand-gold">the planet.</span>
            </h2>
            <p className="text-[clamp(15px,1.15vw,20px)] leading-[1.6] font-sans font-normal text-white/80">
              Industrialising construction cuts waste, reduces water and carbon, and uses materials that can be recycled at end of life. Extending existing buildings avoids the carbon of demolition and rebuild entirely.
            </p>
          </div>

          {/* Right Column Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-[clamp(28px,2.2vw,38px)] font-bold font-display text-brand-gold leading-none mb-3">
                  {stat.value}
                </div>
                <div className="text-[13px] font-sans font-semibold text-white/80 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
