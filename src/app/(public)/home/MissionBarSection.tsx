"use client";

import React from "react";

export default function MissionBarSection() {
  return (
    <section className="w-full bg-black text-white py-24 flex items-center justify-center">
      <div className="max-w-[1740px] w-full px-6 md:px-12 flex flex-col justify-between h-full">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16">
          {/* Left Column: Display Headline */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-[48px] leading-tight font-display font-medium text-white max-w-3xl">
              One factory. One model. One integrated system — for every building type.
            </h2>
          </div>

          {/* Right Column: Supporting Body Statement */}
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-lg sm:text-xl text-body-gray leading-relaxed font-light">
              We combine Light Gauge Steel framing with computer-aided CAD design to manufacture structural LGS, automating code compliance, estimation, and quality inspection to deliver structural frames in weeks, not years.
            </p>
          </div>
        </div>

        {/* Horizontal transition divider */}
        <div className="w-full h-[1px] bg-white/10" />
      </div>
    </section>
  );
}
