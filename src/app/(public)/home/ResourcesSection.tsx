"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";
import { FileText, Download } from "lucide-react";

export default function ResourcesSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const resources = [
    {
      type: "PDF / Brochure",
      title: "Company & platform overview",
      desc: "A concise introduction to EME, the platform, and the building systems.",
    },
    {
      type: "PDF / Datasheet",
      title: "Wall, floor & roof systems",
      desc: "Technical build-ups and performance specifications for each assembly.",
    },
    {
      type: "PDF / Spec",
      title: "Material specifications",
      desc: "Steel grades, foam concrete grades, coatings, and applicable standards.",
    },
  ];

  return (
    <section id="resources" className="relative w-full bg-[#001B51] text-white py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden"
      style={{
        backgroundImage: "url('/systems-bg.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      <div className="absolute inset-0 bg-[#0000002b]/85 z-0" />

      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Resources" num="15" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-white tracking-tight">
              Take it <span className="text-brand-gold">with you.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal text-white/80">
              Brochures, technical datasheets, and specifications for sharing internally. Add downloadable files as they are ready.
            </p>
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between min-h-[220px] group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="block text-[11px] font-mono tracking-[0.1em] text-brand-gold uppercase font-semibold">
                    {res.type}
                  </span>
                  <FileText className="w-5 h-5 text-white/40 group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-sans font-bold text-white tracking-tight leading-tight">
                  {res.title}
                </h3>
                <p className="text-[13px] md:text-[14px] font-sans font-normal text-white/70 leading-relaxed">
                  {res.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2 text-brand-gold text-[12px] font-mono font-semibold uppercase tracking-wider group-hover:text-brand-gold/90 transition-colors">
                <Download size={14} />
                <span>Add download →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
