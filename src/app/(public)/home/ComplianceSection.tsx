"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";

export default function ComplianceSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const codes = [
    { code: "IS 811:2019", desc: "Cold-formed (light gauge) steel sections" },
    { code: "IS 801:2012", desc: "Design of cold-formed steel members" },
    { code: "IS 800:2007", desc: "General construction in steel (hot rolled)" },
    { code: "IS 1893:2016", desc: "Earthquake-resistant design" },
    { code: "IS 875:2015", desc: "Design loads — wind, live, dead" },
    { code: "IS 2185 Pt.4", desc: "Cellular lightweight (foam) concrete" },
    { code: "NBC 2016", desc: "Fire, structural, thermal & acoustic provisions" },
    { code: "IS 2062 / 15311", desc: "Hot rolled steel / metal decking (Phase 2)" },
    { code: "State bye-laws", desc: "FSI, setbacks, height limits per location" },
  ];

  const trusts = [
    { title: "Company registration", desc: "[ Add CIN / Udyam / registration details ]" },
    { title: "Independent testing", desc: "[ Add test reports & appraisals once signed ]" },
    { title: "Quality management", desc: "[ Add QMS / certification once in place ]" },
    { title: "Insurance & warranty", desc: "[ Add cover and warranty terms ]" },
  ];

  return (
    <section
      id="quality"
      className="relative w-full text-white py-15 scroll-mt-20 flex flex-col items-center overflow-hidden"
      style={{
        backgroundImage: "url('/compliance-bg.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#000000e6]/85 backdrop-blur-[1px] z-0" />

      {/* Section Divider */}
      <div className={`${CONTAINER} relative z-10`}>
        <SectionDivider title="Compliance & Trust" num="09" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} relative z-10 mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-white tracking-tight">
              Built to <span className="text-brand-gold">standard.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-white/80">
              Our systems are designed to recognised structural, fire, and building standards, with compliance built into the design and quality verified through controlled processes and independent assessment.
            </p>
          </div>
        </div>
      </div>

      {/* Codes Grid */}
      <div className={`${CONTAINER} relative z-10 mb-12`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {codes.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-[15px] font-mono font-bold text-brand-gold mb-2">
                {item.code}
              </div>
              <p className="text-[13px] md:text-[14px] font-sans font-normal text-white/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Blocks */}
      <div className={`${CONTAINER} relative z-10 mb-12`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trusts.map((trust, idx) => (
            <div
              key={idx}
              className="bg-[#00000029] p-6 rounded-2xl border border-dashed border-white/20 hover:border-brand-gold hover:bg-white/5 transition-all duration-300 text-center flex flex-col justify-center min-h-[140px]"
            >
              <h4 className="text-[14px] font-sans font-bold text-white mb-2">
                {trust.title}
              </h4>
              <p className="text-[12px] font-sans font-normal text-white/65 leading-relaxed">
                {trust.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note Callout */}
      <div className={`${CONTAINER} relative z-10`}>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 border-l-[4px] border-l-brand-gold text-[13px] md:text-[14px] font-sans font-normal text-white/80 leading-relaxed">
          Our systems are designed to applicable structural codes and undergo independent structural testing and performance appraisal as part of bringing engineered building systems to market. Specific certifications and validations will be listed here as each is formalised.
        </div>
      </div>
    </section>
  );
}
