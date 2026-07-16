"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";
import { FileText, Download } from "lucide-react";

export default function ResourcesSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const resources = [
    {
      type: "PDF / Combined",
      title: "EME Combined Brochure",
      desc: "All-in-one comprehensive catalog of Ecometal Matrix building systems and applications.",
      file: "/pdfs/EME_Combined_Brochure.pdf",
    },
    {
      type: "PDF / Residential",
      title: "EME Residential (BuildPro)",
      desc: "Detailed specifications for residential LGS building construction and framing layouts.",
      file: "/pdfs/MME - BuildPro - Residential Brochure.pdf",
    },
    {
      type: "PDF / Cottage",
      title: "EME CottagePro Brochure",
      desc: "Architectural designs and floor plans for modular cottages and secondary dwellings.",
      file: "/pdfs/MME - CottagePro - Brochure.pdf",
    },
    {
      type: "PDF / Extension",
      title: "EME Extension Pro Brochure",
      desc: "Engineering details for vertical or horizontal building extensions and terrace structures.",
      file: "/pdfs/MME - Extension Pro - Brochure.pdf",
    },
    {
      type: "PDF / Farmhouse",
      title: "EME Farmhouse Brochure",
      desc: "Layout designs, elevations, and structural specs for premium steel farmhouses.",
      file: "/pdfs/MME - Farmhouse Brochure.pdf",
    },
    {
      type: "PDF / Industrial",
      title: "EME Industrial Pro Brochure",
      desc: "Commercial warehouse designs, industrial cold-formed steel specs, and large span layouts.",
      file: "/pdfs/MME - Industrial Pro Brochure.pdf",
    },
    {
      type: "PDF / Institutional",
      title: "EME Institute Pro Brochure",
      desc: "School buildings, training centers, and public utility structure design catalogs.",
      file: "/pdfs/MME - Institute Pro Brochure.pdf",
    },
    {
      type: "PDF / Hotel",
      title: "EME G+5 Hotel Brochure",
      desc: "Multi-story hotel layouts, fire-safety compliance, and modular structural plans.",
      file: "/pdfs/MME G+5 Hotel Brochure.pdf",
    },
    {
      type: "PDF / Resort",
      title: "EME Resort Brochure",
      desc: "Luxury resort units, A-frame cabins, and modular vacation dwelling specifications.",
      file: "/pdfs/MME Resort Brochure.pdf",
    },
    {
      type: "PDF / Student Housing",
      title: "EME Student Accommodation",
      desc: "Multi-room student housing structures, common area designs, and execution specs.",
      file: "/pdfs/MME Student Accomodation Brochure.pdf",
    },
    {
      type: "PDF / Worker Housing",
      title: "EME Worker Accommodation",
      desc: "Fast-erecting commercial worker accommodation complexes and dormitory designs.",
      file: "/pdfs/MME Worker Accomodation Brochure.pdf",
    },
  ];

  return (
    <section id="resources" className="relative w-full bg-[#001B51] text-white py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden"
      style={{
        backgroundImage: "url('/systems-bg.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#0000002b]/85 z-0 pointer-events-none" />

      {/* Content wrapper with higher z-index to receive click pointer events */}
      <div className="relative z-10 w-full flex flex-col items-center pointer-events-auto">
        {/* Section Divider */}
        <div className={CONTAINER}>
          <SectionDivider title="Resources" num="11" />
        </div>

        {/* Main Title Block */}
        <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
            <div className="lg:col-span-6 text-left">
              <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-white tracking-tight">
                Take it <span className="text-brand-gold">with you.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pt-3 text-left">
              <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal text-white/80">
                Download Ecometal Matrix technical datasheets, company brochures, and system specifications.
              </p>
            </div>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((res, index) => (
              <a
                key={index}
                href={res.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between min-h-[220px] group cursor-pointer text-left z-20"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="block text-[11px] font-mono tracking-[0.1em] text-brand-gold uppercase font-semibold">
                      {res.type}
                    </span>
                    <FileText className="w-5 h-5 text-white/40 group-hover:text-brand-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-[18px] md:text-[20px] font-sans font-bold text-white tracking-tight leading-tight">
                    {res.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] font-sans font-normal text-white/70 leading-relaxed">
                    {res.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2 text-brand-gold text-[12px] font-mono font-semibold uppercase tracking-wider group-hover:text-brand-gold/90 transition-colors">
                  <Download size={14} />
                  <span>Download Brochure →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
