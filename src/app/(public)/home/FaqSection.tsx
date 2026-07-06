"use client";

import React, { useState } from "react";
import SectionDivider from "@/components/SectionDivider";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const faqs = [
    {
      q: "Is light gauge steel as strong and durable as concrete?",
      a: "Yes — engineered correctly, LGS provides full structural performance for its building class. Galvanised steel is dimensionally stable, non-combustible, and immune to termites, rot, and warping, with a long service life. Our systems are designed to the relevant Indian Standards (IS 811, IS 801, and others) and independently checked.",
    },
    {
      q: "How does it perform in fire, heat, monsoon, and earthquakes?",
      a: "Steel is non-combustible, and our foam concrete infill encases the frame to support a fire-resistance rating. The wall and roof build-ups are designed for thermal comfort, and the system's low weight gives strong seismic performance. Detailed performance figures for each build-up are available on request. [Confirm specific fire, thermal, and acoustic ratings against test data before publishing.]",
    },
    {
      q: "Does it cost more than conventional construction?",
      a: "Total delivered cost is competitive once speed, reduced waste, lower labour, and faster occupation are accounted for. Because design and costing are AI-driven, you receive a tight, itemised estimate before committing. [Add indicative pricing or ranges once confirmed.]",
    },
    {
      q: "Can I get a loan or mortgage on a steel-framed building?",
      a: "[Address financing/mortgageability directly here — this is a common question in the Indian market. State which lenders or schemes recognise the system, or that we can support the documentation lenders require.]",
    },
    {
      q: "Is it approved for government housing schemes?",
      a: "[State current scheme eligibility and any empanelment or procurement-portal listings once held. Do not claim approvals that are not yet in place.]",
    },
    {
      q: "What warranty and after-sales support do you provide?",
      a: "[State the warranty period, what it covers, expected design life, maintenance requirements, and the after-sales support you offer.]",
    },
    {
      q: "How long does a typical project take?",
      a: "Because offsite manufacture runs in parallel with site works, programmes are far shorter than conventional builds — a single-storey home can be delivered in roughly 90–120 days end to end, depending on scale and site conditions. [Confirm against delivered-project data.]",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-white text-gray-800 py-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Common Questions" num="12" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              What people <span className="text-brand-navy">ask.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              Straight answers to the questions buyers most often have about light-steel construction.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className={CONTAINER}>
        <div className="w-full max-w-[1000px] mx-auto border-t border-gray-250">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between py-6 text-left font-sans font-semibold text-[16px] md:text-[18px] text-near-black hover:text-brand-navy transition-colors duration-200 cursor-pointer select-none focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 shrink-0 text-brand-gold">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-[14px] md:text-[15px] leading-[1.6] font-sans font-normal text-body-gray select-text">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
