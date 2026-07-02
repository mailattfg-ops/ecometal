"use client";

import React from "react";

interface SectionDividerProps {
  title: string;
  num: string;
}

export default function SectionDivider({ title, num }: SectionDividerProps) {
  return (
    <div className="w-full h-[60px] flex flex-col justify-between mb-12 select-none">
      {/* Top 1px line */}
      <div className="w-full h-[1px] bg-gray-200/80" />
      
      {/* Bottom justified labels */}
      <div className="flex justify-between items-center w-full pt-2">
        <span className="text-[clamp(11px,0.85vw,14px)] font-sans font-medium text-[#9EA5B4] uppercase tracking-[0.15em]">
          {title}
        </span>
        <span className="text-[clamp(11px,0.85vw,14px)] font-sans font-medium text-[#9EA5B4] tracking-[0.15em]">
          [{num}]
        </span>
      </div>
    </div>
  );
}
