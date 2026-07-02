"use client";

import React from "react";

export default function ContactSection() {
  const CONTAINER = "w-full max-w-[1857px] mx-auto px-[clamp(20px,4.2vw,81px)]";

  return (
    <section id="contact" className="w-full bg-[#001B51] text-white pt-[clamp(48px,8vw,96px)] pb-[clamp(24px,4vw,48px)] scroll-mt-20 flex flex-col items-center">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[77px] items-start">
          {/* Left: Heading block */}
          <div className="lg:col-span-6 space-y-4">
            <span className="block text-[clamp(14px,1.25vw,18px)] font-sans font-normal text-white/70">
              Contact Info
            </span>
            <h2 className="text-[clamp(32px,3.33vw,54px)] font-bold leading-[1.1] font-display text-white tracking-tight max-w-[480px]">
              We are always happy to assist you
            </h2>
          </div>

          {/* Right: Info Columns */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-[60px] lg:pt-8">
            {/* Email Column */}
            <div className="space-y-3">
              <h4 className="text-[clamp(16px,1.2vw,20px)] font-sans font-semibold text-white tracking-wide">
                Email Address
              </h4>
              <div className="text-[clamp(14px,1.1vw,18px)] text-white/50">—</div>
              <a 
                href="mailto:info@ecometalmatrix.com" 
                className="block text-[clamp(16px,1.2vw,22px)] font-sans font-semibold text-white hover:text-white/80 transition-colors"
              >
                info@ecometalmatrix.com
              </a>
              <p className="text-[clamp(13px,1vw,16px)] font-sans font-normal text-white/70 leading-relaxed pt-2">
                Assistance hours:
                <br />
                Monday - Friday 6 am to 8 pm EST
              </p>
            </div>

            {/* Phone Column */}
            <div className="space-y-3">
              <h4 className="text-[clamp(16px,1.2vw,20px)] font-sans font-semibold text-white tracking-wide">
                Number
              </h4>
              <div className="text-[clamp(14px,1.1vw,18px)] text-white/50">—</div>
              <a 
                href="tel:+919080802406" 
                className="block text-[clamp(16px,1.2vw,22px)] font-sans font-semibold text-white hover:text-white/80 transition-colors"
              >
                +91 90808 02406
              </a>
              <p className="text-[clamp(13px,1vw,16px)] font-sans font-normal text-white/70 leading-relaxed pt-2">
                Assistance hours:
                <br />
                Monday - Friday 6 am to 8 pm EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
