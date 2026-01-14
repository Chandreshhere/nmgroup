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
    { label: "Why trusted", href: "#" },
    { label: "Our Investments", href: "#" },
    { label: "Team of professionals", href: "#" },
    { label: "Objects", href: "#" },
  ];

  const navLinks2 = [
    { label: "Priorities", href: "#" },
    { label: "Services", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "FAQ", href: "#" },
  ];

  const socialLinks = [
    { label: "INSTAGRAM", href: "#" },
    { label: "LINKEDIN", href: "#" },
    { label: "FACEBOOK", href: "#" },
    { label: "YOUTUBE", href: "#" },
  ];

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
          {/* Left Side: Address + Email/Hours */}
          <div className="flex" style={{ gap: "8vw" }}>
            {/* Column 1: Address + Phone */}
            <div>
              <p
                className="text-xs font-medium text-white/60 uppercase mb-3"
                style={{ letterSpacing: "0.05em" }}
              >
                Address
              </p>
              <p className="text-sm font-medium text-white/90 leading-[170%]">
                livence Real Estate. Tower 1, Dubai
                <br />
                Marina, Dubai, UAE
              </p>
              <p
                className="text-xs font-medium text-white/60 uppercase mt-6 mb-3"
                style={{ letterSpacing: "0.05em" }}
              >
                Phone
              </p>
              <p className="text-sm font-medium text-white/90">+971 50 123 4567</p>
            </div>

            {/* Column 2: Email + Working hours */}
            <div>
              <p
                className="text-xs font-medium text-white/60 uppercase mb-3"
                style={{ letterSpacing: "0.05em" }}
              >
                Email
              </p>
              <p className="text-sm font-medium text-white/90">info@livence.ae</p>
              <p
                className="text-xs font-medium text-white/60 uppercase mt-6 mb-3"
                style={{ letterSpacing: "0.05em" }}
              >
                Working hours
              </p>
              <p className="text-sm font-medium text-white/90 leading-[170%]">
                Mon – Fri: 09:00 – 18:00
                <br />
                Sat: 10:00 – 16:00
              </p>
            </div>
          </div>

          {/* Right Side: Nav Links */}
          <div className="flex" style={{ gap: "6vw" }}>
            {/* Nav Links 1 */}
            <nav className="flex flex-col" style={{ gap: "12px" }}>
              {navLinks1.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Nav Links 2 */}
            <nav className="flex flex-col" style={{ gap: "12px" }}>
              {navLinks2.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors"
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
            (livence)
          </div>

          {/* Right Side: Legal, Social - all in one row */}
          <div className="flex items-end" style={{ gap: "4vw" }}>
            {/* Legal Links */}
            <div className="flex flex-col items-start" style={{ gap: "8px" }}>
              <a
                href="#"
                className="text-xs font-medium text-white/70 uppercase hover:text-white transition-colors flex items-center"
                style={{ letterSpacing: "0.05em", gap: "6px" }}
              >
                TERMS OF SERVICE
                <span>↗</span>
              </a>
              <a
                href="#"
                className="text-xs font-medium text-white/70 uppercase hover:text-white transition-colors flex items-center"
                style={{ letterSpacing: "0.05em", gap: "6px" }}
              >
                PRIVACY POLICY
                <span>↗</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-end" style={{ gap: "8px" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
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
