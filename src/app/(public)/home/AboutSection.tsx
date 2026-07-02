"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function AboutSection() {
  const tableRows = [
    { label: "Company", value: "Ecometal Matrix Engineering Pvt Ltd" },
    { label: "Location", value: "SIPCOT Pochampalli, Krishnagiri District, Tamil Nadu" },
    { label: "Model", value: "Integrated manufacturing + AI platform + delivery" },
    { label: "Systems", value: "LGS · Foam concrete · HRS · Purlins · Decking" },
    { label: "Standards", value: "IS 811 · 801 · 800 · 1893 · 875 · 2185 · NBC 2016" },
  ];

  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  return (
    <section id="about" className="py-15 bg-white text-gray-800 scroll-mt-20 flex flex-col items-center">
      {/* 60px height Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="About Us" num="02" />
      </div>

      {/* Main Container */}
      <div className={CONTAINER}>

        {/* Two-column layout matching design specifications */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-6 items-start">

          {/* Left Column (Paragraph Copy + Side-by-Side Images) */}
          <div className="grid gap-12 w-full md:w-6/12">
            <p className="w-[95%] text-[16px] md:text-[22px] leading-[120%] tracking-[-0.04em] font-sans font-normal text-[#676F7E] mb-10">
              Ecometal Matrix Engineering is a construction technology company building a vertically
              integrated, AI-native steel construction platform — combining steel manufacturing with
              an AI design-to-manufacture engine, real-time site intelligence, and a platform app into
              a single coherent system.
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-6 items-stretch shrink-0">
              <div
                className="w-[320px] h-[280px] rounded-[16px] bg-cover bg-center shadow-sm shrink-0"
                style={{
                  backgroundImage: `url('/about-1.jpg')`,
                }}
              />
              <div
                className="w-[280px] h-[280px] rounded-[16px] bg-cover bg-center shadow-sm shrink-0"
                style={{
                  backgroundImage: `url('/about-2.jpg')`,
                }}
              />
            </div>
          </div>

          {/* Right Column (Paragraph Copy + Info Table) */}
          <div className="grid gap-12 w-full md:w-5/12">
            <p className="text-[16px] md:text-[22px] leading-[120%] tracking-[-0.04em] font-sans font-normal text-[#676F7E] mb-16">
              Every building moves from client brief to factory-ready instructions in days — with
              code compliance automated, costs estimated tightly, and site quality monitored
              continuously from first steel delivery to handover.
            </p>

            <div className="w-full shrink-0 flex flex-col justify-center">
              <div className="w-full space-y-0">
                {tableRows.map((row, idx) => (
                  <div key={idx} className="w-full">
                    {/* Row content */}
                    <div className="flex justify-between items-start py-2 w-full">
                      {/* Label (Geist Medium 24px #000000, ~101px wide) */}
                      <span className="!w-5/12 text-[16px] md:text-[18px] font-sans font-medium text-black tracking-tight">
                        {row.label}
                      </span>

                      {/* Horizontal gap spacing token (175px gap) */}
                      {/* <div className="w-[80px] sm:w-[175px] shrink-0" /> */}

                      {/* Value (Geist Regular 24px #828282, ~364px wide) */}
                      <span className="w-7/12 text-[14px] md:text-[16px] font-sans font-normal text-mid-gray leading-[120%] tracking-[-0.04em]">
                        {row.value}
                      </span>
                    </div>
                    {/* 1px line divider */}
                    <div className="w-full h-[1px] bg-gray-200/80" />
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
