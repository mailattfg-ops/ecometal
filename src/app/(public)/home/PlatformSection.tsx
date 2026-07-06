"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function PlatformSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const cards = [
    {
      name: "DesignAI",
      sub: "Brief → fabrication",
      desc: "Generative design, automated structural engineering to IS codes, and direct machine output from one brief.",
    },
    {
      name: "SiteIQ",
      sub: "Real-time site intelligence",
      desc: "Computer-vision QC, IoT structural and foam-concrete monitoring, predictive scheduling, and a live client dashboard.",
    },
    {
      name: "BuildIQ",
      sub: "Manufacturing + app",
      desc: "Production control and the platform app tying client, site, factory, and partners into one system.",
    },
    {
      name: "BuildPartner",
      sub: "Delivery & collaboration",
      desc: "Orders, delivery, on-site assembly, and project communication coordinated in one place.",
    },
  ];

  const layers = [
    {
      num: "1",
      title: "Generative architectural design",
      desc: "Three code-compliant design options from a brief — plans, renders, schedule, orientation, and bye-law checks.",
      time: "~2 hrs",
    },
    {
      num: "2",
      title: "Automated structural engineering",
      desc: "Full model: LGS to IS 811/801, HRS to IS 800, seismic to IS 1893, loads to IS 875.",
      time: "~4 hrs",
    },
    {
      num: "3",
      title: "BIM-to-machine integration",
      desc: "CNC instructions to the roll-former, fabrication, purlin, and decking lines, plus the foam-concrete recipe.",
      time: "Instant",
    },
    {
      num: "4",
      title: "Real-time cost engine",
      desc: "Live material prices, regional labour benchmarks, and logistics — target accuracy around ±5%.",
      time: "Live",
    },
    {
      num: "5",
      title: "Foam concrete mix optimisation",
      desc: "The right FC grade, density, and volume per zone for structural, thermal, acoustic, and fire requirements.",
      time: "Per zone",
    },
  ];

  return (
    <section id="platform" className="w-full bg-white text-gray-800 py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Intelligence Layer" num="04" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              Brief to factory <span className="text-brand-navy">in 48 hours.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              One brief in. The design, structural engineering, costing, and machine instructions come out — with no manual redrawing in between.
            </p>
          </div>
        </div>
      </div>

      {/* Four Cards Grid */}
      <div className={`${CONTAINER} mb-[clamp(48px,6vw,80px)]`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[#FBFBFC] border border-gray-100 border-t-[4px] border-t-near-black hover:border-t-brand-gold hover:shadow-lg transition-all duration-300 flex flex-col min-h-[220px]"
            >
              <h3 className="text-[20px] font-bold font-display text-near-black mb-1">
                {card.name}
              </h3>
              <span className="block text-[11px] font-mono tracking-[0.1em] text-brand-gold uppercase font-semibold mb-4">
                {card.sub}
              </span>
              <p className="text-[13px] font-sans font-normal text-body-gray leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Timeline Layers */}
      <div className={CONTAINER}>
        <div className="w-full border border-gray-200 rounded-3xl overflow-hidden divide-y divide-gray-200">
          {layers.map((layer) => (
            <div
              key={layer.num}
              className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center bg-[#FAFBFD]/50 hover:bg-[#FBFBFC] transition-colors duration-300 group"
            >
              {/* Layer index */}
              <div className="md:col-span-1">
                <span className="text-[clamp(28px,2.2vw,36px)] font-bold font-display text-gray-300 group-hover:text-brand-gold transition-colors duration-300">
                  {layer.num}
                </span>
              </div>

              {/* Layer Title & Copy */}
              <div className="md:col-span-8 space-y-1">
                <h4 className="text-[16px] md:text-[18px] font-sans font-bold text-near-black tracking-tight leading-tight">
                  {layer.title}
                </h4>
                <p className="text-[13px] md:text-[14px] font-sans font-normal text-body-gray leading-relaxed">
                  {layer.desc}
                </p>
              </div>

              {/* Process Duration */}
              <div className="md:col-span-3 text-left md:text-right">
                <span className="inline-block px-3 py-1 bg-brand-navy/5 text-brand-navy rounded-full text-[12px] font-mono font-semibold uppercase tracking-wider">
                  {layer.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
