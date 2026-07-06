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
    <section id="compare" className="w-full bg-[#FAFBFD] text-gray-800 pt-15 pb-7 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="LGS vs Traditional" num="06" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
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
        <div className="w-full border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-[11px] sm:text-[13px] md:text-[15px] font-sans table-fixed">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left">
                <th className="p-2.5 sm:p-4 md:p-6 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-mid-gray font-semibold w-[38%]">
                  Parameter
                </th>
                <th className="p-2.5 sm:p-4 md:p-6 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-brand-navy font-bold w-[31%] bg-brand-navy/5">
                  LGS + <span className="hidden sm:inline">foam concrete</span><span className="inline sm:hidden">FC</span>
                </th>
                <th className="p-2.5 sm:p-4 md:p-6 font-mono text-[9px] sm:text-[11px] uppercase tracking-wider text-mid-gray font-semibold w-[31%]">
                  <span className="hidden sm:inline">Brick / block + concrete</span><span className="inline sm:hidden">Traditional</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="p-2.5 sm:p-4 md:p-6 text-body-gray font-normal leading-tight">
                    {row.param}
                  </td>
                  <td className="p-2.5 sm:p-4 md:p-6 text-brand-navy font-semibold bg-brand-navy/5 leading-tight">
                    {row.eme}
                  </td>
                  <td className="p-2.5 sm:p-4 md:p-6 text-body-gray font-normal leading-tight">
                    {row.trad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
