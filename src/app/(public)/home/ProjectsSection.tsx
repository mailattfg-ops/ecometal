"use client";

import React, { useState, useEffect } from "react";
import SectionDivider from "@/components/SectionDivider";
import { Ruler, MapPin, Calendar, Bed, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("Database Projects fetch failed, using fallback mock data:", err);
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (projects.length > 0) {
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const activeProject = projects[activeIndex] || MOCK_PROJECTS[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Shared horizontal padding used across the title block and the overlay content
  // so both align to the same left/right edges regardless of viewport width.
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  return (
    <section id="projects" className="w-full bg-white text-gray-800 pt-15 pb-15 scroll-mt-20 flex flex-col items-center overflow-x-hidden">
      {/* Section Divider (06) */}
      <div className={CONTAINER}>
        <SectionDivider title="Projects & Case Studies" num="06" />
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
      <div 
        className="relative w-full max-w-[1945px] aspect-[16/10] sm:aspect-[1945/942] min-h-[450px] sm:min-h-0 overflow-hidden shadow-sm flex flex-col justify-end group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >

        {/* Photographic background fill — select-none lives here only, so it stops the
            photo itself from being drag-selected without blocking the text/links below */}
        <div
          className="absolute inset-0 bg-cover bg-center select-none transition-transform duration-[8000ms] group-hover:scale-102"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.85)), url('${activeProject.image_url}')`,
          }}
        />

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[clamp(12px,2vw,32px)] right-[clamp(12px,2vw,32px)] hidden lg:flex justify-between z-20 pointer-events-none">
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
          <div
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 w-full"
          >
            {/* Left: Title & Description */}
            <div className="flex flex-col gap-2 max-w-[320px] shrink-0 text-left">
              <h3 className="text-xl sm:text-3xl font-bold font-display text-white tracking-tight leading-tight">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans font-normal">
                {activeProject.description}
              </p>
            </div>

            {/* Center: Stat clusters in a row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-left">
              {/* Area */}
              <div className="flex items-center gap-2.5 shrink-0">
                <Ruler className="w-5 h-5 text-brand-gold shrink-0" />
                <div className="leading-tight">
                  <span className="block text-sm sm:text-base font-bold text-white leading-none">{activeProject.area}</span>
                  <span className="block text-[10px] text-white/50 tracking-wider font-mono uppercase mt-1">Total Area</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5 shrink-0">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <div className="leading-tight">
                  <span className="block text-sm sm:text-base font-bold text-white leading-none">{activeProject.location}</span>
                  <span className="block text-[10px] text-white/50 tracking-wider font-mono uppercase mt-1">Location</span>
                </div>
              </div>

              {/* Completion */}
              <div className="flex items-center gap-2.5 shrink-0">
                <Calendar className="w-5 h-5 text-brand-gold shrink-0" />
                <div className="leading-tight">
                  <span className="block text-sm sm:text-base font-bold text-white leading-none">{activeProject.completion_time}</span>
                  <span className="block text-[10px] text-white/50 tracking-wider font-mono uppercase mt-1">Time to Complete</span>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex items-center gap-2.5 shrink-0">
                <Bed className="w-5 h-5 text-brand-gold shrink-0" />
                <div className="leading-tight">
                  <span className="block text-sm sm:text-base font-bold text-white leading-none">{activeProject.bedrooms}</span>
                  <span className="block text-[10px] text-white/50 tracking-wider font-mono uppercase mt-1">Project Type</span>
                </div>
              </div>
            </div>

            {/* Right: View Case Study Button Link */}
            <div className="shrink-0 flex items-center justify-end w-full lg:w-auto lg:ml-auto">
              <Link
                href={`/project/${activeProject.id}`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black font-semibold text-xs tracking-wider shrink-0 cursor-pointer pointer-events-auto transition-all duration-300 shadow-md hover:shadow-brand-gold/20 hover:scale-[1.02]"
              >
                View Case Study →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}