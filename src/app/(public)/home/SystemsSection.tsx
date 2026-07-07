"use client";

import React from "react";
import Image from "next/image";

export default function SystemsSection() {
  const systems = [
    {
      num: "01",
      title: "Affordable & mid-market homes",
      desc: "Government-underwritten demand through national housing programmes.",
    },
    {
      num: "02",
      title: "Warehouse & logistics",
      desc: "E-commerce and manufacturing growth driving rapid warehouse construction.",
    },
    {
      num: "03",
      title: "Schools, clinics & hostels",
      desc: "Large, higher-margin social-infrastructure demand from public budgets.",
    },
    {
      num: "04",
      title: "Offices & mixed-use",
      desc: "South India's IT-corridor expansion across major metros.",
    },
  ];

  return (
    <section
      id="systems"
      className="relative w-full min-h-screen lg:h-screen text-white overflow-hidden flex flex-col lg:flex-row items-stretch scroll-mt-20"
      style={{
        backgroundImage: "url('/systems-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* LEFT COLUMN — width fixed at 45% on desktop, full-width on mobile */}
      <div className="w-full lg:w-[45%] shrink-0 flex flex-col justify-center py-12 lg:py-0 px-[clamp(20px,4vw,80px)] relative z-10">
        {/* Section divider */}
        <div className="w-full flex flex-col mb-[clamp(16px,4vh,56px)] select-none">
          <div className="w-full h-[1px] bg-white/15 mb-[clamp(10px,1.5vh,20px)]" />
          <span className="text-[clamp(11px,1.2vh,15px)] font-display font-semibold text-white/60 uppercase tracking-[0.15em]">
            02 / Systems
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[clamp(36px,7.5vh,64px)] font-bold leading-[1.05] font-display text-white tracking-tight mb-[clamp(20px,4.5vh,48px)]">
          Systems
          <br />
          we build
        </h2>

        {/* List (01–04) */}
        <div className="flex flex-col gap-[clamp(10px,2vh,24px)]">
          {systems.map((sys) => (
            <div key={sys.num} className="flex gap-[clamp(6px,1vw,14px)] items-start group">
              {/* Number accent — width tied to font size so text never wraps under it */}
              <span className="w-[clamp(70px,9vh,110px)] text-[clamp(44px,8vh,92px)] text-accent-blue font-bold font-sans leading-none shrink-0 select-none group-hover:text-white transition-colors duration-300">
                {sys.num}
              </span>

              {/* Text block */}
              <div className="pt-[clamp(2px,0.5vh,6px)]">
                <h4 className="text-[clamp(16px,2.4vh,26px)] font-semibold font-sans text-white leading-snug whitespace-nowrap group-hover:text-accent-blue transition-colors duration-300">
                  {sys.title}
                </h4>
                <p className="text-[clamp(12px,1.6vh,18px)] font-sans font-normal text-light-blue/80 leading-snug max-w-[420px] mt-[2px]">
                  {sys.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN — image, gradient now only fades the seam (first ~28%) so most of the photo stays fully crisp */}
      <div className="relative w-full h-[350px] sm:h-[450px] lg:w-[55%] lg:h-full shrink-0 overflow-hidden">
        <Image
          src="/systems.jpg"
          alt="Systems Building"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}


// "use client";

// import React from "react";

// export default function SystemsSection() {
//   const systems = [
//     {
//       num: "01",
//       title: "Affordable & mid-market homes",
//       desc: "Government-underwritten demand through national housing programmes.",
//     },
//     {
//       num: "02",
//       title: "Warehouse & logistics",
//       desc: "E-commerce and manufacturing growth driving rapid warehouse construction.",
//     },
//     {
//       num: "03",
//       title: "Schools, clinics & hostels",
//       desc: "Large, higher-margin social-infrastructure demand from public budgets.",
//     },
//     {
//       num: "04",
//       title: "Offices & mixed-use",
//       desc: "South India's IT-corridor expansion across major metros.",
//     },
//   ];

//   return (
//     <section id="systems" className="relative w-full min-h-[600px] lg:h-[100dvh] 2xl:h-[1080px] bg-brand-navy text-white overflow-hidden flex items-center justify-center scroll-mt-20">

//       <div className="w-full md:w-5/12 mx-auto px-6 flex flex-col justify-between h-full py-16 xl:py-24 relative z-10">

//         {/* Dark theme Section Divider */}
//         <div className="w-full h-[60px] flex flex-col justify-between mb-16 select-none">
//           <div className="w-full h-[1px] bg-white/10" />
//           <div className="flex justify-between items-center w-full">
//             <span className="text-[21px] font-display font-normal text-light-gray uppercase tracking-wider">
//               Our Systems
//             </span>
//             <span className="text-[21px] font-display font-normal text-light-gray tracking-wider">
//               [02]
//             </span>
//           </div>
//         </div>

//         {/* Content Layout */}
//         <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-0">

//           {/* Left Column (Occupies 45% of width, matches 873px layout) */}
//           <div className="w-full shrink-0 space-y-12 pr-6 lg:pr-12">

//             {/* Section Heading (Cal Sans 64 px) */}
//             <h2 className="text-4xl sm:text-[30px] md:text-[40px] font-normal leading-tight font-display text-white tracking-tight">
//               Systems < br /> we build
//             </h2>

//             {/* List (01-04) */}
//             <div className="space-y-8">
//               {systems.map((sys) => (
//                 <div key={sys.num} className="flex gap-[14px] items-start group">
//                   {/* Number Accent (150x132px, Geist Medium 110px #5176C0) */}
//                   <span className="w-[150px] h-[132px] text-[80px] sm:text-[110px] text-accent-blue font-medium font-sans leading-none flex items-center justify-center shrink-0 select-none group-hover:text-white transition-colors duration-300">
//                     {sys.num}
//                   </span>

//                   {/* Text Block */}
//                   <div className="space-y-1 pt-2 sm:pt-4">
//                     <h4 className="text-[22px] md:text-[24px] lg:text-[32px] font-medium font-sans text-white leading-snug group-hover:text-accent-blue transition-colors duration-300">
//                       {sys.title}
//                     </h4>
//                     <p className="text-[18px] md:text-[20px] lg:text-[24px] font-sans font-normal text-light-blue leading-relaxed">
//                       {sys.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>

//       </div>
//       {/* Right Column: Full-bleed photo fill (Occupies 55% of width, matches 1047px layout) */}
//       <div className="hidden md:block w-[55%] md:w-7/12 shrink-0 select-none pointer-events-none z-0 overflow-hidden">
//         <img
//           src="/systems.jpg"
//           alt="Systems Building"
//           className="w-full h-full object-cover"
//         />
//         {/* Gradient Overlay Fade */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[#001B51] via-[#001B51]/10 to-transparent" />
//       </div>
//     </section>
//   );
// }
