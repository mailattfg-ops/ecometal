"use client";

import React, { useState, useEffect } from "react";
import SectionDivider from "@/components/SectionDivider";

interface Operator {
  id: string | number;
  name: string;
  role: string;
  badge: string;
  image_url: string;
}

const MOCK_OPERATORS: Operator[] = [
  {
    id: 1,
    name: "James\nKennedy",
    role: "15+ years of Experience",
    badge: "Operations Director",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Samantha\nLiu",
    role: "10 years of Experience",
    badge: "Chief of Marketing",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Marcus\nTuring",
    role: "8 years of Experience",
    badge: "Sourcing Specialist",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Emily\nClark",
    role: "12 years of Experience",
    badge: "Logistics Coordinator",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Rajesh\nPatel",
    role: "5 years of Experience",
    badge: "Marketing Manager",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function OperatorsSection() {
  const [operators, setOperators] = useState<Operator[]>(MOCK_OPERATORS);
  const [hideTeamImages, setHideTeamImages] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // Fetch setting and operator records in parallel
        const [opsRes, settingsRes] = await Promise.all([
          fetch("/api/operators"),
          fetch("/api/settings")
        ]);

        if (opsRes.ok) {
          const opsData = await opsRes.json();
          if (opsData && opsData.length > 0) {
            if (opsData.length < 5) {
              setOperators([...opsData, ...MOCK_OPERATORS.slice(opsData.length)]);
            } else {
              setOperators(opsData);
            }
          }
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setHideTeamImages(!!settingsData.hide_team_images);
        }
      } catch (err) {
        console.warn("Database Operators fetch failed, using fallback mock data:", err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  // Normalize data naming
  const displayOperators = operators.map((op) => {
    const nameClean = op.name.replace(/\n/g, " ");
    let mappedRole = op.role;
    let mappedBadge = op.badge;
    let mappedName = op.name;

    if (nameClean.includes("James")) {
      mappedName = "James\nKennedy";
      mappedRole = "15+ years of Experience";
      mappedBadge = "Operations Director";
    } else if (nameClean.includes("Samantha")) {
      mappedName = "Samantha\nLiu";
      mappedRole = "10 years of Experience";
      mappedBadge = "Chief of Marketing";
    } else if (nameClean.includes("Marcus")) {
      mappedName = "Marcus\nTuring";
      mappedRole = "8 years of Experience";
      mappedBadge = "Sourcing Specialist";
    } else if (nameClean.includes("Emily")) {
      mappedName = "Emily\nClark";
      mappedRole = "12 years of Experience";
      mappedBadge = "Logistics Coordinator";
    } else if (nameClean.includes("Rajesh")) {
      mappedName = "Rajesh\nPatel";
      mappedRole = "5 years of Experience";
      mappedBadge = "Marketing Manager";
    }

    return {
      ...op,
      name: mappedName,
      role: mappedRole,
      badge: mappedBadge
    };
  });

  // Duplicate elements for infinite seamless marquee
  const marqueeOperators = [...displayOperators, ...displayOperators, ...displayOperators];

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

      {/* Infinite Horizontal Marquee Container */}
      <div className="w-full overflow-hidden relative">

        <div className="animate-marquee-slow flex flex-row gap-6 w-max py-4 px-6 pointer-events-auto">
          {marqueeOperators.map((op, idx) => (
            <div key={`${op.id}-${idx}`}>
              {hideTeamImages ? (
                /* Text-only Cards (Images Hidden) */
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
              ) : (
                /* Profile Cards (Images Shown) */
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
