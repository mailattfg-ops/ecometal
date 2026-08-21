"use client";

import React, { useState, useEffect } from "react";
import SectionDivider from "@/components/SectionDivider";
import { EMPTY_OPERATORS_DATA, type Operator, type OperatorsSectionData } from "@/lib/operators";

/** Below this count the row is rendered statically (centered, no marquee). */
const MARQUEE_THRESHOLD = 3;

function OperatorCard({ op, hideImage }: { op: Operator; hideImage: boolean }) {
  if (hideImage || !op.image_url) {
    /* Text-only Card (Images Hidden) */
    return (
      <div className="w-[280px] sm:w-[325px] h-[190px] p-6 rounded-[20px] bg-[#001B51] border border-white/10 hover:border-brand-gold hover:shadow-xl transition-all duration-300 flex flex-col justify-between shrink-0 select-none relative overflow-hidden group">
        {/* Top: Badge / Role designation */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold">
            {op.badge}
          </span>
        </div>

        {/* Bottom: Name & Experience details */}
        <div className="space-y-1 text-left">
          <h4 className="font-['Inter'] font-bold text-xl sm:text-2xl leading-[1.1] text-white group-hover:text-brand-gold transition-colors duration-300 whitespace-pre-line">
            {op.name}
          </h4>
          <p className="font-sans font-normal text-xs text-white/50 mt-1">
            {op.role}
          </p>
        </div>
      </div>
    );
  }

  /* Profile Card (Images Shown) */
  return (
    <div className="relative w-[280px] sm:w-[346px] aspect-[346/470] rounded-[20px] overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col justify-end shrink-0 select-none">
      {/* Profile image background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-102"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(107, 104, 97, 0) 0%, rgba(107, 104, 97, 0) 55%, rgba(107, 104, 97, 0.7) 75%, #6B6861 100%), url('${op.image_url}')`,
        }}
      />

      {/* Top corner badge tag */}
      <div className="absolute top-0 left-0 z-10 bg-black py-2 px-4 rounded-br-xl max-w-[80%]">
        <span className="text-[11px] font-medium text-white tracking-wide leading-none truncate block">
          {op.badge}
        </span>
      </div>

      {/* Name and Title description */}
      <div className="relative z-10 p-5 text-white text-left space-y-1">
        <h4 className="font-['Inter'] font-bold text-xl sm:text-2xl leading-[1.1] text-white transition-colors duration-300 group-hover:text-brand-gold whitespace-pre-line">
          {op.name}
        </h4>
        <p className="font-sans font-semibold text-xs sm:text-sm text-[#C4C4C4] mt-1">
          {op.role}
        </p>
      </div>
    </div>
  );
}

interface OperatorsSectionProps {
  /** Rendered on the server so the cards are in the initial HTML. */
  initialData?: OperatorsSectionData;
}

export default function OperatorsSection({ initialData }: OperatorsSectionProps) {
  const data = initialData || EMPTY_OPERATORS_DATA;
  const [operators, setOperators] = useState<Operator[]>(data.operators);
  const [hideTeamImages, setHideTeamImages] = useState<boolean>(data.hideTeamImages);

  useEffect(() => {
    async function getData() {
      try {
        // Background refresh so admin edits land before the page cache rolls over.
        const [opsRes, settingsRes] = await Promise.all([
          fetch("/api/operators"),
          fetch("/api/settings")
        ]);

        if (opsRes.ok) {
          const opsData = await opsRes.json();
          // Show exactly what the database holds — deletions must disappear immediately.
          const next: Operator[] = Array.isArray(opsData) ? opsData : [];
          setOperators((prev) =>
            JSON.stringify(prev) === JSON.stringify(next) ? prev : next
          );
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setHideTeamImages(!!settingsData.hide_team_images);
        }
      } catch (err) {
        console.warn("Database Operators fetch failed:", err);
      }
    }
    getData();
  }, []);

  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  const isMarquee = operators.length >= MARQUEE_THRESHOLD;
  // Duplicate elements for infinite seamless marquee (only when there are enough cards)
  const marqueeOperators = isMarquee ? [...operators, ...operators, ...operators] : operators;

  return (
    <section id="team" className="w-full bg-white text-gray-800 pt-0 pb-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Dynamic Keyframe Style Definition */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-slow {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Section Divider */}
      <div className={CONTAINER}>
        <SectionDivider title="Leadership" num="07" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-end">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              Built by operators.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.3] font-sans font-normal tracking-[-0.04em] text-body-gray max-w-[480px]">
              Domain depth across construction execution, structural engineering, and AI platform development — the people accountable for delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Card row — static grid under 3 operators, infinite marquee at 3+ */}
      {operators.length > 0 && (
        isMarquee ? (
          <div className="w-full overflow-hidden relative">
            <div className="animate-marquee-slow flex flex-row gap-6 w-max py-4 px-6 pointer-events-auto">
              {marqueeOperators.map((op, idx) => (
                <div key={`${op.id}-${idx}`}>
                  <OperatorCard op={op} hideImage={hideTeamImages} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={CONTAINER}>
            <div className="flex flex-row flex-wrap justify-center gap-6 py-4">
              {operators.map((op) => (
                <div key={op.id}>
                  <OperatorCard op={op} hideImage={hideTeamImages} />
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );
}
