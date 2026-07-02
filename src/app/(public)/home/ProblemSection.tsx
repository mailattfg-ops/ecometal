"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function ProblemSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const crises = [
    {
      num: "01",
      title: "Speed",
      problem: "Conventional RCC construction runs 18–36 months, and a large share of government homes are delivered late.",
      solution: "LGS homes in roughly 6–10 months and industrial structures in 3–5; foam-concrete screed is walkable within about 24 hours, and AI scheduling heads off delay.",
    },
    {
      num: "02",
      title: "Cost overruns",
      problem: "Projects routinely finish well over estimate, with budget blowouts the norm rather than the exception.",
      solution: "AI-driven BIM estimation targets under ~5% variance; factory precision eliminates waste, and direct BIM-to-machine output removes costly re-measurement.",
    },
    {
      num: "03",
      title: "Labour scarcity",
      problem: "Skilled-labour shortages are acute, especially in Tier 2 and Tier 3 locations, and wages have risen sharply.",
      solution: "LGS bolts together with semi-skilled crews; steel fabrication and a two-person foam-concrete pour replace large multi-trade gangs.",
    },
    {
      num: "04",
      title: "Fragmented supply chain",
      problem: "A typical building draws on a dozen or more separate suppliers, each with its own lead time, quality variance, and terms.",
      solution: "We supply the structural steel, foam-concrete infill, purlins, rails, and decking from one factory — one order, one delivery, one invoice.",
    },
    {
      num: "05",
      title: "Technology gap",
      problem: "BIM adoption is minimal and on-site AI virtually absent, so clients outside the metros can't access metro-grade design quality.",
      solution: "DesignAI brings AI-powered structural design to a modest home anywhere, and SiteIQ monitors every site regardless of location.",
    },
  ];

  return (
    <section id="problem" className="w-full bg-[#FAFBFD] text-gray-800 py-[clamp(48px,8vw,96px)] scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="The Problem" num="04" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mt-[clamp(24px,4vw,56px)] mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              Five crises, <span className="text-brand-navy">one platform.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              The majority of Indian construction projects overrun their budgets, and government housing routinely runs years late. These are systemic failures — and each is precisely what our integrated platform is built to solve.
            </p>
          </div>
        </div>
      </div>

      {/* Crises Grid List */}
      <div className={CONTAINER}>
        <div className="w-full border-t border-gray-200">
          {crises.map((item) => (
            <div 
              key={item.num} 
              className="py-8 border-b border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start group hover:bg-gray-50/50 transition-colors duration-300 px-4 rounded-xl"
            >
              {/* Index Number */}
              <div className="md:col-span-1">
                <span className="text-[clamp(28px,2.2vw,36px)] font-bold font-display text-brand-gold leading-none select-none">
                  {item.num}
                </span>
              </div>

              {/* Problem Info */}
              <div className="md:col-span-5 space-y-2">
                <h3 className="text-[18px] md:text-[20px] font-sans font-bold text-near-black tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] md:text-[15px] font-sans font-normal text-body-gray leading-relaxed max-w-[480px]">
                  {item.problem}
                </p>
              </div>

              {/* Solution Info */}
              <div className="md:col-span-6 border-l-2 border-brand-gold pl-6 py-1 space-y-2 bg-[#FBFBFC] rounded-r-xl pr-4">
                <span className="block text-[11px] font-mono tracking-[0.15em] text-brand-gold uppercase font-semibold">
                  Our Answer
                </span>
                <p className="text-[14px] md:text-[15px] font-sans font-medium text-near-black leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
