"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import SectionDivider from "@/components/SectionDivider";
import { Ruler, MapPin, Calendar, Bed, ArrowRight, ArrowLeft } from "lucide-react";

interface Project {
  id: string | number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  area: string;
  location: string;
  completion_time: string;
  bedrooms: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Residential\nConstruction",
    category: "Residential",
    description: "Modern family home built with premium materials.",
    image_url: "/project-1.jpg",
    area: "3,200 sq.ft",
    location: "Austin, TX",
    completion_time: "8 Months",
    bedrooms: "4 Bedrooms"
  },
  {
    id: 2,
    title: "Ecometal Logistics Hub",
    category: "Commercial",
    description: "Spacious commercial warehouse with high-strength truss systems.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    area: "45,000 sq.ft",
    location: "Chennai, TN",
    completion_time: "8 Months",
    bedrooms: "Warehouse"
  },
  {
    id: 3,
    title: "Apex Innovation Office",
    category: "Office",
    description: "Multi-story mixed-use corporate headquarters.",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    area: "12,500 sq.ft",
    location: "Bangalore, KA",
    completion_time: "5 Months",
    bedrooms: "3 Floors"
  }
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("Supabase Projects fetch failed, using fallback mock data:", err);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  const activeProject = projects[activeIndex] || MOCK_PROJECTS[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Shared horizontal padding used across the title block and the overlay content
  // so both align to the same left/right edges regardless of viewport width.
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  return (
    <section id="projects" className="w-full bg-white text-gray-800 pt-15 pb-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider (05) */}
      <div className={CONTAINER}>
        <SectionDivider title="WHY THIS TRIP IS DIFFERENT" num="05" />
      </div>

      {/* Main Title Block */}
      <div className={`${CONTAINER} mb-[clamp(32px,5vw,64px)]`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(24px,4vw,77px)] items-start">
          {/* Left: Heading — Cal Sans, 64px at 1920px width, scales fluidly below that */}
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(32px,3.33vw,64px)] font-bold leading-[1.05] font-display text-near-black tracking-tight">
              Projects we have done
            </h2>
          </div>
          {/* Right: Sub-heading — Geist, 24px / line-height 26px at 1920px width */}
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-[clamp(16px,1.25vw,24px)] leading-[1.2] font-sans font-normal tracking-[-0.04em] text-body-gray">
              Completed and pilot projects demonstrating speed, quality, and value across building types. Add real projects with photos, scale, and outcomes as they complete.
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed Image Panel — width fluid up to 1945px, height scales via aspect-ratio
          instead of a fixed 942px, so nothing gets clipped or pushed off-screen on smaller viewports */}
      <div className="relative w-full max-w-[1945px] aspect-[16/10] sm:aspect-[1945/942] min-h-[450px] sm:min-h-0 overflow-hidden shadow-sm flex flex-col justify-end group">

        {/* Photographic background fill — select-none lives here only, so it stops the
            photo itself from being drag-selected without blocking the text/links below */}
        <div
          className="absolute inset-0 bg-cover bg-center select-none transition-transform duration-[8000ms] group-hover:scale-102"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.85)), url('${activeProject.image_url}')`,
          }}
        />

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[clamp(12px,2vw,32px)] right-[clamp(12px,2vw,32px)] flex justify-between z-20 pointer-events-none">
          <button
            onClick={handlePrev}
            className="p-[clamp(10px,1.2vw,16px)] rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 pointer-events-auto backdrop-blur-md cursor-pointer border border-white/10"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-[clamp(16px,1.25vw,24px)] h-[clamp(16px,1.25vw,24px)]" />
          </button>
          <button
            onClick={handleNext}
            className="p-[clamp(10px,1.2vw,16px)] rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 pointer-events-auto backdrop-blur-md cursor-pointer border border-white/10"
            aria-label="Next project"
          >
            <ArrowRight className="w-[clamp(16px,1.25vw,24px)] h-[clamp(16px,1.25vw,24px)]" />
          </button>
        </div>

        {/* Slider Indicator Dots */}
        <div className="absolute top-[clamp(16px,2vw,32px)] right-[clamp(16px,2vw,32px)] z-20 flex gap-2.5">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? "w-10 bg-accent-blue" : "w-3 bg-white/50 hover:bg-white"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom overlay content — single inline row: title, tagline, then stat clusters.
            No badge, no card background, no border — everything sits directly on the gradient,
            matching the reference layout exactly. */}
        <div className={`relative z-10 ${CONTAINER} text-white p-[clamp(16px,2.5vw,32px)] select-text`}>
          {/* flex-nowrap forces a single row; overflow-x-auto is a safety net for very
              narrow screens instead of silently wrapping or clipping content. Scrollbar
              is hidden for a clean look but the row remains scrollable if truly needed. */}
          <div
            className="flex flex-nowrap items-end gap-[clamp(16px,3vw,64px)] w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >

            {/* Title — scaled down so it comfortably shares the row with the stats */}
            {/* <h3 className="text-[clamp(18px,2.1vw,42px)] font-normal font-heading leading-[1.05] tracking-[-0.03em] shrink-0 whitespace-nowrap"> */}
            <h3 className="text-[clamp(18px,2.1vw,42px)] font-normal font-heading leading-[1.05] tracking-[-0.03em] shrink-0 whitespace-pre-line">

              {activeProject.title}
            </h3>

            {/* Tagline */}
            <p className="text-[clamp(11px,1.05vw,20px)] font-heading font-normal leading-[1.2] tracking-[-0.03em] text-[#B3B3B3] max-w-[220px] shrink-0">
              {activeProject.description}
            </p>

            {/* Stat clusters — plain icon + value inline, label below, no box/card behind them */}
            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <Ruler className="w-[clamp(12px,0.9vw,18px)] h-[clamp(12px,0.9vw,18px)] shrink-0" />
              <div className="leading-none">
                <span className="block text-[clamp(13px,1.45vw,28px)] font-sans font-medium tracking-[-0.04em] leading-none">{activeProject.area}</span>
                <span className="block text-[clamp(8px,0.85vw,16px)] font-sans font-normal tracking-[-0.04em] text-[#B3B3B3] mt-1">Total Area</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <MapPin className="w-[clamp(12px,0.9vw,18px)] h-[clamp(12px,0.9vw,18px)] shrink-0" />
              <div className="leading-none">
                <span className="block text-[clamp(13px,1.45vw,28px)] font-sans font-medium tracking-[-0.04em] leading-none">{activeProject.location}</span>
                <span className="block text-[clamp(8px,0.85vw,16px)] font-sans font-normal tracking-[-0.04em] text-[#B3B3B3] mt-1">Location</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <Calendar className="w-[clamp(12px,0.9vw,18px)] h-[clamp(12px,0.9vw,18px)] shrink-0" />
              <div className="leading-none">
                <span className="block text-[clamp(13px,1.45vw,28px)] font-sans font-medium tracking-[-0.04em] leading-none">{activeProject.completion_time}</span>
                <span className="block text-[clamp(8px,0.85vw,16px)] font-sans font-normal tracking-[-0.04em] text-[#B3B3B3] mt-1">Time to Complete</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <Bed className="w-[clamp(12px,0.9vw,18px)] h-[clamp(12px,0.9vw,18px)] shrink-0" />
              <div className="leading-none">
                <span className="block text-[clamp(13px,1.45vw,28px)] font-sans font-medium tracking-[-0.04em] leading-none">{activeProject.bedrooms}</span>
                <span className="block text-[clamp(8px,0.85vw,16px)] font-sans font-normal tracking-[-0.04em] text-[#B3B3B3] mt-1">Project Type</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}