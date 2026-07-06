"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function ProcessSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const steps = [
    {
      num: "01",
      title: "Brief & consultation",
      desc: "We capture your site, budget, and requirements, and explain how the system fits your project.",
    },
    {
      num: "02",
      title: "Design options",
      desc: "DesignAI returns code-compliant design options with plans, renders, and an itemised cost estimate.",
    },
    {
      num: "03",
      title: "Engineering & approval",
      desc: "The structural model is finalised and certified, and we support drawings for local approvals.",
    },
    {
      num: "04",
      title: "Offsite manufacture",
      desc: "Components are produced under factory control while site works proceed in parallel.",
    },
    {
      num: "05",
      title: "Delivery & erection",
      desc: "Components are delivered by sequence and assembled on site, with quality monitored throughout.",
    },
    {
      num: "06",
      title: "Handover & support",
      desc: "The building is commissioned, documented, and handed over — backed by after-sales support.",
    },
  ];

  return (
    <section id="process" className="w-full bg-[#001B51] text-white py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="How We Work" num="05" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-white tracking-tight">
              From enquiry <span className="text-brand-gold">to handover.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-white/80">
              A clear, low-risk path for an unfamiliar construction method — so you know exactly what happens at every stage.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Grid */}
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col min-h-[200px] justify-between group"
            >
              <div>
                <span className="block text-[clamp(24px,1.8vw,30px)] font-bold font-display text-brand-gold mb-4 leading-none select-none">
                  {step.num}
                </span>
                <h3 className="text-[18px] md:text-[20px] font-sans font-bold text-white tracking-tight leading-tight mb-2">
                  {step.title}
                </h3>
              </div>
              <p className="text-[13px] md:text-[14px] font-sans font-normal text-white/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
