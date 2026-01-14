"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lowerFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const lowerFooter = lowerFooterRef.current;

    if (!footer || !logo || !lowerFooter) return;

    const ctx = gsap.context(() => {
      // Set initial state - hidden below
      gsap.set(logo, { opacity: 0, y: 60 });

      // Animate logo from bottom to top on scroll
      gsap.to(logo, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lowerFooter,
          start: "top 95%",
          end: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const navLinks1 = [
    { label: "NM Verge", href: "#gallery-section" },
    { label: "NM Pride", href: "#gallery-section" },
    { label: "NM Grande", href: "#gallery-section" },
    { label: "London Villas", href: "#gallery-section" },
    { label: "Diamond City", href: "#gallery-section" },
  ];

  const navLinks2 = [
    { label: "About Us", href: "#our-services" },
    { label: "Our Projects", href: "#gallery-section" },
    { label: "In Media", href: "#objects-section" },
    { label: "Contact", href: "#contact-section" },
  ];

  const socialLinks = [
    { label: "INSTAGRAM", href: "https://instagram.com" },
    { label: "FACEBOOK", href: "https://facebook.com" },
    { label: "YOUTUBE", href: "https://youtube.com" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-[#241B14] text-white" style={{ zIndex: 2 }}>
      {/* Upper Footer */}
      <div
        style={{
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "8vh",
          paddingBottom: "6vh",
        }}
      >
        <div className="flex justify-between">
          {/* Left Side: Address + Email */}
          <div className="flex" style={{ gap: "8vw" }}>
            {/* Column 1: Address */}
            <div>
              <p
                className="text-xs font-medium text-white/60 uppercase mb-3"
                style={{ letterSpacing: "0.05em" }}
              >
                Our Headquarters
              </p>
              <p className="text-sm font-medium text-white/90 leading-[170%]">
                4th Floor, NM Verge, 8/5,
                <br />
                Yeshwant Niwas Rd, Maan Sarovar,
                <br />
                Indore, Madhya Pradesh 452003
              </p>
            </div>

            {/* Column 2: Email + General Inquiries */}
            <div>
              <p
                className="text-xs font-medium text-white/60 uppercase mb-3"
                style={{ letterSpacing: "0.05em" }}
              >
                General Inquiries
              </p>
              <a
                href="mailto:sales@thenmgroup.com"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                sales@thenmgroup.com
              </a>
            </div>
          </div>

          {/* Right Side: Nav Links */}
          <div className="flex" style={{ gap: "6vw" }}>
            {/* Projects */}
            <nav className="flex flex-col" style={{ gap: "12px" }}>
              <p
                className="text-xs font-medium text-white/60 uppercase mb-1"
                style={{ letterSpacing: "0.05em" }}
              >
                Projects
              </p>
              {navLinks1.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Useful Links */}
            <nav className="flex flex-col" style={{ gap: "12px" }}>
              <p
                className="text-xs font-medium text-white/60 uppercase mb-1"
                style={{ letterSpacing: "0.05em" }}
              >
                Useful Links
              </p>
              {navLinks2.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div
        ref={lowerFooterRef}
        style={{
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "4vh",
          paddingBottom: "6vh",
          overflow: "hidden",
        }}
      >
        <div className="flex items-end justify-between">
          {/* Large Brand Logo */}
          <div
            ref={logoRef}
            className="text-white font-normal leading-none"
            style={{
              fontSize: "clamp(80px, 15vw, 200px)",
              letterSpacing: "-0.03em",
            }}
          >
            NM Group
          </div>

          {/* Right Side: Legal, Social - all in one row */}
          <div className="flex items-end" style={{ gap: "4vw" }}>
            {/* Legal Links */}
            <div className="flex flex-col items-start" style={{ gap: "8px" }}>
              <a
                href="/privacy-policy"
                className="text-xs font-medium text-white/70 uppercase hover:text-white transition-colors flex items-center"
                style={{ letterSpacing: "0.05em", gap: "6px" }}
              >
                PRIVACY POLICY
                <span>↗</span>
              </a>
              <p className="text-xs font-medium text-white/50">
                © {new Date().getFullYear()} NM Group
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-end" style={{ gap: "8px" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-white/70 uppercase hover:text-white transition-colors flex items-center"
                  style={{ letterSpacing: "0.05em", gap: "6px" }}
                >
                  {link.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
