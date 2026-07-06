"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, PhoneCall, Globe, Linkedin, Instagram } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Market", href: "#market" },
    { name: "Systems", href: "#systems" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#team" },
    { name: "Compliance", href: "#quality" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-[clamp(16px,4vw,64px)] py-4 flex items-center justify-between transition-all duration-300 ${isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 pointer-events-auto"
            : "pointer-events-none"
          }`}
      >
        {/* Logo / Brand Name */}
        <Link
          href="/"
          className="flex items-center group transition-opacity hover:opacity-90 select-none shrink-0 text-[13px] leading-tight font-medium text-white pointer-events-auto"
        >
          <Image
            src="/logo.svg"
            alt="Ecometal Matrix Engineering Pvt. Ltd."
            width={210}
            height={52}
            priority
            className={`w-[120px] sm:w-[150px] md:w-[180px] xl:w-[210px] h-auto object-contain transition-all duration-300 ${isScrolled ? "brightness-0" : ""
              }`}
          />
        </Link>

        {/* Desktop Navigation Pill (Links + CTA Button inside) */}
        <div
          className={`hidden lg:flex items-center gap-4 rounded-full p-[3px] border transition-all duration-300 select-none shrink-0 pointer-events-auto ${isScrolled
              ? "bg-gray-100/80 border-gray-200"
              : "bg-black/60 backdrop-blur-md border-white/10 shadow-lg"
            }`}
        >
          <nav className="flex items-center gap-1 pl-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[12px] font-normal px-2.5 py-1 transition-colors duration-200 ${isScrolled ? "text-gray-600 hover:text-black" : "text-white/90 hover:text-white"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className={`text-[12px] font-semibold px-4 py-1.5 rounded-full transition select-none shrink-0 ${isScrolled
                ? "bg-brand-navy text-white hover:bg-brand-navy/90"
                : "bg-white text-black hover:bg-white/90"
              }`}
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors pointer-events-auto ${isScrolled ? "text-near-black hover:text-brand-navy" : "text-white hover:text-brand-gold"
            }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 border-b transition-all duration-300 pointer-events-auto backdrop-blur-md ${isScrolled
              ? "bg-white/95 border-gray-200"
              : "bg-black/95 border-white/10"
            } px-6 py-6`}>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium py-1.5 border-b transition-colors ${isScrolled
                      ? "text-gray-600 hover:text-black border-gray-100"
                      : "text-gray-300 hover:text-accent-blue border-white/5"
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`inline-flex items-center justify-center w-full px-5 py-3 mt-4 rounded-full text-base font-bold transition-all shadow-md ${isScrolled
                    ? "bg-brand-navy text-white hover:bg-brand-navy/90"
                    : "bg-white text-dark-gray hover:bg-accent-blue hover:text-white"
                  }`}
              >
                Get In Touch
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-[#001B51] border-t border-white/10 text-white/70 py-16 px-16">
        <div className="max-w-[1757px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-[113px] items-start pb-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/footer-logo.svg"
                alt="Ecometal Matrix Engineering Pvt. Ltd."
                width={200}
                height={50}
                className="w-[220px] h-auto select-none"
              />
            </div>
            <p className="text-[10px] sm:text-[11px] leading-relaxed text-white/50 pt-2 uppercase tracking-[0.15em] font-semibold">
              AI-Native Steel Construction
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link href="#" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#market" className="hover:text-white transition-colors">Market</Link></li>
              <li><Link href="#systems" className="hover:text-white transition-colors">Systems</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider">Projects and process</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><Link href="#process" className="hover:text-white transition-colors">Process</Link></li>
              <li><Link href="#projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="#apps" className="hover:text-white transition-colors">Applications</Link></li>
              <li><Link href="#quality" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#resources" className="hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider">Contact</h4>
            <div className="space-y-2 text-sm text-white/75 leading-relaxed">
              <p>Email: <a href="mailto:info@ecometalmatrix.com" className="hover:text-white transition-colors">info@ecometalmatrix.com</a></p>
              <p>WhatsApp: <a href="tel:+919080802406" className="hover:text-white transition-colors">+91 90808 02406</a></p>

              {/* Inline Social Icons */}
              <div className="flex items-center space-x-3 pt-3">
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center border border-white/10" aria-label="Website">
                  <Globe size={16} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center border border-white/10" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center border border-white/10" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="max-w-[1757px] mx-auto mt-12 pt-8 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ecometal Matrix. All rights reserved.</p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://thinkforgeglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline transition-colors"
            >
              Think Forge Global
            </a>.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button with Halo Ripple */}
      <div className="fixed bottom-6 right-6 z-[9999] w-14 h-14 pointer-events-none flex items-center justify-center">
        {/* Radar/Ripple Ring */}
        <div className="absolute inset-0 bg-[#25D366]/30 rounded-full animate-whatsapp-ripple pointer-events-none" />

        {/* Main WhatsApp Button */}
        <a
          href="https://wa.me/919080802406"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex items-center justify-center w-full h-full bg-[#25D366] text-white rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:bg-[#20ba5a] hover:scale-110 active:scale-95 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 pointer-events-auto select-none"
          aria-label="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.07 1.006 11.44 1.006c-5.438 0-9.863 4.37-9.867 9.8-.001 1.737.478 3.435 1.39 4.938L1.933 21.3l5.88-1.528c1.353.791 2.802 1.2 4.298 1.2zM17.8 14.8c-.34-.17-2.02-.997-2.33-1.11-.3-.11-.53-.17-.75.17-.22.34-.85 1.11-1.04 1.33-.19.22-.38.25-.72.08-1.74-.87-2.92-1.5-4.08-3.5-.3-.52-.3-.08-.07.13.2.19.45.52.68.79.23.27.3.45.45.76.15.3.07.57-.04.74-.11.17-.75.99-.95 1.22-.2.23-.42.25-.76.08a9.4 9.4 0 0 1-2.98-1.84 10.37 10.37 0 0 1-2.06-2.56c-.34-.58-.04-.89.26-1.2.27-.27.56-.63.76-.89.2-.26.27-.45.41-.75.14-.3.07-.57-.04-.74-.11-.17-.91-2.18-1.25-3-.33-.8-.67-.69-.91-.7H7.76c-.26 0-.67.1-1.03.48C6.37 6.46 5.36 7.4 5.36 9.3c0 1.9 1.39 3.73 1.58 3.99.2.26 2.73 4.18 6.63 5.86 2.37 1 3.86 1.3 5.27 1.1.84-.13 2.58-1.06 2.94-2.08.36-1.02.36-1.9.25-2.08-.1-.18-.38-.28-.72-.45z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
