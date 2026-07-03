"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function MarketSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const stats = [
    {
      value: "Multi-year",
      label: "Government-underwritten demand pipeline",
      sub: "Infrastructure · PMAY · smart cities",
    },
    {
      value: "Every type",
      label: "Residential, industrial, institutional & commercial",
      sub: "One platform, four building types",
    },
    {
      value: "South India",
      label: "Manufacturing base & steel proximity",
      sub: "Talent · supply chain · institutional buyers",
    },
    {
      value: "<3%",
      label: "BIM adoption today — a wide-open digitisation gap",
      sub: "Industry estimate*",
    },
  ];

  const alignments = [
    {
      title: "Our vision",
      desc: "An India where every building is designed with AI, built in steel, and completed in weeks — modern construction at the scale a rapidly urbanising nation needs.",
    },
    {
      title: "Technology-led",
      desc: "DesignAI and SiteIQ bring metro-grade design and real-time, data-driven quality to projects anywhere — the digital backbone a smart city expects.",
    },
    {
      title: "Sustainable",
      desc: "Recyclable steel, low-waste manufacture, and dry construction support the environmental standards cities increasingly demand.",
    },
    {
      title: "Built to scale",
      desc: "An integrated platform and partner model is designed to deliver housing and civic buildings at the pace urban demand requires.",
    },
  ];

  return (
    <section id="market" className="w-full bg-white text-gray-800 pb-2 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="The Market" num="03" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER}  mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              A structural <span className="text-brand-navy">inflection point.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              India will build more in the coming decade than in any comparable period in its history — a demand that is structural, multi-year, and largely government-underwritten, not speculative.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={`${CONTAINER} mb-[clamp(48px,6vw,80px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column Copy */}
          <div className="lg:col-span-6 space-y-6 text-[clamp(14px,1.1vw,17px)] font-sans font-normal text-body-gray leading-[1.6]">
            <p>
              National infrastructure investment, the push for tens of millions of affordable homes under PMAY, and the smart-cities programme are driving sustained, policy-backed construction demand across the country.
            </p>
            <p>
              Yet traditional methods systematically fail to meet it. <strong className="text-near-black font-semibold">Cost overruns, multi-year delays, acute labour shortages, and near-zero technology adoption are systemic, not cyclical</strong> — and they create exactly the conditions where an integrated, technology-first manufacturing platform can capture lasting share.
            </p>
            <p>
              South India is especially well placed: a deep manufacturing and CNC-fabrication talent base, established steel supply chains within same-day delivery, and a large, less-fragmented construction market with a high share of institutional buyers.
            </p>
          </div>

          {/* Right Column Stats */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-100 bg-[#FBFBFC] hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="text-[clamp(28px,2.2vw,38px)] font-bold font-display text-brand-navy leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[14px] font-sans font-semibold text-near-black leading-tight mb-2">
                    {stat.label}
                  </div>
                </div>
                <div className="text-[12px] font-sans font-normal text-mid-gray">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Cities Highlight Block */}
      <div className={CONTAINER}>
        <div className="w-full bg-[#001B51] text-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg relative overflow-hidden">
          {/* Subtle noise pattern grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
            {/* Left Box content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="block text-[12px] font-mono tracking-[0.2em] text-brand-gold uppercase">
                Smart cities & urban India
              </span>
              <h3 className="text-[clamp(24px,2.2vw,36px)] font-bold font-display leading-[1.1] text-white tracking-tight">
                Building the cities India is becoming.
              </h3>
              <div className="space-y-4 text-[14px] md:text-[15px] font-sans font-normal text-white/80 leading-relaxed pt-2">
                <p>
                  India's urban population is growing fast — cities are expected to house a far larger share of the population and generate the majority of national GDP within the coming years. A decade of the national Smart Cities Mission has reshaped expectations for how urban India is built: technology-enabled, data-driven, sustainable, and delivered to a measurable standard. That agenda now continues through follow-on urban-infrastructure and housing programmes at city and state level.
                </p>
                <p>
                  Meeting it with slow, variable, site-bound construction is the core difficulty. Smart, liveable cities need housing, institutional buildings, and infrastructure delivered quickly, to consistent quality, and at scale — exactly the gap an industrialised, technology-led platform is built to close.
                </p>
              </div>
            </div>

            {/* Right Box alignment list */}
            <div className="lg:col-span-6 space-y-6">
              <h4 className="text-[12px] font-mono tracking-[0.2em] text-brand-gold uppercase mb-6">
                How EME aligns
              </h4>
              <div className="space-y-4">
                {alignments.map((align, index) => (
                  <div key={index} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                    <h5 className="text-[14px] font-sans font-bold text-white mb-1">
                      {align.title}
                    </h5>
                    <p className="text-[13px] font-sans font-normal text-white/70 leading-relaxed">
                      {align.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
