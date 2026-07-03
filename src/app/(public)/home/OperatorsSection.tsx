"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import SectionDivider from "@/components/SectionDivider";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getOperators() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("operators")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // If less than 5 from DB, append mock ones to keep exactly 5 items as specified
          if (data.length < 5) {
            const filled = [...data, ...MOCK_OPERATORS.slice(data.length)];
            setOperators(filled);
          } else {
            setOperators(data);
          }
        }
      } catch (err) {
        console.warn("Supabase Operators fetch failed, using fallback mock data:", err);
      } finally {
        setLoading(false);
      }
    }
    getOperators();
  }, []);

  const isPaused = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current) return;
      if (scrollRef.current) {
        const { scrollLeft } = scrollRef.current;
        const scrollAmount = window.innerWidth < 1024 ? 300 : 346;

        scrollRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth"
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Initialize scroll position to the middle set for seamless looping
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = scrollWidth / 3;
    }
  }, [operators]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 3;

    // Seamlessly loop back to middle if scrolled too far left or right
    if (scrollLeft >= singleSetWidth * 2) {
      scrollRef.current.scrollLeft = scrollLeft - singleSetWidth;
    } else if (scrollLeft <= 5) {
      scrollRef.current.scrollLeft = scrollLeft + singleSetWidth;
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = window.innerWidth < 1024 ? 300 : 350; // scroll by roughly one card width
      const targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  // Normalize data (ensuring correct line-breaks, experience values, and badges
  // regardless of if database values are different from mockup specifications)
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

  const loopedOperators = [
    ...displayOperators.map((op, i) => ({ ...op, uniqueId: `${op.id}-0-${i}` })),
    ...displayOperators.map((op, i) => ({ ...op, uniqueId: `${op.id}-1-${i}` })),
    ...displayOperators.map((op, i) => ({ ...op, uniqueId: `${op.id}-2-${i}` })),
  ];

  return (
    <section id="team" className="w-full bg-white text-gray-800 pt-0 pb-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider (04) */}
      <div className={CONTAINER}>
        <SectionDivider title="Meet Our Team" num="04" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-end">
          {/* Left: Heading — Cal Sans, 64px at 1920px width, scales fluidly below that */}
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              Built by operators.
            </h2>
          </div>
          {/* Right: Description — Geist, 24px / line-height 26px at 1920px width */}
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.3] font-sans font-normal tracking-[-0.04em] text-body-gray max-w-[480px]">
              Domain depth across construction execution, structural engineering, and AI platform development — the people accountable for delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontally scrollable carousel wrapper without scrollbar */}
      <div
        ref={scrollRef}
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
        onScroll={handleScroll}
        className="w-full overflow-x-auto px-[clamp(20px,4.2vw,81px)] pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-row gap-[20px] xl:gap-[25px] w-max">
          {loopedOperators.map((op) => (
            <div
              key={op.uniqueId}
              className="relative w-[clamp(280px,20.8vw,398px)] aspect-[398/539] rounded-[20px] overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col justify-end shrink-0 select-none"
            >
              {/* Profile Image with scale-on-hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-102"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(107, 104, 97, 0) 0%, rgba(107, 104, 97, 0) 55%, rgba(107, 104, 97, 0.7) 75%, #6B6861 100%), url('${op.image_url}')`,
                }}
              />

              {/* Category pill tag in the top-left corner */}
              <div className="absolute top-0 left-0 z-10 w-1/2 h-[clamp(36px,2.5vw,48px)] bg-black flex items-center pl-[clamp(6px,0.8vw,11.67px)] pr-[clamp(6px,0.8vw,11.67px)] gap-[5.56px]">
                <span className="text-[clamp(10px,0.85vw,14px)] font-medium text-white tracking-wide leading-none truncate w-full">
                  {op.badge}
                </span>
              </div>

              {/* Name & Title details at bottom */}
              <div className="relative z-10 pl-[clamp(6px,0.8vw,11.67px)] pr-[clamp(6px,0.8vw,11.67px)] pb-[clamp(16px,2vw,32px)] pt-8 text-white space-y-1">
                <h4 className="font-['Inter'] font-bold text-[clamp(22px,2.15vw,41.33px)] leading-[1.05] tracking-[-0.54px] text-white transition-colors duration-300 group-hover:text-accent-blue whitespace-pre-line">
                  {op.name}
                </h4>
                <p className="font-sans font-semibold text-[clamp(12px,0.95vw,18.13px)] leading-[1.1] tracking-[-0.24px] text-[#C4C4C4] mt-1.5">
                  {op.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
