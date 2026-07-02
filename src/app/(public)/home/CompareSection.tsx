"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function CompareSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const rows = [
    { param: "Build time (G+1 villa)", eme: "~90–120 days", trad: "~18–24 months" },
    { param: "Design to construction start", eme: "~48 hours", trad: "~6–8 weeks" },
    { param: "Cost estimate accuracy", eme: "~±5% (AI-driven)", trad: "~±20% (manual)" },
    { param: "External wall dead weight", eme: "~60 kg/m²", trad: "~250 kg/m² (230 mm brick)" },
    { param: "Construction waste", eme: "~3–5% of materials", trad: "~20–30% of materials" },
    { param: "Skilled labour requirement", eme: "Low — small trained crew", trad: "High — multiple trades" },
    { param: "Seismic performance", eme: "Excellent — light, ductile", trad: "Poor — heavy, brittle" },
    { param: "Dimensional accuracy", eme: "~±0.5 mm (CNC)", trad: "~±10–20 mm (hand-built)" },
    { param: "Recyclability at end of life", eme: "Steel fully recyclable", trad: "Largely landfill" },
  ];

  const highlights = [
    { value: "5×", label: "Faster build" },
    { value: "75%", label: "Less dead weight" },
    { value: "85%", label: "Less construction waste" },
    { value: "100%", label: "Recyclable steel" },
  ];

  return (
    <section id="compare" className="w-full bg-[#FAFBFD] text-gray-800 py-[clamp(48px,8vw,96px)] scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="LGS vs Traditional" num="08" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mt-[clamp(24px,4vw,56px)] mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              The case <span className="text-brand-navy">for steel.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              Light Gauge Steel with foam concrete outperforms brick-and-mortar on the dimensions that matter. Figures are indicative, for a single-storey villa.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div className={`${CONTAINER} mb-[clamp(48px,6vw,80px)]`}>
        {/* Desktop View: Grid Table */}
        <div className="hidden lg:block w-full border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-[14px] md:text-[15px] font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left">
                <th className="p-4 md:p-6 font-mono text-[11px] uppercase tracking-wider text-mid-gray font-semibold w-4/12">
                  Parameter
                </th>
                <th className="p-4 md:p-6 font-mono text-[11px] uppercase tracking-wider text-brand-navy font-bold w-4/12 bg-brand-navy/5">
                  LGS + foam concrete
                </th>
                <th className="p-4 md:p-6 font-mono text-[11px] uppercase tracking-wider text-mid-gray font-semibold w-4/12">
                  Brick / block + concrete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="p-4 md:p-6 text-body-gray font-normal">
                    {row.param}
                  </td>
                  <td className="p-4 md:p-6 text-brand-navy font-semibold bg-brand-navy/5">
                    {row.eme}
                  </td>
                  <td className="p-4 md:p-6 text-body-gray font-normal">
                    {row.trad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stacked Parameter Cards */}
        <div className="lg:hidden space-y-4">
          {rows.map((row, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-150 shadow-sm space-y-3">
              <h3 className="text-[12px] font-bold text-[#9EA5B4] uppercase tracking-wider font-mono">
                {row.param}
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-brand-navy/5 p-3 rounded-xl border border-brand-navy/10 flex flex-col justify-between">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-brand-navy font-bold mb-2">
                    LGS + Foam Concrete
                  </span>
                  <span className="text-[14px] font-bold text-brand-navy leading-tight">
                    {row.eme}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/50 flex flex-col justify-between">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-500 font-semibold mb-2">
                    Brick / Concrete
                  </span>
                  <span className="text-[14px] font-semibold text-gray-700 leading-tight">
                    {row.trad}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Stats Cards Grid */}
      <div className={CONTAINER}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl border border-gray-100 bg-[#FBFBFC] hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="text-[clamp(32px,2.5vw,48px)] font-bold font-display text-brand-gold leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[12px] md:text-[13px] font-sans font-semibold text-body-gray tracking-tight uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
