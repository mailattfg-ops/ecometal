import React from "react";
import type { Metadata } from "next";
import ProjectsSection from "../home/ProjectsSection";
import { ShieldCheck, Ruler, Calendar, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Ecometal Matrix Engineering",
  description: "View our completed and pilot construction projects showcasing scale, dimensional accuracy, and record completion times.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Page Header Banner */}
      <section className="relative w-full bg-[#001B51] text-white pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center overflow-hidden">
        {/* Decorative background and overlay */}
        <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-10 pointer-events-none select-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001B51]/95 z-0" />
        
        <div className="relative z-10 w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]">
          <div className="max-w-[800px] space-y-4">
            <span className="inline-block text-[11px] font-mono tracking-[0.2em] text-brand-gold uppercase font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Portfolio & Builds
            </span>
            <h1 className="text-[clamp(36px,4.5vw,72px)] font-bold leading-[1.05] tracking-tight text-white font-display">
              Projects & <span className="text-brand-gold">Case Studies</span>
            </h1>
            <p className="text-[clamp(16px,1.25vw,22px)] leading-relaxed text-white/80 font-sans font-light max-w-[650px]">
              Completed and pilot projects demonstrating rapid timeline acceleration, extreme quality, and commercial value across industrial, commercial, and residential sectors.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION CAROUSEL */}
      <div className="w-full">
        <ProjectsSection />
      </div>

      {/* PREMIUM DESCRIPTION & PORTFOLIO DETAILS */}
      <section className="w-full bg-[#FAFBFD] text-gray-800 py-20 flex flex-col items-center overflow-x-hidden border-t border-gray-150">
        <div className="w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)] space-y-24">
          
          {/* Section 1: Intro Text Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 text-left">
              <span className="block text-[11px] font-mono tracking-[0.2em] text-[#BB8543] uppercase font-bold mb-3">
                Execution Excellence
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display text-[#001B51] leading-tight tracking-tight">
                How We Deliver <br />
                <span className="text-brand-gold">Our Projects.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed text-body-gray font-sans font-light text-left">
              <p>
                Every structure built by Ecometal Matrix utilizes a vertically integrated, AI-native construction platform. From initial design to structural roll-forming and assembly, we eliminate intermediate coordination friction.
              </p>
              <p>
                Our system uses high-tensile Light Gauge Steel (LGS) framed structure filled with lightweight, thermal-insulating foam concrete. This delivers traditional solid-wall acoustic performance with up to 5x faster speed.
              </p>
            </div>
          </div>

          {/* Section 2: Building Sectors Grid */}
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-4 text-left">
              <h3 className="text-2xl font-bold font-display text-[#001B51] tracking-tight">
                Our Project Sectors
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl border border-gray-150 p-8 shadow-sm hover:shadow-xl hover:border-[#BB8543]/40 transition-all duration-300 group flex flex-col justify-between min-h-[320px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#001B51]/5 flex items-center justify-center text-[#BB8543] group-hover:bg-[#BB8543] group-hover:text-white transition-all duration-300">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-[#001B51] group-hover:text-[#BB8543] transition-colors duration-300">
                    Residential Housing
                  </h4>
                  <p className="text-sm text-body-gray leading-relaxed font-sans">
                    Premium villas, multi-family row houses, and customized holiday homes. Built to precise CNC layouts with zero custom carpentry requirements on-site.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-[#001B51]/60">
                  <span>Villas & Apartments</span>
                  <span className="font-bold text-[#BB8543]">Rapid Assembly</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl border border-gray-150 p-8 shadow-sm hover:shadow-xl hover:border-[#BB8543]/40 transition-all duration-300 group flex flex-col justify-between min-h-[320px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#001B51]/5 flex items-center justify-center text-[#BB8543] group-hover:bg-[#BB8543] group-hover:text-white transition-all duration-300">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-[#001B51] group-hover:text-[#BB8543] transition-colors duration-300">
                    Commercial Spaces
                  </h4>
                  <p className="text-sm text-body-gray leading-relaxed font-sans">
                    Modern office blocks, retail layouts, and modular site campuses. Designed for quick developer ROI by cutting time-to-market by up to 75%.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-[#001B51]/60">
                  <span>Retail & Offices</span>
                  <span className="font-bold text-[#BB8543]">High ROI Accel</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl border border-gray-150 p-8 shadow-sm hover:shadow-xl hover:border-[#BB8543]/40 transition-all duration-300 group flex flex-col justify-between min-h-[320px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#001B51]/5 flex items-center justify-center text-[#BB8543] group-hover:bg-[#BB8543] group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-[#001B51] group-hover:text-[#BB8543] transition-colors duration-300">
                    Industrial Infrastructure
                  </h4>
                  <p className="text-sm text-body-gray leading-relaxed font-sans">
                    Fulfillment hubs, clean rooms, factory administrative blocks, and high-span warehouses using durable LGS engineered steel trusses.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-[#001B51]/60">
                  <span>Warehouses & Tech Hubs</span>
                  <span className="font-bold text-[#BB8543]">Severe Loads Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Specs & Quality Assurance Banner */}
          <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-[#001B51] to-[#002B66] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="absolute inset-0 bg-[url('/systems-bg.png')] bg-cover bg-center opacity-[0.04] pointer-events-none select-none" />
            
            <div className="space-y-4 max-w-[650px] relative z-10 text-left">
              <span className="inline-block text-[10px] font-mono tracking-[0.15em] text-brand-gold uppercase font-bold border border-white/20 bg-white/5 px-2.5 py-0.5 rounded-full">
                Engineering Standard
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
                Plan your project with Ecometal Matrix
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-sans font-light">
                Our team provides structural calculations, code certifications, dynamic scheduling, and on-site LGS assembly supervision to ensure zero-defect project delivery.
              </p>
            </div>

            <div className="relative z-10 shrink-0 self-start md:self-center">
              <a
                href="https://wa.me/919080802406?text=Hi!%20I%20have%20an%20enquiry%20about%20starting%20an%20LGS%20project%20build."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-brand-gold/10"
              >
                <MessageSquare size={16} />
                Discuss a Build on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
