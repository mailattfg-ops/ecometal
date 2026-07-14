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

        {/* Map Row */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Left: Office Address Card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <span className="block text-[11px] font-mono tracking-[0.15em] text-brand-gold uppercase">
                Office & Factory Locations
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Visit Us
              </h3>
            </div>
            
            <div className="space-y-4 text-sm text-white/80 leading-relaxed font-sans font-normal">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-brand-gold shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <strong className="text-white">Office:</strong><br />
                  No. 2, Minnagar, Near Ramakrishna School,<br />
                  Chidambaram North, Chidambaram,<br />
                  Cuddalore District, Tamil Nadu - 608001
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-brand-gold shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <strong className="text-white">Works / Registered Factory:</strong><br />
                  Plot 49-50, SIDCO Industrial Estate,<br />
                  Uthangarai, Krishnagiri District,<br />
                  Tamil Nadu
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-brand-gold shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>
                  Visiting Hours:<br />
                  Monday - Saturday: 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>

            {/* Directions Button */}
            <a
              href="https://maps.app.goo.gl/Z16fA1guiC2BfACBA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#FFE270] to-[#DA8B0C] text-[#1a1a1a] font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-98"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>

          {/* Right: Embedded Google Maps */}
          <div className="lg:col-span-8 h-[320px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-lg relative bg-white/5">
            <iframe
              src="https://maps.google.com/maps?q=12%C2%B015'08.3%22N+78%C2%B031'17.1%22E&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ecometal Matrix Factory Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
