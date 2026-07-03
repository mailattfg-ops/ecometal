"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function InvestSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const items = [
    {
      num: "01",
      title: "A large, structural market",
      desc: "India's construction sector is vast, fast-growing, and among the least digitised in the world — a multi-decade, demand-led opportunity.",
    },
    {
      num: "02",
      title: "Vertical integration",
      desc: "Five manufacturing systems coordinated by one model — supplying the full structural package from a single source, capturing margin that usually leaks to subcontractors.",
    },
    {
      num: "03",
      title: "A compounding data & AI moat",
      desc: "Every project trains the platform on Indian codes, costs, and conditions — a dataset a competitor cannot buy, only build project by project.",
    },
    {
      num: "04",
      title: "Scalable delivery model",
      desc: "An integrated platform plus a partner network is designed to scale reach without scaling capital and headcount proportionally.",
    },
  ];

  return (
    <section id="invest" className="w-full bg-[#FAFBFD] text-gray-800 py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Why EME" num="11" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              A defensible <span className="text-brand-navy">platform.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              For partners and investors: why this is a scalable, defensible business — not a single-product construction company.
            </p>
          </div>
        </div>
      </div>

      {/* Thesis Cards Grid */}
      <div className={`${CONTAINER} mb-[clamp(48px,6vw,80px)]`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-2xl bg-white border border-gray-150 hover:shadow-lg hover:border-brand-navy/20 transition-all duration-300 flex flex-col min-h-[220px] justify-between group"
            >
              <div>
                <span className="block text-[clamp(20px,1.5vw,26px)] font-bold font-display text-brand-gold mb-4 leading-none select-none">
                  {item.num}
                </span>
                <h3 className="text-[17px] md:text-[18px] font-sans font-bold text-near-black tracking-tight leading-tight mb-2">
                  {item.title}
                </h3>
              </div>
              <p className="text-[13px] md:text-[14px] font-sans font-normal text-body-gray leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Investment CTA Container */}
      <div className={CONTAINER}>
        <div className="w-full bg-[#001B51] text-white rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-l-[6px] border-l-brand-gold">
          <p className="text-[15px] md:text-[18px] font-sans font-medium text-white/90 max-w-[700px] leading-relaxed text-center md:text-left">
            Investor and partnership enquiries are welcome. We'll share the detailed materials and data room on request.
          </p>
          <a
            href="#contact"
            className="flex items-center justify-center h-[46px] px-8 rounded-[10px] bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] text-[14px] font-semibold no-underline whitespace-nowrap transition-all duration-200 hover:opacity-90 active:scale-98 select-none"
          >
            Investor enquiries →
          </a>
        </div>
      </div>
    </section>
  );
}
